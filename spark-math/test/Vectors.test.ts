/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {Vector3} from './../src/MathVectors';
import {expectVectorEqual} from './EqualityUtils';

test('Default Vectors', async () => {
  expectVectorEqual(Vector3.zero, new Vector3(0, 0, 0));
  expectVectorEqual(Vector3.up, new Vector3(0, 1, 0));
  expectVectorEqual(Vector3.down, new Vector3(0, -1, 0));
  expectVectorEqual(Vector3.right, new Vector3(1, 0, 0));
  expectVectorEqual(Vector3.left, new Vector3(-1, 0, 0));
  expectVectorEqual(Vector3.forward, new Vector3(0, 0, 1));
  expectVectorEqual(Vector3.back, new Vector3(0, 0, -1));
  expectVectorEqual(Vector3.identity, new Vector3(1, 1, 1));
});

test('Vector Mutability', async () => {
  const vector = Vector3.zero;
  vector.add(new Vector3(1, 1, 2));
  vector.sub(new Vector3(0, 0, 1));
  vector.scale(2);
  expectVectorEqual(vector, new Vector3(2, 2, 2));
});

test('Vector Add', async () => {
  const vector = Vector3.zero;
  vector.add(new Vector3(1, 1, 2));
  expectVectorEqual(vector, new Vector3(1, 1, 2));
  vector.add(new Vector3(2, 3, 2));
  expectVectorEqual(vector, new Vector3(3, 4, 4));
  vector.add(new Vector3(-1, 0, -3));
  expectVectorEqual(vector, new Vector3(2, 4, 1));
});

test('Vector Subtract', async () => {
  const vector = Vector3.zero;
  vector.sub(new Vector3(1, 1, 2));
  expectVectorEqual(vector, new Vector3(-1, -1, -2));
  vector.sub(new Vector3(-2, -3, -2));
  expectVectorEqual(vector, new Vector3(1, 2, 0));
  vector.sub(new Vector3(-1, 0, -3));
  expectVectorEqual(vector, new Vector3(2, 2, 3));
});

test('Vector Negate', async () => {
  const vector = new Vector3(1, 1, 2);
  vector.neg();
  expectVectorEqual(vector, new Vector3(-1, -1, -2));
});

test('Vector Scale', async () => {
  const vector = new Vector3(1, 1, 2);
  vector.scale(3);
  expectVectorEqual(vector, new Vector3(3, 3, 6));
  vector.scale(1.5);
  expectVectorEqual(vector, new Vector3(4.5, 4.5, 9));
});

test('Vector Magnitude', async () => {
  let vector = new Vector3(1, 1, 2);
  expect(vector.magnitude).toBeCloseTo(Math.sqrt(6));
  expect(vector.squaredMagnitude).toBe(6);

  vector = new Vector3(1.5, 2.8, 9.1);
  expect(vector.magnitude).toBeCloseTo(Math.sqrt(92.9));
  expect(vector.squaredMagnitude).toBeCloseTo(92.9);
});

test('Vector Normalize', async () => {
  let vector = new Vector3(1, 1, 2);
  let magnitude = Math.sqrt(6);
  vector.normalize();
  expectVectorEqual(vector, new Vector3(1 / magnitude, 1 / magnitude, 2 / magnitude));

  vector = new Vector3(1.5, 2.8, 9.1);
  magnitude = Math.sqrt(92.9);
  vector.normalize();
  expectVectorEqual(vector, new Vector3(1.5 / magnitude, 2.8 / magnitude, 9.1 / magnitude));
});

test('Vector Dot Product', async () => {
  const vector1 = new Vector3(1, 2, 3);
  const vector2 = new Vector3(4, 5, 6);
  expect(Vector3.dot(vector1, vector2)).toBe(4 + 10 + 18);
});

test('Vector Cross Product', async () => {
  const vector1 = new Vector3(3, -3, 1);
  const vector2 = new Vector3(4, 9, 2);
  expectVectorEqual(Vector3.cross(vector1, vector2), new Vector3(-15, -2, 39));
});

