/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/**
 * Spark Procedural Animations - Humanoid Characters
 * version 0.9.4
 */

import D from 'Diagnostics';
import CI from 'CameraInfo';
import {
  BaseCharacter,
  CharacterData,
  characterDeafultName,
  CharacterFactory,
  FABRIK_IK,
  ICharacter,
  ICharacterConfig,
  ICharacterExtender,
  IIkFactory,
  IkData,
  IkNode,
  InverseKinematicsChain,
  JointData,
} from './spark.procedural-animations.base-character';
import {Behavior, finishedBehavior, playFor} from './spark.procedural-animations.behaviors';
import {
  IActionOfT,
  IFuncOf2T,
  IInitAsync,
  isNumEqual,
  IUpdatable,
  smoothstep01,
  throwError,
} from './spark.procedural-animations.core';
import {
  IQtReadonly,
  IV3Readonly,
  lookAt_fw_up,
  lookAt_up_bk,
  lookAt_up_fw,
  lookAt_up_lt,
  lookAt_lt_bk,
  lookAt_rt_bk,
  lookAt_up_rt,
  Math3D,
  Qt,
  V3,
  V3Readonly,
} from './spark.procedural-animations.math-3d';
import {IBaseEvent, subscribe} from './spark.procedural-animations.messenger';
import {IResourcesManager, Object3D, ObjView} from './spark.procedural-animations.objects';
import {objPool} from './spark.procedural-animations.pool';

/**
 * Known joint types
 */
export enum JointType {
  MODEL = 'MODEL',
  ROOT = 'ROOT',
  SKELETON = 'SKELETON',
  HIPS = 'HIPS',
  LEFT_LEG_UPPER = 'LEFT_LEG_UPPER',
  LEFT_LEG_LOWER = 'LEFT_LEG_LOWER',
  LEFT_FOOT_ANKLE = 'LEFT_FOOT_ANKLE',
  LEFT_FOOT_BALL = 'LEFT_FOOT_BALL',
  RIGHT_LEG_UPPER = 'RIGHT_LEG_UPPER',
  RIGHT_LEG_LOWER = 'RIGHT_LEG_LOWER',
  RIGHT_FOOT_ANKLE = 'RIGHT_FOOT_ANKLE',
  RIGHT_FOOT_BALL = 'RIGHT_FOOT_BALL',
  SPINE_LOWER = 'SPINE_LOWER',
  SPINE_MIDDLE = 'SPINE_MIDDLE',
  SPINE_UPPER = 'SPINE_UPPER',
  CHEST = 'CHEST',
  NECK = 'NECK',
  HEAD = 'HEAD',
  JAW = 'JAW',
  LEFT_EYE = 'LEFT_EYE',
  RIGHT_EYE = 'RIGHT_EYE',
  LEFT_SHOULDER = 'LEFT_SHOULDER',
  LEFT_ARM_UPPER = 'LEFT_ARM_UPPER',
  LEFT_ARM_LOWER = 'LEFT_ARM_LOWER',
  LEFT_HAND_WRIST = 'LEFT_HAND_WRIST',
  RIGHT_SHOULDER = 'RIGHT_SHOULDER',
  RIGHT_ARM_UPPER = 'RIGHT_ARM_UPPER',
  RIGHT_ARM_LOWER = 'RIGHT_ARM_LOWER',
  RIGHT_HAND_WRIST = 'RIGHT_HAND_WRIST',
  LEFT_HAND_THUMB_TRAPEZIUM = 'LEFT_HAND_THUMB_TRAPEZIUM',
  LEFT_HAND_THUMB_META = 'LEFT_HAND_THUMB_META',
  LEFT_HAND_THUMB_PROXIMAL = 'LEFT_HAND_THUMB_PROXIMAL',
  LEFT_HAND_THUMB_DISTAL = 'LEFT_HAND_THUMB_DISTAL',
  LEFT_HAND_INDEX_META = 'LEFT_HAND_INDEX_META',
  LEFT_HAND_INDEX_PROXIMAL = 'LEFT_HAND_INDEX_PROXIMAL',
  LEFT_HAND_INDEX_INTERMEDIATE = 'LEFT_HAND_INDEX_INTERMEDIATE',
  LEFT_HAND_INDEX_DISTAL = 'LEFT_HAND_INDEX_DISTAL',
  LEFT_HAND_MIDDLE_META = 'LEFT_HAND_MIDDLE_META',
  LEFT_HAND_MIDDLE_PROXIMAL = 'LEFT_HAND_MIDDLE_PROXIMAL',
  LEFT_HAND_MIDDLE_INTERMEDIATE = 'LEFT_HAND_MIDDLE_INTERMEDIATE',
  LEFT_HAND_MIDDLE_DISTAL = 'LEFT_HAND_MIDDLE_DISTAL',
  LEFT_HAND_RING_META = 'LEFT_HAND_RING_META',
  LEFT_HAND_RING_PROXIMAL = 'LEFT_HAND_RING_PROXIMAL',
  LEFT_HAND_RING_INTERMEDIATE = 'LEFT_HAND_RING_INTERMEDIATE',
  LEFT_HAND_RING_DISTAL = 'LEFT_HAND_RING_DISTAL',
  LEFT_HAND_PINKY_META = 'LEFT_HAND_PINKY_META',
  LEFT_HAND_PINKY_PROXIMAL = 'LEFT_HAND_PINKY_PROXIMAL',
  LEFT_HAND_PINKY_INTERMEDIATE = 'LEFT_HAND_PINKY_INTERMEDIATE',
  LEFT_HAND_PINKY_DISTAL = 'LEFT_HAND_PINKY_DISTAL',
  RIGHT_HAND_THUMB_TRAPEZIUM = 'RIGHT_HAND_THUMB_TRAPEZIUM',
  RIGHT_HAND_THUMB_META = 'RIGHT_HAND_THUMB_META',
  RIGHT_HAND_THUMB_PROXIMAL = 'RIGHT_HAND_THUMB_PROXIMAL',
  RIGHT_HAND_THUMB_DISTAL = 'RIGHT_HAND_THUMB_DISTAL',
  RIGHT_HAND_INDEX_META = 'RIGHT_HAND_INDEX_META',
  RIGHT_HAND_INDEX_PROXIMAL = 'RIGHT_HAND_INDEX_PROXIMAL',
  RIGHT_HAND_INDEX_INTERMEDIATE = 'RIGHT_HAND_INDEX_INTERMEDIATE',
  RIGHT_HAND_INDEX_DISTAL = 'RIGHT_HAND_INDEX_DISTAL',
  RIGHT_HAND_MIDDLE_META = 'RIGHT_HAND_MIDDLE_META',
  RIGHT_HAND_MIDDLE_PROXIMAL = 'RIGHT_HAND_MIDDLE_PROXIMAL',
  RIGHT_HAND_MIDDLE_INTERMEDIATE = 'RIGHT_HAND_MIDDLE_INTERMEDIATE',
  RIGHT_HAND_MIDDLE_DISTAL = 'RIGHT_HAND_MIDDLE_DISTAL',
  RIGHT_HAND_RING_META = 'RIGHT_HAND_RING_META',
  RIGHT_HAND_RING_PROXIMAL = 'RIGHT_HAND_RING_PROXIMAL',
  RIGHT_HAND_RING_INTERMEDIATE = 'RIGHT_HAND_RING_INTERMEDIATE',
  RIGHT_HAND_RING_DISTAL = 'RIGHT_HAND_RING_DISTAL',
  RIGHT_HAND_PINKY_META = 'RIGHT_HAND_PINKY_META',
  RIGHT_HAND_PINKY_PROXIMAL = 'RIGHT_HAND_PINKY_PROXIMAL',
  RIGHT_HAND_PINKY_INTERMEDIATE = 'RIGHT_HAND_PINKY_INTERMEDIATE',
  RIGHT_HAND_PINKY_DISTAL = 'RIGHT_HAND_PINKY_DISTAL',
  LEFT_HAIR_FRONT_1 = 'LEFT_HAIR_FRONT_1',
  LEFT_HAIR_FRONT_2 = 'LEFT_HAIR_FRONT_2',
  LEFT_HAIR_BACK_1 = 'LEFT_HAIR_BACK_1',
  LEFT_HAIR_BACK_2 = 'LEFT_HAIR_BACK_2',
  RIGHT_HAIR_FRONT_1 = 'RIGHT_HAIR_FRONT_1',
  RIGHT_HAIR_FRONT_2 = 'RIGHT_HAIR_FRONT_2',
  RIGHT_HAIR_BACK_1 = 'RIGHT_HAIR_BACK_1',
  RIGHT_HAIR_BACK_2 = 'RIGHT_HAIR_BACK_2',

