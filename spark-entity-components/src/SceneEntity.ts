/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Diagnostics from 'Diagnostics';
import Reactive from 'Reactive';
import Scene from 'Scene';
import {SceneEntityComponent, SceneEntityComponentState} from './SceneEntityComponent';
import {SceneEntityManager} from './SceneEntityManager';
import {FrameUpdateInfo, ValueSubscription} from './SceneEntityFrameCallback';
import {hasFunction, invokeIfExists} from './SceneEntityFunctionsUtil';

/**
 * State of the scene entity.
 * This should usually be insync with the state of the scene object attached. But
 * if the entity is attached later, this can have create etc called lazily
 */
export enum SceneEntityState {
  UNSET,
  CREATING,
  CREATED,
  STARTING,
  STARTED,
  DESTROYED,
}

/**
 * Class which wraps around the Scene Object and allows adding components
 * which receive create/inframe callbacks
 * Do not use constructor to create new objects. Instead use the static getter
 */
export class SceneEntity {
  /**
   * Returns or creates a shared instance. This allows you to have multiple holders of the
   * same scene object with components and hence access the components
   * @param sceneObject the scene object
   * @returns the scene object with component
   */
  static create(sceneObject: SceneObjectBase): SceneEntity {
    const existing = SceneEntityManager.instance.getEntityById(sceneObject.identifier);
    if (existing) {
      return existing;
    }
    const newInstance = new SceneEntity(sceneObject);
    SceneEntityManager.instance.onEntityUpdate(newInstance);
    return newInstance;
  }

  /**
   * Uses the Scene.root.findFirst method to obtain the first occurrence of scene object with given name, and create or reuse a shared entity
   * Returns null if none was found
   * @returns Scene Entity
   */
  static async findFirst(name: string, config?: {recursive: boolean}): Promise<SceneEntity> {
    const sceneObject = await Scene.root.findFirst(name, config);
    return sceneObject == null ? null : SceneEntity.create(sceneObject);
  }

  /**
   * Uses the Scene.root.findByPath method to all occurrences of scene objects matching the path query,
   * and create or reuse a shared entity for all returned.
   * Returns empty array if none was found.
   */
  static async findByPath(
    pathQuery: string,
    config?: {limit: number},
  ): Promise<Array<SceneEntity>> {
    const allSceneObjects = await Scene.root.findByPath(pathQuery, config);
    return allSceneObjects.map(sceneObject => SceneEntity.create(sceneObject));
  }

  /**
   * Uses the Scene.root.findAll method to obtain all of the scene objects with given name,
   * and create or reuse a shared entity for all returned.
   * Returns empty array if none was found
   */
  static async findAll(name: string, config?: {recursive: boolean}): Promise<Array<SceneEntity>> {
    const allSceneObjects = await Scene.root.findAll(name, config);
    return allSceneObjects.map(sceneObject => SceneEntity.create(sceneObject));
  }

  // The underlying scene object instance
  private _sceneObject: SceneObjectBase;
  // The list of behaviour components attached to the scene object
  private _components: SceneEntityComponent[];
  // The visibility of the scene object in the last frame
  private _activeSelf: boolean;
  // The visibility of the scene object in the hierarchy
  private _activeInHierarchy: boolean;
  // The subsciption which holds the value of whether the scene object is visible or not
  public isHiddenSignal: ValueSubscription<boolean>;
  // The state of the scene entity
  private _state: SceneEntityState;
  // The scene entity has been destroyed
  private _destroyed: boolean;

  constructor(sceneObject: SceneObjectBase) {
    this._sceneObject = sceneObject;
    this._state = SceneEntityState.UNSET;
    this._components = [];
    this._activeSelf = false;
    this._activeInHierarchy = true;
    this._destroyed = false;
    this.isHiddenSignal = null;
  }

  /**
   * The underlying scene object instance
   */
  get sceneObject(): SceneObjectBase {
    return this._sceneObject;
  }

  /**
   * The identifier for the underlying scene object
   */
  get identifier(): string {
    return this._sceneObject.identifier;
  }

  /**
   * Returns the list of behaviour components attached to the scene object
   */
  get components(): SceneEntityComponent[] {
    return this._components;
  }

  /**
   * Returns if the scene object is visible in the last known state (by itself)
   */
  get activeSelf(): boolean {
    return this._activeSelf;
  }

  /**
   * The children entities of the scene entity. This will only work if the loadSceneGraph is enabled on the SceneEntityManager
   */
  get children(): Array<SceneEntity> {
    return SceneEntityManager.instance.getEntitySceneChildren(this.identifier);
  }

  /**
   * Returns if the scene object is visible in the last know state in hierarchy (self and through parents)
   */
  get isVisible(): boolean {
    return this._activeSelf && this._activeInHierarchy;
  }

