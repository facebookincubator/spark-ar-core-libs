/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {expect, test, jest, beforeEach} from '@jest/globals';
import {SceneEntityManager, SceneEntityManagerState} from '../src/SceneEntityManager';
import {SceneEntityFrameUpdateListener} from '../src/SceneEntityFrameCallback';
import {SceneEntity} from '../src/SceneEntity';
import {resetMockOverrides, addMockOverride} from '../mocks/mocks.js';

jest.mock('../src/SceneEntityFrameCallback');
jest.mock('../src/SceneEntity');

beforeEach(() => {
  (SceneEntityManager['_instance'] as any) = null;
  resetMockOverrides();
});

test('Just created scene entity manager should have state UNSET', () => {
  const manager = new SceneEntityManager();
  expect(manager.state).toBe(SceneEntityManagerState.UNSET);
});

test('When run manager without loadSceneGraph - it should subscribe to onFrame and set state to Created', async () => {
  const subscribeMock = jest.fn();
  SceneEntityFrameUpdateListener['instance'] = {
    registerCallback: subscribeMock,
  };

  // when manager run
  await SceneEntityManager.run();

  // then manager state is Created and subscription called
  expect(SceneEntityManager.instance.state).toBe(SceneEntityManagerState.CREATED);
  expect(subscribeMock).toBeCalled();
});

test('When run manager that was already run - should throw error', async () => {
  const subscribeMock = jest.fn();
  SceneEntityFrameUpdateListener['instance'] = {
    registerCallback: subscribeMock,
  };

  // given manager run
  await SceneEntityManager.run();

  let runError;
  // when run manager again
  try {
    await SceneEntityManager.run();
  } catch (error) {
    runError = error;
  }

  // then error should be thrown
  expect(runError).toBeDefined();
});

test('When run manager with loadSceneGraph - it should create full shadow scene graph', async () => {
  const subscribeMock = jest.fn();
  SceneEntityFrameUpdateListener['instance'] = {
    registerCallback: subscribeMock,
  };

  const childSceneObject = {
    identifier: 'child',
    findByPath: jest.fn().mockImplementation(() => []),
  };
  addMockOverride('Scene.root.findByPath').mockImplementationOnce(() => [childSceneObject]);

  // when manager run
  await SceneEntityManager.run({loadSceneGraph: true});

  // then manager state is Created and subscription called
  expect(SceneEntityManager.instance.state).toBe(SceneEntityManagerState.CREATED);
  expect(subscribeMock).toBeCalled();
  // recursively child scene object should be called
  expect(childSceneObject.findByPath).toBeCalled();
  // in the shadow scene graph there should be root and child found
  expect(SceneEntityManager.instance['_sceneGraphRoot'].get('root')).toBeDefined();
  expect(SceneEntityManager.instance['_sceneGraphRoot'].get('child')).toBeDefined();
  expect(SceneEntityManager.instance['_sceneGraphRoot'].get('nochild')).toBeUndefined();

  // child entity should be created
  expect(SceneEntity.create).toBeCalledTimes(1);
});

test('When call entity update with entity that is not registered - register it', async () => {
  const subscribeMock = jest.fn();
  SceneEntityFrameUpdateListener['instance'] = {
    registerCallback: subscribeMock,
  };

  const newSceneEntity = {
    identifier: 'newSceneObject',
  };

  // when update entity
  await SceneEntityManager.instance.onEntityUpdate(newSceneEntity as any);

  // then new entity was added to registry
  expect(SceneEntityManager.instance['_sceneEntities'].get('newSceneObject')).toBe(newSceneEntity);
  expect(SceneEntityManager.instance.getEntityById('newSceneObject')).toBe(newSceneEntity);
  expect(SceneEntityManager.instance.getEntityById('nonExistingObject')).toBeNull();
});

test('When request children of the entity - they are returned', async () => {
  const subscribeMock = jest.fn();
  SceneEntityFrameUpdateListener['instance'] = {
    registerCallback: subscribeMock,
  };

  // given there is one child of the root
  const childSceneEntity = {
    identifier: 'child',
  };
  SceneEntityManager.instance['_sceneGraphRoot'] = new Map();
  SceneEntityManager.instance['_sceneGraphRoot'].set('root', ['child']);
  SceneEntityManager.instance['_sceneGraphRoot'].set('child', []);
  await SceneEntityManager.instance.onEntityUpdate(childSceneEntity as any);

  // then root should have 1 child
  expect(SceneEntityManager.instance.getEntitySceneChildren('root').length).toBe(1);
  expect(SceneEntityManager.instance.getEntitySceneChildren('root')[0]).toBe(childSceneEntity);
});

test('When call forget entity - it shouldnt be found', async () => {
  const subscribeMock = jest.fn();
  SceneEntityFrameUpdateListener['instance'] = {
    registerCallback: subscribeMock,
  };

  const newSceneEntity = {
    identifier: 'newSceneObject',
  };

  // when update entity
  await SceneEntityManager.instance.onEntityUpdate(newSceneEntity as any);

  // then new entity was added to registry
  expect(SceneEntityManager.instance['_sceneEntities'].get('newSceneObject')).toBe(newSceneEntity);
  expect(SceneEntityManager.instance.getEntityById('newSceneObject')).toBe(newSceneEntity);
  expect(SceneEntityManager.instance.getEntityById('nonExistingObject')).toBeNull();

  // when we forget it
  SceneEntityManager.instance.forgetEntity('newSceneObject');
  // then new entity was added to registry
  expect(SceneEntityManager.instance['_sceneEntities'].get('newSceneObject')).toBeUndefined();
  expect(SceneEntityManager.instance.getEntityById('newSceneObject')).toBeNull();
});

test('When call notify child added - a child should be added under the parent', () => {
  const subscribeMock = jest.fn();
  SceneEntityFrameUpdateListener['instance'] = {
    registerCallback: subscribeMock,
  };

  const parentSceneObject = {
    identifier: 'root',
  };

  const childSceneObject = {
    identifier: 'child',
  };

  SceneEntityManager.instance['_sceneGraphRoot'] = new Map();
  SceneEntityManager.instance['_sceneGraphRoot'].set('root', []);
  SceneEntityManager.instance.onEntityUpdate(childSceneObject as any);

  // when we call notify child added
  SceneEntityManager.instance.notifyChildAdded(parentSceneObject, childSceneObject);

  // a child should be added under the parent
  expect(SceneEntityManager.instance.getEntitySceneChildren('root').length).toBe(1);
  expect(SceneEntityManager.instance.getEntitySceneChildren('root')[0]).toBe(childSceneObject);
});
