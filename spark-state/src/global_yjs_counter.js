/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Reactive = require('Reactive');
const Participants = require('Participants');
const YDoc = require('./yjs_doc');

export async function createGlobalCounterSignal(startValue, name) {
  // set up signal source
  const source = Reactive.scalarSignalSource(name);
  source.set(startValue);
  const signal = source.signal;

  const [doc, self] = await Promise.all([YDoc.createYDoc(name), Participants.self]);
  const myId = self.id;

  // Counter Type is represented as {participantId: string, counterSum: number} in YDoc.
  // Each participant Counter would be updated by one participant only.
  // When calculating the final value, sum all counters for all participants plus start value.
  // This approach makes sure 1) no update would be lost and
  // 2) the YDoc does not grow indefinitely with the number of changes.
  // That is important because Multipeer API has 1KB message size limit.
  // If YDoc grows indefinitely, sync message could eventually exceed 1KB for too many changes.
  doc.on('update', _ => {
    const allCounters = doc.getMap(name);
    let val = startValue;
    for (let [_, counter] of allCounters) {
      val = val + counter;
    }
    source.set(val);
  });

  function updateCounter(val) {
    const myCounter = doc.getMap(name).get(myId);
    if (myCounter === null || myCounter === undefined) {
      doc.getMap(name).set(myId, val);
    } else {
      doc.getMap(name).set(myId, myCounter + val);
    }
  }

  /* Start of External API */

  signal.increment = val => {
    updateCounter(val);
  };

  signal.decrement = val => {
    updateCounter(-val);
  };

  /* End of External API */

  return signal;
}
