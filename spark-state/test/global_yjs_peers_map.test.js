/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Time from 'Time';
import Participants from 'Participants';
import {ParticipantMock} from '../../spark-ar-jest-mocks';
import {createGlobalPeersMap} from '../src/global_yjs_peers_map.js';

afterEach(() => {
  Time.mockReset();
});

test('When start with only self, peersMap should only contain self', async () => {
  const myId = (await Participants.self).id;
  const globalPeersMap = await createGlobalPeersMap(0, 'globalPeersMap');

  expect(globalPeersMap).toBeDefined();
  expect(globalPeersMap).toHaveProperty('getName');
  expect(globalPeersMap).toHaveProperty('keys');
  expect(globalPeersMap).toHaveProperty('get');
  expect(globalPeersMap).toHaveProperty('set');
  expect(globalPeersMap).toHaveProperty('setOnNewPeerCallback');

  expect(globalPeersMap.getName()).toBe('globalPeersMap');

  expect(globalPeersMap.keys()[0]).toBe('self');

  expect(globalPeersMap.get(myId).value).toBe(0);
  expect(globalPeersMap.get(myId)).toHaveProperty('_eventSources');
  expect(globalPeersMap.get(myId)).toHaveProperty('_value');
});

test('When set function called with scalar, value should be changed', async () => {
  const myId = (await Participants.self).id;
  const globalPeersMap = await createGlobalPeersMap(0, 'globalPeersMap');

  expect(globalPeersMap.get(myId).value).toBe(0);

  expect(globalPeersMap.set(myId, 5)).toBeUndefined();
  expect(globalPeersMap.get(myId).value).toBe(5);

  expect(globalPeersMap.set(myId, -3)).toBeUndefined();
  expect(globalPeersMap.get(myId).value).toBe(-3);

  expect(globalPeersMap.set(myId, 0)).toBeUndefined();
  expect(globalPeersMap.get(myId).value).toBe(0);
});

test('When set function called with string, value should be changed', async () => {
  const myId = (await Participants.self).id;
  const globalPeersMap = await createGlobalPeersMap('hello', 'globalPeersMap');

  expect(globalPeersMap.get(myId).value).toBe('hello');

  expect(globalPeersMap.set(myId, 'abc')).toBeUndefined();
  expect(globalPeersMap.get(myId).value).toBe('abc');

  expect(globalPeersMap.set(myId, '')).toBeUndefined();
  expect(globalPeersMap.get(myId).value).toBe('');
});

test('When new participant joins, setOnNewPeerCallback should be called', async () => {
  const globalPeersMap = await createGlobalPeersMap(0, 'globalPeersMap');
  const callback = jest.fn();
  globalPeersMap.setOnNewPeerCallback(callback);

  await Participants.mockAddParticipant(new ParticipantMock('1', true, true));
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith('1');

  await Participants.mockAddParticipant(new ParticipantMock('2', false, false));
  await Participants.mockAddParticipant(new ParticipantMock('3', true, true));
  expect(callback).toHaveBeenCalledTimes(3);
  expect(callback).toHaveBeenCalledWith('3');

  expect(globalPeersMap.keys()).toStrictEqual(['self', '1', '2', '3']);
});
