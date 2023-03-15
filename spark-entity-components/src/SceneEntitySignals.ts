/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Reactive from 'Reactive';
import {
  SceneEntityFrameUpdateListener,
  SignalLike,
  ValueSubscription,
} from './SceneEntityFrameCallback';
import {SceneEntityComponent} from './SceneEntityComponent';

// Generic type indicating a signal source
export type SignalSourceLike = StringSignalSource | any;

export enum ManagedSignalType {
  NUMBER,
  BOOLEAN,
  STRING,
}

/**
 * Signal which can be controlled by the component. Allows to create frame aware and imperative access to
 * scene object properties for built-in components
 */
export class ComponentManagedSignal<T> {
  private _signalSource: SignalSourceLike;
  private _cachedFrameNumber: number;
  private _cacheValue: T;

  /**
   * Creates a new component managed signal which holds and manages a value of the type provided
   * @returns the component managed signal
   */
  static create(signalType?: ManagedSignalType): ComponentManagedSignal<boolean> {
    if (signalType == null || signalType == ManagedSignalType.NUMBER) {
      return new ComponentManagedSignal(
        Reactive.scalarSignalSource(SceneEntityFrameUpdateListener.instance.createNewSignalId()),
      );
    } else if (signalType == ManagedSignalType.STRING) {
      return new ComponentManagedSignal(
        Reactive.stringSignalSource(SceneEntityFrameUpdateListener.instance.createNewSignalId()),
      );
    } else if (signalType == ManagedSignalType.BOOLEAN) {
      return new ComponentManagedSignal(
        Reactive.boolSignalSource(SceneEntityFrameUpdateListener.instance.createNewSignalId()),
      );
    }
    throw new Error('Unsupported signal type');
  }

  private constructor(signalSource: SignalSourceLike) {
    this._signalSource = signalSource;
    this._cachedFrameNumber = SceneEntityFrameUpdateListener.currentFrameInfo.frameId;
    this._cacheValue = null;
  }

  /**
   * Get the most recent value of the signal
   */
  get value(): T {
    const currentFrame = SceneEntityFrameUpdateListener.currentFrameInfo.frameId;
    if (this._cachedFrameNumber != currentFrame) {
      this._cachedFrameNumber = currentFrame;
      this._cacheValue = this._signalSource.signal.pinLastValue();
    }
    return this._cacheValue;
  }

  /**
   * Set the value of the signal
   */
  set value(newValue: T) {
    this._cachedFrameNumber = SceneEntityFrameUpdateListener.currentFrameInfo.frameId;
    this._cacheValue = newValue;
    this._signalSource.set(newValue);
  }

  /**
   * Underlying signal behind the source. Can be used to control scene object properties
   */
  get signal(): any {
    return this._signalSource.signal;
  }
}

/**
 * Decorator for property in the scene component to allow typescript to understand about the params
 * @param pathToProperty the property path
 * @returns
 */
export function SceneObjectProperty(
  pathToProperty: string,
  readOnly = false,
  signalType: ManagedSignalType = ManagedSignalType.NUMBER,
) {
  return function <T extends SceneEntityComponentWithProps>(target: T, propertyKey: string) {
    const ownedPropertyPaths = target['ownedPropertyPaths'] || new Map();
    const monitoredPropertyPaths = target['monitoredPropertyPaths'] || new Map();
    (readOnly ? monitoredPropertyPaths : ownedPropertyPaths).set(propertyKey, {
      path: pathToProperty,
      signalType: signalType,
    });
    target['ownedPropertyPaths'] = ownedPropertyPaths;
    target['monitoredPropertyPaths'] = monitoredPropertyPaths;

    const propertyInit = target['defineProperties'] || new Map();
    propertyInit.set(propertyKey, function (instance) {
      Object.defineProperty(instance, propertyKey, {
        enumerable: true,
        configurable: true,
        get(this: T) {
          if (readOnly) {
            return this._monitoredValues.get(propertyKey).value;
          }
          return this._heldSignals.get(propertyKey).value;
        },
        set(this: T, value: any) {
          if (readOnly) {
            throw new Error('Cannot set read only property ' + propertyKey);
          }
          this._heldSignals.get(propertyKey).value = value;
        },
      });
    });
    target['defineProperties'] = propertyInit;
  };
}

/**
 * A helper base class for components which need to automatically hook into Scene
 * object properties using property paths.
 */
export class SceneEntityComponentWithProps extends SceneEntityComponent {
  protected _heldSignals: Map<string, ComponentManagedSignal<any>> = new Map();
  protected _monitoredValues: Map<string, ValueSubscription<any>> = new Map();

  // This parameter allows defining a lazier state at which creation truly finishes
  private readonly _manageCreationState: boolean = true;
  private _monitoredReady = false;
  private _heldSignalsReady = false;
  private _onStartCallbacks: Array<(SceneEntityComponentWithProps) => void> = [];

