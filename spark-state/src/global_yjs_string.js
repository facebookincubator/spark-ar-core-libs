/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Reactive = require('Reactive');

const YDoc = require('./yjs_doc');

export async function createGlobalStringSignal(startValue, name) {
  // set up signal source
  const source = Reactive.stringSignalSource(name);
  source.set(startValue);
  const signal = source.signal;

  const doc = await YDoc.createYDoc(name);

  // update the source value when ydoc value is changed
  doc.on('update', _ => {
    source.set(doc.getMap('s').get(name));
  });

  /* Start of External API */

  // signal setter API available to external users
  signal.set = val => {
    // set ydoc value with user input
    doc.getMap('s').set(name, val);
  };

  /* End of External API */

  return signal;
}
