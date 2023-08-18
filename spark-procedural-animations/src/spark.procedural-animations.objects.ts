/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @ format
 */

/**
 * Spark Procedural Animations - Objects and Actuators
 * version 0.9.4
 */
//TODO:change
import D from 'Diagnostics';
import S from 'Scene';
import R from 'Reactive';
import {
  Behavior,
  IPosterToNative,
  mainObjectManager,
} from './spark.procedural-animations.behaviors';
import {
  from01ToRange,
  IActionOf4T,
  IActionOfT,
  IDisposable,
  IFuncOf2T,
  IFuncOfT,
  interpolate,
  Space,
  throwError,
} from './spark.procedural-animations.core';
import {
  ILookAtFunc,
  IObjViewOrientation,
  IQtReadonly,
  IV3Readonly,
  lookAt_fw_up,
  Math3D,
  Qt,
  V3,
} from './spark.procedural-animations.math-3d';

export interface IActuatorApplier {
  /**
   * Applies actuator progress
   * @param tCycle01 - progres
   * @param tMerge01 - merge progress with previous state, if not pased or if above 1 then no merge with previous state is done
   * @returns reference to itself
   */
  apply(tCycle01: number, tMerge01: number): IActuatorApplier;
}
export interface IActuatorApplierHolder {
  /**
   * Returns actuator
   */
  get actuator(): IActuatorApplier;
  /**
   * Returns actuator (shortcut alias)
   */
  get a(): IActuatorApplier; // shortcut alias
}
export interface IV3ByProgress {
  /**
   * Type of progress
   */
  get type(): string;
  /**
   * Gets local | world space
   */
  get space(): Space;
  /**
   * Sets local | world space
   */
  set space(s: Space);
  /**
   * Invoke to apply progress
   */
  valueByProgress(tCycle: number, tMerge: number): V3;
}
export interface IQtByProgress {
  /**
   * Type of progress
   */
  get type(): string;
  /**
   * Gets local | world space
   */
  get space(): Space;
  /**
   * Sets local | world space
   */
  set space(s: Space);
  /**
   * Invoke to apply progress
   */
  valueByProgress(tCycle: number, tMerge: number): Qt;
}
export interface IResourcesManager {
  /**
   * Get first path by name
   * @param name - object name
   * @returns first path by name
   */
  getFirstPathByName(name: string): string;
  /**
   * Get first object by name
   * @param name - object name
   * @returns first object by name
   */
  getFirstObjectByName(name: string): ObjSummary;
  /**
   * Get first object by name or path
   * @param nameOrPath - name or path - if starts with / will be assumed to be path
   * @returns first object by name or path
   */
  getFirstObjectByNameOrPath(nameOrPath: string): ObjSummary;
  /**
   * Load all scene objects
   * @param [force] - if false or not set will only load all objects once
   * @returns all objects async
   */
  loadAllObjectsAsync(force?: boolean): Promise<void>;
  /**
   * List of all objects
   */
  get objects(): ObjSummary[];
  /**
   * Hashtable of objects by path
   */
  get objectsByPath(): {[key: string]: ObjSummary};
  /**
   * Hashtable of objects by ID
   */
  get objectsById(): {[key: string]: ObjSummary};
}
export class ResourcesManager implements IResourcesManager {
  private readonly _objectsById: {[key: string]: ObjSummary};
  private readonly _objectsByPath: {[key: string]: ObjSummary};
  private readonly _objects: ObjSummary[];
  private readonly _pathByName: {[key: string]: string};
  private _areAllObjectsLoaded: boolean;
  constructor() {
    this._objectsById = {};
    this._objectsByPath = {};
    this._pathByName = {};
    this._objects = [];
    this._areAllObjectsLoaded = false;
  }
  /**
   * Get first path by name
   * @param name - object name
   * @returns first path by name
   */
  getFirstPathByName(name: string): string {
    if (name.startsWith('{') && name.endsWith('}')) name = name.substring(1, name.length - 1);
    const foundPath = this._pathByName[name];
    if (foundPath) return foundPath;

    for (const path in this._objectsByPath) {
      if (path.endsWith(`/${name}`)) return path;
    }
    return null;
  }
  /**
   * Get first object by name
   * @param name - object name
   * @returns first object by name
   */
  getFirstObjectByName(name: string): ObjSummary {
    return this.objectsByPath[this.getFirstPathByName(name)];
  }
  /**
   * Get first object by name or path
   * @param nameOrPath - name or path - if starts with / will be assumed to be path
   * @returns first object by name or path
   */
  getFirstObjectByNameOrPath(nameOrPath: string): ObjSummary {
    return nameOrPath.startsWith('/')
      ? this.objectsByPath[nameOrPath]
      : this.getFirstObjectByName(nameOrPath);
  }
  /**
   * Load all scene objects
   * @param [force] - if false or not set will only load all objects once
   * @returns all objects async
   */
  async loadAllObjectsAsync(force?: boolean): Promise<void> {
    if (this._areAllObjectsLoaded && !force) return;
    const all = await S.root.findByPath('**');
    const parents = await Promise.all(all.map(e => e.getParent()));
    const summaries: ObjSummary[] = [];
    // step 1: wrap each object in summary
    for (let i = 0; i < all.length; ++i) {
      const current = all[i];
      const summary = ObjSummary.create(current);
      this._objectsById[current.identifier] = summary;
      summaries.push(summary);
    }
    // step 2: for each summary get the parent adn assign parent summary
    for (let i = 0; i < summaries.length; ++i) {
      const current = summaries[i];
      const currentParent = parents[i];
      // right now top parent is object with empty name this is in case they change it to null in the future
      const parentId = !currentParent || currentParent.name == '' ? null : currentParent.identifier;
      const parent = !parentId ? null : this._objectsById[parentId] || null;
      if (parent) {
        current.parent = parent;
      }
    }
    // step 3: for each summary store it by path for future references
    for (let i = 0; i < summaries.length; ++i) {
      const current = summaries[i];
      this._objectsByPath[current.path] = current;
      const pathSegments = current.path.split('/');
      const name = pathSegments[pathSegments.length - 1];
      this._pathByName[name] = current.path;
      this._objects.push(current);
    }
    this._objects.sort((a, b) => {
      const a1 = a.path.toUpperCase();
      const b1 = b.path.toUpperCase();
      return a1 > b1 ? 1 : a1 < b1 ? -1 : 0;
    });
    this._areAllObjectsLoaded = true;
  }
  /**
   * List of all objects
   */
  get objects(): ObjSummary[] {
    return this._objects;
  }
  /**
   * Hashtable of objects by path
   */
  get objectsByPath(): {[key: string]: ObjSummary} {
    return this._objectsByPath;
  }
  /**
   * Hashtable of objects by ID
   */
  get objectsById(): {[key: string]: ObjSummary} {
    return this._objectsById;
  }
}
/**
 * Wrapper of Scene Object Base that keeps track of scene object hierarchy
 */
export class ObjSummary {
  private readonly _id: string;
  private readonly _name: string;
  private _path: string;
  private _parent: ObjSummary;
  private _children: ObjSummary[];
  readonly obj: SceneObjectBase;
  private constructor(id: string, name: string, ob: SceneObjectBase) {
    if (!id) throw new Error('ObjSummary without ID');
    if (!name) throw new Error('ObjSummary without Name');
    this._id = id;
    this._name = name;
    this._path = null;
    this.obj = ob;
    this._children = [];
  }
  /**
   * Creates object summary wrapper from SceneObjectBase
   * @param ob - SceneObjectBase instance
   */
  static create(ob: SceneObjectBase): ObjSummary {
    return new ObjSummary(ob.identifier, ob.name, ob);
  }
  /**
   * Creates virtual object with ID and Name
   * @param id - unique identifier for this object
   * @param name - name of object
   */
  static createVirtual(id: string, name: string): ObjSummary {
    return new ObjSummary(id, name, null);
  }
  /**
   * Gets identifier
   */
  get identifier(): string {
    return this._id;
  }
  /**
   * Gets name
   */
  get name(): string {
    return this._name;
  }
  /**
   * Gets tree name
   */
  get treeName(): string {
    return !this.obj ? null : this.obj.name;
  }
  /**
   * Gets children
   */
  get children(): ObjSummary[] {
    return this._children;
  }
  /**
   * Gets parent
   */
  get parent(): ObjSummary {
    return this._parent;
  }
  /**
   * Sets parent
   */
  set parent(p: ObjSummary) {
    this._parent = p;
    if (p) p.children.push(this);
    this._path = null;
  }
  /**
   * Gets path
   */
  get path(): string {
    if (!this._parent) return this.name;
    if (this._path) return this._path;
    const arr = [this.name];
    let currParent = this._parent;
    while (currParent) {
      arr.push(currParent.name);
      currParent = currParent.parent;
    }
    this._path = (arr.length > 1 ? '/' : '') + arr.reverse().join('/');
    return this._path;
  }
}
export class ObjView implements IObjViewOrientation {
  /**
   * forward direction - unit vector
   */
  readonly fw: IV3Readonly;
  /**
   * back direction - unit vector
   */
  readonly bk: IV3Readonly;
  /**
   * right direction - unit vector
   */
  readonly rt: IV3Readonly;
  /**
   * left direction - unit vector
   */
  readonly lt: IV3Readonly;
  /**
   * up direction - unit vector
   */
  readonly up: IV3Readonly;
  /**
   * down direction - unit vector
   */
  readonly dn: IV3Readonly;

  /**
   * forward direction without adjustment - unit vector
   */
  readonly idealFw: IV3Readonly;
  /**
   * back direction without adjustment - unit vector
   */
  readonly idealBk: IV3Readonly;
  /**
   * right direction without adjustment - unit vector
   */
  readonly idealRt: IV3Readonly;
  /**
   * left direction without adjustment - unit vector
   */
  readonly idealLt: IV3Readonly;
  /**
   * up direction without adjustment - unit vector
   */
  readonly idealUp: IV3Readonly;
  /**
   * down direction without adjustment - unit vector
   */
  readonly idealDn: IV3Readonly;

