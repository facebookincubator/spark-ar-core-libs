/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {
  ManagedSignalType,
  SceneEntityComponentWithProps,
  SceneObjectProperty,
} from './SceneEntitySignals';

/**
 * A shared component which holds the signals for the Scene Object's 2D typography
 */
export class Text2D extends SceneEntityComponentWithProps {
  @SceneObjectProperty('text', false, ManagedSignalType.STRING)
  public text: string;
}

/**
 * A shared component which holds the signals for the Scene Object's 3D typography
 */
export class Text3D extends SceneEntityComponentWithProps {
  @SceneObjectProperty('text', false, ManagedSignalType.STRING)
  public text: string;
}
