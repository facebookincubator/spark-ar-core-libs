[spark-procedural-animations](../README.md) / [Exports](../modules.md) / ObjWrap

# Class: ObjWrap

Object wrap - wrapper around SceneObjectBase extending Object3D

## Hierarchy

- [`Object3D`](Object3D.md)

  ↳ **`ObjWrap`**

  ↳↳ [`BaseCharacter`](BaseCharacter.md)

## Table of contents

### Constructors

- [constructor](ObjWrap.md#constructor)

### Properties

- [\_enablePostToNative](ObjWrap.md#_enableposttonative)
- [\_factor](ObjWrap.md#_factor)
- [\_iniPos](ObjWrap.md#_inipos)
- [\_iniPosMagnitude](ObjWrap.md#_iniposmagnitude)
- [\_iniRot](ObjWrap.md#_inirot)
- [\_iniSca](ObjWrap.md#_inisca)
- [\_obj](ObjWrap.md#_obj)
- [\_pos](ObjWrap.md#_pos)
- [\_rot](ObjWrap.md#_rot)
- [\_sca](ObjWrap.md#_sca)
- [behavior](ObjWrap.md#behavior)
- [toEulerFunc](ObjWrap.md#toeulerfunc)

### Accessors

- [a](ObjWrap.md#a)
- [actuator](ObjWrap.md#actuator)
- [back](ObjWrap.md#back)
- [bk](ObjWrap.md#bk)
- [dn](ObjWrap.md#dn)
- [down](ObjWrap.md#down)
- [enablePostToNative](ObjWrap.md#enableposttonative)
- [factor](ObjWrap.md#factor)
- [forward](ObjWrap.md#forward)
- [fw](ObjWrap.md#fw)
- [identifier](ObjWrap.md#identifier)
- [iniBk](ObjWrap.md#inibk)
- [iniDn](ObjWrap.md#inidn)
- [iniFw](ObjWrap.md#inifw)
- [iniLt](ObjWrap.md#inilt)
- [iniPos](ObjWrap.md#inipos)
- [iniPosAsWorld](ObjWrap.md#iniposasworld)
- [iniPosFac](ObjWrap.md#iniposfac)
- [iniPosMagnitude](ObjWrap.md#iniposmagnitude)
- [iniRot](ObjWrap.md#inirot)
- [iniRotAsWorld](ObjWrap.md#inirotasworld)
- [iniRt](ObjWrap.md#inirt)
- [iniSca](ObjWrap.md#inisca)
- [iniUp](ObjWrap.md#iniup)
- [left](ObjWrap.md#left)
- [lt](ObjWrap.md#lt)
- [model](ObjWrap.md#model)
- [name](ObjWrap.md#name)
- [obj](ObjWrap.md#obj)
- [parent](ObjWrap.md#parent)
- [pos](ObjWrap.md#pos)
- [posX](ObjWrap.md#posx)
- [posY](ObjWrap.md#posy)
- [posZ](ObjWrap.md#posz)
- [right](ObjWrap.md#right)
- [rot](ObjWrap.md#rot)
- [rt](ObjWrap.md#rt)
- [sca](ObjWrap.md#sca)
- [scale](ObjWrap.md#scale)
- [summary](ObjWrap.md#summary)
- [transform](ObjWrap.md#transform)
- [transformWrapper](ObjWrap.md#transformwrapper)
- [treeName](ObjWrap.md#treename)
- [up](ObjWrap.md#up)
- [v](ObjWrap.md#v)
- [view](ObjWrap.md#view)
- [worldPos](ObjWrap.md#worldpos)
- [worldRot](ObjWrap.md#worldrot)

### Methods

- [addPos](ObjWrap.md#addpos)
- [addRot](ObjWrap.md#addrot)
- [cloneViewFrom](ObjWrap.md#cloneviewfrom)
- [dispose](ObjWrap.md#dispose)
- [localToWorldPos](ObjWrap.md#localtoworldpos)
- [localToWorldRot](ObjWrap.md#localtoworldrot)
- [localToWorldVec](ObjWrap.md#localtoworldvec)
- [pivotEnds](ObjWrap.md#pivotends)
- [pivotStarts](ObjWrap.md#pivotstarts)
- [postToNative](ObjWrap.md#posttonative)
- [resetIniPos](ObjWrap.md#resetinipos)
- [resetIniRot](ObjWrap.md#resetinirot)
- [resetIniSca](ObjWrap.md#resetinisca)
- [setPos\_](ObjWrap.md#setpos_)
- [setRot\_](ObjWrap.md#setrot_)
- [setSca\_](ObjWrap.md#setsca_)
- [setView](ObjWrap.md#setview)
- [setWorldPos\_](ObjWrap.md#setworldpos_)
- [setWorldRot\_](ObjWrap.md#setworldrot_)
- [updatePosFromReactive](ObjWrap.md#updateposfromreactive)
- [updateRotFromReactive](ObjWrap.md#updaterotfromreactive)
- [updateScaFromReactive](ObjWrap.md#updatescafromreactive)
- [worldToLocalPos](ObjWrap.md#worldtolocalpos)
- [worldToLocalRot](ObjWrap.md#worldtolocalrot)

## Constructors

### constructor

• **new ObjWrap**(`boneName`, `summary`, `model?`, `toEulerFunc?`)

Creates an instance of object wrap

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `boneName` | `string` | `undefined` | name of the joint |
| `summary` | [`ObjSummary`](ObjSummary.md) | `undefined` | object summary |
| `model?` | [`Object3D`](Object3D.md) | `null` | optional model reference |
| `toEulerFunc?` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`Qt`](Qt.md), [`V3`](V3.md)\> | `null` | optional custom function to convert quaternion to euler angle, if not specified, default will be used |

#### Overrides

[Object3D](Object3D.md).[constructor](Object3D.md#constructor)

#### Defined in

spark.procedural-animations.objects.ts:1476

## Properties

### \_enablePostToNative

• `Protected` **\_enablePostToNative**: `boolean`

#### Inherited from

[Object3D](Object3D.md).[_enablePostToNative](Object3D.md#_enableposttonative)

#### Defined in

spark.procedural-animations.objects.ts:701

___

### \_factor

• `Protected` **\_factor**: `number`

#### Inherited from

[Object3D](Object3D.md).[_factor](Object3D.md#_factor)

#### Defined in

spark.procedural-animations.objects.ts:700

___

### \_iniPos

• `Protected` **\_iniPos**: [`V3`](V3.md)

#### Inherited from

[Object3D](Object3D.md).[_iniPos](Object3D.md#_inipos)

#### Defined in

spark.procedural-animations.objects.ts:694

___

### \_iniPosMagnitude

• `Protected` **\_iniPosMagnitude**: `number`

#### Inherited from

[Object3D](Object3D.md).[_iniPosMagnitude](Object3D.md#_iniposmagnitude)

#### Defined in

spark.procedural-animations.objects.ts:696

___

### \_iniRot

• `Protected` **\_iniRot**: [`Qt`](Qt.md)

#### Inherited from

[Object3D](Object3D.md).[_iniRot](Object3D.md#_inirot)

#### Defined in

spark.procedural-animations.objects.ts:693

___

### \_iniSca

• `Protected` **\_iniSca**: [`V3`](V3.md)

#### Inherited from

[Object3D](Object3D.md).[_iniSca](Object3D.md#_inisca)

#### Defined in

spark.procedural-animations.objects.ts:695

___

### \_obj

• `Private` `Readonly` **\_obj**: `SceneObjectBase`

#### Defined in

spark.procedural-animations.objects.ts:1468

___

### \_pos

• `Protected` **\_pos**: [`V3`](V3.md)

#### Inherited from

[Object3D](Object3D.md).[_pos](Object3D.md#_pos)

#### Defined in

spark.procedural-animations.objects.ts:698

___

### \_rot

• `Protected` **\_rot**: [`Qt`](Qt.md)

#### Inherited from

[Object3D](Object3D.md).[_rot](Object3D.md#_rot)

#### Defined in

spark.procedural-animations.objects.ts:697

___

### \_sca

• `Protected` **\_sca**: [`V3`](V3.md)

#### Inherited from

[Object3D](Object3D.md).[_sca](Object3D.md#_sca)

#### Defined in

spark.procedural-animations.objects.ts:699

___

### behavior

• **behavior**: [`Behavior`](Behavior.md)

#### Inherited from

[Object3D](Object3D.md).[behavior](Object3D.md#behavior)

#### Defined in

spark.procedural-animations.objects.ts:705

___

### toEulerFunc

• **toEulerFunc**: [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`Qt`](Qt.md), [`V3`](V3.md)\> = `null`

#### Inherited from

[Object3D](Object3D.md).[toEulerFunc](Object3D.md#toeulerfunc)

#### Defined in

spark.procedural-animations.objects.ts:711

## Accessors

### a

• `get` **a**(): [`Actuator`](Actuator.md)

actuator alias

#### Returns

[`Actuator`](Actuator.md)

#### Inherited from

Object3D.a

#### Defined in

spark.procedural-animations.objects.ts:906

___

### actuator

• `get` **actuator**(): [`Actuator`](Actuator.md)

actuator

#### Returns

[`Actuator`](Actuator.md)

#### Inherited from

Object3D.actuator

#### Defined in

spark.procedural-animations.objects.ts:899

___

### back

• `get` **back**(): [`V3`](V3.md)

back direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.back

#### Defined in

spark.procedural-animations.objects.ts:851

___

### bk

• `get` **bk**(): [`V3`](V3.md)

back direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.bk

#### Defined in

spark.procedural-animations.objects.ts:845

___

### dn

• `get` **dn**(): [`V3`](V3.md)

down direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.dn

#### Defined in

spark.procedural-animations.objects.ts:857

___

### down

• `get` **down**(): [`V3`](V3.md)

down direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.down

#### Defined in

spark.procedural-animations.objects.ts:863

___

### enablePostToNative

• `get` **enablePostToNative**(): `boolean`

Gets enable post to native flag

#### Returns

`boolean`

#### Inherited from

Object3D.enablePostToNative

#### Defined in

spark.procedural-animations.objects.ts:1091

• `set` **enablePostToNative**(`b`): `void`

Sets enable post to native flag

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `boolean` |

#### Returns

`void`

#### Inherited from

Object3D.enablePostToNative

#### Defined in

spark.procedural-animations.objects.ts:1097

___

### factor

• `get` **factor**(): `number`

get numeric factor used to normalize actuator commands, for example to define numbers as relative to character height

#### Returns

`number`

#### Inherited from

Object3D.factor

#### Defined in

spark.procedural-animations.objects.ts:924

• `set` **factor**(`f`): `void`

set numeric factor used to normalize actuator commands, for example to define numbers as relative to character height

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `number` |

#### Returns

`void`

#### Inherited from

Object3D.factor

#### Defined in

spark.procedural-animations.objects.ts:930

___

### forward

• `get` **forward**(): [`V3`](V3.md)

forward direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.forward

#### Defined in

spark.procedural-animations.objects.ts:833

___

### fw

• `get` **fw**(): [`V3`](V3.md)

forward direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.fw

#### Defined in

spark.procedural-animations.objects.ts:827

___

### identifier

• `get` **identifier**(): `string`

string identifier

#### Returns

`string`

#### Inherited from

Object3D.identifier

#### Defined in

spark.procedural-animations.objects.ts:821

___

### iniBk

• `get` **iniBk**(): [`V3`](V3.md)

initial back direction

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.iniBk

#### Defined in

spark.procedural-animations.objects.ts:1040

___

### iniDn

• `get` **iniDn**(): [`V3`](V3.md)

initial down direction

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.iniDn

#### Defined in

spark.procedural-animations.objects.ts:1052

___

### iniFw

• `get` **iniFw**(): [`V3`](V3.md)

initial forward direction

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.iniFw

#### Defined in

spark.procedural-animations.objects.ts:1034

___

### iniLt

• `get` **iniLt**(): [`V3`](V3.md)

initial left direction

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.iniLt

#### Defined in

spark.procedural-animations.objects.ts:1064

___

### iniPos

• `get` **iniPos**(): [`V3`](V3.md)

initial position

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.iniPos

#### Defined in

spark.procedural-animations.objects.ts:1016

___

### iniPosAsWorld

• `get` **iniPosAsWorld**(): [`V3`](V3.md)

initial position in worlds space

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.iniPosAsWorld

#### Defined in

spark.procedural-animations.objects.ts:1199

___

### iniPosFac

• `get` **iniPosFac**(): [`V3`](V3.md)

initial position divided by the factor

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.iniPosFac

#### Defined in

spark.procedural-animations.objects.ts:1022

___

### iniPosMagnitude

• `get` **iniPosMagnitude**(): `number`

magnitude of the initial position

#### Returns

`number`

#### Inherited from

Object3D.iniPosMagnitude

#### Defined in

spark.procedural-animations.objects.ts:1070

___

### iniRot

• `get` **iniRot**(): [`Qt`](Qt.md)

initial rotation quaternion

#### Returns

[`Qt`](Qt.md)

#### Inherited from

Object3D.iniRot

#### Defined in

spark.procedural-animations.objects.ts:1010

___

### iniRotAsWorld

• `get` **iniRotAsWorld**(): [`Qt`](Qt.md)

initial rotation in worlds space

#### Returns

[`Qt`](Qt.md)

#### Inherited from

Object3D.iniRotAsWorld

#### Defined in

spark.procedural-animations.objects.ts:1205

___

### iniRt

• `get` **iniRt**(): [`V3`](V3.md)

initial right direction

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.iniRt

#### Defined in

spark.procedural-animations.objects.ts:1058

___

### iniSca

• `get` **iniSca**(): [`V3`](V3.md)

initial scale

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.iniSca

#### Defined in

spark.procedural-animations.objects.ts:1028

___

### iniUp

• `get` **iniUp**(): [`V3`](V3.md)

initial up direction

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.iniUp

#### Defined in

spark.procedural-animations.objects.ts:1046

___

### left

• `get` **left**(): [`V3`](V3.md)

left direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.left

#### Defined in

spark.procedural-animations.objects.ts:875

___

### lt

• `get` **lt**(): [`V3`](V3.md)

left direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.lt

#### Defined in

spark.procedural-animations.objects.ts:869

___

### model

• `get` **model**(): [`Object3D`](Object3D.md)

Gets model reference (optional)

#### Returns

[`Object3D`](Object3D.md)

#### Inherited from

Object3D.model

#### Defined in

spark.procedural-animations.objects.ts:1121

___

### name

• `get` **name**(): `string`

name

#### Returns

`string`

#### Inherited from

Object3D.name

#### Defined in

spark.procedural-animations.objects.ts:912

___

### obj

• `get` **obj**(): `SceneObjectBase`

Reference to the underlying SceneObjectBase

#### Returns

`SceneObjectBase`

#### Defined in

spark.procedural-animations.objects.ts:1536

___

### parent

• `get` **parent**(): [`Object3D`](Object3D.md)

get parent object

#### Returns

[`Object3D`](Object3D.md)

#### Inherited from

Object3D.parent

#### Defined in

spark.procedural-animations.objects.ts:1103

• `set` **parent**(`p`): `void`

set parent object

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`Object3D`](Object3D.md) |

#### Returns

`void`

#### Inherited from

Object3D.parent

#### Defined in

spark.procedural-animations.objects.ts:1109

___

### pos

• `get` **pos**(): [`V3`](V3.md)

get object position - local

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.pos

#### Defined in

spark.procedural-animations.objects.ts:950

• `set` **pos**(`p`): `void`

set object position - local

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |

#### Returns

`void`

#### Inherited from

Object3D.pos

#### Defined in

spark.procedural-animations.objects.ts:974

___

### posX

• `get` **posX**(): `number`

get position x

#### Returns

`number`

#### Inherited from

Object3D.posX

#### Defined in

spark.procedural-animations.objects.ts:956

___

### posY

• `get` **posY**(): `number`

get position y

#### Returns

`number`

#### Inherited from

Object3D.posY

#### Defined in

spark.procedural-animations.objects.ts:962

___

### posZ

• `get` **posZ**(): `number`

get position z

#### Returns

`number`

#### Inherited from

Object3D.posZ

#### Defined in

spark.procedural-animations.objects.ts:968

___

### right

• `get` **right**(): [`V3`](V3.md)

right direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.right

#### Defined in

spark.procedural-animations.objects.ts:887

___

### rot

• `get` **rot**(): [`Qt`](Qt.md)

get object rotation as quatenion - local

#### Returns

[`Qt`](Qt.md)

#### Inherited from

Object3D.rot

#### Defined in

spark.procedural-animations.objects.ts:982

• `set` **rot**(`q`): `void`

set object rotation as quatenion - local

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | [`IQtReadonly`](../interfaces/IQtReadonly.md) |

#### Returns

`void`

#### Inherited from

Object3D.rot

#### Defined in

spark.procedural-animations.objects.ts:988

___

### rt

• `get` **rt**(): [`V3`](V3.md)

right direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.rt

#### Defined in

spark.procedural-animations.objects.ts:881

___

### sca

• `get` **sca**(): [`V3`](V3.md)

get object scale - local

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.sca

#### Defined in

spark.procedural-animations.objects.ts:996

• `set` **sca**(`s`): `void`

set object scale - local

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |

#### Returns

`void`

#### Inherited from

Object3D.sca

#### Defined in

spark.procedural-animations.objects.ts:1002

___

### scale

• `get` **scale**(): `number`

get object scale - local

#### Returns

`number`

#### Inherited from

Object3D.scale

#### Defined in

spark.procedural-animations.objects.ts:1076

• `set` **scale**(`n`): `void`

set object scale - local

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`void`

#### Inherited from

Object3D.scale

#### Defined in

spark.procedural-animations.objects.ts:1082

___

### summary

• `get` **summary**(): [`ObjSummary`](ObjSummary.md)

Gets summary

#### Returns

[`ObjSummary`](ObjSummary.md)

#### Inherited from

Object3D.summary

#### Defined in

spark.procedural-animations.objects.ts:1115

___

### transform

• `get` **transform**(): `Transform`

Reference to the underlying SceneObjectBase Transform

#### Returns

`Transform`

#### Defined in

spark.procedural-animations.objects.ts:1542

___

### transformWrapper

• `get` **transformWrapper**(): [`TransformWrapper`](TransformWrapper.md)

transform wrapper

#### Returns

[`TransformWrapper`](TransformWrapper.md)

#### Inherited from

Object3D.transformWrapper

#### Defined in

spark.procedural-animations.objects.ts:893

___

### treeName

• `get` **treeName**(): `string`

tree name

#### Returns

`string`

#### Inherited from

Object3D.treeName

#### Defined in

spark.procedural-animations.objects.ts:918

___

### up

• `get` **up**(): [`V3`](V3.md)

up direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.up

#### Defined in

spark.procedural-animations.objects.ts:839

___

### v

• `get` **v**(): [`ObjView`](ObjView.md)

alias for object view - used to redefine directions

#### Returns

[`ObjView`](ObjView.md)

#### Inherited from

Object3D.v

#### Defined in

spark.procedural-animations.objects.ts:944

___

### view

• `get` **view**(): [`ObjView`](ObjView.md)

object view - used to redefine directions

#### Returns

[`ObjView`](ObjView.md)

#### Inherited from

Object3D.view

#### Defined in

spark.procedural-animations.objects.ts:938

___

### worldPos

• `get` **worldPos**(): [`V3`](V3.md)

get world position

#### Returns

[`V3`](V3.md)

#### Inherited from

Object3D.worldPos

#### Defined in

spark.procedural-animations.objects.ts:1239

• `set` **worldPos**(`p`): `void`

set world position

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`V3`](V3.md) |

#### Returns

`void`

#### Inherited from

Object3D.worldPos

#### Defined in

spark.procedural-animations.objects.ts:1248

___

### worldRot

• `get` **worldRot**(): [`Qt`](Qt.md)

get world rotation - quaternion

#### Returns

[`Qt`](Qt.md)

#### Inherited from

Object3D.worldRot

#### Defined in

spark.procedural-animations.objects.ts:1187

• `set` **worldRot**(`q`): `void`

set world rotation - quaternion

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | [`Qt`](Qt.md) |

#### Returns

`void`

#### Inherited from

Object3D.worldRot

#### Defined in

spark.procedural-animations.objects.ts:1193

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

[Object3D](Object3D.md).[addPos](Object3D.md#addpos)

#### Defined in

spark.procedural-animations.objects.ts:1330

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

[Object3D](Object3D.md).[addRot](Object3D.md#addrot)

#### Defined in

spark.procedural-animations.objects.ts:1323

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

[Object3D](Object3D.md).[cloneViewFrom](Object3D.md#cloneviewfrom)

#### Defined in

spark.procedural-animations.objects.ts:771

___

### dispose

▸ **dispose**(): `void`

Removes object from posters to native

#### Returns

`void`

#### Inherited from

[Object3D](Object3D.md).[dispose](Object3D.md#dispose)

#### Defined in

spark.procedural-animations.objects.ts:784

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

[Object3D](Object3D.md).[localToWorldPos](Object3D.md#localtoworldpos)

#### Defined in

spark.procedural-animations.objects.ts:1259

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

[Object3D](Object3D.md).[localToWorldRot](Object3D.md#localtoworldrot)

#### Defined in

spark.procedural-animations.objects.ts:1228

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

[Object3D](Object3D.md).[localToWorldVec](Object3D.md#localtoworldvec)

#### Defined in

spark.procedural-animations.objects.ts:1279

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

[Object3D](Object3D.md).[pivotEnds](Object3D.md#pivotends)

#### Defined in

spark.procedural-animations.objects.ts:1170

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

[Object3D](Object3D.md).[pivotStarts](Object3D.md#pivotstarts)

#### Defined in

spark.procedural-animations.objects.ts:1159

___

### postToNative

▸ **postToNative**(): `void`

Posts to native position, rotation, scale

#### Returns

`void`

#### Inherited from

[Object3D](Object3D.md).[postToNative](Object3D.md#posttonative)

#### Defined in

spark.procedural-animations.objects.ts:790

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

[Object3D](Object3D.md).[resetIniPos](Object3D.md#resetinipos)

#### Defined in

spark.procedural-animations.objects.ts:1129

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

[Object3D](Object3D.md).[resetIniRot](Object3D.md#resetinirot)

#### Defined in

spark.procedural-animations.objects.ts:1139

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

[Object3D](Object3D.md).[resetIniSca](Object3D.md#resetinisca)

#### Defined in

spark.procedural-animations.objects.ts:1149

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

[Object3D](Object3D.md).[setPos_](Object3D.md#setpos_)

#### Defined in

spark.procedural-animations.objects.ts:1339

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

[Object3D](Object3D.md).[setRot_](Object3D.md#setrot_)

#### Defined in

spark.procedural-animations.objects.ts:1348

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

[Object3D](Object3D.md).[setSca_](Object3D.md#setsca_)

#### Defined in

spark.procedural-animations.objects.ts:1357

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

[Object3D](Object3D.md).[setView](Object3D.md#setview)

#### Defined in

spark.procedural-animations.objects.ts:757

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

[Object3D](Object3D.md).[setWorldPos_](Object3D.md#setworldpos_)

#### Defined in

spark.procedural-animations.objects.ts:1366

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

[Object3D](Object3D.md).[setWorldRot_](Object3D.md#setworldrot_)

#### Defined in

spark.procedural-animations.objects.ts:1376

___

### updatePosFromReactive

▸ **updatePosFromReactive**(): `void`

Subscribe it to serve as recepient of the changes applied by some other process and update its position

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:1548

___

### updateRotFromReactive

▸ **updateRotFromReactive**(): `void`

Subscribe it to serve as recepient of the changes applied by some other process and update its rotation

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:1576

___

### updateScaFromReactive

▸ **updateScaFromReactive**(): `void`

Subscribe it to serve as recepient of the changes applied by some other process and update its scale

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:1562

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

[Object3D](Object3D.md).[worldToLocalPos](Object3D.md#worldtolocalpos)

#### Defined in

spark.procedural-animations.objects.ts:1298

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

[Object3D](Object3D.md).[worldToLocalRot](Object3D.md#worldtolocalrot)

#### Defined in

spark.procedural-animations.objects.ts:1214
