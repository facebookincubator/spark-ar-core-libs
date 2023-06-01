/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Diagnostics from 'Diagnostics';
import Materials from 'Materials';
import Scene from 'Scene';

// Example script we want to test
export async function main() {
  Diagnostics.log('Started ');
  // Looking for the material
  const mat = await Materials.findFirst('material0');
  mat.opacityValue = 0.5;

  // Creating a plane in the scene
  const planeObj = Scene.createSync('Plane');
  // Assining newly created plane created earlier material
  planeObj.material = mat;
  // Adding created plane to the scene
  Scene.root.addChildSync(planeObj);

  Diagnostics.log('finished ');
}

(async function () {
  await main();
})(); // Enables async/await in JS [part 2]
