/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {SignalSourceMock} from './SignalSource.mock';

export class ReactiveMock {
  scalarSignalSource(name) {
    return new SignalSourceMock(name);
  }
  stringSignalSource(name) {
    return new SignalSourceMock(name);
  }
}
