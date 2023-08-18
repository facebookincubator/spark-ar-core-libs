/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/**
 * Spark Procedural Animations - Core Functions, Data Structures
 * version 0.9.4
 */

// ------- core functions START
export const PI: number = Math.PI;
export const PIx2: number = Math.PI * 2;
export const Deg2Rad: number = Math.PI / 180.0; // degrees to radians
export const Rad2Deg: number = 180.0 / Math.PI; // radians to degrees
const epsilon = 0.00000001;
/**
 * Space enum that can be local or world
 */
export enum Space {
  local = 0,
  world = 1,
}
/**
 * interface of a function that accepts no argument and returns no value
 */
export interface IAction {
  (): void;
}
/**
 * interface of a function that accepts 1 argument of generic type T
 * and returns no value
 */
export interface IActionOfT<T> {
  (arg: T): void;
}
/**
 * interface of a function that accepts 2 arguments of generic types T1 and T2
 * and returns no value
 */
export interface IActionOf2T<T1, T2> {
  (arg1: T1, arg2: T2): void;
}
/**
 * interface of a function that accepts 3 arguments of generic types T1, T2 and T3
 * and returns no value
 */
export interface IActionOf3T<T1, T2, T3> {
  (arg1: T1, arg2: T2, arg3: T3): void;
}
/**
 * interface of a function that accepts 4 arguments of generic types T1, T2 T3, and T4
 * and returns no value
 */
export interface IActionOf4T<T1, T2, T3, T4> {
  (arg1: T1, arg2: T2, arg3: T3, arg4: T4): void;
}
/**
 * interface of a function that accepts no argument
 * and returns value of generic type T
 */
export interface IFuncOfT<T> {
  (): T;
}
/**
 * interface of a function that accepts 1 argument of generic type T1
 * and returns value of generic type T2
 */
export interface IFuncOf2T<T1, T2> {
  (arg1: T1): T2;
}
/**
 * interface of a function that accepts 2 arguments of generic types T1 and T2
 * and returns value of generic type T3
 */
export interface IFuncOf3T<T1, T2, T3> {
  (arg1: T1, arg2: T2): T3;
}
/**
 * interface of a function that accepts 3 arguments of generic types T1, T2 and T3
 * and returns value of generic type T4
 */
export interface IFuncOf4T<T1, T2, T3, T4> {
  (arg1: T1, arg2: T2, arg3: T3): T4;
}
/**
 * interface that contains dispose method
 */
export interface IDisposable {
  dispose(): void;
}
/**
 * interface that contains update method
 */
export interface IUpdatable {
  update(): void;
}
/**
 * interface that contains initializeAsync method
 */
export interface IInitAsync {
  initializeAsync(): Promise<void>;
}
/**
 * Throws error
 * @param message - error message
 */
export function throwError(message: string): void {
  throw new Error(message);
}
/**
 * Returns the value of a base expression taken to a specified power.
 * @param x - The base value of the expression.
 * @param y - The exponent value of the expression.
 */
export function pow(x: number, y: number): number {
  return Math.pow(x, y);
}
/**
 * Returns version of pow function, where places of 0,0 and 1,1 are switched
 * @param x - The base value of the expression.
 * @param y - The exponent value of the expression.
 */
export function powSwitch01(x: number, y: number): number {
  return 1 - Math.pow(Math.abs(1 - x), y);
}
/**
 * Returns the sine of a number.
 * @param x - A numeric expression that contains an angle measured in radians.
 */
export function sin(x: number): number {
  return Math.sin(x);
}
/**
 * Returns the sine of a number, where wave length and amplitude (X and Y) are limited betwen 0 and 1
 * @param x - A numeric expression that contains an angle measured in radians.
 */
export function sinLimitXY01(x: number): number {
  return fromRangeTo01(Math.sin(x * PIx2), -1, 1);
}
/**
 * Returns the sine of a number, where wave length (X) is limited between 0 and 1
 * @param x - A numeric expression that contains an angle measured in radians.
 */
export function sinLimitX01(x: number): number {
  return Math.sin(x * PIx2);
}
/**
 * Returns the cosine of a number, where wave length and amplitude (X and Y) are limited betwen 0 and 1
 * @param x - A numeric expression that contains an angle measured in radians.
 */
