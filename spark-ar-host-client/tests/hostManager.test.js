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
import {createHostManager, resetHostManagerTestOnly} from '../src/hostManager.js';

const fakeTimer = jest.useFakeTimers();

afterEach(() => {
  Participants.mockReset();
  Time.mockReset();
  resetHostManagerTestOnly();
});

test('When init, a pending host is defined, when time pass, it is finalised', async () => {
  await Participants.mockAddParticipant(new ParticipantMock('self1', true, true));
  await Participants.mockAddParticipant(new ParticipantMock('self2', true, true));
  const hostManager = await createHostManager({});
  expect(hostManager.getHost().id).toBe('self');
  expect(hostManager.getIsHostPending()).toBe(true);

  jest.advanceTimersByTime(3000);
  expect(hostManager.getHost().id).toBe('self');
  expect(hostManager.getIsHostPending()).toBe(false);
});

test('When a host drop, a new pending host is resolved', async () => {
  const participant1 = new ParticipantMock('1', true, true);
  const participant2 = new ParticipantMock('2', true, true);
  await Participants.mockAddParticipant(participant1);
  await Participants.mockAddParticipant(participant2);
  const hostManager = await createHostManager({});
  expect(hostManager.getHost().id).toBe('1');
  expect(hostManager.getIsHostPending()).toBe(true);

  await participant1.isActiveInSameEffect.mockUpdate(false);

  expect(hostManager.getHost().id).toBe('2');
  expect(hostManager.getIsHostPending()).toBe(true);
});

test('When a non-host drop, the host remain', async () => {
  const participant1 = new ParticipantMock('1', true, true);
  const participant2 = new ParticipantMock('2', true, true);
  await Participants.mockAddParticipant(participant1);
  await Participants.mockAddParticipant(participant2);
  const hostManager = await createHostManager({});
  expect(hostManager.getHost().id).toBe('1');

  await participant2.isActiveInSameEffect.mockUpdate(false);

  expect(hostManager.getHost().id).toBe('1');
});

test('When a new participant join, it does not replace the host', async () => {
  const participant1 = new ParticipantMock('1', true, true);
  const participant2 = new ParticipantMock('2', true, true);
  await Participants.mockAddParticipant(participant1);
  await Participants.mockAddParticipant(participant2);
  const hostManager = await createHostManager({});
  expect(hostManager.getHost().id).toBe('1');

  await Participants.mockAddParticipant(new ParticipantMock('0', true, true));

  expect(hostManager.getHost().id).toBe('1');
});

test('When multiple user thought they are host, the ealier one wins', async () => {
  const ealierTime = Date.now();
  jest.advanceTimersByTime(100);

  await Participants.mockAddParticipant(new ParticipantMock('self1', true, true));
  await Participants.mockAddParticipant(new ParticipantMock('self2', true, true));
  const hostManager = await createHostManager({});
  expect(hostManager.getHost().id).toBe('self');
  expect(hostManager.getIsHostPending()).toBe(true);
  const channel = hostManager._hostManagerChannel;
  jest.advanceTimersByTime(100);
  const laterTime = Date.now();

  // when a new message from someone claim host later
  await channel.sendMessage({
    id: 'self1',
    s: 0, // PENDING
    t: laterTime,
  });
  expect(hostManager.getHost().id).toBe('self');

  // when a new message from someone claim host earlier
  await channel.sendMessage({
    id: 'self2',
    s: 0, // PENDING
    t: ealierTime,
  });
  expect(hostManager.getHost().id).toBe('self2');
});

test('When host changed, a message is sent', async () => {
  const participant1 = new ParticipantMock('1', true, true);
  const participant2 = new ParticipantMock('2', true, true);
  await Participants.mockAddParticipant(participant1);
  await Participants.mockAddParticipant(participant2);
  const hostManager = await createHostManager({});
  expect(hostManager.getHost().id).toBe('1');
  const channel = hostManager._hostManagerChannel;

  const changeCallback = jest.fn();
  hostManager.addListener('hostStateChange', changeCallback);

  // finalised the host
  await channel.sendMessage({
    id: '1',
    s: 1, // FINALISED
    t: Date.now(),
  });
  expect(changeCallback).toHaveBeenCalledWith(
    expect.objectContaining({host: expect.objectContaining({id: '1'})}),
  );

  // host dropped
  changeCallback.mockReset();
  await participant1.isActiveInSameEffect.mockUpdate(false);
  expect(changeCallback).toHaveBeenCalledWith(
    expect.objectContaining({host: expect.objectContaining({id: '2'})}),
  );
});
