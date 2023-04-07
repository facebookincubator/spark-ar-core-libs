/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const EPSILON = 0.0000001;

/** Class representing a 3 dimensional vector */
export class Vector3 {
  public x = 0;
  public y = 0;
  public z = 0;

  static get up(): Vector3 {
    return new Vector3(0, 1, 0);
  }
  static get down(): Vector3 {
    return new Vector3(0, -1, 0);
  }
  static get forward(): Vector3 {
    return new Vector3(0, 0, 1);
  }
  static get back(): Vector3 {
    return new Vector3(0, 0, -1);
  }
  static get left(): Vector3 {
    return new Vector3(-1, 0, 0);
  }
  static get right(): Vector3 {
    return new Vector3(1, 0, 0);
  }
  static get identity(): Vector3 {
    return new Vector3(1, 1, 1);
  }
  static get zero(): Vector3 {
    return new Vector3(0, 0, 0);
  }

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Adds another vector to the current vector
   * @param other other vector
   * @returns this
   */
  public add(other: Vector3): Vector3 {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    return this;
  }

  /**
   * Subtracts another vector from the current vector
   * @param other other vector
   * @returns this
   */
  public sub(other: Vector3): Vector3 {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    return this;
  }

  /**
   * Cross product the current vector with another vector
   * @param other other vector
   * @returns this
   */
  public mul(other: Vector3): Vector3 {
    this.copy(Vector3.cross(this, other));
    return this;
  }

  /**
   * Negates the direction of this vector
   * @returns this
   */
  public neg(): Vector3 {
    return this.scale(-1);
  }

  /**
   * Scales the vector
   * @param scale scale to multiply to the vector
   * @returns this
   */
  public scale(scale: number): Vector3 {
    this.x *= scale;
    this.y *= scale;
    this.z *= scale;
    return this;
  }

  /**
   * Calculates and returns the magnitude of this vector
   * @returns the magnitude
   */
  public get magnitude(): number {
    return Math.sqrt(this.squaredMagnitude);
  }

  /**
   * Calculates and returns the square of the magnitude of this vector
   * @returns the squared magnitude
   */
  public get squaredMagnitude(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  /**
   * Normalizes this vector to have unit magnitude
   * @returns this
   */
  public normalize(): Vector3 {
    const magnitude = this.magnitude;
    if (magnitude == 0) {
      return this;
    }

    this.x /= magnitude;
    this.y /= magnitude;
    this.z /= magnitude;
    return this;
  }

  /**
   * Copies another Vector into the current vector
   */
  public copy(other: Vector3): Vector3 {
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
    return this;
  }

  /**
   * Returns a copy of the current vector
   * @returns the magnitude
   */
  public clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * Checks if the current vector is equal to another vector
   * @param other the other vector
   * @param epsilon (optional) error tolerance for floating point comparison
   * @returns if the two vector are equal
   */
  public isEqual(other: Vector3, epsilon?: number) {
    const tolerance = epsilon == null ? EPSILON : epsilon;
    if (Math.abs(this.x - other.x) > tolerance) return false;
    if (Math.abs(this.y - other.y) > tolerance) return false;
    if (Math.abs(this.z - other.z) > tolerance) return false;
    return true;
  }

  /**
   * String representation of the vector
   */
  public toString(): string {
    return `Vector3(${this.x},${this.y},${this.z})`;
  }

  /**
   * Returns the dot product of the two vectors
   * @param a first vector
   * @param b second vector
   * @returns the dot product of the two vectors
   */
  public static dot(a: Vector3, b: Vector3): number {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }
  /**
   * Returns the cross product of the two vectors
   * @param a first vector
   * @param b second vector
   * @returns the cross product of the two vectors
   */
  public static cross(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
  }

  /**
   * Returns the angle between the two vectors in radians
   * @param a first vector
   * @param b second vector
   * @returns the angle between the two vectors in radians
   */
  public static angle(a: Vector3, b: Vector3) {
    return Math.acos(Vector3.dot(a, b) / (a.magnitude * b.magnitude));
  }

  /**
   * Returns the distance between the two vectors
   * @param a first vector
   * @param b second vector
   * @returns the angle between the two vectors in radians
   */
  public static distance(a: Vector3, b: Vector3) {
    return a.clone().sub(b).magnitude;
  }

  /**
   * Returns an orthogonal vector to u, by using cross product with the most orthogonal basis
   * @param u vector to find an orthogonal vector to
   * @returns the vector which is orthogonal to u
   */
  public static orthogonal(u: Vector3) {
    const absX = Math.abs(u.x);
    const absY = Math.abs(u.y);
    const absZ = Math.abs(u.z);

    let other: Vector3;
    if (absX < absY) {
      other = absX < absZ ? Vector3.right : Vector3.forward;
    } else {
      other = absY < absZ ? Vector3.up : Vector3.forward;
    }
    return Vector3.cross(u, other);
  }
}