export function cosLimitXY01(x: number): number {
  return fromRangeTo01(Math.cos(x * PIx2), -1, 1);
}
/**
 * Returns the cosine of a number, where wave length (X) is limited between 0 and 1
 * @param x - A numeric expression that contains an angle measured in radians.
 */
export function cosLimitX01(x: number): number {
  return Math.cos(x * PIx2);
}
/**
 * Function that draws half circle between 0 and 1
 * @param x - value between 0 and 1
 */
export function halfCircle01(x: number): number {
  return sqrt(1 - pow(1 - x * 2, 2));
}
/**
 * Returns the cosine of a number.
 * @param x - A numeric expression that contains an angle measured in radians.
 */
export function cos(x: number): number {
  return Math.cos(x);
}
/**
 * Returns the square root of a number.
 * @param x - A numeric expression
 */
export function sqrt(x: number): number {
  return Math.sqrt(x);
}
/**
 * Returns -1 if x is negative and 1 otherwise
 * @param x - A numeric expression
 */
export function sign(x: number) {
  return x < 0 ? -1 : 1;
}
/**
 * Returns minimum value
 * @param a - A numeric expression
 * @param b - A numeric expression
 */
export function min(a: number, b: number) {
  return a <= b ? a : b;
}
/**
 * Returns maximum value
 * @param a - A numeric expression
 * @param b - A numeric expression
 */
export function max(a: number, b: number) {
  return a >= b ? a : b;
}
/**
 * Returns average value
 * @param a - A numeric expression
 * @param b - A numeric expression
 */
export function avg(a: number, b: number) {
  return (a + b) / 2.0;
}
/**
 * Returns positive value
 * @param n - A numeric expression
 */
export function abs(n: number) {
  return Math.abs(n);
}
/**
 * Returns current time in seconds
 */
export function secondsNow(): number {
  return Date.now() / 1000.0;
}
/**
 * Returns the difference between current time in seconds and the time passed as argument in seconds
 * @param time to compare to current time in seconds
 */
export function secondsFromNow(time: number): number {
  return secondsNow() - time;
}
/**
 * Returns value by index, if the index is out of bounds the function it will round robin the right value
 * @param currentIndex - the index of the value to return
 * @param options - The array that contains the value
 */
