/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/**
 * Spark Procedural Animations - Messenger
 * version 0.9.4
 */

export enum SparkProcAniSysEvents {
  ensureUniqueBehavior = 'SparkProcAniSysEvents_SYS_uniqueBvr',
}
/**
 * interface for function call of messenger event, the argument can be any
 */
export interface IMessengerCall {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data: any): void;
}
export interface IMessenger {
  /**
   * Subscribe to an event
   * @param eventName unique string representation of event
   * @param call function of type IMessengerCall
   * @param subscriberId ID of the subscriber, later we can use that ID to unsubscribe from events
   */
  subscribe(eventName: string, call: IMessengerCall, subscriberId: string): void;
  /**
   * Unsubscribe subscriber from specific event
   * @param eventName unique string representation of event to unsubscribe from
   * @param subscriberId ID of the subscriber
   * @returns number of removed subscribtions
   */
  unsubscribe(eventName: string, subscriberId: string): number;
  /**
   * Unsubscribe subscriber from all events
   * @param subscriberId ID of the subscriber
   * @returns number of removed subscribtions
   */
  unsubscribeAll(subscriberId: string): number;
  /**
   * Invoke an event
   * @param eventName unique string representation of event to invoke
   * @param data any data to pass to subscriber
   * @returns number invoked subs rubscriptions
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invoke(eventName: string, data: any): number;
}
class EventSubscription {
  private _name: string;
  private _subscriberId: string;
  private _func: IMessengerCall;
  constructor(eventName: string, eventFunc: IMessengerCall, eventSubscriberId: string) {
    this._name = eventName;
    this._subscriberId = eventSubscriberId;
    this._func = eventFunc;
  }
  /**
   * name of the subscription - this is the event name
   */
  get name(): string {
    return this._name;
  }
  /**
   * ID of the subscriber
   */
  get subscriberId(): string {
    return this._subscriberId;
  }
  /**
   * function to call when the event is invoked of type IMessengerCall
   */
  get func(): IMessengerCall {
    return this._func;
  }
}
export class Messenger implements IMessenger {
  _eventsByName: {[key: string]: EventSubscription[]};
  _eventsBySubscriber: {[key: string]: EventSubscription[]};
  constructor() {
    this._eventsByName = {};
    this._eventsBySubscriber = {};
  }
  /**
   * Subscribe to an event
   * @param eventName unique string representation of event
   * @param call function of type IMessengerCall
   * @param subscriberId ID of the subscriber, later we can use that ID to unsubscribe from events
   */
  subscribe(eventName: string, call: IMessengerCall, subscriberId: string): void {
    if (!eventName) throw new Error('Missing event name when calling subscribe');
    if (!call) throw new Error('Missing func name when calling subscribe');
    if (!subscriberId) subscriberId = '__SPARK_PROC_ANI__';

    if (!this._eventsByName[eventName]) this._eventsByName[eventName] = [];
    if (!this._eventsBySubscriber[subscriberId]) this._eventsBySubscriber[subscriberId] = [];
    const ei = new EventSubscription(eventName, call, subscriberId);
    this._eventsByName[eventName].push(ei);
    this._eventsBySubscriber[subscriberId].push(ei);
  }
  /**
   * Unsubscribe subscriber from specific event
   * @param eventName unique string representation of event to unsubscribe from
   * @param subscriberId ID of the subscriber
   * @returns number of removed subscribtions
   */
  unsubscribe(eventName: string, subscriberId: string): number {
    const arr1 = this._eventsByName[eventName];
    if (!arr1) return 0;
    const newArr1 = [];
    for (let i = 0; i < arr1.length; ++i) {
      if (arr1[i].subscriberId != subscriberId) newArr1.push(arr1[i]);
    }
    if (newArr1.length == 0) delete this._eventsByName[eventName];
    else this._eventsByName[eventName] = newArr1;
    const removed = arr1.length - newArr1.length;
    const arr2 = this._eventsBySubscriber[subscriberId];
    if (arr2) {
      const newArr2 = [];
      for (let i = 0; i < arr2.length; ++i) {
        if (arr2[i].name != eventName) newArr2.push(arr2[i]);
      }
      if (newArr2.length == 0) delete this._eventsBySubscriber[subscriberId];
      else this._eventsBySubscriber[subscriberId] = newArr2;
    }
    return removed;
  }
  /**
   * Unsubscribe subscriber from all events
   * @param subscriberId ID of the subscriber
   * @returns number of removed subscribtions
   */
  unsubscribeAll(subscriberId: string): number {
    const arr1 = this._eventsBySubscriber[subscriberId];
    if (!arr1) return 0;
    let count = 0;
    for (let i = 0; i < arr1.length; ++i) {
      const eventName = arr1[i].name;
      const arr2 = this._eventsByName[eventName];
      if (arr2) {
        const newArr1 = [];
        for (let j = 0; j < arr2.length; ++j) {
          if (arr2[j].subscriberId != subscriberId) newArr1.push(arr2[j]);
          else ++count;
        }
        if (newArr1.length == 0) delete this._eventsByName[eventName];
        else this._eventsByName[eventName] = newArr1;
      }
    }
    delete this._eventsBySubscriber[subscriberId];
    return count;
  }
  /**
   * Invoke an event
   * @param eventName unique string representation of event to invoke
   * @param data any data to pass to subscriber
   * @returns number invoked subs rubscriptions
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invoke(eventName: string, data: any): number {
    const arr = this._eventsByName[eventName];
    if (!arr) return 0;
    for (let i = 0; i < arr.length; ++i) {
      arr[i].func(data);
    }
    return arr.length;
  }
}
export const mainMessenger: IMessenger = new Messenger();
/**
 * Subscribe to an event
 * @param eventName unique string representation of event
 * @param call function of type IMessengerCall
 * @param subscriberId ID of the subscriber, later we can use that ID to unsubscribe from events
 */
export function subscribe(
  eventName: string,
  call: IMessengerCall,
  subscriberId: string = null,
): void {
  mainMessenger.subscribe(eventName, call, subscriberId);
}
/**
 * Subscribe to an event and imediatelly invoke it
 * @param eventName unique string representation of event
 * @param call function of type IMessengerCall
 * @param subscriberId ID of the subscriber, later we can use that ID to unsubscribe from events
 * @returns number of invoked subscriptions
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function subscribeAndInvoke(
  eventName: string,
  call: IMessengerCall,
  subscriberId: string = null,
  data: any = null,
): number {
  mainMessenger.subscribe(eventName, call, subscriberId);
  return mainMessenger.invoke(eventName, data);
}
/**
 * Invoke an event
 * @param eventName unique string representation of event to invoke
 * @param data any data to pass to subscriber
 * @returns number invoked subscriptions
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function invoke(eventName: string, data: any = null): number {
  return mainMessenger.invoke(eventName, data);
}
/**
 * Invoke an event passed as object implementing IBaseEvent interface
 * @param eventData event object that implements IBaseEvent interface
 * @returns number invoked subscriptions
 */
export function invokeEvent(eventData: IBaseEvent): number {
  return mainMessenger.invoke(eventData.eventName, eventData);
}
/**
 * Unsubscribe subscriber from specific event
 * @param eventName unique string representation of event to unsubscribe from
 * @param subscriberId ID of the subscriber
 * @returns number of removed subscribtions
 */
export function unsubscribe(eventName: string, subscriberId: string): number {
  return mainMessenger.unsubscribe(eventName, subscriberId);
}
/**
 * Unsubscribe subscriber from all events
 * @param subscriberId ID of the subscriber
 * @returns number of removed subscribtions
 */
export function unsubscribeAll(subscriberId: string): number {
  return mainMessenger.unsubscribeAll(subscriberId);
}
/**
 * IBaseEvent - interface that contains event name and data
 */
export interface IBaseEvent {
  get eventName(): string;
}
