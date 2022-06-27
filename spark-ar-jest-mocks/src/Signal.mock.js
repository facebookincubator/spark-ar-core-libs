/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {EventSourceMock} from './EventSource.mock.js';

export class SignalMock {
  constructor(value) {
    this._eventSources = [];
    this._value = value;
  }

  get value() {
    return this._value;
  }

  monitor(config) {
    const eventSource = new EventSourceMock(config, this);
    this._eventSources.push(eventSource);
    return eventSource;
  }

  pin() {
    return new SignalBase(this._value);
  }

  pinLastValue() {
    return this._value;
  }

  getInitialValueEvent() {
    return {
      oldValue: this._value,
      newValue: this._value,
    };
  }

  set(value) {
    this._value = value;
  }

  async mockUpdate(newValue) {
    if (this._value !== newValue) {
      const event = {
        oldValue: this._value,
        newValue: newValue,
      };
      this._value = newValue;
      for (const eventSource of this._eventSources) {
        await eventSource.mockCallback(event);
      }
    }
  }
}
