/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export * from './Diagnostics.mock.js';
export * from './Participants.mock.js';
export * from './Multipeer.mock.js';
export * from './Time.mock.js';
export * from './Patches.mock.js';
export * from './Reactive.mock.js';
export * from './Signal.mock.js';

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

jest.mock(
  'Time',
  () => {
    const {TimeMock} = jest.requireActual('./Time.mock.js');
    return new TimeMock();
  },
  {virtual: true},
);

jest.mock(
  'Patches',
  () => {
    const {PatchesMock} = jest.requireActual('./Patches.mock.js');
    return new PatchesMock();
  },
  {virtual: true},
);

jest.mock(
  'Reactive',
  () => {
    const {ReactiveMock} = jest.requireActual('./Reactive.mock.js');
    return new ReactiveMock();
  },
  {virtual: true},
);

jest.mock(
  'Signal',
  () => {
    const {SignalMock} = jest.requireActual('./Signal.mock.js');
    return new SignalMock();
  },
  {virtual: true},
);