  /**
   * @param propertyPaths param names => dot separated paths to the scene object properties for which
   * managed signals will be automatically setup
   */
  constructor() {
    super();
  }

  async create(sceneEntity: SceneEntity): Promise<void> {
    await super.create(sceneEntity);

    // Setup the properties. The x,y,z properties need to overriden at runtime to work correctly
    const propertyInits = this['defineProperties'];
    delete this['defineProperties'];
    propertyInits.forEach(init => {
      if (typeof init === 'function') {
        init(this);
      }
    });

    this.createMonitoredProperties();
    this.createHeldProperties();
    if (this._heldSignalsReady && this._monitoredReady) {
      this.onManagedCreation();
    }
  }

  /**
   * As these are built in components, there's no way to set properties one off in scripts
   * without creating a shadow component, and using it's lifecycle.
   *
   * This function allows you to listen to when the component is ready and set it's values.
   * @param callback: Callback which gets called on Start.
   * The first param of the callback will be the component instance
   */
  subscribeOnStart(callback: (SceneEntityComponentWithProps) => void) {
    this._onStartCallbacks.push(callback);
  }

  onStart() {
    if (this._onStartCallbacks.length == 0) {
      return;
    }

    try {
      this._onStartCallbacks.forEach(callback => callback(this));
    } finally {
      this._onStartCallbacks.length = 0;
    }
  }

  private createHeldProperties(): void {
    // Extract the list of property paths we need and create signals
    const ownedPropertyPaths = this['ownedPropertyPaths'];
    delete this['ownedPropertyPaths'];

    if (ownedPropertyPaths.size == 0) {
      this._heldSignalsReady = true;
      return;
    }

    ownedPropertyPaths.forEach((argument, param) => {
      this._heldSignals.set(param, ComponentManagedSignal.create(argument.signalType));
    });

    const sampledInputs = new Map();
    ownedPropertyPaths.forEach((argument, param) => {
      sampledInputs.set(
        param,
        getObjectPropertyAtPath(this.sceneEntity.sceneObject, argument.path),
      );
    });
    SceneEntityFrameUpdateListener.instance.snapshotSignals(sampledInputs, true).then(values => {
      values.forEach((data, param) => {
        if (data != null) {
          this._heldSignals.get(param).value = data;
          setObjectPropertyAtPath(
            this.sceneEntity.sceneObject,
            ownedPropertyPaths.get(param).path,
            this._heldSignals.get(param).signal,
          );
        }
      });
      this._heldSignalsReady = true;
      this.onManagedCreation();
    });
  }

  // Extract the list of property paths we need and create signals
  private createMonitoredProperties(): void {
    const monitoredPropertyPaths = this['monitoredPropertyPaths'];
    delete this['monitoredPropertyPaths'];
    if (monitoredPropertyPaths.size == 0) {
      this._monitoredReady = true;
      return;
    }

    const sampledInputs = new Map();
    monitoredPropertyPaths.forEach((argument, param) => {
      sampledInputs.set(
        param,
        getObjectPropertyAtPath(this.sceneEntity.sceneObject, argument.path),
      );
    });
    this._monitoredValues = SceneEntityFrameUpdateListener.instance.monitorSignals(sampledInputs);
    this._monitoredReady = true;
  }
}

/**
 * Splits the path into segments (by period .), and traverses the object
 * So getObjectPropertyAtPath(a, s1.s2...) => a[s1][s2]...
 * @param obj the object
 * @param path the path to the property
 * @returns the value of the property as a signal
 */
export function getObjectPropertyAtPath(obj: object, path: string): SignalLike {
  const segments = path.split('.');
  return segments.reduce((previousValue: any, currentKey: string) => {
    if (
      typeof previousValue !== 'undefined'
      // && Object.prototype.hasOwnProperty.call(previousValue, currentKey)
    ) {
      // Checked before calling
      // eslint-disable-next-line security/detect-object-injection
      return previousValue[currentKey];
    }
  }, obj);
}

/**
 * Splits the path into segments (by period .), and traverses the object and sets the property.
 * if the path is already an array it will be used directly
 * @param obj the object
 * @param path raw path or segments to traverse
 * @param value the signal value to set
 * @returns void
 */
function setObjectPropertyAtPath(obj: object, path: string | string[], value: SignalLike) {
  const segments = typeof path === 'string' ? path.split('.') : path;
  if (
    segments.length === 0
    // || !Object.prototype.hasOwnProperty.call(obj, segments[0])
  ) {
    throw new Error("Trying to set a property on a path that doesn't exit");
  } else if (segments.length === 1) {
    obj[segments[0]] = value;
  } else {
    const [first, ...rest] = segments;

    // Checked before calling
    // eslint-disable-next-line security/detect-object-injection
    return setObjectPropertyAtPath(obj[first], rest, value);
  }
}
