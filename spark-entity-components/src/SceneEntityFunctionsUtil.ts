/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/**
 * Checks if a function exists in the class instance
 * @param classInstance: the instance of the class to be checked
 * @param functionName the function to be checked
 * @returns has function
 */
export const hasFunction = (classInstance: any, functionName: string): boolean => {
  // Internally only called by constant function names.
  // eslint-disable-next-line security/detect-object-injection
  return typeof classInstance[functionName] === 'function';
};

/**
 * Invoke a function on the class instance if it exists. It will wait for it to finish.
 * Great for functions which can be async of sync.
 * @param functionName function name to invoke
 * @param args the arguments, if any, to pass to the function
 */
export const invokeAndWaitIfExists = async (
  classInstance: any,
  functionName: string,
  args?: any,
) => {
  if (!hasFunction(classInstance, functionName)) {
    return;
  }

  // Internally only called by constant function names.
  // eslint-disable-next-line security/detect-object-injection
  await classInstance[functionName](args);
};

/**
 * Invoke a function on the class instance if it exists. It is assumed to simply call and not wait for it, which
 * can be much faster but will lead to async tasks running.
 * Avoid calling on 'async' functions.
 * @param functionName function name to invoke
 * @param args the arguments, if any, to pass to the function
 */
export const invokeIfExists = (classInstance: any, functionName: string, args?: any) => {
  if (!hasFunction(classInstance, functionName)) {
    return;
  }

  // Internally only called by constant function names.
  // eslint-disable-next-line security/detect-object-injection
  classInstance[functionName](args);
};
