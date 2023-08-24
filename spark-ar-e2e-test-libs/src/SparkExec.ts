/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {spawn} from 'child_process';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

export function runSparkCommand(args: string[]): Promise<void> {
  const handle = spawn('spark', args, {shell: true, stdio: 'inherit'});
  return new Promise<void>((resolve, reject) => {
    handle.on('exit', (exitCode, signal) => {
      if (exitCode === 0) {
        resolve();
      } else {
        reject(`Process failed to complete (exit code: ${exitCode}, signal: ${signal})`);
      }
    });
    handle.on('error', error => {
      reject(error);
    });
  });
}

export async function captureScreenshot() {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'spark-'));
  const screenshotPath = path.join(tmpDir, 'screenshot.png');

  await runSparkCommand(['screenshot', screenshotPath]);

  return fs.readFile(screenshotPath);
}
