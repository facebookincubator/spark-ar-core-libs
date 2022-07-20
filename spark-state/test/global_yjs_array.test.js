/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Time from 'Time';
import {createGlobalArray} from '../src/global_yjs_array.js';

afterEach(() => {
  Time.mockReset();
});

test('When first time called, array should contain 4 basic functions', async () => {
  const globalArray = await createGlobalArray('array');
  expect(globalArray).toBeDefined();
  expect(globalArray).toHaveProperty('push');
  expect(globalArray).toHaveProperty('set');
  expect(globalArray).toHaveProperty('getArray');
  expect(globalArray).toHaveProperty('subscribe');
});

test('When push elements, array should contain elements', async () => {
  const globalArray = await createGlobalArray('array');

  globalArray.push(1);
  expect(globalArray.getArray()[0]).toBe(1);

  globalArray.push(2);
  expect(globalArray.getArray()[1]).toBe(2);
});

test('When set elements, element value should be changed', async () => {
  const globalArray = await createGlobalArray('array');

  globalArray.push(1);
  globalArray.push(2);
  globalArray.set(0, 2);
  expect(globalArray.getArray()[0]).toBe(2);
  expect(globalArray.getArray().length).toBe(2);

  globalArray.set(1, 0);
  expect(globalArray.getArray()[1]).toBe(0);
  expect(globalArray.getArray().length).toBe(2);

  expect(() => {
    globalArray.set('a', 0);
  }).toThrow('Index should be a number!');

  expect(() => {
    globalArray.set(2, 0);
  }).toThrow('Length exceeded!');
});

test('When insert elements, element value should be inserted', async () => {
  const globalArray = await createGlobalArray('array');

  globalArray.insert(0, 1);
  expect(globalArray.getArray()).toStrictEqual([1]);

  expect(() => {
    globalArray.insert(2, 2);
  }).toThrow('Length exceeded!');

  globalArray.insert(0, 2);
  expect(globalArray.getArray()).toStrictEqual([2, 1]);
});

test('When remove elements, element value should be removed', async () => {
  const globalArray = await createGlobalArray('array');

  globalArray.push(1);
  globalArray.push(2);
  globalArray.remove(1);
  expect(globalArray.getArray()).toStrictEqual([1]);

  expect(() => {
    globalArray.remove(1);
  }).toThrow('Length exceeded!');

  globalArray.remove(0);
  expect(globalArray.getArray()).toStrictEqual([]);
});

test('When subscribed, callback should be called with appropriate event', async () => {
  const globalArray = await createGlobalArray('array');
  const callBack = jest.fn();
  const callBack2 = jest.fn();

  globalArray.subscribe(callBack);

  expect(callBack).toHaveBeenCalledTimes(0);
  globalArray.push(1);
  expect(callBack).toHaveBeenCalledTimes(1);
  expect(callBack).toHaveBeenCalledWith({event: 'push', newVal: 1});

  globalArray.subscribe(callBack2);

  globalArray.set(0, 0);
  expect(callBack2).toHaveBeenCalledTimes(1);
  expect(callBack2).toHaveBeenCalledWith({event: 'set', index: 0, oldVal: 1, newVal: 0});
  expect(callBack).toHaveBeenCalledTimes(2);
  expect(callBack).toHaveBeenCalledWith({event: 'set', index: 0, oldVal: 1, newVal: 0});

  globalArray.insert(0, 2);
  expect(callBack2).toHaveBeenCalledTimes(2);
  expect(callBack2).toHaveBeenCalledWith({event: 'insert', index: 0, newVal: 2});
  expect(callBack).toHaveBeenCalledTimes(3);
  expect(callBack).toHaveBeenCalledWith({event: 'insert', index: 0, newVal: 2});

  globalArray.remove(1);
  expect(callBack2).toHaveBeenCalledTimes(3);
  expect(callBack2).toHaveBeenCalledWith({event: 'remove', index: 1, oldVal: 0});
  expect(callBack).toHaveBeenCalledTimes(4);
  expect(callBack).toHaveBeenCalledWith({event: 'remove', index: 1, oldVal: 0});

  expect(() => {
    globalArray.insert(2, 0);
  }).toThrow('Length exceeded!');
  expect(callBack2).toHaveBeenCalledTimes(3);
  expect(callBack).toHaveBeenCalledTimes(4);
});

test('When fireOnInitialValue is set to True, initial array should be called', async () => {
  const globalArray = await createGlobalArray('array');
  const callBack = jest.fn();
  const callBack2 = jest.fn();

  globalArray.subscribe(callBack, true);

  expect(callBack).toHaveBeenCalledTimes(1);
  expect(callBack).toHaveBeenCalledWith({events: []});

  globalArray.push(1);
  globalArray.push(2);
  globalArray.push(3);
  globalArray.subscribe(callBack2, true);

  expect(callBack2).toHaveBeenCalledTimes(1);
  expect(callBack2).toHaveBeenCalledWith({
    events: [
      {event: 'insert', index: 0, newVal: 1},
      {event: 'insert', index: 1, newVal: 2},
      {event: 'insert', index: 2, newVal: 3},
    ],
  });
});
