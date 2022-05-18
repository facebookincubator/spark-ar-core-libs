/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export * from './Diagnostics.mock.js';
export * from './Participants.mock.js';
export * from './Multipeer.mock.js';

jest.mock(
  'Diagnostics',
  () => {
    const {DiagnosticsMock} = jest.requireActual('./Diagnostics.mock.js');
    return new DiagnosticsMock();
  },
  {virtual: true},
);

jest.mock(
  'Participants',
  () => {
    const {ParticipantsMock} = jest.requireActual('./Participants.mock.js');
    return new ParticipantsMock();
  },
  {virtual: true},
);

jest.mock(
  'Multipeer',
  () => {
    const {MultipeerMock} = jest.requireActual('./Multipeer.mock.js');
    return new MultipeerMock();
  },
  {virtual: true},
);
