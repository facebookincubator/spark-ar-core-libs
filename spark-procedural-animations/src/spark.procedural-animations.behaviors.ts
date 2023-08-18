/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/**
 * Spark Procedural Animations - Behaviors
 * version 0.9.4
 */

import T from 'Time';
import D from 'Diagnostics';
import {
  IAction,
  IActionOfT,
  IActionOf2T,
  IActionOf3T,
  IDisposable,
  IFuncOf2T,
  IUpdatable,
  LinkedList,
  LinkedListNode,
  movAvg,
  rndOf,
} from './spark.procedural-animations.core';
import {
  SparkProcAniSysEvents,
  invoke,
  subscribe,
  unsubscribeAll,
} from './spark.procedural-animations.messenger';
import {IObjectPool, objPool} from './spark.procedural-animations.pool';

/**
 * function used in Cycle Behavior, with parameters
 * @param x - number between 0 and 1 that represents current cycle progress
 * @param c - number of the cycle starting at 0
 * @param b - reference to CycleBvr instance, that can be used to finish it
 */
export type ICycleBehaviorCall = IActionOf3T<number, number, CycleBehavior>;
/**
 * function used in Interval Behavior, with parameters
 * @param c - number of the interval starting at 0
 * @param b - reference to CycleBvr instance, that can be used to finish it
 */
export type IIntervalBehaviorCall = IActionOf2T<number, IntervalBehavior>;
/**
 * interface of object containins string property identifier
 */
export interface IIdentifiable {
  get identifier(): string;
}
/**
 * interface of object with postToNative function
 */
export interface IPosterToNative extends IIdentifiable {
  postToNative(): void;
}
/**
 * interface of object with lateUpdate function
 */
export interface ILateUpdater extends IIdentifiable {
  lateUpdate(): void;
}

/**
 * Finish behaviors marked as unique with specific label
 * @param uniqueName
 */
export function finishBehaviorsUniqueAs(uniqueName: string): void {
  const eventName = SparkProcAniSysEvents.ensureUniqueBehavior + uniqueName;
  invoke(eventName);
}
export abstract class Behavior implements IDisposable {
  private static lastId = 0;
  private _isInitialized: boolean;
  private _isFinished: boolean;
  private _isForceFinished: boolean;
  private _isDisposed: boolean;
  private _onEnd: IAction[];
  private _followUp: Behavior;
  private _label: string;
  private _id: string;
  constructor() {
    this._isInitialized = false;
    this._isFinished = false;
    this._isDisposed = false;
    this._isForceFinished = false;
    this._onEnd = null;
    this._followUp = null;
    this._id = 'Behavior_' + ++Behavior.lastId;
  }
  get id(): string {
    return this._id;
  }
  /**
   * function called once before the behavior execution starts
   */
  initialize(): void {
    // override in derived class
  }
  /**
   * internal function to mark that the behavior is initialized
   */
  markInitialized_(): void {
    this._isInitialized = true;
  }
  /**
   * Update function called on each frame
   */
  update(): void {
    // override in derived class
  }
  /**
   * Disposes behavior
   */
  dispose(): void {
    this._onEnd = null;
    this._followUp = null;
    this._isDisposed = true;
  }

