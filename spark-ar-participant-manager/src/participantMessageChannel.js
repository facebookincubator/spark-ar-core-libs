/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 */

import Multipeer from 'Multipeer';
import Participants from 'Participants';
import Diagnostics from 'Diagnostics';

export default class ParticipantMessageChannel {
  constructor(topic, selfId) {
    this._channel = Multipeer.getMessageChannel(topic);
    this._selfId = selfId;
  }

  sendMessage(participantId, message, realTimeChannel) {
    return this._channel.sendMessage(
      {target: participantId, from: this._selfId, payload: message},
      realTimeChannel,
    );
  }

  subscribeToMessage(callback) {
    return this._channel.onMessage.subscribe(message => {
      if (message.target == null || message.target === this._selfId) {
        callback(message.from, message.payload);
      }
    });
  }
}