export function roundRobin(currentIndex: number, ...options: number[]): number {
  if (!options || options.length == 0) throw new Error(`Missing options`);
  return options[Math.floor(currentIndex) % options.length];
}
const RandomNumbers255 = [
  162, 38, 134, 217, 213, 96, 248, 108, 42, 55, 60, 44, 150, 109, 48, 61, 88, 15, 169, 64, 37, 145,
  17, 255, 34, 83, 97, 113, 7, 158, 230, 212, 125, 252, 170, 250, 4, 2, 39, 152, 54, 185, 224, 253,
  166, 220, 81, 183, 83, 32, 9, 106, 151, 69, 129, 140, 130, 98, 159, 241, 249, 30, 191, 203, 36,
  27, 91, 172, 158, 27, 124, 92, 1, 197, 97, 87, 215, 113, 76, 5, 178, 226, 63, 49, 43, 248, 181,
  145, 77, 54, 250, 216, 56, 28, 89, 88, 149, 63, 133, 72, 174, 185, 114, 84, 120, 210, 225, 173,
  240, 179, 78, 215, 2, 218, 108, 222, 69, 71, 19, 68, 191, 93, 16, 99, 180, 21, 176, 8, 24, 202,
  22, 229, 107, 162, 5, 109, 119, 223, 33, 66, 228, 45, 149, 157, 116, 58, 64, 31, 231, 206, 94, 35,
  220, 115, 228, 41, 199, 161, 143, 25, 253, 227, 90, 227, 21, 181, 100, 187, 128, 166, 255, 222,
  232, 66, 98, 167, 91, 159, 112, 104, 111, 172, 236, 207, 236, 110, 136, 244, 144, 13, 8, 23, 85,
  101, 130, 42, 116, 200, 141, 188, 65, 233, 80, 252, 178, 146, 105, 86, 211, 100, 209, 239, 231,
  139, 55, 9, 58, 137, 153, 75, 67, 82, 115, 182, 70, 148, 65, 184, 95, 85, 74, 206, 127, 118, 19,
  135, 62, 190, 75, 238, 29, 103, 51, 127, 203, 129, 151, 221, 13, 187, 147, 165, 107, 67, 177, 201,
  204, 171, 59, 102, 142, 197, 223, 193, 244, 12, 18, 50, 211, 1, 53, 176, 205, 230, 43, 148, 14,
  10, 44, 57, 45, 119, 11, 20, 87, 123, 153, 246, 95, 14, 194, 192, 34, 32, 94, 53, 86, 157, 132,
  26, 180, 103, 101, 70, 171, 49, 6, 68, 209, 254, 175, 126, 76, 46, 168, 102, 235, 132, 146, 38,
  254, 81, 121, 117, 217, 126, 219, 214, 243, 186, 0, 234, 156, 60, 186, 79, 122, 189, 93, 179, 241,
  35, 242, 16, 242, 150, 198, 221, 25, 33, 168, 29, 133, 120, 36, 251, 121, 213, 225, 6, 74, 233,
  232, 47, 196, 195, 118, 137, 249, 106, 73, 51, 92, 57, 138, 11, 156, 131, 144, 214, 192, 154, 48,
  12, 18, 167, 147, 124, 72, 164, 77, 122, 140, 195, 243, 251, 173, 235, 155, 200, 170, 198, 52, 20,
  163, 99, 204, 136, 174, 0, 154, 125, 219, 240, 169, 163, 37, 193, 164, 10, 175, 189, 182, 105,
  246, 188, 238, 80, 78, 205, 110, 40, 84, 104, 50, 165, 194, 138, 82, 237, 247, 177, 201, 239, 26,
  62, 237, 142, 245, 247, 41, 184, 96, 207, 47, 46, 135, 155, 161, 112, 160, 117, 141, 28, 160, 131,
  234, 15, 4, 111, 3, 61, 212, 134, 56, 183, 202, 216, 208, 139, 22, 59, 73, 199, 123, 128, 17, 79,
  24, 208, 71, 3, 218, 39, 30, 196, 7, 90, 31, 152, 190, 40, 210, 89, 229, 226, 23, 245, 52, 114,
  224, 143,
]; // 512 of random bytes 0 to 255, each number repeats twice
function gradient(hash: number, x: number): number {
  const h = hash & 15;
  let grad = 1.0 + (h & 7);
  if ((h & 8) != 0) grad = -grad;
  return grad * x;
}
/**
 * global random seed
 */
export const seed = Math.floor(Math.random() * 0xffffff);
/**
 * Returns noise
 * @param x - input
 */
export function noise(x: number): number {
  const i0 = Math.floor(x);
  const i1 = i0 + 1;
  const x0 = x - i0;
  const x1 = x0 - 1.0;

  let t0 = 1.0 - x0 * x0;
  t0 *= t0;
  const n0 = t0 * t0 * gradient(RandomNumbers255[i0 & 0xff], x0);

  let t1 = 1.0 - x1 * x1;
  t1 *= t1;
  const n1 = t1 * t1 * gradient(RandomNumbers255[i1 & 0xff], x1);
  return 0.395 * (n0 + n1);
}
/**
 * Returns random of 2 values of generic type T
 * @param a - first value
 * @param b - second value
 */
export function rndOf2<T>(a: T, b: T): T {
  return Math.random() < 0.5 ? a : b;
}
/**
 * Returns random of 3 values of generic type T
 * @param a - first value
 * @param b - second value
 * @param c - third value
 */
export function rndOf3<T>(a: T, b: T, c: T): T {
  const r = Math.random();
  return r < 0.3333 ? a : r < 0.6666 ? b : c;
}
/**
 * Returns random of 4 values of generic type T
 * @param a - first value
 * @param b - second value
 * @param c - third value
 * @param d - fourth value
 */
