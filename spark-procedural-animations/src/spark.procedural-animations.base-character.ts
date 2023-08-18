/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/**
 * Spark Procedural Animations - Base Character Infrastructure
 * version 0.9.4
 */

import D from 'Diagnostics';
import {
  ILookAtFunc,
  IQtReadonly,
  IV3Readonly,
  Math3D,
  Qt,
  Ray,
  V3,
} from './spark.procedural-animations.math-3d';
import {
  IActionOfT,
  IDisposable,
  IFuncOf2T,
  IFuncOf3T,
  IFuncOfT,
  IInitAsync,
  isNumEqual,
  IUpdatable,
  Rad2Deg,
  throwError,
  triangleHeight,
} from './spark.procedural-animations.core';
import {
  IResourcesManager,
  Object3D,
  ObjSummary,
  ObjView,
  ObjVirtual,
  ObjWrap,
  ResourcesManager,
} from './spark.procedural-animations.objects';
import {objPool, PostSolveAction} from './spark.procedural-animations.pool';
import {
  Behavior,
  BehaviorHolder,
  ILateUpdater,
  mainBehaviorExecutor,
  mainObjectManager,
  play,
  skipFrames,
} from './spark.procedural-animations.behaviors';

/**
 * Joint data
 */
export class JointData {
  constructor(
    public readonly name: string,
    public readonly viewFw: IV3Readonly,
    public readonly viewUp: IV3Readonly,
    public readonly viewLookAt: ILookAtFunc,
    public readonly adjustRot?: IQtReadonly,
    public readonly iniPos?: IV3Readonly,
    public readonly iniRot?: IV3Readonly,
  ) {}
}
/**
 * Character configuration
 */
export interface ICharacterConfig {
  /**
   * JointData by joint name
   */
  get jointsData(): {[key: string]: JointData};
  /**
   * joint name hyerarchy map
   */
  get jointsMap(): {[key: string]: string};
  /**
   * reversed joint name hyerarchy map
   */
  get reverseJointsMap(): {[key: string]: string};
  /**
   * characterb type
   */
  get type(): string;
  /**
   * arm rest from down degrees
   */
  armRestFromDownDegrees: number;
  /**
   * if not null will be invoked when character is initialized
   */
  initialize: IActionOfT<BaseCharacter>;
}
/**
 * character extender
 */
export interface ICharacterExtender {
  get name(): string;
  initialize(source: ICharacter): void;
}
/**
 * character IK solver
 */
export interface ISolverIK {
  solveIK();
  addPostSolveAction(t: number, act: IActionOfT<number>): void;
}
/**
 * factory
 */
