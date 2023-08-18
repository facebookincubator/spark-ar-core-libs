/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 * cd tests
 * yarn install
 * yarn test
 */

import {expect, describe, it} from '@jest/globals';
import {V2Readonly} from '../../src/spark.procedural-animations.math-2d';
import {Math3D, V3, V3Readonly} from '../../src/spark.procedural-animations.math-3d';

describe('finding point inside a polygon', () => {
  it('can find points inside a polygon for 2D', () => {
    const polygon = [
      new V2Readonly(-0.08205, -0.47122),
      new V2Readonly(-0.18262, -0.25718),
      new V2Readonly(0, 0),
      new V2Readonly(0.26364, -0.14852),
      new V2Readonly(0.20163, -0.32423),
      new V2Readonly(0.1191, -0.19787),
      new V2Readonly(-0.02433, -0.25718),
    ];

    const mustBeInside = [
      new V2Readonly(-0.06209, -0.28975),
      new V2Readonly(0.20466, -0.25296),
      new V2Readonly(0.00459, -0.04829),
    ];

    const mustBeOutside = [
      new V2Readonly(-0.0115, -0.28975),
      new V2Readonly(0.15407, -0.28975),
      new V2Readonly(0.04828, 0),
      new V2Readonly(100, 100),
      new V2Readonly(-100, -100),
      new V2Readonly(100, -100),
    ];

    for (const point of mustBeInside) {
      const result = Math3D.isPointWithinPolygon(point, polygon);
      expect(result).toBe(true);
    }
    for (const point of mustBeOutside) {
      const result = Math3D.isPointWithinPolygon(point, polygon);
      expect(result).toBe(false);
    }
  });

  it('can find points inside a polygon for 3D ignoring Y', () => {
    const polygon = [
      new V3Readonly(-0.08205, 0, -0.47122),
      new V3Readonly(-0.18262, 100, -0.25718),
      new V3Readonly(0, 0, 0),
      new V3Readonly(0.26364, -1, -0.14852),
      new V3Readonly(0.20163, 2, -0.32423),
      new V3Readonly(0.1191, 5, -0.19787),
      new V3Readonly(-0.02433, 1000, -0.25718),
    ];

    const mustBeInside = [
      new V3Readonly(-0.06209, 0, -0.28975),
      new V3Readonly(0.20466, 0, -0.25296),
      new V3Readonly(0.00459, 0, -0.04829),
    ];

    const mustBeOutside = [
      new V3Readonly(-0.0115, 0, -0.28975),
      new V3Readonly(0.15407, 100, -0.28975),
      new V3Readonly(0.04828, 11, 0),
      new V3Readonly(100, -100, 100),
      new V3Readonly(-100, 0, -100),
      new V3Readonly(100, 0, -100),
    ];

    for (const point of mustBeInside) {
      const result = Math3D.isPointWithinPolygonIgnoreY(point, polygon);
      expect(result).toBe(true);
    }
    for (const point of mustBeOutside) {
      const result = Math3D.isPointWithinPolygonIgnoreY(point, polygon);
      expect(result).toBe(false);
    }
  });
});

describe('converting between 2D and 3D points', () => {
  it('should convert 3D point to expected 2D point case 1', () => {
    const p3 = new V3Readonly(1, 2, 3);

    const p2 = Math3D.convertV3ToV2(p3, V3.lt, V3.fw);
    expect(p2.x).toBe(1);
    expect(p2.y).toBe(3);
  });

  it('should convert 3D point to expected 2D point case 2', () => {
    const p3 = new V3Readonly(1, 2, 3);

    const p2 = Math3D.convertV3ToV2(p3, V3.fw, V3.rt);
    expect(p2.x).toBe(3);
    expect(p2.y).toBe(-1);
  });

  it('should convert 2D point to expected 3D point case 1', () => {
    const p2 = new V2Readonly(1, 3);

    const p3 = Math3D.convertV2ToV3(p2, V3.lt, V3.fw);
    expect(p3.x).toBe(1);
    expect(p3.y).toBe(0);
    expect(p3.z).toBe(3);
  });

  it('should convert 2D point to expected 3D point case 1', () => {
    const p2 = new V2Readonly(3, -1);

    const p3 = Math3D.convertV2ToV3(p2, V3.fw, V3.rt);
    expect(p3.x).toBe(1);
    expect(p3.y).toBe(0);
    expect(p3.z).toBe(3);
  });
});