export function rndOf4<T>(a: T, b: T, c: T, d: T): T {
  const r = Math.random();
  return r < 0.25 ? a : r < 0.5 ? b : r < 0.75 ? c : d;
}
/**
 * Returns random of list of values of generic type T
 * @param arr - list of values
 */
export function rndOf<T>(...arr: T[]): T {
  if (!arr || arr.length < 1) throw new Error(`rndOf must accept at least one argument`);
  if (arr.length == 1) return arr[0];
  return arr[Math.floor(Math.random() * (arr.length - 0.000001))];
}
/**
 * Returns random of list of functions that return value of generic type T
 * Use it when creation of each value is costly so to create only the chosen one
 * @param arr - list of functions
 */
export function rndFactoryOf<T>(...arr: IFuncOfT<T>[]): T {
  if (!arr || arr.length < 1) throw new Error(`rndOf must accept at least one argument`);
  if (arr.length == 1) return arr[0]();
  return arr[Math.floor(Math.random() * (arr.length - 0.000001))]();
}
/**
 * Verifies that 2 numbers are equal within a given delta value
 * @param a - first number
 * @param b - second number
 * @param delta - difference to allow between numbers
 */
export function isNumEqual(a: number, b: number, delta = 0.00000001): boolean {
  return Math.abs(a - b) < delta;
}
/**
 * Takes array of generic type T and returns the same array with the values shuffled
 * @param arr - input array to shuffle
 */
export function shuffleArray_<T>(arr: T[]): T[] {
  if (!arr || arr.length <= 1) return arr;

  for (let i = 0; i < arr.length; ++i) {
    const replaceIndex = Math.floor(Math.random() * arr.length);
    if (i == replaceIndex) continue;
    // swap
    const temp = arr[replaceIndex];
    arr[replaceIndex] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
/**
 * Takes array of generic type T and returns new array with the values shuffled
 * @param arr - input array to copy and shuffle
 */
export function shuffleArray<T>(arr: T[]): T[] {
  if (!arr) return arr;
  if (arr.length == 1) return [arr[0]];
  const arr2 = [...arr];
  shuffleArray_(arr2);
  return arr2;
}
/**
 * Ensures a given number is within a given range
 * @param value - value to be checked
 * @param min - inclusive lower bound of the range
 * @param max - inclusive upper bound of the range
 */
export function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
/**
 * Ensures a given number is between 0 and 1
 * @param value - value to be checked
 */
export function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}
/**
 * smoothstep function betwen 0 and 1, equivalent of smoothstep(0, 1, x)
 * @param x - input value
 */
export function smoothstep01(x: number): number {
  return smoothstep(0, 1, x);
}
/**
 * smoothstep function
 * @param edge0 - edge 0
 * @param edge1 - edge 1
 * @param x - input value
 */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  // Scale, bias and saturate x to 0..1 range
  x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  // Evaluate polynomial
  return x * x * (3 - 2 * x);
}
/**
 * smootherstep function betwen 0 and 1, equivalent of smootherstep(0, 1, x)
 * @param x - input value
 */
export function smootherstep01(x: number): number {
  return smootherstep(0, 1, x);
}
/**
 * smootherstep function
 * @param edge0 - edge 0
 * @param edge1 - edge 1
 * @param x - input value
 */
export function smootherstep(edge0: number, edge1: number, x: number): number {
  // Scale, and clamp x to 0..1 range
  x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  // Evaluate polynomial
  return x * x * x * (x * (x * 6 - 15) + 10);
}
/**
 * transforms number of within some range to number between 0 and 1
 * @param xOfRange - number to transform
 * @param xMin - minimum value of the range
 * @param xMax - maximum value of the range
 * @returns number between 0 and 1
 */
export function fromRangeTo01(xOfRange: number, xMin: number, xMax: number): number {
  const diff = xMax - xMin;
  return Math.abs(diff) < 0.0000001 ? 1.0 : (xOfRange - xMin) / diff;
}
/**
 * transforms number of within some range to number between 0 and 1 and clamps values ouside 0 and 1
 * @param xOfRange - number to transform
 * @param xMin - minimum value of the range
 * @param xMax - maximum value of the range
 * @returns number between 0 and 1
 */
