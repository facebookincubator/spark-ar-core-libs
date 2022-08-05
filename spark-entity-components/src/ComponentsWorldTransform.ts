/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {SceneEntityComponentWithProps, SceneObjectProperty} from './SceneEntitySignals';
import {Vector3} from './MathVectors';

/**
 * A shared component which provides readonly values for the world transform of the object
 */
export class WorldTransform extends SceneEntityComponentWithProps {
  @SceneObjectProperty('worldTransform.x', true)
  public x: number;

  @SceneObjectProperty('worldTransform.y', true)
  public y: number;

  @SceneObjectProperty('worldTransform.z', true)
  public z: number;

  @SceneObjectProperty('worldTransform.scaleX', true)
  public scaleX: number;

  @SceneObjectProperty('worldTransform.scaleY', true)
  public scaleY: number;

  @SceneObjectProperty('worldTransform.scaleZ', true)
  public scaleZ: number;

  @SceneObjectProperty('worldTransform.rotationX', true)
  public rotationX: number;

  @SceneObjectProperty('worldTransform.rotationY', true)
  public rotationY: number;

  @SceneObjectProperty('worldTransform.rotationZ', true)
  public rotationZ: number;

  public get position(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  public get scale(): Vector3 {
    return new Vector3(this.scaleX, this.scaleY, this.scaleZ);
  }

  public get rotation(): Vector3 {
    return new Vector3(this.rotationX, this.rotationY, this.rotationZ);
  }
}
