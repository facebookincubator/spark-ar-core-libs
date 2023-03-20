/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {expect, test, jest, beforeEach} from '@jest/globals';
import {SceneEntity, SceneEntityState} from '../src/SceneEntity';
import {SceneEntityManager} from '../src/SceneEntityManager';
import {SceneEntityComponentState, SceneEntityComponent} from '../src/SceneEntityComponent';
import Scene from 'Scene';

const mockDestroy = jest.fn();
jest.mock('Scene');
Scene.destroy = mockDestroy;

jest.mock('../src/SceneEntityManager');

class ManagerMock {
  sceneEntityToReturn: any;

  getEntityById(): any {
    return this.sceneEntityToReturn;
  }

  onEntityUpdate = jest.fn();
  getEntitySceneChildren = jest.fn();
  removeComponentFromRegistry = jest.fn();
  forgetEntity = jest.fn();
}

class SceneObjectMock {
  hiddenToReturn = false;

  get identifier(): any {
    return 'test';
  }

  get hidden(): any {
    return {
      pinLastValue: () => this.hiddenToReturn,
    };
  }
}

let mockManager = new ManagerMock();
let mockSceneObject = new SceneObjectMock();

beforeEach(() => {
  mockSceneObject = new SceneObjectMock();
  mockManager = new ManagerMock();
  SceneEntityManager['instance'] = mockManager;
});

const createNewEntityForTests = () => {
  const visibilityChangesMock = jest.fn();
  jest
    .spyOn(SceneEntity.prototype, 'subscribeToVisibilityChanges')
    .mockImplementation(visibilityChangesMock);

  // attached sceneObject is visible
  mockSceneObject.hiddenToReturn = false;

  // when create non existing entity
  const createdEntity = SceneEntity.create(mockSceneObject);
  return createdEntity;
};

test('Just created entity should have state UNSET, non visible and active in hierarchy ', () => {
  const entity = new SceneEntity(jest.fn());
  expect(entity.state).toBe(SceneEntityState.UNSET);
  expect(entity['_activeInHierarchy']).toBe(true);
  expect(entity['_activeSelf']).toBe(false);
});

test('When create entity that is already in manager then dont create new entity and return existing', () => {
  // Entiey is already existed
  const entity = new SceneEntity(jest.fn());
  mockManager.sceneEntityToReturn = entity;

  // when create entity
  const createdEntity = SceneEntity.create(jest.fn());

  // return existing one
  expect(createdEntity).toBe(entity);
});

test('When create entity that is not in manager then create new entity, subscribe to visibility changes and return it', () => {
  const visibilityChangesMock = jest.fn();
  jest
    .spyOn(SceneEntity.prototype, 'subscribeToVisibilityChanges')
    .mockImplementation(visibilityChangesMock);

  // attached sceneObject is visible
  mockSceneObject.hiddenToReturn = false;

  // when create non existing entity
  const createdEntity = SceneEntity.create(mockSceneObject);

  // it should be subscribed to visibility
  expect(visibilityChangesMock).toBeCalledTimes(1);
  // manager should be updated with the new entity
  expect(mockManager.onEntityUpdate).toBeCalledTimes(1);

  // created entity defined
  expect(createdEntity).toBeDefined();
  // created entity is active
  expect(createdEntity['_activeSelf']).toBe(true);
  // created entity's state is CREATED
  expect(createdEntity.state).toBe(SceneEntityState.CREATED);
});

test('When create entity on hidden sceneObject it should be created not active', () => {
  const visibilityChangesMock = jest.fn();
  jest
    .spyOn(SceneEntity.prototype, 'subscribeToVisibilityChanges')
    .mockImplementation(visibilityChangesMock);

  // attached sceneObject is hidden
  mockSceneObject.hiddenToReturn = true;

  // when create non existing entity
  const createdEntity = SceneEntity.create(mockSceneObject);

  // created entity defined
  expect(createdEntity).toBeDefined();
  // created entity is not active
  expect(createdEntity['_activeSelf']).toBe(false);
  expect(createdEntity['_activeInHierarchy']).toBe(true);
  // created entity's state is CREATED
  expect(createdEntity.state).toBe(SceneEntityState.CREATED);
});

test('When add component of the same class that was already added - throw exception', () => {
  // given create new entity
  const createdEntity = createNewEntityForTests();

  // create component
  const component = new SceneEntityComponent();
  // add new component to entity
  createdEntity.components.push(component);

  let errorToCheck;
  try {
    // when tryihng to add component of the same class
    createdEntity.addComponent(new SceneEntityComponent());
  } catch (error) {
    errorToCheck = error;
  }
  // should throw error
  expect(errorToCheck).toBeDefined();
});