  /**
   * function to call to end th behavior
   */
  finish(): void {
    this._isFinished = true;
    const arr = this._onEnd;
    if (!arr) return;
    for (let i = 0; i < arr.length; i++) {
      arr[i]();
    }
  }
  /**
   * function to call to end th behavior and cancell all follow up actions
   */
  forceFinish(): void {
    this._isForceFinished = true;
    // no followups when force finishing
    if (this._followUp) this._followUp.forceFinish();
    this._followUp = null;
    this._onEnd = null;
    if (!this.isFinished) this.finish();
  }
  /**
   * Enforce uniqueness of behaviors marked by given unique marker
   * @param uniqueName - unique marker
   * @returns reference to the current behavior
   */
  enforceUnique(uniqueName: string): Behavior {
    const eventName = SparkProcAniSysEvents.ensureUniqueBehavior + uniqueName;
    invoke(eventName);
    subscribe(
      eventName,
      () => {
        this.forceFinish();
      },
      this.id,
    );
    return this;
  }
  /**
   * Executes action when the behavior ends
   * @param act - function to execute
   * @returns reference to the current behavior
   */
  then(act: IAction): Behavior {
    if (!this._onEnd) this._onEnd = [];
    this._onEnd.push(act);
    return this;
  }
  /**
   * Executes action when the behavior ends
   * @param act - function to execute
   * @returns reference to the current behavior
   */
  whenEnds(act: IAction): Behavior {
    return this.then(act);
  }
  /**
   * Invokes event when the behavior ends
   * @param eventName - event name to invoke
   * @param args - event arguments (optional)
   * @returns reference to the current behavior
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thenInvoke(eventName: string, args?: any): Behavior {
    if (!this._onEnd) this._onEnd = [];
    this._onEnd.push(() => {
      invoke(eventName, args);
    });
    return this;
  }
  /**
   * Invokes event when the behavior ends
   * @param eventName - event name to invoke
   * @param args - event arguments (optional)
   * @returns reference to the current behavior
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whenEndsInvoke(eventName: string, args?: any): Behavior {
    return this.thenInvoke(eventName, args);
  }
  /**
   * Performs action with that behavior if a given condition is true
   * @param condiiton - true or false
   * @param func - function to execute if condition is true
   * @returns reference to the current behavior
   */
  ifCondition(condiiton, func: IFuncOf2T<Behavior, Behavior>): Behavior {
    if (condiiton) return func(this);
    return this;
  }
  /**
   * Specifies another behavior to execute after this one ends
   * @template T - the type of the other behavior
   * @param followUp - the instance of the other behavior
   * @returns the instance of the other behavior
   */
  thenPlay<T extends Behavior>(followUp: T): T {
    this._followUp = followUp;
    return followUp;
  }
  /**
   * Specifies time behavior to execute after this one ends
   * @param seconds - time to run
   * @param act - function to call on each frame for given time, passing argument x that progresses from 0 to 1
   * @param pool - object that implements IObjectPool used for object pooling
   * @returns the instance of the time behavior that follows the current behavior
   */
  thenPlayFor(seconds: number, act: IActionOfT<number>, pool: IObjectPool = null): Behavior {
    return this.thenPlay(new TimeBehavior(seconds, null, act, pool));
  }
  /**
   * Specifies time behavior to execute after this one ends
   * @param seconds - time to run
   * @param init - function to execute once before first frame, passing argument of the time behavior
   * @param act - function to call on each frame for given time, passing argument x that progresses from 0 to 1
   * @param pool - object that implements IObjectPool interface, used for object pooling
   * @returns the instance of the time behavior that follows the current behavior
   */
  thenInitAndPlayFor(
    seconds: number,
    init: IActionOfT<Behavior>,
    act: IActionOfT<number>,
    pool: IObjectPool = null,
  ): Behavior {
    return this.thenPlay(new TimeBehavior(seconds, init, act, pool));
  }
  /**
   * Specifies cycle behavior to execute after this one ends
   * @param seconds - time to run one cycle
   * @param act - function to call on each frame for given time, passing arguments x (progresses from 0 to 1), c (number cycles), and b (reference to cycle behavior)
   * @param pool - object that implements IObjectPool interface, used for object pooling
   * @returns the instance of the cycle behavior that follows the current behavior
   */
  thenCycles(seconds: number, act: ICycleBehaviorCall, pool: IObjectPool = null): Behavior {
    return this.thenPlay(new CycleBehavior(seconds, null, act, pool));
  }
  /**
   * Specifies cycle behavior to execute after this one ends
   * @param seconds - time to run one cycle
   * @param init - function to call once before first frame
   * @param act - function to call on each frame for given time, passing arguments x (progresses from 0 to 1), c (number cycles), and b (reference to cycle behavior)
   * @param pool - object that implements IObjectPool interface, used for object pooling
   * @returns the instance of the cycle behavior that follows the current behavior
   */
  thenInitAndCycles(
    seconds: number,
    init: ICycleBehaviorCall,
    act: ICycleBehaviorCall,
    pool: IObjectPool = null,
  ): Behavior {
    return this.thenPlay(new CycleBehavior(seconds, init, act, pool));
  }
  /**
   * Specifies cycle behavior with cycle length of 1 second to execute after this one ends
   * @param act - function to call on each frame for given time, passing arguments x (progresses from 0 to 1), c (number cycles), and b (reference to cycle behavior)
   * @param pool - object that implements IObjectPool interface, used for object pooling
   * @returns the instance of the cycle behavior that follows the current behavior
   */
  thenEndless(act: ICycleBehaviorCall, pool: IObjectPool = null): Behavior {
    return this.thenCycles(1, act, pool);
  }
  /**
   * Specifies cycle behavior with cycle length of 1 second to execute after this one ends
   * @param init - function to call once before first frame
   * @param act - function to call on each frame for given time, passing arguments x (progresses from 0 to 1), c (number cycles), and b (reference to cycle behavior)
   * @param pool - object that implements IObjectPool interface, used for object pooling
   * @returns the instance of the cycle behavior that follows the current behavior
   */
  thenInitAndEndless(
    init: ICycleBehaviorCall,
    act: ICycleBehaviorCall,
    pool: IObjectPool = null,
  ): Behavior {
    return this.thenInitAndCycles(1, init, act, pool);
  }
  /**
   * Specifies wait period after this one ends
   * @param seconds - seconds to wait
   * @returns the instance of the wait behavior that follows the current behavior
   */
  thenWaitFor(seconds: number): Behavior {
    return this.thenPlay(new WaitBehavior(seconds));
  }
  /**
   * Forces initialize and update of the behavior
   * @returns reference of the current behavior
   */
  forceInitializeAndUpdate(): Behavior {
    this.initialize();
    this.markInitialized_();
    if (!this.isFinished) {
      this.update();
    }
    return this;
  }
  /**
   * Sets label for the current behavior
   * @returns reference of the current behavior
   */
  withLabel(lbl: string): Behavior {
    this._label = lbl;
    return this;
  }
  /**
   * Forces the end of another behavior
   * @param previous - behavior to end
   * @returns reference of the current behavior
   */
  ensureSingleBehavior(previous: Behavior): Behavior {
    if (!!previous && !previous.isFinished) {
      previous.forceFinish();
    }
    return this;
  }
  /**
   * executes action passing current behavior as parameter
   * @param func - function to call
   * @returns reference of the current behavior
   */
  action(func: IActionOfT<Behavior>): Behavior {
    if (func) func(this);
    return this;
  }
  /**
   * Executes the behavior on the specified behavior holder
   * @param holder
   * @returns on
   */
  playOn(holder: BehaviorHolder): Behavior {
    if (!holder) throw new Error(`No behavior holder provided when calling IBehavior.playOn`);
    holder.play(this);
    return this;
  }
  /**
   * Behavior label
   */
  get label(): string {
    return this._label;
  }
  /**
   * Follow up behavior of this behavior
   */
  get followUp(): Behavior {
    return this._followUp;
  }
  /**
   * Flag inidicating if the behavior was initialized
   */
  get isInitialized(): boolean {
    return this._isInitialized;
  }
  /**
   * Flag inidicating if the behavior was finished
   */
  get isFinished(): boolean {
    return this._isFinished;
  }
  /**
   * Flag inidicating if th behavior was force finished (finished with cancellation of all follow up actions)
   */
  get isForceFinished(): boolean {
    return this._isForceFinished;
  }
  /**
   * Flag inidicating if the behavior was disposed
   */
  get isDisposed(): boolean {
    return this._isDisposed;
  }
}
const ACTIVE_OBJECT_POOL_WARNING =
  'Initialization of behavior within active pool for the current frame, consider initialization on next frame, behavior ID=';
