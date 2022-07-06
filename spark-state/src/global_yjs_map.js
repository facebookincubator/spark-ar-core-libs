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

/**
 * Creates a new `GlobalMap` with a globally unique name as specified by `name`.
 */
export async function createGlobalMap(name) {
  const globalMap = {};
  const sources = {};
  const callbacks = [];
  const callbacksKeys = [];

  const doc = await YDoc.createYDoc(name);

  doc.on('update', _ => {
    let event = {};

    // iterate over the doc then set each corresponding source
    for (let [key, val] of doc.getMap(name)) {
      if (!sources.hasOwnProperty(key)) {
        let source;
        const sourceName = `${name}${key}`;

        // set up source based on typeof val
        if (typeof val === 'number') {
          source = Reactive.scalarSignalSource(sourceName);
        } else if (typeof val === 'string') {
          source = Reactive.stringSignalSource(sourceName);
        } else {
          throw TypeError(UNSUPPORTED_MAP_VALUE_MESSAGE);
        }
        sources[key] = source;

        // callback for the subscribeOnNewKey
        callCallbacks(callbacksKeys, {[key]: sources[key].signal});

        // new key added, track event for subscribe the method
        event = {newValue: {[key]: val}};
      } else {
        // value of existing key is changed, track event for the subscribe method
        const prevVal = sources[key].signal.pinLastValue();
        if (prevVal !== val) {
          event = {oldValue: {[key]: prevVal}, newValue: {[key]: val}};
        }
      }
      sources[key].set(val);
    }
    // callback for the subscribe
    callCallbacks(callbacks, event);
  });

  globalMap.get = key => {
    return sources[key].signal;
  };

  globalMap.set = (key, val) => {
    doc.getMap(name).set(key, val);
  };

  globalMap.keys = () => {
    return Object.keys(sources);
  };

  globalMap.subscribe = (callback, fireOnInitialValue = false) => {
    // subscribe to changes in the globalMap
    // if fireOnInitialValue is True, then callback all the existing key-value pairs
    if (fireOnInitialValue) {
      let event = {newValue: {}};
      for (const key of Object.keys(sources)) {
        event.newValue[key] = sources[key].signal.pinLastValue();
      }
      callback(event);
    }
    callbacks.push(callback);
  };

  globalMap.subscribeOnNewKey = (callback, fireOnInitialValue = false) => {
    // subscribe to the new keys added to the globalMap
    // if fireOnInitialValue is True, then callback all the existing keys
    if (fireOnInitialValue) {
      let event = {};
      for (const key of Object.keys(sources)) {
        event[key] = sources[key].signal;
      }
      callback(event);
    }
    callbacksKeys.push(callback);
  };

  return globalMap;
}
