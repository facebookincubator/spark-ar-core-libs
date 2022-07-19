/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Reactive = require('Reactive');
const YDoc = require('./yjs_doc');

const UNSUPPORTED_MAP_VALUE_MESSAGE =
  '`value` should be a number or string. Map values can only be Global Scalar or Global Strings';

function callCallbacks(callBackArray, event) {
  for (const callback of callBackArray) {
    callback(event);
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
 * Creates a new `GlobalMap` with a globally unique name as specified by `name`.
 */
export async function createGlobalMap(name) {
  const globalMap = {};
  const callbacks = [];
  const callbacksKeys = [];

  const doc = await YDoc.createYDoc(name);
  const yMap = doc.getMap(name);

  yMap.observe(yMapEvent => {
    yMapEvent.changes.keys.forEach((change, key) => {
      let event = {};
      const newKey = yMap.get(key);
      const newVal = newKey.source.signal.pinLastValue();
      if (change.action === 'add') {
        callCallbacks(callbacksKeys, {[key]: newKey.source.signal});
        event = {newValue: {[key]: newVal}};
      } else if (change.action === 'update') {
        event = {oldValue: {[key]: newKey.prevVal}, newValue: {[key]: newVal}};
      }
      callCallbacks(callbacks, event);
    });
  });

  globalMap.get = key => {
    return yMap.get(key).source.signal;
  };

  globalMap.set = (key, val) => {
    let sourceVal;
    let prev = null;
    if (yMap.has(key)) {
      sourceVal = yMap.get(key).source;
      prev = sourceVal.signal.pinLastValue();
    } else {
      sourceVal = createSource(val, `${name}${key}`);
    }
    sourceVal.set(val);
    yMap.set(key, {source: sourceVal, prevVal: prev});
  };

  globalMap.keys = () => {
    return Array.from(yMap.keys());
  };

  globalMap.subscribe = (callback, fireOnInitialValue = false) => {
    // subscribe to changes in the globalMap
    // if fireOnInitialValue is True, then callback all the existing key-value pairs
    if (fireOnInitialValue) {
      const event = {newValue: {}};
      yMap.forEach((value, key) => {
        event.newValue[key] = value.source.signal.pinLastValue();
      });
      callback(event);
    }
    callbacks.push(callback);
  };

  globalMap.subscribeOnNewKey = (callback, fireOnInitialValue = false) => {
    // subscribe to the new keys added to the globalMap
    // if fireOnInitialValue is True, then callback all the existing keys
    if (fireOnInitialValue) {
      const event = {};
      yMap.forEach((value, key) => {
        event[key] = value.source.signal;
      });
      callback(event);
    }
    callbacksKeys.push(callback);
  };

  return globalMap;
}