export class BehaviorManager {
  private readonly _current: LinkedList<Behavior>;
  private readonly _pending: LinkedList<Behavior>;
  constructor() {
    this._pending = new LinkedList<Behavior>();
    this._current = new LinkedList<Behavior>();
  }
  /**
   * Number of behaviors currently running
   */
  get numberBehaviors(): number {
    return this._current.count;
  }
  /**
   * Updates all behaviors
   */
  update(): void {
    let node = this._current.head;

    while (node != null) {
      const behavior = node.data;
      const next = node.next;

      if (!behavior.isInitialized) {
        if (objPool.isActive) {
          D.warn(ACTIVE_OBJECT_POOL_WARNING + behavior.id);
        }
        behavior.initialize();
        behavior.markInitialized_();
      }
      let toFollow = behavior.followUp; //followUp must be retrieved before calling dispose because it will remove it
      if (behavior.isFinished) {
        if (!behavior.isDisposed) {
          behavior.dispose();
          unsubscribeAll(behavior.id);
        }
        this._current.deleteNode(node);
        if (!behavior.isForceFinished) {
          let hasContinued = false;
          while (toFollow) {
            if (!toFollow.isFinished) {
              if (!toFollow.isInitialized) {
                if (objPool.isActive) {
                  D.warn(ACTIVE_OBJECT_POOL_WARNING + toFollow.id);
                }
                toFollow.initialize();
                toFollow.markInitialized_();
              }
              if (!toFollow.isFinished) {
                toFollow.update();
                this._pending.insertEnd(toFollow);
                hasContinued = true;
              } else if (!toFollow.isDisposed) {
                toFollow.dispose();
                unsubscribeAll(toFollow.id);
              }
            } else if (!toFollow.isDisposed) {
              toFollow.dispose();
              unsubscribeAll(toFollow.id);
            }
            toFollow = hasContinued ? null : toFollow.followUp;
          }
        }
      } else {
        behavior.update();
      }
      node = next;
    }

    if (this._pending.count < 1) return;

    node = this._pending.head;
    while (node != null) {
      if (node.data && !node.data.isFinished) this._current.insertEnd(node.data);
      node = node.next;
    }
    this._pending.clear();
  }
  /**
   * Finishes all behaviors
   */
  finish() {
    let node = this._current.head;

    while (node != null) {
      const behavior = node.data;
      const next = node.next;

      if (!behavior.isFinished) {
        behavior.finish();
      }
      node = next;
    }
  }
  /**
   * Force finishes (with cancellation of all follow up actions) all behaviors
   */
  forceFinish() {
    let node = this._current.head;

    while (node != null) {
      const behavior = node.data;
      const next = node.next;

      if (!behavior.isForceFinished) {
        behavior.forceFinish();
      }
      node = next;
    }

    if (this._pending.count > 0) this._pending.clear();
  }
  /**
   * Add behavior
   */
  add<T extends Behavior>(behavior: T): T {
    if (!behavior)
      throw new Error(`Behavior passed to BehaviorManager cannot be NULL or undefined`);
    this._pending.insertEnd(behavior);
    return behavior;
  }
  /**
   * Forces finish behaviors with a given label
   * @param label - label to identify the behavior
   * @returns the reference to this behavior manager
   */
  forceFinishBehaviorsWithLabel(label: string): BehaviorManager {
    let node = this._current.head;

    while (node != null) {
      const behavior = node.data;
      const next = node.next;

      if (behavior.label == label) {
        behavior.forceFinish();
      }
      node = next;
    }

    return this;
  }
}
/**
 * Object manager - used to manage 3D objects
 */