export function fromRangeTo01Clamped(xOfRange: number, xMin: number, xMax: number): number {
  const result = fromRangeTo01(xOfRange, xMin, xMax);
  return result < 0 ? 0 : result > 1 ? 1 : result;
}
/**
 * transforms number between 0 and 1 to match to a given range
 * @param x01 - number between 0 and 1 to match to a given range
 * @param xMin - minimum value of the range
 * @param xMax - maximum value of the range
 * @returns matching number number of the given range
 */
export function from01ToRange(x01: number, xMin: number, xMax: number): number {
  return (xMax - xMin) * x01 + xMin;
}
/**
 * Triangles height
 *      ^
 *     /|\
 *  a / |h\ b
 *   /__|__\
 *      c
 * @param a left side of triangle
 * @param b right side of triangle
 * @param c bottom side of triangle
 * @returns height that falls on the bottom side of a triangle
 */
export function triangleHeight(a: number, b: number, c: number): number {
  if (Math.abs(c) < 0.000001) return (a + b) / 2.0;
  const s = (a + b + c) / 2.0;
  const n = s * (s - a) * (s - b) * (s - c);
  if (n < 0) return 0;
  if (c == 0) return 0;
  return (2 * Math.sqrt(n)) / c;
}
/**
 * transforms number between 0 and 1 to match to a given range
 * @param from - minimum value of the range
 * @param to - maximum value of the range
 * @param t01 - number between 0 and 1 to match to a given range
 * @returns matching number number of the given range
 */
export function interpolate(from: number, to: number, t01: number): number {
  return from + (to - from) * t01;
}

/**
 * Moving average
 * @param lastAverage - last average value
 * @param current - current value
 * @param count - number of samples to average
 * @returns average
 */
export function movAvg(lastAverage: number, current: number, count: number): number {
  if (count <= 1 || isNaN(lastAverage)) return current;
  return (lastAverage * (count - 1) + current) / count;
}
/**
 * Exponential moving average
 * @param lastAverage - last average value
 * @param current - current value
 * @param count - number of samples to average
 * @returns Exponential average
 */
export function expMovAvg(lastAverage: number, current: number, count: number): number {
  const smoothing = 2;
  if (count <= 1 || isNaN(lastAverage)) return current;
  const exponential_percent = smoothing / (1 + count);
  return current * exponential_percent + lastAverage * (1 - exponential_percent);
}
/**
 * Returns Y value of function that draws bezier curve
 * @param x - input value
 * @param bx - X value of the end of the first control point that starts at 0,0
 * @param by - Y value of the end of the first control point that starts at 0,0
 * @param cx - X value of the end of the second control point that starts at 1,1
 * @param cy - Y value of the end of the second control point that starts at 1,1
 */
export function bezier01(x: number, bx: number, by: number, cx: number, cy: number): number {
  return bezier(x, 0, 0, bx, by, cx, cy, 1, 1);
}
/**
 * Returns Y value of function that draws 2 bezier curve that are joined
 * @param x - input value
 * @param ax1 - X value of the start of the first control point of first bezier curve
 * @param ay1 - Y value of the start of the first control point of first bezier curve
 * @param bx1 - X value of the end of the first control point of first bezier curve
 * @param by1 - Y value of the end of the first control point of first bezier curve
 * @param cx1 - X value of the end of the second control point of first bezier curve
 * @param cy1 - Y value of the end of the second control point of first bezier curve
 * @param ax2 - X value of the start of the first control point of second bezier curve
 * @param ay2 - Y value of the start of the first control point of second bezier curve
 * @param bx2 - X value of the end of the first control point of second bezier curve
 * @param by2 - Y value of the end of the first control point of second bezier curve
 * @param cx2 - X value of the end of the second control point of second bezier curve
 * @param cy2 - Y value of the end of the second control point of second bezier curve
 * @param dx2 - X value of the start of the second control point of second bezier curve
 * @param dy2 - Y value of the start of the second control point of second bezier curve
 */