test('Vector Angle Between', async () => {
  let vector1 = new Vector3(1, 0, 0);
  let vector2 = new Vector3(1, 0, 0);
  expect(Vector3.angle(vector1, vector2)).toBeCloseTo(0);

  vector1 = new Vector3(1, 0, 0);
  vector2 = new Vector3(0, 1, 0);
  expect(Vector3.angle(vector1, vector2)).toBeCloseTo(Math.PI / 2);

  vector1 = new Vector3(0, 0, 1);
  vector2 = new Vector3(0, 0, -1);
  expect(Vector3.angle(vector1, vector2)).toBeCloseTo(Math.PI);

  vector1 = new Vector3(2, 3, 1);
  vector2 = new Vector3(-2, -3, -1);
  expect(Vector3.angle(vector1, vector2)).toBeCloseTo(Math.PI);

  vector1 = new Vector3(1, 2, 3);
  vector2 = new Vector3(3, -2, 1);
  expect(Vector3.angle(vector1, vector2)).toBeCloseTo(Math.acos(1 / 7));
});

test('Vector Distance', async () => {
  const vector1 = new Vector3(1, 0, 5);
  const vector2 = new Vector3(0, 2, 4);
  expect(Vector3.distance(vector1, vector2)).toBeCloseTo(Math.sqrt(6));
});

test('Vector Copy', async () => {
  const vector1 = new Vector3(1, 0, 5);
  const vector2 = new Vector3(0, 2, 4);
  vector1.copy(vector2);
  expectVectorEqual(vector1, vector2);
});

test('Vector Equal', async () => {
  const vector1 = new Vector3(1, 0, 5);
  const vector1VeryClose = new Vector3(0.99999999999, 0.00000000001, 4.9999999999);
  const vector1Close = new Vector3(1.01, 0.01, 4.99);
  const vector2 = new Vector3(0, 2, 4);
  expect(vector1.isEqual(vector2)).toBe(false);
  expect(vector1.isEqual(vector1)).toBe(true);
  expect(vector1.isEqual(vector1VeryClose)).toBe(true);
  expect(vector1.isEqual(vector1Close)).toBe(false);
  expect(vector1.isEqual(vector1Close, 0.02)).toBe(true);
  expect(vector1.isEqual(new Vector3(1.1, 0, 5))).toBe(false);
  expect(vector1.isEqual(new Vector3(1, 0.1, 5))).toBe(false);
  expect(vector1.isEqual(new Vector3(1, 0, 5.1))).toBe(false);
});

test('Vector Mul', async () => {
  const vector1 = new Vector3(1, 0, 5);
  const vector2 = new Vector3(0, 2, 4);
  const crossProduct = Vector3.cross(vector1, vector2);
  vector1.mul(vector2);
  expectVectorEqual(vector1, crossProduct);
});

test('Vector Orthogonal', async () => {
  const testVectorOrthonal = (v: Vector3) => {
    const orthogonal = Vector3.orthogonal(v);
    expect(Vector3.dot(v, orthogonal)).toBe(0);
  };

  testVectorOrthonal(new Vector3(1, 0, 5));
  testVectorOrthonal(new Vector3(0, 0, 5));
  testVectorOrthonal(new Vector3(1, 2, 4));
  testVectorOrthonal(new Vector3(6, -6, -5));
  testVectorOrthonal(new Vector3(7, 2, 1));
  testVectorOrthonal(new Vector3(2, 4, -5));
  testVectorOrthonal(new Vector3(5, -4, -3));
  testVectorOrthonal(new Vector3(3, 5, 4));
  testVectorOrthonal(new Vector3(-4, -5, 3));
  testVectorOrthonal(new Vector3(-5, 3, 7));
});

test('Vector to String', async () => {
  expect(new Vector3(1, 2, 3).toString()).toBe(`Vector3(1,2,3)`);
  expect(new Vector3(0.1, -2, -0.3).toString()).toBe(`Vector3(0.1,-2,-0.3)`);
});