export class ObjectManager {
  enablePostToNative: boolean;
  private _listPosterToNative: LinkedList<IPosterToNative>;
  private _byIdentifierPosterToNative: {
    [key: string]: LinkedListNode<IPosterToNative>;
  };
  private _listLateUpdater: LinkedList<ILateUpdater>;
  private _byIdentifierLateUpdater: {
    [key: string]: LinkedListNode<ILateUpdater>;
  };
  constructor() {
    this._listPosterToNative = new LinkedList<IPosterToNative>();
    this._listLateUpdater = new LinkedList<ILateUpdater>();
    this._byIdentifierPosterToNative = {};
    this._byIdentifierLateUpdater = {};
    this.enablePostToNative = true;
  }
  /**
   * Adds late updater object that implements ILateUpdater interface
   */
  addLateUpdater(lu: ILateUpdater): void {
    const existing = this._byIdentifierLateUpdater[lu.identifier];
    if (existing) {
      this.removeLateUpdater(existing.data);
    }
    const node: LinkedListNode<ILateUpdater> = this._listLateUpdater.insertEnd(lu);
    this._byIdentifierLateUpdater[lu.identifier] = node;
  }
  /**
   * Removes late updater object
   */
  removeLateUpdater(lu: ILateUpdater): void {
    const foundNode = this._byIdentifierLateUpdater[lu.identifier];
    if (foundNode) {
      this._listLateUpdater.deleteNode(foundNode);
      delete this._byIdentifierLateUpdater[lu.identifier];
    }
  }
  /**
   * Adds poster to native object that implements IPosterToNative interface
   */
  addPosterToNative(obj: IPosterToNative) {
    const existing = this._byIdentifierPosterToNative[obj.identifier];
    if (existing) {
      this.removePosterToNative(existing.data);
    }
    const node: LinkedListNode<IPosterToNative> = this._listPosterToNative.insertEnd(obj);
    this._byIdentifierPosterToNative[obj.identifier] = node;
  }
  /**
   * Removes poster to native object
   */
  removePosterToNative(obj: IPosterToNative) {
    const foundNode = this._byIdentifierPosterToNative[obj.identifier];
    if (foundNode) {
      this._listPosterToNative.deleteNode(foundNode);
      delete this._byIdentifierPosterToNative[obj.identifier];
    }
  }
  /**
   * invokes late updaters
   */
  lateUpdate(): void {
    let nodeLU = this._listLateUpdater.head;
    while (nodeLU) {
      nodeLU.data.lateUpdate();
      nodeLU = nodeLU.next;
    }
  }
  /**
   * invokes posters to native
   */
  postToNative(): void {
    if (!this.enablePostToNative) return;
    let nodePTN = this._listPosterToNative.head;
    while (nodePTN) {
      nodePTN.data.postToNative();
      nodePTN = nodePTN.next;
    }
  }
}
/**
 * Behavior executor - used to execute behaviors, based on spark Time Module
 */
