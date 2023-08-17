/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type Vec3 = {
  x: number;
  y: number;
  z: number;
};

export type Augment = {
  anchor?: {uuid: string};
  id: string;
  nodes: Array<string>;
  position: Vec3;
  testId: string;
};

export type SparkAppUiDump = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sparkSceneGraph: any;
  sparkBlockSceneElementsMap: Map<string, string>;
};

export type NodeUiDump = SparkAppUiDump;
