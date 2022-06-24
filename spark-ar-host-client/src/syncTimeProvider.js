/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Time from 'Time';
import Diagnostics from 'Diagnostics';
import Multipeer from 'Multipeer';

const SyncMessageType = {
  REQUEST: 0,
  RESPONSE: 1,
};

/**
 * How time difference is calculated:
 * Assuming network delay between 2 participant is constant: n.
 * Say time difference is d. (host time - client time)
 * Then:
 * For message from client to host(REQUEST), client sent at t0, host received at t1
 * For another message from host to client(RESPONSE), host sent at t1, client received
 * at t2.
 *
 * So we have:
 * t1 = t0 + d + n
 * t2 = t1 - d + n
 *
 * Then resolve the equation：
 * d = (2 * t1 - t0 - t2) / 2
 */
export class SyncTimeProvider {
  constructor(hostManager, useSyncTime) {
    this._timeOffset = 0;
    this._hostManager = hostManager;
    this._timeSyncInterval = 1000;
    // We only set an time offest to align with host when the timestamp
    // very different from host, e.g. 3s
    this._timeOffsetThreshold = 3000;

    this._timeSyncChannel = Multipeer.getMessageChannel('timeSync');
    this._timeSyncChannel.onMessage.subscribe(message => {
      this._handleSyncMassage(message);
    });

    if (useSyncTime) {
      Time.setInterval(() => {
        this._requestTimeSync();
      }, this._timeSyncInterval);
    }
  }

  now() {
    return Date.now() + this._timeOffset;
  }

  _requestTimeSync() {
    // only try sync time when host is finalised
    if (!this._hostManager.getIsHostPending() && !this._hostManager.getIsSelfHost()) {
      this._timeSyncChannel.sendMessage({
        type: SyncMessageType.REQUEST,
        c: this._hostManager.getParticipantManager().self.id,
        t0: this.now(),
      });
    }
  }

  _handleSyncMassage(message) {
    if (message.type === SyncMessageType.REQUEST) {
      if (this._hostManager.getIsSelfHost()) {
        // Response as host
        this._timeSyncChannel.sendMessage({
          type: SyncMessageType.RESPONSE,
          c: message.c,
          h: this._hostManager.getParticipantManager().self.id,
          t0: message.t0,
          t1: this.now(),
        });
      }
    } else {
      if (
        this._hostManager.getHost().id === message.h &&
        this._hostManager.getParticipantManager().self.id === message.c
      ) {
        // Calculate the new time difference
        const t0 = message.t0;
        const t1 = message.t1;
        const t2 = this.now();
        const newTimeOffset = (2 * t1 - t0 - t2) / 2;
        if (Math.abs(newTimeOffset) > this._timeOffsetThreshold) {
          this._timeOffset += newTimeOffset;
        }
      }
    }
  }
}
