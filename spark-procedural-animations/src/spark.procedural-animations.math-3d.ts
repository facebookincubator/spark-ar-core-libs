/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/**
 * Spark Procedural Animations - 3D math, V3 - vector3, Qt - quaternion
 * version 0.9.4
 */

import {
  clamp,
  Deg2Rad,
  interpolate,
  isNumEqual,
  min,
  Rad2Deg,
} from './spark.procedural-animations.core';
import {IV2Readonly, V2} from './spark.procedural-animations.math-2d';
import {objPool, PoolObjType} from './spark.procedural-animations.pool';

/**
 * Object that represents orientation in 3D space
 */
export interface IObjViewOrientation {
  /**
   * forward direction - unit vector
   */
  fw: IV3Readonly;
  /**
   * back direction - unit vector
   */
  bk: IV3Readonly;
  /**
   * right direction - unit vector
   */
  rt: IV3Readonly;
  /**
   * left direction - unit vector
   */
  lt: IV3Readonly;
  /**
   * up direction - unit vector
   */
  up: IV3Readonly;
  /**
   * down direction - unit vector
   */
  dn: IV3Readonly;
}
/**
 * Container for x,y,z,w subscriptions
 */
export class SubXYZW {
  x: Subscription;
  y: Subscription;
  z: Subscription;
  w: Subscription;
  unsubscribe(): void {
    if (this.x) this.x.unsubscribe();
    if (this.y) this.y.unsubscribe();
    if (this.z) this.z.unsubscribe();
    if (this.w) this.w.unsubscribe();
  }
}
/**
 * Spherical linear interpolation from one rotation to another
 */
export function rotate(from: IQtReadonly, to: IQtReadonly, t: number): Qt {
  return from.rotateTo(to, t);
}
/**
 * Spherical linear interpolation from one unit vector to another
 */
export function rotateV3(from: IV3Readonly, to: IV3Readonly, t: number): V3 {
  return from.rotTo01(to, t);
}
/**
 * Moving average V3
 * @param lastAverage - last average value
 * @param current - current value
 * @param count - number of samples to average
 * @returns average
 */
export function movAvgV3(lastAverage: V3, current: V3, count: number): V3 {
  if (count <= 1 || !lastAverage) return current;
  //return (lastAverage * (count - 1) + current) / count;
  return V3.create(
    (lastAverage.x * (count - 1) + current.x) / count,
    (lastAverage.y * (count - 1) + current.y) / count,
    (lastAverage.z * (count - 1) + current.z) / count,
  );
}
/**
 * Linear interpolation from one unit vector to another
 */
export function move(from: IV3Readonly, to: IV3Readonly, t: number): V3 {
  return V3.create(
    interpolate(from.x, to.x, t),
    interpolate(from.y, to.y, t),
    interpolate(from.z, to.z, t),
  );
}
function lookAtByVectors(lt: IV3Readonly, up: IV3Readonly, fw: IV3Readonly): Qt {
  const m11 = lt.x;
  const m12 = lt.y;
  const m13 = lt.z;
  const m21 = up.x;
  const m22 = up.y;
  const m23 = up.z;
  const m31 = fw.x;
  const m32 = fw.y;
  const m33 = fw.z;
  const trace = m11 + m22 + m33;
  const q = Qt.create();
  if (trace > 0.0) {
    let s = Math.sqrt(trace + 1.0);
    q.w = s * 0.5;
    s = 0.5 / s;
    q.x = (m23 - m32) * s;
    q.y = (m31 - m13) * s;
    q.z = (m12 - m21) * s;
  } else {
    if (m11 >= m22 && m11 >= m33) {
      const s = Math.sqrt(1.0 + m11 - m22 - m33);
      const invS = 0.5 / s;
      q.x = 0.5 * s;
      q.y = (m12 + m21) * invS;
      q.z = (m13 + m31) * invS;
      q.w = (m23 - m32) * invS;
    } else if (m22 > m33) {
      const s = Math.sqrt(1.0 + m22 - m11 - m33);
      const invS = 0.5 / s;
      q.x = (m21 + m12) * invS;
      q.y = 0.5 * s;
      q.z = (m32 + m23) * invS;
      q.w = (m31 - m13) * invS;
    } else {
      const s = Math.sqrt(1.0 + m33 - m11 - m22);
      const invS = 0.5 / s;
      q.x = (m31 + m13) * invS;
      q.y = (m32 + m23) * invS;
      q.z = 0.5 * s;
      q.w = (m12 - m21) * invS;
    }
  }
  return q;
}
/**
 * interface that constructs quaternion from forward and up vectors
 */
export interface ILookAtFunc {
  (fw: IV3Readonly, up: IV3Readonly): Qt;
}
/**
 * Creating quaternion from forward and up vectors
 * @param fw - forward vector
 * @param up - up vector
 * @returns rotation as quaternion
 */
export function lookAt(fw: IV3Readonly, up: IV3Readonly): Qt {
  return lookAt_fw_up(fw, up);
}
/**
 * Creating quaternion from forward and up vectors
 * @param fw - forward vector
 * @param up - up vector
 * @returns rotation as quaternion
 */
