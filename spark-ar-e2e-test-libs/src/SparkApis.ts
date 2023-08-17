/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {AppDriver} from './AppDriver';
import {SparkAppUiDump} from './AppDriverTypes';

/**
 * Helper method to dump document from scene graph for a given node
 * @returns
 */
export async function getSparkSceneGraph(appDriver: AppDriver, nodeId: string) {
  const nodeDumpView = await appDriver.inspectNodeViewDump({nodeId});
  const sparkAppUiDump = nodeDumpView as SparkAppUiDump;
  expect(sparkAppUiDump.sparkSceneGraph).toBeTruthy();
  return sparkAppUiDump.sparkSceneGraph[nodeId];
}

/**
 * Helper method to get augmentInfo for a given blockName
 * @returns
 */
export async function getAugmentInfo(appDriver: AppDriver, blockName: string) {
  const augmentIds = await appDriver.inspectAugmentIds();
  expect(augmentIds).toBeTruthy();
  expect(augmentIds.length).toBeGreaterThanOrEqual(1);

  const augmentId = augmentIds.filter(augmentId => augmentId.includes(blockName));
  // for unique blockName
  expect(augmentId.length).toBe(1);

  const augmentInfo = await appDriver.inspectAugmentInfo({id: augmentId[0]});
  return augmentInfo;
}

/**
 * blockName is used as prefix for node / augment Ids.
 * Helper method to retrieve nodeId from augment based on blockName
 * @returns
 */
export async function getAugmentNodeId(appDriver: AppDriver, blockName: string) {
  const augmentInfo = await getAugmentInfo(appDriver, blockName);
  expect(augmentInfo).toBeTruthy();

  return augmentInfo.nodes[0];
}
