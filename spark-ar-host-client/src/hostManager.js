/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Time from 'Time';
import Multipeer from 'Multipeer';
import {createParticipantManager} from 'spark-ar-participant-manager';

const HostState = {
  PENDING: 0,
  FINALISED: 1,
};

export class HostManager {
  constructor(config) {
    this._participantManager = undefined;
    this._currentHostInfo = undefined;
    this._hostManagerChannel = Multipeer.getMessageChannel('host_manager');
    this._subscriptions = [];

    this._hostHeartBeatInterval = config.hostHeartBeatInterval || 1000;
    this._hostFinaliseDuration = config.hostFinaliseDuration || 3000;
    this._hostStuckDuration = config.hostStuckDuration || 3000;
  }

  async init() {
    this._participantManager = await createParticipantManager();
    this._resolveNewHost(false);
    this._participantManager.addListener('leave', () => {
      // when someone left, check if we need to resolve a new host
      this._resolveNewHost(false);
    });

    this._hostManagerChannel.onMessage.subscribe(hostInfo => {
      this._handleHostInfo(hostInfo);
    });
    this.updateEventHandle = Time.setInterval(() => {
      this._hostHeartbeat();
      this._checkStuck();
    }, this._hostHeartBeatInterval);
  }

  _validateHost() {
    if (!this._currentHostInfo) {
      return false;
    }
    return (
      this._currentHostInfo.host.isActiveInCall.pinLastValue() &&
      this._currentHostInfo.host.isActiveInSameEffect.pinLastValue()
    );
  }

  _resolveNewHost(forceNewHost) {
    if (!forceNewHost && this._validateHost()) {
      // if we already have a valid host, or a valid pending host, don't need to resolve
      // a new host
      return;
    }

    // if `forceNewHost`, it's to unblock possible stuck host, so we let every participant
    // to compete to be host to avoid everyone waiting on the stuck host.
    const hostCandidate = forceNewHost
      ? this._participantManager.self
      : this._participantManager.currentHost;
    this._currentHostInfo = {
      state: HostState.PENDING,
      host: hostCandidate,
      claimTimestamp: undefined,
    };
    this._dispatchHostChange();
    this._lastHostUpdateTimestamp = Date.now();

    this._hostHeartbeat();
  }

  getParticipantManager() {
    return this._participantManager;
  }

  getHost() {
    return this._currentHostInfo.host;
  }

  getIsSelfHost() {
    return this._currentHostInfo.host.id === this._participantManager.self.id;
  }

  getIsHostPending() {
    return this._currentHostInfo.state === HostState.PENDING;
  }

  _hostHeartbeat() {
    if (!this.getIsSelfHost()) {
      return;
    }

    if (!this._currentHostInfo.claimTimestamp) {
      this._currentHostInfo.claimTimestamp = Date.now();
    }

    if (Date.now() - this._currentHostInfo.claimTimestamp >= this._hostFinaliseDuration) {
      this._currentHostInfo.state = HostState.FINALISED;
      this._dispatchHostChange();
    }

    const hostInfo = {
      id: this._currentHostInfo.host.id,
      s: this._currentHostInfo.state,
      t: this._currentHostInfo.claimTimestamp,
    };
    // use non-RTP channel to gurantee it's received
    this._hostManagerChannel.sendMessage(hostInfo, false);
  }

  _handleHostInfo(hostInfo) {
    const newHost = this.getActiveParticipantById(hostInfo.id);
    if (!newHost) {
      // if the message is from a host already offline, ignore.
      return;
    }
    const newClaimTimestamp = hostInfo.t;
    const newState = hostInfo.s;
    this._lastHostUpdateTimestamp = Date.now();

    // if the message is from a finalised host, update
    if (newState === HostState.FINALISED) {
      this._currentHostInfo.host = newHost;
      this._currentHostInfo.state = HostState.FINALISED;
      this._currentHostInfo.claimTimestamp = newClaimTimestamp;
      this._dispatchHostChange();
      return;
    }

    // If it's a pending host, resolve if it's the best pending host
    // The pending host with lower timestamp should win
    // If timestamp equal(very rare), compare id
    if (
      !this._currentHostInfo.claimTimestamp ||
      this._currentHostInfo.claimTimestamp > newClaimTimestamp ||
      (this._currentHostInfo.claimTimestamp === newClaimTimestamp &&
        this._currentHostInfo.host.id > newHost.id)
    ) {
      this._currentHostInfo.host = newHost;
      this._currentHostInfo.state = HostState.PENDING;
      this._currentHostInfo.claimTimestamp = newClaimTimestamp;
      this._dispatchHostChange();
    }
  }

  _checkStuck() {
    // if not receiving heartbeat from host for a long time, it may
    // mean host is stuck, try resolve a new host
    if (
      !this.getIsSelfHost() &&
      Date.now() - this._lastHostUpdateTimestamp > this._hostStuckDuration
    ) {
      this._resolveNewHost(true);
    }
  }

  getActiveParticipantById(id) {
    for (const activeParticipant of this._participantManager.activeParticipants) {
      if (activeParticipant.id === id) {
        return activeParticipant;
      }
    }
    return undefined;
  }

  addListener(eventType, callback) {
    const subscription = {type: eventType, callback};
    this._subscriptions.push(subscription);
  }

  removeListener(eventType, callback) {
    this._subscriptions = this._subscriptions.filter(subscription => {
      return subscription.callback !== callback || subscription.type !== eventType;
    });
  }

  _dispatchEvent(event) {
    this._subscriptions.forEach(subscription => {
      if (subscription.type === event.type) {
        subscription.callback(event);
      }
    });
  }

  _dispatchHostChange() {
    this._dispatchEvent({
      type: 'hostStateChange',
      ...this._currentHostInfo,
    });
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