  private _iniFw: IV3Readonly;
  private _iniBk: IV3Readonly;
  private _iniRt: IV3Readonly;
  private _iniLt: IV3Readonly;
  private _iniUp: IV3Readonly;
  private _iniDn: IV3Readonly;

  public readonly lookAt: ILookAtFunc;

  public readonly idealLookAt: ILookAtFunc;

  public readonly adjustRot: IQtReadonly = null;
  public readonly adjustRotInverse: IQtReadonly = null;
  private readonly _obj: Object3D;

  /**
   * Creates an instance of object view.
   * @param obj - source object
   * @param fw - forward direction - unit vector
   * @param up - up direction - unit vector
   * @param lookAtFunc - function that creates quaternion from the forward and up vectors
   */
  constructor(
    obj: Object3D,
    fw: IV3Readonly,
    up: IV3Readonly,
    lookAtFunc: ILookAtFunc,
    adjustRot: IQtReadonly,
  ) {
    if (!obj) throw new Error(`ObjView requires forward (obj) Object3D`);
    if (!fw) throw new Error(`ObjView requires forward (fw) vector`);
    if (!up) throw new Error(`ObjView requires up vector`);
    if (!lookAtFunc) throw new Error(`ObjView lookAtFunc is required`);

    this.adjustRot = adjustRot;
    if (adjustRot) this.adjustRotInverse = adjustRot.invert();

    this._obj = obj;
    this.fw = fw.ensureNormalized.ensureReadonly;
    up = up.ensureNormalized;
    this.lt = up.cross(fw).ensureNormalized.ensureReadonly;
    this.up = fw.cross(this.lt).ensureNormalized.ensureReadonly;
    this.bk = this.fw.mulBy(-1).readonly;
    this.rt = this.lt.mulBy(-1).readonly;
    this.dn = this.up.mulBy(-1).readonly;

    this.idealFw = this.fw;
    this.idealBk = this.bk;
    this.idealLt = this.lt;
    this.idealRt = this.rt;
    this.idealUp = this.up;
    this.idealDn = this.dn;
    this.lookAt = lookAtFunc;
    this.idealLookAt = lookAtFunc;

    if (adjustRot) {
      this.fw = this.fw.rotate(adjustRot).readonly;
      this.bk = this.bk.rotate(adjustRot).readonly;
      this.lt = this.lt.rotate(adjustRot).readonly;
      this.rt = this.rt.rotate(adjustRot).readonly;
      this.up = this.up.rotate(adjustRot).readonly;
      this.dn = this.dn.rotate(adjustRot).readonly;

      this.lookAt = (fw, up) => this.idealLookAt(fw, up).mul(this.adjustRotInverse);
    }

    this.recomputeInitial();
  }
  /**
   * Recomputes initial directions
   */
  recomputeInitial(): void {
    this._iniFw = this._obj.iniRot.mulV3(this.fw).ensureReadonly;
    this._iniBk = this._obj.iniRot.mulV3(this.bk).ensureReadonly;
    this._iniLt = this._obj.iniRot.mulV3(this.lt).ensureReadonly;
    this._iniRt = this._obj.iniRot.mulV3(this.rt).ensureReadonly;
    this._iniUp = this._obj.iniRot.mulV3(this.up).ensureReadonly;
    this._iniDn = this._obj.iniRot.mulV3(this.dn).ensureReadonly;
  }
  /**
   * iniitial forward direction
   */
  get iniFw(): IV3Readonly {
    return this._iniFw;
  }
  /**
   * iniitial back direction
   */
  get iniBk(): IV3Readonly {
    return this._iniBk;
  }
  /**
   * iniitial right direction
   */
  get iniRt(): IV3Readonly {
    return this._iniRt;
  }
  /**
   * iniitial left direction
   */
  get iniLt(): IV3Readonly {
    return this._iniLt;
  }
  /**
   * iniitial up direction
   */
  get iniUp(): IV3Readonly {
    return this._iniUp;
  }
  /**
   * iniitial down direction
   */
  get iniDn(): IV3Readonly {
    return this._iniDn;
  }
  /**
   * reference to the object
   */
  get obj(): Object3D {
    return this._obj;
  }
  /**
   * alias reference to the object
   */
  get o(): Object3D {
    return this._obj;
  }
  /**
   * parent view
   */
  get parent(): ObjView {
    return !this._obj || !this._obj.parent ? null : this._obj.parent.v;
  }
  /**
   * alias for parent view
   */
  get p(): ObjView {
    return !this._obj || !this._obj.parent ? null : this._obj.parent.v;
  }
  /**
   * forward direction - unit vector
   */
  get forward(): IV3Readonly {
    return this.fw;
  }
  /**
   * left direction - unit vector
   */
  get left(): IV3Readonly {
    return this.lt;
  }
  /**
   * right direction - unit vector
   */
  get right(): IV3Readonly {
    return this.rt;
  }
  /**
   * back direction - unit vector
   */
  get back(): IV3Readonly {
    return this.bk;
  }
  /**
   * down direction - unit vector
   */
  get down(): IV3Readonly {
    return this.dn;
  }
}
export enum ImperativeSupportStatus {
  unknown = 0,
  supports = 1,
  noSupport = 2,
}
export class ImperativeSupport {
  private static _current = ImperativeSupportStatus.unknown;
  static get current(): ImperativeSupportStatus {
    return ImperativeSupport._current;
  }
  static get yes(): boolean {
    return ImperativeSupport._current == ImperativeSupportStatus.supports;
  }
  static get no(): boolean {
    return ImperativeSupport._current == ImperativeSupportStatus.noSupport;
  }
  static evaluate(obj: SceneObjectBase): ImperativeSupportStatus {
    if (!obj) return ImperativeSupportStatus.unknown;
    if (ImperativeSupport._current == ImperativeSupportStatus.unknown) {
      let hasImperative = false;
      /*try {
        hasImperative = !!obj.transformValue;
      } catch {
        hasImperative = false;
      }*/
      ImperativeSupport._current = hasImperative
        ? ImperativeSupportStatus.supports
        : ImperativeSupportStatus.noSupport;
    }
    return ImperativeSupport._current;
  }
}
export class TransformWrapper {
  /**
   * Creates an transform wrapper around object of type SceneObjectBase
   * @param obj - object of type SceneObjectBase
   */
  private _ssPosX: ScalarSignalSource;
  private _ssPosY: ScalarSignalSource;
  private _ssPosZ: ScalarSignalSource;
  private _ssRotX: ScalarSignalSource;
  private _ssRotY: ScalarSignalSource;
  private _ssRotZ: ScalarSignalSource;
  private _ssScaX: ScalarSignalSource;
  private _ssScaY: ScalarSignalSource;
  private _ssScaZ: ScalarSignalSource;
  constructor(private obj: SceneObjectBase) {
    ImperativeSupport.evaluate(obj);
    if (obj && ImperativeSupport.no) {
      this._ssPosX = R.scalarSignalSource(`PosX_${obj.identifier}`);
      this._ssPosY = R.scalarSignalSource(`PosY_${obj.identifier}`);
      this._ssPosZ = R.scalarSignalSource(`PosZ_${obj.identifier}`);
      this._ssRotX = R.scalarSignalSource(`RotX_${obj.identifier}`);
      this._ssRotY = R.scalarSignalSource(`RotY_${obj.identifier}`);
      this._ssRotZ = R.scalarSignalSource(`RotZ_${obj.identifier}`);
      this._ssScaX = R.scalarSignalSource(`ScaX_${obj.identifier}`);
      this._ssScaY = R.scalarSignalSource(`ScaY_${obj.identifier}`);
      this._ssScaZ = R.scalarSignalSource(`ScaZ_${obj.identifier}`);
    }
  }
  /**
   * Sets object position
   * @param p - position
   */
  setPos(p: IV3Readonly): void {
    if (!this.obj) return;
    if (this._ssPosX) {
      this._ssPosX.set(p.x);
      this._ssPosY.set(p.y);
      this._ssPosZ.set(p.z);
      return;
    }
    this.obj.transformValue.x = p.x;
    this.obj.transformValue.y = p.y;
    this.obj.transformValue.z = p.z;
  }
  /**
   * Sets object rotation as euler
   * @param p - rotation as euler
   */
  setRot(p: IV3Readonly): void {
    if (!this.obj) return;
    if (this._ssRotX) {
      this._ssRotX.set(p.x);
      this._ssRotY.set(p.y);
      this._ssRotZ.set(p.z);
      return;
    }
    this.obj.transformValue.rotationX = p.x;
    this.obj.transformValue.rotationY = p.y;
    this.obj.transformValue.rotationZ = p.z;
  }
  /**
   * Sets object scale
   * @param p - scale
   */
  setSca(p: IV3Readonly): void {
    if (!this.obj) return;
    if (this._ssScaX) {
      this._ssScaX.set(p.x);
      this._ssScaY.set(p.y);
      this._ssScaZ.set(p.z);
      return;
    }
    this.obj.transformValue.scaleX = p.x;
    this.obj.transformValue.scaleY = p.y;
    this.obj.transformValue.scaleZ = p.z;
  }
  assignSignals(): void {
    if (!this.obj || !this._ssPosX) return;
    this.obj.transform.x = this._ssPosX.signal;
    this.obj.transform.y = this._ssPosY.signal;
    this.obj.transform.z = this._ssPosZ.signal;
    this.obj.transform.rotationX = this._ssRotX.signal;
    this.obj.transform.rotationY = this._ssRotY.signal;
    this.obj.transform.rotationZ = this._ssRotZ.signal;
    this.obj.transform.scaleX = this._ssScaX.signal;
    this.obj.transform.scaleY = this._ssScaY.signal;
    this.obj.transform.scaleZ = this._ssScaZ.signal;
  }
}
export interface ITransformData {
  get pos(): V3;
  set pos(p: IV3Readonly);
  get rot(): Qt;
  set rot(r: IQtReadonly);
  get sca(): V3;
  set sca(s: IV3Readonly);
}
export class Object3D
  implements IPosterToNative, IDisposable, IActuatorApplierHolder, ITransformData
{
  private readonly _name: string;
  private readonly _model: Object3D;
  private readonly _transform: TransformWrapper;
  private _parent: Object3D;
  private _summary: ObjSummary;
  protected _iniRot: Qt;
  protected _iniPos: V3;
  protected _iniSca: V3;
  protected _iniPosMagnitude: number;
  protected _rot: Qt;
  protected _pos: V3;
  protected _sca: V3;
  protected _factor: number;
  protected _enablePostToNative: boolean;
  private _actuator: Actuator;
  private _view: ObjView;
  private _pivotVecIn: V3;
  behavior: Behavior;
  constructor(
    name: string,
    summary: ObjSummary,
    initialize: IActionOf4T<TransformWrapper, V3, Qt, V3>,
    model: Object3D = null,
    public toEulerFunc: IFuncOf2T<Qt, V3> = null,
  ) {
    if (!name) throw new Error(`Name is required for creation of Object3D`);
    if (!summary)
      throw new Error(`ObjSummary is required for creation of Object3D named "${name}"`);
    if (!initialize)
      throw new Error(`Initialize functions is required for creation of Object3D named "${name}"`);

    this._name = name;
    this._summary = summary;
    this._parent = null;
    this._model = model;
    this._enablePostToNative = true;
    this._pivotVecIn = null;
    this.behavior = null;

    this._transform = new TransformWrapper(this._summary.obj);

    this._rot = Qt.identity.ensureWritable.permanent;
    this._pos = V3.zero.ensureWritable.permanent;
    this._sca = V3.one.ensureWritable.permanent;
    this._factor = 1;

    initialize(this._transform, this._pos, this._rot, this._sca);

    this._transform.assignSignals();

    this._iniPos = this._pos.permanent;
    this._iniRot = this._rot.permanent;
    this._iniSca = this._sca.permanent;

    this._view = new ObjView(this, V3.fw, V3.up, lookAt_fw_up, null);

    this.resetIniPos();
    this.resetIniRot();
    this.resetIniSca();

    mainObjectManager.addPosterToNative(this);
  }
  /**
   * Sets view for the object
   * @param viewFw - view forward direction
   * @param viewUp - view up direction
   * @param viewLookAt - view look at function that constructs quaternion rotation based on given's view forward and up directions
   * @returns self reference to the object
   */
  setView(
    viewFw: IV3Readonly,
    viewUp: IV3Readonly,
    viewLookAt: ILookAtFunc,
    adjustRot: IQtReadonly,
  ): Object3D {
    this._view = new ObjView(this, viewFw, viewUp, viewLookAt, adjustRot);
    return this;
  }
  /**
   * Clones view from another object
   * @param obj - another object
   * @returns self reference to the object
   */
  cloneViewFrom(obj: Object3D): Object3D {
    this._view = new ObjView(
      this,
      obj.view.idealFw,
      obj.view.idealUp,
      obj.view.lookAt,
      obj.view.adjustRot,
    );
    return this;
  }
  /**
   * Removes object from posters to native
   */
  dispose(): void {
    mainObjectManager.removePosterToNative(this);
  }
  /**
   * Posts to native position, rotation, scale
   */
  postToNative(): void {
    const hasPosChange = this._pos.isChanged;
    const hasRotChange = this._rot.isChanged;
    const hasScaChange = this._sca.isChanged;

    if (!hasScaChange && !hasPosChange && !hasRotChange) {
      return;
    }

    this._pos.processedChange_();
    this._rot.processedChange_();
    this._sca.processedChange_();

    const tw = this._transform;

    if (hasScaChange && this._enablePostToNative) {
      tw.setSca(this._sca);
    }
    if (hasRotChange && this._enablePostToNative) {
      const rV3 = this.toEulerFunc
        ? this.toEulerFunc(this._rot)
        : Math3D.quaternionToEuler(this._rot);
      tw.setRot(rV3);
    }
    if (hasPosChange && this._enablePostToNative) {
      tw.setPos(this._pos);
    }
  }
  /**
   * string identifier
   */
  get identifier(): string {
    return this._summary.identifier;
  }
  /**
   * forward direction based on view
   */
  get fw(): V3 {
    return this._rot.mulV3(this.v.fw);
  }
  /**
   * forward direction based on view
   */
  get forward(): V3 {
    return this._rot.mulV3(this.v.fw);
  }
  /**
   * up direction based on view
   */
  get up(): V3 {
    return this._rot.mulV3(this.v.up);
  }
  /**
   * back direction based on view
   */
  get bk(): V3 {
    return this._rot.mulV3(this.v.bk);
  }
  /**
   * back direction based on view
   */
  get back(): V3 {
    return this._rot.mulV3(this.v.bk);
  }
  /**
   * down direction based on view
   */
  get dn(): V3 {
    return this._rot.mulV3(this.v.dn);
  }
  /**
   * down direction based on view
   */
  get down(): V3 {
    return this._rot.mulV3(this.v.dn);
  }
  /**
   * left direction based on view
   */
  get lt(): V3 {
    return this._rot.mulV3(this.v.lt);
  }
  /**
   * left direction based on view
   */
  get left(): V3 {
    return this._rot.mulV3(this.v.lt);
  }
  /**
   * right direction based on view
   */
  get rt(): V3 {
    return this._rot.mulV3(this.v.rt);
  }
  /**
   * right direction based on view
   */
  get right(): V3 {
    return this._rot.mulV3(this.v.rt);
  }
  /**
   * transform wrapper
   */
  get transformWrapper(): TransformWrapper {
    return this._transform;
  }
  /**
   * actuator
   */
  get actuator(): Actuator {
    if (!this._actuator) this._actuator = new Actuator(this._name, this);
    return this._actuator;
  }
  /**
   * actuator alias
   */
  get a(): Actuator {
    return this.actuator;
  }
  /**
   * name
   */
  get name(): string {
    return this._name;
  }
  /**
   * tree name
   */
  get treeName(): string {
    return this._summary.name;
  }
  /**
   * get numeric factor used to normalize actuator commands, for example to define numbers as relative to character height
   */
  get factor(): number {
    return this._factor;
  }
  /**
   * set numeric factor used to normalize actuator commands, for example to define numbers as relative to character height
   */
  set factor(f: number) {
    if (Math.abs(f) < 0.000001)
      throw new Error(`Factor for "${this._name}" cannot be near 0, it is ${f.toFixed(10)}`);
    this._factor = f;
  }
  /**
   * object view - used to redefine directions
   */
  get view(): ObjView {
    return this._view;
  }
  /**
   * alias for object view - used to redefine directions
   */
  get v(): ObjView {
    return this._view;
  }
  /**
   * get object position - local
   */
  get pos(): V3 {
    return this._pos.clone();
  }
  /**
   * get position x
   */
  get posX(): number {
    return this._pos.x;
  }
  /**
   * get position y
   */
  get posY(): number {
    return this._pos.y;
  }
  /**
   * get position z
   */
  get posZ(): number {
    return this._pos.z;
  }
  /**
   * set object position - local
   */
  set pos(p: IV3Readonly) {
    if (!p) return;
    if (this._pos.isEqual(p)) return;
    this._pos.setFrom_(p);
  }
  /**
   * get object rotation as quatenion - local
   */
  get rot(): Qt {
    return this._rot.clone();
  }
  /**
   * set object rotation as quatenion - local
   */
  set rot(q: IQtReadonly) {
    if (!q) return;
    if (this._rot.isEqual(q)) return;
    this._rot.setFrom_(q);
  }
  /**
   * get object scale - local
   */
  get sca(): V3 {
    return this._sca.clone();
  }
  /**
   * set object scale - local
   */
  set sca(s: IV3Readonly) {
    if (!s) return;
    if (this._sca.isEqual(s)) return;
    this._sca.setFrom_(s);
  }
  /**
   * initial rotation quaternion
   */
  get iniRot(): Qt {
    return this._iniRot.clone();
  }
  /**
   * initial position
   */
  get iniPos(): V3 {
    return this._iniPos.clone();
  }
  /**
   * initial position divided by the factor
   */
  get iniPosFac(): V3 {
    return this._iniPos.divBy(this.factor);
  }
  /**
   * initial scale
   */
  get iniSca(): V3 {
    return this._iniSca.clone();
  }
  /**
   * initial forward direction
   */
  get iniFw(): V3 {
    return this._iniRot.mulV3(this.v.fw);
  }
  /**
   * initial back direction
   */
  get iniBk(): V3 {
    return this._iniRot.mulV3(this.v.bk);
  }
  /**
   * initial up direction
   */
  get iniUp(): V3 {
    return this._iniRot.mulV3(this.v.up);
  }
  /**
   * initial down direction
   */
  get iniDn(): V3 {
    return this._iniRot.mulV3(this.v.dn);
  }
  /**
   * initial right direction
   */
  get iniRt(): V3 {
    return this._iniRot.mulV3(this.v.rt);
  }
  /**
   * initial left direction
   */
  get iniLt(): V3 {
    return this._iniRot.mulV3(this.v.lt);
  }
  /**
   * magnitude of the initial position
   */
  get iniPosMagnitude(): number {
    return this._iniPosMagnitude;
  }
  /**
   * get object scale - local
   */
  get scale(): number {
    return this._sca.x;
  }
  /**
   * set object scale - local
   */
  set scale(n: number) {
    if (Math.abs(n - this._sca.x) < 0.000001) return;
    this._sca.x = n;
    this._sca.y = n;
    this._sca.z = n;
  }
  /**
   * Gets enable post to native flag
   */
  get enablePostToNative(): boolean {
    return this._enablePostToNative;
  }
  /**
   * Sets enable post to native flag
   */
  set enablePostToNative(b: boolean) {
    this._enablePostToNative = b;
  }
  /**
   * get parent object
   */
  get parent(): Object3D {
    return this._parent;
  }
  /**
   * set parent object
   */
  set parent(p: Object3D) {
    this._parent = p;
  }
  /**
   * Gets summary
   */
  get summary(): ObjSummary {
    return this._summary;
  }
  /**
   * Gets model reference (optional)
   */
  get model(): Object3D {
    return this._model;
  }
  /**
   * Resets initial position
   * @param [p] - define initial position externally, if not defined will use current
   * @returns reference to iself
   */
  resetIniPos(p: V3 = null): Object3D {
    this._iniPos = (p || this.pos).clone();
    this._iniPosMagnitude = this._iniPos.magnitude;
    return this;
  }
  /**
   * Resets initial rotation
   * @param [p] - define initial rotation externally, if not defined will use current
   * @returns reference to iself
   */
  resetIniRot(q: Qt = null): Object3D {
    this._iniRot = (q || this.rot).clone();
    this._view.recomputeInitial();
    return this;
  }
  /**
   * Resets initial scale
   * @param [p] - define initial scale externally, if not defined will use current
   * @returns reference to iself
   */
  resetIniSca(s: V3 = null): Object3D {
    this._iniSca = (s || this.sca).clone();
    return this;
  }
  /**
   * Pivots starts
   * @param pivot - pivot point, before movement
   * @param [enable] - if false will do nothing
   * @returns reference to iself
   */
  pivotStarts(pivot: IV3Readonly, enable = true): Object3D {
    if (!enable) return this;
    this._pivotVecIn = pivot.sub(this.pos);
    return this;
  }
  /**
   * Pivots ends
   * @param pivot - pivot point, after movement
   * @param [enable] - if false will do nothing
   * @returns reference to iself
   */
  pivotEnds(pivot: IV3Readonly, enable = true): Object3D {
    if (!enable) return this;
    if (!this._pivotVecIn)
      throw new Error(
        `You need to call pivotStarts before calling pivotEnds for object "${this.name}"`,
      );
    const currentPos = this.pos;
    const pivotVecOut = currentPos.sub(pivot);
    const toAdd = this._pivotVecIn.add(pivotVecOut);

    this.pos = currentPos.add(toAdd);
    this._pivotVecIn = null;
    return this;
  }
  /**
   * get world rotation - quaternion
   */
  get worldRot(): Qt {
    return this.parent ? this.parent.localToWorldRot(this.rot) : this.rot;
  }
  /**
   * set world rotation - quaternion
   */
  set worldRot(q: Qt) {
    this.rot = this.parent ? this.parent.worldToLocalRot(q) : q;
  }
  /**
   * initial position in worlds space
   */
  get iniPosAsWorld(): V3 {
    return this.parent ? this.parent.localToWorldPos(this.iniPos) : this.iniPos;
  }
  /**
   * initial rotation in worlds space
   */
  get iniRotAsWorld(): Qt {
    return this.parent ? this.parent.localToWorldRot(this.iniRot) : this.iniRot;
  }
  /**
   * Worlds to local rotation
   * @param q - input world rotation
   * @param [until] - until tree node, if not specified go all the way to root node
   * @returns local rotation representation of the input world rotation
   */
  worldToLocalRot(q: IQtReadonly, until: Object3D = null): Qt {
    if (!this.parent) {
      return q.ensureWritable;
    }
    const multipeOfAllParents = this.mulByParentRot(this.parent, until);
    //return q.toLocal(multipeOfAllParents.mul_(this.rot));
    return multipeOfAllParents.mul_(this.rot).cloneAsWritable().invert_().mul_(q);
  }
  /**
   * Local to world rotation
   * @param q - input local rotation
   * @param [until] - until tree node, if not specified go all the way to root node
   * @returns world rotation representation of the input local rotation
   */
  localToWorldRot(q: IQtReadonly = null, until: Object3D = null): Qt {
    if (!q) q = this.rot;
    if (!this.parent) {
      return q.ensureWritable;
    }
    const multipeOfAllParents = this.mulByParentRot(this.parent, until);
    return multipeOfAllParents.mul_(this.rot).mul_(q);
  }
  /**
   * get world position
   */
  get worldPos(): V3 {
    if (!this.parent) {
      return this.pos;
    }
    return this.localToWorldPos();
  }
  /**
   * set world position
   */
  set worldPos(p: V3) {
    if (!this.parent) {
      this.pos = p;
    } else this.pos = this.worldToLocalPos(p);
  }
  /**
   * Local to world position
   * @param [localPoint] - input local point
   * @param [until] - until tree node, if not specified go all the way to root node
   * @returns world position representation of the input local position
   */
  localToWorldPos(localPoint: IV3Readonly = null, until: Object3D = null): V3 {
    const hasPoint = !!localPoint;
    const p = hasPoint ? V3.create(localPoint.x, localPoint.y, localPoint.z) : this.pos;
    let node = hasPoint ? <Object3D>this : this.parent;
    while (node) {
      if (node == until) break;
      if (node.scale > 1.000001 || node.scale < 0.999999) {
        p.mulBy_(node.scale);
      }
      p.rotate_(node.rot).add_(node.pos);
      node = node.parent;
    }
    return p;
  }
  /**
   * Local to world vector
   * @param localVec - local vector
   * @param [until] - until tree node, if not specified go all the way to root node
   * @returns world vector representation of the input local vector
   */
  localToWorldVec(localVec: IV3Readonly, until: Object3D = null): V3 {
    const p = V3.create(localVec.x, localVec.y, localVec.z);
    let node = <Object3D>this;
    while (node) {
      if (node == until) break;
      if (node.scale > 1.000001 || node.scale < 0.999999) {
        p.mulBy_(node.scale);
      }
      p.rotate_(node.rot);
      node = node.parent;
    }
    return p;
  }
  /**
   * World to local position
   * @param [worldPoint] - input world point
   * @param [until] - until tree node, if not specified go all the way to root node
   * @returns local position representation of the input world position
   */
  worldToLocalPos(worldPoint: IV3Readonly, until: Object3D = null): V3 {
    const localPoint = V3.create(worldPoint.x, worldPoint.y, worldPoint.z);
    const node = this.worldToLocalPosRecursive(localPoint, this.parent, until);
    this.applyParentWorldToLocalPosRecursive(localPoint, node);
    return localPoint;
  }
  private worldToLocalPosRecursive(point: V3, curr: Object3D, until: Object3D = null): Object3D {
    if (!curr) return null;
    if (curr == until) return curr;

    const node = this.worldToLocalPosRecursive(point, curr.parent, until);
    this.applyParentWorldToLocalPosRecursive(point, node);

    return curr;
  }
  private applyParentWorldToLocalPosRecursive(point: V3, node: Object3D) {
    if (!node) return;
    point.setFrom_(node.rot.invert_().mulV3(point.sub_(node.pos)));
    if (node.scale > 1.000001 || node.scale < 0.999999) {
      point.mulBy_(1 / node.scale);
    }
  }
  /**
   * Adds rotation to current rotation (local space)
   */
  addRot(r: IQtReadonly): Object3D {
    this.rot = this.rot.mul_(r);
    return this;
  }
  /**
   * Adds position to current rotation (local space)
   */
  addPos(p: IV3Readonly): Object3D {
    this.pos = this.pos.add_(p);
    return this;
  }
  /**
   * Sets local position by function invocation
   * @param func - funciton that passes object view and returns vector V3 position
   * @returns reference to iself
   */
  setPos_(func: IFuncOf2T<ObjView, V3>): Object3D {
    this.pos = func(this.view);
    return this;
  }
  /**
   * Sets local rotation by function invocation
   * @param func - funciton that passes object view and returns quaternion Qt rotation
   * @returns reference to iself
   */
  setRot_(func: IFuncOf2T<ObjView, Qt>): Object3D {
    this.rot = func(this.view);
    return this;
  }
  /**
   * Sets local scale by function invocation
   * @param func - funciton that passes object view and returns vector V3 scale
   * @returns reference to iself
   */
  setSca_(func: IFuncOf2T<ObjView, V3>): Object3D {
    this.sca = func(this.view);
    return this;
  }
  /**
   * Sets world position by function invocation
   * @param func - funciton that passes object view and returns vector V3 position
   * @returns reference to iself
   */
  setWorldPos_(func: IFuncOf2T<Object3D, V3>): Object3D {
    this.worldPos = func(this);
    return this;
  }

  /**
   * Sets world rotation by function invocation
   * @param func - funciton that passes object view and returns quaternion Qt rotation
   * @returns reference to iself
   */
  setWorldRot_(func: IFuncOf2T<Object3D, Qt>): Object3D {
    this.worldRot = func(this);
    return this;
  }
  private mulByParentRot(curr: Object3D, until: Object3D = null): Qt {
    if (!curr.parent) return curr.rot.clone();
    if (!!until && curr.parent == until) return curr.rot.clone();
    const prevRot = this.mulByParentRot(curr.parent, until);
    return prevRot.mul_(curr.rot);
  }
}
/**
 * Virtual object - i.e. not based on SceneObjectBase, but rather object that exists theoretically and is not rendered, for example IK control handlers
 */
