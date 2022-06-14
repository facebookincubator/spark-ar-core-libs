/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');

module.exports = {
  entry: './src/state.js',
  mode: 'development',
  output: {
    filename: 'state.js',
    library: 'State',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    // https://github.com/webpack/webpack/issues/6525
    globalObject: 'this',
    // https://github.com/webpack/webpack/issues/11660
    chunkLoading: false,
  },
  devtool: 'source-map',
  module: {rules: []},
  externals: {
    string_decoder: 'string_decoder',
    Participants: 'Participants',
    Multipeer: 'Multipeer',
    Reactive: 'Reactive',
    Time: 'Time',
    Diagnostics: 'Diagnostics',
  },
};
