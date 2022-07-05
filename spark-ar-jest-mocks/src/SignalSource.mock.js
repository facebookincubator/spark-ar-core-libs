/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {SignalMock} from './Signal.mock';

export class SignalSourceMock {
  constructor(name) {
    this._name = name;
    this._signal = new SignalMock(0);
  }

  get signal() {
    return this._signal;
  }

  set(value) {
    this._signal.set(value);
  }

  dispose() {}
}
