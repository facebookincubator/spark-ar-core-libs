/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {expect, test, jest, beforeEach} from '@jest/globals';
import {SceneEntityManager} from '../src/SceneEntityManager';
import {SceneEntityComponent} from '../src/SceneEntityComponent';
import {SceneEntityFrameUpdateListener} from '../src/SceneEntityFrameCallback';
import Scene from 'Scene';

jest.mock('../src/SceneEntityFrameCallback');

class TestComponent extends SceneEntityComponent {
  onFrame = jest.fn();
  onEnable = jest.fn();
  onCreate = jest.fn();
  onDisable = jest.fn();
  onStart = jest.fn();
  onDestroy = jest.fn();
}

class TestComponentWithCustomeOnCreate extends SceneEntityComponent {
  static customOnCreate = jest.fn();
  static anotherComponent;

  onFrame = jest.fn();
  onEnable = jest.fn();
  onCreate = TestComponentWithCustomeOnCreate.customOnCreate;
  onDisable = jest.fn();
  onStart = jest.fn();
  onDestroy = jest.fn();
}

function getActiveSceneObject(identifier: string): any {
  return {
    identifier: identifier,
    findByPath: jest.fn().mockImplementation(() => []),
    hidden: {
      pinLastValue: () => false,
      monitor: () => ({
        subscribe: jest.fn(),
      }),
    },
  };
}

beforeEach(() => {
  (SceneEntityManager['_instance'] as any) = null;
});

test('Run manager on visible SceneObjects with loadScene, then add components and when call OnFrame on manager - compoenents should get onFrame', async () => {
  const subscribeMock = jest.fn();
  SceneEntityFrameUpdateListener['instance'] = {
    registerCallback: subscribeMock,
  };

  const childSceneObject1 = getActiveSceneObject('child1');
  const childSceneObject2 = getActiveSceneObject('child2');

  // Scene root returns two children
  Scene.mockRoot = {
    findByPath: jest.fn().mockImplementationOnce(() => [childSceneObject1, childSceneObject2]),
  };

  // run manager
  await SceneEntityManager.run({loadSceneGraph: true});

  const entity1 = SceneEntityManager.instance['_sceneEntities'].get('child1') as any;
  const entity2 = SceneEntityManager.instance['_sceneEntities'].get('child2');

  expect(entity1).toBeDefined();
  expect(entity2).toBeDefined();
  expect(SceneEntityManager.instance.getEntitySceneChildren('root').length).toBe(2);

  // add components
  const component1 = SceneEntityManager.instance
    .getEntityById('child1')
    .addComponentOfType(TestComponent);
  const component2 = SceneEntityManager.instance
    .getEntityById('child2')
    .addComponentOfType(TestComponent);

  // components created callbacks were called
  expect(component1.onCreate).toBeCalledTimes(1);
  expect(component2.onCreate).toBeCalledTimes(1);
  expect(component1.onEnable).toBeCalledTimes(0);

  // await for the next frame when all components async callbacks are finished
  await new Promise(resolve => setTimeout(resolve, 1));

  // all components should be enabled and started
  expect(component1.onEnable).toBeCalledTimes(1);
  expect(component1.onStart).toBeCalledTimes(1);
  expect(component2.onEnable).toBeCalledTimes(1);
  expect(component2.onStart).toBeCalledTimes(1);

  // after onFrame callback come to Manager
  SceneEntityManager.instance.onFrame();

  // onFrame callbacks should come to all components
  expect(component1.onFrame).toBeCalledTimes(1);
  expect(component2.onFrame).toBeCalledTimes(1);

  // entity of the first component become hidden
  entity1['updateVisibility'](false);

  // first component was disabled because of this
  expect(component1.onDisable).toBeCalledTimes(1);

  // and next time onFrame comes to Manager only second component will get onFrame
  SceneEntityManager.instance.onFrame();
  expect(component1.onFrame).toBeCalledTimes(1);
  expect(component2.onFrame).toBeCalledTimes(2);

  entity1['setActive'] = jest.fn();
  // first entity got enabled and then destroyed
  entity1['updateVisibility'](true);
  expect(component1.onEnable).toBeCalledTimes(2);
  entity1.destroy();

  // first component was disabled and destroyed
  expect(component1.onDisable).toBeCalledTimes(2);
  expect(component1.onDestroy).toBeCalledTimes(1);

  // entity set underlying scene object visibility to false
  expect(entity1['setActive']).lastCalledWith(false);
});

test('When we add UI assigned components - manager adds them in one shot so duting onCreate all of them are available to each other', async () => {
  const subscribeMock = jest.fn();
  SceneEntityFrameUpdateListener['instance'] = {
    registerCallback: subscribeMock,
  };

  const childSceneObject1 = getActiveSceneObject('sceneObject1');
  const childSceneObject2 = getActiveSceneObject('sceneObject2');

  // Scene root returns two children
  Scene.mockRoot = {
    findFirst: jest
      .fn()
      .mockImplementationOnce(() => childSceneObject1)
      .mockImplementationOnce(() => childSceneObject2),
  };
  TestComponentWithCustomeOnCreate.customOnCreate = jest
    .fn()
    .mockImplementationOnce(jest.fn())
    .mockImplementationOnce(() => {
      TestComponentWithCustomeOnCreate.anotherComponent = SceneEntityManager.instance
        .getEntityById('sceneObject1')
        .getComponent(TestComponent);
    });

  // when add components to manager and run createAllUiComponents
  SceneEntityManager.instance.addUiAssignedComponent(
    TestComponentWithCustomeOnCreate,
    'sceneObject1',
    true,
    new Map([]),
  );
  SceneEntityManager.instance.addUiAssignedComponent(
    TestComponentWithCustomeOnCreate,
    'sceneObject2',
    true,
    new Map([]),
  );
  await SceneEntityManager.instance.createAllUiAssignedComponents();

  // then components should be created and possible to reference each other from their onCreate callback
  const component1 = SceneEntityManager.instance
    .getEntityById('sceneObject1')
    .getComponent(TestComponentWithCustomeOnCreate);
  const component2 = SceneEntityManager.instance
    .getEntityById('sceneObject1')
    .getComponent(TestComponentWithCustomeOnCreate);
  expect(component1.onCreate).toBeCalledTimes(2);
  expect(component2.onCreate).toBeCalledTimes(2);
  expect(TestComponentWithCustomeOnCreate.anotherComponent).toBeDefined();
});
