/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Diagnostics from 'Diagnostics';
import {SceneEntity} from './SceneEntity';
import {hasFunction, invokeAndWaitIfExists, invokeIfExists} from './SceneEntityFunctionsUtil';

/**
 * State of the scene entity component.
 * This should usually be insync with the state of the scene entity attached. But
 * if the component is attached later, this can have create etc called lazily
 */
export enum SceneEntityComponentState {
  UNSET,
  CREATING,
  CREATED,
  STARTING,
  STARTED,
  DESTROYED,
}

/**
 * Component which can be added to a SceneObject and added functionality which
 * works on every frame. Can add onStart, onFrame, onEnable and onDisable
 * functions to a class inhereting this and get callbacks
 */
export class SceneEntityComponent {
  // The lifecycle state of the scene entity component
  private _internalState: SceneEntityComponentState;

  // Internal getter and setter of the state
  private get _state(): SceneEntityComponentState {
    return this._internalState;
  }

  private set _state(newState: SceneEntityComponentState) {
    this._internalState = newState;
  }

  // The individual enable state of the component. This is not connected to the visibility state of the Scene Object
  private _enabled: boolean;

  // The scene object instance holding on to this component
  private _sceneEntity: SceneEntity;

  constructor() {
    this._state = SceneEntityComponentState.UNSET;
    this._enabled = true;
    this._sceneEntity = null;
  }

  /**
   * Returns the current state of the component
   */
  get state(): SceneEntityComponentState {
    return this._state;
  }

  /**
   * Called by the manager when the component is to be created
   */
  async create(): Promise<void> {
    this._state = SceneEntityComponentState.CREATING;
    await invokeAndWaitIfExists(this, 'onCreate');
    if (!this['_manageCreationState']) {
      this._state = SceneEntityComponentState.CREATED;
    }
  }

  /**
   * Notifies when creation is complete.
   * Should only be used when has _manageCreationState and is creating the object
   */
  public onManagedCreation() {
    if (this['_manageCreationState'] && this._state == SceneEntityComponentState.CREATING) {
      this._state = SceneEntityComponentState.CREATED;
    }
  }

  /**
   * Called by the manager when the component is to be started
   */
  async start(): Promise<void> {
    if (this._state == SceneEntityComponentState.UNSET) {
      await this.create();
    }
    if (this['_manageCreationState'] && this._state == SceneEntityComponentState.CREATING) {
      // creation is not complete
      return;
    }
    if (
      this._state == SceneEntityComponentState.STARTING ||
      this._state == SceneEntityComponentState.STARTED
    ) {
      // Already started
      return;
    }
    this._state = SceneEntityComponentState.STARTING;
    await invokeIfExists(this, 'onStart');
    this._state = SceneEntityComponentState.STARTED;
  }

  /**
   * Gets the scene object instance which holds this component
   */
  public get sceneEntity(): SceneEntity {
    if (this._sceneEntity == null) {
      throw new Error('Component not attached to any scene object');
    }
    return this._sceneEntity;
  }

  /**
   * Attachs the component to the Scene Object.
   * DO NOT call this method directly, and instead use sceneObject.addComponent
   * or sceneObject.getOrAddComponent instead
   */
  public attachToSceneObject(sceneEntity: SceneEntity): void {
    if (this._sceneEntity != null && this._sceneEntity.identifier != sceneEntity.identifier) {
      throw new Error('Cannot overide the scene object attached to component');
    }
    this._sceneEntity = sceneEntity;
  }

  /**
   * If the component is selectively enabled.
   * Note, that a component can be enabled and still not receive onFrame callbacks if
   * the scene object is not visible.
   */
  public get enabled() {
    if (this._enabled == null) {
      this._enabled = true;
    }
    return this._enabled;
  }

  /**
   * Set the enable state of the component.
   * Note, that a component can be enabled and still not receive onFrame callbacks if
   * the scene object is not visible.
   */
  public set enabled(shouldEnable: boolean) {
    if (this._enabled == shouldEnable) {
      return;
    }
    this._enabled = shouldEnable;
    shouldEnable && this._sceneEntity.isVisible
      ? invokeIfExists(this, 'onEnable')
      : invokeIfExists(this, 'onDisable');
  }

  /**
   * Checks if the component needs the scene object to be aware of it's visibility.
   * This allows us to be optimal with signals
   * @returns if requires visibility
   */
  public requiresVisibilitySignal(): boolean {
    return (
      hasFunction(this, 'onEnable') ||
      hasFunction(this, 'onDisable') ||
      hasFunction(this, 'onFrame')
    );
  }

  /**
   * Log information to the diagnostics console, to help debug, along with additional information about the component
   * @param message
   */
  public logStats(message: string) {
    Diagnostics.log(
      `[${this._sceneEntity.identifier}][${this.constructor.name}][${this.state}] ${message}`,
    );
  }
}
