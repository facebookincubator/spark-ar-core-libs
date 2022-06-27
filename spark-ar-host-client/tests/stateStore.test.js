/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Multipeer from 'Multipeer';
import Participants from 'Participants';
import Time from 'Time';
import {ParticipantMock} from '../../spark-ar-jest-mocks';
import {createStateStore} from '../src/index.js';
import {resetHostManagerTestOnly} from '../src/hostManager.js';

const fakeTimer = jest.useFakeTimers();

afterEach(() => {
  Participants.mockReset();
  Time.mockReset();
  resetHostManagerTestOnly();
});

test('Sanity Check', async () => {
  const store = await createStateStore({
    initialState: {},
    handlers: [],
  });
});

test('Host will process the request', async () => {
  await Participants.mockAddParticipant(new ParticipantMock('self1', true, true));
  const handlerCallback = jest.fn();
  const store = await createStateStore({
    initialState: {
      counter: 0,
    },
    handlers: [handlerCallback],
  });
  expect(store.getHostManager().getHost().id).toBe('self');

  store.dispatch('test', {text: 'test'});
  jest.advanceTimersByTime(300);

  expect(handlerCallback).toHaveBeenCalledWith(
    expect.objectContaining({counter: 0}),
    expect.objectContaining({type: 'test', payload: expect.objectContaining({text: 'test'})}),
  );
});

test('Non-host will not process the request', async () => {
  await Participants.mockAddParticipant(new ParticipantMock('1', true, true));
  const handlerCallback = jest.fn();
  const store = await createStateStore({
    initialState: {
      counter: 0,
    },
    handlers: [handlerCallback],
  });
  expect(store.getHostManager().getHost().id).toBe('1');

  store.dispatch('test', {text: 'test'});
  jest.advanceTimersByTime(300);

  expect(handlerCallback).toHaveBeenCalledTimes(0);
});

test('On request state will be updated', async () => {
  const stateCallback = jest.fn();
  const store = await createStateStore({
    initialState: {
      counter: 0,
    },
    handlers: [
      (curState, event) => {
        return {
          counter: curState.counter + 1,
        };
      },
    ],
  });
  const channel = store._stateBroadcastChannel;
  channel.onMessage.subscribe(stateCallback);

  await store.dispatch('test', {});
  await store._onInterval();

  expect(store.getState().counter).toBe(1);
  expect(stateCallback).toHaveBeenCalledWith(
    expect.objectContaining({
      host: 'self',
      state: expect.objectContaining({counter: 1}),
    }),
  );
});

test('On state update, correct subsrition is triggered', async () => {
  const stateCallback = jest.fn();
  const store = await createStateStore({
    initialState: {
      counter1: 0,
      counter2: 0,
    },
    handlers: [],
  });
  const subscribeCallback1 = jest.fn();
  const subscribeCallback2 = jest.fn();
  store.subscribe(['counter1'], subscribeCallback1);
  store.subscribe(['counter2'], subscribeCallback2);

  await store.dispatch('test', {});
  store._updateStates({
    counter1: 1,
    counter2: 0,
  });

  expect(subscribeCallback1).toHaveBeenCalledWith(
    expect.objectContaining({
      counter1: 1,
      counter2: 0,
    }),
    expect.objectContaining({
      counter1: 0,
      counter2: 0,
    }),
  );
  // correpsond key doesn't update
  expect(subscribeCallback2).toHaveBeenCalledTimes(0);
});
