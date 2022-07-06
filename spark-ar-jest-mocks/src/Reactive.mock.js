/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {ScalarSignalSourceMock, StringSignalSourceMock} from './SignalSource.mock';

export class ReactiveMock {
  scalarSignalSource(name) {
    return new ScalarSignalSourceMock(name);
  }
  stringSignalSource(name) {
    return new StringSignalSourceMock(name);
  }
}