test('When add component, its being created and returned using components property', () => {
  // given create new entity
  const createdEntity = createNewEntityForTests();
  // create component
  const component = new SceneEntityComponent();
  // mock async creation function
  component.create = jest.fn();

  // when add this component
  createdEntity.addComponent(component);

  // then new component should be found in components
  expect(createdEntity.components.at(0)).toBe(component);
  // and create function should be called on component
  expect(component.create).toBeCalledTimes(1);
});

test('When add component by classname, its being created and returned using components property', () => {
  // given create new entity
  const createdEntity = createNewEntityForTests();

  // mock async creation function
  const createFunctionMock = jest.fn();
  jest
    .spyOn(SceneEntityComponent.prototype, 'create')
    .mockImplementation(createFunctionMock as any);

  // when add this component
  const component = createdEntity.addComponentOfType(SceneEntityComponent);

  // then new component should be found in components
  expect(createdEntity.components.at(0)).toBe(component);
  // and create function should be called on component
  expect(createFunctionMock).toBeCalledTimes(1);
});

test('When getOrAdd component existing will be returned', () => {
  // given create new entity
  const createdEntity = createNewEntityForTests();
  // create component
  const component = new SceneEntityComponent();
  // mock async creation function
  component.create = jest.fn();

  // add this component
  createdEntity.addComponent(component);

  // when invoke getOrAdd
  const returnedComponent = createdEntity.getOrAddComponent(SceneEntityComponent);

  // then returned existing one
  expect(returnedComponent).toBe(component);
});

test('When getOrAdd component and no existing create new component and return', () => {
  // given create new entity
  const createdEntity = createNewEntityForTests();

  // mock async creation function
  const createFunctionMock = jest.fn();
  jest
    .spyOn(SceneEntityComponent.prototype, 'create')
    .mockImplementation(createFunctionMock as any);

  // when invoke getOrAdd
  const returnedComponent = createdEntity.getOrAddComponent(SceneEntityComponent);

  // then returned existing one
  expect(returnedComponent).toBeDefined();
  // and create function should be called on component
  expect(createFunctionMock).toBeCalledTimes(1);
});

test('When update visibility with same value - nothing should happen', () => {
  // when create new entity
  const createdEntity = createNewEntityForTests();
  // create child entity that is hidden
  const childEntity = createNewEntityForTests();

  childEntity['_activeSelf'] = false;
  mockManager.getEntitySceneChildren.mockImplementationOnce(() => [childEntity]);
  expect(childEntity).toBeDefined();

  // create component that is created and enabled and add it to the entity
  const component = new SceneEntityComponent();
  component['_enabled'] = true;
  component['_internalState'] = SceneEntityComponentState.CREATED;
  component.updateState = jest.fn();
  component.create = jest.fn();
  createdEntity.addComponent(component);

  // when update visibility with the same value
  createdEntity['updateVisibility'](true);

  // then the entity is still active
  expect(createdEntity['_activeSelf']).toBe(true);
  // child entity is still not active
  expect(childEntity['_activeSelf']).toBe(false);
  expect(childEntity['_activeInHierarchy']).toBe(true);
  // component wasnt updated
  expect(component.updateState).toBeCalledTimes(0);
});

test('When update visibility with opposite value - update activeself, children and components', () => {
  // when create new entity
  const createdEntity = createNewEntityForTests();
  createdEntity['_activeSelf'] = true;
  // create child entity that is active
  const childEntity = createNewEntityForTests();
  childEntity['_activeSelf'] = true;
  // return child for the first call and nothing for children
  mockManager.getEntitySceneChildren
    .mockImplementationOnce(() => [childEntity])
    .mockImplementationOnce(() => []);

  // create component that is created and enabled and add it to the entity
  const component = new SceneEntityComponent();
  component['_enabled'] = true;
  component['_internalState'] = SceneEntityComponentState.CREATED;
  component.updateState = jest.fn();
  component.create = jest.fn();
  createdEntity.addComponent(component);

  // when update visibility with the same value
  createdEntity['updateVisibility'](false);

  // then the entity changed to not active
  expect(createdEntity['_activeSelf']).toBe(false);
  // child entity not active in hierarchy but activeself should not change
  expect(childEntity['_activeSelf']).toBe(true);
  expect(childEntity['_activeInHierarchy']).toBe(false);

  // component was updated
  expect(component.updateState).toBeCalledTimes(1);
});

