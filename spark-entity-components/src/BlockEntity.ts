/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Scene from 'Scene';
import Blocks, {BlockSceneRoot} from 'Blocks';
import {SceneEntity} from './SceneEntity';
import {SceneEntityComponent} from './SceneEntityComponent';
import {SceneEntityManager} from './SceneEntityManager';
import {SceneObjectPool} from './SceneObjectPool';

export class BlockSceneEntity extends SceneEntity {
  /**
   * Returns or creates a shared instance. This allows you to have multiple holders of the
   * same scene object with components and hence access the components
   *
   * @param sceneObject the scene object
   * @returns the scene object with component
   */
  static createFromBlock(blockName: string, sceneObject: BlockSceneRoot): BlockSceneEntity {
    const existing = SceneEntityManager.instance.getEntityById(sceneObject.identifier);
    if (existing) {
      return existing as BlockSceneEntity;
    }
    const newInstance = new BlockSceneEntity(blockName, sceneObject);
    SceneEntityManager.instance.onEntityUpdate(newInstance);
    return newInstance;
  }

  private _blockName: string;

  constructor(blockName: string, sceneObject: BlockSceneRoot) {
    super(sceneObject);
    this._blockName = blockName;
  }

  protected _triggerDestuction(): void {
    super._triggerDestuction();
    if (!SceneObjectPool.instance.pool(this._blockName, this.sceneObject)) {
      Scene.destroy(this.sceneObject);
    }
  }
}

/**
 * Factory object which wraps around a block, and on instantiation automatically adds components
 * and hooks up the scene entity to the different lifecycle methods
 */
export class BlockEntityFactory {
  private static _factories: Map<string, BlockEntityFactory> = new Map();

  /**
   * Create a new instance of the factory using a block reference
   * @param blockName The name of the block to be instantiated when created
   * @param components (Optional) The components to add to the scene entity created by default
   * @returns The factory instance
   */
  public static create(
    blockName: string,
    components?: Array<new () => SceneEntityComponent>,
    poolCount?: number,
  ): BlockEntityFactory {
    const entity = new BlockEntityFactory(blockName, components || []);
    this._factories.set(blockName, entity);
    SceneObjectPool.instance.register(
      {
        poolKey: blockName,
        poolCount: poolCount || 0,
      },
      blockName => Blocks.instantiate(blockName),
    );
    return entity;
  }

  /**
   * Gets an existing factory for a block name, or creates one without any components
   * @param reference the name of the block to be instantiated when created
   * @returns Factory instance for the block
   */
  public static get(blockName: string): BlockEntityFactory {
    return this._factories.get(blockName) || this.create(blockName);
  }

  // block name reference
  private _blockReference: string;

  // components types to add to the block on creation
  private _componentsToAdd: Array<new () => SceneEntityComponent>;

  // component factories to add to the block on creation. These preceed the default components
  private _componentFactories: Array<() => SceneEntityComponent>;

  // default parent of the block at creation time. Can be null.
  private _defaultParent: SceneObjectBase;

  private constructor(reference: string, components: Array<new () => SceneEntityComponent>) {
    this._blockReference = reference;
    this._componentsToAdd = components;
    this._componentFactories = [];
    this._defaultParent = null;
  }

  /**
   * Set a default parent for the instantiation. This is not necessary, and a parent
   * can be provided at `new(parent)` call, which will override this.
   * @param parent
   */
  public setDefaultParent(parent: SceneObjectBase) {
    this._defaultParent = parent;
  }

  /**
   * Adds a component factory which will be used to create a component when instantiating
   * @param component component type
   */
  public addComponentFactory<T extends SceneEntityComponent>(factory: () => T) {
    this._componentFactories.push(factory);
  }

  /**
   * Adds to the components which will be added to the instantiated scene object
   * @param component component type
   */
  public addComponentByType<T extends SceneEntityComponent>(component: new () => T) {
    this._componentsToAdd.push(component);
  }

  /**
   * Create a new BlockSceneEntity from the factory. The scene entity will automatically
   * have all the components attached, however the state of the components is still
   * tied to the lifecycle criterias
   * @param parent the parent to add (overrides a default parent if set)
   * @returns a promise which returns the instantiated scene entity
   */
  async new(parent?: SceneObjectBase): Promise<BlockSceneEntity> {
    const request = await SceneObjectPool.instance.request(this._blockReference);
    const parentToAdd = parent || this._defaultParent;
    if (!request.pooled && parentToAdd != null) {
      await parentToAdd.addChild(request.instance);
    }

    const entity = BlockSceneEntity.createFromBlock(this._blockReference, request.instance);
    SceneEntityManager.instance.notifyChildAdded(parentToAdd, request.instance);
    this._componentFactories.forEach(c => entity.addComponent(c()));
    this._componentsToAdd.forEach(c => entity.addComponentOfType(c));
    return entity;
  }
}
