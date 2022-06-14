/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Reactive = require('Reactive');
const Participants = require('Participants');
const Time = require('Time');

const YDoc = require('./yjs_doc');

let globalArray_ = null;

export async function createSortedParticipantArray() {
  // make sure there is only one global array returned
  if (globalArray_ !== null) {
    return globalArray_;
  }

  const arrayWrapper = {};
  const myId = (await Participants.self).id;
  const name = 'ParticipantsSortedId';

  // set up signal source
  const changesSource = Reactive.scalarSignalSource(name + '_changes');
  const changesSignal = changesSource.signal;
  let participantsStatusSub = null;

  const doc = await YDoc.createYDoc(name);

  // insert itself when there is no duplicate id in the array
  function insertSelfOnce() {
    const currentArrays = doc.getArray(name).toArray();
    if (!currentArrays.includes(myId)) {
      doc.getArray(name).push([myId]);
    }
  }

  async function setupParticipantsChangesMonitor() {
    const allParticipants = await Promise.all(
      doc
        .getArray(name)
        .toArray()
        .map(id => Participants.getParticipantById(id).catch(err => null)),
    );

    const allActiveInSameEffectSignals = allParticipants.reduce(
      (prev, p) =>
        p
          ? {
              ...prev,
              [p.id]: p.isActiveInSameEffect.ifThenElse(1, 0),
            }
          : prev,
      {},
    );

    if (participantsStatusSub) {
      participantsStatusSub.unsubscribe();
    }

    // Monitor all participants for their isActiveInSameEffect signals
    // If any participant has a status change there, notify creators to refetch the arrays
    participantsStatusSub = Reactive.monitorMany(allActiveInSameEffectSignals, {
      fireOnInitialValue: true,
    }).subscribe(() => {
      changesSource.set(changesSignal.pinLastValue() + 1);
    });
  }

  // Insert itself if it hasn't done so after 500ms
  // This is to break ties when multiple people join
  // at the same time in the beginning of the call
  Time.setTimeout(() => {
    insertSelfOnce();
  }, 500);

  // update the array value when ydoc value is changed
  doc.on('update', async _ => {
    insertSelfOnce();
    await setupParticipantsChangesMonitor();
  });

  /* Start of External API */

  // changesSignal would notify creators when any changes have been made
  arrayWrapper.changesSignal = changesSignal;

  arrayWrapper.getSortedAllTimeParticipants = async () => {
    return await Promise.all(
      doc
        .getArray(name)
        .toArray()
        // remove unknown participant id
        .map(id => Participants.getParticipantById(id).catch(err => null)),
    ).then(participants => participants.filter(p => p !== null));
  };

  arrayWrapper.getSortedActiveParticipants = async () => {
    return await Promise.all(
      doc
        .getArray(name)
        .toArray()
        // remove unknown participant id
        .map(id => Participants.getParticipantById(id).catch(err => null)),
    ).then(participants => participants.filter(p => p && p.isActiveInSameEffect.pinLastValue()));
  };

  /* End of External API */

  globalArray_ = arrayWrapper;

  return globalArray_;
}
