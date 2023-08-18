/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/**
 * Spark Procedural Animations - 2D math, V2 - vector 2
 * version 0.9.4
 */

import {interpolate, Deg2Rad, Rad2Deg, sin, cos} from './spark.procedural-animations.core';
import {objPool, PoolObjType} from './spark.procedural-animations.pool';

export interface IV2Readonly {
  /**
   * Gets x value
   */
  get x(): number;
  /**
   * Gets y value
   */
  get y(): number;
  /**
   * Clones the readonly object as writable
   */
  cloneAsWritable(): V2;
  /**
   * Clones the readonly object as writable, or if it is already readonly returns reference
   */
  ensureWritable(): V2;
  /**
   * Determines whether is equal to another vector
   * @param other - another vector
   * @returns true if equal
   */
  isEqual(other: IV2Readonly): boolean;
  /**
   * Creates another vector that represents movement (measured as fraction of the distance) of this vector towards a target vector
   * @param target - another vector
   * @param t01 - progress aproaching another vector from 0 to 1
   */
  moveTo(target: IV2Readonly, t01: number): V2;
  /**
   * Creates another vector that represents movement (measured as distance) of this vector towards a target vector
   * @param target - another vector
   * @param moveByDistance - distance to move in that direction
   */
  moveTowards(target: IV2Readonly, maxDistanceDelta: number): V2;
  /**
   * Returns new vector that represents division of current vector by another vector
   * @param other - another vector
   */
  div(other: IV2Readonly): V2;
  /**
   * Returns new vector that represents division of current vector by numberic value
   * @param n - numberiic value to divide by
   */
  divBy(n: number): V2;
  /**
   * Returns new vector that represents multiplication of current vector by another vector
   * @param other - another vector
   */
  mul(other: IV2Readonly): V2;
  /**
   * Returns new vector that represents multiplication of current vector by numberic value
   * @param n - numberiic value to multiply by
   */
  mulBy(n: number): V2;
  /**
   * Returns new vector that represents addition of a numberic value to the current vector
   * @param n - numberiic value to add
   */
  addNumber(n: number): V2;
  /**
   * Returns new vector that represents addition of another vector to the current vector
   * @param other - another vector
   */
  add(other: IV2Readonly): V2;
  /**
   * Returns new vector that represents substraction of another vector from the current vector
   * @param other - another vector
   */
  sub(other: IV2Readonly): V2;
}
export class V2Readonly implements IV2Readonly {
  private readonly _x: number;
  private readonly _y: number;
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
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
   * Returns string representation
   */
  toString(): string {
    return `new V2Readonly(${this._x},${this._y}})`;
  }
  /**
   * Clones the readonly object as writable
   */
  cloneAsWritable(): V2 {
    return V2.create(this._x, this._y);
  }
  /**
   * Clones the readonly object as writable
   */
  ensureWritable(): V2 {
    return V2.create(this._x, this._y);
  }
  /**
   * Normalizes 2D vector
   * @param vx - x value
   * @param vy - y value
   * @returns creates V2Readonly as normalized
   */
  static normalizeXY(vx: number, vy: number): V2Readonly {
    const mag = Math.sqrt(vx * vx + vy * vy);
    if (mag < 0.0000001) {
      return new V2Readonly(0, 0);
    }
    return new V2Readonly(vx / mag, vy / mag);
  }
  /**
   * Gets the vector length
   */
  get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Gets the square length of the vector
   */
  get squareMagnitude(): number {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Determines whether is equal to another vector with delta 0.0000001
   * @param other - the other vector
   * @returns true if equal
   */
  isEqual(other: IV2Readonly): boolean {
    if (Math.abs(this.x - other.x) > 0.0000001) return false;
    if (Math.abs(this.y - other.y) > 0.0000001) return false;

    return true;
  }
  /**
   * Determines whether vector is with length zero
   * @returns true if zero
   */
  isZero(): boolean {
    return this.x == 0 && this.y == 0;
  }
  /**
   * Determines whether any of the dimensions of the vector is zero
   * @returns true if any of the dimensions is zero
   */
  hasZero(): boolean {
    return this.x == 0 || this.y == 0;
  }
  /**
   * returns string representation of the vector rounded to n decimals
   * @param n - number of decimal places
   */
  toStringRoundTo(n: number): string {
    return `new V2Readonly(${this.x.toFixed(n)}, ${this.y.toFixed(n)})`;
  }
  /**
   * Returns unit 2D vector that represents direction towerds target vector
   * @param target - target vector
   */
  dirTo(target: IV2Readonly): V2Readonly {
    const xDiff = target.x - this.x;
    const yDiff = target.y - this.y;

    return V2Readonly.normalizeXY(xDiff, yDiff);
  }
  /**
   * Returns dot product with another vector
   * @param rhs - another vector
   */
  dot(rhs: IV2Readonly): number {
    // eslint-disable-next-line
    const lhs = this;
    return lhs.x * rhs.x + lhs.y * rhs.y;
  }
  /**
   * returns degrees to another vector
   * @param rhs - another vector
   */
  degreesTo(rhs: IV2Readonly): number {
    // eslint-disable-next-line
    const lhs = this;
    const perpDot = lhs.x * rhs.y - lhs.y * rhs.x;

    return -Rad2Deg * Math.atan2(perpDot, lhs.dot(rhs));
  }
  /**
   * Returns new vector that represents movement of current vectr towards target vector
   * @param target - another vector
   * @param t01 - progress aproaching the other vector from 0 to 1
   */
  moveTo(target: IV2Readonly, t01: number): V2 {
    const newX = interpolate(this.x, target.x, t01);
    const newY = interpolate(this.y, target.y, t01);
    return V2.create(newX, newY);
  }
  /**
   *  Returns new vector that represents movement of current vectr towards target vector
   * @param target - another vector
   * @param distance - distance to move in direction of target
   */
  moveTowards(target: IV2Readonly, distance: number): V2 {
    const vector2 = target.cloneAsWritable().sub_(this);
    const mag = vector2.squareMagnitude;
    if (mag < 0.0000001) {
      return V2.create(target.x, target.y);
    }
    return this.add(vector2.divBy_(mag).mulBy_(distance));
  }
  /**
   * Returns new vector that represents division of current vector by another vector
   * @param other - another vector
   */
  div(other: IV2Readonly): V2 {
    const divX = this.x / other.x;
    const divY = this.y / other.y;
    return V2.create(divX, divY);
  }
  /**
   * Returns new vector that represents division of current vector by numberic value
   * @param n - numberiic value to divide by
   */
  divBy(n: number): V2 {
    return V2.create(this.x / n, this.y / n);
  }
  /**
   * Returns new vector that represents multiplication of current vector by another vector
   * @param other - another vector
   */
  mul(other: IV2Readonly): V2 {
    return V2.create(this.x * other.x, this.y * other.y);
  }
  /**
   * Returns new vector that represents multiplication of current vector by numberic value
   * @param n - numberiic value to multiply by
   */
  mulBy(n: number): V2 {
    return V2.create(this.x * n, this.y * n);
  }
  /**
   * Returns new vector that represents addition of a numberic value to the current vector
   * @param n - numberiic value to add
   */
  addNumber(n: number): V2 {
    return V2.create(this.x + n, this.y + n);
  }
  /**
   * Returns new vector that represents addition of another vector to the current vector
   * @param other - another vector
   */
  add(other: IV2Readonly): V2 {
    return V2.create(this.x + other.x, this.y + other.y);
  }
  /**
   * Returns new vector that represents substraction of another vector from the current vector
   * @param other - another vector
   */
  sub(other: IV2Readonly): V2 {
    return V2.create(this.x - other.x, this.y - other.y);
  }
  /**
   * Clones the current vector
   */
  clone(): V2Readonly {
    return new V2Readonly(this.x, this.y);
  }
  /**
   * Computes distance to another vector
   * @param other - another vector
   */
  distTo(other: IV2Readonly): number {
    const vectorX = this.x - other.x;
    const vectorY = this.y - other.y;
    return Math.sqrt(vectorX * vectorX + vectorY * vectorY);
  }
  /**
   * Computes squared distance to another vector
   * @param other - another vector
   */
  squaredDistTo(other: IV2Readonly): number {
    const vectorX = this.x - other.x;
    const vectorY = this.y - other.y;
    return vectorX * vectorX + vectorY * vectorY;
  }
}
export class V2 implements IV2Readonly {
  private _x: number;
  private _y: number;
  static readonly zero = new V2Readonly(0, 0);
  static readonly one = new V2Readonly(1, 1);
  static readonly unitX = new V2Readonly(1, 0);
  static readonly unitY = new V2Readonly(0, 1);
  private _isChanged: boolean;
  private _scopeId: number;
  private constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
    this._isChanged = true;
    this._scopeId = NaN;
  }
  /**
   * Creates V2 vector, if object pool is active, and has available objects will recycle object from the pool, otherwise will create new
   * @param [x] - x value, 0 by default
   * @param [y] - y value, 0 by default
   */
  static create(x = 0, y = 0): V2 {
    if (objPool && objPool.isActive) {
      let v2 = <V2>objPool.getObj(PoolObjType.V2);
      if (!v2) {
        v2 = new V2(x, y);
        objPool.setObj(PoolObjType.V2, v2);
      } else {
        v2.x = x;
        v2.y = y;
      }
      return v2.setScope(objPool.scopeId);
    }
    return new V2(x, y);
  }
  /**
   * Creates V2, regardless if object pool is active, or not it will create new permanent object, not managed by pool
   * @param [x] - x value, 0 by default
   * @param [y] - y value, 0 by default
   */
  static createPermanent(x = 0, y = 0): V2 {
    return new V2(x, y);
  }
  /**
   * Creates V2, regardless if object pool is active, or not it will create new permanent object, not managed by pool
   * @param [x] - x value, 0 by default
   * @param [y] - y value, 0 by default
   */
  get permanent(): V2 {
    return V2.createPermanent(this.x, this.y);
  }
  /**
   * Sets object pool scope
   * @param scopeId - scope ID
   */
  setScope(scopeId: number): V2 {
    this._scopeId = scopeId;
    return this;
  }
  /**
   * Gets whether was changed
   */
  get isChanged(): boolean {
    return this._isChanged;
  }
  /**
   * Gets x value, will verify scope
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
   * Gets y value, will verify scope
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
   * Normalizes vector
   * @param vx - x value
   * @param vy - y value
   * @returns normalized vector
   */
  static normalizeXY(vx: number, vy: number): V2 {
    const mag = Math.sqrt(vx * vx + vy * vy);
    if (mag < 0.0000001) {
      return V2.create(0, 0);
    }
    return V2.create(vx / mag, vy / mag);
  }
  /**
   * Gets the length of the vector
   */
  get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Gets square length of the vector
   */
  get squareMagnitude(): number {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Clones as writable, implementation of IV2Readonly
   */
  cloneAsWritable(): V2 {
    return V2.create(this._x, this._y);
  }
  /**
   * Ensures writable vector, implementation of IV2Readonly
   */
  ensureWritable(): V2 {
    return this;
  }
  /**
   * Markes it as processed
   */
  processedChange_(): V2 {
    this._isChanged = false;
    return this;
  }
  /**
   * Marks it as changed
   */
  markAsChanged_(): V2 {
    this._isChanged = true;
    return this;
  }
  /**
   * String representation
   */
  toString(): string {
    return `V2.create(${this._x},${this._y}})`;
  }
  /**
   * clones as readonly
   */
  readonly(): IV2Readonly {
    return new V2Readonly(this._x, this._y);
  }
  /**
   * Determines whether is equal to another vector
   * @param other - another vector
   * @returns true if equal
   */
  isEqual(other: IV2Readonly): boolean {
    if (Math.abs(this.x - other.x) > 0.0000001) return false;
    if (Math.abs(this.y - other.y) > 0.0000001) return false;
    return true;
  }
  /**
   * Determines whether vector is with zero length
   * @returns true if zero
   */
  isZero(): boolean {
    return this.x == 0 && this.y == 0;
  }
  /**
   * Determines whether any of the vector dimensions is zero
   * @returns true if any dimension is zero
   */
  hasZero(): boolean {
    return this.x == 0 || this.y == 0;
  }
  /**
   * Sets from another vetor
   * @param other - another vector
   * @returns reference to itself
   */
  setFrom_(other: IV2Readonly): V2 {
    this.x = other.x;
    this.y = other.y;
    return this;
  }
  /**
   * String representation of the vector, rounded to n decimal places
   * @param n - number of decimals
   * @returns string round to
   */
  toStringRoundTo(n: number): string {
    return `V2.create(${this.x.toFixed(n)}, ${this.y.toFixed(n)})`;
  }
  /**
   * Creates a new unit vector that represents the direction of the target 2D point
   * @param target - another 2D point
   */
  dirTo(target: IV2Readonly): V2 {
    const xDiff = target.x - this.x;
    const yDiff = target.y - this.y;
    return V2.normalizeXY(xDiff, yDiff);
  }
  /**
   * Returns dot product with another vector
   * @param rhs - another vector
   */
  dot(rhs: IV2Readonly): number {
    // eslint-disable-next-line
    const lhs = this;
    return lhs.x * rhs.x + lhs.y * rhs.y;
  }
  /**
   * Returns degrees between this vector and another vector
   * @param rhs - another vector
   */
  degreesTo(rhs: IV2Readonly): number {
    // eslint-disable-next-line
    const lhs = this;
    const perpDot = lhs.x * rhs.y - lhs.y * rhs.x;
    return -Rad2Deg * Math.atan2(perpDot, lhs.dot(rhs));
  }
  /**
   * Creates another vector that represents movement (measured as fraction of the distance) of this vector towards a target vector
   * @param target - another vector
   * @param t01 - progress aproaching another vector from 0 to 1
   */
  moveTo(target: IV2Readonly, t01: number): V2 {
    const newX = interpolate(this.x, target.x, t01);
    const newY = interpolate(this.y, target.y, t01);
    return V2.create(newX, newY);
  }
  /**
   * Updates surrent vector to represent movement (measured as fraction of the distance) of this vector towards a target vector
   * @param target - another vector
   * @param t01 - progress aproaching another vector from 0 to 1
   */
  moveTo_(target: IV2Readonly, t01: number): V2 {
    this.x = interpolate(this.x, target.x, t01);
    this.y = interpolate(this.y, target.y, t01);
    return this;
  }
  /**
   * Creates another vector that represents movement (measured as distance) of this vector towards a target vector
   * @param target - another vector
   * @param moveByDistance - distance to move in that direction
   */
  moveTowards(target: IV2Readonly, moveByDistance: number): V2 {
    const vector2 = target.sub(this);
    const mag = vector2.squareMagnitude;
    if (mag < 0.0000001) {
      return V2.create(target.x, target.y);
    }
    return this.clone().add_(vector2.divBy_(mag).mulBy_(moveByDistance));
  }
  /**
   * Updates the current vector to represent movement (measured as distance) of this vector towards a target vector
   * @param target - another vector
   * @param moveByDistance - distance to move in that direction
   */
  moveTowards_(target: IV2Readonly, moveByDistance: number): V2 {
    const vector2 = target.sub(this);
    const mag = vector2.squareMagnitude;
    if (mag < 0.0000001) {
      return this;
    }
    this.add_(vector2.divBy_(mag).mulBy_(moveByDistance));
    return this;
  }
  /**
   * Returns new vector that represents division of current vector by another vector
   * @param other - another vector
   */
  div(other: IV2Readonly): V2 {
    return V2.create(this.x / other.x, this.y / other.y);
  }
  /**
   * Updates the current vector to represent division of current vector by another vector
   * @param other - another vector
   */
  div_(other: IV2Readonly): V2 {
    this.x /= other.x;
    this.y /= other.y;
    return this;
  }
  /**
   * Returns new vector that represents division of current vector by numberic value
   * @param n - numberiic value to divide by
   */
  divBy(n: number): V2 {
    return V2.create(this.x / n, this.y / n);
  }
  /**
   * Updates the current vector to represent division of current vector by numberic value
   * @param n - numberiic value to divide by
   */
  divBy_(n: number): V2 {
    this.x /= n;
    this.y /= n;
    return this;
  }
  /**
   * Returns new vector that represents multiplication of current vector by another vector
   * @param other - another vector
   */
  mul(other: IV2Readonly): V2 {
    return V2.create(this.x * other.x, this.y * other.y);
  }
  /**
   * Updates the current vector to represent multiplication of current vector by another vector
   * @param other - another vector
   */
  mul_(other: IV2Readonly): V2 {
    this.x *= other.x;
    this.y *= other.y;
    return this;
  }
  /**
   * Returns new vector that represents multiplication of current vector by numberic value
   * @param n - numberiic value to multiply by
   */
  mulBy(n: number): V2 {
    return V2.create(this.x * n, this.y * n);
  }
  /**
   * Updates the current vector to represent multiplication of current vector by numberic value
   * @param n - numberiic value to multiply by
   */
  mulBy_(n: number): V2 {
    this.x *= n;
    this.y *= n;
    return this;
  }
  /**
   * Updates the current vector to represent multiplication of the X value of the current vector by numberic value
   * @param otherX - numberiic value to multiply by
   */
  mulX_(otherX: number): V2 {
    this.x *= otherX;
    return this;
  }
  /**
   * Updates the current vector to represent multiplication of the Y value of the current vector by numberic value
   * @param otherY - numberiic value to multiply by
   */
  mulY_(otherY: number): V2 {
    this.y *= otherY;
    return this;
  }
  /**
   * Returns new vector that represents addition of a numberic value to the current vector
   * @param n - numberiic value to add
   */
  addNumber(n: number): V2 {
    return V2.create(this.x + n, this.y + n);
  }
  /**
   * Updates the current vector to represent addition of a numberic value to the current vector
   * @param n - numberiic value to add
   */
  addNumber_(n: number): V2 {
    this.x += n;
    this.y += n;
    return this;
  }
  /**
   * Returns new vector that represents addition of another vector to the current vector
   * @param other - another vector
   */
  add(other: IV2Readonly): V2 {
    return V2.create(this.x + other.x, this.y + other.y);
  }
  /**
   * Updates the current vector to represent addition of another vector to the current vector
   * @param other - another vector
   */
  add_(other: IV2Readonly): V2 {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  /**
   * Returns new vector that represents substraction of another vector from the current vector
   * @param other - another vector
   */
  sub(other: IV2Readonly): V2 {
    return V2.create(this.x - other.x, this.y - other.y);
  }
  /**
   * Updates the current vector to represent substraction of another vector from the current vector
   * @param other - another vector
   */
  sub_(other: IV2Readonly): V2 {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }
  /**
   * Clones the current vector
   */
  clone(): V2 {
    return V2.create(this.x, this.y);
  }
  /**
   * Returns distance to another vector
   */
  distTo(other: IV2Readonly): number {
    const vectorX = this.x - other.x;
    const vectorY = this.y - other.y;
    return Math.sqrt(vectorX * vectorX + vectorY * vectorY);
  }
  /**
   * Returns squared distance to another vector
   */
  squaredDistTo(other: IV2Readonly): number {
    const vectorX = this.x - other.x;
    const vectorY = this.y - other.y;
    return vectorX * vectorX + vectorY * vectorY;
  }
}

/**
 * 2D Math Operations
 */
export class Math2D {
  /**
   * Rotates point about another point
   * @param pointToRotate - point that we want to rotate
   * @param privotPoint - pivot point
   * @param degrees - degrees of rotation
   * @returns new point that represents the rotation of initial point
   */
  static rotatePointAbout(
    pointToRotate: IV2Readonly,
    privotPoint: IV2Readonly,
    degrees: number,
  ): V2 {
    const s = sin(degrees * Deg2Rad);
    const c = cos(degrees * Deg2Rad);

    let px = pointToRotate.x;
    let py = pointToRotate.y;

    // translate point back to origin:
    px -= privotPoint.x;
    py -= privotPoint.y;

    // rotate point
    const xnew = px * c - py * s;
    const ynew = px * s + py * c;

    // translate point back:
    px = xnew + privotPoint.x;
    py = ynew + privotPoint.y;
    return V2.create(px, py);
  }
  /**
   * Rotates vector by number of degrees
   * @param vectorToRotate - vector to rotate
   * @param degrees - number of degrees to rotate
   * @returns new vector that represents the rotation of initial vector
   */
  static rotateVector(vectorToRotate: IV2Readonly, degrees: number): V2 {
    const radians = degrees * Deg2Rad;
    const newX = vectorToRotate.x * Math.cos(radians) - vectorToRotate.y * Math.sin(radians);
    const newY = vectorToRotate.x * Math.sin(radians) + vectorToRotate.y * Math.cos(radians);
    return V2.create(newX, newY);
  }
  /**
   * Projects point on a line
   * @param pointToProject - point to project
   * @param linePoint1 - first point of the line
   * @param linePoint2 - second point of the line
   * @returns new point that represents the projection of initial point onto the line
   */
  static projectPointOnLine(
    pointToProject: IV2Readonly,
    linePoint1: IV2Readonly,
    linePoint2: IV2Readonly,
  ): V2 {
    const line = linePoint1.sub(linePoint2);
    const vector = pointToProject.sub(linePoint2);
    return line.mulBy(vector.dot(line) / line.dot(line)).add(linePoint2);
  }
  /**
   * Gets dot product of two vectors
   * @param lhsX - x of vector 1
   * @param lhsY - y of vector 1
   * @param rhsX - x of vector 2
   * @param rhsY - y of vector 2
   * @returns dot product value
   */
  static dot2D(lhsX, lhsY, rhsX, rhsY): number {
    return lhsX * rhsX + lhsY * rhsY;
  }

  /**
   * Signed degrees between 3 points
   * @param lhsPoint - left point
   * @param centerPoint - central point
   * @param rhsPoint - right point
   * @returns signed angle between 3 points in degrees
   */
  static signedDegreesBetweenPoints(
    lhsPoint: IV2Readonly,
    centerPoint: IV2Readonly,
    rhsPoint: IV2Readonly,
  ) {
    const lhs = lhsPoint.sub(centerPoint);
    const rhs = rhsPoint.sub(centerPoint);
    return Math2D.signedDegreesBetweenVectors(lhs.x, lhs.y, rhs.x, rhs.y);
  }
  /**
   * Signed degrees between 2 vectors
   * @param v1x - x of vector 1
   * @param v1y - y of vector 1
   * @param v2x - x of vector 2
   * @param v2y - y of vector 2
   * @returns signed angle degrees between vectors
   */
  static signedDegreesBetweenVectors(v1x: number, v1y: number, v2x: number, v2y: number): number {
    const perpDot = v1x * v2y - v1y * v2x;
    return -Rad2Deg * Math.atan2(perpDot, Math2D.dot2D(v1x, v1y, v2x, v2y));
  }
}