export function bezier2parts(
  x: number,
  ax1: number,
  ay1: number,
  bx1: number,
  by1: number,
  cx1: number,
  cy1: number,
  ax2: number,
  ay2: number,
  bx2: number,
  by2: number,
  cx2: number,
  cy2: number,
  dx2: number,
  dy2: number,
): number {
  if (x <= ax2) {
    return bezier(x, ax1, ay1, bx1, by1, cx1, cy1, ax2, ay2);
  }
  return bezier(x, ax2, ay2, bx2, by2, cx2, cy2, dx2, dy2);
}
/**
 * Returns Y value of function that draws bezier curve
 * @param x - input value
 * @param ax - X value of the start of the first control point
 * @param ay - Y value of the start of the first control point
 * @param bx - X value of the end of the first control point
 * @param by - Y value of the end of the first control point
 * @param cx - X value of the end of the second control point
 * @param cy - Y value of the end of the second control point
 * @param dx - X value of the start of the second control point
 * @param dy - Y value of the start of the second control point
 */
export function bezier(
  x: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
  dx: number,
  dy: number,
): number {
  if (ax < dx) {
    if (x <= ax + epsilon) return ay;
    if (x >= dx - epsilon) return dy;
  } else {
    if (x >= ax + epsilon) return ay;
    if (x <= dx - epsilon) return dy;
  }

  //let cc = getCubicCoefficients(ax, bx, cx, dx);
  const c0 = -ax + 3 * bx - 3 * cx + dx;
  const c1 = 3 * ax - 6 * bx + 3 * cx;
  const c2 = -3 * ax + 3 * bx;
  const c3 = ax;
  // end of getCubicCoefficients inlined

  let a = c0;
  let b = c1;
  let c = c2;
  let d = c3 - x;
  // x(t) = a*t^3 + b*t^2 + c*t + d
  //let cr = getCubicRoots(c0, c1, c2, c3 - x);
  let rootsLength = 0;
  let r0 = 0;
  let r1 = 0;
  let r2 = 0;
  if (Math.abs(a - 0) < epsilon) {
    rootsLength = 0;
    r0 = 0;
    r1 = 0;

    if (Math.abs(a - 0) < epsilon) {
      if (Math.abs(b - 0) >= epsilon) {
        r0 = -c / b;
        rootsLength = 1;
      }
    } else {
      a = b;
      b = c;
      c = d;
      //let qr = getQuadraticRoots(b, c, d);
      const q = b * b - 4 * a * c;
      const signQ = q > 0 ? 1 : q < 0 ? -1 : 0;

      if (signQ < 0) {
        rootsLength = 0;
      } else if (Math.abs(signQ - 0) < epsilon) {
        r0 = -b / (2 * a);
        rootsLength = 1;
      } else {
        const n = -b / (2 * a);
        r0 = n;
        r1 = n;
        const tmp = Math.sqrt(q) / (2 * a);
        r0 -= tmp;
        r1 += tmp;
        rootsLength = 2;
      }
    }
    //--------
  } else {
    b /= a;
    c /= a;
    d /= a;

    const q = (b * b - 3 * c) / 9.0;
    const qCubed = q * q * q;
    const r = (2 * b * b * b - 9 * b * c + 27 * d) / 54.0;

    const diff = qCubed - r * r;
    if (diff >= 0) {
      if (Math.abs(q - 0) < epsilon) {
        r0 = 0.0;
        rootsLength = 1;
      } else {
        const theta = Math.acos(r / Math.sqrt(qCubed));
        const qSqrt = Math.sqrt(q);

        r0 = -2 * qSqrt * Math.cos(theta / 3.0) - b / 3.0;
        r1 = -2 * qSqrt * Math.cos((theta + 2 * Math.PI) / 3.0) - b / 3.0;
        r2 = -2 * qSqrt * Math.cos((theta + 4 * Math.PI) / 3.0) - b / 3.0;
        rootsLength = 3;
      }
    } else {
      const tmp = Math.pow(Math.sqrt(-diff) + Math.abs(r), 1 / 3.0);
      const rSign = r > 0 ? 1 : r < 0 ? -1 : 0;
      r0 = -rSign * (tmp + q / tmp) - b / 3.0;
      rootsLength = 1;
    }
  }

  // end of getCubicRoots inlined
  let time = NaN;
  if (rootsLength == 0) time = 0;
  else if (rootsLength == 1) time = r0;
  else {
    for (let i = 0; i < rootsLength; ++i) {
      const root = i == 0 ? r0 : i == 1 ? r1 : r2;
      if (0 <= root && root <= 1) {
        time = root;
        break;
      }
    }
  }
  if (isNaN(time)) return NaN;

  const t = time;
  a = ay;
  b = by;
  c = cy;
  d = dy;
  return (t * t * (d - a) + 3 * (1 - t) * (t * (c - a) + (1 - t) * (b - a))) * t + a;
}
// ------- core functions END
// ------- core data structures START
/**
 * A list of randoim values of generic type T
 */
