/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {EventSourceMock} from './EventSource.mock.js';

export class EchoMessageChannelMock {
  constructor(topic) {
    this._topic = topic;
    this._messageStream = undefined;
  }

  async sendMessage(message, realTimeChannel) {
    if (this._messageStream != undefined) {
      await this._messageStream.mockCallback(message);
    }
  }

  get onMessage() {
    if (this._messageStream == undefined) {
      this._messageStream = new EventSourceMock();
    }
    return this._messageStream;
  }
}

export class MultipeerMock {
  constructor() {
    this._channels = {};
  }

  getMessageChannel(topic = 'GLOBAL') {
    if (this._channels[topic] == undefined) {
      this._channels[topic] = new EchoMessageChannelMock(topic);
    }
    return this._channels[topic];
  }

  getBinaryMessageChannel(topic) {
    if (this._channels[topic] == undefined) {
      this._channels[topic] = new EchoMessageChannelMock(topic);
    }
    return this._channels[topic];
  }
}