export class ObjVirtual extends Object3D {
  private _posSrc: IV3Readonly;
  private _rotSrc: IV3Readonly;
  private _scaSrc: IV3Readonly;
  /**
   * Creates an instance of virtual object
   * @param boneName - name of the joint
   * @param summary - object summary
   * @param [pos] - optional initial position
   * @param [eulerRotInDeg] - optional initial euler rotation in degrees
   * @param [sca] - optional initial scale
   * @param [model] - optional model reference
   * @param [toEulerFunc] - optional custom function to convert quaternion to euler angle, if not specified, default will be used
   */
  constructor(
    boneName: string,
    summary: ObjSummary,
    pos?: IV3Readonly,
    eulerRotInDeg?: IV3Readonly,
    sca?: IV3Readonly,
    model?: Object3D,
    toEulerFunc: IFuncOf2T<Qt, V3> = null,
  ) {
    super(
      boneName,
      summary,
      (ss, p, r, s) => {
        p.setFrom_(pos || V3.zero);
        r.setFrom_((eulerRotInDeg || V3.zero).toQt(true));
        s.setFrom_(sca || V3.one);

        ss.setPos(p);
        const rV3 = toEulerFunc ? toEulerFunc(r) : Math3D.quaternionToEuler(r);
        ss.setRot(rV3);
        ss.setSca(s);
      },
      model,
      toEulerFunc,
    );
    this._posSrc = null;
    this._rotSrc = null;
    this._scaSrc = null;
  }
  /**
   * Posts to native position, rotation, scale
   */
  postToNative(): void {
    if (this._posSrc) this._pos.setFrom_(this._posSrc);
    if (this._rotSrc) this._rot.setFrom_(this._rotSrc.toQt(false));
    if (this._scaSrc) this._sca.setFrom_(this._scaSrc);
    super.postToNative();
  }
  /**
   * Sets position source
   */
  setPosSource(v3: IV3Readonly): ObjVirtual {
    this._posSrc = v3;
    return this;
  }
  /**
   * Sets rotation source
   */
  setRotSource(v3: IV3Readonly): ObjVirtual {
    this._rotSrc = v3;
    return this;
  }
  /**
   * Sets scale source
   */
  setScaSource(v3: IV3Readonly): ObjVirtual {
    this._scaSrc = v3;
    return this;
  }
}
/**
 * Object wrap - wrapper around SceneObjectBase extending Object3D
 */
