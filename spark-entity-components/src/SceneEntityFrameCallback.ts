/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Time from 'Time';

/**
 * Holder for information about the current frame
 */
export type FrameUpdateInfo = {
  // Index of the frame from the start of the subscription
  frameId: number;
  // Time since last frame in milliseconds
  deltaTimeMs: number;
  // Current time in milliseconds
  currentTimeMs: number;
  // Time since last frame in seconds
  deltaTimeS: number;
  // Current time in secodns
  currentTimeS: number;
};

// Callback for frame updates
export type FrameUpdateCallback = (info: FrameUpdateInfo) => void;

// Signal like types, these are the only forms of signals currently subscribable for snapshots
export type SignalLike = BoolSignal | StringSignal | ScalarSignal;

/**
 * A subscription class which holds on a mutable value which can be accessed by the caller
 */
export class ValueSubscription<Type> implements Subscription {
  private _heldValue: Type;
  private _unsubscribeCallback: () => void;
  constructor(value: Type, unsubscribeCallback: () => void) {
    this._heldValue = value;
    this._unsubscribeCallback = unsubscribeCallback;
  }

  // held value in the subscription
  public get value(): Type {
    return this._heldValue;
  }

  // update the value in the subscription
  public updateInstance(value: Type): void {
    this._heldValue = value;
  }

  // unsubscribe from the subscription
  public unsubscribe() {
    const callback = this._unsubscribeCallback;
    delete this._unsubscribeCallback;
    callback();
  }
}

/**
 * Class that listens to frame updates and handles the passing and holding of signals.
 * This class should NOT be aware of concepts of SceneObjects, Entities and Components
 */
export class SceneEntityFrameUpdateListener {
  private static _instance: SceneEntityFrameUpdateListener;
  static get instance(): SceneEntityFrameUpdateListener {
    if (!SceneEntityFrameUpdateListener._instance) {
      SceneEntityFrameUpdateListener._instance = new SceneEntityFrameUpdateListener();
    }
    return SceneEntityFrameUpdateListener._instance;
  }

  /**
   * Returns the properties of the current frame
   */
  public static get currentFrameInfo(): FrameUpdateInfo {
    return SceneEntityFrameUpdateListener.instance._currentFrameUpdateInfo;
  }

  // The subscription which will fire on every frame
  private _onFrameSubscription: Subscription;

  // Dictionary of monitored signals (signalName => signal)
  private _monitoredSignals: Map<string, SignalLike>;

  // Dictionary of monitored signals (signalId => snapshot)
  private _monitoredSignalSnapshots: Map<string, any>;

  // Monitored signals were updated in the last frame
  private _monitoredSignalsDirty: boolean;

  // New signals are created with a unique identifier based on this counter
  private _currentSignalIdCounter: number;

  // List of frame update callbacks (signalId => callback)
  private _frameUpdateCallbacks: Map<string, FrameUpdateCallback>;

  // Holds on the current frame update information
  private _currentFrameUpdateInfo: FrameUpdateInfo;

  constructor() {
    // NOTE: This can cause issues with delta time on the first frame
    this._currentFrameUpdateInfo = {
      frameId: 0,
      deltaTimeMs: 0,
      deltaTimeS: 0,
      currentTimeMs: 0,
      currentTimeS: 0,
    };

    this._monitoredSignals = new Map();
    this._monitoredSignalSnapshots = new Map();
    this._currentSignalIdCounter = 0;
    this._frameUpdateCallbacks = new Map();

    // Start with true to setup the first subscription
    this._monitoredSignalsDirty = true;
    this.maybeUpdateFrameSubscription();
  }

  /**
   * Registers callback which is run on every frame
   * @param callback the callback which needs to run on every frame
   * @returns the disposable which unregisters this callback
   */
  public registerCallback(callback: FrameUpdateCallback): Subscription {
    const callbackId = this.createNewSignalId();
    this._frameUpdateCallbacks.set(callbackId, callback);
    return new ValueSubscription(callback, () => this._frameUpdateCallbacks.delete(callbackId));
  }

  /**
   * Registers a callback for exactly one frame. This is useful to get snapshot signals and also one off callbacks
   * @param callback the callback to run on the next frame
   * @returns a disposable version of the frame update callback, allowing you to unsubscribe within the same frame
   */
  public registerNextFrameCallback(callback: FrameUpdateCallback): Subscription {
    const disposableCallback = this.registerCallback(data => {
      try {
        callback(data);
      } finally {
        disposableCallback.unsubscribe();
      }
    });
    return disposableCallback;
  }