export interface IFactory extends IDisposable, IInitAsync {
  get resources(): IResourcesManager;
  /**
   * returns service by name
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getServiceByName(name: string): any;
}
/**
 * Base K chain
 */
export abstract class BaseIkChain<T extends Object3D> extends ObjVirtual {
  private readonly _postSolveActions: PostSolveAction[];
  protected _enabled: boolean;
  /**
   * Creates an instance of base ik chain.
   * @param suffix - suffix that describes the IK chain
   * @param holder - model that holds the IK chain
   * @param getPositionAndRotation - initialization function witch returns position and rotation of the handle
   */
  constructor(
    suffix: string,
    protected readonly holder: T,
    getPositionAndRotation: IFuncOf2T<T, [V3, Qt]>,
  ) {
    const name = holder.name + '_chain_' + suffix;
    const [chainPos, chainRot] = getPositionAndRotation(holder);
    super(
      name,
      ObjSummary.createVirtual(holder.identifier + '_' + suffix, name),
      chainPos,
      chainRot.toEuler().mulBy_(Rad2Deg),
      V3.one,
      holder,
    );
    this._enabled = true;
    this._postSolveActions = [];
  }
  /**
   * Adds action that will be executed after IK chain is solved for the current frame
   * @param t - progress number from 0 to 1
   * @param act - action that will be executed after IK chain is solved for the current frame with progress number passed
   */
  addPostSolveAction(t: number, act: IActionOfT<number>): void {
    this._postSolveActions.push(PostSolveAction.create(t, act));
  }
  /**
   * Clears post solve actions
   */
  clearPostSolveActions(): void {
    this._postSolveActions.length = 0;
  }
  /**
   * Executes post solve actions
   */
  executePostSolveActions(): void {
    if (this._postSolveActions.length > 0) {
      for (let i = 0; i < this._postSolveActions.length; i++) {
        const e = this._postSolveActions[i];
        e.action(e.t);
      }
      this._postSolveActions.length = 0;
    }
  }
}
export const characterDeafultName = 'MODEL';
export class CharacterData {
  constructor(
    public readonly label: string,
    public readonly path: string,
    public readonly configFactory: {new (): ICharacterConfig},
    public readonly extenders: ICharacterExtender[],
  ) {}
}
export interface ICharacter extends IInitAsync {
  get label(): string;
  get data(): CharacterData;
  get config(): ICharacterConfig;
}
export abstract class CharacterFactory implements IFactory {
  private readonly _resources: IResourcesManager;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected readonly _serviceByName: {[key: string]: any};
  private readonly _characterData: CharacterData[];
  private readonly _characters: ICharacter[];
  private readonly _lateUpdaters: ILateUpdater[];
  private _getStartBehavior: IFuncOfT<Behavior>;
  protected framesToSkip = 1;
  constructor() {
    this._resources = new ResourcesManager();
    this._characterData = [];
    this._lateUpdaters = [];
    this._characters = [];
    this._getStartBehavior = () => null;
    this._serviceByName = {
      [CommonProviders.resources]: this._resources,
    };
  }
  protected abstract createCharacterAsync(
    resources: IResourcesManager,
    data: CharacterData,
  ): Promise<ICharacter>;
  protected onBeforeCreatingCharacters(): void {
    // override in derived class
  }
  /**
   * Adds character
   * @param label - label that describes the character
   * @param path - path or name of the character in the hierarchy
   * @param configFactory - factory method to create character config
   * @param extenders = optional list of extenders
   * @returns character
   */
  addCharacter(
    label: string,
    path: string,
    configFactory: {new (): ICharacterConfig},
    ...extenders: ICharacterExtender[]
  ): CharacterFactory {
    this._characterData.push(new CharacterData(label, path, configFactory, extenders));
    return this;
  }
  get characters(): ICharacter[] {
    return this._characters;
  }
  get resources(): IResourcesManager {
    return this._resources;
  }
  /**
   * Gets service by name
   * @param name - name of service
   * @returns service by name
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getServiceByName(name: string): any {
    return this._serviceByName[name];
  }
  /**
   * Sets service
   * @param name - name of service
   * @param service - service instance
   * @param [canOverride] - if false will throw error if service already exists, by defau;t false
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setService(name: string, service: any, canOverride: boolean = false): void {
    if (!canOverride && this._serviceByName.hasOwnProperty(name))
      throwError(`Service "${name}" is already defined!`);
    this._serviceByName[name] = service;
  }
  /**
   * Initializes async
   */
  async initializeAsync(): Promise<void> {
    await this._resources.loadAllObjectsAsync();

    this.onBeforeCreatingCharacters();

    for (let i = 0; i < this._characterData.length; i++) {
      const character = await this.createCharacterAsync(this._resources, this._characterData[i]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lateUpdater = (<any>character) as ILateUpdater;
      if (lateUpdater && lateUpdater.lateUpdate) {
        this._lateUpdaters.push(lateUpdater);
        mainObjectManager.addLateUpdater(lateUpdater);
      }
      this._characters.push(character);
    }

    const bvr = this._getStartBehavior();
    if (bvr) {
      if (this.framesToSkip < 1) play(bvr);
      else skipFrames(this.framesToSkip).thenPlay(bvr);
    }
  }
  /**
   * Specify main behavior to start
   * @template T - the type of the behavior
   * @template TFactory - type of the factory
   * @param type - the type of the behavior
   */
  start<T extends BaseCharacterBehavior<TFactory>, TFactory extends CharacterFactory>(type: {
    new (f: TFactory): T;
  }): CharacterFactory {
    this._getStartBehavior = () => this.createBvr(type);
    return this;
  }
  /**
   * Creates behavior
   * @template T - the type of the behavior to create
   * @template TFactory - type of the factory
   * @param type - the type of the behavior to create
   * @returns newly created behavior
   */
  createBvr<T extends BaseCharacterBehavior<TFactory>, TFactory extends CharacterFactory>(type: {
    new (f: TFactory): T;
  }): T {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fac = (<any>this) as TFactory;
    return new type(fac);
  }
  /**
   * Disposes character factory
   */
  dispose(): void {
    for (let i = 0; i < this._lateUpdaters.length; i++) {
      mainObjectManager.removeLateUpdater(this._lateUpdaters[i]);
    }
    this._lateUpdaters.length = 0;
  }
}
export abstract class BaseCharacterBehavior<T extends CharacterFactory> extends BehaviorHolder {
  private _factory: T;
  get factory(): T {
    return this._factory;
  }
  constructor(f: T) {
    super();
    this._factory = f;
  }
  /**
   * Creates behavior
   * @template T - the type of the behavior to create
   * @template TFactory - type of the factory
   * @param type - the type of the behavior to create
   * @returns newly created behavior
   */
  protected createBvr<
    T extends BaseCharacterBehavior<TFactory>,
    TFactory extends CharacterFactory,
  >(type: {new (f: TFactory): T}): T {
    return this.factory.createBvr(type);
  }
  /**
   * Creates and plays behavior
   * @template T - the type of the behavior to create
   * @template TFactory - type of the factory
   * @param type - the type of the behavior to create
   * @returns newly created behavior
   */
  protected createAndPlayBvr<
    T extends BaseCharacterBehavior<TFactory>,
    TFactory extends CharacterFactory,
  >(type: {new (f: TFactory): T}): T {
    const b = this.factory.createBvr(type);
    this.play(b);
    return b;
  }
}
/**
 * Terrain provider
 */
export interface ITerrainProvider {
  /**
   * returns height by 2D point and fills passed normal vector for that 2D point
   * @param x - 2D position x value
   * @param y - 2D position y value
   * @param [normal] - optional normal to fill
   * @param [cacheKey] - optional cache key - must be integer between 0 and 7, if not provider cacheId 0 will be used
   * @returns height for that 2D point
   */
  getHeightAndFillNormalByXY(x: number, y: number, normal?: V3, cacheKey?: number): number;
  /**
   * Fills point and normal passed that intersect
   * @param ray - ray that intersects with terrain
   * @param point3D - point of ray intersection with terrain to fill
   * @param [normal] - optional normal for the point of ray intersection with terrain to fill
   * @returns true if ray intersects with terrain, false otherwise
   */
  tryFillPointAndNormalByRay(ray: Ray, point3D: V3, normal?: V3): boolean;
}
export enum CommonProviders {
  terrain = 'terrain',
  camera = 'camera',
  resources = 'resources',
}
export class IkState {
  public readonly dirFirstToTip = V3.createPermanent(0, 0, 1);
  public readonly dirPlaneNormal = V3.createPermanent(0, 0, 1);
  public readonly firstPos = V3.createPermanent(0, 0, 0);
  public readonly polePos = V3.createPermanent(0, 1, 0);
  public readonly tipPos = V3.createPermanent(0, 0, 1);
  public readonly rootUp = V3.createPermanent(0, 1, 0);
  public readonly tipUp = V3.createPermanent(0, 1, 0);
  constructor(
    public readonly root: IkNode,
    public readonly tip: IkNode,
    public readonly isRight: boolean,
  ) {}
}
export class IkNode {
  public index: number = 0;
  constructor(public readonly obj: Object3D) {}
}
export type IkData = {
  nodes: IkNode[];
  allowFallBackAlg: boolean;
  startIndex: number;
  stickToInitial: boolean;
  extendTipBy: number;
  isRight: boolean;
  numberIterations: number;
  getPoleTargetPosition?: IFuncOf2T<IkData, IV3Readonly>;
  getPlaneUp?: IFuncOf2T<IkState, IV3Readonly>;
  getRootUp?: IFuncOf2T<IkState, IV3Readonly>;
  getTipUp?: IFuncOf2T<IkState, IV3Readonly>;
  getCustomNodeUp?: IFuncOf3T<IkState, IkNode, IV3Readonly>;
};
export abstract class InverseKinematicsChain extends ObjVirtual implements ISolverIK {
  private readonly _postSolveActions: PostSolveAction[];
  public enabled = true;
  constructor(boneName: string, model: Object3D) {
    const modelId = model ? model.identifier : 'IK';
    super(boneName, ObjSummary.createVirtual(modelId + '_' + boneName, boneName));
    this._postSolveActions = [];
  }
  abstract solveIK(): void;
  abstract get root(): Object3D;
  abstract get tip(): Object3D;
  abstract get pole(): Object3D;
  abstract get joints(): Object3D[];
  abstract get data(): IkData;
  /**
   * Adds action that will be executed after IK chain is solved for the current frame
   * @param t - progress number from 0 to 1
   * @param act - action that will be executed after IK chain is solved for the current frame with progress number passed
   */
  addPostSolveAction(t: number, act: IActionOfT<number>): void {
    this._postSolveActions.push(PostSolveAction.create(t, act));
  }
  /**
   * Clears post solve actions
   */
  clearPostSolveActions(): void {
    this._postSolveActions.length = 0;
  }
  /**
   * Executes post solve actions
   */
  executePostSolveActions(): void {
    if (this._postSolveActions.length > 0) {
      for (let i = 0; i < this._postSolveActions.length; i++) {
        const e = this._postSolveActions[i];
        e.action(e.t);
      }
      this.clearPostSolveActions();
    }
  }
}
export class FABRIK_IK extends InverseKinematicsChain implements ISolverIK {
  private readonly _pole: ObjVirtual = null;
  private readonly _prevHandlePos = V3.createPermanent(
    Number.MIN_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
  );
  private readonly _prevHandleRot = Qt.createPermanent(
    Number.MIN_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
  );
  private readonly _prevPolePos = V3.createPermanent(
    Number.MIN_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
  );
  private readonly _lengths: number[] = [];
  private readonly _ratios: number[] = [];
  private readonly _iniPoints: IV3Readonly[] = [];
  private readonly _points: V3[] = [];
  private readonly _upDirs: V3[] = [];
  private readonly _pointsTemp: V3[] = [];
  private readonly _upDirsTemp: V3[] = [];
  private readonly _rotTemp = Qt.createPermanent(0, 0, 0, 1);
  private readonly _polePos = V3.createPermanent(0, 0, 0);
  private readonly _hasPole: boolean;
  private readonly _fallBackToTrigonometry: boolean = false;
  private readonly _computeCustomUp: boolean = false;
  private readonly _state: IkState;
  private readonly _joints: Object3D[];
  private _lengthActive = 0;
  constructor(chainName: string, model: Object3D, public readonly data: IkData) {
    super(chainName, model);

    this.parent = data.nodes[0].obj;
    this.cloneViewFrom(data.nodes[0].obj);

    if (data.startIndex < 1) {
      D.warn(
        `IK "${chainName}" startIndex is specified as ${data.startIndex} ` +
          `cannot be less than 1, the index will be set to 1`,
      );
      data.startIndex = 1;
    }

    if (data.getPoleTargetPosition) {
      this._pole = this.createPoleTarget(
        this.summary.name + 'pole',
        data.getPoleTargetPosition(data),
      );
      this._pole.parent = data.nodes[0].obj;
      this._pole.cloneViewFrom(data.nodes[0].obj);
    }
    this._hasPole = !!this._pole;

    this._state = new IkState(data.nodes[0], data.nodes[data.nodes.length - 1], data.isRight);
    this._state.dirPlaneNormal.setFrom_(this._state.root.obj.v.up);

    this._joints = [];
    for (let i = 0; i < data.nodes.length; i++) {
      const node = data.nodes[i];
      node.index = i;
      this._joints.push(node.obj);
      const pos =
        i == 0
          ? V3.createPermanent()
          : node.obj.localToWorldPos(null, this._state.root.obj).permanent;
      // extending the tip point position might be needed for something like foot - we want to have the tip on the ground and not ankle level
      if (!isNumEqual(data.extendTipBy, 0, 0.0001) && i === data.nodes.length - 1) {
        const last = this._points[this._points.length - 1];
        const dist = last.distanceTo(pos);
        pos.setFrom_(last.add(last.dirTo(pos).by_(dist * (1 + data.extendTipBy))));
      }
      this._points.push(pos);
      this._iniPoints.push(pos.ensureReadonly);
      this._upDirs.push(V3.createPermanent(0, 0, 0));
      this._pointsTemp.push(V3.createPermanent(0, 0, 0));
      this._upDirsTemp.push(V3.createPermanent(0, 0, 0));
    }
    const lastIndex = this._points.length - 1; // tip
    const firstIndex = this.data.startIndex;
    this.factor = this._points[firstIndex].distanceTo(this._points[lastIndex]);

    this._lengthActive = 0;
    for (let i = 1; i < this._points.length; i++) {
      const prev = this._points[i - 1];
      const curr = this._points[i];
      const len = prev.distanceTo(curr);
      if (i >= firstIndex) this._lengthActive += len;
      this._lengths.push(len);
    }
    for (let i = 1; i < data.nodes.length; i++) {
      if (i < firstIndex) this._ratios.push(0);
      else this._ratios.push(this._lengths[i - 1] / this._lengthActive);
    }

    this._fallBackToTrigonometry = data.allowFallBackAlg && lastIndex - firstIndex == 2;
    this._computeCustomUp = !!this.data.getCustomNodeUp;

    this._pos = this._points[lastIndex];
    this._rot = this.v.lookAt(
      this._state.tip.obj.localToWorldVec(this._state.tip.obj.v.fw, this._state.root.obj),
      this._state.tip.obj.localToWorldVec(this._state.tip.obj.v.up, this._state.root.obj),
    );
    this.resetIniPos().resetIniRot();
  }
  solveIK(): void {
    if (!this.enabled) return;

    const hasPosChange = !this._pos.isEqual(this._prevHandlePos);
    const hasRotChange = !this._rot.isEqual(this._prevHandleRot);

    let hasPoleChange = false;
    if (this._hasPole) {
      // here we avoid this.pole.pos call to reduce heap allocations
      this._polePos.setXYZ_(this.pole.posX, this.pole.posY, this.pole.posZ);
      hasPoleChange = !this._polePos.isEqual(this._prevPolePos);
    }

    if (!hasPosChange && !hasRotChange && !hasPoleChange) {
      this.executePostSolveActions();
      return;
    }

    this._prevHandlePos.setFrom_(this._pos);
    this._prevHandleRot.setFrom_(this._rot);
    if (this._hasPole) this._prevPolePos.setFrom_(this._polePos);

    this.computeIkState();

    if (this._fallBackToTrigonometry) this.trigonometry();
    else this.FABRIK();

    if (this._computeCustomUp) this.computeCustomRotations();
    else this.computeRotations();

    this.applyToTransforms();

    this.executePostSolveActions();
  }
  get root(): Object3D {
    return this._state.root.obj;
  }
  get tip(): Object3D {
    return this._state.tip.obj;
  }
  get pole(): Object3D {
    return this._pole;
  }
  get joints(): Object3D[] {
    return this._joints;
  }
  private computeIkState(): void {
    const tip = this._state.tip;
    const root = this._state.root;
    if (this.pole) this._state.polePos.setXYZ_(this.pole.posX, this.pole.posY, this.pole.posZ);
    if (this.data.startIndex === 0) this._state.firstPos.setFrom_(V3.zero);
    else
      this._state.firstPos.setFrom_(
        this.data.nodes[this.data.startIndex].obj.localToWorldPos(null, root.obj),
      );

    this._state.tipPos.setFrom_(this._pos);
    this._state.dirFirstToTip.setFrom_(this._state.firstPos.dirTo(this._state.tipPos));
    if (this.data.getPlaneUp) {
      this._state.dirPlaneNormal.setFrom_(this.data.getPlaneUp(this._state));
    }
    this._state.rootUp.setFrom_(
      this.data.getRootUp ? this.data.getRootUp(this._state) : root.obj.rot.mulV3(root.obj.v.up),
    );
    this._state.tipUp.setFrom_(
      this.data.getTipUp ? this.data.getTipUp(this._state) : tip.obj.rot.mulV3(tip.obj.v.up),
    );
  }
  private trigonometry(): void {
    const firstIndex = this.data.startIndex;

    // Note: we are working with 3 joits system
    // for the arms it would be shoulder, elbow, hand
    // for the legs it would be hip, knee, and foot
    // here we use the tems for arm for simplicity
    const shoulder = this._state.firstPos;
    const pole = this._state.polePos;
    const hand = this._state.tipPos;
    const a = this._lengths[firstIndex];
    const b = this._lengths[firstIndex + 1];
    const c = shoulder.distanceTo(hand);

    // find the height of the triangle formed by upper arm and lower arm
    const h = triangleHeight(a, b, c);
    // use pythagorian theorem to find the point where projected height drops
    const projDist = Math.sqrt(a * a - h * h);
    const projPoint = shoulder.add(this._state.dirFirstToTip.by(projDist));
    // from that point move orthogonally to find the elbow position
    const dirToEllbow = this._state.dirPlaneNormal.cross(this._state.dirFirstToTip);
    const dirToPole = projPoint.dirTo(pole);
    // if the direction towards the pole and newly computed direction
    // are not pointing the same way
    // then flip the direction to ellbow
    if (dirToEllbow.dot(dirToPole) < 0) {
      dirToEllbow.mulBy_(-1);
    }
    const ellbow = projPoint.add(dirToEllbow.by(h));

    this._points[firstIndex + 1].setFrom_(ellbow);
  }
  private FABRIK(): void {
    // to make chain be "springy"
    if (this.data.stickToInitial) {
      // reassign initial points
      for (let i = 0; i < this._points.length - 1; ++i) {
        this._points[i].setFrom_(this._iniPoints[i]);
      }
    }

    const lastIndex = this._points.length - 1; // tip
    const firstIndex = this.data.startIndex;
    this._points[lastIndex].setFrom_(this._pos);

    // apply FABRIK logic
    const repetitions = this.data.numberIterations;
    for (let j = 0; j < repetitions; ++j) {
      // forward (tip) to (root)
      if (this._hasPole && j < 1) {
        const start = this._points[this.data.startIndex];
        const end = this._pos;
        const polePos = this.pole ? this.pole.pos : null;

        let ratio = 0;
        // forward (tip) to (root)
        for (let i = lastIndex; i > firstIndex + 1; --i) {
          ratio += this._ratios[i - 1];
          const current = Math3D.quadraticBezierV3(ratio, end, polePos, start);
          this._points[i - 1].setFrom_(current);
        }
      } else {
        // forward (tip) to (root)
        for (let i = lastIndex; i > firstIndex + 1; --i) {
          const len = this._lengths[i - 1];
          const dir = this._points[i].dirTo(this._points[i - 1]);
          this._points[i - 1].setFrom_(this._points[i].add(dir.mulBy_(len)));
          // here we may add individual joint constraints later...
        }
      }

      // and backward (root) to (tip)
      for (let i = firstIndex; i < lastIndex - 1; ++i) {
        const len = this._lengths[i];
        const dir = this._points[i].dirTo(this._points[i + 1]);
        this._points[i + 1].setFrom_(this._points[i].add(dir.mulBy_(len)));
        // here we may add individual joint constraints later...
      }
    }
  }
  private computeCustomRotations(): void {
    for (let i = 0; i < this.data.nodes.length; i++) {
      this._upDirs[i].setFrom_(this.data.getCustomNodeUp(this._state, this.data.nodes[i]));
    }
  }
  private computeRotations(): void {
    const lastIndex = this._points.length - 1; // tip
    const firstIndex = this.data.startIndex;

    const tipUp = this._state.tipUp;

    // move tip to root and ditribute tip UP
    let prevUp = tipUp;
    let prevFw: V3 = null;
    this._upDirs[lastIndex].setFrom_(tipUp);
    for (let i = lastIndex; i >= 1; --i) {
      const end = this._points[i];
      const start = this._points[i - 1];
      const currFw = start.dirTo(end);
      if (!prevFw) prevFw = currFw;
      const currUp = Math3D.projectUpDir(prevFw, prevUp, currFw);
      prevFw = currFw;
      prevUp = currUp;
      if (currUp.sqrMagnitude > 0.0001) this._upDirs[i - 1].setFrom_(currUp); // checking for singularity
    }

    const rootUp = this._state.rootUp;

    for (let i = 0; i < firstIndex; i++) {
      this._upDirs[i].setFrom_(rootUp);
    }
    // move (root) to (tip) and apply up
    prevUp = rootUp;
    prevFw = null;
    let ratio = 0;
    for (let i = firstIndex; i < lastIndex; ++i) {
      const end = this._points[i + 1];
      const start = this._points[i];
      const currFw = start.dirTo(end);
      if (!prevFw) prevFw = currFw;
      const currUp = Math3D.projectUpDir(prevFw, prevUp, currFw);
      prevFw = currFw;
      prevUp = currUp;
      const up = this._upDirs[i].rotTo01(currUp, ratio);
      this._upDirs[i].setFrom_(up);
      ratio += this._ratios[0];
    }
  }
  private applyToTransforms(): void {
    this._rotTemp.x = this._rotTemp.y = this._rotTemp.z = 0;
    this._rotTemp.w = 1;
    const lastIndex = this._points.length - 1; // tip
    const firstIndex = this.data.startIndex;

    for (let i = 0; i < this._points.length; i++) {
      this._pointsTemp[i].setFrom_(this._points[i]);
      this._upDirsTemp[i].setFrom_(this._upDirs[i]);
    }

    // conver to local any higher than level 1 and lower than firstIndex
    for (let i = 1; i < firstIndex; i++) {
      const node = this.data.nodes[i];
      const curr = this._pointsTemp[i];
      const qt = node.obj.rot;
      this._rotTemp.mul_(qt);
      qt.invert_();
      if (i < lastIndex - 1) {
        for (let j = i + 1; j <= lastIndex; ++j) {
          this._pointsTemp[j].sub_(curr).rotate_(qt);
          this._upDirsTemp[j].rotate_(qt);
        }
      }
    }

    for (let i = firstIndex; i <= lastIndex - 1; ++i) {
      const node = this.data.nodes[i];
      const curr = this._pointsTemp[i];
      const next = this._pointsTemp[i + 1];
      const up = this._upDirsTemp[i];
      const fw = curr.dirTo(next);
      const qt = node.obj.v.lookAt(fw, up);
      node.obj.rot = qt;
      this._rotTemp.mul_(qt);
      qt.invert_();
      if (i < lastIndex - 1) {
        for (let j = i + 1; j <= lastIndex; ++j) {
          this._pointsTemp[j].sub_(curr).rotate_(qt);
          this._upDirsTemp[j].rotate_(qt);
        }
      }
    }
    const tip = this.data.nodes[this.data.nodes.length - 1].obj;
    const tipRot = tip.v.lookAt(this._rot.mulV3(this.v.fw), this._rot.mulV3(this.v.up));
    tip.rot = this._rotTemp.invert_().mul_(tipRot);
  }