export class BehaviorExecutor extends BehaviorManager {
  private _ms: number;
  private _frame: number;
  private _prevMs: number;
  private _smoothDeltaTime: number;
  private readonly _objectManager: ObjectManager;
  private readonly _finalizers: IUpdatable[];
  constructor(om: ObjectManager) {
    super();
    this._ms = 0;
    this._frame = 0;
    this._prevMs = -1;
    this._smoothDeltaTime = 1.0 / 60.0;
    this._objectManager = om || new ObjectManager();
    this._finalizers = [];
    T.ms.monitor({fireOnInitialValue: true}).subscribe(this.onUpdate.bind(this));
  }
  /**
   * Number milliseconds
   */
  get ms(): number {
    return this._ms;
  }
  /**
   * Number seconds
   */
  get seconds(): number {
    return this._ms / 1000;
  }
  /**
   * Current frame number
   */
  get frame(): number {
    return this._frame;
  }
  /**
   * Object Manager instance
   */
  get objectManager(): ObjectManager {
    return this._objectManager;
  }
  /**
   * Smooth delta time, between frames
   */
  get smoothDeltaTime(): number {
    return this._smoothDeltaTime;
  }
  /**
   * Frames per second
   */
  get fps(): number {
    return Math.round(1.0 / this._smoothDeltaTime);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private onUpdate(e: any) {
    this._ms = e.newValue;
    ++this._frame;
    if (this._prevMs >= 0) {
      const deltaTime = (this._ms - this._prevMs) / 1000.0;
      this._smoothDeltaTime = movAvg(this._smoothDeltaTime, deltaTime, Math.min(this._frame, 10));
    }
    this._prevMs = this._ms;

    super.update();
    this._objectManager.lateUpdate();
    for (let i = 0; i < this._finalizers.length; i++) {
      this._finalizers[i].update();
    }
    this._objectManager.postToNative();
  }
  /**
   * Adds frame finalizer
   * @param finalizer - object that implements IUpdatable interface, update function of that object will be called at the end of each frame
   */
  addFrameFinalizer(finalizer: IUpdatable): void {
    this._finalizers.push(finalizer);
  }
}
export const mainObjectManager: ObjectManager = new ObjectManager();
export const mainBehaviorExecutor = new BehaviorExecutor(mainObjectManager);
/**
 * executes a given behavior on the main behavior executor
 * @param behavior - behavior to execute
 */
export function play<T extends Behavior>(behavior: T): T {
  return mainBehaviorExecutor.add(behavior);
}
/**
 * executes a behavior holder on the main behavior executor and returns reference to it
 */
export function playHolder(): BehaviorHolder {
  return play(new BehaviorHolder());
}
/**
 * Ensures passed behaviors are force finished
 * @param behaviors - behaviors to finish
 */
export function ensureForceFinished(...behaviors: Behavior[]): void {
  if (!behaviors) return;
  for (const behavior of behaviors) {
    if (behavior && !behavior.isFinished) behavior.forceFinish();
  }
}
/**
 * executes a wait behavior on the main behavior executor and returns reference to it
 * @param seconds - time to wait in seconds
 */
export function wait(seconds: number): WaitBehavior {
  return mainBehaviorExecutor.add(new WaitBehavior(seconds));
}
/**
 * executes a time behavior on the main behavior executor and returns reference to it
 * @param seconds - seconds to run time behavior
 * @param func - function to call on each frame with parameter x - number from 0 to 1
 * @param pool - object that implements IObjectPool interface, used for object pooling
 */
export function playFor(
  seconds: number,
  func: IActionOfT<number>,
  pool: IObjectPool = null,
): TimeBehavior {
  return mainBehaviorExecutor.add(new TimeBehavior(seconds, null, func, pool));
}
/**
 * executes a cycle behavior on the main behavior executor and returns reference to it
 * @param seconds - seconds to run each period
 * @param func - function to call on each frame with parameters x - period progress from 0 to 1, c - number of periods starting 0, b - reference to cycle behavior
 * @param pool - object that implements IObjectPool interface, used for object pooling
 */
export function playCycle(
  seconds: number,
  func: ICycleBehaviorCall,
  pool: IObjectPool = null,
): CycleBehavior {
  return mainBehaviorExecutor.add(new CycleBehavior(seconds, null, func, pool));
}
/**
 * executes a cycle behavior with cycle length of 1 second on the main behavior executor and returns reference to it
 * @param func - function to call on each frame with parameters x - period progress from 0 to 1, c - number of periods starting 0, b - reference to cycle behavior
 * @param pool - object that implements IObjectPool interface, used for object pooling
 */
export function playEndless(func: ICycleBehaviorCall, pool: IObjectPool = null): CycleBehavior {
  return playCycle(1, func, pool);
}
/**
 * executes a inetrval behavior on the main behavior executor and returns reference to it
 * @param seconds - seconds to run each interval
 * @param func - function to call on each interval
 * @param hasInitCall - flag indicating weather to call init function before the first period
 */
export function playInterval(
  seconds: number,
  func: IIntervalBehaviorCall,
  hasInitCall = false,
): Behavior {
  return mainBehaviorExecutor.add(new IntervalBehavior(seconds, hasInitCall ? func : null, func));
}
/**
 * executes a skip frames behavior on the main behavior executor and returns reference to it
 * @param numberFrames
 * @returns frames
 */
export function skipFrames(numberFrames: number): SkipFramesBehavior {
  return mainBehaviorExecutor.add(new SkipFramesBehavior(numberFrames));
}
/**
 * Behavior that is always finished
 */
export class FinishedBehavior extends Behavior {
  constructor() {
    super();
    this.finish();
  }
}
/**
 * Behavior that is always unfinished
 */
export class UnfinishedBehavior extends Behavior {
  finish(): void {
    /* do nothing */
  }
  get isFinished(): boolean {
    return false;
  }
}
export const finishedBehavior = new FinishedBehavior();
export const unfinishedBehavior = new UnfinishedBehavior();
/**
 * Behavior used to wait certain time before doing something else
 */
export class WaitBehavior extends Behavior {
  private _seconds: number;
  private _endMs: number;
  /**
   * Creates an instance of wait behavior.
   * @param seconds - number of seconds to wait
   */
  constructor(seconds: number) {
    super();
    this._seconds = seconds;
  }
  initialize(): void {
    this._endMs = Date.now() + this._seconds * 1000;
  }
  update(): void {
    if (Date.now() >= this._endMs) {
      this.finish();
    }
  }
}
/**
 * Behavior used to call update on each frame for a given time period
 */
export class TimeBehavior extends Behavior {
  private readonly _ms: number;
  private _startTime: number;
  /**
   * Creates an instance of time behavior.
   * @param seconds - number of seconds to run
   * @param init - action to execute on initialization (if NULL then no action will be executed)
   * @param func - action to execute on every frame (cannot be NULL)
   * @param [pool] - optional object that implements IObjectPool interface, used for object pooling
   */
  constructor(
    seconds: number,
    private readonly init: IActionOfT<Behavior>,
    private readonly func: IActionOfT<number>,
    private readonly pool: IObjectPool = null,
  ) {
    super();
    if (!func) throw new Error('time behavior cannot have update function NULL');
    this._ms = Math.max(seconds * 1000, 0);
    this._startTime = 0;
  }
  initialize() {
    this._startTime = Date.now();
    if (this.init) this.init(this);
  }
  update() {
    const passed = Date.now() - this._startTime;
    const progress = passed / this._ms;

    const sid = this.pool ? this.pool.begin(mainBehaviorExecutor.frame) : 0;
    try {
      this.func(Math.min(progress, 1.0));
    } catch (error) {
      this.forceFinish();
      throw new Error(error);
    } finally {
      if (this.pool) this.pool.end(sid);
    }

    if (progress >= 1) {
      this.finish();
    }
  }
}
/**
 * Behavior used to skip given number of frames
 */
export class SkipFramesBehavior extends Behavior {
  private _startFrame: number;
  /**
   * Creates an instance of skip frames behavior.
   * @param numberFrames - number frames to skip
   */
  constructor(private readonly numberFrames: number) {
    super();
  }
  initialize(): void {
    this._startFrame = mainBehaviorExecutor.frame;
  }
  update(): void {
    if (mainBehaviorExecutor.frame - this._startFrame >= this.numberFrames) {
      this.finish();
    }
  }
}
/**
 * Behavior used to execute action on regular intervals
 */
export class IntervalBehavior extends Behavior {
  private _nextEndMs: number;
  private _index: number;
  /**
   * Creates an instance of interval behavior.
   * @param seconds - interval length
   * @param init - executes on initialization (if NULL then no action will be executed)
   * @param call - executes on every frame (cannot be NULL)
   * @param [pool] - optional object that implements IObjectPool interface, used for object pooling
   */
  constructor(
    private seconds: number,
    private readonly init: IIntervalBehaviorCall,
    private readonly call: IIntervalBehaviorCall,
    private readonly pool: IObjectPool = null,
  ) {
    super();
    this._nextEndMs = Date.now();
    if (!call) throw new Error('interval behavior cannot have call function NULL');
  }
  initialize(): void {
    this._index = 0;
    this.onBeforeSettingNextTime();
    this.setNextTime();
    if (this.init) this.init(this._index++, this);
  }
  update(): void {
    if (Date.now() >= this._nextEndMs) {
      const sid = this.pool ? this.pool.begin(mainBehaviorExecutor.frame) : 0;
      try {
        this.call(this._index++, this);
      } catch (error) {
        this.forceFinish();
        throw new Error(error);
      } finally {
        if (this.pool) this.pool.end(sid);
      }

      this.onBeforeSettingNextTime();
      this.setNextTime();
    }
  }
  /**
   * Redefines interval
   * @param newSeconds  new inetrval length in seconds
   */
  redefineInterval(newSeconds: number): void {
    this.seconds = newSeconds;
  }
  protected onBeforeSettingNextTime(): void {
    // override in derived class
  }
  private setNextTime(): void {
    this._nextEndMs = Date.now() + this.seconds * 1000;
  }
}
/**
 * Behavior used to execute action on intervals, with length chosen randomly from a list of options
 */
export class RandomIntervalBehavior extends IntervalBehavior {
  /**
   * Creates an instance of random interval behavior.
   * @param secondsOptions - list of interval lengths, a random one will be chosen each time
   * @param init - executes on initialization (if NULL then no action will be executed)
   * @param call - executes on every frame (cannot be NULL)
   * @param [pool] - optional object that implements IObjectPool interface, used for object pooling
   */
  constructor(
    private readonly secondsOptions: number[],
    init: IIntervalBehaviorCall,
    call: IIntervalBehaviorCall,
    pool: IObjectPool = null,
  ) {
    if (!secondsOptions || secondsOptions.length < 1)
      throw new Error(`RandomIntervalBvr secondsOptions missing`);
    super(secondsOptions[0], init, call, pool);
  }
  onBeforeSettingNextTime(): void {
    this.redefineInterval(rndOf(...this.secondsOptions));
  }
}
/**
 * Behavior used to execute update function on each frame until finish is called, has cycle length and passes to the update function the cycle progress number from 0 to 1 and the cycle index
 */
export class CycleBehavior extends Behavior {
  private _ms: number;
  private _progress: number;
  private _cycle: number;
  private _startTime: number;
  /**
   * Creates an instance of cycle behavior.
   * @param seconds - seconds length of each cycle
   * @param init - action to execute on initialization (if NULL then no action will be executed)
   * @param act - action to execute on each cycle (cannot be NULL) function parameters: 1.number cycle progress from 0 to 1, 2.index of cycle, 3 - reference to cycle behavior
   * @param [pool] - optional object that implements IObjectPool interface, used for object pooling
   */
  constructor(
    seconds: number,
    private readonly init: ICycleBehaviorCall,
    private readonly func: ICycleBehaviorCall,
    private readonly pool: IObjectPool = null,
  ) {
    super();
    this._ms = Math.max(seconds * 1000, 0);
    this._startTime = 0;
    this._progress = 0;
    this._cycle = 0;
    if (!func) throw new Error('cycle behavior cannot have update function NULL');
  }
  get progress(): number {
    return this._progress;
  }
  get cycle(): number {
    return this._cycle;
  }
  get seconds(): number {
    return this._ms * 1000;
  }
  set seconds(n: number) {
    this._ms = Math.max(n * 1000, 0);
  }
  initialize() {
    this._startTime = Date.now();
    if (this.init) this.init(0, 0, this);
  }
  update() {
    const now = Date.now();
    this._progress = (now - this._startTime) / this._ms;

    if (this._progress > 1) {
      this._startTime += this._ms;
      this._progress = (now - this._startTime) / this._ms;
      this._cycle++;
      if (this.init) {
        this.init(this._progress, this._cycle, this);
        this._progress = (now - this._startTime) / this._ms; // because _ms can be overriden in init
      }
    }
    const sid = this.pool ? this.pool.begin(mainBehaviorExecutor.frame) : 0;
    try {
      this.func(this._progress, this._cycle, this);
    } catch (error) {
      this.forceFinish();
      throw new Error(error);
    } finally {
      if (this.pool) this.pool.end(sid);
    }
  }
}
/**
 * Behavior holder - contains multiple child behaviors, if finished all child behaviors are removed
 */
export class BehaviorHolder extends Behavior {
  private _behaviors: BehaviorManager;
  constructor() {
    super();
    this._behaviors = new BehaviorManager();
  }
  /**
   * Play behavior in this behavior holder
   * @param behavior - behavior to play
   * @returns reference to the behavior being played
   */
  play<T extends Behavior>(behavior: T): T {
    this._behaviors.add(behavior);
    return behavior;
  }
  /**
   * Creates new behavior holder and plays it inside this behavior holder
   * @param previousToFinish - optional previous behavior holder to force finish
   * @returns the refefence to the newly created behavior holder
   */
  playHolder(previousToFinish?: BehaviorHolder): BehaviorHolder {
    if (previousToFinish && !previousToFinish.isFinished) previousToFinish.forceFinish();
    const holder = new BehaviorHolder();
    this._behaviors.add(holder);
    return holder;
  }
  /**
   * Creates new skip frames behavior and plays it inside this behavior holder
   * @param numberFrames - number framew to skip
   * @returns the refefence to the newly created skip gframes behavior
   */
  skipFrames(numberFrames: number): SkipFramesBehavior {
    return this.play(new SkipFramesBehavior(numberFrames));
  }
  /**
   * Executes action on the next frame
   * @param action - action to execute
   */
  onNextFrame(action: IAction): void {
    this.skipFrames(1).then(() => action());
  }
  /**
   * Creates new time behavior and plays it inside this behavior holder
   * @param seconds - seconds to call act function on each frame
   * @param act - action to execute on every frame
   * @param pool - object that implements IObjectPool interface, used for object pooling
   * @returns the reference to the newly created time behavior
   */
  playFor(seconds: number, act: IActionOfT<number>, pool: IObjectPool = null): TimeBehavior {
    return this.play(new TimeBehavior(seconds, null, act, pool));
  }
  /**
   * Creates new interval behavior and plays it inside this behavior holder
   * @param seconds - interval length in seconds
   * @param act - action to execute on each interval (cannot be NULL)
   * @param [hasInitCall] - boolean flag indicating that act function should be called before any interval
   * @returns the reference to the newly created interval behavior
   */
  playInterval(seconds: number, act: IIntervalBehaviorCall, hasInitCall = false): IntervalBehavior {
    return this.play(new IntervalBehavior(seconds, hasInitCall ? act : null, act));
  }
  /**
   * Creates new interval behavior and plays it inside this behavior holder
   * @param seconds - interval length in seconds
   * @param init - initialization function to call before any interval (if NULL then no action will be executed)
   * @param act - action to execute on each interval (cannot be NULL)
   * @returns the reference to the newly created interval behavior
   */
  initAndPlayInterval(
    seconds: number,
    init: IIntervalBehaviorCall,
    act: IIntervalBehaviorCall,
  ): IntervalBehavior {
    return this.play(new IntervalBehavior(seconds, init, act));
  }
  /**
   * Creates new random interval behavior and plays it inside this behavior holder
   * @param secondsOptions - list of interval lengths, a random one will be chosen each time
   * @param act - action to execute on each interval (cannot be NULL)
   * @param [hasInitCall] - boolean flag indicating that act function should be called before any interval
   * @returns the reference to the newly created random interval behavior
   */
  playRandomIntervals(
    secondsOptions: number[],
    act: IIntervalBehaviorCall,
    hasInitCall = false,
  ): RandomIntervalBehavior {
    return this.play(new RandomIntervalBehavior(secondsOptions, hasInitCall ? act : null, act));
  }
  /**
   * Creates new random interval behavior and plays it inside this behavior holder
   * @param secondsOptions - list of interval lengths, a random one will be chosen each time
   * @param init - initialization function to call before any interval (if NULL then no action will be executed)
   * @param act - action to execute on each interval (cannot be NULL)
   * @returns the reference to the newly created random interval behavior
   */
  initAndPlayRandomIntervals(
    secondsOptions: number[],
    init: IIntervalBehaviorCall,
    act: IIntervalBehaviorCall,
  ): RandomIntervalBehavior {
    return this.play(new RandomIntervalBehavior(secondsOptions, init, act));
  }
  /**
   * Creates new time behavior and plays it inside this behavior holder
   * @param seconds - seconds to call act function on each frame
   * @param init - initialization function to call before any other call (if NULL then no action will be executed
   * @param act - action to execute on each frame (cannot be NULL)
   * @param [pool] - optional object that implements IObjectPool interface, used for object pooling
   * @returns the reference to the newly created time behavior
   */
  initAndPlayFor(
    seconds: number,
    init: IActionOfT<Behavior>,
    act: IActionOfT<number>,
    pool: IObjectPool = null,
  ): TimeBehavior {
    return this.play(new TimeBehavior(seconds, init, act, pool));
  }
  /**
   * Creates new wait behavior and plays it inside this behavior holder
   * @param seconds - seconds to wait
   * @returns the reference to the newly created wait behavior
   */
  waitFor(seconds: number): WaitBehavior {
    return this.play(new WaitBehavior(seconds));
  }
  /**
   * Creates new cycle behavior and plays it inside this behavior holder
   * @param seconds - seconds length of each cycle
   * @param act - action to execute on each cycle (cannot be NULL) function parameters: 1.number cycle progress from 0 to 1, 2.index of cycle, 3 - reference to cycle behavior
   * @param [pool] - optional object that implements IObjectPool interface, used for object pooling
   * @returns the reference to the newly created cycle behavior
   */
  playCycles(seconds: number, act: ICycleBehaviorCall, pool: IObjectPool = null): CycleBehavior {
    return this.play(new CycleBehavior(seconds, null, act, pool));
  }

