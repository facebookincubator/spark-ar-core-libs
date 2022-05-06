/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 */

import Participants from 'Participants';
import {ParticipantMock} from '../../spark-ar-jest-mocks';
import {createParticipantManager} from '../src/index.js';

afterEach(() => {
  Participants.mockReset();
});

test('When start with only self, getActiveParticipants should be only self', async () => {
  const participantManager = await createParticipantManager({debug: false});
  const activeParticipants = participantManager.activeParticipants;
  expect(activeParticipants.length).toBe(1);
  expect(activeParticipants[0].id).toBe('self');
  expect(activeParticipants[0].isActiveInSameEffect.pinLastValue()).toBe(true);
  expect(participantManager.currentHost.id).toBe('self');
  expect(participantManager.selfIndex).toBe(0);
  expect(participantManager.peerIndices.length).toBe(0);
});

test('With new participant joins, getActiveParticipants should return current list', async () => {
  const participantManager = await createParticipantManager({debug: false});
  await Participants.mockAddParticipant(new ParticipantMock('1', true, true));
  await Participants.mockAddParticipant(new ParticipantMock('2', false, false));
  const activeParticipants = participantManager.activeParticipants;
  expect(activeParticipants.length).toBe(2);
  expect(activeParticipants[0].id).toBe('1');
  expect(activeParticipants[0].isActiveInSameEffect.pinLastValue()).toBe(true);
  expect(activeParticipants[1].id).toBe('self');
  expect(activeParticipants[1].isActiveInSameEffect.pinLastValue()).toBe(true);
  expect(participantManager.currentHost.id).toBe('1');
  expect(participantManager.selfIndex).toBe(1);
  expect(participantManager.peerIndices.length).toBe(2);
  expect(participantManager.peerIndices[0]).toBe(0);
  expect(participantManager.peerIndices[1]).toBe(-1);
});

test('With new active participant joins, subsription should be notified', async () => {
  const participantManager = await createParticipantManager({debug: false});
  const joinCallback = jest.fn();
  const newParticipant = new ParticipantMock('1', true, true);
  participantManager.addListener('join', joinCallback);

  await Participants.mockAddParticipant(newParticipant);
  expect(joinCallback).toHaveBeenCalledWith(expect.objectContaining({participant: newParticipant}));
});

test('With a participant become active, subsription should be notified', async () => {
  const participantManager = await createParticipantManager({debug: false});
  const newParticipant = new ParticipantMock('1', false, false);
  const joinCallback = jest.fn();
  participantManager.addListener('join', joinCallback);

  await Participants.mockAddParticipant(newParticipant);
  expect(joinCallback).toHaveBeenCalledTimes(0);

  await newParticipant.isActiveInSameEffect.mockUpdate(true);
  expect(joinCallback).toHaveBeenCalledWith(expect.objectContaining({participant: newParticipant}));
});

test('With a participant become inactive, subsription should be notified', async () => {
  const participantManager = await createParticipantManager({debug: false});
  const newParticipant = new ParticipantMock('1', true, true);
  const leaveCallback1 = jest.fn();
  const leaveCallback2 = jest.fn();
  participantManager.addListener('leave', leaveCallback1);
  participantManager.addListener('leave', leaveCallback2);

  await Participants.mockAddParticipant(newParticipant);
  expect(leaveCallback1).toHaveBeenCalledTimes(0);
  expect(leaveCallback2).toHaveBeenCalledTimes(0);

  await newParticipant.isActiveInSameEffect.mockUpdate(false);
  expect(leaveCallback1).toHaveBeenCalledWith(
    expect.objectContaining({participant: newParticipant}),
  );
  expect(leaveCallback2).toHaveBeenCalledWith(
    expect.objectContaining({participant: newParticipant}),
  );

  // if listner removed, it will not receive updates
  await newParticipant.isActiveInSameEffect.mockUpdate(true);
  leaveCallback1.mockReset();
  leaveCallback2.mockReset();
  participantManager.removeListener('leave', leaveCallback2);

  await newParticipant.isActiveInSameEffect.mockUpdate(false);
  expect(leaveCallback1).toHaveBeenCalledWith(
    expect.objectContaining({participant: newParticipant}),
  );
  expect(leaveCallback2).toHaveBeenCalledTimes(0);
});

test('With previous host drops, subsription should be notified', async () => {
  const participantManager = await createParticipantManager({debug: false});
  const newParticipant1 = new ParticipantMock('1', true, true);
  const newParticipant2 = new ParticipantMock('2', true, true);
  await Participants.mockAddParticipant(newParticipant1);
  await Participants.mockAddParticipant(newParticipant2);
  expect(participantManager.currentHost.id).toBe(newParticipant1.id);

  const hostChangeCallback = jest.fn();
  participantManager.addListener('hostChange', hostChangeCallback);
  await newParticipant1.isActiveInSameEffect.mockUpdate(false);
  expect(participantManager.currentHost.id).toBe(newParticipant2.id);
  expect(hostChangeCallback).toHaveBeenCalledWith(
    expect.objectContaining({previousHost: newParticipant1, currentHost: newParticipant2}),
  );
});

test('When sending message to certain participant, only them will recieve', async () => {
  const participantManager = await createParticipantManager({debug: false});
  const newParticipant1 = new ParticipantMock('1', true, true);
  const newParticipant2 = new ParticipantMock('2', true, true);
  await Participants.mockAddParticipant(newParticipant1);
  await Participants.mockAddParticipant(newParticipant2);
  const testChannel = participantManager.getMessageChannel('test');
  const messageCallback = jest.fn();
  testChannel.subscribeToMessage(messageCallback);

  // The multipeer mock will echo receive the messages
  await testChannel.sendMessage('self', {text: 'hello'});
  expect(messageCallback).toHaveBeenCalledWith('self', expect.objectContaining({text: 'hello'}));

  messageCallback.mockClear();
  await testChannel.sendMessage('1', {text: 'hello'});
  expect(messageCallback).toHaveBeenCalledTimes(0);
});
