#!/usr/bin/env node
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
function isCommand(command) {
  if (process.env.npm_command) {
    return process.env.npm_command === command;
  }

  try {
    var npm_config_argv = JSON.parse(process.env['npm_config_argv']);
  } catch (e) {
    return false;
  }

  var arg;
  while ((arg = npm_config_argv.cooked.shift()) !== undefined) {
    if (arg === command) return true;
  }
  return false;
}
process.exit(isCommand('installLocal') ? 0 : 1);
