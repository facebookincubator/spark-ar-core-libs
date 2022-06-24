/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {SignalMock} from './Signal.mock.js';

class PatchesInputMock {
  async set(name, signal) {}
  async setBoolean(name, signal) {}
  async setScalar(name, signal) {}
  async setString(name, signal) {}
  async setPulse(name, signal) {}
  async setPoint(name, signal) {}
  async setVector(name, signal) {}
  async setColor(name, signal) {}
}

class PatchesOutputMock {
  constructor() {
    this._signals = {};
  }

  setMockSignal(name, signal) {
    this._signals[name] = signal;
  }

  async get(name) {
    return this._signals[name];
  }
  getOrFallback(name, fallback) {
    if (this._signals[name]) {
      return this._signals[name];
    } else {
      return fallback;
    }
  }
  async getBoolean(name) {
    return await get(name);
  }
  getBooleanOrFallback(name, fallback) {
    return getOrFallback(name, fallback);
  }
  async getScalar(name) {
    return await get(name);
  }
  getScalarOrFallback(name, fallback) {
    return getOrFallback(name, fallback);
  }
  async getString(name) {
    return await get(name);
  }
  getStringOrFallback(name, fallback) {
    return getOrFallback(name, fallback);
  }
  async getPulse(name) {
    return await get(name);
  }
  getPulseOrFallback(name, fallback) {
    return getOrFallback(name, fallback);
  }
  async getPoint(name) {
    return await get(name);
  }
  getPointOrFallback(name, fallback) {
    return getOrFallback(name, fallback);
  }
  async getVector(name) {
    return await get(name);
  }
  getVectorOrFallback(name, fallback) {
    return getOrFallback(name, fallback);
  }
  async getColor(name) {
    return await get(name);
  }
  getColorOrFallback(name, fallback) {
    return getOrFallback(name, fallback);
  }
  async getPoint2D(name) {
    return await get(name);
  }
  getPoint2DOrFallback(name, fallback) {
    return getOrFallback(name, fallback);
  }
}

export class PatchesMock {
  constructor(value) {
    this._inputs = new PatchesInputMock();
    this._outputs = new PatchesOutputMock();
  }

  get inputs() {
    return this._inputs;
  }

  get outputs() {
    return this._outputs;
  }
}
