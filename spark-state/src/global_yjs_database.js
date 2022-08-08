/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const YDoc = require('./yjs_doc');
const Y = require('./yjs');

const UNSUPPORTED_VALUE_MESSAGE = '`value` should be a number, string, or a vanilla object.';

function setVal(yDb, path, value) {
  if (
    !(
      typeof value === 'number' ||
      typeof value === 'string' ||
      (typeof value === 'object' &&
        value instanceof Object &&
        !(value instanceof Array) &&
        !value.doc)
    )
  ) {
    throw TypeError(UNSUPPORTED_VALUE_MESSAGE);
  }
  let map = yDb;
  const lastElemIndex = path.split('/').length - 1;
  yDb.doc.transact(() => {
    // transact so that when new Y.Maps created on the way, they dont trigger the observe method
    path.split('/').forEach((key, index) => {
      if (index === lastElemIndex) {
        map.set(
          key,
          typeof value === 'object'
            ? new Y.Map(Object.keys(value).map(key => [key, value[key]]))
            : value,
        );
      } else {
        if (!map.has(key) || !map.get(key)._map) {
          map.set(key, new Y.Map());
        }
        map = map.get(key);
      }
    });
  });
}

function getVal(yDb, path, yMap = false) {
  let val = yDb;
  path.split('/').forEach(key => {
    if (val === undefined || !val._map) {
      throw Error('The path is wrong!');
    }
    val = val.get(key);
  });

  if (yMap) {
    if (yMap === undefined || !val._map) {
      throw Error('The path is wrong. Path should point to Map!');
    }
    return val; // YMap for subscribe method
  }
  return val && val.doc ? val.toJSON() : val;
}

function isChild(currentYMap, callbackYMap) {
  // check if the YMap where change has happened is a child of the subscribed YMap
  for (const [_, value] of callbackYMap) {
    if (value === currentYMap) {
      return true;
    } else if (value !== 'undefined' && value._map) {
      if (isChild(value, callbackYMap)) {
        return true;
      }
    }
  }
  return false;
}

function pathJSON(targetKey, yMapChild, yMapParent, val, path = {}) {
  // return the path to the change
  for (const [key, value] of yMapParent) {
    if (key === targetKey && yMapParent === yMapChild) {
      path[key] = val;
      return path;
    } else if (value !== 'undefined' && value._map) {
      path[key] = {};
      if (pathJSON(targetKey, yMapChild, value, val, path[key])) {
        return path;
      }
      delete path[key];
    }
  }
}

/**
 * Creates a new `globalDatabase` with a globally unique name as specified by `name`.
 */
export async function createGlobalDatabase(name) {
  const globalDatabase = {};
  const callbacks = [];

  const doc = await YDoc.createYDoc(name);
  const yDb = doc.getMap('db' + name);

  yDb.observeDeep(yMapEvents => {
    yMapEvents.forEach(yMapEvent => {
      yMapEvent.changes.keys.forEach((change, key) => {
        for (const [callback, yMap] of callbacks) {
          if (yMapEvent.target === yMapEvent.currentTarget) {
            // change has happened in this YMap
            change.action === 'add'
              ? callback({
                  newValue: {[key]: yDb.get(key)._map ? yDb.get(key).toJSON() : yDb.get(key)},
                })
              : callback({
                  newValue: {[key]: yDb.get(key)._map ? yDb.get(key).toJSON() : yDb.get(key)},
                  oldValue: {[key]: change.oldValue},
                });
          } else if (isChild(yMapEvent.target, yMap)) {
            // change has happened in one of the children of this YMap
            change.action === 'add'
              ? callback({
                  newValue: pathJSON(key, yMapEvent.target, yMap, yMapEvent.target.get(key)),
                })
              : callback({
                  newValue: pathJSON(key, yMapEvent.target, yMap, yMapEvent.target.get(key)),
                  oldValue: pathJSON(key, yMapEvent.target, yMap, change.oldValue),
                });
          }
        }
      });
    });
  });

  /* Start of External API */

  globalDatabase.get = key => {
    return getVal(yDb, key.toString());
  };

  globalDatabase.set = (key, val) => {
    setVal(yDb, key.toString(), val);
  };

  globalDatabase.keys = () => {
    return Array.from(yDb.keys());
  };

  globalDatabase.getJSON = () => {
    return yDb.toJSON();
  };

  globalDatabase.transact = f => {
    doc.transact(() => {
      f();
    });
  };

  globalDatabase.subscribe = (callback, path = null, fireOnInitialValue = false) => {
    // subscribe to changes in the globalDatabase
    // if fireOnInitialValue is True, then callback all the existing key-value pairs
    const yMap = path === null ? yDb : getVal(yDb, path, true);
    if (fireOnInitialValue) {
      callback({newValue: yMap.toJSON()});
    }
    callbacks.push([callback, yMap]);
  };

  /* End of External API */

  return globalDatabase;
}
