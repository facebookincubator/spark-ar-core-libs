/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const YDoc = require('./yjs_doc');

function callCallbacks(callBackArray, event) {
  for (const callback of callBackArray) {
    callback(event);
  }
}

function checkIndexError(ind) {
  if (typeof ind !== 'number') {
    throw TypeError('Index should be a number!');
  }
}

function deltaToEvent(eventArray) {
  // converts the delta message to more friendly event message
  let currentIndex = 0;
  const newEvent = {events: []};
  for (let event of eventArray) {
    if ('retain' in event) {
      currentIndex += event.retain;
    } else {
      for (let val of event.insert) {
        newEvent.events.push({event: 'insert', index: currentIndex, newVal: val});
        currentIndex += 1;
      }
    }
  }
  return newEvent;
}

/**
 * Creates a new `GlobalArray` with a globally unique name as specified by `name`.
 */
export async function createGlobalArray(name) {
  const array = {};
  const callbacks = [];

  const doc = await YDoc.createYDoc(name);
  const yArray = doc.getArray(name);

  yArray.observe((eventArray, transaction) => {
    // observes any changes made to the YArray
    callCallbacks(
      callbacks,
      transaction ? transaction.origin : deltaToEvent(eventArray.changes.delta),
    );
  });

  /* Start of External API */

  array.push = val => {
    doc.transact(
      () => {
        yArray.push([val]);
      },
      {event: 'push', newVal: val},
    );
  };

  array.set = (ind, val) => {
    // YArray does not have a native set method yet. Currently the most efficient way
    // is to use delete + insert in a transact as to fire a single event for the changes.
    checkIndexError(ind);
    doc.transact(
      () => {
        yArray.delete(ind);
        yArray.insert(ind, [val]);
      },
      {event: 'set', index: ind, oldVal: yArray.get(ind), newVal: val},
    );
  };

  array.getArray = () => {
    return yArray.toArray();
  };

  array.subscribe = (callback, fireOnInitialValue = false) => {
    if (fireOnInitialValue) {
      const event = {events: []};
      yArray.forEach((val, ind) => {
        event.events.push({event: 'insert', index: ind, newVal: val});
      });
      callback(event);
    }
    callbacks.push(callback);
  };

  /* End of External API */

  return array;
}