test('When visibility of the entity that is hidden by hierarchy changed - no propagation should happen', () => {
  // when create new entity which is hidden by hierarchy and hidden itself
  const createdEntity = createNewEntityForTests();
  createdEntity['_activeInHierarchy'] = false;
  createdEntity['_activeSelf'] = false;

  // create child entity that is hidden
  const childEntity = createNewEntityForTests();
  childEntity['_activeSelf'] = false;
  childEntity['_activeInHierarchy'] = false;
  mockManager.getEntitySceneChildren.mockImplementationOnce(() => [childEntity]);
  expect(childEntity).toBeDefined();

  // create component that is created and enabled and add it to the entity
  const component = new SceneEntityComponent();
  component['_enabled'] = true;
  component['_internalState'] = SceneEntityComponentState.CREATED;
  component.updateState = jest.fn();
  component.create = jest.fn();
  createdEntity.addComponent(component);

  // when make the entity visible
  createdEntity['updateVisibility'](true);

  // then the entity should become active
  expect(createdEntity['_activeSelf']).toBe(true);
  // but still hidden in hierarchy
  expect(createdEntity['_activeInHierarchy']).toBe(false);
  // no propagation should occur
  expect(childEntity['_activeSelf']).toBe(false);
  expect(childEntity['_activeInHierarchy']).toBe(false);
  // component wasnt updated
  expect(component.updateState).toBeCalledTimes(0);
});

test('When removing component from entity - it should be removed and destroyed', () => {
  // given create new entity
  const createdEntity = createNewEntityForTests();
  // create component
  const component = new SceneEntityComponent();
  component['onDestroy'] = jest.fn();
  // mock async creation function
  component.create = jest.fn();
  // added component
  createdEntity.addComponent(component);

  // when invoke getOrAdd
  createdEntity.removeComponent(SceneEntityComponent);

  // no components in entity
  expect(createdEntity.components.length).toBe(0);
  expect(component['onDestroy']).toBeCalledTimes(1);
  expect(component.state).toBe(SceneEntityComponentState.DESTROYED);
});

test('When destroy entity - all its components and children should be destroyed', () => {
  // given create new entity
  const createdEntity = createNewEntityForTests();
  createdEntity.setActive = jest.fn();

  // create child entity that is hidden
  const childEntity = createNewEntityForTests();
  childEntity.setActive = jest.fn();
  mockManager.getEntitySceneChildren
    .mockImplementationOnce(() => [childEntity])
    .mockImplementationOnce(() => []);

  // create component that is created and enabled and add it to the entity
  const component = new SceneEntityComponent();
  component['_enabled'] = true;
  component['_internalState'] = SceneEntityComponentState.CREATED;
  component.updateState = jest.fn();
  component.create = jest.fn();
  component['onDestroy'] = jest.fn();
  createdEntity.addComponent(component);

  // when destroy entity
  createdEntity.destroy();

  // the entity, its children and components should be destroyed
  expect(createdEntity.components.length).toBe(0);
  expect(component['onDestroy']).toBeCalledTimes(1);
  expect(createdEntity.state).toBe(SceneEntityState.DESTROYED);
  expect(component.state).toBe(SceneEntityComponentState.DESTROYED);
  expect(childEntity.state).toBe(SceneEntityState.DESTROYED);
  // forget main entity and it's child
  expect(mockManager.forgetEntity).toBeCalledTimes(2);
});

test('When destroy entity with destroySceneObject enabled - underlying scene object should be destroyed', () => {
  // given create new entity
  const createdEntity = createNewEntityForTests();
  createdEntity.setActive = jest.fn();

  // create child entity that is hidden
  const childEntity = createNewEntityForTests();
  childEntity.setActive = jest.fn();
  mockManager.getEntitySceneChildren
    .mockImplementationOnce(() => [childEntity])
    .mockImplementationOnce(() => []);

  // create component that is created and enabled and add it to the entity
  const component = new SceneEntityComponent();
  component['_enabled'] = true;
  component['_internalState'] = SceneEntityComponentState.CREATED;
  component.updateState = jest.fn();
  component.create = jest.fn();
  component['onDestroy'] = jest.fn();
  createdEntity.addComponent(component);

  // when destroy entity with destroySceneObject enabled
  createdEntity.destroy(true);

  // the entity, its children and components, and sceneObject should be destroyed
  expect(createdEntity.components.length).toBe(0);
  expect(component['onDestroy']).toBeCalledTimes(1);
  expect(createdEntity.state).toBe(SceneEntityState.DESTROYED);
  expect(component.state).toBe(SceneEntityComponentState.DESTROYED);
  expect(childEntity.state).toBe(SceneEntityState.DESTROYED);
  // forget main entity and it's child
  expect(mockManager.forgetEntity).toBeCalledTimes(2);
  expect(mockDestroy).toBeCalledTimes(2);
  expect(mockDestroy.mock.calls[0][0]).toBe(createdEntity.sceneObject);
  expect(mockDestroy.mock.calls[1][0]).toBe(childEntity.sceneObject);
});
