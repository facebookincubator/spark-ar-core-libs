/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const YDoc = require('./yjs_doc');

const UNSUPPORTED_VALUE_MESSAGE = '`value` should be a number or string.';

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

function checkValueError(val) {
  if (typeof val !== 'number' && typeof val !== 'string') {
    throw TypeError(UNSUPPORTED_VALUE_MESSAGE);
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
        newEvent.events.push({event: 'insert', index: currentIndex, newValue: val});
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

  array.get = ind => {
    return yArray.get(ind);
  };

  array.push = val => {
    checkValueError(val);
    doc.transact(
      () => {
        yArray.push([val]);
      },
      {event: 'push', newValue: val},
    );
  };

  array.set = (ind, val) => {
    // YArray does not have a native set method yet. Currently the most efficient way
    // is to use delete + insert in a transact as to fire a single event for the changes.
    checkIndexError(ind);
    checkValueError(val);
    doc.transact(
      () => {
        yArray.delete(ind);
        yArray.insert(ind, [val]);
      },
      {event: 'set', index: ind, oldValue: yArray.get(ind), newValue: val},
    );
  };

  array.insert = (ind, val) => {
    checkIndexError(ind);
    checkValueError(val);
    doc.transact(
      () => {
        yArray.insert(ind, [val]);
      },
      {event: 'insert', index: ind, newValue: val},
    );
  };

  array.remove = ind => {
    checkIndexError(ind);
    const oldVal = yArray.get(ind);
    doc.transact(
      () => {
        yArray.delete(ind);
      },
      {event: 'remove', index: ind, oldValue: oldVal},
    );
    return oldVal;
  };

  array.getArray = () => {
    return yArray.toArray();
  };

  array.subscribe = (callback, fireOnInitialValue = false) => {
    if (fireOnInitialValue) {
      const event = {events: []};
      yArray.forEach((val, ind) => {
        event.events.push({event: 'insert', index: ind, newValue: val});
      });
      callback(event);
    }
    callbacks.push(callback);
  };

  /* End of External API */

  return array;
}
