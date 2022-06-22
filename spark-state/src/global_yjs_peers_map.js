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
    await peersMap.set(participantId, participantsStartValue);
  }
}

async function addNewParticipants(peersMap, participantsStartValue) {
  async function addNewParticipantsToMap(event) {
    const newPeersIds = [];
    const newCount = event.newValue;
    const oldCount = event.oldValue;
    for (let i = oldCount; i < newCount; i++) {
      const allPeersIds = await getAllPeersIds();
      newPeersIds.push(allPeersIds[i]);
    }
    for (const newPeerId of newPeersIds) {
      if (!Object.prototype.hasOwnProperty.call(peersMap, newPeerId)) {
        await peersMap.set(newPeerId, participantsStartValue);
      }
    }
    return newPeersIds;
  }

  Participants.otherParticipantCount.monitor().subscribe(addNewParticipantsToMap);

  peersMap.setOnNewPeerCallback = callback => {
    Participants.otherParticipantCount.monitor().subscribe(async event => {
      const newPeersIds = await addNewParticipantsToMap(event);
      for (const newPeerId of newPeersIds) {
        callback(newPeerId);
      }
    });
  };
}

/**
 * Creates a new `GlobalPeersMap` with a globally unique name as specified by `name`, and with the initial value set by `participantsStartValue`.
 */
export async function createGlobalPeersMap(participantsStartValue, name) {
  // Currently the values can only be counters
  // startValue should be a number
  let sources = {};
  const peersMap = {};

  const doc = await YDoc.createYDoc(name);

  doc.on('update', _ => {
    // iterate over the doc then set each corresponding source
    for (let [participantId, value] of doc.getMap(name)) {
      if (!sources.hasOwnProperty(participantId)) {
        let source;
        const sourceName = `${name}${participantId}`;

        // set up source based on typeof participantsStartValue
        if (typeof participantsStartValue === 'number') {
          source = Reactive.scalarSignalSource(sourceName);
        } else if (typeof participantsStartValue === 'string') {
          source = Reactive.stringSignalSource(sourceName);
        } else {
          throw TypeError(UNSUPPORTED_MAP_VALUE_MESSAGE);
        }
        sources[participantId] = source;
      }
      sources[participantId].set(value);
    }
  });

  /* Start of External API */

  peersMap.getName = () => name;

  peersMap.keys = async () => {
    const keys = [];
    const allParticipantsIds = await getAllParticipantsIds();
    for (const participantId of allParticipantsIds) {
      if (Object.prototype.hasOwnProperty.call(map, participantId)) {
        keys.push(participantId);
      }
    }
    return keys;
  };

  peersMap.get = participantId => {
    return sources[participantId].signal;
  };

  peersMap.set = (participantId, value) => {
    doc.getMap(name).set(participantId, value);
  };

  /* End of External API */

  await addCurrentParticipants(peersMap, participantsStartValue);
  await addNewParticipants(peersMap, participantsStartValue);

  return peersMap;
}