  /**
   * ompute pole position
   * @param d - IK Data
   * @param relMoveAlong - relative move along the chain direction (root to tip) 1 being the full length
   * @param [shift1] - optional shift as function taking "root view" and "tip to root length" parameters and returning shift vector in root space
   * @param [shift2] - optional shift as function taking "root view" and "tip to root length" parameters and returning shift vector in root space
   * @returns pole pos
   */
  static getPolePos(
    d: IkData,
    relMoveAlong: number,
    shift1?: IFuncOf3T<ObjView, number, IV3Readonly>,
    shift2?: IFuncOf3T<ObjView, number, IV3Readonly>,
  ): IV3Readonly {
    const root = d.nodes[0].obj;
    const tipPos = d.nodes[d.nodes.length - 1].obj.localToWorldPos(null, root);
    const tipMag = tipPos.magnitude;
    const p = tipPos.by_(relMoveAlong);
    if (shift1) p.add_(shift1(root.v, tipMag));
    if (shift2) p.add_(shift2(root.v, tipMag));
    return p;
  }
  private createPoleTarget(name: string, position: IV3Readonly): ObjVirtual {
    return new ObjVirtual(
      name,
      ObjSummary.createVirtual(this.summary.identifier + this.name, name),
      position,
    );
  }
}

/**
 * Builds object hierarchy
 * @param rootPath - root object path
 * @param createRoot - flag idicating if to create root object
 * @param objects - list of object summaries
 * @param jointsMap - map with joint names by path
 * @param joinsData - map with joint data by path
 * @param [objectsById] - optional map of object wraps by id to be filled
 * @param [objectsByName] - optional map of object wraps by name to be filled
 */
export function buildObjectHierarchy(
  rootPath: string,
  createRoot: boolean,
  objects: ObjSummary[],
  jointsMap: {[key: string]: string},
  joinsData: {[key: string]: JointData},
  objectsById?: {[key: string]: ObjWrap},
  objectsByName?: {[key: string]: ObjWrap},
): void {
  if (!objectsById) objectsById = {};
  if (!objectsByName) objectsByName = {};

  const subTree: [string, ObjSummary][] = [];
  let found = false;
  let rootSummary: ObjSummary = null;
  for (const ob of objects) {
    if (!rootSummary && ob.path == rootPath) rootSummary = ob;
    if (ob.path.startsWith(rootPath)) {
      found = true;
      subTree.push([ob.path.substring(rootPath.length), ob]);
    } else if (found) break;
  }

  const required: [string, ObjSummary][] = [];
  let lastKnownPath: string = null;
  // 2. iterate from the end
  for (let i = subTree.length - 1; i >= 0; i--) {
    const [subPath, curr] = subTree[i];
    let internalName = jointsMap[subPath];
    if (!internalName) {
      const arr = subPath.split('/');
      internalName = jointsMap[arr[arr.length - 1]];
    }
    const found = !!internalName;
    // 2.1 if FOUND:
    if (found) {
      lastKnownPath = subPath;
      // 2.1.1 mark as required
      required.push([internalName, curr]);
    } else {
      // 2.2 if NOT FOUND

      // 2.2.1 if last required starts with path
      if (!!lastKnownPath && lastKnownPath.startsWith(subPath)) {
        // 2.2.1.1 mark as required
        internalName = curr.name;

        required.push([!subPath ? internalName : subPath.split('/').join('_'), curr]);
      }
    }
  }

  let root: ObjWrap = null;
  if (createRoot) {
    root = new ObjWrap('MODEL', rootSummary);
    objectsById[root.obj.identifier] = root;
    objectsByName[root.name] = root;
    const modelData = joinsData['MODEL'];
    if (modelData) {
      root.setView(modelData.viewFw, modelData.viewUp, modelData.viewLookAt, modelData.adjustRot);
    }
  }

  // 3. for each required create object moving root to leaf (rememebre when we filled the array we moved leaf to root)
  for (let i = required.length - 1; i >= 0; i--) {
    const [name, os] = required[i];
    if (root && os.identifier === root.identifier) continue;
    const wrapper = new ObjWrap(name, os, root);
    const data = joinsData[name];
    if (data) wrapper.setView(data.viewFw, data.viewUp, data.viewLookAt, data.adjustRot);
    objectsById[os.identifier] = wrapper;
    wrapper.parent = os.parent ? objectsById[os.parent.identifier] : null;
    objectsByName[name] = wrapper;
  }
}
/**
 * Function that provides interface to describe IK chain state relative to the initial vector
 * @param ik - IK chain
 * @param func - function that takes 2 parameters (initial vector first node to tip, ik chain) and returns new vector
 * @returns vector
 */
export function iniIkVec(
  ik: InverseKinematicsChain,
  func: IFuncOf3T<IV3Readonly, InverseKinematicsChain, IV3Readonly>,
): V3 {
  const shoulder = ik.joints[ik.data.startIndex];
  const vec = func(ik.iniPos.sub(shoulder.iniPos).divBy_(ik.factor), ik);
  return shoulder.pos.divBy_(ik.factor).add_(vec);
}
/**
 * Interface forinverse kinematics factory
 */
export interface IIkFactory extends ICharacterExtender {
  /**
   * Method that takes dictionary of joints by name and IK chain type and returns the IK chain
   * @param jointsByName - dictionary of joints by name
   * @param type - chain type
   * @returns inverse kinematics chain
   */
  createIkChain(jointsByName: {[key: string]: Object3D}, type: string): InverseKinematicsChain;
}
export interface IAnimationController {
  /**
   * Invoked on animation initialization
   * @param character - character
   * @param holder - behavior holder
   */
  onStart(character: BaseCharacter, holder: BehaviorHolder): void;
}
export abstract class CharacterProceduralAnimation<
  TController extends IAnimationController,
  TFactory extends CharacterFactory,
> extends BaseCharacterBehavior<TFactory> {
  protected _character: BaseCharacter;
  protected _controller: TController;

  /**
   * Sets character and controller
   * @param ch - humanoid character
   * @param [control] - controller
   * @returns reference to itself for chaining
   */
  setCharacterAndController(
    ch: BaseCharacter,
    control: TController = null,
  ): CharacterProceduralAnimation<TController, TFactory> {
    this._character = ch;
    this._controller = control;
    return this;
  }
  /**
   * controller
   */
  get controller(): TController {
    return (
      this._controller ||
      throwError(
        'No controller available, pease invoke behavior.setCharacterAndController(character, controller) method before executing this behavior',
      )
    );
  }
  /**
   * character
   */
  get character(): BaseCharacter {
    return (
      this._character ||
      throwError(
        'No character available, pease invoke behavior.setCharacterAndController(character) method before executing this behavior',
      )
    );
  }
}
/**
 * Base character - abstract class for character
 */
export abstract class BaseCharacter extends ObjWrap implements ICharacter {
  protected readonly _jointsByName: {[key: string]: Object3D};
  protected readonly _objectsById: {[key: string]: Object3D};
  protected readonly _solvers: ISolverIK[];
  protected readonly _extenderByName: {[key: string]: ICharacterExtender};
  protected readonly _updaters: IUpdatable[];
  readonly config: ICharacterConfig;