export class ObjWrap extends Object3D {
  private readonly _obj: SceneObjectBase;
  /**
   * Creates an instance of object wrap
   * @param boneName - name of the joint
   * @param summary - object summary
   * @param [model] - optional model reference
   * @param [toEulerFunc] - optional custom function to convert quaternion to euler angle, if not specified, default will be used
   */
  constructor(
    boneName: string,
    summary: ObjSummary,
    model: Object3D = null,
    toEulerFunc: IFuncOf2T<Qt, V3> = null,
  ) {
    super(
      boneName,
      summary,
      (tw, p, r, s) => {
        if (!summary.obj)
          throw new Error(
            `SceneObjectBase inside ObjSummary.obj is required in order to create ObjWrap "${boneName}"`,
          );
        ImperativeSupport.evaluate(summary.obj);
        if (ImperativeSupport.yes) {
          const tv = summary.obj.transformValue;

          p.x = tv.x;
          p.y = tv.y;
          p.z = tv.z;

          r.setFrom_(Math3D.xyzEulerToQt(tv.rotationX, tv.rotationY, tv.rotationZ));

          s.x = tv.scaleX;
          s.y = tv.scaleY;
          s.z = tv.scaleZ;
        } else {
          const tm = summary.obj.transform;

          p.x = tm.x.pinLastValue();
          p.y = tm.y.pinLastValue();
          p.z = tm.z.pinLastValue();

          r.setFrom_(
            Math3D.xyzEulerToQt(
              tm.rotationX.pinLastValue(),
              tm.rotationY.pinLastValue(),
              tm.rotationZ.pinLastValue(),
            ),
          );

          s.x = tm.scale.x.pinLastValue();
          s.y = tm.scale.y.pinLastValue();
          s.z = tm.scale.z.pinLastValue();
        }

        tw.setPos(p);
        const rV3 = toEulerFunc ? toEulerFunc(r) : Math3D.quaternionToEuler(r);
        tw.setRot(rV3);
        tw.setSca(s);
      },
      model,
      toEulerFunc,
    );
    this._obj = summary.obj;
  }
  /**
   * Reference to the underlying SceneObjectBase
   */
  get obj(): SceneObjectBase {
    return this._obj;
  }
  /**
   * Reference to the underlying SceneObjectBase Transform
   */
  get transform(): Transform {
    return !this._obj ? null : this._obj.transform;
  }
  /**
   * Subscribe it to serve as recepient of the changes applied by some other process and update its position
   */
  updatePosFromReactive(): void {
    this._obj.transform.position.x
      .monitor()
      .subscribe((e: {newValue: number}) => (this._pos.x = e.newValue));
    this._obj.transform.position.y
      .monitor()
      .subscribe((e: {newValue: number}) => (this._pos.y = e.newValue));
    this._obj.transform.position.z
      .monitor()
      .subscribe((e: {newValue: number}) => (this._pos.z = e.newValue));
  }
  /**
   * Subscribe it to serve as recepient of the changes applied by some other process and update its scale
   */
  updateScaFromReactive(): void {
    this._obj.transform.scale.x
      .monitor()
      .subscribe((e: {newValue: number}) => (this._sca.x = e.newValue));
    this._obj.transform.scale.y
      .monitor()
      .subscribe((e: {newValue: number}) => (this._sca.y = e.newValue));
    this._obj.transform.scale.z
      .monitor()
      .subscribe((e: {newValue: number}) => (this._sca.z = e.newValue));
  }
  /**
   * Subscribe it to serve as recepient of the changes applied by some other process and update its rotation
   */
  updateRotFromReactive(): void {
    this._obj.transform.rotation.x
      .monitor()
      .subscribe((e: {newValue: number}) => (this._rot.x = e.newValue));
    this._obj.transform.rotation.y
      .monitor()
      .subscribe((e: {newValue: number}) => (this._rot.y = e.newValue));
    this._obj.transform.rotation.z
      .monitor()
      .subscribe((e: {newValue: number}) => (this._rot.z = e.newValue));
    this._obj.transform.rotation.w
      .monitor()
      .subscribe((e: {newValue: number}) => (this._rot.w = e.newValue));
  }
}
export class ScalarActuator implements IActuatorApplier, IActuatorApplierHolder {
  private _getter: IFuncOfT<number>;
  private _setter: IActionOfT<number>;
  private _initial: number;
  private _source: number;
  private _target: number;
  /**
   * Creates an instance of scalar actuator.
   * @param getter - function to get current value
   * @param setter - function to set new value
   */
  constructor(getter: IFuncOfT<number>, setter: IActionOfT<number>) {
    if (!getter || !setter)
      throw new Error('Both getter and setter are required for ScalarActuator');
    this._getter = getter;
    this._setter = setter;
    this._initial = NaN;
  }
  /**
   * reference to actuator applier
   */
  get actuator(): IActuatorApplier {
    return this;
  }
  /**
   * alias reference to actuator applier
   */
  get a(): IActuatorApplier {
    throw new Error('Method not implemented.');
  }
  /**
   * Gets value
   */
  get value(): number {
    return this._getter();
  }
  /**
   * Sets value
   */
  set value(n: number) {
    this._setter(n);
  }
  /**
   * clears any previous values
   */
  get new(): ScalarActuator {
    this._initial = NaN;
    this._source = NaN;
    this._target = 1.0;
    return this;
  }
  /**
   * set FROM value
   * @param n - value to set
   * @returns reference to itself
   */
  from(n: number): ScalarActuator {
    this._initial = NaN;
    this._source = n;
    return this;
  }
  /**
   * set TO value
   * @param n - value to set
   * @returns reference to itself
   */
  to(n: number): ScalarActuator {
    this._initial = NaN;
    this._target = n;
    return this;
  }
  /**
   * Applys scalar actuator
   * @param tCycle01 - value of movement from FROM value to TO value
   * @param [tMerge01] - merge with previous state, if not specified or >= 1 then no merge is done
   * @returns reference to itself
   */
  apply(tCycle01: number, tMerge01 = NaN): IActuatorApplier {
    if (isNaN(this._initial)) this.initialize();
    if (isNaN(tMerge01)) tMerge01 = 1.0; // assume it has already been merged
    let from = this._source;
    if (tMerge01 < 1.0) {
      from = interpolate(this._initial, this._source, tMerge01);
    }
    this._setter(interpolate(from, this._target, tCycle01));
    return this;
  }
  private initialize() {
    this._initial = this._getter();
    if (isNaN(this._target)) this._target = 1.0;
    if (isNaN(this._source)) this._source = this._initial;
  }
}
export class Actuator implements IActuatorApplier {
  private _name: string;
  private _handle: Object3D;
  private _movement: IV3ByProgress;
  private _rotation: IQtByProgress;
  private _lastRotBuilder: RotationBuilder;
  private _lastTraBuilder: MovementBuilder;
  /**
   * Creates an instance of actuator.
   * @param name - actuator name
   * @param actuatorHandle - handle to actuator object
   */
  constructor(name: string, actuatorHandle: Object3D) {
    this._name = name || actuatorHandle.name;
    this._handle = actuatorHandle;
    this._movement = null;
    this._rotation = null;
    this._lastRotBuilder = null;
    this._lastTraBuilder = null;
  }
  /**
   * Gets name
   */
  get name(): string {
    return this._name;
  }
  /**
   * Gets handle
   */
  get handle(): Object3D {
    return this._handle;
  }
  /**
   * movement progress object
   */
  get movement(): IV3ByProgress {
    return this._movement;
  }
  /**
   * rotation progress object
   */
  get rotation(): IQtByProgress {
    return this._rotation;
  }
  /**
   * reset movement
   */
  get noMove(): Actuator {
    this._movement = null;
    this._lastTraBuilder = null;
    return this;
  }
  /**
   * reset rotation
   */
  get noRotation(): Actuator {
    this._rotation = null;
    this._lastRotBuilder = null;
    return this;
  }
  /**
   * Applys actuator
   * @param tCycle01 - value of movement from FROM value to TO value
   * @param [tMerge01] - merge with previous state, if not specified or >= 1 then no merge is done
   * @returns reference to itself
   */
  apply(tCycle01: number, tMerge01 = NaN): IActuatorApplier {
    this.applyRotation(tCycle01, tMerge01);
    this.applyMove(tCycle01, tMerge01);
    return this;
  }
  /**
   * Applys actuator rotation
   * @param tCycle01 - value of movement from FROM value to TO value
   * @param [tMerge01] - merge with previous state, if not specified or >= 1 then no merge is done
   * @returns reference to itself
   */
  applyRotation(tCycle01: number, tMerge01 = NaN): Actuator {
    this.ensureRotBuild();

    if (!this._rotation) return;
    // rotate
    const rot = this.computeRot(tCycle01, tMerge01);
    if (!rot) return this;
    if (this._rotation.space == Space.world) this._handle.worldRot = rot;
    else this._handle.rot = rot;
    return this;
  }
  /**
   * Applys actuator movement
   * @param tCycle01 - value of movement from FROM value to TO value
   * @param [tMerge01] - merge with previous state, if not specified or >= 1 then no merge is done
   * @returns reference to itself
   */
  applyMove(tCycle01: number, tMerge01 = NaN): Actuator {
    this.ensureTraBuild();
    if (!this._movement) return;
    // translate
    const pos = this.computePos(tCycle01, tMerge01);
    if (!pos) return this;
    if (this._movement.space == Space.world) this._handle.worldPos = pos;
    else this._handle.pos = pos;
    return this;
  }
  /**
   * Compute and return actuator rotation without applying it
   * @param tCycle01 - value of movement from FROM value to TO value
   * @param [tMerge01] - merge with previous state, if not specified or >= 1 then no merge is done
   * @returns reference to itself
   */
  computeRot(tCycle01: number, tMerge01 = NaN): Qt {
    if (!this._rotation) return null;

    if (isNaN(tMerge01)) tMerge01 = 1.0; // assume is has already been merged
    // rotate
    return this._rotation.valueByProgress(tCycle01, tMerge01);
  }
  /**
   * Compute and return actuator movement without applying it
   * @param tCycle01 - value of movement from FROM value to TO value
   * @param [tMerge01] - merge with previous state, if not specified or >= 1 then no merge is done
   * @returns reference to itself
   */
  computePos(tCycle01: number, tMerge01 = NaN): V3 {
    if (!this._movement) return null;

    if (isNaN(tMerge01)) tMerge01 = 1.0; // assume is has already been merged
    // translate
    return this._movement.valueByProgress(tCycle01, tMerge01);
  }
  /**
   * When a given condition is met, execute actuator action
   * @param condition - condition to check
   * @param create - action to ececute if condition is true
   * @returns reference to itself
   */
  when(condition: boolean, create: IActionOfT<Actuator>): Actuator {
    if (condition) create(this);
    return this;
  }
  private ensureRotBuild(): void {
    if (!this._lastRotBuilder) return;
    this._lastRotBuilder.build();
    this._lastRotBuilder = null;
  }
  private ensureTraBuild(): void {
    if (!this._lastTraBuilder) return;
    this._lastTraBuilder.build();
    this._lastTraBuilder = null;
  }
  get rotate(): RotationBuilder {
    if (!this._lastRotBuilder) this._lastRotBuilder = new RotationBuilder(this);
    this._lastRotBuilder.recycle();
    return this._lastRotBuilder;
  }
  get move(): MovementBuilder {
    if (!this._lastTraBuilder) this._lastTraBuilder = new MovementBuilder(this);
    this._lastTraBuilder.recycle();
    return this._lastTraBuilder;
  }
  /**
   * Sets rotation progress
   */
  setRotation(rotation: IQtByProgress): Actuator {
    this._rotation = rotation;
    return this;
  }
  /**
   * Sets movement progress
   */
  setMovement(movement: IV3ByProgress): Actuator {
    this._movement = movement;
    return this;
  }
}
/**
 * apply actuators
 */
