/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {Quaternion} from '../src/MathQuaternion';
import {Vector3} from './../src/MathVectors';

export const expectQuaternionEqual = (
  toCheck: Quaternion,
  expected: Quaternion,
  epsilon?: number,
) => {
  if (!toCheck.isEqual(expected, epsilon)) {
    expect(toCheck.toString()).toBe(expected.toString());
  }
};

export const expectVectorEqual = (toCheck: Vector3, expected: Vector3, epsilon?: number) => {
  if (!toCheck.isEqual(expected, epsilon)) {
    expect(toCheck.toString()).toBe(expected.toString());
  }
};
