/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Time from 'Time';
import {createGlobalMap} from '../src/global_yjs_map.js';

jest.useRealTimers();

afterEach(() => {
  Time.mockReset();
});

async function waitForTheNextRound() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    });
  });
}

test('When first time called, map should contain 5 basic functions', async () => {
  const globalMap = await createGlobalMap('map');
  expect(globalMap).toBeDefined();
  expect(globalMap).toHaveProperty('get');
  expect(globalMap).toHaveProperty('set');
  expect(globalMap).toHaveProperty('keys');
  expect(globalMap).toHaveProperty('subscribe');
  expect(globalMap).toHaveProperty('subscribeOnNewKey');
});

test('When setted the key-value pair, the map should only contain one key-value pair', async () => {
  const globalMap = await createGlobalMap('map');
  globalMap.set('key', 1);
  expect(globalMap.get('key').value).toBe(1);
  expect(globalMap.keys()).toStrictEqual(['key']);

  const globalMap2 = await createGlobalMap('map2');
  globalMap2.set(2, 'abc');
  expect(globalMap2.get(2).value).toBe('abc');
  expect(globalMap2.keys()).toStrictEqual(['2']);
});

test('When set function called on already existing key, value should be updated', async () => {
  const globalMap = await createGlobalMap('map');
  globalMap.set('key', 1);
  expect(globalMap.get('key').value).toBe(1);
  expect(globalMap.keys()).toStrictEqual(['key']);
  globalMap.set('key', 5);
  expect(globalMap.get('key').value).toBe(5);
  expect(globalMap.keys()).toStrictEqual(['key']);

  const globalMap2 = await createGlobalMap('map2');
  globalMap2.set(2, 'abc');
  expect(globalMap2.get(2).value).toBe('abc');
  expect(globalMap2.keys()).toStrictEqual(['2']);
  globalMap2.set(2, 'def');
  expect(globalMap2.get(2).value).toBe('def');
  expect(globalMap2.keys()).toStrictEqual(['2']);
});

test('When new key is entered, callback for subscribeOnNewKey function should be called', async () => {
  const globalMap = await createGlobalMap('map');
  const keyCallback = jest.fn();

  globalMap.subscribeOnNewKey(keyCallback, false);
  globalMap.set('a', 1);
  await waitForTheNextRound();

  expect(keyCallback).toHaveBeenCalledTimes(1);
  expect(keyCallback).toHaveBeenCalledWith(
    expect.objectContaining({
      a: {_eventSources: [], _value: 1},
    }),
  );
});

test('When subscribeOnNewKey is called with fireOnInitialValue is true, existing keys should be passed for callback', async () => {
  const globalMap = await createGlobalMap('map');
  const keyCallback = jest.fn();

  globalMap.set('a', 1);
  globalMap.set('b', 2);
  globalMap.set('c', 3);
  await waitForTheNextRound();
  globalMap.subscribeOnNewKey(keyCallback, true);

  expect(keyCallback).toHaveBeenCalledTimes(1);
  expect(keyCallback).toHaveBeenCalledWith(
    expect.objectContaining({
      a: {_eventSources: [], _value: 1},
      b: {_eventSources: [], _value: 2},
      c: {_eventSources: [], _value: 3},
    }),
  );

  globalMap.set('d', 4);
  await waitForTheNextRound();

  expect(keyCallback).toHaveBeenCalledTimes(2);
  expect(keyCallback).toHaveBeenCalledWith(
    expect.objectContaining({
      d: {_eventSources: [], _value: 4},
    }),
  );

  globalMap.set('d', 5);
  await waitForTheNextRound();
  expect(keyCallback).toHaveBeenCalledTimes(2);
});

test('When new key is entered, depending on fireOnInitialValue, callback for subscribe function should be called/not called', async () => {
  const globalMap = await createGlobalMap('map');
  const keyCallback = jest.fn();
  const keyCallback2 = jest.fn();

  globalMap.set('a', 1);
  await waitForTheNextRound();

  globalMap.subscribe(keyCallback, true);
  globalMap.subscribe(keyCallback2, false);

  expect(keyCallback).toHaveBeenCalledTimes(1);
  expect(keyCallback2).not.toHaveBeenCalled();
  expect(keyCallback).toHaveBeenCalledWith(
    expect.objectContaining({
      newValue: {a: 1},
    }),
  );

  globalMap.set('a', 2);
  await waitForTheNextRound();

  expect(keyCallback).toHaveBeenCalledTimes(2);
  expect(keyCallback2).toHaveBeenCalledTimes(1);
  expect(keyCallback).toHaveBeenCalledWith(
    expect.objectContaining({
      newValue: {a: 2},
      oldValue: {a: 1},
    }),
  );
  expect(keyCallback2).toHaveBeenCalledWith(
    expect.objectContaining({
      newValue: {a: 2},
      oldValue: {a: 1},
    }),
  );
});

test('When several callbacks are subscribed, all of them should be called', async () => {
  const globalMap = await createGlobalMap('map');
  const keyCallback = jest.fn();
  const keyCallback2 = jest.fn();

  globalMap.subscribe(keyCallback, true);
  globalMap.subscribe(keyCallback2, true);

  expect(keyCallback).toHaveBeenCalled();
  expect(keyCallback2).toHaveBeenCalled();

  globalMap.set('a', 1);
  await waitForTheNextRound();

  expect(keyCallback).toHaveBeenCalledTimes(2);
  expect(keyCallback2).toHaveBeenCalledTimes(2);
  expect(keyCallback).toHaveBeenCalledWith(
    expect.objectContaining({
      newValue: {a: 1},
    }),
  );
  expect(keyCallback2).toHaveBeenCalledWith(
    expect.objectContaining({
      newValue: {a: 1},
    }),
  );

  globalMap.set('a', 2);
  await waitForTheNextRound();

  expect(keyCallback).toHaveBeenCalledTimes(3);
  expect(keyCallback2).toHaveBeenCalledTimes(3);
  expect(keyCallback).toHaveBeenCalledWith(
    expect.objectContaining({
      newValue: {a: 2},
      oldValue: {a: 1},
    }),
  );
  expect(keyCallback2).toHaveBeenCalledWith(
    expect.objectContaining({
      newValue: {a: 2},
      oldValue: {a: 1},
    }),
  );
});
