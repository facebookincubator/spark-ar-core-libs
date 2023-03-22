/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {expect, test, jest, beforeEach} from '@jest/globals';
import {SceneEntityComponent, SceneEntityComponentState} from '../src/SceneEntityComponent';

class ManagerMock {
  componentInRegistry = false;
  removeComponentFromRegistry(): boolean {
    const oldValue = this.componentInRegistry;
    this.componentInRegistry = false;
    return oldValue !== false;
  }

  addComponentToRegistry(): boolean {
    const oldValue = this.componentInRegistry;
    this.componentInRegistry = true;
    return oldValue !== true;
  }

  reset() {
    this.componentInRegistry = false;
  }
}
const managerMock = new ManagerMock();

class EntityMock {
  isVisible = false;

  reset() {
    this.isVisible = false;
  }
}
const entityMock = new EntityMock();

beforeEach(() => {
  managerMock.reset();
  entityMock.reset();
});

test('Just created component should have state UNSET', async () => {
  const component = new SceneEntityComponent(managerMock as any);
  expect(component.state).toBe(SceneEntityComponentState.UNSET);
});

test('After calling Create component should have state Created and callbacks called', async () => {
  const component = new SceneEntityComponent(managerMock as any);
  (component as any).onCreate = jest.fn();
  (component as any).onStart = jest.fn();
  await component.create(jest.fn() as any);

  // Component doesn't have onFrame function so shouldn't be added to registry
  expect(managerMock.componentInRegistry).toBe(false);

  // Component successfully created
  expect(component.state).toBe(SceneEntityComponentState.CREATED);

  // Component's callbacks onCreate and onStart should be called
  expect((component as any).onCreate).toHaveBeenCalledTimes(1);
  expect((component as any).onStart).toHaveBeenCalledTimes(1);
});

test('After calling Create component and defining onFrame function it should be added to registry', async () => {
  const component = new SceneEntityComponent(managerMock as any);
  (component as any).onCreate = jest.fn();
  (component as any).onStart = jest.fn();
  (component as any).onFrame = jest.fn();

  // Entity component attached to is visible
  entityMock.isVisible = true;
  await component.create(entityMock as any);

  // Component should be in the registry
  expect(managerMock.componentInRegistry).toBe(true);

  // Component successfully created
  expect(component.state).toBe(SceneEntityComponentState.CREATED);

  // Component's callbacks onCreate and onStart should be called
  expect((component as any).onCreate).toHaveBeenCalledTimes(1);
  expect((component as any).onStart).toHaveBeenCalledTimes(1);
});

test('After component added to registry if set enable to false - should be removed from registry', async () => {
  const component = new SceneEntityComponent(managerMock as any);
  (component as any).onCreate = jest.fn();
  (component as any).onStart = jest.fn();
  (component as any).onFrame = jest.fn();
  (component as any).onEnable = jest.fn();
  (component as any).onDisable = jest.fn();

  // Entity component attached to is visible
  entityMock.isVisible = true;
  await component.create(entityMock as any);
  expect((component as any).onEnable).toHaveBeenCalledTimes(1);

  // Component should be in the registry
  expect(managerMock.componentInRegistry).toBe(true);

  // Component successfully created
  expect(component.state).toBe(SceneEntityComponentState.CREATED);

  // Component's callbacks onCreate and onStart should be called
  expect((component as any).onCreate).toHaveBeenCalledTimes(1);
  expect((component as any).onStart).toHaveBeenCalledTimes(1);

  component.enabled = false;

  // Component should be removed from the registry
  expect(managerMock.componentInRegistry).toBe(false);
  expect((component as any).onDisable).toHaveBeenCalledTimes(1);

  component.enabled = true;

  // Component should be in the registry again
  expect(managerMock.componentInRegistry).toBe(true);
  expect((component as any).onEnable).toHaveBeenCalledTimes(2);
});

