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
  source.set(val);
  return source;
}

/**
 * Creates a new `GlobalPeersMap` with a globally unique name as specified by `name`, and with the initial value set by `participantsStartValue`.
 */
export async function createGlobalPeersMap(participantsStartValue, name) {
  // Currently the values can only be counters
  // startValue should be a number
  const peersMap = {};
  const sources = {};

  const doc = await YDoc.createYDoc(name);
  const yMap = doc.getMap(name);

  yMap.observe(yMapEvent => {
    yMapEvent.changes.keys.forEach((change, key) => {
      if (change.action === 'add') {
        sources[key] = createSource(yMap.get(key), `${name}${key}`);
        // callback can also be called here with callback(yMap.get(key))
      } else if (change.action === 'update') {
        sources[key].set(yMap.get(key));
      } else if (change.action === 'delete') {
        delete sources[key]; // is this needed? does YDoc deletes user when he leaves?
      }
    });
  });

  /* Start of External API */

  peersMap.getName = () => name;

  peersMap.keys = () => {
    return Object.keys(sources);
  };

  peersMap.get = participantId => {
    return sources[participantId].signal;
  };

  peersMap.set = (participantId, value) => {
    yMap.set(participantId, value);
  };

  peersMap.setOnNewPeerCallback = callback => {
    Participants.onOtherParticipantAdded().subscribe(participant => {
      callback(participant.id);
    });
  };

  /* End of External API */

  Participants.onOtherParticipantAdded().subscribe(participant => {
    yMap.set(participant.id, participantsStartValue); // aka peersMap.set();
  });

  await addCurrentParticipants(peersMap, participantsStartValue);

  return peersMap;
}
