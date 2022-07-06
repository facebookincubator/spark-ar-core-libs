/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  env: {
    jest: true,
    browser: true,
    es2021: true,
  },
  extends: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'dot-notation': 'warn',
    'no-await-in-loop': 'warn',
    'no-caller': 'warn',
    'no-constant-condition': ['warn', {checkLoops: false}],
    'no-debugger': 'warn',
    'no-duplicate-case': 'warn',
    'no-empty': ['warn', {allowEmptyCatch: true}],
    'no-eval': 'warn',
    'no-ex-assign': 'warn',
    'no-fallthrough': ['warn', {commentPattern: '.*'}],
    'no-new-func': 'warn',
    'no-new-wrappers': 'warn',
    'no-param-reassign': 'warn',
    'no-return-await': 'warn',
    'no-script-url': 'warn',
    'no-self-compare': 'warn',
    'no-throw-literal': 'warn',
    'no-unsafe-finally': 'warn',
    'no-unused-expressions': ['warn', {allowShortCircuit: true, allowTernary: true}],
    'no-var': 'warn',
    'object-shorthand': 'warn',
    'prefer-arrow-callback': 'warn',
    curly: 'warn',
    yoda: 'warn',
  },
};
