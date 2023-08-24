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
  if (!sparkAppUiDump.sparkSceneGraph) {
    throw new Error("Can't find scene graph for node: " + nodeId);
  }
  return sparkAppUiDump.sparkSceneGraph[nodeId];
}

/**
 * Helper method to get augmentInfo for a given blockName
 * @returns
 */
export async function getAugmentInfo(appDriver: AppDriver, blockName: string) {
  const augmentIds = await appDriver.inspectAugmentIds();
  const augmentId = augmentIds.filter(augmentId => augmentId.includes(blockName));

  // for unique blockName
  if (augmentId.length !== 1) {
    throw new Error("Can't find unique augmentId for blockName: " + blockName);
  }

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
  if (!augmentInfo) {
    throw new Error("Can't find augmentId for blockName: " + blockName);
  }

  return augmentInfo.nodes[0];
}
