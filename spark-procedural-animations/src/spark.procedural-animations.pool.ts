/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/**
 * Spark Procedural Animations - Object Pool
 * version 0.9.4
 */

import {IActionOfT, IUpdatable} from './spark.procedural-animations.core';

export enum PoolObjType {
  V2 = 'V2',
  V3 = 'V3',
  Qt = 'Qt',
  PostSolveAction = 'PostSolveAction',
}
/**
 * Interface used for object pooling
 */
export interface IObjectPool extends IUpdatable {
  /**
   * invoke to mark beginning of scope
   * @param scopeId - the ID of the scope, pass frame number
   * @returns scope id
   */
  begin(scopeId: number): number;
  /**
   * Invoke to mark en of scope
   * @param scopeId - the ID of the scope, returned from begin method
   */
  end(scopeId: number): void;
  /**
   * returns object from the pool of the requested type
   * @param type - type of the object
   * @returns object
   */
  getObj(type: PoolObjType): any;
  /**
   * sets object to the pool of the requested type
   * @param type - type of the object
   * @param object
   */
  setObj(type: PoolObjType, obj: any): void;
  /**
   * Throws error if open scope is not matching the current
   * @param scopeId
   */
  verifyScope(scopeId: number): void;
  /**
   * Flag indicating if the scope is active, i.e. open
   */
  get isActive(): boolean;
  /**
   * Scope ID, NaN if no scope is open
   */
  get scopeId(): number;
  /**
   * Enable or disable the puul
   */
  enabled: boolean;
}
class PoolObjList {
  index: number;
  public readonly objects: any[];
  constructor() {
    this.index = 0;
    this.objects = [];
  }
}
export class ObjectPoolManager implements IObjectPool {
  private _scopeId: number;
  private readonly _pool: {[key: string]: PoolObjList};
  private readonly _lists: PoolObjList[];
  enabled: boolean;
  constructor() {
    this._scopeId = NaN;
    this.enabled = true;
    this._pool = {};
    this._lists = [];
    this.resetScope();
  }
  /**
   * Flag indicating if the scope is active, i.e. open
   */
  get isActive(): boolean {
    return !isNaN(this._scopeId);
  }
  /**
   * Scope ID, NaN if no scope is open
   */
  get scopeId(): number {
    return this._scopeId;
  }
  /**
   * Throws error if open scope is not matching the current
   * @param scopeId
   */
  verifyScope(scopeId: number): void {
    if (!this.enabled) return;
    if (isNaN(scopeId)) return; // the object has no scope
    if (scopeId == this._scopeId) return; // the object has current
    if (isNaN(this._scopeId))
      throw new Error(`Object with scope ${scopeId} is used outside of scope`);
    throw new Error(`Object with scope ${scopeId} is used in wrong scope ${this._scopeId}`);
  }
  /**
   * invoke to mark beginning of scope
   * @param scopeId - the ID of the scope, pass frame number
   * @returns scope id
   */
  begin(scopeId: number): number {
    if (!this.enabled) return NaN;
    if (this.isActive) return this._scopeId; // we already have opened scope
    this._scopeId = scopeId;
    return scopeId;
  }
  /**
   * Invoke to mark en of scope
   * @param scopeId - the ID of the scope, returned from begin method
   */
  end(scopeId: number): void {
    if (this._scopeId != scopeId) return; // currently opened scope is different
    this._scopeId = NaN;
  }
  /**
   * returns object from the pool of the requested type
   * @param type - type of the object
   * @returns object
   */
  getObj(type: PoolObjType): any {
    const list = this.ensureList(type);
    const ob = this.getNext(list.objects, list.index + 1);
    if (ob) ++list.index;
    return ob;
  }
  /**
   * sets object to the pool of the requested type
   * @param type - type of the object
   * @param object
   */
  setObj(type: PoolObjType, obj: any): void {
    const list = this.ensureList(type);
    list.objects.push(obj);
    ++list.index;
  }
  /**
   * Marks and of frame
   */
  update(): void {
    this.onEndOfFrame();
  }
  private ensureList(type: PoolObjType): PoolObjList {
    let list = this._pool[type];
    if (!list) {
      list = new PoolObjList();
      this._lists.push(list);
      this._pool[type] = list;
    }
    return list;
  }
  private onEndOfFrame(): void {
    this.resetScope();
  }
  private ensureScopeIsActive(): void {
    if (!this.isActive) throw new Error(`Expecting scope to be opened.`);
  }
  private resetScope(): void {
    for (const e of this._lists) {
      e.index = -1;
    }
  }
  private getNext(arr: any[], index: number): any {
    this.ensureScopeIsActive();
    if (index >= arr.length) return null;
    return arr[index];
  }
}
export const objPool: IObjectPool = new ObjectPoolManager();
export class PostSolveAction {
  private _scopeId: number;
  private constructor(private _t: number, private _action: IActionOfT<number>) {
    this._scopeId = NaN;
  }
  /**
   * Creates post solve action
   * @param tNum - number to pass to function (usually progress)
   * @param act - action to execute after IK is solved
   */
  static create(tNum: number, act: IActionOfT<number>): PostSolveAction {
    if (objPool && objPool.isActive) {
      let psa = <PostSolveAction>objPool.getObj(PoolObjType.PostSolveAction);
      if (!psa) {
        psa = new PostSolveAction(tNum, act);
        objPool.setObj(PoolObjType.PostSolveAction, psa);
      } else {
        psa._t = tNum;
        psa._action = act;
      }
      return psa.setScope(objPool.scopeId);
    }
    return new PostSolveAction(tNum, act);
  }
  /**
   * Creates permanent post solve action, i.e. not recycled by pool
   * @param tNum - number to pass to function (usually progress)
   * @param act - action to execute after IK is solved
   */
  static createPermanent(tNum: number, act: IActionOfT<number>): PostSolveAction {
    return new PostSolveAction(tNum, act);
  }
  /**
   * Clones as permanent post solve action, i.e. not recycled by pool
   */
  get permanent(): PostSolveAction {
    return PostSolveAction.createPermanent(this._t, this._action);
  }
  /**
   * Gets number to pass to function (usually progress)
   */
  get t(): number {
    objPool.verifyScope(this._scopeId);
    return this._t;
  }
  /**
   * Gets action to execute after IK is solved
   */
  get action(): IActionOfT<number> {
    objPool.verifyScope(this._scopeId);
    return this._action;
  }
  /**
   * Sets current scope ID
   * @param scopeId - scope ID
   * @returns reference to iself
   */
  setScope(scopeId: number): PostSolveAction {
    this._scopeId = scopeId;
    return this;
  }
}
