/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 */

import ParticipantManager from './participantManager.js';

export async function createParticipantManager(config) {
  const participantManager = new ParticipantManager(config);
  await participantManager.init();
  return participantManager;
}
