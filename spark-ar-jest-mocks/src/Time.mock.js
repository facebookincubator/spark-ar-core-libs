/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class TimeMock {
  constructor() {
    this._intervalSubscription = new Set();
    this._timeoutSubscription = new Set();
  }

  mockReset() {
    for (const subscription of this._intervalSubscription) {
      this.clearInterval(subscription);
    }
    for (const subscription of this._timeoutSubscription) {
      this.clearTimeout(subscription);
    }
  }

  clearInterval(subscription) {
    this._intervalSubscription.delete(subscription);
    return global.clearInterval(subscription);
  }

  clearTimeout(subscription) {
    this._timeoutSubscription.delete(subscription);
    return global.clearTimeout(subscription);
  }

  setInterval(callback, delay) {
    const subscription = global.setInterval(callback, delay);
    this._intervalSubscription.add(subscription);
    return subscription;
  }

  setTimeout(callback, delay) {
    const subscription = global.setTimeout(callback, delay);
    this._timeoutSubscription.add(subscription);
    return subscription;
  }

  get ms() {
    return this.mockMs;
  }
}
