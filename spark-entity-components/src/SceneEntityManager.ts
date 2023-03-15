/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Scene from 'Scene';
import {SceneEntityFrameUpdateListener, FrameUpdateInfo} from './SceneEntityFrameCallback';
import {SceneEntity, SceneEntityState} from './SceneEntity';
import {SceneEntityComponent, SceneEntityComponentManager} from './SceneEntityComponent';

/**
 * State of the scene entity component.
 * This should usually be insync with the state of the scene entity attached. But
 * if the component is attached later, this can have create etc called lazily
 */
export enum SceneEntityManagerState {
  UNSET,
  CREATING,
  CREATED,
}

export class SceneEntityManager implements SceneEntityComponentManager {
  private static _instance: SceneEntityManager;
  static get instance(): SceneEntityManager {
    if (!SceneEntityManager._instance) {
      SceneEntityManager._instance = new SceneEntityManager();
    }
    return SceneEntityManager._instance;
  }

  private _state: SceneEntityManagerState;
  // All the scene objects registered for lifecycle events
  private _sceneEntities: Map<string, SceneEntity>;

  private _sceneGraphRoot: Map<string, string[]>;

  // All enablemd components with onFrame
  private _activeComponents: Set<SceneEntityComponent> = new Set();

  constructor() {
    this._state = SceneEntityManagerState.UNSET;
    this._sceneEntities = new Map();
    this._sceneGraphRoot = null;
  }

  /**
   * Set up and start the loop for the scene entities. This is an explicit call to allow
   * setting up any components manually if needed
   */
  public static async run(config?: {loadSceneGraph: boolean}): Promise<void> {
    const instance = SceneEntityManager.instance;
    if (instance._state != SceneEntityManagerState.UNSET) {
      throw new Error('Trying to start an already started SceneEntityManager');
    }
    instance._state = SceneEntityManagerState.CREATING;
    if (config != null && config.loadSceneGraph) {
      instance._sceneGraphRoot = new Map();
      await instance.resetSceneGraph(Scene.root, 'root');
    }
    SceneEntityFrameUpdateListener.instance.registerCallback(instance.onFrame.bind(instance));
    instance._state = SceneEntityManagerState.CREATED;
  }

  private async resetSceneGraph(sceneObject: Scene | Scene.SceneObjectBase, identifier: string) {
    this._sceneGraphRoot.set(identifier, [] as string[]);
    const children = await sceneObject.findByPath('*');
    const addToSceneGraph = async child => {
      this._sceneGraphRoot.get(identifier).push(child.identifier);
      await this.resetSceneGraph(child, child.identifier);
      SceneEntity.create(child);
    };
    await Promise.all(children.map(child => addToSceneGraph(child)));
  }

  /**
   * Notify a child was added to a scene object. Allows maintaining the correct scene graph
   * @param parent the scene object which is the parent
   * @param child the child scene object
   */
  public notifyChildAdded(parent: Scene.SceneObjectBase, child: Scene.SceneObjectBase) {
    if (this._sceneGraphRoot == null) {
      return;
    }
    const pid = parent.identifier;
    this._sceneGraphRoot.set(pid, this._sceneGraphRoot.get(pid) || []);
    this._sceneGraphRoot.get(pid).push(child.identifier);
  }

  /**
   * Callback for the frame listener
   * @param frameUpdateInfo frame information
   */
  public async onFrame(frameUpdateInfo: FrameUpdateInfo): Promise<void> {
    this._activeComponents.forEach(component => {
      component.onFrame(frameUpdateInfo);
    });
  }

  /**
   * Notifies the creation or update of entities in a scene object
   * @param trackedObject the scene object
   */
  public onEntityUpdate(trackedObject: SceneEntity): void {
    const sceneObjectIdentifier = trackedObject.identifier;
    if (!this._sceneEntities.has(sceneObjectIdentifier)) {
      this._sceneEntities.set(sceneObjectIdentifier, trackedObject);
    }
  }

  /**
   * Returns the scene object which is registered or returns a null
   * @param identifier the scene object or null
   */
  public getEntityById(identifier: string): SceneEntity {
    return this._sceneEntities.has(identifier) ? this._sceneEntities.get(identifier) : null;
  }

  /**
   * Returns the children of the scene entity (if computed)
   * @param identifier the identifier of the scene entity
   * @returns the children array
   */
  public getEntitySceneChildren(identifier: string): Array<SceneEntity> {
    if (this._sceneGraphRoot == null || this._sceneGraphRoot.get(identifier) == null) {
      // Scene graph is not enabled, no need to send the graph information
      return [];
    }
    return this._sceneGraphRoot
      .get(identifier)
      .map(id => this.getEntityById(id))
      .filter(x => x != null);
  }

  public forgetEntity(identifier: string): void {
    this.getEntitySceneChildren(identifier).forEach(child => {
      this.forgetEntity(child.identifier);
    });
    if (this._sceneGraphRoot != null) {
      this._sceneGraphRoot.delete(identifier);
    }
    this._sceneEntities.delete(identifier);
  }

  /**
   * Called by component in order to add itself to per-frame execution registry
   * Shouldn't be called directly
   */
  public addComponentToRegistry(component: SceneEntityComponent): boolean {
    if (!this._activeComponents.has(component)) {
      this._activeComponents.add(component);
      return true;
    }
    return false;
  }

  /**
   * Called by component in order to remove itself from per-frame execution registry
   * Shouldn't be called directly
   */
  public removeComponentFromRegistry(component: SceneEntityComponent): boolean {
    if (this._activeComponents.has(component)) {
      this._activeComponents.delete(component);
      return true;
    }
    return false;
  }

  /**
   * Returns current state of the manager
   */
  public get state(): SceneEntityManagerState {
    return this._state;
  }
}