export function apply(x: number, ...actuators: IActuatorApplierHolder[]) {
  for (let i = 0; i < actuators.length; i++) {
    actuators[i].a.apply(x, 1.0);
  }
}
/**
 * apply and merge actuators
 */
export function applyAndMerge(x: number, xMerge: number, ...actuators: IActuatorApplierHolder[]) {
  for (let i = 0; i < actuators.length; i++) {
    actuators[i].a.apply(x, xMerge);
  }
}
export class RotationBuilder {
  private _actuator: Actuator;
  private _rotateFrom: ViewToQt;
  private _rotateTo: ViewToQt;
  private _space: Space;
  private _rotateAboutAxes: RotationsAboutAxes;
  private _rotateTo2KeyPoints: [ViewToQt, number, ViewToQt];
  /**
   * Creates an instance of rotation builder.
   * @param actuator - pass an actuator instance
   */
  constructor(actuator: Actuator) {
    this._actuator = actuator;
    this.recycle();
  }
  /**
   * Creates or recycles MovementBuilder
   */
  get move(): MovementBuilder {
    return this.build().move;
  }
  /**
   * Clears movement
   */
  get noMove(): Actuator {
    return this._actuator.noMove;
  }
  /**
   * Recycles rotation
   */
  recycle(): void {
    this._rotateFrom = null;
    this._rotateTo = null;
    this._rotateTo2KeyPoints = null;
    this._space = Space.local;
    this._rotateAboutAxes = null;
  }
  /**
   * When a given condition is met, execute rotation creation action
   * @param condition - condition to check
   * @param create - function to execute if condition is true, takes RotationBuilder as argument
   * @returns reference to itself
   */
  when(condition: boolean, create: IActionOfT<RotationBuilder>): RotationBuilder {
    if (condition) create(this);
    return this;
  }
  /**
   * Sets local space (that is the default)
   * @returns reference to itself
   */
  asLocal(): RotationBuilder {
    this._space = Space.local;
    return this;
  }
  /**
   * Sets world space
   * @returns reference to itself
   */
  asWorld(): RotationBuilder {
    this._space = Space.world;
    return this;
  }
  /**
   * Set source rotation - use it only when you will apply periodic function to oscilate between 'from' and 'to'
   * @param func - factory function
   * @param [isDynamic] - if set to true creation function will be invoked on each frame as oposed to on initialization only
   * @returns reference to itself
   */
  from(func: IFuncOf2T<ObjView, Qt>, isDynamic = false): RotationBuilder {
    this._rotateFrom = new ViewToQt(this._actuator.handle.view, func, isDynamic);
    return this;
  }
  /**
   * Set source rotation to the initial rotation - use it only when you will apply periodic function to oscilate between 'from' and 'to'
   * @param [isDynamic] - if set to true creation function will be invoked on each frame as oposed to on initialization only
   * @returns reference to itself
   */
  fromIni(isDynamic = false): RotationBuilder {
    this._rotateFrom = new ViewToQt(this._actuator.handle.view, v => v.o.iniRot, isDynamic);
    return this;
  }
  /**
   * Set target rotation to the initial rotation
   * @param [isDynamic] - if set to true creation function will be invoked on each frame as oposed to on initialization only
   * @returns reference to itself
   */
  toIni(isDynamic = false): RotationBuilder {
    this._rotateTo = new ViewToQt(this._actuator.handle.view, v => v.o.iniRot, isDynamic);
    return this;
  }
  /**
   * Set target rotation
   * @param func - factory function
   * @param [isDynamic] - if set to true creation function will be invoked on each frame as oposed to on initialization only
   * @returns reference to itself
   */
  to(func: IFuncOf2T<ObjView, Qt>, isDynamic = false): RotationBuilder {
    this._rotateTo = new ViewToQt(this._actuator.handle.view, func, isDynamic);
    return this;
  }
  /**
   * Sets 2 separate key points
   * @param func1 - factory function for the first keypoint target
   * @param start2 - start position of second keypoint target
   * @param func2 - factory function for the second keypoint target
   * @param [isDynamic] - if set to true creation function will be invoked on each frame as oposed to on initialization only
   * @returns reference to itself
   */
  to2KeyPoints(
    func1: IFuncOf2T<ObjView, Qt>,
    start2: number,
    func2: IFuncOf2T<ObjView, Qt>,
    isDynamic = false,
  ): RotationBuilder {
    const v = this._actuator.handle.view;
    this._rotateTo2KeyPoints = [
      new ViewToQt(v, func1, isDynamic),
      start2,
      new ViewToQt(v, func2, isDynamic),
    ];
    return this;
  }
  /**
   * Define rotation about a given axis
   * @param axisFunc - function that will return axis based on view
   * @param fromDegrees - from degrees
   * @param toDegrees - to degrees
   * @param xFunc - function of change between from degeres and to degrees, from degrees = 0 to degrees = 1
   * @returns reference to itself
   */
  aboutAxis(
    axisFunc: IFuncOf2T<ObjView, IV3Readonly>,
    fromDegrees: number,
    toDegrees: number,
    xFunc: IFuncOf2T<number, number>,
  ): RotationBuilder {
    if (this._space == Space.world) throwError(`Axis manipulation is only possible in local space`);
    if (!this._rotateAboutAxes)
      this._rotateAboutAxes = new RotationsAboutAxes(this._actuator.handle);
    this._rotateAboutAxes.add(axisFunc, fromDegrees, toDegrees, xFunc);
    return this;
  }
  /**
   * Builds rotation builder
   * @returns actuator
   */
  build(): Actuator {
    const p = this.buildInternal();
    if (p) {
      return this._actuator.setRotation(p);
    }
    return this._actuator;
  }
  private buildInternal(): IQtByProgress {
    if (this._rotateAboutAxes) return this._rotateAboutAxes.initialize();

    if (this._rotateTo || !!this._rotateTo2KeyPoints) {
      const hd = this._actuator.handle;
      const from = new ViewToQt(
        hd.v,
        this._space == Space.world ? v => v.o.worldRot : v => v.o.rot,
        false,
      );
      let to1: ViewToQt = null;
      let to2 = this._rotateTo;
      let to2Start = 0;
      if (this._rotateTo2KeyPoints) {
        to1 = this._rotateTo2KeyPoints[0];
        to2Start = this._rotateTo2KeyPoints[1];
        to2 = this._rotateTo2KeyPoints[2];
      }

      const rotation = new RoteteView(from, to1, to2Start, to2, this._rotateFrom);
      rotation.space = this._space;
      return rotation;
    }
    return null;
  }
}
export class MovementBuilder {
  private _actuator: Actuator;
  private _idealFrom: ViewToV3;
  private _to: ViewToV3;
  private _relCurveControl1: ViewToV3;
  private _relCurveControl2: ViewToV3;
  private _moveAlongAxes: MovementsAlongAxes;
  private _space: Space;
  /**
   * Creates an instance of movement builder.
   * @param actuator - pass an actuator instance
   */
  constructor(actuator: Actuator) {
    this._actuator = actuator;
    this.recycle();
  }
  /**
   * Creates or recycles RotationBuilder
   */
  get rotate(): RotationBuilder {
    return this.build().rotate;
  }
  /**
   * Clears rotation
   */
  get noRotation(): Actuator {
    return this._actuator.noRotation;
  }
  /**
   * Recycles movement
   */
  recycle(): void {
    this._to = null;
    this._idealFrom = null;
    this._relCurveControl1 = null;
    this._relCurveControl2 = null;
    this._space = Space.local;
    this._moveAlongAxes = null;
  }
  /**
   * When a given condition is met, execute movement creation action
   * @param condition - condition to check
   * @param create - function to execute if condition is true, takes MovementBuilder as argument
   * @returns reference to itself
   */
  when(condition: boolean, create: IActionOfT<MovementBuilder>): MovementBuilder {
    if (condition) create(this);
    return this;
  }
  /**
   * Sets local space (that is the default)
   * @returns reference to itself
   */
  asLocal(): MovementBuilder {
    this._space = Space.local;
    return this;
  }
  /**
   * Sets world space
   * @returns reference to itself
   */
  asWorld(): MovementBuilder {
    this._space = Space.world;
    return this;
  }
  /**
   * Set source movement point - use it only when you will apply periodic function to oscilate between 'from' and 'to'
   * @param func - factory function, takes object view as argument and returns a vector
   * @param [isDynamic] - if set to true creation function will be invoked on each frame as oposed to on initialization only
   * @param [normalizeByFactor] - when set to false will not apply object factor normalization (by default true)
   * @returns reference to itself
   */
  from(func: IFuncOf2T<ObjView, V3>, isDynamic = false, normalizeByFactor = true): MovementBuilder {
    this._idealFrom = new ViewToV3(
      this._actuator.handle.view,
      func,
      isDynamic,
      normalizeByFactor,
      this._space,
    );
    return this;
  }
  /**
   * Set source movement point to the initial position - use it only when you will apply periodic function to oscilate between 'from' and 'to'
   * @param [isDynamic] - if set to true creation function will be invoked on each frame as oposed to on initialization only
   * @returns reference to itself
   */
  fromIni(isDynamic = false): MovementBuilder {
    this._idealFrom = new ViewToV3(
      this._actuator.handle.view,
      v => v.o.iniPos,
      isDynamic,
      false,
      this._space,
    );
    return this;
  }
  /**
   * Set target movement point
   * @param func - factory function, takes object view as argument and returns a vector
   * @param [isDynamic] - if set to true creation function will be invoked on each frame as oposed to on initialization only
   * @param [normalizeByFactor] - when set to false will not apply object factor normalization (by default true)
   * @returns reference to itself
   */
  to(func: IFuncOf2T<ObjView, V3>, isDynamic = false, normalizeByFactor = true): MovementBuilder {
    this._to = new ViewToV3(
      this._actuator.handle.view,
      func,
      isDynamic,
      normalizeByFactor,
      this._space,
    );
    return this;
  }
  /**
   * Set target movement point to the initial position
   * @param [isDynamic] - if set to true creation function will be invoked on each frame as oposed to on initialization only
   * @returns reference to itself
   */
  toIni(isDynamic = false): MovementBuilder {
    this._to = new ViewToV3(
      this._actuator.handle.view,
      v => v.o.iniPos,
      isDynamic,
      false,
      this._space,
    );
    return this;
  }
  /**
   * Set relative curve control1 vector - if not defined motion will be on a line
   * control point is defined by adding this vector to mid point between 'from' and 'to' points if relCurveControl12 is not defind
   * control point is defined by adding this vector to 'from' point, if relCurveControl12 is defind
   * NOTE: if relCurveControl1 is used, motion will be on a quadratic bezie and this will be the control point
   * NOTE: if relCurveControl1 and relCurveControl12 are used, motion will be on a cubic bezie and this will be the first control point
   * @param func - factory function for control vector, takes object view as argument and returns a vector
   * @param [isDynamic] - if set to true creation function will be invoked on each frame as oposed to on initialization only
   * @param [normalizeByFactor] - when set to false will not apply object factor normalization (by default true)
   * @returns reference to itself
   */
  relCurveControl1(
    func: IFuncOf2T<ObjView, V3>,
    isDynamic = false,
    normalizeByFactor = true,
  ): MovementBuilder {
    this._relCurveControl1 = new ViewToV3(
      this._actuator.handle.view,
      func,
      isDynamic,
      normalizeByFactor,
      this._space,
    );
    return this;
  }
  /**
   * Set relative curve control2 vector for cubic bezier - if not defined motion will be on a line or quadratic bezie
   * control point is defined by adding this vector to 'to' point
   * NOTE: if relCurveControl1 is used, motion will be on a quadratic bezie and this will be the control point
   * NOTE: if relCurveControl1 and relCurveControl12 are used, motion will be on a cubic bezie and this will be the first control point
   * @param func - factory function for control vector, takes object view as argument and returns a vector
   * @param [isDynamic] - if set to true creation function will be invoked on each frame as oposed to on initialization only
   * @param [normalizeByFactor] - when set to false will not apply object factor normalization (by default true)
   * @returns reference to itself
   */
  relCurveControl2(
    func: IFuncOf2T<ObjView, V3>,
    isDynamic = false,
    normalizeByFactor = true,
  ): MovementBuilder {
    this._relCurveControl2 = new ViewToV3(
      this._actuator.handle.view,
      func,
      isDynamic,
      normalizeByFactor,
      this._space,
    );
    return this;
  }
  /**
   * Define movement alongs axis
   * @param axisFunc - function that will return axis based on view
   * @param from - from degrees
   * @param to - to degrees
   * @param xFunc - function of change between from degeres and to degrees, from degrees = 0 to degrees = 1
   * @param [normalizeByFactor] - when set to false will not apply object factor normalization (by default true)
   * @returns reference to itself
   */
  alongAxis(
    axisFunc: IFuncOf2T<ObjView, IV3Readonly>,
    from: number,
    to: number,
    xFunc: IFuncOf2T<number, number>,
    normalizeByFactor = true,
  ): MovementBuilder {
    if (this._space == Space.world) throwError(`Axis manipulation is only possible in local space`);
    if (!this._moveAlongAxes) this._moveAlongAxes = new MovementsAlongAxes(this._actuator.handle);
    this._moveAlongAxes.add(axisFunc, from, to, xFunc, normalizeByFactor);
    return this;
  }
  /**
   * Builds movement builder
   * @returns actuator
   */
  build(): Actuator {
    const p = this.buildInternal();
    if (p) {
      return this._actuator.setMovement(p);
    }
    return this._actuator;
  }
  private buildInternal(): IV3ByProgress {
    if (this._moveAlongAxes) return this._moveAlongAxes.initialize();

    const hd = this._actuator.handle;

    if (this._to) {
      if (this._relCurveControl1) {
        const from = new ViewToV3(
          hd.v,
          this._space == Space.world ? v => v.o.worldPos : v => v.o.pos,
          false,
          false,
          this._space,
        );
        const isCubic = !!this._relCurveControl2;
        const to = this._to;

        if (isCubic) {
          const curve1 = new MoveViewAlongCurve(
            from,
            this._relCurveControl1,
            this._relCurveControl2,
            to,
            this._idealFrom,
          );
          curve1.space = this._space;
          return curve1;
        }
        // is quadratic
        const curve2 = new MoveViewAlongCurve(
          from,
          this._relCurveControl1,
          null,
          to,
          this._idealFrom,
        );
        curve2.space = this._space;
        return curve2;
      } else {
        const from = new ViewToV3(
          hd.v,
          this._space == Space.world ? v => v.o.worldPos : v => v.o.pos,
          false,
          false,
          this._space,
        );

        const to = this._to;
        const line = new MoveViewAlongLine(from, to, this._idealFrom);
        line.space = this._space;
        return line;
      }
    }
    return null;
  }
}
class BaseProgress {
  private _space: Space;
  constructor() {
    this._space = Space.local;
  }
  /**
   * get space
   */
  get space(): Space {
    return this._space;
  }
  /**
   * set space
   */
  set space(s: Space) {
    this._space = s;
  }
}
export class ViewToV3 {
  private readonly _val: V3;
  /**
   * Creates an instance of view to v3
   * @param view - object view
   * @param func - factory function, takes object view as argument and returns vector
   * @param isDynamic - if set to true creation function will be invoked on each frame as oposed to on initialization
   * @param normalizeByFactor - when set to false will not apply object factor normalization (by default true)
   * @param space - space where object should be placed (local or world)
   */
  constructor(
    private readonly view: ObjView,
    private readonly func: IFuncOf2T<ObjView, V3>,
    private readonly isDynamic: boolean,
    private readonly normalizeByFactor: boolean,
    private readonly space: Space,
  ) {
    if (!this.isDynamic) this._val = this.compute().permanent;
  }
  /**
   * Gets V3 computed each time if dynamic or cached otherwise
   */
  get val(): V3 {
    return this.isDynamic ? this.compute() : this._val;
  }
  private compute(): V3 {
    const v3 = this.func(this.view);
    if (this.normalizeByFactor)
      v3.mulBy_(this.space == Space.world ? this.view.o.scale : this.view.o.factor);
    return v3;
  }
}
export class ViewToQt {
  private readonly _val: Qt;
  /**
   * Creates an instance of view to Qt
   * @param view - object view
   * @param func - factory function, takes object view as argument and returns quaternion
   * @param isDynamic - if set to true creation function will be invoked on each frame as oposed to on initialization
   */
  constructor(
    private readonly view: ObjView,
    private readonly func: IFuncOf2T<ObjView, Qt>,
    private readonly isDynamic: boolean,
  ) {
    if (!this.isDynamic) this._val = this.func(this.view).permanent;
  }
  /**
   * Gets Qt computed each time if dynamic or cached otherwise
   */
  get val(): IQtReadonly {
    return this.isDynamic ? this.func(this.view) : this._val;
  }
}
class AxisChangeData {
  /**
   * Creates an instance of axis change data.
   * @param axisFunc - function that will return axis based on view
   * @param from - from value
   * @param to - to value
   * @param xFunc - function of change between from value and to value, from value maps to 0 to value maps to 1
   * @param normalizeByFactor - when set to false will not apply object factor normalization (ignored for rotations)
   */
  readonly rot: Qt;
  readonly axis: IV3Readonly;
  constructor(
    public readonly axisFunc: IFuncOf2T<ObjView, IV3Readonly>,
    public readonly from: number,
    public readonly to: number,
    public readonly xFunc: IFuncOf2T<number, number>,
    public readonly handle: Object3D,
    public readonly isRotation: boolean,
    public readonly normalizeByFactor: boolean,
  ) {
    if (this.isRotation) this.rot = Qt.createPermanent(0, 0, 0, 1);
    this.axis = this.axisFunc(this.handle.view).ensureReadonly;
  }
}
class MovementsAlongAxes implements IV3ByProgress {
  private readonly _changes: Array<AxisChangeData> = [];
  private startPos: IV3Readonly;
  constructor(private readonly handle: Object3D) {
    this.startPos = V3.zero;
  }
  /**
   * initializes movements along axes
   */
  initialize(): MovementsAlongAxes {
    this.startPos = this.handle.pos.ensureReadonly;
    return this;
  }
  get type(): string {
    return 'MovementsAlongAxes';
  }
  /**
   * Space is always local
   */
  get space(): Space {
    return Space.local;
  }
  /**
   * Space is always local
   */
  set space(s: Space) {
    throwError(`MovementsAlongAxes cannot change local space`);
  }
  /**
   * Adds movements along axis to the initial position
   * @param axisFunc - function that will return axis based on view
   * @param from - from value
   * @param to - to value
   * @param xFunc - function of change between from value and to value, from value maps to 0 to value maps to 1
   * @param normalizeByFactor - when set to false will not apply object factor normalization
   */
  add(
    axisFunc: IFuncOf2T<ObjView, IV3Readonly>,
    from: number,
    to: number,
    xFunc: IFuncOf2T<number, number>,
    normalizeByFactor: boolean,
  ) {
    this._changes.push(
      new AxisChangeData(axisFunc, from, to, xFunc, this.handle, false, normalizeByFactor),
    );
  }
  /**
   * Computes position based on axis transformations
   * @param tCycle - progress - from 0 to 1 with 0 being the beginning and 1 the end
   * @param tMerge - merge factor, if more than 1 or NaN will be ignore
   * @returns by progress
   */
  valueByProgress(tCycle: number, tMerge: number): V3 {
    const p = this.handle.iniPos;
    for (let i = 0; i < this._changes.length; i++) {
      const c = this._changes[i];
      let move = from01ToRange(c.xFunc(tCycle), c.from, c.to);
      if (c.normalizeByFactor) move *= this.handle.factor;
      p.add_(c.axis.by(move));
    }
    return isNaN(tMerge) || tMerge >= 1 ? p : this.startPos.moveTo(p, tMerge);
  }
}
class RotationsAboutAxes implements IQtByProgress {
  private readonly _changes: Array<AxisChangeData> = [];
  private startRot: IQtReadonly;
  constructor(private readonly handle: Object3D) {
    this.startRot = Qt.identity;
  }
  /**
   * Initializes rotations about axes
   */
  initialize(): RotationsAboutAxes {
    this.startRot = this.handle.rot.readonly;
    return this;
  }
  get type(): string {
    return 'RotationsAboutAxes';
  }
  /**
   * Space is always local
   */
  get space(): Space {
    return Space.local;
  }
  /**
   * Space is always local
   */
  set space(s: Space) {
    throwError(`RotationsAboutAxes cannot change local space`);
  }
  /**
   * Adds rotation about axis to the initial rotation
   * @param axisFunc - function that will return axis based on view
   * @param fromDegrees - from degrees
   * @param toDegrees - to degrees
   * @param xFunc - function of change between from degrees and to degrees, from value maps to 0 to value maps to 1
   */
  add(
    axisFunc: IFuncOf2T<ObjView, IV3Readonly>,
    fromDegrees: number,
    toDegrees: number,
    xFunc: IFuncOf2T<number, number>,
  ) {
    this._changes.push(
      new AxisChangeData(axisFunc, fromDegrees, toDegrees, xFunc, this.handle, true, false),
    );
  }
  /**
   * Computes position based on axis transformations
   * @param tCycle - progress - from 0 to 1 with 0 being the beginning and 1 the end
   * @param tMerge - merge factor, if more than 1 or NaN will be ignore
   * @returns by progress
   */
  valueByProgress(tCycle: number, tMerge: number): Qt {
    const r = this.handle.iniRot;
    for (let i = 0; i < this._changes.length; i++) {
      const c = this._changes[i];
      const degrees = from01ToRange(c.xFunc(tCycle), c.from, c.to);
      Math3D.setQtAsAxisRot(c.rot, c.axis, degrees);
      r.mul_(c.rot);
    }
    return isNaN(tMerge) || tMerge >= 1 ? r : this.startRot.rotateTo(r, tMerge);
  }
}
/**
 * Progress of a point along a curve
 */