  /**
   * Creates new cycle behavior with cycle length 1 second and plays it inside this behavior holder
   * @param init - initialization function to call before any cycle (can be NULL)
   * @param act - action to execute on each cycle (cannot be NULL) function parameters: 1.number cycle progress from 0 to 1, 2.index of cycle, 3 - reference to cycle behavior
   * @param [pool] - optional object that implements IObjectPool interface, used for object pooling
   * @returns the reference to the newly created cycle behavior
   */
  initAndPlayEndless(
    init: ICycleBehaviorCall,
    act: ICycleBehaviorCall,
    pool: IObjectPool = null,
  ): CycleBehavior {
    return this.play(new CycleBehavior(1, init, act, pool));
  }
  /**
   * Creates new cycle behavior and plays it inside this behavior holder
   * @param seconds - seconds to call act function on each frame
   * @param init - initialization function to call before any other call (if NULL then no action will be executed)
   * @param act - action to execute on each cycle (cannot be NULL) function parameters: 1.number cycle progress from 0 to 1, 2.index of cycle, 3 - reference to cycle behavior
   * @param [pool] - optional object that implements IObjectPool interface, used for object pooling
   * @returns the reference to the newly created cycle behavior
   */
  initAndPlayCycles(
    seconds: number,
    init: ICycleBehaviorCall,
    act: ICycleBehaviorCall,
    pool: IObjectPool = null,
  ): CycleBehavior {
    return this.play(new CycleBehavior(seconds, init, act, pool));
  }
  /**
   * Creates new cycle behavior with cycle length 1 second and plays it inside this behavior holder
   * @param act - action to execute on each cycle (cannot be NULL) function parameters: 1.number cycle progress from 0 to 1, 2.index of cycle, 3 - reference to cycle behavior
   * @param [pool] - optional object that implements IObjectPool interface, used for object pooling
   * @returns the reference to the newly created cycle behavior
   */
  playEndless(act: ICycleBehaviorCall, pool: IObjectPool = null): CycleBehavior {
    return this.playCycles(1, act, pool);
  }
  /**
   * Invokes update on all child behaviors
   */
  update(): void {
    this._behaviors.update();
  }
  /**
   * Finishes the holder and invokes finish on all child behaviors
   */
  finish(): void {
    super.finish();
    this._behaviors.finish();
  }
  /**
   * Force finishes the holder (cancelling all follow up actions) and invokes force finish on all child behaviors
   */
  forceFinish(): void {
    // the order is important, first children then the parent
    this._behaviors.forceFinish();
    super.forceFinish();
  }

  /**
   * Forces finish child behaviors marked with the given label
   * @param label - label of child behaviors to be forced to finish
   * @returns reference to this holder
   */
  forceFinishBehaviorsWithLabel(label: string): BehaviorHolder {
    this._behaviors.forceFinishBehaviorsWithLabel(label);
    return this;
  }
  /**
   * Gets number behaviors within this behavior holder
   */
  get numberBehaviors(): number {
    return this._behaviors.numberBehaviors;
  }
}