  /**
   * Creates an instance of base character.
   * @param data - character data
   * @param summary - object summary of the top level object of the character
   */
  constructor(public readonly data: CharacterData, summary: ObjSummary) {
    super(data.label, summary);
    this.config = new data.configFactory();

    this._jointsByName = {};
    this._objectsById = {};
    this._solvers = [];
    this._updaters = [];
    this._extenderByName = {};
  }
  abstract get label(): string;
  abstract initializeAsync(): Promise<void>;
  get jointsByName(): {[key: string]: Object3D} {
    return this._jointsByName;
  }
  get objectsById(): {[key: string]: Object3D} {
    return this._objectsById;
  }
  get solvers(): ISolverIK[] {
    return this._solvers;
  }
  get extenderByName(): {[key: string]: ICharacterExtender} {
    return this._extenderByName;
  }
  get updaters(): IUpdatable[] {
    return this._updaters;
  }

  /**
   * Creates joints
   * @param resources - resources manager
   */
  protected createJoints(resources: IResourcesManager): void {
    const joinsData = this.config.jointsData;
    const jointsMap = this.config.reverseJointsMap;
    // 1. get paths where start with root path
    const subTree: [string, ObjSummary][] = [];
    const rootPath = this.summary.path;
    let found = false;
    for (const ob of resources.objects) {
      if (ob.path.startsWith(rootPath)) {
        found = true;
        subTree.push([ob.path.substring(rootPath.length), ob]);
      } else if (found) break;
    }

    const required: [string, ObjSummary][] = [];
    let lastKnownPath: string = null;
    // 2. iterate from the end
    for (let i = subTree.length - 1; i >= 0; i--) {
      const [subPath, curr] = subTree[i];
      let internalName = BaseCharacter.findInternalName(subPath, jointsMap);
      const found = !!internalName;
      // 2.1 if FOUND:
      if (found) {
        lastKnownPath = subPath;
        // 2.1.1 mark as required
        required.push([internalName, curr]);
      } else {
        // 2.2 if NOT FOUND

        // 2.2.1 if last required starts with path
        if (!!lastKnownPath && lastKnownPath.startsWith(subPath)) {
          // 2.2.1.1 mark as required
          internalName = curr.name;

          required.push([!subPath ? internalName : subPath.split('/').join('_'), curr]);
        }
      }
    }
    this._objectsById[this.identifier] = this;

    const modelData = joinsData[characterDeafultName];
    if (modelData)
      this.setView(modelData.viewFw, modelData.viewUp, modelData.viewLookAt, modelData.adjustRot);

    // 3. for each required create object moving root to leaf (rememebre when we filled the array we moved leaf to root)
    for (let i = required.length - 1; i >= 0; i--) {
      const [name, os] = required[i];
      if (os.identifier === this.identifier) continue;
      const wrapper = new ObjWrap(name, os, this);
      const data = joinsData[name];
      if (data) wrapper.setView(data.viewFw, data.viewUp, data.viewLookAt, data.adjustRot);
      this._objectsById[os.identifier] = wrapper;
      wrapper.parent = os.parent ? this._objectsById[os.parent.identifier] : null;
      this._jointsByName[name] = wrapper;
    }
  }
  protected async initializeExtendersAsync(): Promise<void> {
    for (const ext of this.data.extenders) {
      ext.initialize(this);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updatable: IUpdatable =
        typeof (<any>ext).update == 'function' ? <IUpdatable>(<any>ext) : null;
      if (updatable) this._updaters.push(updatable);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initAsync: IInitAsync =
        typeof (<any>ext).initializeAsync == 'function' ? <IInitAsync>(<any>ext) : null;
      if (initAsync) await initAsync.initializeAsync();
    }
    if (this.config.initialize) this.config.initialize(this);
  }
  /**
   * Populates extender by name map
   */
  protected buildExtenderByNameMap() {
    for (const ext of this.data.extenders) {
      this._extenderByName[ext.name] = ext;
    }
  }
  /**
   * Returns joint by name
   * @param name - joint name
   * @returns joint
   */
  protected getJoint(name: string): Object3D {
    return this._jointsByName[name] || null;
  }
  /**
   * Finds internal name - if path is not found will try to extract unique name instead
   * @param path - path to find
   * @param jointsMap - joints map taken from ICharacterConfig
   * @returns internal name
   */
  protected static findInternalName(path: string, jointsMap: {[key: string]: string}): string {
    let internalName = jointsMap[path];
    if (!internalName) {
      const arr = path.split('/');
      internalName = jointsMap[arr[arr.length - 1]];
    }
    return internalName || null;
  }
  /**
   * Gets ik factory from provided extenders, if no extender factory found will create the default factory
   * @param factoryExtenderName - name of extender factory
   * @param getDefault - function that creates default factory
   * @returns ik factory
   */
  protected getIkFactory(
    factoryExtenderName: string,
    getDefault: IFuncOfT<IIkFactory>,
  ): IIkFactory {
    let ikFactory = this._extenderByName[factoryExtenderName] as IIkFactory;
    if (!ikFactory || !ikFactory.createIkChain) {
      if (ikFactory && !ikFactory.createIkChain) {
        D.warn(
          `Invalid inverse kinematics factory definition, missing createIkChain method. Falling back to default IK provider.`,
        );
      }
      ikFactory = getDefault();
    }
    return ikFactory;
  }
  protected createIkChain(ikFactory: IIkFactory, name: string): InverseKinematicsChain {
    const chain = ikFactory.createIkChain(this._jointsByName, name);
    this._solvers.push(chain);
    return chain;
  }
  /**
   * On late updarte solve IK chains and invoke special late updaters
   */
  lateUpdate(): void {
    const sid = objPool.begin(mainBehaviorExecutor.frame);
    {
      for (let i = 0; i < this._solvers.length; ++i) {
        this._solvers[i].solveIK();
      }
      for (let i = 0; i < this._updaters.length; ++i) {
        this._updaters[i].update();
      }
    }
    objPool.end(sid);
  }
}
