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
import {SceneEntityManager} from './SceneEntityManager';

/**
 * State of the scene entity component.
 * This should usually be insync with the state of the scene entity attached. But
 * if the component is attached later, this can have create etc called lazily
 */
export enum SceneEntityComponentState {
  UNSET,
  CREATING,
  CREATED,
  DESTROYED,
}

/**
 * Interface for a management for componenets to be run onFrame
 */
export interface SceneEntityComponentManager {
  addComponentToRegistry(component: SceneEntityComponent): void;
  removeComponentFromRegistry(component: SceneEntityComponent): void;
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
    this.addOrRemoveComponentToManager();
  }

  // The individual enable state of the component. This is not connected to the visibility state of the Scene Object
  private _enabled: boolean;

  // The scene object instance holding on to this component
  private _sceneEntity: SceneEntity;

  // SceneEntityComponentManager
  private _componentManager: SceneEntityComponentManager = SceneEntityManager.instance;

  // Every status change check if components need to be added or removed from manager
  private addOrRemoveComponentToManager() {
    if (this._state === SceneEntityComponentState.UNSET) {
      // There is no entity attached so no sense to check state
      return;
    }

    if (
      this._state === SceneEntityComponentState.CREATED &&
      this._enabled === true &&
      hasFunction(this, 'onFrame')
    ) {
      this._componentManager.addComponentToRegistry(this);
    } else {
      this._componentManager.removeComponentFromRegistry(this);
    }
  }

  constructor(manager: SceneEntityComponentManager) {
    this._state = SceneEntityComponentState.UNSET;
    this._enabled = true;
    this._sceneEntity = null;
    if (manager) {
      this._componentManager = manager;
    }
  }

  /**
   * Unique identifier of the component instance, looks like `sceneEntityId::componentClassName`
   * Each scene entity can have only one component of each type
   */
  get identifier(): string {
    return `${this._sceneEntity.identifier}::${this.constructor.name}`;
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

    // For the backward compatibility reasons
    await invokeAndWaitIfExists(this, 'onStart');
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

    this.addOrRemoveComponentToManager();

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
    Diagnostics.log(`[${this.identifier}][${this.state}] ${message}`);
  }

  /**
   * Checks if target component is equal to the current one
   * @param obj - target component to check
   * @returns `true` if the target component is exactly the same as current and `false` otherwise
   */
  public equals(obj: SceneEntityComponent): boolean {
    return this.identifier === obj.identifier;
  }

  /**
   * Calculates the hashCode or unique identifier for the target component
   * @param obj - target component
   * @returns
   */
  public hashCode(obj: SceneEntityComponent): string {
    return obj.identifier;
  }
}
