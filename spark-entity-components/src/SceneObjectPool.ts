/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Reactive from 'Reactive';
/**
 * Holder for information about the current frame
 */
export type PoolConfig = {
  // ..
  poolKey?: string;
  //
  poolCount?: number;
};

export class SceneObjectPool {
  private static _instance: SceneObjectPool;
  static get instance(): SceneObjectPool {
    if (!SceneObjectPool._instance) {
      SceneObjectPool._instance = new SceneObjectPool();
    }
    return SceneObjectPool._instance;
  }

  // pool counts from poolKey => count
  private _poolCounts: Map<string, number> = new Map();

  // pool of scene objects
  private _sceneObjects: Map<string, SceneObjectBase[]> = new Map();

  // factory to create scene objects
  private _factories: Map<string, (string) => SceneObjectBase> = new Map();

  register(config: PoolConfig, factory: (string) => SceneObjectBase) {
    if (config.poolKey == null) {
      return;
    }

    this._factories.set(config.poolKey, factory);
    if (config.poolCount == null || config.poolCount == 0) {
      return;
    }
    this._poolCounts.set(config.poolKey, config.poolCount);
    this._sceneObjects.set(config.poolKey, []);
  }

  async request(poolKey: string): Promise<{pooled: boolean; instance: SceneObjectBase}> {
    if (this._sceneObjects.has(poolKey)) {
      const pool = this._sceneObjects.get(poolKey);
      if (pool.length > 0) {
        const sceneObject = pool.pop();
        this._sceneObjects.set(poolKey, pool);
        sceneObject.hidden = Reactive.val(false);
        return Promise.resolve({
          pooled: true,
          instance: sceneObject,
        });
      }
    }
    if (this._factories.has(poolKey)) {
      const sceneObject = await this._factories.get(poolKey)(poolKey);
      return Promise.resolve({
        pooled: false,
        instance: sceneObject,
      });
    }
    throw new Error('Cannot create unregistered poolable');
  }

  pool(poolKey: string, sceneObject: SceneObjectBase): boolean {
    if (!this._sceneObjects.has(poolKey)) {
      return false;
    }
    const pool = this._sceneObjects.get(poolKey);
    if (pool.length >= this._poolCounts.get(poolKey)) {
      return false;
    }
    pool.push(sceneObject);
    this._sceneObjects.set(poolKey, pool);
    return true;
  }
}
