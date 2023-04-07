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
import {Vector3} from './../src/MathVectors';
import {expectQuaternionEqual, expectVectorEqual} from './EqualityUtils';

test('Default', async () => {
  expectQuaternionEqual(Quaternion.identity, new Quaternion(0, 0, 0, 1));
});

test('Create from Angle and Axis', async () => {
  expectQuaternionEqual(
    Quaternion.createFromAngleAndAxis(0, new Vector3(0, 0, 0)),
    new Quaternion(0, 0, 0, 1),
  );

  expectQuaternionEqual(
    Quaternion.createFromAngleAndAxis((2 * Math.PI) / 3, new Vector3(1, 1, 1)),
    new Quaternion(0.5, 0.5, 0.5, 0.5),
  );

  const inverseRoot2 = 1 / Math.sqrt(2);
  expectQuaternionEqual(
    Quaternion.createFromAngleAndAxis(Math.PI / 2, new Vector3(1, 0, 0)),
    new Quaternion(inverseRoot2, 0, 0, inverseRoot2),
  );

  expectQuaternionEqual(
    Quaternion.createFromAngleAndAxis(Math.PI / 2, new Vector3(0, 1, 0)),
    new Quaternion(0, inverseRoot2, 0, inverseRoot2),
  );

  expectQuaternionEqual(
    Quaternion.createFromAngleAndAxis(Math.PI / 2, new Vector3(0, 0, 1)),
    new Quaternion(0, 0, inverseRoot2, inverseRoot2),
  );

  expectQuaternionEqual(
    Quaternion.createFromAngleAndAxis(20, new Vector3(10, 20, 40)),
    new Quaternion(-0.1187151, -0.2374303, -0.4748606, -0.8390715),
    0.00001,
  );

  expectQuaternionEqual(
    Quaternion.createFromAngleAndAxis(Math.PI, new Vector3(1, 2, 3)),
    new Quaternion(0.2672612, 0.5345225, 0.8017837, 0),
    0.00001,
  );
});

test('Create from Euler Angles', async () => {
  expectQuaternionEqual(
    Quaternion.createFromEulerAngles(Math.PI / 2, 0, 0),
    new Quaternion(0.7071068, 0, 0, 0.7071068),
    0.00001,
  );

  expectQuaternionEqual(
    Quaternion.createFromEulerAngles(0, Math.PI / 2, 0),
    new Quaternion(0, 0.7071068, 0, 0.7071068),
    0.00001,
  );

  expectQuaternionEqual(
    Quaternion.createFromEulerAngles(0, 0, Math.PI / 2),
    new Quaternion(0, 0, 0.7071068, 0.7071068),
    0.00001,
  );

  expectQuaternionEqual(
    Quaternion.createFromEulerAngles(Math.PI / 2, Math.PI / 2, 0),
    new Quaternion(0.5, 0.5, -0.5, 0.5),
    0.00001,
  );

  expectQuaternionEqual(
    Quaternion.createFromEulerAngles(Math.PI / 2, Math.PI / 3, Math.PI / 4),
    new Quaternion(0.43046, 0.56098, -0.09229, 0.70105),
    0.0001,
  );

  expectQuaternionEqual(
    Quaternion.createFromEulerAngles(-1, 3, 6),
    new Quaternion(-0.08996, -0.87141, -0.46468, -0.12895),
    0.0001,
  );
});

test('Create Between Vectors', async () => {
  const testQuaternionBetweenVector = (start: Vector3, destination: Vector3) => {
    const deltaQuaternion = Quaternion.createBetweenVectors(start, destination);
    expectVectorEqual(
      deltaQuaternion.rotateVector(start).normalize(),
      destination.normalize(),
      0.00001,
    );
  };

  expectQuaternionEqual(
    Quaternion.createBetweenVectors(new Vector3(1, 0, 0), new Vector3(0, 1, 0)),
    new Quaternion(0, 0, 0.7071068, 0.7071068),
    0.00001,
  );

  expectQuaternionEqual(
    Quaternion.createBetweenVectors(new Vector3(1, 0, 0), new Vector3(1, 0, 0)),
    Quaternion.identity,
    0.00001,
  );

  expectQuaternionEqual(
    Quaternion.createBetweenVectors(new Vector3(1, 0, 0), new Vector3(-1, 0, 0)),
    new Quaternion(0, -1, 0, 0),
    0.00001,
  );

  testQuaternionBetweenVector(new Vector3(1, 2, 3), new Vector3(-1, -2, -3));
  testQuaternionBetweenVector(new Vector3(1, 2, 3), new Vector3(-2, 4, 2));
  testQuaternionBetweenVector(new Vector3(0, 0, 1), new Vector3(1, 7, 2));
});

