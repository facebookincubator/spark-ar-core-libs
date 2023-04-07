/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {Quaternion} from './MathQuaternion';
import {Vector3} from './MathVectors';

export class Lerp {
  public static number(from: number, to: number, t: number): number {
    return from + (to - from) * t;
  }

  public static vector(from: Vector3, to: Vector3, t: number): Vector3 {
    return new Vector3(
      Lerp.number(from.x, to.x, t),
      Lerp.number(from.y, to.y, t),
      Lerp.number(from.z, to.z, t),
    );
  }

  public static quaternion(from: Quaternion, to: Quaternion, t: number): Quaternion {
    return new Quaternion(
      Lerp.number(from.x, to.x, t),
      Lerp.number(from.y, to.y, t),
      Lerp.number(from.z, to.z, t),
      Lerp.number(from.w, to.w, t),
    );
  }
}

export class Slerp {
  public static quaternion(from: Quaternion, to: Quaternion, t: number): Quaternion {
    if (t == 0) {
      return from.clone();
    } else if (t == 1) {
      return to.clone();
    } else if (from.isEqual(to)) {
      return from.clone();
    }

    const epsilon = 0.000001;

    let cosOmega = from.x * to.x + from.y * to.y + from.z * to.z + from.w * to.w;

    let flip = false;
    if (cosOmega < 0.0) {
      flip = true;
      cosOmega = -cosOmega;
    }

    let s1 = 0.0;
    let s2 = 0.0;

    if (cosOmega > 1.0 - epsilon) {
      // too close, do straight linear interpolation.
      s1 = 1.0 - t;
      s2 = flip ? -t : t;
    } else {
      const omega = Math.acos(cosOmega);
      const invSinOmega = 1 / Math.sin(omega);

      s1 = Math.sin((1.0 - t) * omega) * invSinOmega;
      s2 = flip ? -Math.sin(t * omega) * invSinOmega : Math.sin(t * omega) * invSinOmega;
    }

    const qx = s1 * from.x + s2 * to.x;
    const qy = s1 * from.y + s2 * to.y;
    const qz = s1 * from.z + s2 * to.z;
    const qw = s1 * from.w + s2 * to.w;
    return new Quaternion(qx, qy, qz, qw);
  }
}
