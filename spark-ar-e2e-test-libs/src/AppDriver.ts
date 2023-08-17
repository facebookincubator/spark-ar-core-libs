/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fetch from 'node-fetch';
import {Augment, NodeUiDump} from './AppDriverTypes';

const WEBDRIVER_HOST = 'http://127.0.0.1';
const DEFAULT_WEBSERVER_PORT = 4444;

export class AppDriver {
  #baseURL: string;

  constructor(port: number = DEFAULT_WEBSERVER_PORT) {
    this.#baseURL = `${WEBDRIVER_HOST}:${port}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async status(): Promise<any> {
    try {
      const response = await fetch(`${this.#baseURL}/status`);
      return response.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new AppDriverUnreachableError(e.message);
    }
  }

  inspectAugmentIds(): Promise<Array<string>> {
    return this.fetch({
      uri: '/meta/xr/augment',
      method: 'GET',
    });
  }

  inspectAugmentInfo({id}: {id: string}): Promise<Augment> {
    return this.fetch<Augment>({
      uri: '/meta/xr/augment',
      method: 'POST',
      body: JSON.stringify({id}),
    });
  }

  inspectNodeViewDump({nodeId}: {nodeId: string}): Promise<NodeUiDump> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.fetch<any>({
      uri: '/meta/xr/node/dump_by/nodeid',
      method: 'POST',
      body: JSON.stringify({nodeId}),
    });
  }

  async selectNodeById({id}: {id: string}): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await this.fetch<any>({
      uri: '/meta/xr/node/select',
      method: 'POST',
      body: JSON.stringify({id}),
    });
  }

  async fetch<T>({
    uri,
    method,
    body,
    headers,
  }: {
    uri: string;
    method: string;
    headers?: {[key: string]: string};
    body?: string;
  }): Promise<T> {
    const response = await fetch(`${this.#baseURL}${uri}`, {method, headers, body});
    const responseJson = await response.json();
    return responseJson as T;
  }
}

class AppDriverUnreachableError extends Error {
  constructor(message: string) {
    super(`Failed to reach app automation server: ${message}`);
    this.name = 'AppDriverUnreachableError';
  }
}