class MoveViewAlongCurve extends BaseProgress implements IV3ByProgress {
  get type(): string {
    return 'MoveViewAlongCurve';
  }
  /**
   * Creates an instance of move view along curve.
   * @param from - from point
   * @param c1 - first control point
   * @param c2 - second control point
   * @param to - target point
   * @param idealFrom - ideal from point (used for smoothing)
   */
  constructor(
    private readonly from: ViewToV3,
    private readonly c1: ViewToV3,
    private readonly c2: ViewToV3,
    private readonly to: ViewToV3,
    private readonly idealFrom: ViewToV3,
  ) {
    if (!c1) throw new Error(`MoveViewAlongCurve requires at least one control point`);
    super();
  }
  /**
   * Computes value by progress
   * @param tProgress - progress
   * @param tMerge - merge factor, if more than 1 or NaN will be ignore
   * @returns by progress
   */
  valueByProgress(tProgress: number, tMerge: number): V3 {
    if (this.idealFrom) {
      // ideal from
      if (isNaN(tMerge)) tMerge = 1;
      if (tMerge < 1)
        return this.from.val.moveTo(this.internalCurve(this.idealFrom.val, tProgress), tMerge);
      else return this.internalCurve(this.idealFrom.val, tProgress);
    }
    return this.internalCurve(this.from.val, tProgress);
  }
  private internalCurve(from: IV3Readonly, t: number): V3 {
    const isCubic = !!this.c2;
    const to = this.to.val;

    return isCubic
      ? Math3D.cubicBezierV3(t, from, from.add(this.c1.val), to.add(this.c2.val), to)
      : Math3D.quadraticBezierV3(t, from, from.moveTo(to, 0.5).add_(this.c1.val), to);
  }
}
/**
 * Progress of a point along a line
 */
