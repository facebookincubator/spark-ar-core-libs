/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Reactive = require('Reactive');
const Participants = require('Participants');
const YDoc = require('./yjs_doc');

const Diagnostics = require('Diagnostics');

export async function createGlobalBooleanSignal(startValue, name) {
  // set up signal source
  const source = Reactive.boolSignalSource(name);
  source.set(startValue);
  const signal = source.signal;

  const [doc, self] = await Promise.all([YDoc.createYDoc(name), Participants.self]);
  const myId = self.id;

  // update when ydoc bool or counters have changed
  doc.on('update', _ => {
    const boolMap = doc.getMap('b');
    const counterMap = doc.getMap('counters');
    // if global bool hasn't been assigned, use startValue
    const boolValue = boolMap.get(name) !== undefined ? boolMap.get(name) : startValue;
    let counterSum = 0;
    // add all the counters together
    for (let [key, counter] of counterMap) {
      counterSum += counter;
    }
    // determine and set correct bool based on number of flips
    source.set(counterSum % 2 === 0 ? boolValue : !boolValue);
  });

  /* Start of External API */

  // signal setter API available to external users
  signal.set = val => {
    const counterMap = doc.getMap('counters');
    // reset all counters to 0
    for (let [key, counter] of counterMap) {
      doc.getMap('counters').set(key, 0);
    }

    // start value changes for counter logic to work
    startValue = val;
    // set ydoc value with user input
    doc.getMap('b').set(name, val);
  };

  // allow users to invert the bool
  signal.flip = () => {
    const myCounter = doc.getMap('counters').get(myId);
    if (myCounter === null || myCounter === undefined) {
      doc.getMap('counters').set(myId, 1);
    } else {
      doc.getMap('counters').set(myId, myCounter + 1);
    }
  };

  /* End of External API */

  return signal;
}
