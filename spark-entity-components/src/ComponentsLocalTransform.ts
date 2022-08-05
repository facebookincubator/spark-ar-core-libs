/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {Quaternion} from './MathQuaternion';
import {Vector3} from './MathVectors';
import {SceneEntity} from './SceneEntity';
import {SceneEntityComponent} from './SceneEntityComponent';
import {SceneEntityComponentWithProps, SceneObjectProperty} from './SceneEntitySignals';

/**
 * A shared component which holds the signals for the Scene Object's position transform.
 * Use SceneEntity.getOrAddComponent(TransformPosition) in the `onCreate` to setup, and
 * call transformPosition.x or transformPosition.y or transformPosition.z to use
 */
export class TransformPosition extends SceneEntityComponentWithProps {
  @SceneObjectProperty('transform.x')
  public x: number;

  @SceneObjectProperty('transform.y')
  public y: number;

  @SceneObjectProperty('transform.z')
  public z: number;

  /**
   * Creates a vector object representation of the position
   * @returns vector version of the position
   */
  public toVector(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * Transform the object to move to position defined by vector
   * @param vector the position
   */

  public moveTo(vector: Vector3): void {
    this.moveToCoordinates(vector.x, vector.y, vector.z);
  }
  /**
   * Transform the object to move by a vector delta
   * @param vector the change
   */
  public moveBy(vector: Vector3): void {
    this.moveToCoordinates(this.x + vector.x, this.y + vector.y, this.z + vector.z);
  }

  /**
   * Moves to a final coordinate
   * @param x the final x coordinate
   * @param y  the final y coordinate
   * @param z  the final z coordinate
   */
  public moveToCoordinates(x: number, y: number, z: number): void {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

/**
 * A shared component which holds the signals for the Scene Object's rotation transform.
 * Use SceneEntity.getOrAddComponent(TransformRotation) in the `onCreate` to setup, and
 * call transformRotation.x or transformRotation.y or transformRotation.z to use
 */
export class TransformRotation extends SceneEntityComponentWithProps {
  @SceneObjectProperty('transform.rotationX')
  public x: number;

  @SceneObjectProperty('transform.rotationY')
  public y: number;

  @SceneObjectProperty('transform.rotationZ')
  public z: number;

  /**
   * Creates a vector object representation of the rotation
   * @returns vector version of the rotation
   */
  public toVector(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * Rotate to a rotation value represented by Euler angles
   * @param rotation the rotation
   */
  public rotateTo(rotation: Vector3): void {
    this.rotateToRadians(rotation.x, rotation.y, rotation.z);
  }

  /**
   * Rotate by a rotation change represented by Euler angles
   * @param rotation the rotation
   */
  public rotateByEuler(rotation: Vector3): void {
    this.rotateToRadians(rotation.x + this.x, rotation.y + this.y, rotation.z + this.z);
  }

  /**
   * Rotate to a rotation defined by the quaternion
   * @param rotation the rotation
   */
  public rotateToQuaternion(rotation: Quaternion): void {
    this.rotateTo(rotation.toEulerAngles());
  }

  /**
   * Rotate by a quaternion
   * @param rotation the rotation
   */
  public rotateByQuaternion(rotation: Quaternion): void {
    this.rotateByEuler(rotation.toEulerAngles());
  }

  /**
   * Rotate the object in radians
   * @param x radians in x to rotate
   * @param y radians in y to rotate
   * @param z radians in z to rotate
   */
  public rotateToRadians(x: number, y: number, z: number): void {
    this.z = z;
    this.y = y;
    this.x = x;
  }
}

/**
 * A shared component which holds the signals for the Scene Object's scale transform.
 * Use SceneEntity.getOrAddComponent(TransformScale) in the `onCreate` to setup, and
 * call transformScale.x or transformScale.y or transformScale.z to use
 */
export class TransformScale extends SceneEntityComponentWithProps {
  @SceneObjectProperty('transform.scaleX')
  public x: number;

  @SceneObjectProperty('transform.scaleY')
  public y: number;

  @SceneObjectProperty('transform.scaleZ')
  public z: number;

  /**
   * Creates a vector object representation of the scale
   * @returns vector version of the scale
   */

  public toVector(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * Scale the scene object by a fixed value
   */
  public scaleBy(scale: number) {
    this.scaleToValues(this.x * scale, this.y * scale, this.z * scale);
  }

  /**
   * Scale the scene object to a fixed vector(x, y, z) values
   */
  public scaleTo(scale: Vector3): void {
    this.scaleToValues(scale.x, scale.y, scale.z);
  }

  /**
   * Scale the scene object to a fixed (x, y, z) values
   */
  public scaleToValues(x: number, y: number, z: number): void {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

/**
 * A parent component which holds references to the child components for position, rotation and scale.
 */
export class Transform extends SceneEntityComponent {
  public position: TransformPosition;
  public rotation: TransformRotation;
  public scale: TransformScale;

  public attachToSceneObject(sceneEntity: SceneEntity): void {
    super.attachToSceneObject(sceneEntity);
    this.position = this.sceneEntity.getOrAddComponent(TransformPosition);
    this.rotation = this.sceneEntity.getOrAddComponent(TransformRotation);
    this.scale = this.sceneEntity.getOrAddComponent(TransformScale);
  }

  public forwardDirection: Vector3 = Vector3.forward;

  /**
   * Look at, the object is rotate based on the difference between the
   * current forward direction and the destination.
   * This function takes the self and destination positions since the values
   * available in the component are local transforms and may be not comparable
   *
   * @param destinationPosition the position to aim at
   * @param selfPosition the position of the current scene object to aim at
   * @param forwardDirection optional: Reset the forward direction
   */
  public lookAt(destinationPosition: Vector3, selfPosition: Vector3, forwardDirection?: Vector3) {
    const deltaVector = destinationPosition.clone().sub(selfPosition).normalize();
    this.lookInDirection(deltaVector, forwardDirection);
  }

  /**
   * Look along a particular direction.
   *
   * @param direction the position to aim at
   * @param forwardDirection optional: Reset the forward direction
   */
  public lookInDirection(direction: Vector3, forwardDirection?: Vector3) {
    if (forwardDirection != null) {
      this.forwardDirection = forwardDirection;
    }
    const q = Quaternion.createBetweenVectors(this.forwardDirection, direction);
    this.rotation.rotateByQuaternion(q);
    this.forwardDirection = q.rotateVector(this.forwardDirection);
  }
}

/**
 * A shared component which provides readonly values for the local transform of the object
 */
export class ReadOnlyTransform extends SceneEntityComponentWithProps {
  @SceneObjectProperty('transform.x', true)
  public x: number;

  @SceneObjectProperty('transform.y', true)
  public y: number;

  @SceneObjectProperty('transform.z', true)
  public z: number;

  @SceneObjectProperty('transform.scaleX', true)
  public scaleX: number;

  @SceneObjectProperty('transform.scaleY', true)
  public scaleY: number;

  @SceneObjectProperty('transform.scaleZ', true)
  public scaleZ: number;

  @SceneObjectProperty('transform.rotationX', true)
  public rotationX: number;

  @SceneObjectProperty('transform.rotationY', true)
  public rotationY: number;

  @SceneObjectProperty('transform.rotationZ', true)
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
