/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** @type {import('jest').Config} */
const config = {
  verbose: true,
  setupFiles: ['<rootDir>/tests/__mocks__/mocks.js'],
  collectCoverageFrom: ['**/src/*.{js,jsx,ts}', '!**/node_modules/**', '!**/vendor/**'],
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  rootDir: '../',
  moduleDirectories: ['<rootDir>/tests/node_modules'],
  transformIgnorePatterns: [],
  coverageReporters: ['json', 'text', 'html'],
  coverageProvider: 'v8',
};

module.exports = config;
