/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {expect, test, jest, beforeEach} from '@jest/globals';
import {SceneEntityFrameUpdateListener} from '../src/SceneEntityFrameCallback';
import Time from 'Time';

beforeEach(() => {
  (SceneEntityFrameUpdateListener['_instance'] as any) = null;
});

test('When create FrameUpdateListener - then it subscribes to onframe updates', () => {
  const subscriptionMock = jest.fn();
  Time.mockMs = {
    monitor: () => ({
      subscribeWithSnapshot: subscriptionMock,
    }),
  };

  // when create listener
  const listener = SceneEntityFrameUpdateListener.instance;

  // listener is defined and subscription called
  expect(listener).toBeDefined();
  expect(subscriptionMock).toBeCalledTimes(1);
});

test('When register callback in FrameUpdateListener - then this callback will be called per frame', () => {
  // given listener is created
  const subscriptionMock = jest.fn();
  Time.mockMs = {
    monitor: () => ({
      subscribeWithSnapshot: subscriptionMock,
    }),
  };
  const listener = SceneEntityFrameUpdateListener.instance;
  const onFrameCallback = jest.fn();

  // when register callback and call onFrame of listener
  listener.registerCallback(onFrameCallback);
  listener['onFrame']({newValue: 5}, []);

  // then registered callback is being called
  expect(onFrameCallback).toBeCalledTimes(1);
});

test('Given registered callback in FrameUpdateListener, when use unsubscribe function - then this callback will NOT be called per frame', () => {
  // given listener is created
  const subscriptionMock = jest.fn();
  Time.mockMs = {
    monitor: () => ({
      subscribeWithSnapshot: subscriptionMock,
    }),
  };
  const listener = SceneEntityFrameUpdateListener.instance;
  const onFrameCallback = jest.fn();

  // and registered callback
  const valueSubscription = listener.registerCallback(onFrameCallback);

  // when call destruction function
  valueSubscription.unsubscribe();
  // and call per frame
  listener['onFrame']({newValue: 5}, []);

  // then registered callback shouldn't being called
  expect(onFrameCallback).toBeCalledTimes(0);
});

test('When register monitoring signal in FrameUpdateListener - then monitored value can be retrieved per frame', () => {
  // given listener is created
  const subscriptionMock = jest.fn();
  Time.mockMs = {
    monitor: () => ({
      subscribeWithSnapshot: subscriptionMock,
    }),
  };
  const listener = SceneEntityFrameUpdateListener.instance;
  const lastPinValue = 42;
  const snapshotValue = 55;
  const signalMock = {
    pinLastValue() {
      return lastPinValue;
    },
  };
  const testSignalName = 'testSignal';

  // when register callback and call onFrame of listener
  const signals = listener.monitorSignals(new Map([[testSignalName, signalMock]]));
  const signalId = listener['_monitoredSignals'].keys().next().value;
  const snapshot = {};
  snapshot[signalId] = snapshotValue;

  // then while there is no snapshot with this signal lastPinValue should be returned
  expect(signals.get(testSignalName)?.value).toBe(lastPinValue);

  // after onFrame callback
  listener['onFrame']({newValue: 5}, snapshot);

  // value from snapshot should be returned
  expect(signals.get(testSignalName)?.value).toBe(snapshotValue);
});