export class RndList<T> {
  private _i: number;
  constructor(public list: T[], public readonly shuffleEnabled: boolean = true) {
    this.list = this.shuffleEnabled ? shuffleArray(list) : [...list];
    this._i = 0;
  }

  /**
   * Returns next random value of the list, after using all values shuffles the list
   */
  getNext(): T {
    this.checkIndex();
    return this.list[this._i++];
  }
  /**
   * Returns next random value of the list with condition, after using all values shuffles the list
   */
  getNextWhere(condition: IFuncOf2T<T, boolean>): T {
    this.checkIndex();
    for (let i = 0; i < this.list.length; i++) {
      const ix = (i + this._i) % this.list.length;
      const e = this.list[ix];
      if (condition(e)) {
        this._i = ix + 1;
        return e;
      }
    }
    throw new Error(`No items in RndList satisfies the given condition`);
  }
  private checkIndex() {
    if (this._i >= this.list.length) {
      this._i = 0;
      if (this.shuffleEnabled) this.list = shuffleArray(this.list);
    }
  }
}

/**
 * Linked list node of generic type T
 */
export class LinkedListNode<T> {
  next: LinkedListNode<T>;
  prev: LinkedListNode<T>;
  constructor(public data: T, public readonly list: LinkedList<T>) {}
}
/**
 * Linked list of generic type T
 */
export class LinkedList<T> {
  private _head: LinkedListNode<T>;
  private _tail: LinkedListNode<T>;
  private _count: number;

  constructor() {
    this._head = null;
    this._tail = null;
    this._count = 0;
  }

  /**
   * The head node of the linked list or NULL if empty
   */
  get head(): LinkedListNode<T> {
    return this._head;
  }
  /**
   * The tail node of the linked list or NULL if empty
   */
  get tail(): LinkedListNode<T> {
    return this._tail;
  }
  /**
   * The number of elements in the linked list
   */
  get count(): number {
    return this._count;
  }
  /**
   * Inserts value at the end of the linked list and returns newly created node
   * @param data - value to insert
   */
  insertEnd(data: T): LinkedListNode<T> {
    this._count++;
    const node = new LinkedListNode(data, this);
    if (!this._head) {
      this._head = node;
      this._tail = node;
    } else {
      const lastNode = this._tail;
      node.prev = lastNode;
      lastNode.next = node;
      this._tail = node;
    }
    return node;
  }
  /**
   * Inserts value in the beginning of the linked list and returns newly created node
   * @param data - value to insert
   */
  insertBegin(data: T): LinkedListNode<T> {
    this._count++;
    const node = new LinkedListNode(data, this);
    if (!this._head) {
      this._head = node;
      this._tail = node;
    } else {
      this._head.prev = node;
      node.next = this._head;
      this._head = node;
    }
    return node;
  }
  /**
   * Delete node of linked list
   * @param node - node to delete
   */
  deleteNode(node: LinkedListNode<T>): void {
    if (!this._head) return;
    if (node.list != this) throw new Error(`Invalid node for this linked list`);
    this._count = Math.max(this._count - 1, 0);
    if (node == this._head) this._head = node.next;
    if (node == this._tail) this._tail = node.prev;

    const prevNode = node.prev;
    const nextNode = node.next;
    if (prevNode) prevNode.next = nextNode;
    if (nextNode) nextNode.prev = prevNode;

    node.prev = node.next = null;
  }
  /**
   * Clears linked list
   */
  clear() {
    this._head = null;
    this._tail = null;
    this._count = 0;
  }
}
// ------- core data structures END
