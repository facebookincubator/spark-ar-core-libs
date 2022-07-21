/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Participants = require('Participants');
const Reactive = require('Reactive');
const YDoc = require('./yjs_doc');

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

async function addCurrentParticipants(peersMap, participantsStartValue) {
  const allParticipantsIds = await getAllParticipantsIds();
  for (const participantId of allParticipantsIds) {
    peersMap.set(participantId, participantsStartValue);
  }
}

function createSource(val, sourceName) {
  // set up source based on typeof val
  let source;
  if (typeof val === 'number') {
    source = Reactive.scalarSignalSource(sourceName);
  } else if (typeof val === 'string') {
    source = Reactive.stringSignalSource(sourceName);
  } else {
    throw TypeError(UNSUPPORTED_MAP_VALUE_MESSAGE);
  }
  return source;
}

/**
 * Creates a new `GlobalPeersMap` with a globally unique name as specified by `name`, and with the initial value set by `participantsStartValue`.
 */
export async function createGlobalPeersMap(participantsStartValue, name) {
  const peersMap = {};

  const doc = await YDoc.createYDoc(name);
  const yMap = doc.getMap(name);

  /* Start of External API */

  peersMap.getName = () => name;

  peersMap.keys = () => {
    return Array.from(yMap.keys());
  };

  peersMap.get = participantId => {
    return yMap.get(participantId).source.signal;
  };

  peersMap.set = (participantId, value) => {
    let sourceVal;
    let prev = null;
    if (yMap.has(participantId)) {
      sourceVal = yMap.get(participantId).source;
      prev = sourceVal.signal.pinLastValue();
    } else {
      sourceVal = createSource(value, `${name}${participantId}`);
    }
    sourceVal.set(value);
    yMap.set(participantId, {source: sourceVal, prevVal: prev});
  };

  peersMap.setOnNewPeerCallback = callback => {
    Participants.onOtherParticipantAdded().subscribe(participant => {
      callback(participant.id);
    });
  };

  /* End of External API */

  Participants.onOtherParticipantAdded().subscribe(participant => {
    peersMap.set(participant.id, participantsStartValue);
  });

  await addCurrentParticipants(peersMap, participantsStartValue);

  return peersMap;
}
