/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ParticipantManager from './participantManager.js';

export async function createParticipantManager(config) {
  const participantManager = new ParticipantManager(config);
  await participantManager.init();
  return participantManager;
}
