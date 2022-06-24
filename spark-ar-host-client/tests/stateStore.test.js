/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Participants from 'Participants';
import Time from 'Time';
import {ParticipantMock} from '../../spark-ar-jest-mocks';
import {createStateStore} from '../src/index.js';

afterEach(() => {
  Participants.mockReset();
  Time.mockReset();
});

test('Sanity Check', async () => {
  const store = await createStateStore({
    initialState: {},
    handlers: [],
  });
});
