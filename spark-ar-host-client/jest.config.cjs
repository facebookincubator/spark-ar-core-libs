/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  setupFiles: ['../spark-ar-jest-mocks/src/index.js'],
  transformIgnorePatterns: ['node_modules/(?!spark-ar-participant-manager)'],
};
