/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Participants = require('Participants');
const GlobalString = require('./global_yjs_string');
const GlobalScalar = require('./global_yjs_scalar');

const UNSUPPORTED_MAP_VALUE_MESSAGE =
  '`participantsStartValue` should be a number or string. Map values can only be Global Scalar or Global Strings';

async function getAllPeersIds() {
  const allPeers = await Participants.getAllOtherParticipants();
  return allPeers.map(peer => peer.id);
}

async function getAllParticipantsIds() {
  const myParticipantId = (await Participants.self).id;
  const allParticipantsIds = await getAllPeersIds();
  allParticipantsIds.push(myParticipantId);
  return allParticipantsIds;
}

async function addCurrentParticipants(map, participantsStartValue) {
  const allParticipantsIds = await getAllParticipantsIds();
  for (const participantId of allParticipantsIds) {
    await map.set(participantId, participantsStartValue);
  }
}

async function addNewParticipants(map, participantsStartValue) {
  async function addNewParticipantsToMap(event) {
    const newPeersIds = [];
    const newCount = event.newValue;
    const oldCount = event.oldValue;
    for (let i = oldCount; i < newCount; i++) {
      const allPeersIds = await getAllPeersIds();
      newPeersIds.push(allPeersIds[i]);
    }
    for (const newPeerId of newPeersIds) {
      if (!Object.prototype.hasOwnProperty.call(map, newPeerId)) {
        await map.set(newPeerId, participantsStartValue);
      }
    }
    return newPeersIds;
  }

  Participants.otherParticipantCount.monitor().subscribe(addNewParticipantsToMap);

  map.setOnNewPeerCallback = callback => {
    Participants.otherParticipantCount.monitor().subscribe(async event => {
      const newPeersIds = await addNewParticipantsToMap(event);
      for (const newPeerId of newPeersIds) {
        callback(newPeerId);
      }
    });
  };
}

function getCreateValueSignalFunction(participantsStartValue) {
  let createValueSignal;
  if (typeof participantsStartValue === 'number') {
    createValueSignal = GlobalScalar.createGlobalScalarSignal;
  } else if (typeof participantsStartValue === 'string') {
    createValueSignal = GlobalString.createGlobalStringSignal;
  } else {
    throw TypeError(UNSUPPORTED_MAP_VALUE_MESSAGE);
  }
  return createValueSignal;
}

/**
 * Creates a new `GlobalPeersMap` with a globally unique name as specified by `signalName`, and with the initial value set by `participantsStartValue`.
 */
export async function createGlobalPeersMap(participantsStartValue, signalName) {
  // Currently the values can only be counters
  // startValue should be a number
  const map = {};

  const createValueSignal = getCreateValueSignalFunction(participantsStartValue);

  map.getName = () => signalName;
  map.keys = async () => {
    const keys = [];
    const allParticipantsIds = await getAllParticipantsIds();
    for (const participantId of allParticipantsIds) {
      if (Object.prototype.hasOwnProperty.call(map, participantId)) {
        keys.push(participantId);
      }
    }
    return keys;
  };

  map.get = participantId => {
    return map[participantId];
  };

  map.set = async (participantId, value) => {
    if (Object.prototype.hasOwnProperty.call(map, participantId)) {
      map[participantId].set(value);
    } else {
      map[participantId] = await createValueSignal(value, `${signalName}${participantId}`);
    }
  };

  await addCurrentParticipants(map, participantsStartValue);
  await addNewParticipants(map, participantsStartValue);

  return map;
}