  IK_SPINE = 'IK_SPINE',
  IK_LEFT_ARM = 'IK_LEFT_ARM',
  IK_RIGHT_ARM = 'IK_RIGHT_ARM',
  IK_LEFT_LEG = 'IK_LEFT_LEG',
  IK_RIGHT_LEG = 'IK_RIGHT_LEG',
}
/**
 * Humanoid character factory
 */
export class HumanoidCharacterFactory extends CharacterFactory {
  public readonly humansList: HumanoidCharacter[];
  protected cameraTargetName: string;
  private _camera: CameraService;
  constructor() {
    super();
    this.humansList = [];
    this.cameraTargetName = 'camera_target';
  }
  get human(): HumanoidCharacter {
    return this.humansList.length == 0 ? null : this.humansList[0];
  }
  get camera(): CameraService {
    return this._camera;
  }
  /**
   * Override of the base create character async method - this creates a new humanoid character
   * @param resources
   * @param data
   * @returns character async
   */
  protected async createCharacterAsync(
    resources: IResourcesManager,
    data: CharacterData,
  ): Promise<ICharacter> {
    const human = new HumanoidCharacter(resources, data);
    await human.initializeAsync();
    this.humansList.push(human);
    return human;
  }

  async initializeAsync(): Promise<void> {
    await super.initializeAsync();
    const camTarget = this.resources.getFirstObjectByNameOrPath(this.cameraTargetName);
    if (camTarget) {
      this._camera = new CameraService(this.cameraTargetName, this.resources);
      this._camera.initialize();
    }
  }
}
/**
 * Default inverse kinematics factory
 */
export class DefaultHumanoidInverseKinematicsFactory implements IIkFactory {
  get name(): string {
    return 'HumanoidInverseKinematicsFactory';
  }
  initialize(source: ICharacter): void {}
  /**
   * Creates inverse kinematics chain
   * @param obn
   * @param type
   * @returns ik
   */
  createIkChain(obn: {[key: string]: Object3D}, type: string): InverseKinematicsChain {
    let isRight = false;
    let data: IkData = null;
    const j = JointType;
    switch (type) {
      case j.IK_SPINE:
        data = {
          nodes: [
            new IkNode(obn[j.HIPS]),
            new IkNode(obn[j.SPINE_LOWER]),
            new IkNode(obn[j.SPINE_MIDDLE]),
            new IkNode(obn[j.SPINE_UPPER]),
            new IkNode(obn[j.CHEST]),
          ].filter(e => !!e.obj),
          allowFallBackAlg: false,
          startIndex: 1,
          stickToInitial: true,
          extendTipBy: 0,
          isRight: false,
          numberIterations: 16,
          getRootUp: s => s.root.obj.v.bk, // get root up
          getTipUp: s => s.tip.obj.localToWorldVec(s.tip.obj.v.bk, s.root.obj),
        };
        return new FABRIK_IK(j.IK_SPINE, obn[characterDeafultName], data);
      case j.IK_RIGHT_ARM:
        isRight = true;
      case j.IK_LEFT_ARM:
        data = {
          nodes: [
            new IkNode(obn[isRight ? j.RIGHT_SHOULDER : j.LEFT_SHOULDER]),
            new IkNode(obn[isRight ? j.RIGHT_ARM_UPPER : j.LEFT_ARM_UPPER]),
            new IkNode(obn[isRight ? j.RIGHT_ARM_LOWER : j.LEFT_ARM_LOWER]),
            new IkNode(obn[isRight ? j.RIGHT_HAND_WRIST : j.LEFT_HAND_WRIST]),
          ],
          allowFallBackAlg: true,
          startIndex: 1,
          stickToInitial: false,
          extendTipBy: 0,
          isRight: isRight,
          numberIterations: 16,
          getPoleTargetPosition: d =>
            FABRIK_IK.getPolePos(
              d,
              0.33,
              (v, len) => v.bk.by(len * 0.5),
              (v, len) => v.dn.by(len * 0.5),
            ),
          getPlaneUp: s =>
            s.isRight
              ? Math3D.getNormalWithPoints(s.firstPos, s.polePos, s.tipPos)
              : Math3D.getNormalWithPoints(s.tipPos, s.polePos, s.firstPos),
          getRootUp: s => s.root.obj.v.up,
          getTipUp: s => s.tip.obj.localToWorldPos(s.tip.obj.v.up, s.root.obj),
          getCustomNodeUp: (s, n) =>
            n.index <= 1 ? s.rootUp : n.index >= 3 ? s.tipUp : s.dirPlaneNormal,
        };
        return new FABRIK_IK(
          isRight ? j.IK_RIGHT_ARM : j.IK_LEFT_ARM,
          obn[characterDeafultName],
          data,
        );
      case j.IK_RIGHT_LEG:
        isRight = true;
      case j.IK_LEFT_LEG:
        data = {
          nodes: [
            new IkNode(obn[j.HIPS]),
            new IkNode(obn[isRight ? j.RIGHT_LEG_UPPER : j.LEFT_LEG_UPPER]),
            new IkNode(obn[isRight ? j.RIGHT_LEG_LOWER : j.LEFT_LEG_LOWER]),
            new IkNode(obn[isRight ? j.RIGHT_FOOT_ANKLE : j.LEFT_FOOT_ANKLE]),
          ],
          allowFallBackAlg: true,
          startIndex: 1,
          stickToInitial: false,
          extendTipBy: 0.23,
          isRight: isRight,
          numberIterations: 16,
          getPoleTargetPosition: d =>
            FABRIK_IK.getPolePos(
              d,
              0.4,
              (v, len) => v.fw.by(len * 0.7),
              (v, len) => v.lt.by(len * 0.1),
            ),
          getPlaneUp: s => Math3D.getNormalWithPoints(s.tipPos, s.polePos, s.firstPos),
          getRootUp: s => s.root.obj.v.fw,
          getTipUp: s => s.tip.obj.localToWorldPos(s.tip.obj.v.fw, s.root.obj),
          getCustomNodeUp: (s, n) =>
            n.index <= 0
              ? s.rootUp
              : n.index >= 3
              ? s.tipUp
              : s.dirPlaneNormal.cross(s.dirFirstToTip).normalized,
        };
        return new FABRIK_IK(
          isRight ? j.IK_RIGHT_LEG : j.IK_LEFT_LEG,
          obn[characterDeafultName],
          data,
        );
    }
    throwError(`InverseKinematicsFactory error, unknown IK type "${type}"`);
  }
}
/**
 * Humanoid character
 */