test('Quaternion Magnitude and Squared Magnitude', async () => {
  expect(new Quaternion(1, 1, 1, 1).magnitude).toBeCloseTo(2);
  expect(new Quaternion(1, 1, 1, 1).squaredMagnitude).toBeCloseTo(4);

  expect(new Quaternion(2, 3, 4, 1).magnitude).toBeCloseTo(Math.sqrt(30));
  expect(new Quaternion(2, 3, 4, 1).squaredMagnitude).toBeCloseTo(30);

  expect(new Quaternion(0, 1, 1, 1).magnitude).toBeCloseTo(Math.sqrt(3));
  expect(new Quaternion(0, 1, 1, 1).squaredMagnitude).toBeCloseTo(3);

  expect(new Quaternion(0, 0, 1, 1).magnitude).toBeCloseTo(Math.sqrt(2));
  expect(new Quaternion(0, 0, 1, 1).squaredMagnitude).toBeCloseTo(2);

  expect(new Quaternion(0, 0, 0, 1).magnitude).toBeCloseTo(1);
  expect(new Quaternion(0, 0, 0, 1).squaredMagnitude).toBeCloseTo(1);

  expect(new Quaternion(0, 0, 0, 0).magnitude).toBeCloseTo(0);
  expect(new Quaternion(0, 0, 0, 0).squaredMagnitude).toBeCloseTo(0);
});

test('Quaternion Normalize', async () => {
  expectQuaternionEqual(
    new Quaternion(2, 3, 4, 1).normalize(),
    new Quaternion(2 / Math.sqrt(30), 3 / Math.sqrt(30), 4 / Math.sqrt(30), 1 / Math.sqrt(30)),
    0.00001,
  );
  expectQuaternionEqual(
    new Quaternion(0, 0, 0, 0).normalize(),
    new Quaternion(0, 0, 0, 1),
    0.00001,
  );
});

test('Inverse', async () => {
  expectQuaternionEqual(new Quaternion(1, 0, 0, 1).inverse(), new Quaternion(-1 / 2, 0, 0, 1 / 2));

  const vector = new Quaternion(2, 3, 4, 1);
  expectQuaternionEqual(vector.inverse(), new Quaternion(-2 / 30, -3 / 30, -4 / 30, 1 / 30));
  expectQuaternionEqual(vector, new Quaternion(-2 / 30, -3 / 30, -4 / 30, 1 / 30));

  expectQuaternionEqual(new Quaternion(0, 0, 0, 0).inverse(), new Quaternion(0, 0, 0, 0), 0.00001);
});

test('Conjugate', async () => {
  expectQuaternionEqual(new Quaternion(1, 0, 0, 1).conjugate(), new Quaternion(-1, 0, 0, 1));

  const vector = new Quaternion(2, 3, 4, 1);
  expectQuaternionEqual(vector.conjugate(), new Quaternion(-2, -3, -4, 1));
  expectQuaternionEqual(vector, new Quaternion(-2, -3, -4, 1));
});

test('Quaternion Multiplication', async () => {
  expectQuaternionEqual(
    Quaternion.product(
      new Quaternion(-0.14077, -0.98751, 0.00998, -0.07003),
      new Quaternion(-0.4794255, 0, 0, 0.8775826),
    ),
    new Quaternion(-0.08996, -0.87141, -0.46468, -0.12895),
    0.0001,
  );

  expectQuaternionEqual(
    Quaternion.product(
      new Quaternion(-0.08996, -0.87141, -0.46468, -0.12895),
      new Quaternion(-0.4794255, 3.34021, 4.42141, 0.8775826),
    ),
    new Quaternion(-2.31786, -0.57492, -1.6962, 4.80894),
    0.0001,
  );

  expectQuaternionEqual(
    Quaternion.product(
      new Quaternion(0, 0, 0, 1),
      new Quaternion(-0.4794255, 3.34021, 4.42141, 0.8775826),
    ),
    new Quaternion(-0.4794255, 3.34021, 4.42141, 0.8775826),
    0.0001,
  );

  const vector = new Quaternion(-0.08996, -0.87141, -0.46468, -0.12895);
  expectQuaternionEqual(
    vector.mul(new Quaternion(-0.4794255, 3.34021, 4.42141, 0.8775826)),
    new Quaternion(-2.31786, -0.57492, -1.6962, 4.80894),
    0.0001,
  );
  expectQuaternionEqual(vector, new Quaternion(-2.31786, -0.57492, -1.6962, 4.80894), 0.0001);
});