export function lookAt_fw_up(fw: IV3Readonly, up: IV3Readonly): Qt {
  fw = fw.ensureNormalized;
  up = up.ensureNormalized;
  const lt = up.cross(fw).ensureNormalized;
  up = fw.cross(lt).ensureNormalized;
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from up and left vectors
 * @param up - up vector
 * @param lt - left vector
 * @returns rotation as quaternion
 */
export function lookAt_up_lt(up: IV3Readonly, lt: IV3Readonly): Qt {
  up = up.ensureNormalized;
  lt = lt.ensureNormalized;
  const bk = up.cross(lt).ensureNormalized;
  lt = bk.cross(up).ensureNormalized; // correct lt
  const fw = bk.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from forward and left vectors
 * @param fw - forward vector
 * @param lt - left vector
 * @returns rotation as quaternion
 */
export function lookAt_fw_lt(fw: IV3Readonly, lt: IV3Readonly): Qt {
  fw = fw.ensureNormalized;
  lt = lt.ensureNormalized;
  const up = fw.cross(lt).ensureNormalized;
  lt = up.cross(fw).ensureNormalized; // correct lt
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from forward and right vectors
 * @param fw - forward vector
 * @param rt - right vector
 * @returns rotation as quaternion
 */
export function lookAt_fw_rt(fw: IV3Readonly, rt: IV3Readonly): Qt {
  fw = fw.ensureNormalized;
  rt = rt.ensureNormalized;
  const up = rt.cross(fw).ensureNormalized;
  rt = fw.cross(up).ensureNormalized; // correct rt
  const lt = rt.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from forward and down vectors
 * @param fw - forward vector
 * @param dn - down vector
 * @returns rotation as quaternion
 */
export function lookAt_fw_dn(fw: IV3Readonly, dn: IV3Readonly): Qt {
  fw = fw.ensureNormalized;
  dn = dn.ensureNormalized;
  const lt = fw.cross(dn).ensureNormalized;
  dn = lt.cross(fw).ensureNormalized; // correct dn
  const up = dn.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from back and left vectors
 * @param bk - back vector
 * @param lt - left vector
 * @returns rotation as quaternion
 */
export function lookAt_bk_lt(bk: IV3Readonly, lt: IV3Readonly): Qt {
  bk = bk.ensureNormalized;
  lt = lt.ensureNormalized;
  const up = lt.cross(bk).ensureNormalized;
  lt = bk.cross(up).ensureNormalized; // correct lt
  const fw = bk.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from back and right vectors
 * @param bk - back vector
 * @param rt - right vector
 * @returns rotation as quaternion
 */
export function lookAt_bk_rt(bk: IV3Readonly, rt: IV3Readonly): Qt {
  bk = bk.ensureNormalized;
  rt = rt.ensureNormalized;
  const up = bk.cross(rt).ensureNormalized;
  rt = up.cross(bk).ensureNormalized; // correct rt
  const fw = bk.mulBy(-1);
  const lt = rt.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from back and up vectors
 * @param bk - back vector
 * @param up - up vector
 * @returns rotation as quaternion
 */
export function lookAt_bk_up(bk: IV3Readonly, up: IV3Readonly): Qt {
  bk = bk.ensureNormalized;
  up = up.ensureNormalized;
  const lt = bk.cross(up).ensureNormalized;
  up = lt.cross(bk).ensureNormalized; // correct up
  const fw = bk.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from back and down vectors
 * @param bk - back vector
 * @param dn - down vector
 * @returns rotation as quaternion
 */
export function lookAt_bk_dn(bk: IV3Readonly, dn: IV3Readonly): Qt {
  bk = bk.ensureNormalized;
  dn = dn.ensureNormalized;
  const lt = dn.cross(bk).ensureNormalized;
  dn = bk.cross(lt).ensureNormalized; // correct dn
  const up = dn.mulBy(-1);
  const fw = bk.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from left and forward vectors
 * @param lt - left vector
 * @param fw - forward vector
 * @returns rotation as quaternion
 */
export function lookAt_lt_fw(lt: IV3Readonly, fw: IV3Readonly): Qt {
  lt = lt.ensureNormalized;
  fw = fw.ensureNormalized;
  const up = fw.cross(lt).ensureNormalized;
  fw = lt.cross(up).ensureNormalized; // correct fw
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from left and back vectors
 * @param lt - left vector
 * @param bk - back vector
 * @returns rotation as quaternion
 */
export function lookAt_lt_bk(lt: IV3Readonly, bk: IV3Readonly): Qt {
  lt = lt.ensureNormalized;
  bk = bk.ensureNormalized;
  const up = lt.cross(bk).ensureNormalized;
  bk = up.cross(lt).ensureNormalized; // correct bk
  const fw = bk.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from left and up vectors
 * @param lt - left vector
 * @param up - up vector
 * @returns rotation as quaternion
 */
export function lookAt_lt_up(lt: IV3Readonly, up: IV3Readonly): Qt {
  lt = lt.ensureNormalized;
  up = up.ensureNormalized;
  const fw = lt.cross(up).ensureNormalized;
  up = fw.cross(lt).ensureNormalized; // correct up
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from left and down vectors
 * @param lt - left vector
 * @param dn - down vector
 * @returns rotation as quaternion
 */
export function lookAt_lt_dn(lt: IV3Readonly, dn: IV3Readonly): Qt {
  lt = lt.ensureNormalized;
  dn = dn.ensureNormalized;
  const fw = dn.cross(lt).ensureNormalized;
  dn = lt.cross(fw).ensureNormalized; // correct dn
  const up = dn.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from left and down vectors
 * @param rt - right vector
 * @param fw - forward vector
 * @returns rotation as quaternion
 */
export function lookAt_rt_fw(rt: IV3Readonly, fw: IV3Readonly): Qt {
  rt = rt.ensureNormalized;
  fw = fw.ensureNormalized;
  const up = rt.cross(fw).ensureNormalized;
  fw = up.cross(rt).ensureNormalized; // correct fw
  const lt = rt.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from right and back vectors
 * @param rt - right vector
 * @param bk - back vector
 * @returns rotation as quaternion
 */
export function lookAt_rt_bk(rt: IV3Readonly, bk: IV3Readonly): Qt {
  rt = rt.ensureNormalized;
  bk = bk.ensureNormalized;
  const up = bk.cross(rt).ensureNormalized;
  bk = rt.cross(up).ensureNormalized; // correct bk
  const lt = rt.mulBy(-1);
  const fw = bk.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from right and up vectors
 * @param rt - right vector
 * @param up - up vector
 * @returns rotation as quaternion
 */
export function lookAt_rt_up(rt: IV3Readonly, up: IV3Readonly): Qt {
  rt = rt.ensureNormalized;
  up = up.ensureNormalized;
  const fw = up.cross(rt).ensureNormalized;
  up = rt.cross(fw).ensureNormalized; // correct up
  const lt = rt.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from right and down vectors
 * @param rt - right vector
 * @param dn - down vector
 * @returns rotation as quaternion
 */
export function lookAt_rt_dn(rt: IV3Readonly, dn: IV3Readonly): Qt {
  rt = rt.ensureNormalized;
  dn = dn.ensureNormalized;
  const fw = rt.cross(dn).ensureNormalized;
  dn = fw.cross(rt).ensureNormalized; // correct dn
  const lt = rt.mulBy(-1);
  const up = dn.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from up and forward vectors
 * @param up - up vector
 * @param fw - forward vector
 * @returns rotation as quaternion
 */
export function lookAt_up_fw(up: IV3Readonly, fw: IV3Readonly): Qt {
  up = up.ensureNormalized;
  fw = fw.ensureNormalized;
  const lt = up.cross(fw).ensureNormalized;
  fw = lt.cross(up).ensureNormalized; // correct fw
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from up and back vectors
 * @param up - up vector
 * @param bk - back vector
 * @returns rotation as quaternion
 */
export function lookAt_up_bk(up: IV3Readonly, bk: IV3Readonly): Qt {
  up = up.ensureNormalized;
  bk = bk.ensureNormalized;
  const lt = bk.cross(up).ensureNormalized;
  bk = up.cross(lt); // correct bk
  const fw = bk.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from up and right vectors
 * @param up - up vector
 * @param rt - right vector
 * @returns rotation as quaternion
 */
export function lookAt_up_rt(up: IV3Readonly, rt: IV3Readonly): Qt {
  up = up.ensureNormalized;
  rt = rt.ensureNormalized;
  const fw = up.cross(rt).ensureNormalized;
  rt = fw.cross(up).ensureNormalized; // correct rt
  const lt = rt.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from down and forward vectors
 * @param dn - down vector
 * @param fw - forward vector
 * @returns rotation as quaternion
 */
export function lookAt_dn_fw(dn: IV3Readonly, fw: IV3Readonly): Qt {
  dn = dn.ensureNormalized;
  fw = fw.ensureNormalized;
  const lt = fw.cross(dn).ensureNormalized;
  fw = dn.cross(lt).ensureNormalized; // correct fw
  const up = dn.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from down and back vectors
 * @param dn - down vector
 * @param bk - back vector
 * @returns rotation as quaternion
 */
export function lookAt_dn_bk(dn: IV3Readonly, bk: IV3Readonly): Qt {
  dn = dn.ensureNormalized;
  bk = bk.ensureNormalized;
  const lt = dn.cross(bk).ensureNormalized;
  bk = lt.cross(dn).ensureNormalized; // correct bk
  const up = dn.mulBy(-1);
  const fw = bk.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from down and left vectors
 * @param dn - down vector
 * @param lt - left vector
 * @returns rotation as quaternion
 */
export function lookAt_dn_lt(dn: IV3Readonly, lt: IV3Readonly): Qt {
  dn = dn.ensureNormalized;
  lt = lt.ensureNormalized;
  const fw = dn.cross(lt).ensureNormalized;
  lt = fw.cross(dn).ensureNormalized; // correct lt
  const up = dn.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creating quaternion from down and right vectors
 * @param dn - down vector
 * @param rt - right vector
 * @returns rotation as quaternion
 */
export function lookAt_dn_rt(dn: IV3Readonly, rt: IV3Readonly): Qt {
  dn = dn.ensureNormalized;
  rt = rt.ensureNormalized;
  const fw = rt.cross(dn).ensureNormalized;
  rt = dn.cross(fw).ensureNormalized; // correct rt
  const lt = rt.mulBy(-1);
  const up = dn.mulBy(-1);
  return lookAtByVectors(lt, up, fw);
}
/**
 * Creates euler rotation V3 from transform signal rotation
 * @param t - transform or transform signal
 * @returns rotation as euler
 */
export function transformEulerToV3(t: Transform | Mat4Signal): V3 {
  return V3.create(
    <number>t.rotationX.pinLastValue(),
    <number>t.rotationY.pinLastValue(),
    <number>t.rotationZ.pinLastValue(),
  );
}
/**
 * Creates position V3 from transform signal position
 * @param t - transform or transform signal
 * @returns position
 */
export function transformPositionToV3(t: Transform): V3 {
  return V3.create(
    <number>t.x.pinLastValue(),
    <number>t.y.pinLastValue(),
    <number>t.z.pinLastValue(),
  );
}
/**
 * Creates scale V3 from transform signal scale
 * @param t - transform or transform signal
 * @returns scale
 */
export function transformScaleToV3(t: Transform): V3 {
  return V3.create(
    <number>t.scaleX.pinLastValue(),
    <number>t.scaleY.pinLastValue(),
    <number>t.scaleZ.pinLastValue(),
  );
}
/**
 * Creates rotation Qt from transform signal rotation
 * @param t - transform or transform signal
 * @returns rotation
 */
export function transformRotationToQt(t: Transform): Qt {
  const r = t.rotation;
  const q = Qt.create(
    <number>r.x.pinLastValue(),
    <number>r.y.pinLastValue(),
    <number>r.z.pinLastValue(),
    <number>r.w.pinLastValue(),
  );
  if (q.x == 0 && q.y == 0 && q.z == 0 && q.w == 0) {
    return transformEulerToV3(t).toQt();
  }
  return q;
}

// V3 ------------------------- starts
export interface IV3Readonly {
  /**
   * Gets x value
   */
  get x(): number;
  /**
   * Gets y value
   */
  get y(): number;
  /**
   * Gets z value
   */
  get z(): number;
  /**
   * Creates new normalized unit vector, from the current vector
   */
  get normalized(): V3;
  /**
   * Creates new vector that points in the opposite direction (negated) and has the same magnitude
   */
  get negated(): V3;
  /**
   * If the vector is already normalized, returns the same vector otherwise creates a new normalized unit vector
   */
  get ensureNormalized(): IV3Readonly;
  /**
   * Creates new writable vector, if it is already writable returns reference to iself
   */
  get ensureWritable(): V3;
  /**
   * Creates new readonly vector, if it is already readonly returns reference to iself
   */
  get ensureReadonly(): V3Readonly;
  /**
   * Returns squared magnitude (squared length)
   */
  get sqrMagnitude(): number;
  /**
   * Returns vector magnitude (length)
   */
  get magnitude(): number;
  /**
   * Gets value by index, 0=x, 1=y, 2=z
   * @param index
   * @returns value
   */
  getByIndex(index: number): number;
  /**
   * Clones as writable
   */
  cloneAsWritable(): V3;
  /**
   * Clones as readonly
   */
  cloneAsReadonly(): IV3Readonly;
  /**
   * Returns new vector that represents movement of current vectr towards target vector
   * @param target - another vector
   * @param distance - distance to move in direction of target
   */
  moveTowards(to: IV3Readonly, distance: number): V3;
  /**
   * Returns new vector that represents movement of current vectr towards target vector without passing through other vector
   * @param to
   * @param distance
   */
  moveTowardsNoPass(to: IV3Readonly, distance: number): V3;
  /**
   * Cross product with another vector
   * @param rhs - another vector
   * @returns cross product
   */
  cross(rhs: IV3Readonly): V3;
  /**
   * Dot product with another vector
   * @param rhs - another vector
   * @returns dot product
   */
  dot(rhs: IV3Readonly): number;
  /**
   * Returns new vector that represents substraction of another vector from the current vector
   * @param v - another vector
   */
  sub(v: IV3Readonly): V3;
  /**
   * Returns new vector that represents addition of another vector to the current vector
   * @param v - another vector
   */
  add(v: IV3Readonly): V3;
  /**
   * Returns new vector that represents division of current vector by another vector
   * @param v - another vector
   */
  div(v: IV3Readonly): V3;
  /**
   * Returns new vector that represents division of current vector by numberic value
   * @param n - numberiic value to divide by
   */
  divBy(n: number): V3;
  /**
   * Returns new vector that represents multiplication of current vector by another vector
   * @param v - another vector
   */
  mul(v: IV3Readonly): V3;
  /**
   * Returns new vector that represents multiplication of current vector by numberic value
   * @param n - numberiic value to multiply by
   */
  mulBy(n: number): V3;
  /**
   * Returns new vector that represents multiplication of current vector by numberic value
   * @param n - numberiic value to multiply by
   * @param condition - boolean condition to check against
   */
  mulByIf(n: number, condition: boolean): V3;
  /**
   * Returns new vector that represents multiplication of current vector by numberic value
   * @param n - numberiic value to multiply by
   */
  by(n: number): V3;
  /**
   * Signed degrees angle to another vector
   * @param rhs - another vector
   * @param normal - normal vector
   * @returns degrees angle
   */
  degreesTo(rhs: IV3Readonly, normal: IV3Readonly): number;
  /**
   * Unsigned degrees angle to another vector
   * @param rhs - another vector
   * @returns degrees angle
   */
  unsignedDegreesTo(rhs: IV3Readonly): number;
  /**
   * Returns new vector that is ensured not to be longer than a given value
   * @param len - length limit
   */
  noLongerThan(len: number): V3;
  /**
   * Rotates vector by a given quaternion rotation
   * @param r - quaternion rotation
   * @returns rotated vector
   */
  rotate(r: IQtReadonly): V3;
  /**
   * Created rotation considering the current vector to be an axis of rotation
   * @param degrees - degrees to rotate
   * @returns quaternion rotation
   */
  axisDegRotation(degrees: number): Qt;
  /**
   * Returns new vector that represents horizontal direction (on the horizontal plane) to another vector
   * @param v - another vector
   * @returns normalized, unit vector direction to another vector placed on the horizontal plane
   */
  horzDirTo(v: IV3Readonly): V3;
  /**
   * Returns new vector that represents direction to another vector
   * @param v - another vector
   * @returns normalized, unit vector direction to another vector
   */
  dirTo(v: IV3Readonly): V3;
  /**
   * Distances to another vector
   * @param v - another vector
   * @returns distance
   */
  distanceTo(other: IV3Readonly): number;
  /**
   * Horizontal distances to another vector (ignoring Y)
   * @param v - another vector
   * @returns Horizontal distance
   */
  horzDistanceTo(other: IV3Readonly): number;
  /**
   * Creates quaternion from the current vector considering it to be representation of euler angles rotation
   * @param [convertDegreesToRadians] - if true, will convert degrees to radians, by default set to false
   * @returns quaternion rotation
   */
  toQt(convertDegreesToRadians: boolean): Qt;
  /**
   * Creates new vector from current vector that represents rotation of that vector around a specific axis
   * @param axis - axis to rotate around
   * @param degrees - degrees to rotate around
   */
  rotAboutAxis(axis: IV3Readonly, degrees: number): V3;
  /**
   * Creates new unit vector that represents rotation of the current vector towards the target vector
   * @param rhs - target vector
   * @param progress01 - progress for rotation from 0 to 1
   */
  rotTo01(rhs: IV3Readonly, progress01: number): V3;
  /**
   * Creates new point that represents movement of the current point towards target point
   * @param to - target point
   * @param progress01 - progress for movement from 0 to 1
   */
  moveTo(to: IV3Readonly, t01: number): V3;
  /**
   * Creates new vector that represents current vector with having it's length changed to the given value
   * @param length - new vector length
   */
  withLength(length: number): V3;
  /**
   * Creates new unit vector that represents rotation of the current vector towards the forward direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotFw(degrees: number, view?: IObjViewOrientation): V3;
  /**
   * Creates new unit vector that represents rotation of the current vector towards the back direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotBk(degrees: number, view?: IObjViewOrientation): V3;
  /**
   * Creates new unit vector that represents rotation of the current vector towards the left direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotLt(degrees: number, view?: IObjViewOrientation): V3;
  /**
   * Creates new unit vector that represents rotation of the current vector towards the right direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotRt(degrees: number, view?: IObjViewOrientation): V3;
  /**
   * Creates new unit vector that represents rotation of the current vector towards the up direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotUp(degrees: number, view?: IObjViewOrientation): V3;
  /**
   * Creates new unit vector that represents rotation of the current vector towards the down direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotDn(degrees: number, view?: IObjViewOrientation): V3;
  /**
   * Creates new unit vector that represents rotation of the current vector towards another unit vector
   * @param degrees - degrees to rotate
   */
  rotTo(targetDir: IV3Readonly, degrees: number): V3;
  /**
   * Creates new vector that represents movement of the current vector (addition) in the forward direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addFw(n: number, view?: IObjViewOrientation): V3;
  /**
   * Creates new vector that represents movement of the current vector (addition) in the back direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addBk(n: number, view?: IObjViewOrientation): V3;
  /**
   * Creates new vector that represents movement of the current vector (addition) in the left direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addLt(n: number, view?: IObjViewOrientation): V3;
  /**
   * Creates new vector that represents movement of the current vector (addition) in the right direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addRt(n: number, view?: IObjViewOrientation): V3;
  /**
   * Creates new vector that represents movement of the current vector (addition) in the up direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addUp(n: number, view?: IObjViewOrientation): V3;
  /**
   * Creates new vector that represents movement of the current vector (addition) in the down direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addDn(n: number, view?: IObjViewOrientation): V3;
  /**
   * Creates new vector that represents movement of the current vector (addition) in the X direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addX(n: number, view?: IObjViewOrientation): V3;
  /**
   * Creates new vector that represents movement of the current vector (addition) in the Y direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addY(n: number, view?: IObjViewOrientation): V3;
  /**
   * Creates new vector that represents movement of the current vector (addition) in the Z direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addZ(n: number, view?: IObjViewOrientation): V3;
  /**
   * Determines whether unit vector points in the same direction as other unit vector (less than 90 degrees)
   * @param otherDir - unit vector to compare against
   */
  isDirSameSideAs(otherDir: IV3Readonly): boolean;
  /**
   * Determines whether unit vector points in different direction as other unit vector (more than 90 degrees)
   * @param otherDir - unit vector to compare against
   */
  isDirNotSameSideAs(otherDir: IV3Readonly): boolean;
}
/**
 * readonly vector 3 object
 */
export class V3Readonly implements IV3Readonly {
  private readonly _x: number;
  private readonly _y: number;
  private readonly _z: number;
  constructor(x = 0, y = 0, z = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
  }
  /**
   * Gets x value
   */
  get x(): number {
    return this._x;
  }
  /**
   * Gets y value
   */
  get y(): number {
    return this._y;
  }
  /**
   * Gets z value
   */
  get z(): number {
    return this._z;
  }
  /**
   * Creates new normalized unit vector, from the current vector
   */
  get normalized(): V3 {
    const mag = Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    if (mag < 0.00001) {
      return V3.create(0, 0, 0);
    }
    return this.divBy(mag);
  }
  /**
   * Creates new vector that points in the opposite direction and has the same magnitude
   */
  get negated(): V3 {
    return this.mulBy(-1);
  }
  /**
   * If the vector is already normalized, returns the same vector otherwise creates a new normalized unit vector
   */
  get ensureNormalized(): IV3Readonly {
    const sqrMag = this.sqrMagnitude;
    if (Math.abs(sqrMag - 1) < 0.00001) return this;
    return this.normalized;
  }
  /**
   * Returns squared magnitude (squared length)
   */
  get sqrMagnitude(): number {
    return this._x * this._x + this._y * this._y + this._z * this._z;
  }
  /**
   * Returns vector magnitude (length)
   */
  get magnitude(): number {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
  }
  /**
   * returns string representation of this vector
   */
  toString(): string {
    return `new V3Readonly(${this._x},${this._y},${this._z})`;
  }
  /**
   * returns string representation of this vector rounded to n decimal places
   * @param n - number of decimal places to round to
   */
  toStringRoundTo(n: number) {
    return `new V3Readonly(${this._x.toFixed(n)}, ${this._y.toFixed(n)}, ${this._z.toFixed(n)})`;
  }
  /**
   * Clones as writable, implementation of IV3Readonly interface
   */
  cloneAsWritable(): V3 {
    return V3.create(this._x, this._y, this._z);
  }
  /**
   * Clones as readonly, implementation of IV3Readonly interface
   */
  cloneAsReadonly(): IV3Readonly {
    return new V3Readonly(this._x, this._y, this._z);
  }
  /**
   * Gets value by index, 0=x, 1=y, 2=z
   * @param index
   * @returns value
   */
  getByIndex(index: number): number {
    if (index == 0) return this._x;
    if (index == 1) return this._y;
    if (index == 2) return this._z;
    throw new Error(`Invalid index ${index}`);
  }
  /**
   * Creates new writable vector, implementation of IV3Readonly interface
   */
  get ensureWritable(): V3 {
    return V3.create(this._x, this._y, this._z);
  }
  /**
   * Returns reference to this object, implementation of IV3Readonly interface
   */
  get ensureReadonly(): V3Readonly {
    return this;
  }
  /**
   * Returns new vector that represents movement of current vectr towards target vector
   * @param target - another vector
   * @param distance - distance to move in direction of target
   */
  moveTowards(to: IV3Readonly, distance: number): V3 {
    const dir = to.sub(this);
    dir.normalize_();
    return this.add(dir.mulBy_(distance));
  }
  /**
   * Returns new vector that represents movement of current vectr towards target vector without passing through other vector
   * @param to
   * @param distance
   */
  moveTowardsNoPass(to: IV3Readonly, distance: number): V3 {
    const dir = to.sub(this);
    const mag = dir.magnitude;
    if (mag < 0.00001) return to.cloneAsWritable();
    dir.divBy_(mag);
    return this.add(dir.mulBy_(min(mag, distance)));
  }
  /**
   * Cross product with another vector
   * @param rhs - another vector
   * @returns cross product
   */
  cross(rhs: IV3Readonly): V3 {
    return V3.create(
      this._y * rhs.z - this._z * rhs.y,
      this._z * rhs.x - this._x * rhs.z,
      this._x * rhs.y - this._y * rhs.x,
    );
  }
  /**
   * Dot product with another vector
   * @param rhs - another vector
   * @returns dot product
   */
  dot(rhs: IV3Readonly): number {
    return this._x * rhs.x + this._y * rhs.y + this._z * rhs.z;
  }
  /**
   * Returns new vector that represents substraction of another vector from the current vector
   * @param v - another vector
   */
  sub(v: IV3Readonly): V3 {
    return V3.create(this._x - v.x, this._y - v.y, this._z - v.z);
  }
  /**
   * Returns new vector that represents addition of another vector to the current vector
   * @param v - another vector
   */
  add(v: IV3Readonly): V3 {
    return V3.create(this._x + v.x, this._y + v.y, this._z + v.z);
  }
  /**
   * Returns new vector that represents division of current vector by another vector
   * @param v - another vector
   */
  div(v: IV3Readonly): V3 {
    return V3.create(this._x / v.x, this._y / v.y, this._z / v.z);
  }
  /**
   * Returns new vector that represents division of current vector by numberic value
   * @param n - numberiic value to divide by
   */
  divBy(n: number): V3 {
    return V3.create(this._x * n, this._y * n, this._z * n);
  }
  /**
   * Returns new vector that represents multiplication of current vector by another vector
   * @param v - another vector
   */
  mul(v: IV3Readonly): V3 {
    return V3.create(this._x * v.x, this._y * v.y, this._z * v.z);
  }
  /**
   * Returns new vector that represents multiplication of current vector by numberic value
   * @param n - numberiic value to multiply by
   */
  by(n: number): V3 {
    return V3.create(this._x * n, this._y * n, this._z * n);
  }
  /**
   * Returns new vector that represents multiplication of current vector by numberic value
   * @param n - numberiic value to multiply by
   */
  mulBy(n: number): V3 {
    return V3.create(this._x * n, this._y * n, this._z * n);
  }
  /**
   * Returns new vector that represents multiplication of current vector by numberic value
   * @param n - numberiic value to multiply by
   * @param condition - boolean condition to check against
   */
  mulByIf(n: number, condition: boolean): V3 {
    return condition ? V3.create(this._x * n, this._y * n, this._z * n) : this.ensureWritable;
  }
  /**
   * Signed degrees angle to another vector
   * @param rhs - another vector
   * @param normal - normal vector
   * @returns degrees angle
   */
  degreesTo(rhs: IV3Readonly, normal: IV3Readonly): number {
    // eslint-disable-next-line
    const lhs = this;
    const x = lhs.cross(rhs);
    return Math.atan2(normal.dot(x), lhs.dot(rhs)) * Rad2Deg;
  }
  /**
   * Unsigned degrees angle to another vector
   * @param rhs - another vector
   * @returns degrees angle
   */
  unsignedDegreesTo(rhs: IV3Readonly): number {
    return Math.acos(clamp(this.normalized.dot(rhs.normalized), -1.0, 1.0)) * Rad2Deg;
  }
  /**
   * Returns new vector that is ensured not to be longer than a given value
   * @param len - length limit
   */
  noLongerThan(len: number): V3 {
    const mag = this.magnitude;
    if (mag <= len) return this.cloneAsWritable();
    return this.normalized.mulBy_(len);
  }
  /**
   * Rotates vector by a given quaternion rotation
   * @param r - quaternion rotation
   * @returns rotated vector
   */
  rotate(r: IQtReadonly): V3 {
    return Math3D.multiplyQuaternionAndVector(r, this);
  }
  /**
   * Created rotation considering the current vector to be an axis of rotation
   * @param degrees - degrees to rotate
   * @returns quaternion rotation
   */
  axisDegRotation(degrees: number): Qt {
    const radians = degrees * Deg2Rad;
    const halfAngle = radians * 0.5;
    const s = Math.sin(halfAngle);
    const c = Math.cos(halfAngle);

    const ansX = this._x * s;
    const ansY = this._y * s;
    const ansZ = this._z * s;
    const ansW = c;
    return Qt.create(ansX, ansY, ansZ, ansW);
  }
  /**
   * Returns new vector that represents horizontal direction (on the horizontal plane) to another vector
   * @param v - another vector
   * @returns normalized, unit vector direction to another vector placed on the horizontal plane
   */
  horzDirTo(v: IV3Readonly): V3 {
    return V3.normalizeXYZ(v.x - this._x, 0, v.z - this._z);
  }
  /**
   * Returns new vector that represents direction to another vector
   * @param v - another vector
   * @returns normalized, unit vector direction to another vector
   */
  dirTo(v: IV3Readonly): V3 {
    return V3.normalizeXYZ(v.x - this._x, v.y - this._y, v.z - this._z);
  }
  /**
   * Distances to another vector
   * @param v - another vector
   * @returns distance
   */
  distanceTo(v: IV3Readonly): number {
    const vx = this._x - v.x;
    const vy = this._y - v.y;
    const vz = this._z - v.z;
    return Math.sqrt(vx * vx + vy * vy + vz * vz);
  }
  /**
   * Horizontal distances to another vector (ignoring Y)
   * @param v - another vector
   * @returns Horizontal distance
   */
  horzDistanceTo(v: IV3Readonly): number {
    const vx = this._x - v.x;
    const vz = this._z - v.z;
    return Math.sqrt(vx * vx + vz * vz);
  }
  /**
   * Creates quaternion from the current vector considering it to be representation of euler angles rotation
   * @param [convertDegreesToRadians] - if true, will convert degrees to radians, by default set to false
   * @returns quaternion rotation
   */
  toQt(convertDegreesToRadians = false): Qt {
    return Math3D.xyzEulerToQt(this._x, this._y, this._z, convertDegreesToRadians);
  }
  /**
   * Creates new vector from current vector that represents rotation of that vector around a specific axis
   * @param axis - axis to rotate around
   * @param degrees - degrees to rotate around
   */
  rotAboutAxis(axis: IV3Readonly, degrees: number): V3 {
    return this.rotate(axis.axisDegRotation(degrees));
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards the target vector
   * @param rhs - target vector
   * @param progress01 - progress for rotation from 0 to 1
   */
  rotTo01(rhs: IV3Readonly, progress01: number): V3 {
    return Math3D.rotateOneVectorTowardsAnotherByFraction(this, rhs, progress01);
  }
  /**
   * Creates new point that represents movement of the current point towards target point
   * @param to - target point
   * @param progress01 - progress for movement from 0 to 1
   */
  moveTo(to: IV3Readonly, progress01: number): V3 {
    return V3.create(
      interpolate(this._x, to.x, progress01),
      interpolate(this._y, to.y, progress01),
      interpolate(this._z, to.z, progress01),
    );
  }
  /**
   * Creates new vector that represents current vector with having it's length changed to the given value
   * @param length - new vector length
   */
  withLength(length: number): V3 {
    const mag = this.magnitude;
    if (mag < 0.00000001) return this.cloneAsWritable();
    return this.divBy(mag).mulBy_(length);
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards the forward direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotFw(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo(!view ? V3.fw : view.fw, degrees);
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards the back direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotBk(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo(!view ? V3.bk : view.bk, degrees);
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards the left direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotLt(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo(!view ? V3.lt : view.lt, degrees);
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards the right direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotRt(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo(!view ? V3.rt : view.rt, degrees);
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards the up direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotUp(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo(!view ? V3.up : view.up, degrees);
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards the down direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotDn(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo(!view ? V3.dn : view.dn, degrees);
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards another unit vector
   * @param degrees - degrees to rotate
   */
  rotTo(targetDir: IV3Readonly, degrees: number): V3 {
    const normal = this.cross(targetDir).normalized;
    return this.rotate(normal.axisDegRotation(degrees));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the back direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addBk(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x, this.y, this.z - n) : this.add(view.bk.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the forward direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addFw(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x, this.y, this.z + n) : this.add(view.fw.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the right direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addRt(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x - n, this.y, this.z) : this.add(view.rt.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the left direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addLt(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x + n, this.y, this.z) : this.add(view.lt.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the down direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addDn(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x, this.y - n, this.z) : this.add(view.dn.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the up direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addUp(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x, this.y + n, this.z) : this.add(view.up.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the X direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addX(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x + n, this.y, this.z) : this.add(view.lt.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the Y direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addY(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x, this.y + n, this.z) : this.add(view.up.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the Z direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addZ(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x, this.y, this.z + n) : this.add(view.fw.mulBy(n));
  }
  /**
   * Determines whether unit vector points in the same direction as other unit vector (less than 90 degrees)
   * @param otherDir - unit vector to compare against
   */
  isDirSameSideAs(otherDir: IV3Readonly): boolean {
    return this.dot(otherDir) > 0;
  }
  /**
   * Determines whether unit vector points in different direction as other unit vector (more than 90 degrees)
   * @param otherDir - unit vector to compare against
   */
  isDirNotSameSideAs(otherDir: IV3Readonly): boolean {
    return this.dot(otherDir) <= 0;
  }
}
export class V3 implements IV3Readonly {
  private _x: number;
  private _y: number;
  private _z: number;
  private _isChanged: boolean;
  private _scopeId: number;
  static readonly zero = new V3Readonly(0, 0, 0);
  static readonly fw = new V3Readonly(0, 0, 1);
  static readonly bk = new V3Readonly(0, 0, -1);
  static readonly up = new V3Readonly(0, 1, 0);
  static readonly dn = new V3Readonly(0, -1, 0);
  static readonly rt = new V3Readonly(-1, 0, 0);
  static readonly lt = new V3Readonly(1, 0, 0);
  static readonly one = new V3Readonly(1, 1, 1);
  static readonly nan = new V3Readonly(NaN, NaN, NaN);
  static readonly max = new V3Readonly(
    Number.MAX_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
  );
  private constructor(x = 0, y = 0, z = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._isChanged = true;
    this._scopeId = NaN;
  }
  /**
   * Creates V3 vector, if object pool is active, and has available objects will recycle object from the pool, otherwise will create new
   * @param [x] - x value, 0 by default
   * @param [y] - y value, 0 by default
   * @param [z] - z value, 0 by default
   */
  static create(x = 0, y = 0, z = 0): V3 {
    if (objPool && objPool.isActive) {
      let v3 = <V3>objPool.getObj(PoolObjType.V3);
      if (!v3) {
        v3 = new V3(x, y, z);
        objPool.setObj(PoolObjType.V3, v3);
      } else {
        v3.x = x;
        v3.y = y;
        v3.z = z;
      }
      return v3.setScope(objPool.scopeId);
    }
    return new V3(x, y, z);
  }
  /**
   * Creates V3, regardless if object pool is active, or not it will create new permanent object, not managed by pool
   * @param [x] - x value, 0 by default
   * @param [y] - y value, 0 by default
   * @param [z] - z value, 0 by default
   */
  static createPermanent(x = 0, y = 0, z = 0): V3 {
    return new V3(x, y, z);
  }
  /**
   * Creates V3, regardless if object pool is active, or not it will create new permanent object, not managed by pool
   * @param [x] - x value, 0 by default
   * @param [y] - y value, 0 by default
   * @param [z] - z value, 0 by default
   */
  get permanent(): V3 {
    return V3.createPermanent(this.x, this.y, this.z);
  }
  /**
   * Sets object pool scope
   * @param scopeId - scope ID
   */
  setScope(scopeId: number): V3 {
    this._scopeId = scopeId;
    return this;
  }
  /**
   * Gets x value, it will also verify scope
   */
  get x(): number {
    objPool.verifyScope(this._scopeId);
    return this._x;
  }
  /**
   * Sets x value
   */
  set x(n: number) {
    if (Math.abs(n - this._x) < 0.000001) return;
    this._isChanged = true;
    this._x = n;
  }
  /**
   * Gets y value, it will also verify scope
   */
  get y(): number {
    objPool.verifyScope(this._scopeId);
    return this._y;
  }
  /**
   * Sets y value
   */
  set y(n: number) {
    if (Math.abs(n - this._y) < 0.000001) return;
    this._isChanged = true;
    this._y = n;
  }
  /**
   * Gets z value, it will also verify scope
   */
  get z(): number {
    objPool.verifyScope(this._scopeId);
    return this._z;
  }
  /**
   * Sets z value
   */
  set z(n: number) {
    if (Math.abs(n - this._z) < 0.000001) return;
    this._isChanged = true;
    this._z = n;
  }
  /**
   * Creates writable V3 vector with zero length
   */
  static get zeroWritable(): V3 {
    return V3.create(0, 0, 0);
  }
  /**
   * Gets whether was changed
   */
  get isChanged(): boolean {
    return this._isChanged;
  }
  /**
   * Creates new normalized unit vector, from the current vector
   */
  get normalized(): V3 {
    const mag = Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    if (mag < 0.00001) {
      return V3.create(0, 0, 0);
    }
    return this.divBy(mag);
  }
  /**
   * Creates new vector that points in the opposite direction and has the same magnitude
   */
  get negated(): V3 {
    return this.mulBy(-1);
  }
  /**
   * If the vector is already normalized, returns the same vector otherwise creates a new normalized unit vector
   */
  get ensureNormalized(): IV3Readonly {
    const sqrMag = this.sqrMagnitude;
    if (Math.abs(sqrMag - 1) < 0.00001) return this;
    return this.normalized;
  }
  /**
   * Returns squared magnitude (squared length)
   */
  get sqrMagnitude(): number {
    return this._x * this._x + this._y * this._y + this._z * this._z;
  }
  /**
   * Returns vector magnitude (length)
   */
  get magnitude(): number {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
  }
  /**
   * Clones the vector
   */
  clone(): V3 {
    return V3.create(this._x, this._y, this._z);
  }
  /**
   * Clones as writable, implementation of IV3Readonly interface
   */
  cloneAsWritable(): V3 {
    return V3.create(this._x, this._y, this._z);
  }
  /**
   * Clones as readonly, implementation of IV3Readonly interface
   */
  cloneAsReadonly(): IV3Readonly {
    return new V3Readonly(this._x, this._y, this._z);
  }
  /**
   * Gets value by index, 0=x, 1=y, 2=z
   * @param index
   * @returns value
   */
  getByIndex(index: number): number {
    if (index == 0) return this._x;
    if (index == 1) return this._y;
    if (index == 2) return this._z;
    throw new Error(`Invalid index ${index}`);
  }
  /**
   * Returns reference to the vector itself, implementation of IV3Readonly interface
   */
  get ensureWritable(): V3 {
    return this;
  }
  /**
   * Creates new V3Readonly vector with the same x, y, and z values, implementation of IV3Readonly interface
   */
  get ensureReadonly(): V3Readonly {
    return new V3Readonly(this._x, this._y, this._z);
  }
  /**
   * Markes it as processed
   */
  processedChange_(): V3 {
    this._isChanged = false;
    return this;
  }
  /**
   * Marks it as changed
   */
  markAsChanged_(): V3 {
    this._isChanged = true;
    return this;
  }
  /**
   * returns string representation of this vector
   */
  toString(): string {
    return `V3.create(${this._x},${this._y},${this._z})`;
  }
  /**
   * returns string representation of this vector rounded to n decimal places
   * @param n - number of decimal places to round to
   */
  toStringRoundTo(n: number) {
    const a = this.toFixed(this._x, n);
    const b = this.toFixed(this._y, n);
    const c = this.toFixed(this._z, n);
    return `V3.create(${a},${b},${c})`;
  }
  private toFixed(n: number, d: number): string {
    if (isNumEqual(n, 0, 0.0000001)) return '0';
    if (isNumEqual(n, 1, 0.0000001)) return '1';
    if (isNumEqual(n, -1, 0.0000001)) return '-1';
    return n.toFixed(d);
  }
  /**
   * Creates new V3Readonly vector with the same x, y, and z values
   */
  get readonly(): V3Readonly {
    return new V3Readonly(this._x, this._y, this._z);
  }
  /**
   * Sets x, y and z values from another source vector
   * @param other - source vector
   */
  setFrom_(other: IV3Readonly): V3 {
    if (!other) return this;
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;

    return this;
  }
  /**
   * Sets x, y and z values from array of numbers, x=0, y=1, z=2
   * @param other - source array
   */
  setFromArray_(arr: number[]): V3 {
    if (!arr) return this;
    if (arr.length > 0) this.x = arr[0];
    if (arr.length > 1) this.y = arr[1];
    if (arr.length > 2) this.z = arr[2];

    return this;
  }
  /**
   * Normalizes current vector and returns reference to itself
   */
  normalize_(): V3 {
    const mag = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    if (mag < 0.0000001) return V3.create(0, 0, 0);
    return this.divBy_(mag);
  }
  /**
   * Determines whether vector is equal to another vector within a specific delta
   * @param other - the other vector
   * @param [delta] - delta to compare with, default value is 0.000001
   */
  isEqual(other: IV3Readonly, delta = 0.0000001) {
    if (Math.abs(this.x - other.x) > delta) return false;
    if (Math.abs(this.y - other.y) > delta) return false;
    if (Math.abs(this.z - other.z) > delta) return false;

    return true;
  }
  /**
   * Creates new point that represents movement of the current point towards target point by distance fraction
   * @param to - target point
   * @param progress01 - progress for movement from 0 to 1
   */
  moveTo(to: IV3Readonly, progress01: number): V3 {
    return V3.create(
      interpolate(this._x, to.x, progress01),
      interpolate(this._y, to.y, progress01),
      interpolate(this._z, to.z, progress01),
    );
  }
  /**
   * Updates the current point so to apply movement of the current point towards target point by distance fraction
   * @param to - target point
   * @param progress01 - progress for movement from 0 to 1
   */
  moveTo_(to: IV3Readonly, progress01: number): V3 {
    this.x = interpolate(this._x, to.x, progress01);
    this.y = interpolate(this._y, to.y, progress01);
    this.z = interpolate(this._z, to.z, progress01);
    return this;
  }
  /**
   * Creates new point that represents movement of the current point towards target point by distance
   * @param to - target point
   * @param distance - distance
   */
  moveTowards(to: IV3Readonly, distance: number): V3 {
    const dir = to.sub(this);
    dir.normalize_();
    return this.add(dir.mulBy_(distance));
  }
  /**
   * Updates the current point so to apply movement of the current point towards target point by distance
   * @param to - target point
   * @param distance - distance
   */
  moveTowards_(to: IV3Readonly, distance: number): V3 {
    const dir = to.sub(this);
    dir.normalize_();
    return this.add_(dir.mulBy_(distance));
  }
  /**
   * Creates new point that represents movement of the current point towards target point by distance without passing the target point
   * @param to - target point
   * @param distance - distance (if it is longer than the distance to the target point, the ddistance to the target point will be used)
   */
  moveTowardsNoPass(to: IV3Readonly, distance: number): V3 {
    const dir = to.sub(this);
    const mag = dir.magnitude;
    if (mag < 0.00001) return to.cloneAsWritable();
    dir.divBy_(mag);
    return this.add(dir.mulBy_(min(mag, distance)));
  }
  /**
   * Updates the current point so to apply movement of the current point towards target point by distance without passing the target point
   * @param to - target point
   * @param distance - distance (if it is longer than the distance to the target point, the ddistance to the target point will be used)
   */
  moveTowardsNoPass_(to: IV3Readonly, distance: number): V3 {
    const dir = to.sub(this);
    const mag = dir.magnitude;
    dir.normalize_();
    return this.add_(dir.mulBy_(min(mag, distance)));
  }
  /**
   * Returns new vector that represents substraction of another vector from the current vector
   * @param v - another vector
   */
  sub(v: IV3Readonly): V3 {
    return V3.create(this.x - v.x, this.y - v.y, this.z - v.z);
  }
  /**
   * Updates the current point so to apply substraction of another vector from the current vector
   * @param v - another vector
   */
  sub_(v: IV3Readonly): V3 {
    this.x = this.x - v.x;
    this.y = this.y - v.y;
    this.z = this.z - v.z;
    return this;
  }
  /**
   * Returns new vector that represents addition of another vector to the current vector
   * @param v - another vector
   */
  add(v: IV3Readonly, multiplier = NaN): V3 {
    const m = isNaN(multiplier) ? 1 : multiplier;
    return V3.create(this.x + v.x * m, this.y + v.y * m, this.z + v.z * m);
  }
  /**
   * Updates the current point so to apply addition of another vector to the current vector
   * @param v - another vector
   */
  add_(v: IV3Readonly, multiplier = NaN): V3 {
    const m = isNaN(multiplier) ? 1 : multiplier;
    this.x = this.x + v.x * m;
    this.y = this.y + v.y * m;
    this.z = this.z + v.z * m;
    return this;
  }
  /**
   * Returns new vector that represents division of current vector by another vector
   * @param v - another vector
   */
  div(v: IV3Readonly): V3 {
    return V3.create(this.x / v.x, this.y / v.y, this.z / v.z);
  }
  /**
   * Updates the current point so to apply division of current vector by another vector
   * @param v - another vector
   */
  div_(v: IV3Readonly): V3 {
    this.x = this.x / v.x;
    this.y = this.y / v.y;
    this.z = this.z / v.z;
    return this;
  }
  /**
   * Returns new vector that represents division of current vector by numberic value
   * @param n - numberiic value to divide by
   */
  divBy(n: number): V3 {
    return V3.create(this.x / n, this.y / n, this.z / n);
  }
  /**
   * Updates the current point so to apply division of current vector by numberic value
   * @param n - numberiic value to divide by
   */
  divBy_(n: number): V3 {
    this.x = this.x / n;
    this.y = this.y / n;
    this.z = this.z / n;
    return this;
  }
  /**
   * Returns new vector that represents multiplication of current vector by another vector
   * @param v - another vector
   */
  mul(v: IV3Readonly): V3 {
    return V3.create(this.x * v.x, this.y * v.y, this.z * v.z);
  }
  /**
   * Updates the current point so to apply multiplication of current vector by another vector
   * @param v - another vector
   */
  mul_(v: IV3Readonly): V3 {
    this.x = this.x * v.x;
    this.y = this.y * v.y;
    this.z = this.z * v.z;
    return this;
  }
  /**
   * Returns new vector that represents multiplication of current vector by numberic value
   * @param n - numberic value to multiply by
   */
  by(n: number): V3 {
    return V3.create(this.x * n, this.y * n, this.z * n);
  }
  /**
   * Updates the current point so to apply multiplication of current vector by numberic value
   * @param n - numberic value to multiply by
   */
  by_(n: number): V3 {
    this.x = this._x * n;
    this.y = this._y * n;
    this.z = this._z * n;
    return this;
  }
  /**
   * Returns new vector that represents multiplication of current vector by numberic value
   * @param n - numberic value to multiply by
   */
  mulBy(n: number): V3 {
    return this.by(n);
  }
  /**
   * Updates the current point so to apply multiplication of current vector by numberic value
   * @param n - numberic value to multiply by
   */
  mulBy_(n: number): V3 {
    return this.by_(n);
  }
  /**
   * Returns new vector that represents multiplication of current vector by numberic value but only if condition is true
   * @param n - numberic value to multiply by
   * @param condition - boolean condition that determines whether this operation is applied
   */
  mulByIf(n: number, condition: boolean): V3 {
    return condition ? this.by(n) : this.ensureWritable;
  }
  /**
   * Updates the current point so to apply multiplication of current vector by numberic value but only if condition is true
   * @param n - numberic value to multiply by
   * @param condition - boolean condition that determines whether this operation is applied
   */
  mulByIf_(n: number, condition: boolean): V3 {
    if (condition) {
      this.by_(n);
    }
    return this;
  }
  /**
   * Returns copy of this vector with X value set to provided
   * @param x - X value
   * @returns new vector
   */
  setX(x: number): V3 {
    return V3.create(x, this._y, this._z);
  }
  /**
   * Updates X value and returns reference to itself
   * @param x - X value
   * @returns reference to this vector
   */
  setX_(x: number): V3 {
    this.x = x;
    return this;
  }
  /**
   * Returns copy of this vector with Y value set to provided
   * @param y - Y value
   * @returns new vector
   */
  setY(y: number): V3 {
    return V3.create(this._x, y, this._z);
  }
  /**
   * Updates Y value and returns reference to itself
   * @param y - Y value
   * @returns reference to this vector
   */
  setY_(y: number): V3 {
    this.y = y;
    return this;
  }
  /**
   * Returns copy of this vector with Z value set to provided
   * @param z - Z value
   * @returns new vector
   */
  setZ(z: number): V3 {
    return V3.create(this._x, this._y, z);
  }
  /**
   * Updates Z value and returns reference to itself
   * @param z - Z value
   * @returns reference to this vector
   */
  setZ_(z: number): V3 {
    this.z = z;
    return this;
  }
  /**
   * Sets xyz
   * @param x
   * @param y
   * @param z
   * @returns xyz
   */
  setXYZ_(x: number, y: number, z: number): V3 {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  /**
   * Cross product with another vector
   * @param rhs - another vector
   * @returns new cross product vector
   */
  cross(rhs: IV3Readonly): V3 {
    return V3.create(
      this._y * rhs.z - this._z * rhs.y,
      this._z * rhs.x - this._x * rhs.z,
      this._x * rhs.y - this._y * rhs.x,
    );
  }
  /**
   * Dot product with another vector
   * @param rhs - another vector
   * @returns dot product
   */
  dot(rhs: IV3Readonly): number {
    return this._x * rhs.x + this._y * rhs.y + this._z * rhs.z;
  }
  /**
   * Signed degrees angle to another vector
   * @param rhs - another vector
   * @param normal - normal vector
   * @returns degrees angle
   */
  degreesTo(rhs: IV3Readonly, normal: IV3Readonly): number {
    // eslint-disable-next-line
    const lhs = this;
    const x = lhs.cross(rhs);
    return Math.atan2(normal.dot(x), lhs.dot(rhs)) * Rad2Deg;
  }
  /**
   * Unsigned degrees angle to another vector
   * @param rhs - another vector
   * @returns degrees angle
   */
  unsignedDegreesTo(rhs: IV3Readonly): number {
    return Math.acos(clamp(this.normalized.dot(rhs.normalized), -1.0, 1.0)) * Rad2Deg;
  }
  /**
   * Returns new vector that is ensured not to be longer than a given value
   * @param len - length limit
   */
  noLongerThan(len: number): V3 {
    const mag = this.magnitude;
    if (mag <= len) return this.cloneAsWritable();
    return this.normalized.mulBy_(len);
  }
  /**
   * Updates this vector while ensuring, the length not to be longer than a given value
   * @param len - length limit
   * @returns reference to this vector
   */
  noLongerThan_(len: number): V3 {
    const mag = this.magnitude;
    if (mag <= len) return this;
    return this.normalize_().mulBy_(len);
  }
  /**
   * Returns new vector that represents current vector rotated by provided quaternion rotation (multiplying the quaternion and the vector)
   * @param r - quaternion rotation to apply
   */
  rotate(r: IQtReadonly): V3 {
    return Math3D.multiplyQuaternionAndVector(r, this);
  }
  /**
   * Updates the current vector so it is rotated by provided quaternion rotation (multiplying the quaternion and the vector)
   * @param r - quaternion rotation to apply
   */
  /*rotate_(r: IQtReadonly): V3 {
    // eslint-disable-next-line
    const p = this;
    const x2 = r.x + r.x;
    const y2 = r.y + r.y;
    const z2 = r.z + r.z;

    const wx2 = r.w * x2;
    const wy2 = r.w * y2;
    const wz2 = r.w * z2;
    const xx2 = r.x * x2;
    const xy2 = r.x * y2;
    const xz2 = r.x * z2;
    const yy2 = r.y * y2;
    const yz2 = r.y * z2;
    const zz2 = r.z * z2;

    const vx = p.x * (1.0 - yy2 - zz2) + p.y * (xy2 - wz2) + p.z * (xz2 + wy2);
    const vy = p.x * (xy2 + wz2) + p.y * (1.0 - xx2 - zz2) + p.z * (yz2 - wx2);
    const vz = p.x * (xz2 - wy2) + p.y * (yz2 + wx2) + p.z * (1.0 - xx2 - yy2);

    this.x = vx;
    this.y = vy;
    this.z = vz;

    return this;
  }*/
  rotate_(r: IQtReadonly): V3 {
    const p = this;
    const x2 = r.x + r.x;
    const y2 = r.y + r.y;
    const z2 = r.z + r.z;

    const wx2 = r.w * x2;
    const wy2 = r.w * y2;
    const wz2 = r.w * z2;
    const xx2 = r.x * x2;
    const xy2 = r.x * y2;
    const xz2 = r.x * z2;
    const yy2 = r.y * y2;
    const yz2 = r.y * z2;
    const zz2 = r.z * z2;

    const vx = p.x * (1.0 - yy2 - zz2) + p.y * (xy2 - wz2) + p.z * (xz2 + wy2);
    const vy = p.x * (xy2 + wz2) + p.y * (1.0 - xx2 - zz2) + p.z * (yz2 - wx2);
    const vz = p.x * (xz2 - wy2) + p.y * (yz2 + wx2) + p.z * (1.0 - xx2 - yy2);

    this.x = vx;
    this.y = vy;
    this.z = vz;

    return this;
  }
  /**
   * Created rotation considering the current vector to be an axis of rotation
   * @param degrees - degrees to rotate
   * @returns quaternion rotation
   */
  axisDegRotation(degrees: number): Qt {
    const radians = degrees * Deg2Rad;
    const halfAngle = radians * 0.5;
    const s = Math.sin(halfAngle);
    const c = Math.cos(halfAngle);

    const ansX = this._x * s;
    const ansY = this._y * s;
    const ansZ = this._z * s;
    const ansW = c;
    return Qt.create(ansX, ansY, ansZ, ansW);
  }
  /**
   * Returns new vector that represents horizontal direction (on the horizontal plane) to another vector
   * @param v - another vector
   * @returns normalized, unit vector direction to another vector placed on the horizontal plane
   */
  horzDirTo(v: IV3Readonly): V3 {
    return V3.normalizeXYZ(v.x - this._x, 0, v.z - this._z);
  }
  /**
   * Returns new vector that represents direction to another vector
   * @param v - another vector
   * @returns normalized, unit vector direction to another vector
   */
  dirTo(v: IV3Readonly): V3 {
    return V3.normalizeXYZ(v.x - this._x, v.y - this._y, v.z - this._z);
  }
  /**
   * Distances to another vector
   * @param v - another vector
   * @returns distance
   */
  distanceTo(other: IV3Readonly): number {
    const vx = this._x - other.x;
    const vy = this._y - other.y;
    const vz = this._z - other.z;
    return Math.sqrt(vx * vx + vy * vy + vz * vz);
  }
  /**
   * Horizontal distances to another vector (ignoring Y)
   * @param v - another vector
   * @returns Horizontal distance
   */
  horzDistanceTo(other: IV3Readonly): number {
    const vx = this._x - other.x;
    const vz = this._z - other.z;
    return Math.sqrt(vx * vx + vz * vz);
  }
  /**
   * Creates quaternion from the current vector considering it to be representation of euler angles rotation
   * @param [convertDegreesToRadians] - if true, will convert degrees to radians, by default set to false
   * @returns quaternion rotation
   */
  toQt(convertDegreesToRadians = false): Qt {
    return Math3D.xyzEulerToQt(this._x, this._y, this._z, convertDegreesToRadians);
  }
  /**
   * Subscribe to vector or point signal changes so that the current vector gets updated by the vector signal values
   * @param vs - vetor signal or point signal to subscribe to
   * @param [subs] - optional subscription container
   * @returns reference to this vector
   */
  updateAsVectorFromReactive_(vs: Mat4Signal | PointSignal, subs: SubXYZW = null): V3 {
    this.x = vs.x.pinLastValue();
    this.y = vs.y.pinLastValue();
    this.z = vs.z.pinLastValue();
    const s1 = vs.x.monitor({fireOnInitialValue: true}).subscribe(e => (this.x = e.newValue));
    const s2 = vs.y.monitor({fireOnInitialValue: true}).subscribe(e => (this.y = e.newValue));
    const s3 = vs.z.monitor({fireOnInitialValue: true}).subscribe(e => (this.z = e.newValue));
    if (subs) {
      subs.x = s1;
      subs.y = s2;
      subs.z = s3;
    }
    return this;
  }
  /**
   * Subscribe to transform or transform-signal changes so that the current vector gets updated by the transform position signal values
   * @param ts - transform or transform-signal to subscribe to
   * @param [subs] - optional subscription container
   * @returns reference to this vector
   */
  updateAsPositionFromReactive_(ts: Mat4Signal | Transform, subs: SubXYZW = null): V3 {
    const p = ts.position;
    this.x = p.x.pinLastValue();
    this.y = p.y.pinLastValue();
    this.z = p.z.pinLastValue();
    const s1 = p.x.monitor({fireOnInitialValue: true}).subscribe(e => (this.x = e.newValue));
    const s2 = p.y.monitor({fireOnInitialValue: true}).subscribe(e => (this.y = e.newValue));
    const s3 = p.z.monitor({fireOnInitialValue: true}).subscribe(e => (this.z = e.newValue));
    if (subs) {
      subs.x = s1;
      subs.y = s2;
      subs.z = s3;
    }
    return this;
  }
  /**
   * Subscribe to transform or transform-signal changes so that the current vector gets updated by the transform rotation signal values
   * @param ts - transform or transform-signal to subscribe to
   * @param [subs] - optional subscription container
   * @returns reference to this vector
   */
  updateAsRotationFromReactive_(ts: Mat4Signal | Transform, subs: SubXYZW = null): V3 {
    this.x = ts.rotationX.pinLastValue();
    this.y = ts.rotationY.pinLastValue();
    this.z = ts.rotationZ.pinLastValue();
    const s1 = ts.rotationX
      .monitor({fireOnInitialValue: true})
      .subscribe(e => (this.x = e.newValue));
    const s2 = ts.rotationY
      .monitor({fireOnInitialValue: true})
      .subscribe(e => (this.y = e.newValue));
    const s3 = ts.rotationZ
      .monitor({fireOnInitialValue: true})
      .subscribe(e => (this.z = e.newValue));
    if (subs) {
      subs.x = s1;
      subs.y = s2;
      subs.z = s3;
    }
    return this;
  }
  /**
   * Subscribe to transform or transform-signal changes so that the current vector gets updated by the transform scale signal values
   * @param ts - transform or transform-signal to subscribe to
   * @param [subs] - optional subscription container
   * @returns reference to this vector
   */
  updateAsScaleFromReactive_(ts: Mat4Signal | Transform, subs: SubXYZW = null): V3 {
    this.x = ts.scaleX.pinLastValue();
    this.y = ts.scaleY.pinLastValue();
    this.z = ts.scaleZ.pinLastValue();
    const s1 = ts.scaleX.monitor({fireOnInitialValue: true}).subscribe(e => (this.x = e.newValue));
    const s2 = ts.scaleY.monitor({fireOnInitialValue: true}).subscribe(e => (this.y = e.newValue));
    const s3 = ts.scaleZ.monitor({fireOnInitialValue: true}).subscribe(e => (this.z = e.newValue));
    if (subs) {
      subs.x = s1;
      subs.y = s2;
      subs.z = s3;
    }
    return this;
  }
  /**
   * Returns new vector that represents rotation of the current vector about an axis given number degrees
   * @param axis - rotation axis
   * @param degrees - degress to rotate
   */
  rotAboutAxis(axis: IV3Readonly, degrees: number): V3 {
    return this.rotate(axis.axisDegRotation(degrees));
  }
  /**
   * Updates the current vector so that it applies rotation of the current vector about an axis given number degrees
   * @param axis - rotation axis
   * @param degrees - degress to rotate
   */
  rotAboutAxis_(axis: IV3Readonly, degrees: number): V3 {
    return this.rotate_(axis.axisDegRotation(degrees));
  }
  /**
   * Returns new vector that represents rotation of the current vector towards another unit vector by given ration from 0 to 1
   * @param rhs - vector to rotate towards
   * @param progress01 - ration of rotation from 0 to 1
   */
  rotTo01(rhs: IV3Readonly, progress01: number): V3 {
    return Math3D.rotateOneVectorTowardsAnotherByFraction(this, rhs, progress01);
  }
  /**
   * Updates the current vector so that it applies rotation of the current vector towards another unit vector by given ration from 0 to 1
   * @param rhs - vector to rotate towards
   * @param progress01 - ration of rotation from 0 to 1
   * @returns reference to itself
   */
  rotTo01_(rhs: IV3Readonly, progress01: number): V3 {
    const mag = this.magnitude;
    const rhsDir = rhs.normalized;
    if (isNumEqual(progress01, 0, 0.00001)) return this;
    if (isNumEqual(progress01, 1, 0.00001)) return this.setFrom_(rhsDir.mulBy_(mag));
    const crossProd = this.cross(rhs);
    const normal = crossProd.normalized;
    const degrees = Math.atan2(normal.dot(crossProd), this.dot(rhs)) * Rad2Deg;
    return this.rotate_(normal.axisDegRotation(degrees * progress01));
  }
  /**
   * Returns the same vector with changed length, if vector is zero it will be cloned as zero vector
   * @param length - length to change to
   * @returns new vector
   */
  withLength(length: number): V3 {
    const mag = this.magnitude;
    if (mag < 0.00000001) return this.clone();
    return this.divBy(mag).mulBy_(length);
  }
  /**
   * Updates the current vector with changed length, if vector is zero it will be cloned as zero vector
   * @param length - length to change to
   * @returns reference to iself
   */
  withLength_(length: number): V3 {
    const mag = this.magnitude;
    if (mag < 0.00000001) return this.clone();
    return this.divBy_(mag).mulBy_(length);
  }
  /**
   * Updates the current vector so that if it is below a given plane it projects it on that plane, otherwise will do nothing
   * @param planeNormal - plane normal
   * @param planePoint - plane point
   * @returns reference to iself
   */
  ensureAbovePlane_(planeNormal: V3, planePoint: V3): V3 {
    if (Math3D.isPointBelowPlane(this, planeNormal, planePoint)) {
      this.setFrom_(Math3D.projectPointOnPlane(this, planeNormal, planePoint));
    }
    return this;
  }
  /**
   * Updates the current vector so that if it is inside a sphere it moves it to the surface of that sphere, otherwise will do nothing
   * @param sphereCenter - sphere center
   * @param sphereRadius - sphere radius
   * @returns reference to iself
   */
  ensureOutsideSphere_(sphereCenter: V3, sphereRadius: number): V3 {
    const distance = this.distanceTo(sphereCenter);
    if (distance < sphereRadius) {
      let dir = sphereCenter.dirTo(this);
      if (dir.sqrMagnitude == 0) dir = V3.fw.cloneAsWritable();
      this.setFrom_(sphereCenter.add(dir.mulBy_(sphereRadius)));
    }
    return this;
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the back direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that dimension
   * @param [view] - optional view that can redefine the names of the directions
   */
  addBk(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x, this.y, this.z - n) : this.add(view.bk.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the forward direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addFw(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x, this.y, this.z + n) : this.add(view.fw.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the right direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addRt(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x - n, this.y, this.z) : this.add(view.rt.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the left direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addLt(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x + n, this.y, this.z) : this.add(view.lt.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the down direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addDn(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x, this.y - n, this.z) : this.add(view.dn.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the up direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addUp(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x, this.y + n, this.z) : this.add(view.up.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the X direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addX(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x + n, this.y, this.z) : this.add(view.lt.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the Y direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addY(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x, this.y + n, this.z) : this.add(view.up.mulBy(n));
  }
  /**
   * Creates new vector that represents movement of the current vector (addition) in the Z direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addZ(n: number, view?: IObjViewOrientation): V3 {
    return !view ? V3.create(this.x, this.y, this.z + n) : this.add(view.fw.mulBy(n));
  }
  /**
   * Update the vector so that it applies movement of the current vector (addition) in the back direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addBk_(n: number, view?: IObjViewOrientation): V3 {
    if (!view) this.z -= n;
    else this.add_(view.bk.mulBy(n));
    return this;
  }
  /**
   * Update the vector so that it applies movement of the current vector (addition) in the forward direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addFw_(n: number, view?: IObjViewOrientation): V3 {
    if (!view) this.z += n;
    else this.add_(view.fw.mulBy(n));
    return this;
  }
  /**
   * Update the vector so that it applies movement of the current vector (addition) in the right direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addRt_(n: number, view?: IObjViewOrientation): V3 {
    if (!view) this.x -= n;
    else this.add_(view.rt.mulBy(n));
    return this;
  }
  /**
   * Update the vector so that it applies movement of the current vector (addition) in the left direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addLt_(n: number, view?: IObjViewOrientation): V3 {
    if (!view) this.x += n;
    else this.add_(view.lt.mulBy(n));
    return this;
  }
  /**
   * Update the vector so that it applies movement of the current vector (addition) in the down direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addDn_(n: number, view?: IObjViewOrientation): V3 {
    if (!view) this.y -= n;
    else this.add_(view.dn.mulBy(n));
    return this;
  }
  /**
   * Update the vector so that it applies movement of the current vector (addition) in the up direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addUp_(n: number, view?: IObjViewOrientation): V3 {
    if (!view) this.y += n;
    else this.add_(view.up.mulBy(n));
    return this;
  }
  /**
   * Update the vector so that it applies movement of the current vector (addition) in the X direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addX_(n: number, view?: IObjViewOrientation): V3 {
    if (!view) this.x += n;
    else this.add_(view.lt.mulBy(n));
    return this;
  }
  /**
   * Update the vector so that it applies movement of the current vector (addition) in the Y direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addY_(n: number, view?: IObjViewOrientation): V3 {
    if (!view) this.y += n;
    else this.add_(view.up.mulBy(n));
    return this;
  }
  /**
   * Update the vector so that it applies movement of the current vector (addition) in the Z direction, if view is provided it will assume the direction names within that view
   * @param n - length to add to that direction
   * @param [view] - optional view that can redefine the names of the directions
   */
  addZ_(n: number, view?: IObjViewOrientation): V3 {
    if (!view) this.z += n;
    else this.add_(view.fw.mulBy(n));
    return this;
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards the forward direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotFw(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo(!view ? V3.fw : view.fw, degrees);
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards the back direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotBk(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo(!view ? V3.bk : view.bk, degrees);
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards the left direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotLt(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo(!view ? V3.lt : view.lt, degrees);
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards the right direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotRt(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo(!view ? V3.rt : view.rt, degrees);
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards the up direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotUp(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo(!view ? V3.up : view.up, degrees);
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards the down direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   */
  rotDn(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo(!view ? V3.dn : view.dn, degrees);
  }
  /**
   * Creates new unit vector that represents rotation of the current vector towards the given target direction
   * @param targetDir - target direction
   * @param degrees - degrees to rotate
   */
  rotTo(targetDir: IV3Readonly, degrees: number): V3 {
    const normal = this.cross(targetDir).normalized;
    return this.rotate(normal.axisDegRotation(degrees));
  }
  /**
   * Update the vector so that it applies rotation of the current vector towards forward direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   * @returns reference to itself
   */
  rotFw_(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo_(!view ? V3.fw : view.fw, degrees);
  }
  /**
   * Update the vector so that it applies rotation of the current vector towards back direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   * @returns reference to itself
   */
  rotBk_(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo_(!view ? V3.bk : view.bk, degrees);
  }
  /**
   * Update the vector so that it applies rotation of the current vector towards left direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   * @returns reference to itself
   */
  rotLt_(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo_(!view ? V3.lt : view.lt, degrees);
  }
  /**
   * Update the vector so that it applies rotation of the current vector towards right direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   * @returns reference to itself
   */
  rotRt_(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo_(!view ? V3.rt : view.rt, degrees);
  }
  /**
   * Update the vector so that it applies rotation of the current vector towards up direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   * @returns reference to itself
   */
  rotUp_(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo_(!view ? V3.up : view.up, degrees);
  }
  /**
   * Update the vector so that it applies rotation of the current vector towards down direction, if view is provided it will assume the direction names within that view
   * @param degrees - degrees to rotate
   * @param [view] - optional view that can redefine the names of the directions
   * @returns reference to itself
   */
  rotDn_(degrees: number, view?: IObjViewOrientation): V3 {
    return this.rotTo_(!view ? V3.dn : view.dn, degrees);
  }
  /**
   * Update the vector so that it applies rotation of the current vector towards given target direction
   * @param targetDir - target direction vector
   * @param degrees - degrees to rotate
   * @returns reference to itself
   */
  rotTo_(targetDir: IV3Readonly, degrees: number): V3 {
    const normal = this.cross(targetDir).normalized;
    return this.rotate_(normal.axisDegRotation(degrees));
  }
  /**
   * Checks if unit vector points to the same direction as other direction
   * @param otherDir - other direction
   * @returns true if they point in the same direction
   */
  isDirSameSideAs(otherDir: IV3Readonly): boolean {
    return this.dot(otherDir) > 0;
  }
  /**
   * Checks if unit vector points to different direction compared to other unit vector
   * @param otherDir - other direction
   * @returns true if they point in different direction
   */
  isDirNotSameSideAs(otherDir: IV3Readonly): boolean {
    return this.dot(otherDir) <= 0;
  }
  /**
   * Cross product between 2 vectors
   * @param lhs - left side vector
   * @param rhs - right side vector
   * @returns cross product
   */
  static cross(lhs: IV3Readonly, rhs: IV3Readonly): V3 {
    return V3.create(
      lhs.y * rhs.z - lhs.z * rhs.y,
      lhs.z * rhs.x - lhs.x * rhs.z,
      lhs.x * rhs.y - lhs.y * rhs.x,
    );
  }
  /**
   * Normalizes xyz values of a vector into a unit vector
   * @param vx - x value
   * @param vy - y value
   * @param vz - z value
   * @returns normalized vector
   */
  static normalizeXYZ(vx: number, vy: number, vz: number): V3 {
    const mag = Math.sqrt(vx * vx + vy * vy + vz * vz);
    if (mag < 0.0000001) return V3.create(0, 0, 0);
    return V3.create(vx / mag, vy / mag, vz / mag);
  }
  /**
   * Returns new vector where X,Y, and Z are the same value n
   * @param n - value to apply to X,Y, and Z
   * @returns new vector with the same X,Y,Z = n
   */
  static sameXYZ(n: number): V3 {
    return V3.create(n, n, n);
  }
}
// V3 ------------------------- ends
// Qt ------------------------- starts
export interface IQtReadonly {
  /**
   * Gets x value
   */
  get x(): number;
  /**
   * Gets y value
   */
  get y(): number;
  /**
   * Gets z value
   */
  get z(): number;
  /**
   * Gets w value
   */
  get w(): number;
  /**
   * Computes forward direction for that rotation as normalized unit vector
   */
  get fw(): V3;
  /**
   * Computes forward direction for that rotation as normalized unit vector
   */
  get forward(): V3;
  /**
   * Computes back direction for that rotation as normalized unit vector
   */
  get bk(): V3;
  /**
   * Computes back direction for that rotation as normalized unit vector
   */
  get back(): V3;
  /**
   * Computes up direction for that rotation as normalized unit vector
   */
  get up(): V3;
  /**
   * Computes down direction for that rotation as normalized unit vector
   */
  get dn(): V3;
  /**
   * Computes down direction for that rotation as normalized unit vector
   */
  get down(): V3;
  /**
   * Computes left direction for that rotation as normalized unit vector
   */
  get lt(): V3;
  /**
   * Computes left direction for that rotation as normalized unit vector
   */
  get left(): V3;
  /**
   * Computes right direction for that rotation as normalized unit vector
   */
  get rt(): V3;
  /**
   * Computes right direction for that rotation as normalized unit vector
   */
  get right(): V3;
  /**
   * Computes horizontal forward direction for that rotation as normalized unit vector
   */
  get horzFw(): V3;
  /**
   * Creates new normalized unit quaternion, from the current quaternion
   */
  get normalized(): Qt;
  /**
   * Clones as writable
   */
  cloneAsWritable(): Qt;
  /**
   * Clones as readonly
   */
  cloneAsReadonly(): IQtReadonly;
  /**
   * Gets value by index, 0=x, 1=y, 2=z, 3=w
   * @param index
   * @returns value
   */
  getByIndex(index: number): number;
  /**
   * Creates new writable quaternion, if it is already writable passes reference to itself, implementation of IQtReadonly interface
   */
  get ensureWritable(): Qt;
  /**
   * Creates new readonly quaternion, if it is already readonly returns reference to iself
   */
  get ensureReadonly(): QtReadonly;
  /**
   * returns string representation of this quaternion rounded to n decimal places
   * @param n - number of decimal places to round to
   */
  toStringRoundTo(n: number);
  /**
   * Determines whether is equal to another quaternion within delta 0.0000001
   * @param other - other quaternion
   * @returns true if equal
   */
  isEqual(other: IQtReadonly): boolean;
  /**
   * Returns new quaternion that represents converts quaternion to vector representation of euler angles
   */
  toEuler(): V3;
  /**
   * Returns new quaternion that represents spherical linear interpolation from one rotation to another
   */
  rotateTo(q2: IQtReadonly, t: number): Qt;
  /**
   * Returns new quaternion that represents invertion of current quaternion
   */
  invert(): Qt;
  /**
   * Returns new quaternion that represents multiplication of the current quaternion by another quaternion
   * @param rhs - quaternion to multiply by
   */
  mul(rhs: IQtReadonly): Qt;
  /**
   * Deconstructs this quaternion into its individual components: axis and degrees rotation
   * @returns tuple of degrees and axis
   */
  toAngleAxis(): [number, V3];
  /**
   * Dot product with another quaternion
   * @param other - quaternion to dot with
   */
  dot(other: IQtReadonly): number;
  /**
   * Degrees rotation to another quaternion
   * @param other - another quaternion
   * @returns degrees rotation
   */
  degreesTo(other: IQtReadonly): number;
  /**
   * Returns new quaternion that represents multiplication of the current quaternion by numeric value
   * @param n - numeric value to multiply by
   */
  mulBy(n: number): Qt;
  /**
   * Returns new quaternion that represents addition to the current quaternion of another quaternion
   * @param other - another quaternion
   */
  add(other: IQtReadonly): Qt;
  /**
   * Returns new quaternion that represents multiplication of the current quaternion by another quaternion
   * @param other - another quaternion
   */
  mulV3(v: IV3Readonly): V3;
  /**
   * Returns new quaternion that represents convertion of local rotation to global providing the parent
   */
  toGlobal(parent: IQtReadonly): Qt;
  /**
   * Returns new quaternion that represents convertion of global rotation to local providing the parent
   */
  toLocal(parent: IQtReadonly): Qt;
}
export class QtReadonly implements IQtReadonly {
  private readonly _x: number;
  private readonly _y: number;
  private readonly _z: number;
  private readonly _w: number;
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }
  /**
   * Gets x value
   */
  get x(): number {
    return this._x;
  }
  /**
   * Gets y value
   */
  get y(): number {
    return this._y;
  }
  /**
   * Gets z value
   */
  get z(): number {
    return this._z;
  }
  /**
   * Gets w value
   */
  get w(): number {
    return this._w;
  }
  /**
   * Computes forward direction for that rotation as normalized unit vector
   */
  get fw(): V3 {
    return Math3D.mulQtByXYZ(this, 0, 0, +1);
  }
  /**
   * Computes forward direction for that rotation as normalized unit vector
   */
  get forward(): V3 {
    return Math3D.mulQtByXYZ(this, 0, 0, +1);
  }
  /**
   * Computes back direction for that rotation as normalized unit vector
   */
  get bk(): V3 {
    return Math3D.mulQtByXYZ(this, 0, 0, -1);
  }
  /**
   * Computes back direction for that rotation as normalized unit vector
   */
  get back(): V3 {
    return Math3D.mulQtByXYZ(this, 0, 0, -1);
  }
  /**
   * Computes up direction for that rotation as normalized unit vector
   */
  get up(): V3 {
    return Math3D.mulQtByXYZ(this, 0, +1, 0);
  }
  /**
   * Computes down direction for that rotation as normalized unit vector
   */
  get dn(): V3 {
    return Math3D.mulQtByXYZ(this, 0, -1, 0);
  }
  /**
   * Computes down direction for that rotation as normalized unit vector
   */
  get down(): V3 {
    return Math3D.mulQtByXYZ(this, 0, -1, 0);
  }
  /**
   * Computes left direction for that rotation as normalized unit vector
   */
  get lt(): V3 {
    return Math3D.mulQtByXYZ(this, +1, 0, 0);
  }
  /**
   * Computes left direction for that rotation as normalized unit vector
   */
  get left(): V3 {
    return Math3D.mulQtByXYZ(this, +1, 0, 0);
  }
  /**
   * Computes right direction for that rotation as normalized unit vector
   */
  get rt(): V3 {
    return Math3D.mulQtByXYZ(this, -1, 0, 0);
  }
  /**
   * Computes right direction for that rotation as normalized unit vector
   */
  get right(): V3 {
    return Math3D.mulQtByXYZ(this, -1, 0, 0);
  }
  /**
   * Computes horizontal forward direction for that rotation as normalized unit vector
   */
  get horzFw(): V3 {
    return Math3D.mulQtByXYZ(this, 0, 0, +1).setY_(0).normalized;
  }
  /**
   * returns string representation of this quaternion
   */
  toString(): string {
    return `QtReadonly(${this._x},${this._y},${this._z},${this._w})`;
  }
  /**
   * returns string representation of this quaternion rounded to n decimal places
   * @param n - number of decimal places to round to
   */
  toStringRoundTo(n: number) {
    return `QtReadonly(${this.x.toFixed(n)}, ${this.y.toFixed(n)}, ${this.z.toFixed(
      n,
    )}, ${this.w.toFixed(n)})`;
  }
  /**
   * Clones as writable, implementation of IQtReadonly interface
   */
  cloneAsWritable(): Qt {
    return Qt.create(this._x, this._y, this._z, this._w);
  }
  /**
   * Clones as readonly, implementation of IQtReadonly interface
   */
  cloneAsReadonly(): IQtReadonly {
    return new QtReadonly(this._x, this._y, this._z, this._w);
  }
  /**
   * Gets value by index, 0=x, 1=y, 2=z, 3=w
   * @param index
   * @returns value
   */
  getByIndex(index: number): number {
    if (index == 0) return this._x;
    if (index == 1) return this._y;
    if (index == 2) return this._z;
    if (index == 3) return this._w;
    throw new Error(`Invalid index ${index}`);
  }
  /**
   * Creates new writable quaternion, implementation of IQtReadonly interface
   */
  get ensureWritable(): Qt {
    return Qt.create(this._x, this._y, this._z, this._w);
  }
  /**
   * returns reference to itself, implementation of IQtReadonly interface
   */
  get ensureReadonly(): QtReadonly {
    return this;
  }
  /**
   * Determines whether is equal to another quaternion within delta 0.0000001
   * @param other - other quaternion
   * @returns true if equal
   */
  isEqual(other: IQtReadonly): boolean {
    if (Math.abs(this._x - other.x) > 0.0000001) return false;
    if (Math.abs(this._y - other.y) > 0.0000001) return false;
    if (Math.abs(this._z - other.z) > 0.0000001) return false;
    if (Math.abs(this._w - other.w) > 0.0000001) return false;

    return true;
  }
  /**
   * Creates new normalized unit quaternion, from the current quaternion
   */
  get normalized(): Qt {
    const ls = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

    if (ls == 0) return Qt.create(0, 0, 0, 0);

    const invnorm = 1.0 / Math.sqrt(ls);

    const ansX = this.x * invnorm;
    const ansY = this.y * invnorm;
    const ansZ = this.z * invnorm;
    const ansW = this.w * invnorm;

    return Qt.create(ansX, ansY, ansZ, ansW);
  }
  /**
   * Returns new quaternion that represents converts quaternion to vector representation of euler angles
   */
  toEuler(): V3 {
    return Math3D.quaternionToEuler(this);
  }
  /**
   * Returns new quaternion that represents spherical linear interpolation from one rotation to another
   */
  rotateTo(q2: IQtReadonly, t: number): Qt {
    return Math3D.slerpQuaternions(this, q2, t);
  }
  /**
   * Returns new quaternion that represents convertion of local rotation to global providing the parent
   */
  toGlobal(parent: IQtReadonly): Qt {
    return parent.mul(this);
  }
  /**
   * Returns new quaternion that represents convertion of global rotation to local providing the parent
   */
  toLocal(parent: IQtReadonly): Qt {
    return parent.cloneAsWritable().invert_().mul_(this);
  }
  /**
   * Returns new quaternion that represents invertion of current quaternion
   */
  invert(): Qt {
    return Math3D.invertQuaternion(this);
  }
  /**
   * Returns new quaternion that represents multiplication of the current quaternion by another quaternion
   * @param rhs - quaternion to multiply by
   */
  mul(rhs: IQtReadonly): Qt {
    return Math3D.multiplyQuaternions(this, rhs);
  }
  /**
   * Deconstructs this quaternion into its individual components: axis and degrees rotation
   * @returns tuple of degrees and axis
   */
  toAngleAxis(): [number, V3] {
    return Math3D.quaternionToAngleAxis(this);
  }
  /**
   * Dot product with another quaternion
   * @param other - quaternion to dot with
   */
  dot(other: IQtReadonly): number {
    return this._x * other.x + this._y * other.y + this._z * other.z + this._w * other.w;
  }
  /**
   * Degrees rotation to another quaternion
   * @param other - another quaternion
   * @returns degrees rotation
   */
  degreesTo(other: IQtReadonly): number {
    const dp = this.dot(other);
    return Math3D.isEqualUsingDotProduct(dp)
      ? 0.0
      : Math.acos(Math.min(Math.abs(dp), 1)) * 2.0 * Rad2Deg;
  }
  /**
   * Returns new quaternion that represents multiplication of the current quaternion by numeric value
   * @param n - numeric value to multiply by
   */
  mulBy(n: number): Qt {
    return Qt.create(this.x * n, this.y * n, this.z * n, this.w * n);
  }
  /**
   * Clones quaternion
   */
  clone(): QtReadonly {
    return new QtReadonly(this.x, this.y, this.z, this.w);
  }
  /**
   * Returns new quaternion that represents addition to the current quaternion of another quaternion
   * @param other - another quaternion
   */
  add(other: IQtReadonly): Qt {
    return Qt.create(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
  }
  /**
   * Returns new quaternion that represents multiplication of the current quaternion by another quaternion
   * @param other - another quaternion
   */
  mulV3(v: IV3Readonly): V3 {
    return Math3D.multiplyQuaternionAndVector(this, v);
  }
}
export class Qt implements IQtReadonly {
  private _x: number;
  private _y: number;
  private _z: number;
  private _w: number;
  private _isChanged: boolean;
  private _scopeId: number;
  static readonly identity = new QtReadonly(0, 0, 0, 1);
  private constructor(x = 0, y = 0, z = 0, w = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
    this._isChanged = true;
    this._scopeId = NaN;
  }
  /**
   * Creates Qt quaternion, if object pool is active, and has available objects will recycle object from the pool, otherwise will create new
   * @param [x] - x value, 0 by default
   * @param [y] - y value, 0 by default
   * @param [z] - z value, 0 by default
   * @param [w] - w value, 1 by default
   */
  static create(x = 0, y = 0, z = 0, w = 1): Qt {
    if (objPool && objPool.isActive) {
      let qt = <Qt>objPool.getObj(PoolObjType.Qt);
      if (!qt) {
        qt = new Qt(x, y, z, w);
        objPool.setObj(PoolObjType.Qt, qt);
      } else {
        qt.x = x;
        qt.y = y;
        qt.z = z;
        qt.w = w;
      }
      return qt.setScope(objPool.scopeId);
    }
    return new Qt(x, y, z, w);
  }
  /**
   * Creates Qt quaternion, regardless if object pool is active, or not it will create new permanent object, not managed by pool
   * @param [x] - x value, 0 by default
   * @param [y] - y value, 0 by default
   * @param [z] - z value, 0 by default
   * @param [w] - w value, 1 by default
   */
  static createPermanent(x = 0, y = 0, z = 0, w = 1): Qt {
    return new Qt(x, y, z, w);
  }
  /**
   * Clones Qt quaternion, regardless if object pool is active, or not it will create new permanent object, not managed by pool
   */
  get permanent(): Qt {
    return Qt.createPermanent(this.x, this.y, this.z, this.w);
  }
  /**
   * Sets pool scope
   * @param scopeId - scope ID
   */
  setScope(scopeId: number): Qt {
    this._scopeId = scopeId;
    return this;
  }
  /**
   * Gets x value
   */
  get x(): number {
    objPool.verifyScope(this._scopeId);
    return this._x;
  }
  /**
   * Sets x value
   */
  set x(n: number) {
    if (Math.abs(n - this._x) < 0.000001) return;
    this._isChanged = true;
    this._x = n;
  }
  /**
   * Gets y value
   */
  get y(): number {
    objPool.verifyScope(this._scopeId);
    return this._y;
  }
  /**
   * Sets y value
   */
  set y(n: number) {
    if (Math.abs(n - this._y) < 0.000001) return;
    this._isChanged = true;
    this._y = n;
  }
  /**
   * Gets z value
   */
  get z(): number {
    objPool.verifyScope(this._scopeId);
    return this._z;
  }
  /**
   * Sets z value
   */
  set z(n: number) {
    if (Math.abs(n - this._z) < 0.000001) return;
    this._isChanged = true;
    this._z = n;
  }
  /**
   * Gets w value
   */
  get w(): number {
    objPool.verifyScope(this._scopeId);
    return this._w;
  }
  /**
   * Sets w value
   */
  set w(n: number) {
    if (Math.abs(n - this._w) < 0.000001) return;
    this._isChanged = true;
    this._w = n;
  }
  /**
   * Computes forward direction for that rotation as normalized unit vector
   */
  get fw(): V3 {
    return Math3D.mulQtByXYZ(this, 0, 0, +1);
  }
  /**
   * Computes forward direction for that rotation as normalized unit vector
   */
  get forward(): V3 {
    return Math3D.mulQtByXYZ(this, 0, 0, +1);
  }
  /**
   * Computes back direction for that rotation as normalized unit vector
   */
  get bk(): V3 {
    return Math3D.mulQtByXYZ(this, 0, 0, -1);
  }
  /**
   * Computes back direction for that rotation as normalized unit vector
   */
  get back(): V3 {
    return Math3D.mulQtByXYZ(this, 0, 0, -1);
  }
  /**
   * Computes up direction for that rotation as normalized unit vector
   */
  get up(): V3 {
    return Math3D.mulQtByXYZ(this, 0, +1, 0);
  }
  /**
   * Computes down direction for that rotation as normalized unit vector
   */
  get dn(): V3 {
    return Math3D.mulQtByXYZ(this, 0, -1, 0);
  }
  /**
   * Computes down direction for that rotation as normalized unit vector
   */
  get down(): V3 {
    return Math3D.mulQtByXYZ(this, 0, -1, 0);
  }
  /**
   * Computes left direction for that rotation as normalized unit vector
   */
  get lt(): V3 {
    return Math3D.mulQtByXYZ(this, +1, 0, 0);
  }
  /**
   * Computes left direction for that rotation as normalized unit vector
   */
  get left(): V3 {
    return Math3D.mulQtByXYZ(this, +1, 0, 0);
  }
  /**
   * Computes right direction for that rotation as normalized unit vector
   */
  get rt(): V3 {
    return Math3D.mulQtByXYZ(this, -1, 0, 0);
  }
  /**
   * Computes right direction for that rotation as normalized unit vector
   */
  get right(): V3 {
    return Math3D.mulQtByXYZ(this, -1, 0, 0);
  }
  /**
   * Computes horizontal forward direction for that rotation as normalized unit vector
   */
  get horzFw(): V3 {
    return Math3D.mulQtByXYZ(this, 0, 0, +1).setY_(0).normalized;
  }
  /**
   * Flag indicating whether is changed
   */
  get isChanged(): boolean {
    return this._isChanged;
  }
  /**
   * String representation of quaternion
   */
  toString(): string {
    return `Qt.create(${this._x},${this._y},${this._z},${this._w})`;
  }
  /**
   * returns string representation of this quaternion rounded to n decimal places
   * @param n - number of decimal places to round to
   */
  toStringRoundTo(n: number) {
    const a = this._x.toFixed(n);
    const b = this._y.toFixed(n);
    const c = this._z.toFixed(n);
    const d = this._w.toFixed(n);
    return `Qt.create(${a},${b},${c},${d})`;
  }
  /**
   * Creates new QtReadonly vector with the same x, y, z and w values
   */
  get readonly(): IQtReadonly {
    return new QtReadonly(this._x, this._y, this._z, this._w);
  }
  /**
   * Creates new QtReadonly vector with the same x, y, z and w values
   */
  get ensureReadonly(): QtReadonly {
    return new QtReadonly(this._x, this._y, this._z, this._w);
  }
  /**
   * Clones as writable, implementation of IQtReadonly interface
   */
  cloneAsWritable(): Qt {
    return Qt.create(this._x, this._y, this._z, this._w);
  }
  /**
   * Clones as writable, implementation of IQtReadonly interface
   */
  cloneAsReadonly(): IQtReadonly {
    return new QtReadonly(this._x, this._y, this._z, this._w);
  }
  /**
   * Gets value by index, 0=x, 1=y, 2=z, 3=w
   * @param index
   * @returns value
   */
  getByIndex(index: number): number {
    if (index == 0) return this._x;
    if (index == 1) return this._y;
    if (index == 2) return this._z;
    if (index == 3) return this._w;
    throw new Error(`Invalid index ${index}`);
  }
  /**
   * Clones quaternion
   */
  clone(): Qt {
    return Qt.create(this._x, this._y, this._z, this._w);
  }
  /**
   * Markes it as processed
   */
  processedChange_(): Qt {
    this._isChanged = false;
    return this;
  }
  /**
   * Markes it as changed
   */
  markAsChanged_(): Qt {
    this._isChanged = true;
    return this;
  }

  /**
   * Creates new writable quaternion, implementation of IQtReadonly interface
   */
  get ensureWritable(): Qt {
    return this;
  }
  /**
   * Checks if is equal to another quaternion
   * @param other - quaternion to compare
   * @param [delta] - delta value, by default value is 0.000001
   * @returns true if equal
   */
  isEqual(other: IQtReadonly, delta = 0.0000001): boolean {
    if (Math.abs(this._x - other.x) > delta) return false;
    if (Math.abs(this._y - other.y) > delta) return false;
    if (Math.abs(this._z - other.z) > delta) return false;
    if (Math.abs(this._w - other.w) > delta) return false;

    return true;
  }
  /**
   * Creates new normalized unit quaternion, from the current quaternion
   */
  get normalized(): Qt {
    const ls = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

    if (ls == 0) return Qt.create(0, 0, 0, 1);

    const invnorm = 1.0 / Math.sqrt(ls);

    const ansX = this.x * invnorm;
    const ansY = this.y * invnorm;
    const ansZ = this.z * invnorm;
    const ansW = this.w * invnorm;

    return Qt.create(ansX, ansY, ansZ, ansW);
  }
  /**
   * Normalizes current quaternion
   */
  normalize_(): Qt {
    const ls = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

    if (ls == 0) return Qt.create(0, 0, 0, 1);

    const invnorm = 1.0 / Math.sqrt(ls);

    this.x = this.x * invnorm;
    this.y = this.y * invnorm;
    this.z = this.z * invnorm;
    this.w = this.w * invnorm;

    return this;
  }
  /**
   * Sets from another quaternion
   * @param other - another quaternion
   */
  setFrom_(other: IQtReadonly): Qt {
    if (!other) return this;
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
    this.w = other.w;
    return this;
  }
  /**
   * Sets from array wxyz x=0, y=1, z=2, w=3
   * @param arr - array of 4 numbers
   * @returns from array wxyz
   */
  setFromArrayWXYZ_(arr: number[]): Qt {
    if (!arr) return this;
    if (arr.length > 0) this.w = arr[0];
    if (arr.length > 1) this.x = arr[1];
    if (arr.length > 2) this.y = arr[2];
    if (arr.length > 3) this.z = arr[3];

    return this;
  }
  /**
   * Returns new quaternion that represents converts quaternion to vector representation of euler angles
   */
  toEuler(): V3 {
    return Math3D.quaternionToEuler(this);
  }
  /**
   * Returns new quaternion that represents spherical linear interpolation from one rotation to another
   */
  rotateTo(q2: IQtReadonly, t: number): Qt {
    return Math3D.slerpQuaternions(this, q2, t);
  }
  /**
   * Returns new quaternion that represents convertion of local rotation to global providing the parent
   */
  toGlobal(parent: IQtReadonly): Qt {
    return parent.mul(this);
  }
  /**
   * Returns new quaternion that represents convertion of global rotation to local providing the parent
   */
  toLocal(parent: IQtReadonly): Qt {
    return parent.cloneAsWritable().invert_().mul_(this);
  }
  /**
   * Returns new quaternion that represents invertion of current quaternion
   */
  invert(): Qt {
    return Math3D.invertQuaternion(this);
  }
  /**
   * Updates this quaternion so to invert the current quaternion
   */
  invert_(): Qt {
    const ls = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

    if (ls == 0) return this.cloneAsWritable();

    const invnorm = 1.0 / ls;

    this.x = -this.x * invnorm;
    this.y = -this.y * invnorm;
    this.z = -this.z * invnorm;
    this.w = this.w * invnorm;

    return this;
  }
  /**
   * Returns new quaternion that represents multiplication of the current quaternion by another quaternion
   * @param rhs - quaternion to multiply by
   */
  mul(rhs: IQtReadonly): Qt {
    return Math3D.multiplyQuaternions(this, rhs);
  }
  /**
   * Updates this quaternion so that it applies multiplication of the current quaternion by another quaternion
   * @param rhs - quaternion to multiply by
   */
  mul_(rhs: IQtReadonly): Qt {
    return Math3D.setQtAsMultiplication(this, this, rhs);
  }
  /**
   * Deconstructs this quaternion into its individual components: axis and degrees rotation
   * @returns tuple of degrees and axis
   */
  toAngleAxis(): [number, V3] {
    return Math3D.quaternionToAngleAxis(this);
  }
  /**
   * Dot product with another quaternion
   * @param other - quaternion to dot with
   */
  dot(other: IQtReadonly): number {
    return this._x * other.x + this._y * other.y + this._z * other.z + this._w * other.w;
  }
  /**
   * Degrees rotation to another quaternion
   * @param other - another quaternion
   * @returns degrees rotation
   */
  degreesTo(other: IQtReadonly): number {
    const dp = this.dot(other);
    return Math3D.isEqualUsingDotProduct(dp)
      ? 0.0
      : Math.acos(Math.min(Math.abs(dp), 1)) * 2.0 * Rad2Deg;
  }
  /**
   * Returns new quaternion that represents multiplication of the current quaternion by numeric value
   * @param n - numeric value to multiply by
   */
  mulBy(n: number): Qt {
    return Qt.create(this.x * n, this.y * n, this.z * n, this.w * n);
  }
  /**
   * Updated the current quaternion to apply multiplication of the current quaternion by numeric value
   * @param n - numeric value to multiply by
   */
  mulBy_(n: number): Qt {
    this.x *= n;
    this.y *= n;
    this.z *= n;
    this.w *= n;
    return this;
  }
  /**
   * Returns new quaternion that represents addition to the current quaternion of another quaternion
   * @param other - another quaternion
   */
  add(other: IQtReadonly): Qt {
    return Qt.create(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
  }
  /**
   * Updates the current quaternion so to apply addition to the current quaternion of another quaternion
   * @param other - another quaternion
   */
  add_(other: IQtReadonly): Qt {
    this.x += other.x;
    this.w += other.w;
    this.z += other.z;
    this.w += other.w;
    return this;
  }
  /**
   * Returns new quaternion that represents multiplication of the current quaternion by another quaternion
   * @param other - another quaternion
   */
  mulV3(v: IV3Readonly): V3 {
    return Math3D.multiplyQuaternionAndVector(this, v);
  }
}
// Qt ------------------------- ends
// Ray ------------------------- starts
export class Ray {
  constructor(public origin: IV3Readonly, public direction: IV3Readonly) {}
  /**
   * Sets the direction of the ray based on target point
   * @param point - target point
   * @returns reference to itself
   */
  lookAt(point: V3): Ray {
    this.direction = this.origin.dirTo(point);
    return this;
  }
  /**
   * Returns the distance between this ray and a plane, -1 if no intersection
   * @param planeNormal - plane normal vector
   * @param planePoint - plane point
   * @returns the distance to plane
   */
  distanceToPlane(planeNormal: IV3Readonly, planePoint: IV3Readonly): number {
    const norm = planeNormal.normalized;
    const planeDistance = -norm.dot(planePoint);
    const a = this.direction.dot(norm);
    const num = -this.origin.dot(norm) - planeDistance;
    if (a > -0.000001 && a < 0.000001) {
      return -1;
    }
    return num / a;
  }
  /**
   * Returns intersection point between this ray and a plane, -1 if no intersection
   * @param planeNormal - plane normal vector
   * @param planePoint - plane point
   * @returns intersection point or NULL
   */
  intersectWithPlane(planeNormal: IV3Readonly, planePoint: IV3Readonly): V3 {
    const norm = planeNormal.normalized;
    const planeDistance = -norm.dot(planePoint);
    const a = this.direction.dot(norm);
    const num = -this.origin.dot(norm) - planeDistance;
    if (a > -0.000001 && a < 0.000001) {
      return null;
    }
    const distanceToCollision = num / a;
    if (distanceToCollision > 0.0) {
      return this.origin.add(this.direction.mulBy(distanceToCollision));
    }
    return null;
  }
  /**
   * Returns intersection points (inside tuple) between this ray and sphere, [NULL, NULL] if no intersection
   * @param sphereCenter - sphere center
   * @param sphereRadius - sphere radius
   * @returns tuple of both intersection points or tuple of 2 NULLs
   */
  intersectWithSphereBothSides(sphereCenter: IV3Readonly, sphereRadius: number): [V3, V3] {
    const radiusSquared = sphereRadius * sphereRadius;
    const rayToSphere = sphereCenter.sub(this.origin);
    const tca = rayToSphere.dot(this.direction);
    const d2 = rayToSphere.dot(rayToSphere) - tca * tca;
    if (d2 > radiusSquared) {
      return [null, null];
    }
    const thc = Math.sqrt(radiusSquared - d2);
    const t0 = tca - thc; // distance to one intersection point
    const t1 = tca + thc; // distance to the other intersection point
    const p0 = t0 < 0 ? null : this.origin.add(this.direction.mulBy(t0));
    const p1 = t1 < 0 ? null : this.origin.add(this.direction.mulBy(t1));
    return [p0, p1];
  }
  /**
   * Returns nearest intersection point between this ray and sphere, NULL if no intersection
   * @param sphereCenter - sphere center
   * @param sphereRadius - sphere radius
   * @returns nearest intersection point or NULL
   */
  intersectWithSphere(sphereCenter: IV3Readonly, sphereRadius: number): V3 {
    const radiusSquared = sphereRadius * sphereRadius;
    const rayToSphere = sphereCenter.sub(this.origin);
    const tca = rayToSphere.dot(this.direction);
    const d2 = rayToSphere.dot(rayToSphere) - tca * tca;
    if (d2 > radiusSquared) {
      return null;
    }
    const thc = Math.sqrt(radiusSquared - d2);
    let t0 = tca - thc; // distance to one intersection point
    let t1 = tca + thc; // distance to the other intersection point

    // make sure t0 is the nearest, t1 is the furdest point
    if (t0 > t1) {
      const temp = t0;
      t0 = t1;
      t1 = temp;
    }

    // if the distance to the nearest is negative
    if (t0 < 0) {
      t0 = t1; // if t0 is negative, let's use t1 instead
      if (t0 < 0) {
        return null; // both t0 and t1 are negative
      }
    }
    return this.origin.add(this.direction.mulBy(t0));
  }
  /**
   * Returns furthest intersection point between this ray and sphere, NULL if no intersection
   * @param sphereCenter - sphere center
   * @param sphereRadius - sphere radius
   * @returns furthest intersection point or NULL
   */
  intersectWithSphereBack(sphereCenter: IV3Readonly, sphereRadius: number): V3 {
    const radiusSquared = sphereRadius * sphereRadius;
    const rayToSphere = sphereCenter.sub(this.origin);
    const tca = rayToSphere.dot(this.direction);
    const d2 = rayToSphere.dot(rayToSphere) - tca * tca;
    if (d2 > radiusSquared) {
      return null;
    }
    const thc = Math.sqrt(radiusSquared - d2);
    let t0 = tca - thc; // distance to one intersection point
    let t1 = tca + thc; // distance to the other intersection point

    // make sure t0 is the nearest, t1 is the furdest point
    if (t0 > t1) {
      const temp = t0;
      t0 = t1;
      t1 = temp;
    }

    // if the distance to the furthest is negative
    if (t1 < 0) {
      t1 = t0; // if t1 is negative, let's use t0 instead
      if (t1 < 0) {
        return null; // both t0 and t1 are negative
      }
    }
    return this.origin.add(this.direction.mulBy(t1));
  }
  /**
   * String representation of the current ray
   */
  toString(): string {
    return `new Ray(${this.origin}, ${this.direction})`;
  }
}
// Ray ------------------------- ends

// Math3D ------------------------- starts
/**
 * 3D math static functions
 */
export class Math3D {
  /**
   * Rotates point about pivot point and axis
   * @param rotatePoint - point to rotate
   * @param pivot - pivot point
   * @param axis - axis of rotation
   * @param degrees - rotation angle in degrees
   * @returns rotated point
   */
  static rotatePointAboutPivotAndAxis(
    rotatePoint: IV3Readonly,
    pivot: IV3Readonly,
    axis: IV3Readonly,
    degrees: number,
  ): V3 {
    const rotation = axis.axisDegRotation(degrees);
    const point = rotatePoint.sub(pivot);
    const num1 = rotation.x * 2.0;
    const num2 = rotation.y * 2.0;
    const num3 = rotation.z * 2.0;
    const num4 = rotation.x * num1;
    const num5 = rotation.y * num2;
    const num6 = rotation.z * num3;
    const num7 = rotation.x * num2;
    const num8 = rotation.x * num3;
    const num9 = rotation.y * num3;
    const num10 = rotation.w * num1;
    const num11 = rotation.w * num2;
    const num12 = rotation.w * num3;
    const vector3 = V3.create();
    vector3.x =
      (1.0 - (num5 + num6)) * point.x + (num7 - num12) * point.y + (num8 + num11) * point.z;
    vector3.y =
      (num7 + num12) * point.x + (1.0 - (num4 + num6)) * point.y + (num9 - num10) * point.z;
    vector3.z =
      (num8 - num11) * point.x + (num9 + num10) * point.y + (1.0 - (num4 + num5)) * point.z;
    return vector3.add(pivot);
  }
  /**
   * Multiply quaternion by vector, while passing the vector as separate X,Y, and Z components
   * @param q - quaternion rotation
   * @param vx - vector X component
   * @param vy - vector Y component
   * @param vz - vector Z component
   * @returns point result of multiplication of quaternion and point
   */
  static mulQtByXYZ(q: IQtReadonly, vx: number, vy: number, vz: number): V3 {
    const x = q.x * 2.0;
    const y = q.y * 2.0;
    const z = q.z * 2.0;
    const xx = q.x * x;
    const yy = q.y * y;
    const zz = q.z * z;
    const xy = q.x * y;
    const xz = q.x * z;
    const yz = q.y * z;
    const wx = q.w * x;
    const wy = q.w * y;
    const wz = q.w * z;

    const rx = (1.0 - (yy + zz)) * vx + (xy - wz) * vy + (xz + wy) * vz;
    const ry = (xy + wz) * vx + (1.0 - (xx + zz)) * vy + (yz - wx) * vz;
    const rz = (xz - wy) * vx + (yz + wx) * vy + (1.0 - (xx + yy)) * vz;
    return V3.create(rx, ry, rz);
  }
  /**
   * Rotates one vector towards another by fraction
   * @param lhs - first vector
   * @param rhs - second vector
   * @param progress01 - fraction of rotation from 0 to 1
   * @returns rotated vector
   */
  static rotateOneVectorTowardsAnotherByFraction(
    lhs: IV3Readonly,
    rhs: IV3Readonly,
    progress01: number,
  ): V3 {
    const mag = lhs.magnitude;
    if (isNumEqual(progress01, 0, 0.00001)) return lhs.cloneAsWritable();
    if (isNumEqual(progress01, 1, 0.00001)) return rhs.cloneAsWritable().withLength(mag);
    const crossProd = lhs.cross(rhs);
    const normal = crossProd.normalized;
    const degrees = Math.atan2(normal.dot(crossProd), lhs.dot(rhs)) * Rad2Deg;
    return lhs.rotate(normal.axisDegRotation(degrees * progress01));
  }
  /**
   * Given forward direction and approximate up direction, returns real up
   * @param fw - forward direction
   * @param rawUp - approximate up direction
   * @returns real up
   */
  static getRealUp(fw: IV3Readonly, rawUp: IV3Readonly): V3 {
    const fwDir = fw.normalized;
    const right = rawUp.cross(fwDir).normalized;
    return fw.cross(right).normalized;
  }
  /**
   * Projects unit vector (direction) on a plane
   * @param vec - unit vector (direction)
   * @param planeNormal - plane normal vector
   * @returns unit vection (direction) after projection on a plane
   */
  static projectDirOnPlane(vec: IV3Readonly, planeNormal: IV3Readonly): V3 {
    return Math3D.projectVecOnPlane(vec, planeNormal).normalized;
  }
  /**
   * Projects vector on a plane
   * @param vec - vector to project
   * @param planeNormal - plane normal
   * @returns vector projection on the plane
   */
  static projectVecOnPlane(vec: IV3Readonly, planeNormal: IV3Readonly): V3 {
    const distance = planeNormal.dot(vec) * -1;
    return vec.add(planeNormal.mulBy(distance));
  }
  /**
   * Projects vector on a normal
   * @param vec - vector to project
   * @param onNormal - normal to project on
   * @returns vector after projection on the normal
   */
  static projectVecOnNormal(vec: IV3Readonly, onNormal: IV3Readonly): V3 {
    const norm = onNormal.normalized;
    const dotProduct = norm.x * norm.x + norm.y * norm.y + norm.z * norm.z;
    if (dotProduct < 0.000001) return V3.create(0, 0, 0);
    return norm.mulBy(vec.dot(norm)).divBy_(dotProduct);
  }
  /**
   * Projects point on a line
   * @param point - point to project
   * @param line1 - line point 1
   * @param line2 - line point 2
   * @returns point on line after prokection
   */
  static projectPointOnLine(point: IV3Readonly, line1: IV3Readonly, line2: IV3Readonly): V3 {
    const pointToLine = point.sub(line1);
    const lineVector = line2.sub(line1).normalized;
    const onNormal = Math3D.projectVecOnNormal(pointToLine, lineVector);
    return onNormal.add(line1);
  }
  /**
   * Determines whether point is below a plane
   * @param point - point to check
   * @param planeNormal - plane normal
   * @param planePoint - any point on the plane
   * @returns true if point below plane
   */
  static isPointBelowPlane(
    point: IV3Readonly,
    planeNormal: IV3Readonly,
    planePoint: IV3Readonly,
  ): boolean {
    const vectorToPlane = point.sub(planePoint).normalized;
    const distance = -vectorToPlane.dot(planeNormal);
    return distance > 0;
  }
  /**
   * Determines whether point is above a plane
   * @param point - point to check
   * @param planeNormal - plane normal
   * @param planePoint - any point on the plane
   * @returns true if point above plane
   */
  static isPointAbovePlane(
    point: IV3Readonly,
    planeNormal: IV3Readonly,
    planePoint: IV3Readonly,
  ): boolean {
    return !Math3D.isPointBelowPlane(point, planeNormal, planePoint);
  }
  /**
   * Determines whether vector is above a plane
   * @param vec - vector to check
   * @param planeNormal - plane normal
   * @returns true if vector above plane
   */
  static isVectorAbovePlane(vec: IV3Readonly, planeNormal: IV3Readonly): boolean {
    const distance = -vec.dot(planeNormal.normalized);
    return distance < 0;
  }
  /**
   * Determines whether vector is below a plane
   * @param vec - vector to check
   * @param planeNormal - plane normal
   * @returns true if vector below plane
   */
  static isVectorBelowPlane(vec: IV3Readonly, planeNormal: IV3Readonly): boolean {
    return !Math3D.isVectorAbovePlane(vec, planeNormal);
  }
  /**
   * Determines whether 2 vectors point in the same direction (less than 180 degrees apart)
   * @param vec - one vector
   * @param otherDir - another vector
   * @returns true if pointing same direction
   */
  static isSameDirAs(vec: IV3Readonly, otherDir: IV3Readonly): boolean {
    return vec.dot(otherDir) > 0;
  }
  /**
   * Determines whether 2 vectors point in different directions (more than 180 degrees apar)
   * @param vec - one vector
   * @param otherDir - another vector
   * @returns true if pointing in different directions
   */
  static isOppositeDirAs(vec: IV3Readonly, otherDir: IV3Readonly): boolean {
    return vec.dot(otherDir) > 0;
  }
  /**
   * Compared two vectors if they are pointing in the same direction, clones and returns the second, otherwise creates and returns negation of the second
   * @param vec - one vector
   * @param otherDir - another vector
   */
  static ensureSameDir(vec: IV3Readonly, vectorToFlip: IV3Readonly): V3 {
    if (Math3D.isSameDirAs(vec, vectorToFlip)) return vectorToFlip.cloneAsWritable();
    return vectorToFlip.negated;
  }
  /**
   * Projects point on a plane
   * @param point - point to project
   * @param planeNormal - plane normal
   * @param planePoint - any point on the plane
   * @returns projected point on plane
   */
  static projectPointOnPlane(
    point: IV3Readonly,
    planeNormal: IV3Readonly,
    planePoint: IV3Readonly,
  ): V3 {
    const norm = planeNormal.ensureNormalized.ensureWritable;
    const vectorFromPlane = point.sub(planePoint);
    const distance = -norm.dot(vectorFromPlane);
    return point.add(norm.mulBy_(distance));
  }
  /**
   * Reflects point over plane
   * @param point - point to reflect
   * @param planeNormal - plane normal
   * @param planePoint - any point on the plane
   * @returns point reflection over plane
   */
  static reflectPointOverPlane(
    point: IV3Readonly,
    planeNormal: IV3Readonly,
    planePoint: IV3Readonly,
  ): V3 {
    const projection = Math3D.projectPointOnPlane(point, planeNormal, planePoint);
    const distance = point.distanceTo(projection);
    const dirToProj = point.dirTo(projection);
    return point.add(dirToProj.mulBy_(distance * 2));
  }
  /**
   * Gets normal of 3 points, i.e. 3 points form plane and this is the plane normal
   * @param p1 - point 1
   * @param p2 - point 2
   * @param p3 - point 3
   * @returns normal
   */
  static getNormalWithPoints(p1: IV3Readonly, p2: IV3Readonly, p3: IV3Readonly): V3 {
    const v1 = p2.sub(p1);
    const v2 = p3.sub(p1);
    return Math3D.getNormalWithVectors(v1, v2);
  }
  /**
   * Gets normal of 2 vectors, i.e. 2 vectors form plane and this is the plane normal
   * @param lhs - first vector
   * @param rhs - second vector
   * @returns normal with vectors
   */
  static getNormalWithVectors(lhs: IV3Readonly, rhs: IV3Readonly): V3 {
    // cross product
    const normal = V3.create(
      lhs.y * rhs.z - lhs.z * rhs.y,
      lhs.z * rhs.x - lhs.x * rhs.z,
      lhs.x * rhs.y - lhs.y * rhs.x,
    );
    // normalize:
    const sqLen = normal.x * normal.x + normal.y * normal.y + normal.z * normal.z;
    if (sqLen > 0.000001) return normal.divBy_(Math.sqrt(sqLen));
    else return V3.zero.cloneAsWritable();
  }
  /**
   * Quaternions to euler
   * @param q - quaternion to convert
   * @returns euler
   */
  static quaternionToEuler(q: IQtReadonly): V3 {
    // (x-axis rotation)
    const sinr_cosp = 2.0 * (q.w * q.x + q.y * q.z);
    const cosr_cosp = 1.0 - 2.0 * (q.x * q.x + q.y * q.y);
    const vx = Math.atan2(sinr_cosp, cosr_cosp);

    // (y-axis rotation)
    const sinp = 2 * (q.w * q.y - q.z * q.x);
    const vy = Math.abs(sinp) >= 1 ? (Math.PI / 2) * (sinp < 0 ? -1 : 1) : Math.asin(sinp);

    // (z-axis rotation)
    const siny_cosp = 2.0 * (q.w * q.z + q.x * q.y);
    const cosy_cosp = 1.0 - 2.0 * (q.y * q.y + q.z * q.z);
    const vz = Math.atan2(siny_cosp, cosy_cosp);
    return V3.create(vx, vy, vz);
  }
  /**
   * Slerps quaternions
   * @param lhs - left hand quaternion
   * @param rhs - right hand quaternion
   * @param progress01 - progress 0 to 1
   * @returns quaternion that represent transition from one to another quaternion, that much progress
   */
  static slerpQuaternions(lhs: IQtReadonly, rhs: IQtReadonly, progress01: number): Qt {
    if (progress01 == 0) return lhs.cloneAsWritable();
    if (progress01 == 1) return rhs.cloneAsWritable();
    if (lhs.isEqual(rhs)) return lhs.cloneAsWritable();

    const epsilon = 0.000001;
    // eslint-disable-next-line
    const q1 = lhs;

    let cosomega = q1.x * rhs.x + q1.y * rhs.y + q1.z * rhs.z + q1.w * rhs.w;

    let flip = false;

    if (cosomega < 0.0) {
      flip = true;
      cosomega = -cosomega;
    }

    let s1 = 0.0;
    let s2 = 0.0;

    if (cosomega > 1.0 - epsilon) {
      // too close, do straight linear interpolation.
      s1 = 1.0 - progress01;
      s2 = flip ? -progress01 : progress01;
    } else {
      const omega = Math.acos(cosomega);
      const invsinomega = 1 / Math.sin(omega);

      s1 = Math.sin((1.0 - progress01) * omega) * invsinomega;
      s2 = flip
        ? -Math.sin(progress01 * omega) * invsinomega
        : Math.sin(progress01 * omega) * invsinomega;
    }

    const qx = s1 * q1.x + s2 * rhs.x;
    const qy = s1 * q1.y + s2 * rhs.y;
    const qz = s1 * q1.z + s2 * rhs.z;
    const qw = s1 * q1.w + s2 * rhs.w;

    return Qt.create(qx, qy, qz, qw);
  }
  /**
   * Multiplys quaternions
   * @param lhs - left hand quaternion
   * @param rhs - right hand quaternion
   */
  static multiplyQuaternions(lhs: IQtReadonly, rhs: IQtReadonly): Qt {
    const q1x = lhs.x;
    const q1y = lhs.y;
    const q1z = lhs.z;
    const q1w = lhs.w;

    const q2x = rhs.x;
    const q2y = rhs.y;
    const q2z = rhs.z;
    const q2w = rhs.w;

    // cross(av, bv)
    const cx = q1y * q2z - q1z * q2y;
    const cy = q1z * q2x - q1x * q2z;
    const cz = q1x * q2y - q1y * q2x;

    const dot = q1x * q2x + q1y * q2y + q1z * q2z;

    const ansX = q1x * q2w + q2x * q1w + cx;
    const ansY = q1y * q2w + q2y * q1w + cy;
    const ansZ = q1z * q2w + q2z * q1w + cz;
    const ansW = q1w * q2w - dot;

    return Qt.create(ansX, ansY, ansZ, ansW);
  }
  /**
   * Multiplys quaternions
   * @param toSet - quaternion to update as multiplication of the following quaternions
   * @param lhs - left hand quaternion
   * @param rhs - right hand quaternion
   * @returns reference to the quaternion passed as first argument
   */
  static setQtAsMultiplication(toSet: Qt, lhs: IQtReadonly, rhs: IQtReadonly): Qt {
    const q1x = lhs.x;
    const q1y = lhs.y;
    const q1z = lhs.z;
    const q1w = lhs.w;

    const q2x = rhs.x;
    const q2y = rhs.y;
    const q2z = rhs.z;
    const q2w = rhs.w;

    // cross(av, bv)
    const cx = q1y * q2z - q1z * q2y;
    const cy = q1z * q2x - q1x * q2z;
    const cz = q1x * q2y - q1y * q2x;

    const dot = q1x * q2x + q1y * q2y + q1z * q2z;

    toSet.x = q1x * q2w + q2x * q1w + cx;
    toSet.y = q1y * q2w + q2y * q1w + cy;
    toSet.z = q1z * q2w + q2z * q1w + cz;
    toSet.w = q1w * q2w - dot;

    return toSet;
  }
  /**
   * Inverts quaternion
   * @param q - quaternion to invert
   * @returns inverted quaternion
   */
  static invertQuaternion(q: IQtReadonly): Qt {
    const ls = q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w;

    if (ls == 0) return q.cloneAsWritable();

    const invnorm = 1.0 / ls;

    const qx = -q.x * invnorm;
    const qy = -q.y * invnorm;
    const qz = -q.z * invnorm;
    const qw = q.w * invnorm;

    return Qt.create(qx, qy, qz, qw);
  }
  /**
   * @returns [angle in degrees, axis]
   */
  static quaternionToAngleAxis(q: IQtReadonly): [number, V3] {
    if (q.w > 1.0) q = q.normalized; // if w>1 acos and sqrt will produce errors, this cant happen if quaternion is normalised
    const angle = 2.0 * Math.acos(q.w);
    const s = Math.sqrt(1 - q.w * q.w); // assuming quaternion normalised then w is less than 1, so term always positive.
    const axis = V3.create();
    if (s < 0.000001) {
      // test to avoid divide by zero, s is always positive due to sqrt
      // if s close to zero then direction of axis not important
      axis.x = q.x; // if it is important that axis is normalised then replace with x=1; y=z=0;
      axis.y = q.y;
      axis.z = q.z;
    } else {
      axis.x = q.x / s; // normalise axis
      axis.y = q.y / s;
      axis.z = q.z / s;
    }
    return [angle * Rad2Deg, axis];
  }
  /**
   * Determines whether dot product signifies equality
   * @param dotProduct - dot product
   * @returns true if equal using dot product
   */
  static isEqualUsingDotProduct(dotProduct: number): boolean {
    return dotProduct > 0.99999;
  }
  /**
   * Multiplys quaternion and vector
   * @param q - quaternion to multiply
   * @param v - vector to multiply
   * @returns vector
   */
  static multiplyQuaternionAndVector(q: IQtReadonly, v: IV3Readonly): V3 {
    const x = q.x * 2.0;
    const y = q.y * 2.0;
    const z = q.z * 2.0;
    const xx = q.x * x;
    const yy = q.y * y;
    const zz = q.z * z;
    const xy = q.x * y;
    const xz = q.x * z;
    const yz = q.y * z;
    const wx = q.w * x;
    const wy = q.w * y;
    const wz = q.w * z;

    const rx = (1.0 - (yy + zz)) * v.x + (xy - wz) * v.y + (xz + wy) * v.z;
    const ry = (xy + wz) * v.x + (1.0 - (xx + zz)) * v.y + (yz - wx) * v.z;
    const rz = (xz - wy) * v.x + (yz + wx) * v.y + (1.0 - (xx + yy)) * v.z;
    return V3.create(rx, ry, rz);
  }
  /**
   * Returns position of point on a quadratic bezier curve
   * @param progress - progress to move along curve
   * @param start - start of curve
   * @param control - control point
   * @param end - end of curve
   * @returns point on curve
   */
  static quadraticBezierV3(
    progress: number,
    start: IV3Readonly,
    control: IV3Readonly,
    end: IV3Readonly,
  ): V3 {
    // https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Quadratic_B.C3.A9zier_curves
    // quadratic bezier formula is
    // [x,gety] =
    //      (1 - t)^2 * P0 +
    //      2 * (1 - t) * t * P1 +
    //      t^2 * P2
    // where 0 <= t <= 1

    const t = clamp(progress, 0, 1);
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;

    const p = start.mulBy(uu); //first term

    p.add_(control.mulBy(2 * u * t)); //second term

    p.add_(end.mulBy(tt)); //third term

    return p;
  }
  /**
   * Returns position of point on a relative quadratic bezier curve
   * @param progress - progress to move along curve
   * @param start - start of curve
   * @param control - relative vector that will devine control point by adding it to mid point betwen start and end
   * @param end - end of curve
   * @returns point on curve
   */
  static relQuardaticBezierV3(
    progress: number,
    start: IV3Readonly,
    control: IV3Readonly,
    end: IV3Readonly,
  ): V3 {
    return Math3D.quadraticBezierV3(progress, start, start.moveTo(end, 0.5).add_(control), end);
  }
  /**
   * Returns position of point on a cubic bezier curve
   * @param progress - progress to move along curve
   * @param start - start of curve
   * @param control1 - control 1 point
   * @param control2 - control 2 point
   * @param end - end of curve
   * @returns point on curve
   */
  static cubicBezierV3(
    progress: number,
    start: IV3Readonly,
    control1: IV3Readonly,
    control2: IV3Readonly,
    end: IV3Readonly,
  ): V3 {
    // cubic bezier formula is
    // [x,gety] =
    //      (1 - t)^3 * P0 +
    //      3 * (1 - t)^2 * t * P1 +
    //      3 * (1 - t) * t^2 * P2 +
    //      t^3 * P3
    // where 0 <= t <= 1

    const t = clamp(progress, 0, 1);
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    const p = start.mulBy(uuu); //first term

    p.add_(control1.mulBy(3 * uu * t)); //second term
    p.add_(control2.mulBy(3 * u * tt)); //third term
    p.add_(end.mulBy(ttt)); //fourth term

    return p;
  }
  /**
   * Returns position of point on a relative cubic bezier curve
   * @param progress - progress to move along curve
   * @param start - start of curve
   * @param control1 - relative vector that will devine control 1 point by adding it to start point
   * @param control2 - relative vector that will devine control 2 point by adding it to end point
   * @param end - end of curve
   * @returns point on curve
   */
  static relCubicBezierV3(
    progress: number,
    start: IV3Readonly,
    control1: IV3Readonly,
    control2: IV3Readonly,
    end: IV3Readonly,
  ): V3 {
    return Math3D.cubicBezierV3(progress, start, start.add(control1), end.add(control2), end);
  }
  /**
   * Euler to quaternion
   * @param [x] - euler x
   * @param [y] - euler y
   * @param [z] - euler z
   * @param [convertDegreesToRadians] - convert degrees to radians, false by default
   * @returns quaternion
   */
  static xyzEulerToQt(x = 0, y = 0, z = 0, convertDegreesToRadians = false): Qt {
    let vx = x;
    let vy = y;
    let vz = z;
    if (convertDegreesToRadians) {
      vx *= Deg2Rad;
      vy *= Deg2Rad;
      vz *= Deg2Rad;
    }

    const cy = Math.cos(vz * 0.5);
    const sy = Math.sin(vz * 0.5);
    const cp = Math.cos(vy * 0.5);
    const sp = Math.sin(vy * 0.5);
    const cr = Math.cos(vx * 0.5);
    const sr = Math.sin(vx * 0.5);

    const qw = cr * cp * cy + sr * sp * sy;
    const qx = sr * cp * cy - cr * sp * sy;
    const qy = cr * sp * cy + sr * cp * sy;
    const qz = cr * cp * sy - sr * sp * cy;

    return Qt.create(qx, qy, qz, qw);
  }
  /**
   * Sets quaternion as axis rotation
   * @param rot - quaternion to set
   * @param axis - axis to rotate around
   * @param degrees - rotation angles in degrees
   * @returns returns the same quaternion passed as first parameter
   */
  static setQtAsAxisRot(rot: Qt, axis: IV3Readonly, degrees: number): Qt {
    const radians = degrees * Deg2Rad;
    const halfAngle = radians * 0.5;
    const s = Math.sin(halfAngle);
    const c = Math.cos(halfAngle);

    rot.x = axis.x * s;
    rot.y = axis.y * s;
    rot.z = axis.z * s;
    rot.w = c;

    return rot;
  }
  /**
   * Converts V3 to V2
   * @param vec3 - vector to convert
   * @param xUnit - x axis as unit vector
   * @param yUnit - y axis as unit vector
   * @param [origin] - optional origin, or we assume origin 0,0,0
   * @returns V2
   */
  static convertV3ToV2(
    vec3: IV3Readonly,
    xUnit: IV3Readonly,
    yUnit: IV3Readonly,
    origin?: IV3Readonly,
  ): V2 {
    if (origin) {
      vec3 = vec3.sub(origin);
    }
    return V2.create(vec3.dot(xUnit), vec3.dot(yUnit));
  }
  /**
   * Converts V2 to 33
   * @param vec2 - vector to convert
   * @param xUnit - x axis as unit vector
   * @param yUnit - y axis as unit vector
   * @param [origin] - optional origin, or we assume origin 0,0,0
   * @returns V3
   */
  static convertV2ToV3(
    vec2: IV2Readonly,
    xUnit: IV3Readonly,
    yUnit: IV3Readonly,
    origin?: IV3Readonly,
  ): V3 {
    if (!origin) {
      origin = V3.zero;
    }
    return origin.add(xUnit.by(vec2.x)).add(yUnit.by(vec2.y));
  }
  /**
   * Determines whether point is within polygon
   * @param point - 2D point
   * @param polygon - polygon of 2D points
   * @returns true if point within polygon
   */
  static isPointWithinPolygon(point: IV2Readonly, polygon: IV2Readonly[]): boolean {
    let result = false;
    const count = polygon.length;
    let prevPoint = polygon[polygon.length - 1];
    for (let curr = 0; curr < count; curr++) {
      const currPoint = polygon[curr];

      if (
        currPoint.y > point.y != prevPoint.y > point.y &&
        point.x <
          ((prevPoint.x - currPoint.x) * (point.y - currPoint.y)) / (prevPoint.y - currPoint.y) +
            currPoint.x
      )
        result = !result;

      prevPoint = currPoint;
    }
    return result;
  }
  /**
   * Determines whether point is within polygon
   * ignoring Y dimension assuming X,Z flat land
   * @param point - 3D point, Y dimension will be ignored
   * @param polygon - polygon of 3D points where we ignore Y
   * @returns true if point within polygon
   */
  static isPointWithinPolygonIgnoreY(point: IV3Readonly, polygon: IV3Readonly[]): boolean {
    let result = false;
    const count = polygon.length;
    let prevPoint = polygon[polygon.length - 1];
    for (let curr = 0; curr < count; curr++) {
      const currPoint = polygon[curr];

      if (
        currPoint.z > point.z != prevPoint.z > point.z &&
        point.x <
          ((prevPoint.x - currPoint.x) * (point.z - currPoint.z)) / (prevPoint.z - currPoint.z) +
            currPoint.x
      )
        result = !result;

      prevPoint = currPoint;
    }
    return result;
  }
  /**
   * In a chain of nodes, given the previous forward and up diretions and the new node forward, find the up direction projection on the new node
   * @param prevFw - previous node forward
   * @param prevUp - previous node up
   * @param currFw - current node forward (normal for the plane we are projecting onto)
   * @returns up direction projected onto the current node forward plane
   */
  static projectUpDir(prevFw: IV3Readonly, prevUp: IV3Readonly, currFw: IV3Readonly): V3 {
    const prevRt = prevFw.cross(prevUp).ensureNormalized;
    currFw = currFw.ensureNormalized;
    const currUp = prevRt.cross(currFw).ensureNormalized;
    return currUp.ensureWritable;
  }
}
// Math3D ------------------------- ends