export class HumanoidCharacter extends BaseCharacter implements ICharacter {
  private _root: Object3D;
  private _hips: Object3D;
  private _spineLower: Object3D;
  private _spineMiddle: Object3D;
  private _spineUpper: Object3D;
  private _chest: Object3D;
  private _shoulderR: Object3D;
  private _armUpperR: Object3D;
  private _armLowerR: Object3D;
  private _handWristR: Object3D;
  private _neck: Object3D;
  private _head: Object3D;
  private _jaw: Object3D;
  private _shoulderL: Object3D;
  private _armUpperL: Object3D;
  private _armLowerL: Object3D;
  private _handWristL: Object3D;
  private _legUpperR: Object3D;
  private _legLowerR: Object3D;
  private _footAnkleR: Object3D;
  private _footBallR: Object3D;
  private _legUpperL: Object3D;
  private _legLowerL: Object3D;
  private _footAnkleL: Object3D;
  private _footBallL: Object3D;
  private _eyeL: Object3D;
  private _eyeR: Object3D;
  private _handL: HandJoinsGroup;
  private _handR: HandJoinsGroup;
  private _spine: InverseKinematicsChain;
  private _armL: InverseKinematicsChain;
  private _armR: InverseKinematicsChain;
  private _legL: InverseKinematicsChain;
  private _legR: InverseKinematicsChain;
  private _isInitialized: boolean;
  private _actionName: string;
  constructor(public readonly resources: IResourcesManager, public readonly data: CharacterData) {
    const summary = resources.getFirstObjectByNameOrPath(data.path);
    if (!summary) throw new Error(`Cannot find path: "${data.path}"`);
    super(data, summary);

    this._actionName = '';
  }
  /**
   * character label
   */
  get label(): string {
    return this.data.label;
  }
  /**
   * Gets whether is initialized
   */
  get isInitialized(): boolean {
    return this._isInitialized;
  }
  /**
   * root joint
   */
  get root(): Object3D {
    return this._root;
  }
  /**
   * hips joint
   */
  get hips(): Object3D {
    return this._hips;
  }
  /**
   * lower spine joint
   */
  get spineLower(): Object3D {
    return this._spineLower;
  }
  /**
   * middle spine joint
   */
  get spineMiddle(): Object3D {
    return this._spineMiddle;
  }
  /**
   * upper spine joint
   */
  get spineUpper(): Object3D {
    return this._spineUpper;
  }
  /**
   * chest joint
   */
  get chest(): Object3D {
    return this._chest;
  }
  /**
   * right shoulder joint
   */
  get shoulderR(): Object3D {
    return this._shoulderR;
  }
  /**
   * right upper arm joint
   */
  get armUpperR(): Object3D {
    return this._armUpperR;
  }
  /**
   * right lower arm joint
   */
  get armLowerR(): Object3D {
    return this._armLowerR;
  }
  /**
   * right wrist joint
   */
  get handWristR(): Object3D {
    return this._handWristR;
  }
  /**
   * neck joint
   */
  get neck(): Object3D {
    return this._neck;
  }
  /**
   * head joint
   */
  get head(): Object3D {
    return this._head;
  }
  /**
   * jaw joint
   */
  get jaw(): Object3D {
    return this._jaw;
  }
  /**
   * left shoulder joint
   */
  get shoulderL(): Object3D {
    return this._shoulderL;
  }
  /**
   * left upper arm joint
   */
  get armUpperL(): Object3D {
    return this._armUpperL;
  }
  /**
   * left lower arm joint
   */
  get armLowerL(): Object3D {
    return this._armLowerL;
  }
  /**
   * left wrist joint
   */
  get handWristL(): Object3D {
    return this._handWristL;
  }
  /**
   * right upper leg joint
   */
  get legUpperR(): Object3D {
    return this._legUpperR;
  }
  /**
   * right lower leg joint
   */
  get legLowerR(): Object3D {
    return this._legLowerR;
  }
  /**
   * right ankle joint
   */
  get footAnkleR(): Object3D {
    return this._footAnkleR;
  }
  /**
   * right foot ball joint
   */
  get footBallR(): Object3D {
    return this._footBallR;
  }
  /**
   * left upper leg joint
   */
  get legUpperL(): Object3D {
    return this._legUpperL;
  }
  /**
   * left lower leg joint
   */
  get legLowerL(): Object3D {
    return this._legLowerL;
  }
  /**
   * left ankle joint
   */
  get footAnkleL(): Object3D {
    return this._footAnkleL;
  }
  /**
   * left foot ball joint
   */
  get footBallL(): Object3D {
    return this._footBallL;
  }
  /**
   * left eye joint
   */
  get eyeL(): Object3D {
    return this._eyeL;
  }
  /**
   * right eye joint
   */
  get eyeR(): Object3D {
    return this._eyeR;
  }
  /**
   * spine IK chain
   */
  get spine(): InverseKinematicsChain {
    return this._spine;
  }
  /**
   * left arm IK chain
   */
  get armL(): InverseKinematicsChain {
    return this._armL;
  }
  /**
   * right arm IK chain
   */
  get armR(): InverseKinematicsChain {
    return this._armR;
  }
  /**
   * left leg IK chain
   */
  get legL(): InverseKinematicsChain {
    return this._legL;
  }
  /**
   * right leg IK chain
   */
  get legR(): InverseKinematicsChain {
    return this._legR;
  }
  /**
   * left hand joints group
   */
  get handL(): HandJoinsGroup {
    return this._handL;
  }
  /**
   * right hand joints group
   */
  get handR(): HandJoinsGroup {
    return this._handR;
  }
  /**
   * joints by name
   */
  get joinsByName(): {[key: string]: Object3D} {
    return this._jointsByName;
  }
  /**
   * get current action name
   */
  get actionName(): string {
    return this._actionName;
  }
  /**
   * set current action name
   */
  set actionName(an: string) {
    this._actionName = an;
  }
  /**
   * Initializes joints and ensure hyierarchy
   */
  async initializeAsync(): Promise<void> {
    super.createJoints(this.resources);
    super.buildExtenderByNameMap();

    const j = JointType;
    this._root = this.getJoint(j.ROOT);
    this._hips = this.getJoint(j.HIPS);
    this._spineLower = this.getJoint(j.SPINE_LOWER);
    this._spineMiddle = this.getJoint(j.SPINE_MIDDLE);
    this._spineUpper = this.getJoint(j.SPINE_UPPER);
    this._chest = this.getJoint(j.CHEST);
    this._shoulderR = this.getJoint(j.RIGHT_SHOULDER);
    this._armUpperR = this.getJoint(j.RIGHT_ARM_UPPER);
    this._armLowerR = this.getJoint(j.RIGHT_ARM_LOWER);
    this._handWristR = this.getJoint(j.RIGHT_HAND_WRIST);
    this._neck = this.getJoint(j.NECK);
    this._head = this.getJoint(j.HEAD);
    this._shoulderL = this.getJoint(j.LEFT_SHOULDER);
    this._armUpperL = this.getJoint(j.LEFT_ARM_UPPER);
    this._armLowerL = this.getJoint(j.LEFT_ARM_LOWER);
    this._handWristL = this.getJoint(j.LEFT_HAND_WRIST);
    this._legUpperR = this.getJoint(j.RIGHT_LEG_UPPER);
    this._legLowerR = this.getJoint(j.RIGHT_LEG_LOWER);
    this._footAnkleR = this.getJoint(j.RIGHT_FOOT_ANKLE);
    this._footBallR = this.getJoint(j.RIGHT_FOOT_BALL);
    this._legUpperL = this.getJoint(j.LEFT_LEG_UPPER);
    this._legLowerL = this.getJoint(j.LEFT_LEG_LOWER);
    this._footAnkleL = this.getJoint(j.LEFT_FOOT_ANKLE);
    this._footBallL = this.getJoint(j.LEFT_FOOT_BALL);
    this._eyeL = this.getJoint(j.LEFT_EYE);
    this._eyeR = this.getJoint(j.RIGHT_EYE);
    this._jaw = this.getJoint(j.JAW);

    this._hips.factor = this._hips.worldPos.distanceTo(this.pos);

    this._handR = new HandJoinsGroup(
      true,
      this.getJoint(j.RIGHT_HAND_THUMB_TRAPEZIUM),
      this.getJoint(j.RIGHT_HAND_THUMB_META),
      this.getJoint(j.RIGHT_HAND_THUMB_PROXIMAL),
      this.getJoint(j.RIGHT_HAND_THUMB_DISTAL),
      this.getJoint(j.RIGHT_HAND_INDEX_META),
      this.getJoint(j.RIGHT_HAND_INDEX_PROXIMAL),
      this.getJoint(j.RIGHT_HAND_INDEX_INTERMEDIATE),
      this.getJoint(j.RIGHT_HAND_INDEX_DISTAL),
      this.getJoint(j.RIGHT_HAND_MIDDLE_META),
      this.getJoint(j.RIGHT_HAND_MIDDLE_PROXIMAL),
      this.getJoint(j.RIGHT_HAND_MIDDLE_INTERMEDIATE),
      this.getJoint(j.RIGHT_HAND_MIDDLE_DISTAL),
      this.getJoint(j.RIGHT_HAND_RING_META),
      this.getJoint(j.RIGHT_HAND_RING_PROXIMAL),
      this.getJoint(j.RIGHT_HAND_RING_INTERMEDIATE),
      this.getJoint(j.RIGHT_HAND_RING_DISTAL),
      this.getJoint(j.RIGHT_HAND_PINKY_META),
      this.getJoint(j.RIGHT_HAND_PINKY_PROXIMAL),
      this.getJoint(j.RIGHT_HAND_PINKY_INTERMEDIATE),
      this.getJoint(j.RIGHT_HAND_PINKY_DISTAL),
    );

    this._handL = new HandJoinsGroup(
      false,
      this.getJoint(j.LEFT_HAND_THUMB_TRAPEZIUM),
      this.getJoint(j.LEFT_HAND_THUMB_META),
      this.getJoint(j.LEFT_HAND_THUMB_PROXIMAL),
      this.getJoint(j.LEFT_HAND_THUMB_DISTAL),
      this.getJoint(j.LEFT_HAND_INDEX_META),
      this.getJoint(j.LEFT_HAND_INDEX_PROXIMAL),
      this.getJoint(j.LEFT_HAND_INDEX_INTERMEDIATE),
      this.getJoint(j.LEFT_HAND_INDEX_DISTAL),
      this.getJoint(j.LEFT_HAND_MIDDLE_META),
      this.getJoint(j.LEFT_HAND_MIDDLE_PROXIMAL),
      this.getJoint(j.LEFT_HAND_MIDDLE_INTERMEDIATE),
      this.getJoint(j.LEFT_HAND_MIDDLE_DISTAL),
      this.getJoint(j.LEFT_HAND_RING_META),
      this.getJoint(j.LEFT_HAND_RING_PROXIMAL),
      this.getJoint(j.LEFT_HAND_RING_INTERMEDIATE),
      this.getJoint(j.LEFT_HAND_RING_DISTAL),
      this.getJoint(j.LEFT_HAND_PINKY_META),
      this.getJoint(j.LEFT_HAND_PINKY_PROXIMAL),
      this.getJoint(j.LEFT_HAND_PINKY_INTERMEDIATE),
      this.getJoint(j.LEFT_HAND_PINKY_DISTAL),
    );

    this._jointsByName[characterDeafultName] = this;
    this._objectsById[this.identifier] = this;

    // check for externally supplied hand pose extenders and if none are supplied
    // then add default ones
    if (this._handL.fingers.length > 0) {
      let handExtL = this._extenderByName[HumanoidExtenderName.handPoseL];
      if (!handExtL) {
        handExtL = new HumanoidHandPoseExtender(false);
      }
      this.data.extenders.push(handExtL);
    }
    if (this._handR.fingers.length > 0) {
      let handExtR = this._extenderByName[HumanoidExtenderName.handPoseR];
      if (!handExtR) {
        handExtR = new HumanoidHandPoseExtender(true);
      }
      this.data.extenders.push(handExtR);
    }

    // check for externally supplied inverse kinematics factory and if none are supplied
    // then add default one
    const ikFactory = super.getIkFactory(
      HumanoidExtenderName.inverseKinematicsFactory,
      () => new DefaultHumanoidInverseKinematicsFactory(),
    );

    this._spine = super.createIkChain(ikFactory, JointType.IK_SPINE);
    this._armL = super.createIkChain(ikFactory, JointType.IK_LEFT_ARM);
    this._armR = super.createIkChain(ikFactory, JointType.IK_RIGHT_ARM);
    this._legL = super.createIkChain(ikFactory, JointType.IK_LEFT_LEG);
    this._legR = super.createIkChain(ikFactory, JointType.IK_RIGHT_LEG);

    await super.initializeExtendersAsync();

    this._isInitialized = true;
  }
  /**
   * Gets extender by name
   * @param name - extender name
   * @returns extender
   */
  getExtenderByName(name: string): ICharacterExtender {
    return this._extenderByName[name] || null;
  }
  async addExtenderAsync(extender: ICharacterExtender): Promise<void> {
    this._extenderByName[extender.name] = extender;
    extender.initialize(this);
    this.data.extenders.push(extender);

    const updatable: IUpdatable =
      typeof (<any>extender).update == 'function' ? <IUpdatable>(<any>extender) : null;
    if (updatable) this._updaters.push(updatable);

    const initAsync: IInitAsync =
      typeof (<any>extender).initializeAsync == 'function' ? <IInitAsync>(<any>extender) : null;
    if (initAsync) await initAsync.initializeAsync();
  }
  /**
   * Enables or disable IK chains
   * @param enableIk - flag indicating whether to enable IK or not
   * @returns reference to itself
   */
  enableIkChains(enableIk: boolean): HumanoidCharacter {
    this._spine.enabled = enableIk;
    this._armL.enabled = enableIk;
    this._armR.enabled = enableIk;
    this._legL.enabled = enableIk;
    this._legR.enabled = enableIk;
    return this;
  }
}
/**
 * Looks at world point after spine IK chain is solved
 * @param hm
 * @param point
 * @param [headTiltDeg]
 * @param [iniNeckRotW]
 * @param [mergeNeckWithIni01]
 */