test('After calling Create component with _manageCreationState should wait for manually finished creation', async () => {
  const component = new SceneEntityComponent(managerMock as any);
  (component as any)._manageCreationState = true;
  (component as any).onCreate = jest.fn();
  (component as any).onStart = jest.fn();

  // Entity component attached to is visible
  entityMock.isVisible = true;
  await component.create(entityMock as any);

  // Component doesn't have onFrame function so shouldn't be added to registry
  expect(managerMock.componentInRegistry).toBe(false);

  // Component is waiting for manually finished creation process
  expect(component.state).toBe(SceneEntityComponentState.CREATING);

  // Component's callbacks onCreate and onStart should not be called yet
  expect((component as any).onCreate).toHaveBeenCalledTimes(0);
  expect((component as any).onStart).toHaveBeenCalledTimes(0);

  // Manually finish creation
  await component.onManagedCreation();

  // Component successfully created
  expect(component.state).toBe(SceneEntityComponentState.CREATED);

  // Component's callbacks onCreate and onStart should be called
  expect((component as any).onCreate).toHaveBeenCalledTimes(1);
  expect((component as any).onStart).toHaveBeenCalledTimes(1);
});

test('After calling Destroy component should change its state and be removed from registry', async () => {
  const component = new SceneEntityComponent(managerMock as any);
  (component as any).onCreate = jest.fn();
  (component as any).onStart = jest.fn();
  (component as any).onFrame = jest.fn();
  (component as any).onDestroy = jest.fn();

  // Entity component attached to is visible
  entityMock.isVisible = true;
  await component.create(entityMock as any);

  // Component should be in the registry
  expect(managerMock.componentInRegistry).toBe(true);

  // Component successfully created
  expect(component.state).toBe(SceneEntityComponentState.CREATED);

  // Component's callbacks onCreate and onStart should be called
  expect((component as any).onCreate).toHaveBeenCalledTimes(1);
  expect((component as any).onStart).toHaveBeenCalledTimes(1);

  component.destroy();

  // Component should be removed from the registry
  expect(managerMock.componentInRegistry).toBe(false);
  expect((component as any).onDestroy).toHaveBeenCalledTimes(1);

  // Component destroyed
  expect(component.state).toBe(SceneEntityComponentState.DESTROYED);
});

test('After component added to registry if its entity visibility changed - should be removed/added to/from registry', async () => {
  const component = new SceneEntityComponent(managerMock as any);
  (component as any).onCreate = jest.fn();
  (component as any).onStart = jest.fn();
  (component as any).onFrame = jest.fn();
  (component as any).onEnable = jest.fn();
  (component as any).onDisable = jest.fn();

  // Entity component attached to is visible
  entityMock.isVisible = true;
  await component.create(entityMock as any);
  expect((component as any).onEnable).toHaveBeenCalledTimes(1);

  // Component should be in the registry
  expect(managerMock.componentInRegistry).toBe(true);

  // Component successfully created
  expect(component.state).toBe(SceneEntityComponentState.CREATED);

  // Component's callbacks onCreate and onStart should be called
  expect((component as any).onCreate).toHaveBeenCalledTimes(1);
  expect((component as any).onStart).toHaveBeenCalledTimes(1);

  // Entity become hidden
  entityMock.isVisible = false;
  component.updateState();

  // Component should be removed from the registry
  expect(managerMock.componentInRegistry).toBe(false);
  expect((component as any).onDisable).toHaveBeenCalledTimes(1);

  // Entity become visiblt again
  entityMock.isVisible = true;
  component.updateState();

  // Component should be in the registry again
  expect(managerMock.componentInRegistry).toBe(true);
  expect((component as any).onEnable).toHaveBeenCalledTimes(2);
});

test('Getting sceneEntity should return the associated sceneEntity', async () => {
  const component = new SceneEntityComponent(managerMock as any);

  entityMock.isVisible = true;
  await component.create(entityMock as any);

  expect(component.sceneEntity).toBe(entityMock);
});
