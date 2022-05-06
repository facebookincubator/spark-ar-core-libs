/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
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