export function lookAtWorldPointWithIK(
  hm: HumanoidCharacter,
  point: IV3Readonly,
  headTiltDeg = 0,
  iniNeckRotW: IQtReadonly = null,
  mergeNeckWithIni01 = 1,
): void {
  hm.spine.addPostSolveAction(mergeNeckWithIni01, t => {
    const dirToCamW = hm.neck.worldPos.dirTo(point);
    const upDir = hm.up;
    if (!isNumEqual(headTiltDeg, 0)) {
      upDir.rotAboutAxis_(dirToCamW, headTiltDeg);
    }
    const r1 = hm.neck.v.lookAt(dirToCamW, upDir);
    hm.neck.worldRot = !iniNeckRotW || t >= 1 ? r1 : iniNeckRotW.rotateTo(r1, t);
  });
}
/**
 * Hand fingers
 */
export enum HandFinger {
  Thumb1 = 'HAND_THUMB_META',
  Thumb2 = 'HAND_THUMB_PROXIMAL',
  Thumb3 = 'HAND_THUMB_DISTAL',
  Index1 = 'HAND_INDEX_PROXIMAL',
  Index2 = 'HAND_INDEX_INTERMEDIATE',
  Index3 = 'HAND_INDEX_DISTAL',
  Middle1 = 'HAND_MIDDLE_PROXIMAL',
  Middle2 = 'HAND_MIDDLE_INTERMEDIATE',
  Middle3 = 'HAND_MIDDLE_DISTAL',
  Ring1 = 'HAND_RING_PROXIMAL',
  Ring2 = 'HAND_RING_INTERMEDIATE',
  Ring3 = 'HAND_RING_DISTAL',
  Pinky1 = 'HAND_PINKY_PROXIMAL',
  Pinky2 = 'HAND_PINKY_INTERMEDIATE',
  Pinky3 = 'HAND_PINKY_DISTAL',
}
/**
 * Common hand poses
 */
export enum HandPose {
  none = 'none',
  initial = 'initial',
  fist = 'fist',
  flat = 'flat',
  relaxed = 'relaxed',
  spread = 'spread',
  waveOut = 'waveOut',
  waveIn = 'waveIn',
  thumbUp = 'thumbUp–',
  pointer = 'pointer',
}
export enum HumanoidCharacterEvent {
  handPose = 'ENACT_SYS_handPose',
}
export class HumanoidEvent_handPose implements IBaseEvent {
  /**
   * Creates an instance of humanoid event hand pose.
   * @param [label] - character label, if "*" is used, then it will apply to all characters
   * @param [side] - "L" pr "R", if "*" is used, then it will apply to both hands
   * @param [pose] - hand pose (from enum HandPose)
   * @param [seconds] - seconds to take the pose
   * @param [func] - function to control pose taking curve
   */
  constructor(
    public readonly label: string = '*',
    public readonly side: string = '*',
    public readonly pose: string = HandPose.initial,
    public readonly seconds: number = 0.5,
    public readonly func: IFuncOf2T<number, number> = null,
  ) {}
  get eventName(): string {
    return HumanoidCharacterEvent.handPose;
  }
}
/**
 * Known humanoid extender names
 */
export enum HumanoidExtenderName {
  handPoseR = 'handPoseR',
  handPoseL = 'handPoseL',
  blendShapes = 'blendShapes',
  face = 'face',
  lipsync = 'lipsync',
  inverseKinematicsFactory = 'inverseKinematicsFactory',
}
/**
 * extender for hand poses
 */
