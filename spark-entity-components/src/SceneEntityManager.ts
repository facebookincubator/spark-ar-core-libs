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

export class SceneEntityManager {
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
  // Scene entities or their components have been recently modified
  private _sceneEntitiesDirty = false;

  private _sceneGraphRoot: Map<string, string[]>;

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
  }

  private async resetSceneGraph(sceneObject: Scene | SceneObjectBase, identifier: string) {
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
  public notifyChildAdded(parent: SceneObjectBase, child: SceneObjectBase) {
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
    // If the scene graph is enabled, only send the top level scene entities
    // and recursion will call the children
    const sceneObjects =
      this._sceneGraphRoot == null
        ? [...this._sceneEntities.values()]
        : this.getEntitySceneChildren('root');

    // We are filtering the objects before so that we do not call start on the
    // same frame as the create is called.
    const uncreated = sceneObjects.filter(entity => entity.state == SceneEntityState.UNSET);
    const creating = sceneObjects.filter(entity => entity.state == SceneEntityState.CREATING);
    const unstarted = sceneObjects.filter(entity => entity.state == SceneEntityState.CREATED);
    const started = sceneObjects.filter(entity => entity.state == SceneEntityState.STARTED);

    // There are some uncreated scene objects
    uncreated.forEach(entity => entity.create());
    creating.forEach(entity => entity.ensureCreationState());

    // We have yet finished creating all the scene objects atleast once.
    if (
      this._state == SceneEntityManagerState.CREATING &&
      (uncreated.length != 0 || creating.length != 0)
    ) {
      return;
    }

    this._state = SceneEntityManagerState.CREATED;
    unstarted.forEach(entity => entity.start());

    // Can avoid expensive await call to start pending if there are no changes
    // that happened to components recently
    if (this._sceneEntitiesDirty) {
      await Promise.all(started.map(entity => entity.startPending()));
      this._sceneEntitiesDirty = false;
    }
    started.forEach(entity => entity.onFrame(frameUpdateInfo));
  }

  /**
   * Notifies the creation or update of components in a scene object
   * We dont want to look at the visibility of all the scene objects which have components,
   * as that can be inefficient. This keeps a minimum set of signals which really require it
   * @param trackedObject the scene object
   */
  public onEntityUpdate(trackedObject: SceneEntity): void {
    this._sceneEntitiesDirty = true;
    const sceneObjectIdentifier = trackedObject.identifier;
    if (!this._sceneEntities.has(sceneObjectIdentifier)) {
      this._sceneEntities.set(sceneObjectIdentifier, trackedObject);
    }

    const needsVisibilitySignal =
      this._sceneGraphRoot != null ||
      trackedObject.components.find(component => component.requiresVisibilitySignal()) != null;
    if (needsVisibilitySignal && trackedObject.isHiddenSignal == null) {
      // Need to start tracking visibility
      trackedObject.isHiddenSignal = SceneEntityFrameUpdateListener.instance
        .monitorSignals(new Map([['hidden', trackedObject.sceneObject.hidden]]))
        .get('hidden');
    } else if (!needsVisibilitySignal && trackedObject.isHiddenSignal != null) {
      // Can stop tracking visibility
      trackedObject.isHiddenSignal.unsubscribe();
      trackedObject.isHiddenSignal = null;
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
}
