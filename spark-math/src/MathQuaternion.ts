/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {Vector3} from './MathVectors';

const EPSILON = 0.0000001;

export class Quaternion {
  public w: number;
  public x: number;
  public y: number;
  public z: number;

  static get identity(): Quaternion {
    return new Quaternion(0, 0, 0, 1);
  }

  /**
   * Create a quaternion given an axis angle rotation
   * @param angle the angle to rotate
   * @param axis the axis to rotate around
   * @returns the quaternion
   */
  static createFromAngleAndAxis(angle: number, axis: Vector3): Quaternion {
    const halfAngle = angle / 2;
    const sineHalfA = Math.sin(halfAngle);
    const normAxis = axis.clone().normalize().scale(sineHalfA);
    return new Quaternion(normAxis.x, normAxis.y, normAxis.z, Math.cos(halfAngle));
  }

  /**
   * Create a quaternion given x,y,z euler angles
   * @param x x (or roll)
   * @param y y (or pitch)
   * @param z z (or yaw)
   * @returns the quaternion
   */
  static createFromEulerAngles(x: number, y: number, z: number): Quaternion {
    const cx = Math.cos(x * 0.5);
    const sx = Math.sin(x * 0.5);
    const cy = Math.cos(y * 0.5);
    const sy = Math.sin(y * 0.5);
    const cz = Math.cos(z * 0.5);
    const sz = Math.sin(z * 0.5);

    return new Quaternion(
      sx * cy * cz - cx * sy * sz,
      cx * sy * cz + sx * cy * sz,
      cx * cy * sz - sx * sy * cz,
      cx * cy * cz + sx * sy * sz,
    );
  }

  /**
   * Create a quaternion between 2 vectors such that start will convert to destination
   * Ref: https://www.xarg.org/proof/quaternion-from-two-vectors/
   * @param start the start vector
   * @param destination the destination vector
   * @returns the quaternion
   */
  static createBetweenVectors(start: Vector3, destination: Vector3): Quaternion {
    const u = start.clone().normalize();
    const v = destination.clone().normalize();

    // Vectors which are opposite need to be handled separately
    if (u.clone().neg().isEqual(v)) {
      const o = Vector3.orthogonal(u).normalize();
      return new Quaternion(o.x, o.y, o.z, 0);
    }

    const dot = Vector3.dot(u, v);
    const cross = Vector3.cross(u, v);
    const w = dot + Math.sqrt(u.squaredMagnitude * v.squaredMagnitude);
    return new Quaternion(cross.x, cross.y, cross.z, w).normalize();
  }

  constructor(x: number, y: number, z: number, w: number) {
    this.w = w;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Calculates and returns the magnitude of this quaternion
   * @returns the magnitude
   */
  public get magnitude(): number {
    return Math.sqrt(this.squaredMagnitude);
  }

  /**
   * Calculates and returns the square of the magnitude of this quaternion
   * @returns the squared magnitude
   */
  public get squaredMagnitude(): number {
    return this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z;
  }

  /**
   * Normalizes this Quaternion to have |Q| = 1
   * @returns this
   */
  public normalize(): Quaternion {
    const magnitude = this.magnitude;
    if (magnitude == 0) {
      return Quaternion.identity;
    }

    this.w /= magnitude;
    this.x /= magnitude;
    this.y /= magnitude;
    this.z /= magnitude;
    return this;
  }

  /**
   * Inverses this quaternion Q to Q^{-1} of a quaternion (even for non-normalized quaternions)
   * Q^{-1} * Q = 1 and Q * Q^{-1} = 1;
   * @returns this
   */
  public inverse(): Quaternion {
    const squaredMagnitude = this.squaredMagnitude;
    if (squaredMagnitude == 0) {
      return this;
    }

    this.w /= squaredMagnitude;
    this.x /= -squaredMagnitude;
    this.y /= -squaredMagnitude;
    this.z /= -squaredMagnitude;
    return this;
  }

  /**
   * Cross product the current quaternion with another quaternion using Hamiltonian product
   * @param other other quaternion
   * @returns this
   */
  public mul(other: Quaternion): Quaternion {
    this.copy(Quaternion.product(this, other));
    return this;
  }

  /**
   * Set Q to the conjugate Q'. For normalized quaternions conjugate is the inverse
   * @returns this
   */
  public conjugate(): Quaternion {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this;
  }

  /**
   * The euler angle representation of the quaternion
   * @returns the euler angle representation of the quaternion
   */
  public toEulerAngles(): Vector3 {
    const sinTheta = 2 * (this.w * this.y - this.z * this.x);
    return new Vector3(
      Math.atan2(
        2 * (this.w * this.x + this.y * this.z),
        this.w * this.w - this.x * this.x - this.y * this.y + this.z * this.z,
      ),
      sinTheta >= 1 ? Math.PI / 2 : sinTheta <= -1 ? -Math.PI / 2 : Math.asin(sinTheta),
      Math.atan2(
        2 * (this.w * this.z + this.x * this.y),
        this.w * this.w + this.x * this.x - this.y * this.y - this.z * this.z,
      ),
    );
  }

  /**
   * Returns a rotated vector by this quaternion Q.
   * This is usually QvQ' (Assuming Q is normalized)
   * But we can do it faster with this math
   * Ref: https://www.xarg.org/proof/vector-rotation-using-quaternions/
   * @returns the rotated vector
   */
  public rotateVector(u: Vector3): Vector3 {
    const q = this.clone().normalize();
    const v = new Vector3(q.x, q.y, q.z);
    const t = Vector3.cross(v, u).scale(2);
    return u.clone().add(t.clone().scale(q.w)).add(Vector3.cross(v, t));
  }

  /**
   * Checks if the current quaternion is equal to another quaternion
   * @param other the other quaternion
   * @param epsilon (optional) error tolerance for floating point comparison
   * @returns if the two quaternions are equal
   */
  public isEqual(other: Quaternion, epsilon?: number) {
    const tolerance = epsilon == null ? EPSILON : epsilon;
    if (Math.abs(this.w - other.w) > tolerance) return false;
    if (Math.abs(this.x - other.x) > tolerance) return false;
    if (Math.abs(this.y - other.y) > tolerance) return false;
    if (Math.abs(this.z - other.z) > tolerance) return false;
    return true;
  }

  /**
   * String representation of the quaternion
   */
  public toString(): string {
    return `Quaternion(${this.x},${this.y},${this.z},${this.w})`;
  }

  /**
   * The hamilton product of the quaternions
   * @param u: a quaternion
   * @param v: the other quaternion
   */
  static product(u: Quaternion, v: Quaternion) {
    return new Quaternion(
      u.w * v.x + u.x * v.w + u.y * v.z - u.z * v.y,
      u.w * v.y - u.x * v.z + u.y * v.w + u.z * v.x,
      u.w * v.z + u.x * v.y - u.y * v.x + u.z * v.w,
      u.w * v.w - u.x * v.x - u.y * v.y - u.z * v.z,
    );
  }

  /**
   * Copies another Quaternion into the current quaternion
   */
  public copy(other: Quaternion): Quaternion {
    this.w = other.w;
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
    return this;
  }

  /**
   * Creates a copy of the current quaternion
   */
  public clone(): Quaternion {
    return new Quaternion(this.x, this.y, this.z, this.w);
  }
}