  /*
   * The state of the scene entity object
   */
  get state(): SceneEntityState {
    return this._state;
  }

  /**
   * Called by the manager when the scene entity is to be created
   */
  async create(): Promise<void> {
    this._state = SceneEntityState.CREATING;
    await Promise.all(this._components.map(component => component.create()));
    await Promise.all(this.children.map(child => child.create()));
    this.ensureCreationState();
  }

  /**
   * Checks if all components have been created correctly. Any uncreated components will be created
   * Useful when some components support "_manageCreationState", and lazily added components.
   * @returns if the scene object is still creating
   */
  ensureCreationState(): boolean {
    const unsetComponents = this._components.filter(
      c => c.state == SceneEntityComponentState.UNSET,
    );
    // Likely a new component got added
    if (unsetComponents.length > 0) {
      unsetComponents.forEach(c => c.create());
      return true;
    }

    // Still creating some components
    if (this._components.some(c => c.state == SceneEntityComponentState.CREATING)) {
      return true;
    }

    if (this.children.some(child => child.ensureCreationState())) {
      // Still creating some children
      return true;
    }
    // Everything is created
    if (this.state == SceneEntityState.CREATING) {
      this._state = SceneEntityState.CREATED;
    }
    return false;
  }

  /**
   * Called by the manager when the scene entity is to be started
   */
  async start(): Promise<void> {
    if (this._state === SceneEntityState.UNSET) {
      await this.create();
    }
    this._state = SceneEntityState.STARTING;
    this.startPending();
    await Promise.all(this.children.map(child => child.start()));
    this._state = SceneEntityState.STARTED;
  }

  async startPending(): Promise<void> {
    await Promise.all(
      this.children
        .filter(child => child.state === SceneEntityState.UNSET)
        .map(child => child.start()),
    );
    await Promise.all(
      this.children
        .filter(child => child.state === SceneEntityState.STARTED)
        .map(child => child.startPending()),
    );
  }

  /**
   * Called by the manager on frame whether the scene object is visible or not
   */
  onFrame(frameUpdateInfo: FrameUpdateInfo): void {
    // The scene object is not visible in hierarchy. No onFrame callback is needed
    if (!this._activeInHierarchy) {
      return;
    }

    // Call enable or disable depending on whether the visibility change of the scene object
    // Hierarchical effects will automatically be handled by enableInHierarchy methods
    const enabledComponents = this._components.filter(
      component => component.state === SceneEntityComponentState.CREATED && component.enabled,
    );
    const currentVisibility = this._activeSelf;
    const newVisibility = this.isHiddenSignal && !this.isHiddenSignal.value;
    if (currentVisibility !== newVisibility) {
      enabledComponents.forEach(component =>
        invokeIfExists(component, newVisibility ? 'onEnable' : 'onDisable'),
      );
      this.children.forEach(child => child.enableInHierarchy(newVisibility));
      if (this._destroyed) {
        this._triggerDestruction();
      }
    }
    this._activeSelf = newVisibility;

    // Call on frame on components if the scene object is visible
    if (this._activeSelf) {
      this.children.forEach(child => child.onFrame(frameUpdateInfo));
    }
  }

  /**
   * Called by the parent scene entity when the scene entity is not visible in hierarchy or otherwise
   */
  enableInHierarchy(isEnabled: boolean): void {
    const currentVisibility = this.isHiddenSignal && !this.isHiddenSignal.value;
    if (!currentVisibility) {
      // No need to act since nothing would matter
      return;
    }

    this._activeInHierarchy = isEnabled;
    const enabledComponents = this._components.filter(
      component => component.state === SceneEntityComponentState.CREATED && component.enabled,
    );
    enabledComponents.forEach(component =>
      invokeIfExists(component, isEnabled ? 'onEnable' : 'onDisable'),
    );
    this.children.map(child => child.enableInHierarchy(isEnabled));
  }

  /**
   * Returns the behaviour component attached to a scene object if it is present
   * @param type the type of the behaviour component to be returned
   * @returns the behaviour component if it exists or null
   */
  getComponent<T extends SceneEntityComponent>(type: new () => T): T {
    return (this._components.find(component => component instanceof type) as T) || null;
  }

  /**
   * Returns the behaviour component attached to a scene object, if present, which has
   * the same classname as specified.
   * @param className the name of the component class required
   * @returns the behaviour component if it exists or null
   */
  getComponentByClassName(className: string): SceneEntityComponent {
    return this._components.find(component => component.constructor.name == className) || null;
  }

  /**
   * Returns all the behaviour components attached to a scene object, if present, which
   * contain a functionname specified
   * @param type the type of the behaviour component to be returned
   * @returns the behaviour component if it exists or null
   */
  getComponentByFunction(functionName: string): Array<SceneEntityComponent> {
    return this._components.filter(component => hasFunction(component, functionName));
  }

