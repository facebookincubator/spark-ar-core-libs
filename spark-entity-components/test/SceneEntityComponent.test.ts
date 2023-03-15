/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {expect, test, jest} from '@jest/globals';
import {SceneEntityComponent, SceneEntityComponentState} from '../src/SceneEntityComponent';
import {SceneEntityManager} from '../src/SceneEntityManager';

jest.mock('../src/SceneEntityManager');

test('Just created component should have state UNSET', async () => {
  const managerMock = new SceneEntityManager();
  const component = new SceneEntityComponent(managerMock);
  expect(component.state).toBe(SceneEntityComponentState.UNSET);
});