test('To Euler Angles', async () => {
  expectVectorEqual(
    Quaternion.createFromEulerAngles(1, 0, 0).toEulerAngles(),
    new Vector3(1, 0, 0),
  );
  expectVectorEqual(
    Quaternion.createFromEulerAngles(0, 1, 0).toEulerAngles(),
    new Vector3(0, 1, 0),
  );
  expectVectorEqual(
    Quaternion.createFromEulerAngles(0, 0, 1).toEulerAngles(),
    new Vector3(0, 0, 1),
  );
  expectVectorEqual(
    Quaternion.createFromEulerAngles(Math.PI / 2, Math.PI / 3, 0).toEulerAngles(),
    new Vector3(Math.PI / 2, Math.PI / 3, 0),
  );
  expectVectorEqual(
    Quaternion.createFromEulerAngles(Math.PI / 2, Math.PI / 3, Math.PI / 4).toEulerAngles(),
    new Vector3(Math.PI / 2, Math.PI / 3, Math.PI / 4),
  );
  expectVectorEqual(
    Quaternion.createFromEulerAngles((2 * Math.PI) / 3, Math.PI / 3, Math.PI / 4).toEulerAngles(),
    new Vector3((2 * Math.PI) / 3, Math.PI / 3, Math.PI / 4),
  );
  expectVectorEqual(
    Quaternion.createFromEulerAngles((2 * Math.PI) / 3, Math.PI / 3, 3).toEulerAngles(),
    new Vector3((2 * Math.PI) / 3, Math.PI / 3, 3),
  );
  expectVectorEqual(
    Quaternion.createFromEulerAngles(1, 0.5, 3).toEulerAngles(),
    new Vector3(1, 0.5, 3),
  );
  expectVectorEqual(
    Quaternion.createFromEulerAngles(0, Math.PI / 2, 0).toEulerAngles(),
    new Vector3(0, Math.PI / 2, 0),
  );
  expectVectorEqual(
    Quaternion.createFromEulerAngles(0, -Math.PI / 2, 0).toEulerAngles(),
    new Vector3(0, -Math.PI / 2, 0),
  );
  expectVectorEqual(
    Quaternion.createFromEulerAngles(0, 0, Math.PI / 4)
      .mul(Quaternion.createFromEulerAngles(0, Math.PI / 3, 0))
      .mul(Quaternion.createFromEulerAngles(Math.PI / 2, 0, 0))
      .toEulerAngles(),
    new Vector3(Math.PI / 2, Math.PI / 3, Math.PI / 4),
  );
  expectVectorEqual(
    Quaternion.createFromEulerAngles(-2.1415, 1.14159, -0.1415).toEulerAngles(),
    new Vector3(-2.1415, 1.14159, -0.1415),
  );

  expectQuaternionEqual(
    Quaternion.createFromEulerAngles(0, 0, 3)
      .mul(Quaternion.createFromEulerAngles(0, 2, 0))
      .mul(Quaternion.createFromEulerAngles(1, 0, 0)),
    Quaternion.createFromEulerAngles(1, 2, 3),
  );
  // NOTE: This is because there are the 2 representations of this angle
  expectVectorEqual(
    Quaternion.createFromEulerAngles(1, 2, 3).toEulerAngles(),
    new Vector3(-2.1415, 1.14159, -0.1415),
    0.0001,
  );
});

test('Copy', async () => {
  const quaternion1 = new Quaternion(1, 0, 5, 2);
  const quaternion2 = new Quaternion(0, 2, 4, 5);
  quaternion1.copy(quaternion2);
  expectQuaternionEqual(quaternion1, quaternion2);
});

test('Equal', async () => {
  const quaternion1 = new Quaternion(1, 0, 5, 0.2);
  const quaternion1VeryClose = new Quaternion(
    0.99999999999,
    0.00000000001,
    4.9999999999,
    0.199999999,
  );
  const quaternion1Close = new Quaternion(1.01, 0.01, 4.99, 0.21);
  const quaternion2 = new Quaternion(0, 2, 4, 1);
  expect(quaternion1.isEqual(quaternion2)).toBe(false);
  expect(quaternion1.isEqual(quaternion1)).toBe(true);
  expect(quaternion1.isEqual(quaternion1VeryClose)).toBe(true);
  expect(quaternion1.isEqual(quaternion1Close)).toBe(false);
  expect(quaternion1.isEqual(quaternion1Close, 0.02)).toBe(true);
  expect(quaternion1.isEqual(new Quaternion(1, 0, 5, 0.21))).toBe(false);
  expect(quaternion1.isEqual(new Quaternion(1.1, 0, 5, 0.2))).toBe(false);
  expect(quaternion1.isEqual(new Quaternion(1, 0.1, 5, 0.2))).toBe(false);
  expect(quaternion1.isEqual(new Quaternion(1, 0, 5.1, 0.2))).toBe(false);
});

test('toString', async () => {
  expect(new Quaternion(1, 2, 3, 0.2).toString()).toBe(`Quaternion(1,2,3,0.2)`);
  expect(new Quaternion(0.1, -2, -0.3, 1).toString()).toBe(`Quaternion(0.1,-2,-0.3,1)`);
});