  /**
   * Monitor a set of signals. These will allow having up to date values on each frame
   * @param signals map of signals to be monitored
   * @returns map of
   */
  public monitorSignals(signals: Map<string, SignalLike>): Map<string, ValueSubscription<any>> {
    // Register the different signals for monitoring
    const signalNameToSignalIds = new Map();
    const disposableSignalValues = new Map();
    signals.forEach((signalLike, signalName) => {
      const signalId = this.createNewSignalId();
      signalNameToSignalIds.set(signalName, signalId);
      this._monitoredSignals.set(signalId, signalLike);

      // Create a value subscription for signals with the pinned value and
      // removal from monitored signals on unsubscribe
      disposableSignalValues.set(
        signalName,
        new ValueSubscription(signalLike.pinLastValue(), () => {
          this._monitoredSignals.delete(signalId);
          this._monitoredSignalsDirty = true;
        }),
      );
      this._monitoredSignalsDirty = true;
    });

    // Create a callback which updates the value in the disposable returned to the caller
    this.registerCallback(() => {
      signals.forEach((_, signalName) => {
        const signalId = signalNameToSignalIds.get(signalName);
        disposableSignalValues
          .get(signalName)
          .updateInstance(this._monitoredSignalSnapshots.get(signalId));
      });
    });
    return disposableSignalValues;
  }

  /**
   * Returns a promise which will resolve the values of the signals. The signals are not continuously monitored
   * @param signals the map of signals to monitor
   * @param nonNullOnly only resolve promise if non null value is aquired for all params
   * @returns promise which resolves in the values of the signals
   */
  public snapshotSignals(
    signals: Map<string, SignalLike>,
    nonNullOnly?: boolean,
  ): Promise<Map<string, any>> {
    const monitoredSignals = this.monitorSignals(signals);

    // Create a promise which returns the value in the next frame and disposes signal monitors
    return new Promise(resolve => {
      const snapshotsReadyCallback = () => {
        const values = new Map();
        monitoredSignals.forEach((signal, label) => {
          const value = signal.value;
          if (value != null) {
            values.set(label, value);
            signal.unsubscribe();
          }
        });
        if (nonNullOnly === true && monitoredSignals.size !== values.size) {
          this.registerNextFrameCallback(snapshotsReadyCallback);
          return;
        }
        resolve(values);
      };
      this.registerNextFrameCallback(snapshotsReadyCallback);
    });
  }

  /**
     * Callback for time reactive subscription.
     * @param ms the millisecond snap
     shot
     * @param snapshot the snapshot of the monitored signals
     * @returns void
     */
  private onFrame(ms: any, snapshot: any): void {
    const currentTimestampMs = ms.newValue;
    const deltaTime = currentTimestampMs - this._currentFrameUpdateInfo.currentTimeMs;
    if (deltaTime === 0) {
      // Skip, no time has past.
      return;
    }

    // Update information about the current frame
    this._currentFrameUpdateInfo.frameId++;
    this._currentFrameUpdateInfo.deltaTimeMs = deltaTime;
    this._currentFrameUpdateInfo.deltaTimeS = deltaTime / 1000.0;
    this._currentFrameUpdateInfo.currentTimeMs = currentTimestampMs;
    this._currentFrameUpdateInfo.currentTimeS = currentTimestampMs / 1000.0;
    this._monitoredSignalSnapshots = new Map(Object.entries(snapshot));

    // Notify all callbacks of the new frame
    const callbacks = [...this._frameUpdateCallbacks.values()];
    callbacks.forEach(callback => callback(this._currentFrameUpdateInfo));

    // Monitored signals might have changed. Update the snapshot subscriptions
    this.maybeUpdateFrameSubscription();
  }

  /**
   * If the monitored signals have changed, updates the frame update subscription
   * @returns void
   */
  private maybeUpdateFrameSubscription(): void {
    if (!this._monitoredSignalsDirty) {
      return;
    }
    // Unsubscribe existing subscription to avoid double callbacks
    if (this._onFrameSubscription) {
      this._onFrameSubscription.unsubscribe();
    }
    // Resubscribe with the updates monitored signals
    this._onFrameSubscription = Time.ms
      .monitor({fireOnInitialValue: true})
      .subscribeWithSnapshot(Object.fromEntries(this._monitoredSignals), this.onFrame.bind(this));
    this._monitoredSignalsDirty = false;
  }

  /**
   * Creates a unique id for signals based on the global counter in the class
   * @returns the new signal id
   */
  public createNewSignalId(): string {
    return 'componentLifecycleSignal' + (this._currentSignalIdCounter++).toString();
  }
}
