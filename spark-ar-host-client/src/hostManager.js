/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createParticipantManager} from 'spark-ar-participant-manager';

export class HostManager {
  constructor(config) {
    this._participantManager = undefined;
    this._currentHost = undefined;
  }

  async init() {
    this._participantManager = await createParticipantManager();
    this._resolveNewHost();
    this._participantManager.addListener('leave', () => {
      // when someone left, check if we need to resolve a new host
      this._resolveNewHost();
    });
  }

  _validateHost() {
    if (!this._currentHost) {
      return false;
    }
    return (
      this._currentHost.isActiveInCall.pinLastValue() &&
      this._currentHost.isActiveInSameEffect.pinLastValue()
    );
  }

  _resolveNewHost() {
    if (this._validateHost()) {
      // if we already have a valid host, or a valid pending host, don't need to resolve
      // a new host
      return;
    }

    this._currentHost = this._participantManager.currentHost;
  }

  getParticipantManager() {
    return this._participantManager;
  }

  getHost() {
    return this._currentHost;
  }

  getIsSelfHost() {
    return this._currentHost.id === this._participantManager.self.id;
  }
}

let hostManager = undefined;

export async function createHostManager(config) {
  // Host Manager should be singleton, we only need one host setups in an
  // effect session.
  if (!hostManager) {
    hostManager = new HostManager(config);
    await hostManager.init();
  }
  return hostManager;
}
