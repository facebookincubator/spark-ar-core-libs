/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Reactive = require('Reactive');
const YDoc = require('./yjs_doc');

const UNSUPPORTED_VALUE_MESSAGE =
  '`value` should be a number or string. Map values can only be Global Scalar or Global Strings.';

function callCallbacks(callBackArray, event) {
  for (const callback of callBackArray) {
    callback(event);
  }
}

function createSource(val, sourceName) {
  // set up source based on typeof val
  const sourceVal =
    typeof val === 'number'
      ? Reactive.scalarSignalSource(sourceName)
      : Reactive.stringSignalSource(sourceName);
  sourceVal.set(val);
  return sourceVal;
}

function toJSONSignal(localMap) {
  const map = {};
  for (const key of Object.keys(localMap)) {
    map[key] = localMap[key].signal;
  }
  return map;
}

/**
 * Creates a new `GlobalMap` with a globally unique name as specified by `name`.
 */
export async function createGlobalMap(name) {
  const globalMap = {};
  const localMap = {};
  const callbacks = [];
  const callbacksKeys = [];

  const doc = await YDoc.createYDoc(name);
  const yMap = doc.getMap(name);

  yMap.observe(yMapEvents => {
    yMapEvents.changes.keys.forEach((change, key) => {
      if (localMap.hasOwnProperty(key)) {
        localMap[key].set(yMap.get(key));
        callCallbacks(callbacks, {
          newValue: {[key]: yMap.get(key)},
          oldValue: {[key]: change.oldValue},
        });
      } else {
        localMap[key] = createSource(yMap.get(key), `${name}${key}`);
        callCallbacks(callbacksKeys, {[key]: localMap[key].signal});
        callCallbacks(callbacks, {newValue: {[key]: yMap.get(key)}});
      }
    });
  });

  /* Start of External API */

  globalMap.get = key => {
    return localMap[key].signal;
  };

  globalMap.set = (key, val) => {
    if (typeof val === 'number' || typeof val === 'string') {
      yMap.set(key.toString(), val);
    } else {
      throw TypeError(UNSUPPORTED_VALUE_MESSAGE);
    }
  };

  globalMap.keys = () => {
    return Object.keys(localMap);
  };

  globalMap.getMap = () => {
    return yMap.toJSON();
  };

  globalMap.subscribe = (callback, fireOnInitialValue = false) => {
    // subscribe to changes in the globalMap
    // if fireOnInitialValue is True, then callback all the existing key-value pairs
    if (fireOnInitialValue) {
      callback({newValue: yMap.toJSON()});
    }
    callbacks.push(callback);
  };

  globalMap.subscribeOnNewKey = (callback, fireOnInitialValue = false) => {
    // subscribe to the new keys added to the globalMap
    // if fireOnInitialValue is True, then callback all the existing keys
    if (fireOnInitialValue) {
      callback(toJSONSignal(localMap));
    }
    callbacksKeys.push(callback);
  };

  /* End of External API */

  return globalMap;
}
