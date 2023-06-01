/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {expect, test, jest, beforeEach} from '@jest/globals';

import {main} from '../scripts/script';
import {resetMockOverrides, addMockOverride} from 'spark-ar-dynamic-mocks';

beforeEach(() => {
  jest.resetAllMocks();
  resetMockOverrides();
});

test('In main function material0 is being searched for', async () => {
  // Given
  const mock = addMockOverride('Materials.findFirst');
  mock.mockReturnValue({
    then: success => {
      success({opacityValue: 0});
    },
  });

  // When
  await main();

  // Then
  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenCalledWith('material0');
});

test('In main function opacity of material is set to 0.5', async () => {
  // Given
  const opacity = addMockOverride('Materials.findFirst.then.opacityValue');

  // When
  await main();

  // Then
  expect(opacity).toHaveBeenCalledWith(0.5);
});
