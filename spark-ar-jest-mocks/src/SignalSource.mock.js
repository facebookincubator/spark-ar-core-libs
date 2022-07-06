/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {SignalMock} from './Signal.mock';

export class ScalarSignalSourceMock {
  constructor(name) {
    this._name = name;
    this._signal = new SignalMock(0);
  }

  get signal() {
    return this._signal;
  }

  set(value) {
    this._signal.mockUpdate(value);
  }
}

export class StringSignalSourceMock {
  constructor(name) {
    this._name = name;
    this._signal = new SignalMock('');
  }

  get signal() {
    return this._signal;
  }

  set(value) {
    this._signal.mockUpdate(value);
  }
}