export class HumanoidHandPoseExtender implements ICharacterExtender {
  private readonly _isRight: boolean;
  private readonly _name: string;
  private readonly _poses: {[key: string]: {[key: string]: Qt}};
  private readonly _initial: {[key: string]: Qt};
  private _human: HumanoidCharacter;
  private _group: HandJoinsGroup;
  private _poseBvr: Behavior;
  constructor(isRight: boolean) {
    this._isRight = isRight;
    this._name = isRight ? HumanoidExtenderName.handPoseR : HumanoidExtenderName.handPoseL;
    this._poses = {};
    this._initial = {};
    this._poseBvr = finishedBehavior;
  }
  get name(): string {
    return this._name;
  }
  get sideSign(): number {
    return this._isRight ? 1 : -1;
  }
  get sideName(): string {
    return this._isRight ? 'R' : 'L';
  }
  /**
   * Defines hand poses
   */
  initialize(human: HumanoidCharacter): void {
    subscribe(HumanoidCharacterEvent.handPose, this.onHandPose.bind(this), human.identifier);
    this._human = human;
    this._group = this._isRight ? human.handR : human.handL;
    this.setPose(HandPose.initial, {});
    this.setPose(HandPose.waveIn, {
      [HandFinger.Thumb1]: v => v.lookAt(v.iniFw.rotTo(this.sideOut(v), 15), v.iniUp),
      [HandFinger.Thumb2]: v => v.lookAt(v.fw.rotDn(20, v).rotTo(this.sideOut(v), 15), v.up),
      [HandFinger.Index1]: v => v.lookAt(v.fw.rotTo(this.sideOut(v), 5).rotDn(18, v), v.up),
      [HandFinger.Index2]: v => v.lookAt(v.fw.rotDn(10, v), v.up),
      [HandFinger.Index3]: v => v.lookAt(v.fw.rotDn(7, v), v.up),
      [HandFinger.Middle1]: v => v.lookAt(v.fw.rotDn(20, v), v.up),
      [HandFinger.Middle2]: v => v.lookAt(v.fw.rotDn(10, v), v.up),
      [HandFinger.Middle3]: v => v.lookAt(v.fw.rotDn(7, v), v.up),
      [HandFinger.Ring1]: v => v.lookAt(v.fw.rotTo(this.sideIn(v), 8).rotDn(18, v), v.up),
      [HandFinger.Ring2]: v => v.lookAt(v.fw.rotDn(10, v), v.up),
      [HandFinger.Ring3]: v => v.lookAt(v.fw.rotDn(7, v), v.up),
      [HandFinger.Pinky1]: v => v.lookAt(v.fw.rotTo(this.sideIn(v), 12).rotDn(15, v), v.up),
      [HandFinger.Pinky2]: v => v.lookAt(v.fw.rotDn(10, v), v.up),
      [HandFinger.Pinky3]: v => v.lookAt(v.fw.rotDn(7, v), v.up),
    });
    this.setPose(HandPose.waveOut, {
      [HandFinger.Thumb1]: v => v.lookAt(v.iniFw.rotTo(this.sideOut(v).rotUp(10, v), 15), v.iniUp),
      [HandFinger.Thumb2]: v => v.lookAt(v.fw.rotTo(this.sideOut(v), 15), v.up),
      [HandFinger.Index1]: v => v.lookAt(v.fw.rotUp(13, v), v.up),
      [HandFinger.Index2]: v => v.lookAt(v.fw.rotUp(9, v), v.up),
      [HandFinger.Index3]: v => v.lookAt(v.fw.rotUp(5, v), v.up),
      [HandFinger.Middle1]: v => v.lookAt(v.fw.rotUp(13, v), v.up),
      [HandFinger.Middle2]: v => v.lookAt(v.fw.rotUp(9, v), v.up),
      [HandFinger.Middle3]: v => v.lookAt(v.fw.rotUp(5, v), v.up),
      [HandFinger.Ring1]: v => v.lookAt(v.fw.rotTo(this.sideIn(v), 8).rotUp(12, v), v.up),
      [HandFinger.Ring2]: v => v.lookAt(v.fw.rotUp(10, v), v.up),
      [HandFinger.Ring3]: v => v.lookAt(v.fw.rotUp(5, v), v.up),
      [HandFinger.Pinky1]: v => v.lookAt(v.fw.rotTo(this.sideIn(v), 12).rotUp(12, v), v.up),
      [HandFinger.Pinky2]: v => v.lookAt(v.fw.rotUp(10, v), v.up),
      [HandFinger.Pinky3]: v => v.lookAt(v.fw.rotUp(5, v), v.up),
    });
    this.setPose(HandPose.flat, {
      [HandFinger.Thumb1]: v => v.lookAt(v.iniFw.rotTo(this.sideOut(v).rotUp(10, v), 15), v.iniUp),
      [HandFinger.Thumb2]: v => v.lookAt(v.fw.rotTo(this.sideOut(v), 15), v.up),
      [HandFinger.Index1]: v => v.lookAt(v.fw.rotTo(this.sideOut(v), 7).rotUp(2, v), v.up),
      [HandFinger.Ring1]: v => v.lookAt(v.fw.rotTo(this.sideIn(v), 5), v.up),
      [HandFinger.Pinky1]: v => v.lookAt(v.fw.rotTo(this.sideIn(v), 7).rotUp(5, v), v.up),
    });
    this.setPose(HandPose.relaxed, {
      [HandFinger.Thumb1]: v => v.lookAt(v.iniFw.rotDn(5, v), v.iniUp),
      [HandFinger.Thumb2]: v => v.lookAt(v.fw.rotDn(5, v), v.up),
      [HandFinger.Thumb3]: v => v.lookAt(v.fw.rotDn(5, v), v.up),
      [HandFinger.Index1]: v => v.lookAt(v.fw.rotDn(65, v), v.up),
      [HandFinger.Index2]: v => v.lookAt(v.fw.rotDn(65, v), v.up),
      [HandFinger.Index3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
      [HandFinger.Middle1]: v => v.lookAt(v.fw.rotDn(75, v), v.up),
      [HandFinger.Middle2]: v => v.lookAt(v.fw.rotDn(70, v), v.up),
      [HandFinger.Middle3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
      [HandFinger.Ring1]: v => v.lookAt(v.fw.rotDn(80, v), v.up),
      [HandFinger.Ring2]: v => v.lookAt(v.fw.rotDn(80, v), v.up),
      [HandFinger.Ring3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
      [HandFinger.Pinky1]: v => v.lookAt(v.fw.rotDn(85, v), v.up),
      [HandFinger.Pinky2]: v => v.lookAt(v.fw.rotDn(85, v), v.up),
      [HandFinger.Pinky3]: v => v.lookAt(v.fw.rotDn(30, v), v.up),
    });
    this.setPose(HandPose.spread, {
      [HandFinger.Thumb1]: v => v.lookAt(v.iniFw.rotUp(10, v), v.iniUp),
      [HandFinger.Thumb2]: v => v.lookAt(v.fw.rotUp(5, v), v.up),
      [HandFinger.Index1]: v => v.lookAt(v.fw.rotUp(2, v).rotTo(this.sideIn(v), 20), v.up),
      [HandFinger.Index2]: v => v.lookAt(v.fw.rotUp(5, v), v.up),
      [HandFinger.Index3]: v => v.lookAt(v.fw.rotUp(5, v), v.up),
      [HandFinger.Middle1]: v => v.lookAt(v.fw.rotUp(2, v), v.up),
      [HandFinger.Middle2]: v => v.lookAt(v.fw.rotUp(5, v), v.up),
      [HandFinger.Middle3]: v => v.lookAt(v.fw.rotUp(5, v), v.up),
      [HandFinger.Ring1]: v => v.lookAt(v.fw.rotUp(2, v).rotTo(this.sideOut(v), 9), v.up),
      [HandFinger.Ring2]: v => v.lookAt(v.fw.rotUp(5, v), v.up),
      [HandFinger.Ring3]: v => v.lookAt(v.fw.rotUp(5, v), v.up),
      [HandFinger.Pinky1]: v => v.lookAt(v.fw.rotUp(2, v).rotTo(this.sideOut(v), 20), v.up),
      [HandFinger.Pinky2]: v => v.lookAt(v.fw.rotUp(5, v), v.up),
      [HandFinger.Pinky3]: v => v.lookAt(v.fw.rotUp(5, v), v.up),
    });
    this.setPose(HandPose.fist, {
      [HandFinger.Thumb1]: v => v.lookAt(v.iniFw.rotDn(10, v).rotTo(this.sideOut(v), 20), v.iniUp),
      [HandFinger.Thumb2]: v => v.lookAt(v.fw.rotDn(10, v), v.up),
      [HandFinger.Thumb3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
      [HandFinger.Index1]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Index2]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Index3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
      [HandFinger.Middle1]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Middle2]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Middle3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
      [HandFinger.Ring1]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Ring2]: v => v.lookAt(v.dn.rotBk(10, v), v.fw),
      [HandFinger.Ring3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
      [HandFinger.Pinky1]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Pinky2]: v => v.lookAt(v.dn.rotBk(10, v), v.fw),
      [HandFinger.Pinky3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
    });
    this.setPose(HandPose.thumbUp, {
      [HandFinger.Thumb1]: v => v.lookAt(v.iniFw.rotTo(this.sideIn(v), 10), v.iniUp),
      [HandFinger.Thumb2]: v => v.lookAt(v.fw.rotTo(this.sideIn(v), 10), v.up),
      [HandFinger.Thumb3]: v => v.lookAt(v.fw.rotTo(this.sideIn(v), 20), v.up),
      [HandFinger.Index1]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Index2]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Index3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
      [HandFinger.Middle1]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Middle2]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Middle3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
      [HandFinger.Ring1]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Ring2]: v => v.lookAt(v.dn.rotBk(10, v), v.fw),
      [HandFinger.Ring3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
      [HandFinger.Pinky1]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Pinky2]: v => v.lookAt(v.dn.rotBk(10, v), v.fw),
      [HandFinger.Pinky3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
    });
    this.setPose(HandPose.pointer, {
      [HandFinger.Thumb1]: v => v.lookAt(v.iniFw.rotTo(this.sideOut(v), 10), v.iniUp),
      [HandFinger.Thumb2]: v => v.lookAt(v.fw.rotTo(this.sideOut(v), 30), v.up),
      [HandFinger.Thumb3]: v => v.lookAt(v.fw.rotTo(this.sideOut(v), 60), v.up),
      [HandFinger.Index1]: v => v.lookAt(v.fw.rotTo(this.sideOut(v), 7).rotUp(2, v), v.up),
      [HandFinger.Middle1]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Middle2]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Middle3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
      [HandFinger.Ring1]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Ring2]: v => v.lookAt(v.dn.rotBk(10, v), v.fw),
      [HandFinger.Ring3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
      [HandFinger.Pinky1]: v => v.lookAt(v.dn, v.fw),
      [HandFinger.Pinky2]: v => v.lookAt(v.dn.rotBk(10, v), v.fw),
      [HandFinger.Pinky3]: v => v.lookAt(v.fw.rotDn(45, v), v.up),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private onHandPose(e: any) {
    if (!!this._human.label && e.label != '*' && e.label != this._human.label) return;
    if (!e.side) e.side = '*';
    if (e.side != '*' && e.side != this.sideName) return;
    if (e.pose == HandPose.none) {
      this._poseBvr.forceFinish();
      return;
    }

    const poseData = this._poses[e.pose];
    if (!poseData) {
      D.log(
        `Cannot find pose data for pose "${e.pose}" for side "${this.sideName}" for model "${this._human.label}"`,
      );
      return;
    }
    if (!e.seconds || e.seconds < 0) e.seconds = 0;
    if (!e.func) e.func = smoothstep01;
    this.applyPose(poseData, e.seconds, e.func);
  }
  private applyPose(
    poseData: {[key: string]: Qt},
    seconds: number,
    func: IFuncOf2T<number, number>,
  ) {
    this._poseBvr.forceFinish();
    for (let i = 0; i < this._group.fingers.length; i++) {
      const finger = this._group.fingers[i];
      this._initial[finger.name] = finger.rot;
    }
    if (isNaN(seconds) || seconds <= 0) {
      for (let i = 0; i < this._group.fingers.length; i++) {
        const finger = this._group.fingers[i];
        const tarRot = poseData[finger.name];
        finger.rot = tarRot;
      }
      return;
    }
    this._poseBvr = playFor(
      seconds,
      x => {
        const t = func(x);
        for (let i = 0; i < this._group.fingers.length; i++) {
          const finger = this._group.fingers[i];
          const iniRot = this._initial[finger.name];
          const tarRot = poseData[finger.name];
          if (!iniRot) {
            this._poseBvr.forceFinish();
            throw new Error(`Cannot find initial hand finger rotation ${finger.name}`);
          }
          if (!tarRot) {
            this._poseBvr.forceFinish();
            throw new Error(`Cannot find target hand finger rotation ${finger.name}`);
          }
          finger.rot = iniRot.rotateTo(tarRot, t);
        }
      },
      objPool,
    );
  }
  private sideOut(v: ObjView): IV3Readonly {
    return this._isRight ? v.rt : v.lt;
  }
  private sideIn(v: ObjView): IV3Readonly {
    return this._isRight ? v.lt : v.rt;
  }
  private setPose(name: string, instructions: {[key: string]: IFuncOf2T<ObjView, Qt>}) {
    this._poses[name] = this.generatePoseData(instructions);
  }
  private generatePoseData(instructions: {[key: string]: IFuncOf2T<ObjView, Qt>}): {
    [key: string]: Qt;
  } {
    const result: {[key: string]: Qt} = {};
    for (let i = 0; i < this._group.fingers.length; i++) {
      const finger: Object3D = this._group.fingers[i];
      if (!finger) continue;
      const rotFunc = instructions[this.removePrefix(finger.name)];
      if (!rotFunc) {
        result[finger.name] = finger.iniRot;
      } else {
        result[finger.name] = rotFunc(finger.view);
      }
    }
    return result;
  }
  private removePrefix(name: string) {
    return name.startsWith('LEFT_') || name.startsWith('RIGHT_')
      ? name
          .split('_')
          .filter((e, i) => i > 0)
          .join('_')
      : name;
  }
}
/**
 * Group of joints for the hand
 */
export class HandJoinsGroup {
  readonly fingers: Object3D[];
  constructor(
    public readonly isRight: boolean,
    public readonly thumbTrapezium: Object3D,
    public readonly thumbMeta: Object3D,
    public readonly thumbProximal: Object3D,
    public readonly thumbDistal: Object3D,
    public readonly indexMeta: Object3D,
    public readonly indexProximal: Object3D,
    public readonly indexIntermediate: Object3D,
    public readonly indexDistal: Object3D,
    public readonly middleMeta: Object3D,
    public readonly middleProximal: Object3D,
    public readonly middleIntermediate: Object3D,
    public readonly middleDistal: Object3D,
    public readonly ringMeta: Object3D,
    public readonly ringProximal: Object3D,
    public readonly ringIntermediate: Object3D,
    public readonly ringDistal: Object3D,
    public readonly pinkyMeta: Object3D,
    public readonly pinkyProximal: Object3D,
    public readonly pinkyIntermediate: Object3D,
    public readonly pinkyDistal: Object3D,
  ) {
    this.fingers = [
      this.thumbTrapezium,
      this.thumbMeta,
      this.thumbProximal,
      this.thumbDistal,
      this.indexMeta,
      this.indexProximal,
      this.indexIntermediate,
      this.indexDistal,
      this.middleMeta,
      this.middleProximal,
      this.middleIntermediate,
      this.middleDistal,
      this.ringMeta,
      this.ringProximal,
      this.ringIntermediate,
      this.ringDistal,
      this.pinkyMeta,
      this.pinkyProximal,
      this.pinkyIntermediate,
      this.pinkyDistal,
    ].filter(e => e);
  }
}
/**
 * Holder od a boolean
 */
export class ChangeHolder {
  constructor(public hasChange: boolean) {}
}
export class MixamoConfig implements ICharacterConfig {
  private readonly _jointsData: {[key: string]: JointData};
  private readonly _jointsMap: {[key: string]: string};
  private readonly _reverseJointsMap: {[key: string]: string};
  // put cube inside mixamorig:RightShoulder
  // align the cube object x = -13.7 deg, y = 2.5 deg z = 0.5
  private readonly adjustRotShoulderR = Qt.createPermanent(
    -0.11914642003075082,
    -0.022179249909738456,
    0.0017292859015473235,
    0.9926274331477888,
  );
  // put cube inside mixamorig:LeftShoulder
  // align the cube object as
  private readonly adjustRotShoulderL = new V3Readonly(-13.5, 0, 0).toQt(true);
  // to find adjustRotAnkleR quaternion place test cube object to be child of mixamorig:RightLeg
  // align cube object X = 33, y = 0, z = 0
  private readonly adjustRotAnkleR = Qt.createPermanent(
    0.28401534470392265,
    0,
    0,
    0.958819734868193,
  );
  // to find adjustRotAnkleR quaternion place test cube object to be child of mixamorig:LeftFoot
  // align cube object X = 33, y = 0, z = 0

  private readonly adjustRotAnkleL = Qt.createPermanent(
    0.28401534470392265,
    0,
    0,
    0.958819734868193,
  );

  constructor() {
    const j = JointType;
    this._jointsData = {
      [j.MODEL]: new JointData(j.MODEL, V3.fw, V3.up, lookAt_fw_up),
      [j.ROOT]: new JointData(j.ROOT, V3.fw, V3.up, lookAt_fw_up),
      [j.SKELETON]: new JointData(j.ROOT, V3.fw, V3.up, lookAt_fw_up),
      [j.HIPS]: new JointData(j.HIPS, V3.fw, V3.up, lookAt_fw_up),
      [j.SPINE_LOWER]: new JointData(j.SPINE_LOWER, V3.fw, V3.up, lookAt_fw_up),
      [j.SPINE_MIDDLE]: new JointData(j.SPINE_MIDDLE, V3.up, V3.bk, lookAt_up_bk),
      [j.SPINE_UPPER]: new JointData(j.SPINE_UPPER, V3.up, V3.bk, lookAt_up_bk),
      [j.CHEST]: new JointData(j.CHEST, V3.fw, V3.up, lookAt_fw_up),
      [j.RIGHT_SHOULDER]: new JointData(
        j.RIGHT_SHOULDER,
        V3.lt,
        V3.bk,
        lookAt_lt_bk,
        this.adjustRotShoulderR,
      ),
      [j.RIGHT_ARM_UPPER]: new JointData(j.RIGHT_ARM_UPPER, V3.up, V3.bk, lookAt_up_bk),
      [j.RIGHT_ARM_LOWER]: new JointData(j.RIGHT_ARM_LOWER, V3.up, V3.bk, lookAt_up_bk),
      [j.RIGHT_HAND_WRIST]: new JointData(j.RIGHT_HAND_WRIST, V3.up, V3.bk, lookAt_up_bk),
      //[j.RIGHT_HAND_THUMB_TRAPEZIUM]: ...),
      [j.RIGHT_HAND_THUMB_META]: new JointData(j.RIGHT_HAND_THUMB_META, V3.up, V3.lt, lookAt_up_lt),
      [j.RIGHT_HAND_THUMB_PROXIMAL]: new JointData(
        j.RIGHT_HAND_THUMB_PROXIMAL,
        V3.up,
        V3.lt,
        lookAt_up_lt,
      ),
      [j.RIGHT_HAND_THUMB_DISTAL]: new JointData(
        j.RIGHT_HAND_THUMB_DISTAL,
        V3.up,
        V3.lt,
        lookAt_up_lt,
      ),
      //[j.RIGHT_HAND_RING_META]: ...),
      [j.RIGHT_HAND_RING_PROXIMAL]: new JointData(
        j.RIGHT_HAND_RING_PROXIMAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.RIGHT_HAND_RING_INTERMEDIATE]: new JointData(
        j.RIGHT_HAND_RING_INTERMEDIATE,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.RIGHT_HAND_RING_DISTAL]: new JointData(
        j.RIGHT_HAND_RING_DISTAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      //[j.RIGHT_HAND_PINKY_META]: ...),
      [j.RIGHT_HAND_PINKY_PROXIMAL]: new JointData(
        j.RIGHT_HAND_PINKY_PROXIMAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.RIGHT_HAND_PINKY_INTERMEDIATE]: new JointData(
        j.RIGHT_HAND_PINKY_INTERMEDIATE,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.RIGHT_HAND_PINKY_DISTAL]: new JointData(
        j.RIGHT_HAND_PINKY_DISTAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      //[j.RIGHT_HAND_MIDDLE_META]: ...),
      [j.RIGHT_HAND_MIDDLE_PROXIMAL]: new JointData(
        j.RIGHT_HAND_MIDDLE_PROXIMAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.RIGHT_HAND_MIDDLE_INTERMEDIATE]: new JointData(
        j.RIGHT_HAND_MIDDLE_INTERMEDIATE,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.RIGHT_HAND_MIDDLE_DISTAL]: new JointData(
        j.RIGHT_HAND_MIDDLE_DISTAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      //[j.RIGHT_HAND_INDEX_META]: ...),
      [j.RIGHT_HAND_INDEX_PROXIMAL]: new JointData(
        j.RIGHT_HAND_INDEX_PROXIMAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.RIGHT_HAND_INDEX_INTERMEDIATE]: new JointData(
        j.RIGHT_HAND_INDEX_INTERMEDIATE,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.RIGHT_HAND_INDEX_DISTAL]: new JointData(
        j.RIGHT_HAND_INDEX_DISTAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.NECK]: new JointData(j.NECK, V3.fw, V3.up, lookAt_fw_up),
      [j.HEAD]: new JointData(j.HEAD, V3.fw, V3.up, lookAt_fw_up),
      //[j.JAW]: ...),
      //[j.LEFT_EYE]: ...),
      //[j.RIGHT_EYE]: ...),
      [j.LEFT_SHOULDER]: new JointData(
        j.LEFT_SHOULDER,
        V3.rt,
        V3.bk,
        lookAt_rt_bk,
        this.adjustRotShoulderL,
      ),
      [j.LEFT_ARM_UPPER]: new JointData(j.LEFT_ARM_UPPER, V3.up, V3.bk, lookAt_up_bk),
      [j.LEFT_ARM_LOWER]: new JointData(j.LEFT_ARM_LOWER, V3.up, V3.bk, lookAt_up_bk),
      [j.LEFT_HAND_WRIST]: new JointData(j.LEFT_HAND_WRIST, V3.up, V3.bk, lookAt_up_bk),
      //[j.LEFT_HAND_THUMB_TRAPEZIUM]: ...),
      [j.LEFT_HAND_THUMB_META]: new JointData(j.LEFT_HAND_THUMB_META, V3.up, V3.rt, lookAt_up_rt),
      [j.LEFT_HAND_THUMB_PROXIMAL]: new JointData(
        j.LEFT_HAND_THUMB_PROXIMAL,
        V3.up,
        V3.rt,
        lookAt_up_rt,
      ),
      [j.LEFT_HAND_THUMB_DISTAL]: new JointData(
        j.LEFT_HAND_THUMB_DISTAL,
        V3.up,
        V3.rt,
        lookAt_up_rt,
      ),
      //[j.LEFT_HAND_RING_META]: ...),
      [j.LEFT_HAND_RING_PROXIMAL]: new JointData(
        j.LEFT_HAND_RING_PROXIMAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.LEFT_HAND_RING_INTERMEDIATE]: new JointData(
        j.LEFT_HAND_RING_INTERMEDIATE,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.LEFT_HAND_RING_DISTAL]: new JointData(j.LEFT_HAND_RING_DISTAL, V3.up, V3.bk, lookAt_up_bk),
      //[j.LEFT_HAND_PINKY_META]: ...),
      [j.LEFT_HAND_PINKY_PROXIMAL]: new JointData(
        j.LEFT_HAND_PINKY_PROXIMAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.LEFT_HAND_PINKY_INTERMEDIATE]: new JointData(
        j.LEFT_HAND_PINKY_INTERMEDIATE,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.LEFT_HAND_PINKY_DISTAL]: new JointData(
        j.LEFT_HAND_PINKY_DISTAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      //[j.LEFT_HAND_MIDDLE_META]: ...),
      [j.LEFT_HAND_MIDDLE_PROXIMAL]: new JointData(
        j.LEFT_HAND_MIDDLE_PROXIMAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.LEFT_HAND_MIDDLE_INTERMEDIATE]: new JointData(
        j.LEFT_HAND_MIDDLE_INTERMEDIATE,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.LEFT_HAND_MIDDLE_DISTAL]: new JointData(
        j.LEFT_HAND_MIDDLE_DISTAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      //[j.LEFT_HAND_INDEX_META]: ...),
      [j.LEFT_HAND_INDEX_PROXIMAL]: new JointData(
        j.LEFT_HAND_INDEX_PROXIMAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.LEFT_HAND_INDEX_INTERMEDIATE]: new JointData(
        j.LEFT_HAND_INDEX_INTERMEDIATE,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.LEFT_HAND_INDEX_DISTAL]: new JointData(
        j.LEFT_HAND_INDEX_DISTAL,
        V3.up,
        V3.bk,
        lookAt_up_bk,
      ),
      [j.RIGHT_LEG_UPPER]: new JointData(j.RIGHT_LEG_UPPER, V3.up, V3.fw, lookAt_up_fw),
      [j.RIGHT_LEG_LOWER]: new JointData(j.RIGHT_LEG_LOWER, V3.up, V3.fw, lookAt_up_fw),
      [j.RIGHT_FOOT_ANKLE]: new JointData(
        j.RIGHT_FOOT_ANKLE,
        V3.up,
        V3.fw,
        lookAt_up_fw,
        this.adjustRotAnkleR,
      ),
      [j.RIGHT_FOOT_BALL]: new JointData(j.RIGHT_FOOT_BALL, V3.up, V3.fw, lookAt_up_fw),
      [j.LEFT_LEG_UPPER]: new JointData(j.LEFT_LEG_UPPER, V3.up, V3.fw, lookAt_up_fw),
      [j.LEFT_LEG_LOWER]: new JointData(j.LEFT_LEG_LOWER, V3.up, V3.fw, lookAt_up_fw),
      [j.LEFT_FOOT_ANKLE]: new JointData(
        j.LEFT_FOOT_ANKLE,
        V3.up,
        V3.fw,
        lookAt_up_fw,
        this.adjustRotAnkleL,
      ),
      [j.LEFT_FOOT_BALL]: new JointData(j.LEFT_FOOT_BALL, V3.up, V3.fw, lookAt_up_fw),
    };

    this._jointsMap = {
      [j.ROOT]: 'skeleton',
      [j.HIPS]: 'mixamorig:Hips',
      // [j.SPINE_LOWER]: "",
      [j.SPINE_MIDDLE]: 'mixamorig:Spine',
      [j.SPINE_UPPER]: 'mixamorig:Spine1',
      [j.CHEST]: 'mixamorig:Spine2',
      [j.RIGHT_SHOULDER]: 'mixamorig:RightShoulder',
      [j.RIGHT_ARM_UPPER]: 'mixamorig:RightArm',
      [j.RIGHT_ARM_LOWER]: 'mixamorig:RightForeArm',
      [j.RIGHT_HAND_WRIST]: 'mixamorig:RightHand',
      //[j.RIGHT_HAND_THUMB_TRAPEZIUM]: "",
      [j.RIGHT_HAND_THUMB_META]: 'mixamorig:RightHandThumb1',
      [j.RIGHT_HAND_THUMB_PROXIMAL]: 'mixamorig:RightHandThumb2',
      [j.RIGHT_HAND_THUMB_DISTAL]: 'mixamorig:RightHandThumb3',
      //[j.RIGHT_HAND_RING_META]: "",
      [j.RIGHT_HAND_RING_PROXIMAL]: 'mixamorig:RightHandRing1',
      [j.RIGHT_HAND_RING_INTERMEDIATE]: 'mixamorig:RightHandRing2',
      [j.RIGHT_HAND_RING_DISTAL]: 'mixamorig:RightHandRing3',
      //[j.RIGHT_HAND_PINKY_META]: "",
      [j.RIGHT_HAND_PINKY_PROXIMAL]: 'mixamorig:RightHandPinky1',
      [j.RIGHT_HAND_PINKY_INTERMEDIATE]: 'mixamorig:RightHandPinky2',
      [j.RIGHT_HAND_PINKY_DISTAL]: 'mixamorig:RightHandPinky3',
      //[j.RIGHT_HAND_MIDDLE_META]: "",
      [j.RIGHT_HAND_MIDDLE_PROXIMAL]: 'mixamorig:RightHandMiddle1',
      [j.RIGHT_HAND_MIDDLE_INTERMEDIATE]: 'mixamorig:RightHandMiddle2',
      [j.RIGHT_HAND_MIDDLE_DISTAL]: 'mixamorig:RightHandMiddle3',
      //[j.RIGHT_HAND_INDEX_META]: "",
      [j.RIGHT_HAND_INDEX_PROXIMAL]: 'mixamorig:RightHandIndex1',
      [j.RIGHT_HAND_INDEX_INTERMEDIATE]: 'mixamorig:RightHandIndex2',
      [j.RIGHT_HAND_INDEX_DISTAL]: 'mixamorig:RightHandIndex3',
      [j.NECK]: 'mixamorig:Neck',
      [j.HEAD]: 'mixamorig:Head',
      // [j.JAW]: "",
      // [j.LEFT_EYE]: "",
      // [j.RIGHT_EYE]: "",
      [j.LEFT_SHOULDER]: 'mixamorig:LeftShoulder',
      [j.LEFT_ARM_UPPER]: 'mixamorig:LeftArm',
      [j.LEFT_ARM_LOWER]: 'mixamorig:LeftForeArm',
      [j.LEFT_HAND_WRIST]: 'mixamorig:LeftHand',
      //[j.LEFT_HAND_THUMB_TRAPEZIUM]: "",
      [j.LEFT_HAND_THUMB_META]: 'mixamorig:LeftHandThumb1',
      [j.LEFT_HAND_THUMB_PROXIMAL]: 'mixamorig:LeftHandThumb2',
      [j.LEFT_HAND_THUMB_DISTAL]: 'mixamorig:LeftHandThumb3',
      //[j.LEFT_HAND_RING_META]: "",
      [j.LEFT_HAND_RING_PROXIMAL]: 'mixamorig:LeftHandRing1',
      [j.LEFT_HAND_RING_INTERMEDIATE]: 'mixamorig:LeftHandRing2',
      [j.LEFT_HAND_RING_DISTAL]: 'mixamorig:LeftHandRing3',
      //[j.LEFT_HAND_PINKY_META]: "",
      [j.LEFT_HAND_PINKY_PROXIMAL]: 'mixamorig:LeftHandPinky1',
      [j.LEFT_HAND_PINKY_INTERMEDIATE]: 'mixamorig:LeftHandPinky2',
      [j.LEFT_HAND_PINKY_DISTAL]: 'mixamorig:LeftHandPinky3',
      //[j.LEFT_HAND_MIDDLE_META]: "",
      [j.LEFT_HAND_MIDDLE_PROXIMAL]: 'mixamorig:LeftHandMiddle1',
      [j.LEFT_HAND_MIDDLE_INTERMEDIATE]: 'mixamorig:LeftHandMiddle2',
      [j.LEFT_HAND_MIDDLE_DISTAL]: 'mixamorig:LeftHandMiddle3',
      //[j.LEFT_HAND_INDEX_META]: "",
      [j.LEFT_HAND_INDEX_PROXIMAL]: 'mixamorig:LeftHandIndex1',
      [j.LEFT_HAND_INDEX_INTERMEDIATE]: 'mixamorig:LeftHandIndex2',
      [j.LEFT_HAND_INDEX_DISTAL]: 'mixamorig:LeftHandIndex3',
      [j.RIGHT_LEG_UPPER]: 'mixamorig:RightUpLeg',
      [j.RIGHT_LEG_LOWER]: 'mixamorig:RightLeg',
      [j.RIGHT_FOOT_ANKLE]: 'mixamorig:RightFoot',
      [j.RIGHT_FOOT_BALL]: 'mixamorig:RightToeBase',
      [j.LEFT_LEG_UPPER]: 'mixamorig:LeftUpLeg',
      [j.LEFT_LEG_LOWER]: 'mixamorig:LeftLeg',
      [j.LEFT_FOOT_ANKLE]: 'mixamorig:LeftFoot',
      [j.LEFT_FOOT_BALL]: 'mixamorig:LeftToeBase',
    };
    this._reverseJointsMap = {};
    for (const key in this._jointsMap) {
      const value = this._jointsMap[key];
      this._reverseJointsMap[value] = key;
    }
  }
  initialize: IActionOfT<BaseCharacter> = null;
  get jointsData(): {[key: string]: JointData} {
    return this._jointsData;
  }
  get jointsMap(): {[key: string]: string} {
    return this._jointsMap;
  }
  get reverseJointsMap(): {[key: string]: string} {
    return this._reverseJointsMap;
  }
  get type(): string {
    return 'mixamo1';
  }
  armRestFromDownDegrees = 7;
}
export class CameraService {
  private readonly _cameraPos: V3;
  constructor(private readonly targetPath: string, private readonly resources: IResourcesManager) {
    this._cameraPos = V3.createPermanent();
  }
  initialize(): void {
    const camTargetSum = this.resources.getFirstObjectByNameOrPath(this.targetPath);
    if (!camTargetSum) throw new Error(`Cannot find camera service path "${this.targetPath}"`);
    const camTarget = camTargetSum.obj;
    const camTransform = CI.viewMatrix.inverse();
    camTarget.worldTransform.position = camTransform.position;
    this._cameraPos.updateAsPositionFromReactive_(camTarget.transform);
  }
  getHorzBodyAngleToCameraDeg(hm: Object3D): number {
    const modelFw = hm.rot.mulV3(hm.v.fw).setY_(0).normalized;
    const ditToCam = hm.pos.horzDirTo(this._cameraPos);
    return modelFw.unsignedDegreesTo(ditToCam);
  }
  getBodyAngleToCameraDeg(hm: Object3D): number {
    const modelFw = hm.rot.mulV3(hm.v.fw).normalized;
    const ditToCam = hm.pos.dirTo(this._cameraPos);
    return modelFw.unsignedDegreesTo(ditToCam);
  }
  get cameraPos(): V3 {
    return this._cameraPos.clone();
  }
}
