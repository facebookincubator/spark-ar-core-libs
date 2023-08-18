[spark-procedural-animations](../README.md) / [Exports](../modules.md) / BaseCharacter

# Class: BaseCharacter

Base character - abstract class for character

## Hierarchy

- [`ObjWrap`](ObjWrap.md)

  ↳ **`BaseCharacter`**

  ↳↳ [`HumanoidCharacter`](HumanoidCharacter.md)

## Implements

- [`ICharacter`](../interfaces/ICharacter.md)

## Table of contents

### Constructors

- [constructor](BaseCharacter.md#constructor)

### Properties

- [\_enablePostToNative](BaseCharacter.md#_enableposttonative)
- [\_extenderByName](BaseCharacter.md#_extenderbyname)
- [\_factor](BaseCharacter.md#_factor)
- [\_iniPos](BaseCharacter.md#_inipos)
- [\_iniPosMagnitude](BaseCharacter.md#_iniposmagnitude)
- [\_iniRot](BaseCharacter.md#_inirot)
- [\_iniSca](BaseCharacter.md#_inisca)
- [\_jointsByName](BaseCharacter.md#_jointsbyname)
- [\_objectsById](BaseCharacter.md#_objectsbyid)
- [\_pos](BaseCharacter.md#_pos)
- [\_rot](BaseCharacter.md#_rot)
- [\_sca](BaseCharacter.md#_sca)
- [\_solvers](BaseCharacter.md#_solvers)
- [\_updaters](BaseCharacter.md#_updaters)
- [behavior](BaseCharacter.md#behavior)
- [config](BaseCharacter.md#config)
- [data](BaseCharacter.md#data)
- [toEulerFunc](BaseCharacter.md#toeulerfunc)

### Accessors

- [a](BaseCharacter.md#a)
- [actuator](BaseCharacter.md#actuator)
- [bk](BaseCharacter.md#bk)
- [dn](BaseCharacter.md#dn)
- [enablePostToNative](BaseCharacter.md#enableposttonative)
- [extenderByName](BaseCharacter.md#extenderbyname)
- [factor](BaseCharacter.md#factor)
- [fw](BaseCharacter.md#fw)
- [identifier](BaseCharacter.md#identifier)
- [iniBk](BaseCharacter.md#inibk)
- [iniDn](BaseCharacter.md#inidn)
- [iniFw](BaseCharacter.md#inifw)
- [iniLt](BaseCharacter.md#inilt)
- [iniPos](BaseCharacter.md#inipos)
- [iniPosAsWorld](BaseCharacter.md#iniposasworld)
- [iniPosFac](BaseCharacter.md#iniposfac)
- [iniPosMagnitude](BaseCharacter.md#iniposmagnitude)
- [iniRot](BaseCharacter.md#inirot)
- [iniRotAsWorld](BaseCharacter.md#inirotasworld)
- [iniRt](BaseCharacter.md#inirt)
- [iniSca](BaseCharacter.md#inisca)
- [iniUp](BaseCharacter.md#iniup)
- [jointsByName](BaseCharacter.md#jointsbyname)
- [label](BaseCharacter.md#label)
- [lt](BaseCharacter.md#lt)
- [model](BaseCharacter.md#model)
- [name](BaseCharacter.md#name)
- [obj](BaseCharacter.md#obj)
- [objectsById](BaseCharacter.md#objectsbyid)
- [parent](BaseCharacter.md#parent)
- [pos](BaseCharacter.md#pos)
- [posX](BaseCharacter.md#posx)
- [posY](BaseCharacter.md#posy)
- [posZ](BaseCharacter.md#posz)
- [rot](BaseCharacter.md#rot)
- [rt](BaseCharacter.md#rt)
- [sca](BaseCharacter.md#sca)
- [scale](BaseCharacter.md#scale)
- [solvers](BaseCharacter.md#solvers)
- [summary](BaseCharacter.md#summary)
- [transform](BaseCharacter.md#transform)
- [transformWrapper](BaseCharacter.md#transformwrapper)
- [treeName](BaseCharacter.md#treename)
- [up](BaseCharacter.md#up)
- [updaters](BaseCharacter.md#updaters)
- [v](BaseCharacter.md#v)
- [view](BaseCharacter.md#view)
- [worldPos](BaseCharacter.md#worldpos)
- [worldRot](BaseCharacter.md#worldrot)

### Methods

- [addPos](BaseCharacter.md#addpos)
- [addRot](BaseCharacter.md#addrot)
- [buildExtenderByNameMap](BaseCharacter.md#buildextenderbynamemap)
- [cloneViewFrom](BaseCharacter.md#cloneviewfrom)
- [createIkChain](BaseCharacter.md#createikchain)
- [createJoints](BaseCharacter.md#createjoints)
- [dispose](BaseCharacter.md#dispose)
- [getIkFactory](BaseCharacter.md#getikfactory)
- [getJoint](BaseCharacter.md#getjoint)
- [initializeAsync](BaseCharacter.md#initializeasync)
- [initializeExtendersAsync](BaseCharacter.md#initializeextendersasync)
- [lateUpdate](BaseCharacter.md#lateupdate)
- [localToWorldPos](BaseCharacter.md#localtoworldpos)
- [localToWorldRot](BaseCharacter.md#localtoworldrot)
- [localToWorldVec](BaseCharacter.md#localtoworldvec)
- [pivotEnds](BaseCharacter.md#pivotends)
- [pivotStarts](BaseCharacter.md#pivotstarts)
- [postToNative](BaseCharacter.md#posttonative)
- [resetIniPos](BaseCharacter.md#resetinipos)
- [resetIniRot](BaseCharacter.md#resetinirot)
- [resetIniSca](BaseCharacter.md#resetinisca)
- [setPos\_](BaseCharacter.md#setpos_)
- [setRot\_](BaseCharacter.md#setrot_)
- [setSca\_](BaseCharacter.md#setsca_)
- [setView](BaseCharacter.md#setview)
- [setWorldPos\_](BaseCharacter.md#setworldpos_)
- [setWorldRot\_](BaseCharacter.md#setworldrot_)
- [updatePosFromReactive](BaseCharacter.md#updateposfromreactive)
- [updateRotFromReactive](BaseCharacter.md#updaterotfromreactive)
- [updateScaFromReactive](BaseCharacter.md#updatescafromreactive)
- [worldToLocalPos](BaseCharacter.md#worldtolocalpos)
- [worldToLocalRot](BaseCharacter.md#worldtolocalrot)
- [findInternalName](BaseCharacter.md#findinternalname)

## Constructors

### constructor

• **new BaseCharacter**(`data`, `summary`)

Creates an instance of base character.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`CharacterData`](CharacterData.md) | character data |
| `summary` | [`ObjSummary`](ObjSummary.md) | object summary of the top level object of the character |

#### Overrides

[ObjWrap](ObjWrap.md).[constructor](ObjWrap.md#constructor)

#### Defined in

spark.procedural-animations.base-character.ts:959

## Properties

### \_enablePostToNative

• `Protected` **\_enablePostToNative**: `boolean`

#### Inherited from

[ObjWrap](ObjWrap.md).[_enablePostToNative](ObjWrap.md#_enableposttonative)

#### Defined in

spark.procedural-animations.objects.ts:670

___

### \_extenderByName

• `Protected` `Readonly` **\_extenderByName**: `Object`

#### Index signature

▪ [key: `string`]: [`ICharacterExtender`](../interfaces/ICharacterExtender.md)

#### Defined in

spark.procedural-animations.base-character.ts:950

___

### \_factor

• `Protected` **\_factor**: `number`

#### Inherited from

[ObjWrap](ObjWrap.md).[_factor](ObjWrap.md#_factor)

#### Defined in

spark.procedural-animations.objects.ts:669

___

### \_iniPos

• `Protected` **\_iniPos**: [`V3`](V3.md)

#### Inherited from

[ObjWrap](ObjWrap.md).[_iniPos](ObjWrap.md#_inipos)

#### Defined in

spark.procedural-animations.objects.ts:663

___

### \_iniPosMagnitude

• `Protected` **\_iniPosMagnitude**: `number`

#### Inherited from

[ObjWrap](ObjWrap.md).[_iniPosMagnitude](ObjWrap.md#_iniposmagnitude)

#### Defined in

spark.procedural-animations.objects.ts:665

___

### \_iniRot

• `Protected` **\_iniRot**: [`Qt`](Qt.md)

#### Inherited from

[ObjWrap](ObjWrap.md).[_iniRot](ObjWrap.md#_inirot)

#### Defined in

spark.procedural-animations.objects.ts:662

___

### \_iniSca

• `Protected` **\_iniSca**: [`V3`](V3.md)

#### Inherited from

[ObjWrap](ObjWrap.md).[_iniSca](ObjWrap.md#_inisca)

#### Defined in

spark.procedural-animations.objects.ts:664

___

### \_jointsByName

• `Protected` `Readonly` **\_jointsByName**: `Object`

#### Index signature

▪ [key: `string`]: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.base-character.ts:947

___

### \_objectsById

• `Protected` `Readonly` **\_objectsById**: `Object`

#### Index signature

▪ [key: `string`]: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.base-character.ts:948

___

### \_pos

• `Protected` **\_pos**: [`V3`](V3.md)

#### Inherited from

[ObjWrap](ObjWrap.md).[_pos](ObjWrap.md#_pos)

#### Defined in

spark.procedural-animations.objects.ts:667

___

### \_rot

• `Protected` **\_rot**: [`Qt`](Qt.md)

#### Inherited from

[ObjWrap](ObjWrap.md).[_rot](ObjWrap.md#_rot)

#### Defined in

spark.procedural-animations.objects.ts:666

___

### \_sca

• `Protected` **\_sca**: [`V3`](V3.md)

#### Inherited from

[ObjWrap](ObjWrap.md).[_sca](ObjWrap.md#_sca)

#### Defined in

spark.procedural-animations.objects.ts:668

___

### \_solvers

• `Protected` `Readonly` **\_solvers**: [`ISolverIK`](../interfaces/ISolverIK.md)[]

#### Defined in

spark.procedural-animations.base-character.ts:949

___

### \_updaters

• `Protected` `Readonly` **\_updaters**: [`IUpdatable`](../interfaces/IUpdatable.md)[]

#### Defined in

spark.procedural-animations.base-character.ts:951

___

### behavior

• **behavior**: [`Behavior`](Behavior.md)

#### Inherited from

[ObjWrap](ObjWrap.md).[behavior](ObjWrap.md#behavior)

#### Defined in

spark.procedural-animations.objects.ts:674

___

### config

• `Readonly` **config**: [`ICharacterConfig`](../interfaces/ICharacterConfig.md)

#### Implementation of

[ICharacter](../interfaces/ICharacter.md).[config](../interfaces/ICharacter.md#config)

#### Defined in

spark.procedural-animations.base-character.ts:952

___

### data

• `Readonly` **data**: [`CharacterData`](CharacterData.md)

character data

#### Implementation of

[ICharacter](../interfaces/ICharacter.md).[data](../interfaces/ICharacter.md#data)

#### Defined in

spark.procedural-animations.base-character.ts:959

___

### toEulerFunc

• **toEulerFunc**: [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`Qt`](Qt.md), [`V3`](V3.md)\> = `null`

#### Inherited from

[ObjWrap](ObjWrap.md).[toEulerFunc](ObjWrap.md#toeulerfunc)

#### Defined in

spark.procedural-animations.objects.ts:680

## Accessors

### a

• `get` **a**(): [`Actuator`](Actuator.md)

actuator alias

#### Returns

[`Actuator`](Actuator.md)

#### Inherited from

ObjWrap.a

#### Defined in

spark.procedural-animations.objects.ts:845

___

### actuator

• `get` **actuator**(): [`Actuator`](Actuator.md)

actuator

#### Returns

[`Actuator`](Actuator.md)

#### Inherited from

ObjWrap.actuator

#### Defined in

spark.procedural-animations.objects.ts:838

___

### bk

• `get` **bk**(): [`V3`](V3.md)

back direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.bk

#### Defined in

spark.procedural-animations.objects.ts:808

___

### dn

• `get` **dn**(): [`V3`](V3.md)

down direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.dn

#### Defined in

spark.procedural-animations.objects.ts:814

___

### enablePostToNative

• `get` **enablePostToNative**(): `boolean`

Gets enable post to native flag

#### Returns

`boolean`

#### Inherited from

ObjWrap.enablePostToNative

#### Defined in

spark.procedural-animations.objects.ts:1030

• `set` **enablePostToNative**(`b`): `void`

Sets enable post to native flag

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `boolean` |

#### Returns

`void`

#### Inherited from

ObjWrap.enablePostToNative

#### Defined in

spark.procedural-animations.objects.ts:1036

___

### extenderByName

• `get` **extenderByName**(): `Object`

#### Returns

`Object`

#### Defined in

spark.procedural-animations.base-character.ts:980

___

### factor

• `get` **factor**(): `number`

get numeric factor used to normalize actuator commands, for example to define numbers as relative to character height

#### Returns

`number`

#### Inherited from

ObjWrap.factor

#### Defined in

spark.procedural-animations.objects.ts:863

• `set` **factor**(`f`): `void`

set numeric factor used to normalize actuator commands, for example to define numbers as relative to character height

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `number` |

#### Returns

`void`

#### Inherited from

ObjWrap.factor

#### Defined in

spark.procedural-animations.objects.ts:869

___

### fw

• `get` **fw**(): [`V3`](V3.md)

forward direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.fw

#### Defined in

spark.procedural-animations.objects.ts:796

___

### identifier

• `get` **identifier**(): `string`

string identifier

#### Returns

`string`

#### Inherited from

ObjWrap.identifier

#### Defined in

spark.procedural-animations.objects.ts:790

___

### iniBk

• `get` **iniBk**(): [`V3`](V3.md)

initial back direction

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.iniBk

#### Defined in

spark.procedural-animations.objects.ts:979

___

### iniDn

• `get` **iniDn**(): [`V3`](V3.md)

initial down direction

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.iniDn

#### Defined in

spark.procedural-animations.objects.ts:991

___

### iniFw

• `get` **iniFw**(): [`V3`](V3.md)

initial forward direction

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.iniFw

#### Defined in

spark.procedural-animations.objects.ts:973

___

### iniLt

• `get` **iniLt**(): [`V3`](V3.md)

initial left direction

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.iniLt

#### Defined in

spark.procedural-animations.objects.ts:1003

___

### iniPos

• `get` **iniPos**(): [`V3`](V3.md)

initial position

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.iniPos

#### Defined in

spark.procedural-animations.objects.ts:955

___

### iniPosAsWorld

• `get` **iniPosAsWorld**(): [`V3`](V3.md)

initial position in worlds space

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.iniPosAsWorld

#### Defined in

spark.procedural-animations.objects.ts:1137

___

### iniPosFac

• `get` **iniPosFac**(): [`V3`](V3.md)

initial position divided by the factor

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.iniPosFac

#### Defined in

spark.procedural-animations.objects.ts:961

___

### iniPosMagnitude

• `get` **iniPosMagnitude**(): `number`

magnitude of the initial position

#### Returns

`number`

#### Inherited from

ObjWrap.iniPosMagnitude

#### Defined in

spark.procedural-animations.objects.ts:1009

___

### iniRot

• `get` **iniRot**(): [`Qt`](Qt.md)

initial rotation quaternion

#### Returns

[`Qt`](Qt.md)

#### Inherited from

ObjWrap.iniRot

#### Defined in

spark.procedural-animations.objects.ts:949

___

### iniRotAsWorld

• `get` **iniRotAsWorld**(): [`Qt`](Qt.md)

initial rotation in worlds space

#### Returns

[`Qt`](Qt.md)

#### Inherited from

ObjWrap.iniRotAsWorld

#### Defined in

spark.procedural-animations.objects.ts:1143

___

### iniRt

• `get` **iniRt**(): [`V3`](V3.md)

initial right direction

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.iniRt

#### Defined in

spark.procedural-animations.objects.ts:997

___

### iniSca

• `get` **iniSca**(): [`V3`](V3.md)

initial scale

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.iniSca

#### Defined in

spark.procedural-animations.objects.ts:967

___

### iniUp

• `get` **iniUp**(): [`V3`](V3.md)

initial up direction

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.iniUp

#### Defined in

spark.procedural-animations.objects.ts:985

___

### jointsByName

• `get` **jointsByName**(): `Object`

#### Returns

`Object`

#### Defined in

spark.procedural-animations.base-character.ts:971

___

### label

• `Abstract` `get` **label**(): `string`

#### Returns

`string`

#### Implementation of

ICharacter.label

#### Defined in

spark.procedural-animations.base-character.ts:969

___

### lt

• `get` **lt**(): [`V3`](V3.md)

left direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.lt

#### Defined in

spark.procedural-animations.objects.ts:820

___

### model

• `get` **model**(): [`Object3D`](Object3D.md)

Gets model reference (optional)

#### Returns

[`Object3D`](Object3D.md)

#### Inherited from

ObjWrap.model

#### Defined in

spark.procedural-animations.objects.ts:1060

___

### name

• `get` **name**(): `string`

name

#### Returns

`string`

#### Inherited from

ObjWrap.name

#### Defined in

spark.procedural-animations.objects.ts:851

___

### obj

• `get` **obj**(): `SceneObjectBase`

Reference to the underlying SceneObjectBase

#### Returns

`SceneObjectBase`

#### Inherited from

ObjWrap.obj

#### Defined in

spark.procedural-animations.objects.ts:1475

___

### objectsById

• `get` **objectsById**(): `Object`

#### Returns

`Object`

#### Defined in

spark.procedural-animations.base-character.ts:974

___

### parent

• `get` **parent**(): [`Object3D`](Object3D.md)

get parent object

#### Returns

[`Object3D`](Object3D.md)

#### Inherited from

ObjWrap.parent

#### Defined in

spark.procedural-animations.objects.ts:1042

• `set` **parent**(`p`): `void`

set parent object

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`Object3D`](Object3D.md) |

#### Returns

`void`

#### Inherited from

ObjWrap.parent

#### Defined in

spark.procedural-animations.objects.ts:1048

___

### pos

• `get` **pos**(): [`V3`](V3.md)

get object position - local

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.pos

#### Defined in

spark.procedural-animations.objects.ts:889

• `set` **pos**(`p`): `void`

set object position - local

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |

#### Returns

`void`

#### Inherited from

ObjWrap.pos

#### Defined in

spark.procedural-animations.objects.ts:913

___

### posX

• `get` **posX**(): `number`

get position x

#### Returns

`number`

#### Inherited from

ObjWrap.posX

#### Defined in

spark.procedural-animations.objects.ts:895

___

### posY

• `get` **posY**(): `number`

get position y

#### Returns

`number`

#### Inherited from

ObjWrap.posY

#### Defined in

spark.procedural-animations.objects.ts:901

___

### posZ

• `get` **posZ**(): `number`

get position z

#### Returns

`number`

#### Inherited from

ObjWrap.posZ

#### Defined in

spark.procedural-animations.objects.ts:907

___

### rot

• `get` **rot**(): [`Qt`](Qt.md)

get object rotation as quatenion - local

#### Returns

[`Qt`](Qt.md)

#### Inherited from

ObjWrap.rot

#### Defined in

spark.procedural-animations.objects.ts:921

• `set` **rot**(`q`): `void`

set object rotation as quatenion - local

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | [`IQtReadonly`](../interfaces/IQtReadonly.md) |

#### Returns

`void`

#### Inherited from

ObjWrap.rot

#### Defined in

spark.procedural-animations.objects.ts:927

___

### rt

• `get` **rt**(): [`V3`](V3.md)

right direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.rt

#### Defined in

spark.procedural-animations.objects.ts:826

___

### sca

• `get` **sca**(): [`V3`](V3.md)

get object scale - local

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.sca

#### Defined in

spark.procedural-animations.objects.ts:935

• `set` **sca**(`s`): `void`

set object scale - local

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |

#### Returns

`void`

#### Inherited from

ObjWrap.sca

#### Defined in

spark.procedural-animations.objects.ts:941

___

### scale

• `get` **scale**(): `number`

get object scale - local

#### Returns

`number`

#### Inherited from

ObjWrap.scale

#### Defined in

spark.procedural-animations.objects.ts:1015

• `set` **scale**(`n`): `void`

set object scale - local

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`void`

#### Inherited from

ObjWrap.scale

#### Defined in

spark.procedural-animations.objects.ts:1021

___

### solvers

• `get` **solvers**(): [`ISolverIK`](../interfaces/ISolverIK.md)[]

#### Returns

[`ISolverIK`](../interfaces/ISolverIK.md)[]

#### Defined in

spark.procedural-animations.base-character.ts:977

___

### summary

• `get` **summary**(): [`ObjSummary`](ObjSummary.md)

Gets summary

#### Returns

[`ObjSummary`](ObjSummary.md)

#### Inherited from

ObjWrap.summary

#### Defined in

spark.procedural-animations.objects.ts:1054

___

### transform

• `get` **transform**(): `Transform`

Reference to the underlying SceneObjectBase Transform

#### Returns

`Transform`

#### Inherited from

ObjWrap.transform

#### Defined in

spark.procedural-animations.objects.ts:1481

___

### transformWrapper

• `get` **transformWrapper**(): [`TransformWrapper`](TransformWrapper.md)

transform wrapper

#### Returns

[`TransformWrapper`](TransformWrapper.md)

#### Inherited from

ObjWrap.transformWrapper

#### Defined in

spark.procedural-animations.objects.ts:832

___

### treeName

• `get` **treeName**(): `string`

tree name

#### Returns

`string`

#### Inherited from

ObjWrap.treeName

#### Defined in

spark.procedural-animations.objects.ts:857

___

### up

• `get` **up**(): [`V3`](V3.md)

up direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.up

#### Defined in

spark.procedural-animations.objects.ts:802

___

### updaters

• `get` **updaters**(): [`IUpdatable`](../interfaces/IUpdatable.md)[]

#### Returns

[`IUpdatable`](../interfaces/IUpdatable.md)[]

#### Defined in

spark.procedural-animations.base-character.ts:983

___

### v

• `get` **v**(): [`ObjView`](ObjView.md)

alias for object view - used to redefine directions

#### Returns

[`ObjView`](ObjView.md)

#### Inherited from

ObjWrap.v

#### Defined in

spark.procedural-animations.objects.ts:883

___

### view

• `get` **view**(): [`ObjView`](ObjView.md)

object view - used to redefine directions

#### Returns

[`ObjView`](ObjView.md)

#### Inherited from

ObjWrap.view

#### Defined in

spark.procedural-animations.objects.ts:877

___

### worldPos

• `get` **worldPos**(): [`V3`](V3.md)

get world position

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjWrap.worldPos

#### Defined in

spark.procedural-animations.objects.ts:1177

• `set` **worldPos**(`p`): `void`

set world position

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`V3`](V3.md) |

#### Returns

`void`

#### Inherited from

ObjWrap.worldPos

#### Defined in

spark.procedural-animations.objects.ts:1186

___

### worldRot

• `get` **worldRot**(): [`Qt`](Qt.md)

get world rotation - quaternion

#### Returns

[`Qt`](Qt.md)

#### Inherited from

ObjWrap.worldRot

#### Defined in

spark.procedural-animations.objects.ts:1125

• `set` **worldRot**(`q`): `void`

set world rotation - quaternion

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | [`Qt`](Qt.md) |

#### Returns

`void`

#### Inherited from

ObjWrap.worldRot

#### Defined in

spark.procedural-animations.objects.ts:1131

## Methods

### addPos

▸ **addPos**(`p`): [`Object3D`](Object3D.md)

Adds position to current rotation (local space)

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |

#### Returns

[`Object3D`](Object3D.md)

#### Inherited from

[ObjWrap](ObjWrap.md).[addPos](ObjWrap.md#addpos)

#### Defined in

spark.procedural-animations.objects.ts:1268

___

### addRot

▸ **addRot**(`r`): [`Object3D`](Object3D.md)

Adds rotation to current rotation (local space)

#### Parameters

| Name | Type |
| :------ | :------ |
| `r` | [`IQtReadonly`](../interfaces/IQtReadonly.md) |

#### Returns

[`Object3D`](Object3D.md)

#### Inherited from

[ObjWrap](ObjWrap.md).[addRot](ObjWrap.md#addrot)

#### Defined in

spark.procedural-animations.objects.ts:1261

___

### buildExtenderByNameMap

▸ `Protected` **buildExtenderByNameMap**(): `void`

Populates extender by name map

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:1064

___

### cloneViewFrom

▸ **cloneViewFrom**(`obj`): [`Object3D`](Object3D.md)

Clones view from another object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | [`Object3D`](Object3D.md) | another object |

#### Returns

[`Object3D`](Object3D.md)

self reference to the object

#### Inherited from

[ObjWrap](ObjWrap.md).[cloneViewFrom](ObjWrap.md#cloneviewfrom)

#### Defined in

spark.procedural-animations.objects.ts:740

___

### createIkChain

▸ `Protected` **createIkChain**(`ikFactory`, `name`): [`InverseKinematicsChain`](InverseKinematicsChain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ikFactory` | [`IIkFactory`](../interfaces/IIkFactory.md) |
| `name` | `string` |

#### Returns

[`InverseKinematicsChain`](InverseKinematicsChain.md)

#### Defined in

spark.procedural-animations.base-character.ts:1112

___

### createJoints

▸ `Protected` **createJoints**(`resources`): `void`

Creates joints

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resources` | [`IResourcesManager`](../interfaces/IResourcesManager.md) | resources manager |

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:991

___

### dispose

▸ **dispose**(): `void`

Removes object from posters to native

#### Returns

`void`

#### Inherited from

[ObjWrap](ObjWrap.md).[dispose](ObjWrap.md#dispose)

#### Defined in

spark.procedural-animations.objects.ts:753

___

### getIkFactory

▸ `Protected` **getIkFactory**(`factoryExtenderName`, `getDefault`): [`IIkFactory`](../interfaces/IIkFactory.md)

Gets ik factory from provided extenders, if no extender factory found will create the default factory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `factoryExtenderName` | `string` | name of extender factory |
| `getDefault` | [`IFuncOfT`](../interfaces/IFuncOfT.md)<[`IIkFactory`](../interfaces/IIkFactory.md)\> | function that creates default factory |

#### Returns

[`IIkFactory`](../interfaces/IIkFactory.md)

ik factory

#### Defined in

spark.procedural-animations.base-character.ts:1097

___

### getJoint

▸ `Protected` **getJoint**(`name`): [`Object3D`](Object3D.md)

Returns joint by name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | joint name |

#### Returns

[`Object3D`](Object3D.md)

joint

#### Defined in

spark.procedural-animations.base-character.ts:1074

___

### initializeAsync

▸ `Abstract` **initializeAsync**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICharacter](../interfaces/ICharacter.md).[initializeAsync](../interfaces/ICharacter.md#initializeasync)

#### Defined in

spark.procedural-animations.base-character.ts:970

___

### initializeExtendersAsync

▸ `Protected` **initializeExtendersAsync**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

spark.procedural-animations.base-character.ts:1047

___

### lateUpdate

▸ **lateUpdate**(): `void`

On late updarte solve IK chains and invoke special late updaters

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:1120

___

### localToWorldPos

▸ **localToWorldPos**(`localPoint?`, `until?`): [`V3`](V3.md)

Local to world position

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `localPoint?` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | `null` | input local point |
| `until?` | [`Object3D`](Object3D.md) | `null` | until tree node, if not specified go all the way to root node |

#### Returns

[`V3`](V3.md)

world position representation of the input local position

#### Inherited from

[ObjWrap](ObjWrap.md).[localToWorldPos](ObjWrap.md#localtoworldpos)

#### Defined in

spark.procedural-animations.objects.ts:1197

___

### localToWorldRot

▸ **localToWorldRot**(`q?`, `until?`): [`Qt`](Qt.md)

Local to world rotation

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `q` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | `null` | input local rotation |
| `until?` | [`Object3D`](Object3D.md) | `null` | until tree node, if not specified go all the way to root node |

#### Returns

[`Qt`](Qt.md)

world rotation representation of the input local rotation

#### Inherited from

[ObjWrap](ObjWrap.md).[localToWorldRot](ObjWrap.md#localtoworldrot)

#### Defined in

spark.procedural-animations.objects.ts:1166

___

### localToWorldVec

▸ **localToWorldVec**(`localVec`, `until?`): [`V3`](V3.md)

Local to world vector

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `localVec` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | `undefined` | local vector |
| `until?` | [`Object3D`](Object3D.md) | `null` | until tree node, if not specified go all the way to root node |

#### Returns

[`V3`](V3.md)

world vector representation of the input local vector

#### Inherited from

[ObjWrap](ObjWrap.md).[localToWorldVec](ObjWrap.md#localtoworldvec)

#### Defined in

spark.procedural-animations.objects.ts:1217

___

### pivotEnds

▸ **pivotEnds**(`pivot`, `enable?`): [`Object3D`](Object3D.md)

Pivots ends

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pivot` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | `undefined` | pivot point, after movement |
| `enable?` | `boolean` | `true` | if false will do nothing |

#### Returns

[`Object3D`](Object3D.md)

reference to iself

#### Inherited from

[ObjWrap](ObjWrap.md).[pivotEnds](ObjWrap.md#pivotends)

#### Defined in

spark.procedural-animations.objects.ts:1109

___

### pivotStarts

▸ **pivotStarts**(`pivot`, `enable?`): [`Object3D`](Object3D.md)

Pivots starts

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pivot` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | `undefined` | pivot point, before movement |
| `enable?` | `boolean` | `true` | if false will do nothing |

#### Returns

[`Object3D`](Object3D.md)

reference to iself

#### Inherited from

[ObjWrap](ObjWrap.md).[pivotStarts](ObjWrap.md#pivotstarts)

#### Defined in

spark.procedural-animations.objects.ts:1098

___

### postToNative

▸ **postToNative**(): `void`

Posts to native position, rotation, scale

#### Returns

`void`

#### Inherited from

[ObjWrap](ObjWrap.md).[postToNative](ObjWrap.md#posttonative)

#### Defined in

spark.procedural-animations.objects.ts:759

___

### resetIniPos

▸ **resetIniPos**(`p?`): [`Object3D`](Object3D.md)

Resets initial position

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `p?` | [`V3`](V3.md) | `null` | define initial position externally, if not defined will use current |

#### Returns

[`Object3D`](Object3D.md)

reference to iself

#### Inherited from

[ObjWrap](ObjWrap.md).[resetIniPos](ObjWrap.md#resetinipos)

#### Defined in

spark.procedural-animations.objects.ts:1068

___

### resetIniRot

▸ **resetIniRot**(`q?`): [`Object3D`](Object3D.md)

Resets initial rotation

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `q` | [`Qt`](Qt.md) | `null` |

#### Returns

[`Object3D`](Object3D.md)

reference to iself

#### Inherited from

[ObjWrap](ObjWrap.md).[resetIniRot](ObjWrap.md#resetinirot)

#### Defined in

spark.procedural-animations.objects.ts:1078

___

### resetIniSca

▸ **resetIniSca**(`s?`): [`Object3D`](Object3D.md)

Resets initial scale

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `s` | [`V3`](V3.md) | `null` |

#### Returns

[`Object3D`](Object3D.md)

reference to iself

#### Inherited from

[ObjWrap](ObjWrap.md).[resetIniSca](ObjWrap.md#resetinisca)

#### Defined in

spark.procedural-animations.objects.ts:1088

___

### setPos\_

▸ **setPos_**(`func`): [`Object3D`](Object3D.md)

Sets local position by function invocation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`V3`](V3.md)\> | funciton that passes object view and returns vector V3 position |

#### Returns

[`Object3D`](Object3D.md)

reference to iself

#### Inherited from

[ObjWrap](ObjWrap.md).[setPos_](ObjWrap.md#setpos_)

#### Defined in

spark.procedural-animations.objects.ts:1277

___

### setRot\_

▸ **setRot_**(`func`): [`Object3D`](Object3D.md)

Sets local rotation by function invocation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`Qt`](Qt.md)\> | funciton that passes object view and returns quaternion Qt rotation |

#### Returns

[`Object3D`](Object3D.md)

reference to iself

#### Inherited from

[ObjWrap](ObjWrap.md).[setRot_](ObjWrap.md#setrot_)

#### Defined in

spark.procedural-animations.objects.ts:1286

___

### setSca\_

▸ **setSca_**(`func`): [`Object3D`](Object3D.md)

Sets local scale by function invocation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`V3`](V3.md)\> | funciton that passes object view and returns vector V3 scale |

#### Returns

[`Object3D`](Object3D.md)

reference to iself

#### Inherited from

[ObjWrap](ObjWrap.md).[setSca_](ObjWrap.md#setsca_)

#### Defined in

spark.procedural-animations.objects.ts:1295

___

### setView

▸ **setView**(`viewFw`, `viewUp`, `viewLookAt`, `adjustRot`): [`Object3D`](Object3D.md)

Sets view for the object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `viewFw` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | view forward direction |
| `viewUp` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | view up direction |
| `viewLookAt` | [`ILookAtFunc`](../interfaces/ILookAtFunc.md) | view look at function that constructs quaternion rotation based on given's view forward and up directions |
| `adjustRot` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | - |

#### Returns

[`Object3D`](Object3D.md)

self reference to the object

#### Inherited from

[ObjWrap](ObjWrap.md).[setView](ObjWrap.md#setview)

#### Defined in

spark.procedural-animations.objects.ts:726

___

### setWorldPos\_

▸ **setWorldPos_**(`func`): [`Object3D`](Object3D.md)

Sets world position by function invocation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`Object3D`](Object3D.md), [`V3`](V3.md)\> | funciton that passes object view and returns vector V3 position |

#### Returns

[`Object3D`](Object3D.md)

reference to iself

#### Inherited from

[ObjWrap](ObjWrap.md).[setWorldPos_](ObjWrap.md#setworldpos_)

#### Defined in

spark.procedural-animations.objects.ts:1304

___

### setWorldRot\_

▸ **setWorldRot_**(`func`): [`Object3D`](Object3D.md)

Sets world rotation by function invocation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`Object3D`](Object3D.md), [`Qt`](Qt.md)\> | funciton that passes object view and returns quaternion Qt rotation |

#### Returns

[`Object3D`](Object3D.md)

reference to iself

#### Inherited from

[ObjWrap](ObjWrap.md).[setWorldRot_](ObjWrap.md#setworldrot_)

#### Defined in

spark.procedural-animations.objects.ts:1314

___

### updatePosFromReactive

▸ **updatePosFromReactive**(): `void`

Subscribe it to serve as recepient of the changes applied by some other process and update its position

#### Returns

`void`

#### Inherited from

[ObjWrap](ObjWrap.md).[updatePosFromReactive](ObjWrap.md#updateposfromreactive)

#### Defined in

spark.procedural-animations.objects.ts:1487

___

### updateRotFromReactive

▸ **updateRotFromReactive**(): `void`

Subscribe it to serve as recepient of the changes applied by some other process and update its rotation

#### Returns

`void`

#### Inherited from

[ObjWrap](ObjWrap.md).[updateRotFromReactive](ObjWrap.md#updaterotfromreactive)

#### Defined in

spark.procedural-animations.objects.ts:1515

___

### updateScaFromReactive

▸ **updateScaFromReactive**(): `void`

Subscribe it to serve as recepient of the changes applied by some other process and update its scale

#### Returns

`void`

#### Inherited from

[ObjWrap](ObjWrap.md).[updateScaFromReactive](ObjWrap.md#updatescafromreactive)

#### Defined in

spark.procedural-animations.objects.ts:1501

___

### worldToLocalPos

▸ **worldToLocalPos**(`worldPoint?`, `until?`): [`V3`](V3.md)

World to local position

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `worldPoint?` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | `undefined` | input world point |
| `until?` | [`Object3D`](Object3D.md) | `null` | until tree node, if not specified go all the way to root node |

#### Returns

[`V3`](V3.md)

local position representation of the input world position

#### Inherited from

[ObjWrap](ObjWrap.md).[worldToLocalPos](ObjWrap.md#worldtolocalpos)

#### Defined in

spark.procedural-animations.objects.ts:1236

___

### worldToLocalRot

▸ **worldToLocalRot**(`q`, `until?`): [`Qt`](Qt.md)

Worlds to local rotation

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `q` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | `undefined` | input world rotation |
| `until?` | [`Object3D`](Object3D.md) | `null` | until tree node, if not specified go all the way to root node |

#### Returns

[`Qt`](Qt.md)

local rotation representation of the input world rotation

#### Inherited from

[ObjWrap](ObjWrap.md).[worldToLocalRot](ObjWrap.md#worldtolocalrot)

#### Defined in

spark.procedural-animations.objects.ts:1152

___

### findInternalName

▸ `Static` `Protected` **findInternalName**(`path`, `jointsMap`): `string`

Finds internal name - if path is not found will try to extract unique name instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | path to find |
| `jointsMap` | `Object` | joints map taken from ICharacterConfig |

#### Returns

`string`

internal name

#### Defined in

spark.procedural-animations.base-character.ts:1083