  /**
   * Returns the behaviour component attached to a scene object if it is present or adds a new one and returns instance
   * @param type the type of the behaviour component to be returned
   * @param factory optional factory for creating a scene entity component of the type
   * @returns the behaviour component present or a new instance attached
   */
  getOrAddComponent<T extends SceneEntityComponent>(type: new () => T, factory?: () => T): T {
    const existing = this.getComponent(type);
    if (existing) {
      return existing;
    }
    return factory == null ? this.addComponentOfType(type) : this.addComponent(factory());
  }

  /**
   * Returns the behaviour component attached to a scene object if it is present or adds a new one and returns instance
   * @param className the class name of the behaviour component to be returned
   * @param factory factory for creating a scene entity component of the type
   * @returns the behaviour component present or a new instance attached
   */
  getOrAddComponentByClassName(
    className: string,
    factory: () => SceneEntityComponent,
  ): SceneEntityComponent {
    const existing = this.getComponentByClassName(className);
    if (existing) {
      return existing;
    }
    return this.addComponent(factory());
  }

  /**
   * Adds a behaviour component to the scene object
   * @param instance the instance of the behaviour component to be added
   * @returns the behaviour component added
   * @throws error if a component of the same type is already present
   */
  addComponent<T extends SceneEntityComponent>(instance: T): T {
    if (this.getComponentByClassName(instance.constructor.name) != null) {
      throw new Error(
        'Cannot add component of a type which is already present. Call removeComponent before adding new component',
      );
    }

    instance.attachToSceneObject(this);
    this._components.push(instance);

    SceneEntityManager.instance.onEntityUpdate(this);
    return instance;
  }

  /**
   * Adds a behaviour component of the given type to the scene object
   * @param type the type of the behaviour component to be added
   * @returns the behaviour component added
   * @throws error if a component of the same type is already present
   */
  addComponentOfType<T extends SceneEntityComponent>(type: new () => T): T {
    return this.addComponent(new type());
  }

  /**
   * Removes the behaviuour component of the given type from the scene object if present
   * @param type the type of the behaviour component to be removed
   * @returns the behaviour component if it existed or null
   */
  removeComponent<T extends SceneEntityComponent>(type: new () => T): T {
    const index = this._components.findIndex(component => component instanceof type);
    if (index == -1) {
      return null;
    }

    // Not a user input
    // eslint-disable-next-line security/detect-object-injection
    const component = this._components[index];
    this._components.splice(index, 1);

    SceneEntityManager.instance.onEntityUpdate(this);
    return component as T;
  }

  /**
   * Removes the behaviuour component of the given class from the scene object if present
   * @param className the name of the class of the behaviour component to be removed
   * @returns the behaviour component if it existed or null
   */
  removeComponentByClassName(className: string): SceneEntityComponent {
    const index = this._components.findIndex(component => component.constructor.name == className);
    if (index == -1) {
      return null;
    }

    // Not a user input
    // eslint-disable-next-line security/detect-object-injection
    const component = this._components[index];
    this._components.splice(index, 1);

    SceneEntityManager.instance.onEntityUpdate(this);
    return component;
  }

  /**
   * Sets the visiblity and "active" state of the scene entity.
   * @param active the new active state of the component
   */
  setActive(active: boolean): void {
    this.sceneObject.hidden = Reactive.val(!active);
  }

  /**
   * 'Destroy' the current scene entity.
   * - Hide a scene entity created from a SceneObject, and call the onDisable and onDestroy functions on it.
   * - Hide a scene entity created from a Block/Prefab, call the onDisable and onDestroy functions, and destroy/pool the underlying scene object.
   *
   * A destroyed scene entity cannot be reused, and you should create a new instance from the same scene object if possible.
   */
  destroy(): void {
    const activeOnStart = this.isVisible;
    this._destroyed = true;
    this.setActive(false);
    this.children.forEach(c => c.destroy());

    // Already not active. Can destroy immediately, since onFrame/onDisable will not be called anyways.
    if (!activeOnStart) {
      this._triggerDestruction();
    }
  }

  /**
   * Trigger the actual functionality of destroying a scene entity and it's children
   */
  protected _triggerDestruction(): void {
    this.components.forEach(c => invokeIfExists(c, 'onDestroy'));
    this.children.forEach(c => c._triggerDestruction());
    SceneEntityManager.instance.forgetEntity(this.identifier);

    // Reset state, since this scene object can be re-used
    this.components.length = 0;
    this._state = SceneEntityState.UNSET;
  }

  /**
   * Log information to the diagnostics console, to help debug, along with additional information about the component
   * @param message
   */
  public logStats(message: string) {
    Diagnostics.log(`[${this.identifier}][${this.state}] ${message}`);
  }
}