class MoveViewAlongLine extends BaseProgress implements IV3ByProgress {
  get type(): string {
    return 'MoveViewAlongLine';
  }
  /**
   * Creates an instance of move view along line.
   * @param from - from point
   * @param to - target point
   * @param idealFrom - ideal from point (used for smoothing)
   */
  constructor(
    private readonly from: ViewToV3,
    private readonly to: ViewToV3,
    private readonly idealFrom: ViewToV3,
  ) {
    super();
  }
  /**
   * Computes value by progress
   * @param tProgress - progress
   * @param tMerge - merge factor, if more than 1 or NaN will be ignore
   * @returns by progress
   */
  valueByProgress(tProgress: number, tMerge: number): V3 {
    if (this.idealFrom) {
      // ideal from
      if (isNaN(tMerge)) tMerge = 1;
      if (tMerge < 1)
        return this.from.val.moveTo(this.idealFrom.val.moveTo(this.to.val, tProgress), tMerge);
      else return this.idealFrom.val.moveTo(this.to.val, tProgress);
    }

    return this.from.val.moveTo(this.to.val, tProgress);
  }
}
/**
 * Progress of a rotation change
 */
class RoteteView extends BaseProgress implements IQtByProgress {
  get type(): string {
    return 'RoteteView';
  }
  /**
   * Creates an instance of rotete view
   * @param from - from rotation
   * @param to1 - to rotation
   * @param to2Start - start of second segment
   * @param to2 - to rotation for the second segment
   * @param idealFrom - ideal from point (used for smoothing)
   */
  constructor(
    private readonly from: ViewToQt,
    private readonly to1: ViewToQt,
    private readonly to2Start: number,
    private readonly to2: ViewToQt,
    private readonly idealFrom: ViewToQt,
  ) {
    super();
    if (!from) throw new Error(`RoteteView requires "from" value`);
    if (!to2) throw new Error(`RoteteView requires "to2" value`);
  }
  /**
   * Computes value by progress
   * @param tProgress - progress
   * @param tMerge - merge factor, if more than 1 or NaN will be ignore
   * @returns by progress
   */
  valueByProgress(tProgress: number, tMerge: number): Qt {
    if (!this.to1) {
      return this.applyRotation(
        tProgress,
        tMerge,
        this.from.val,
        !this.idealFrom ? null : this.idealFrom.val,
        this.to2.val,
      );
    }
    if (tProgress < this.to2Start) {
      return this.internalRotation(this.from.val, this.to1.val, tProgress / this.to2Start);
    }
    return this.internalRotation(
      this.to1.val,
      this.to2.val,
      (tProgress - this.to2Start) / (1 - this.to2Start),
    );
  }
  private applyRotation(
    tProgress: number,
    tMerge: number,
    realFrom: IQtReadonly,
    idealFrom: IQtReadonly,
    to: IQtReadonly,
  ): Qt {
    if (idealFrom) {
      if (tMerge < 1)
        return realFrom.rotateTo(this.internalRotation(idealFrom, to, tProgress), tMerge);
      else return this.internalRotation(idealFrom, to, tProgress);
    }
    return this.internalRotation(realFrom, to, tProgress);
  }
  private internalRotation(from: IQtReadonly, to: IQtReadonly, t: number): Qt {
    return from.rotateTo(to, t);
  }
}
/**
 * Loads object wrap by tree object name
 * @param name - name of obj
 * @returns object wrap
 */
export async function loadObjWraps(...names: string[]): Promise<ObjWrap[]> {
  const objects = await Promise.all(names.map(n => S.root.findFirst(n)));
  return objects.map(ob => (!ob ? null : new ObjWrap(ob.name, ObjSummary.create(ob))));
}
