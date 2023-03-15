/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {expect, test} from '@jest/globals';

import {Quaternion} from '../src/MathQuaternion';
import {Vector3} from '../src/MathVectors';
import {Lerp, Slerp} from './../src/MathLerp';
import {expectQuaternionEqual, expectVectorEqual} from './EqualityUtils';

test('Lerp Numeric', async () => {
  expect(Lerp.number(10, 20, 0)).toBe(10);
  expect(Lerp.number(10, 20, 1)).toBe(20);
  expect(Lerp.number(10, 20, 0.5)).toBeCloseTo(15);
  expect(Lerp.number(10, 20, 0.25)).toBeCloseTo(12.5);
});

test('Lerp Vector', async () => {
  const a = Vector3.up;
  const b = Vector3.left;
  expectVectorEqual(Lerp.vector(a, b, 0), Vector3.up);
  expectVectorEqual(Lerp.vector(a, b, 1), Vector3.left);
  expectVectorEqual(Lerp.vector(a, b, 0.5), new Vector3(-0.5, 0.5, 0));
  expectVectorEqual(Lerp.vector(a, b, 0.25), new Vector3(-0.25, 0.75, 0));
});

test('Lerp Quaternion', async () => {
  const a = new Quaternion(20, 30, 40, 10);
  const b = new Quaternion(60, -30, -20, 20);
  expectQuaternionEqual(Lerp.quaternion(a, b, 0), a);
  expectQuaternionEqual(Lerp.quaternion(a, b, 1), b);
  expectQuaternionEqual(Lerp.quaternion(a, b, 0.5), new Quaternion(40, 0, 10, 15));
  expectQuaternionEqual(Lerp.quaternion(a, b, 0.25), new Quaternion(30, 15, 25, 12.5));
});

test('Slerp Quaternion: Single Axis', async () => {
  const a = new Quaternion(1, 0, 0, 1).normalize();
  const b = new Quaternion(-1, 0, 0, 1).normalize();
  expectQuaternionEqual(Slerp.quaternion(a, b, 0), a);
  expectQuaternionEqual(Slerp.quaternion(a, b, 1), b);
  expectQuaternionEqual(Slerp.quaternion(a, b, 0.5), new Quaternion(0, 0, 0, 1));
});

test('Slerp Quaternion: Axis', async () => {
  const a = new Quaternion(1, 0, 0, 1);
  const b = new Quaternion(0, 1, 0, 1);
  expectQuaternionEqual(Slerp.quaternion(a, b, 0), a);
  expectQuaternionEqual(Slerp.quaternion(a, b, 1), b);
  expectQuaternionEqual(Slerp.quaternion(a, b, 0.5), new Quaternion(0.5, 0.5, 0, 1));
});

test('Slerp Quaternion: Special', async () => {
  const a = new Quaternion(20, 30, 40, 10).normalize();
  const b = new Quaternion(60, -30, -20, 20).normalize();
  expectQuaternionEqual(Slerp.quaternion(a, b, 0), a);
  expectQuaternionEqual(Slerp.quaternion(a, b, 1), b);
  expectQuaternionEqual(
    Slerp.quaternion(a, b, 0.5),
    new Quaternion(
      -0.3130113591464436,
      0.6545093836485396,
      0.6853414411366854,
      -0.06283681104253803,
    ).normalize(),
  );
});
