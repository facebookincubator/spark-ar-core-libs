[spark-procedural-animations](../README.md) / [Exports](../modules.md) / Object3D

# Class: Object3D

interface of object with postToNative function

## Hierarchy

- **`Object3D`**

  ↳ [`ObjVirtual`](ObjVirtual.md)

  ↳ [`ObjWrap`](ObjWrap.md)

## Implements

- [`IPosterToNative`](../interfaces/IPosterToNative.md)
- [`IDisposable`](../interfaces/IDisposable.md)
- [`IActuatorApplierHolder`](../interfaces/IActuatorApplierHolder.md)
- [`ITransformData`](../interfaces/ITransformData.md)

## Table of contents

### Constructors

- [constructor](Object3D.md#constructor)

### Properties

- [\_actuator](Object3D.md#_actuator)
- [\_enablePostToNative](Object3D.md#_enableposttonative)
- [\_factor](Object3D.md#_factor)
- [\_iniPos](Object3D.md#_inipos)
- [\_iniPosMagnitude](Object3D.md#_iniposmagnitude)
- [\_iniRot](Object3D.md#_inirot)
- [\_iniSca](Object3D.md#_inisca)
- [\_model](Object3D.md#_model)
- [\_name](Object3D.md#_name)
- [\_parent](Object3D.md#_parent)
- [\_pivotVecIn](Object3D.md#_pivotvecin)
- [\_pos](Object3D.md#_pos)
- [\_rot](Object3D.md#_rot)
- [\_sca](Object3D.md#_sca)
- [\_summary](Object3D.md#_summary)
- [\_transform](Object3D.md#_transform)
- [\_view](Object3D.md#_view)
- [behavior](Object3D.md#behavior)
- [toEulerFunc](Object3D.md#toeulerfunc)

### Accessors

- [a](Object3D.md#a)
- [actuator](Object3D.md#actuator)
- [back](Object3D.md#back)
- [bk](Object3D.md#bk)
- [dn](Object3D.md#dn)
- [down](Object3D.md#down)
- [enablePostToNative](Object3D.md#enableposttonative)
- [factor](Object3D.md#factor)
- [forward](Object3D.md#forward)
- [fw](Object3D.md#fw)
- [identifier](Object3D.md#identifier)
- [iniBk](Object3D.md#inibk)
- [iniDn](Object3D.md#inidn)
- [iniFw](Object3D.md#inifw)
- [iniLt](Object3D.md#inilt)
- [iniPos](Object3D.md#inipos)
- [iniPosAsWorld](Object3D.md#iniposasworld)
- [iniPosFac](Object3D.md#iniposfac)
- [iniPosMagnitude](Object3D.md#iniposmagnitude)
- [iniRot](Object3D.md#inirot)
- [iniRotAsWorld](Object3D.md#inirotasworld)
- [iniRt](Object3D.md#inirt)
- [iniSca](Object3D.md#inisca)
- [iniUp](Object3D.md#iniup)
- [left](Object3D.md#left)
- [lt](Object3D.md#lt)
- [model](Object3D.md#model)
- [name](Object3D.md#name)
- [parent](Object3D.md#parent)
- [pos](Object3D.md#pos)
- [posX](Object3D.md#posx)
- [posY](Object3D.md#posy)
- [posZ](Object3D.md#posz)
- [right](Object3D.md#right)
- [rot](Object3D.md#rot)
- [rt](Object3D.md#rt)
- [sca](Object3D.md#sca)
- [scale](Object3D.md#scale)
- [summary](Object3D.md#summary)
- [transformWrapper](Object3D.md#transformwrapper)
- [treeName](Object3D.md#treename)
- [up](Object3D.md#up)
- [v](Object3D.md#v)
- [view](Object3D.md#view)
- [worldPos](Object3D.md#worldpos)
- [worldRot](Object3D.md#worldrot)

### Methods

- [addPos](Object3D.md#addpos)
- [addRot](Object3D.md#addrot)
- [applyParentWorldToLocalPosRecursive](Object3D.md#applyparentworldtolocalposrecursive)
- [cloneViewFrom](Object3D.md#cloneviewfrom)
- [dispose](Object3D.md#dispose)
- [localToWorldPos](Object3D.md#localtoworldpos)
- [localToWorldRot](Object3D.md#localtoworldrot)
- [localToWorldVec](Object3D.md#localtoworldvec)
- [mulByParentRot](Object3D.md#mulbyparentrot)
- [pivotEnds](Object3D.md#pivotends)
- [pivotStarts](Object3D.md#pivotstarts)
- [postToNative](Object3D.md#posttonative)
- [resetIniPos](Object3D.md#resetinipos)
- [resetIniRot](Object3D.md#resetinirot)
- [resetIniSca](Object3D.md#resetinisca)
- [setPos\_](Object3D.md#setpos_)
- [setRot\_](Object3D.md#setrot_)
- [setSca\_](Object3D.md#setsca_)
- [setView](Object3D.md#setview)
- [setWorldPos\_](Object3D.md#setworldpos_)
- [setWorldRot\_](Object3D.md#setworldrot_)
- [worldToLocalPos](Object3D.md#worldtolocalpos)
- [worldToLocalPosRecursive](Object3D.md#worldtolocalposrecursive)
- [worldToLocalRot](Object3D.md#worldtolocalrot)

## Constructors

### constructor

• **new Object3D**(`name`, `summary`, `initialize`, `model?`, `toEulerFunc?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `summary` | [`ObjSummary`](ObjSummary.md) | `undefined` |
| `initialize` | [`IActionOf4T`](../interfaces/IActionOf4T.md)<[`TransformWrapper`](TransformWrapper.md), [`V3`](V3.md), [`Qt`](Qt.md), [`V3`](V3.md)\> | `undefined` |
| `model` | [`Object3D`](Object3D.md) | `null` |
| `toEulerFunc` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`Qt`](Qt.md), [`V3`](V3.md)\> | `null` |

#### Defined in

spark.procedural-animations.objects.ts:706

## Properties

### \_actuator

• `Private` **\_actuator**: [`Actuator`](Actuator.md)

#### Defined in

spark.procedural-animations.objects.ts:702

___

### \_enablePostToNative

• `Protected` **\_enablePostToNative**: `boolean`

#### Defined in

spark.procedural-animations.objects.ts:701

___

### \_factor

• `Protected` **\_factor**: `number`

#### Defined in

spark.procedural-animations.objects.ts:700

___

### \_iniPos

• `Protected` **\_iniPos**: [`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:694

___

### \_iniPosMagnitude

• `Protected` **\_iniPosMagnitude**: `number`

#### Defined in

spark.procedural-animations.objects.ts:696

___

### \_iniRot

• `Protected` **\_iniRot**: [`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.objects.ts:693

___

### \_iniSca

• `Protected` **\_iniSca**: [`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:695

___

### \_model

• `Private` `Readonly` **\_model**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.objects.ts:689

___

### \_name

• `Private` `Readonly` **\_name**: `string`

#### Defined in

spark.procedural-animations.objects.ts:688

___

### \_parent

• `Private` **\_parent**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.objects.ts:691

___

### \_pivotVecIn

• `Private` **\_pivotVecIn**: [`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:704

___

### \_pos

• `Protected` **\_pos**: [`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:698

___

### \_rot

• `Protected` **\_rot**: [`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.objects.ts:697

___

### \_sca

• `Protected` **\_sca**: [`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:699

___

### \_summary

• `Private` **\_summary**: [`ObjSummary`](ObjSummary.md)

#### Defined in

spark.procedural-animations.objects.ts:692

___

### \_transform

• `Private` `Readonly` **\_transform**: [`TransformWrapper`](TransformWrapper.md)

#### Defined in

spark.procedural-animations.objects.ts:690

___

### \_view

• `Private` **\_view**: [`ObjView`](ObjView.md)

#### Defined in

spark.procedural-animations.objects.ts:703

___

### behavior

• **behavior**: [`Behavior`](Behavior.md)

#### Defined in

spark.procedural-animations.objects.ts:705

___

### toEulerFunc

• **toEulerFunc**: [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`Qt`](Qt.md), [`V3`](V3.md)\> = `null`

#### Defined in

spark.procedural-animations.objects.ts:711

## Accessors

### a

• `get` **a**(): [`Actuator`](Actuator.md)

actuator alias

#### Returns

[`Actuator`](Actuator.md)

#### Implementation of

IActuatorApplierHolder.a

#### Defined in

spark.procedural-animations.objects.ts:906

___

### actuator

• `get` **actuator**(): [`Actuator`](Actuator.md)

actuator

#### Returns

[`Actuator`](Actuator.md)

#### Implementation of

IActuatorApplierHolder.actuator

#### Defined in

spark.procedural-animations.objects.ts:899

___

### back

• `get` **back**(): [`V3`](V3.md)

back direction based on view

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:851

___

### bk

• `get` **bk**(): [`V3`](V3.md)

back direction based on view

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:845

___

### dn

• `get` **dn**(): [`V3`](V3.md)

down direction based on view

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:857

___

### down

• `get` **down**(): [`V3`](V3.md)

down direction based on view

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:863

___

### enablePostToNative

• `get` **enablePostToNative**(): `boolean`

Gets enable post to native flag

#### Returns

`boolean`

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

#### Defined in

spark.procedural-animations.objects.ts:1097

___

### factor

• `get` **factor**(): `number`

get numeric factor used to normalize actuator commands, for example to define numbers as relative to character height

#### Returns

`number`

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

#### Defined in

spark.procedural-animations.objects.ts:930

___

### forward

• `get` **forward**(): [`V3`](V3.md)

forward direction based on view

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:833

___

### fw

• `get` **fw**(): [`V3`](V3.md)

forward direction based on view

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:827

___

### identifier

• `get` **identifier**(): `string`

string identifier

#### Returns

`string`

#### Implementation of

IPosterToNative.identifier

#### Defined in

spark.procedural-animations.objects.ts:821

___

### iniBk

• `get` **iniBk**(): [`V3`](V3.md)

initial back direction

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:1040

___

### iniDn

• `get` **iniDn**(): [`V3`](V3.md)

initial down direction

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:1052

___

### iniFw

• `get` **iniFw**(): [`V3`](V3.md)

initial forward direction

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:1034

___

### iniLt

• `get` **iniLt**(): [`V3`](V3.md)

initial left direction

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:1064

___

### iniPos

• `get` **iniPos**(): [`V3`](V3.md)

initial position

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:1016

___

### iniPosAsWorld

• `get` **iniPosAsWorld**(): [`V3`](V3.md)

initial position in worlds space

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:1199

___

### iniPosFac

• `get` **iniPosFac**(): [`V3`](V3.md)

initial position divided by the factor

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:1022

___

### iniPosMagnitude

• `get` **iniPosMagnitude**(): `number`

magnitude of the initial position

#### Returns

`number`

#### Defined in

spark.procedural-animations.objects.ts:1070

___

### iniRot

• `get` **iniRot**(): [`Qt`](Qt.md)

initial rotation quaternion

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.objects.ts:1010

___

### iniRotAsWorld

• `get` **iniRotAsWorld**(): [`Qt`](Qt.md)

initial rotation in worlds space

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.objects.ts:1205

___

### iniRt

• `get` **iniRt**(): [`V3`](V3.md)

initial right direction

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:1058

___

### iniSca

• `get` **iniSca**(): [`V3`](V3.md)

initial scale

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:1028

___

### iniUp

• `get` **iniUp**(): [`V3`](V3.md)

initial up direction

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:1046

___

### left

• `get` **left**(): [`V3`](V3.md)

left direction based on view

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:875

___

### lt

• `get` **lt**(): [`V3`](V3.md)

left direction based on view

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:869

___

### model

• `get` **model**(): [`Object3D`](Object3D.md)

Gets model reference (optional)

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.objects.ts:1121

___

### name

• `get` **name**(): `string`

name

#### Returns

`string`

#### Defined in

spark.procedural-animations.objects.ts:912

___

### parent

• `get` **parent**(): [`Object3D`](Object3D.md)

get parent object

#### Returns

[`Object3D`](Object3D.md)

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

#### Defined in

spark.procedural-animations.objects.ts:1109

___

### pos

• `get` **pos**(): [`V3`](V3.md)

get object position - local

#### Returns

[`V3`](V3.md)

#### Implementation of

ITransformData.pos

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

#### Implementation of

ITransformData.pos

#### Defined in

spark.procedural-animations.objects.ts:974

___

### posX

• `get` **posX**(): `number`

get position x

#### Returns

`number`

#### Defined in

spark.procedural-animations.objects.ts:956

___

### posY

• `get` **posY**(): `number`

get position y

#### Returns

`number`

#### Defined in

spark.procedural-animations.objects.ts:962

___

### posZ

• `get` **posZ**(): `number`

get position z

#### Returns

`number`

#### Defined in

spark.procedural-animations.objects.ts:968

___

### right

• `get` **right**(): [`V3`](V3.md)

right direction based on view

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:887

___

### rot

• `get` **rot**(): [`Qt`](Qt.md)

get object rotation as quatenion - local

#### Returns

[`Qt`](Qt.md)

#### Implementation of

ITransformData.rot

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

#### Implementation of

ITransformData.rot

#### Defined in

spark.procedural-animations.objects.ts:988

___

### rt

• `get` **rt**(): [`V3`](V3.md)

right direction based on view

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:881

___

### sca

• `get` **sca**(): [`V3`](V3.md)

get object scale - local

#### Returns

[`V3`](V3.md)

#### Implementation of

ITransformData.sca

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

#### Implementation of

ITransformData.sca

#### Defined in

spark.procedural-animations.objects.ts:1002

___

### scale

• `get` **scale**(): `number`

get object scale - local

#### Returns

`number`

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

#### Defined in

spark.procedural-animations.objects.ts:1082

___

### summary

• `get` **summary**(): [`ObjSummary`](ObjSummary.md)

Gets summary

#### Returns

[`ObjSummary`](ObjSummary.md)

#### Defined in

spark.procedural-animations.objects.ts:1115

___

### transformWrapper

• `get` **transformWrapper**(): [`TransformWrapper`](TransformWrapper.md)

transform wrapper

#### Returns

[`TransformWrapper`](TransformWrapper.md)

#### Defined in

spark.procedural-animations.objects.ts:893

___

### treeName

• `get` **treeName**(): `string`

tree name

#### Returns

`string`

#### Defined in

spark.procedural-animations.objects.ts:918

___

### up

• `get` **up**(): [`V3`](V3.md)

up direction based on view

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:839

___

### v

• `get` **v**(): [`ObjView`](ObjView.md)

alias for object view - used to redefine directions

#### Returns

[`ObjView`](ObjView.md)

#### Defined in

spark.procedural-animations.objects.ts:944

___

### view

• `get` **view**(): [`ObjView`](ObjView.md)

object view - used to redefine directions

#### Returns

[`ObjView`](ObjView.md)

#### Defined in

spark.procedural-animations.objects.ts:938

___

### worldPos

• `get` **worldPos**(): [`V3`](V3.md)

get world position

#### Returns

[`V3`](V3.md)

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

#### Defined in

spark.procedural-animations.objects.ts:1248

___

### worldRot

• `get` **worldRot**(): [`Qt`](Qt.md)

get world rotation - quaternion

#### Returns

[`Qt`](Qt.md)

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

#### Defined in

spark.procedural-animations.objects.ts:1323

___

### applyParentWorldToLocalPosRecursive

▸ `Private` **applyParentWorldToLocalPosRecursive**(`point`, `node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`V3`](V3.md) |
| `node` | [`Object3D`](Object3D.md) |

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:1313

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

#### Defined in

spark.procedural-animations.objects.ts:771

___

### dispose

▸ **dispose**(): `void`

Removes object from posters to native

#### Returns

`void`

#### Implementation of

[IDisposable](../interfaces/IDisposable.md).[dispose](../interfaces/IDisposable.md#dispose)

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

#### Defined in

spark.procedural-animations.objects.ts:1279

___

### mulByParentRot

▸ `Private` **mulByParentRot**(`curr`, `until?`): [`Qt`](Qt.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `curr` | [`Object3D`](Object3D.md) | `undefined` |
| `until` | [`Object3D`](Object3D.md) | `null` |

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.objects.ts:1380

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

#### Defined in

spark.procedural-animations.objects.ts:1159

___

### postToNative

▸ **postToNative**(): `void`

Posts to native position, rotation, scale

#### Returns

`void`

#### Implementation of

[IPosterToNative](../interfaces/IPosterToNative.md).[postToNative](../interfaces/IPosterToNative.md#posttonative)

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

#### Defined in

spark.procedural-animations.objects.ts:1376

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

#### Defined in

spark.procedural-animations.objects.ts:1298

___

### worldToLocalPosRecursive

▸ `Private` **worldToLocalPosRecursive**(`point`, `curr`, `until?`): [`Object3D`](Object3D.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `point` | [`V3`](V3.md) | `undefined` |
| `curr` | [`Object3D`](Object3D.md) | `undefined` |
| `until` | [`Object3D`](Object3D.md) | `null` |

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.objects.ts:1304

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

#### Defined in

spark.procedural-animations.objects.ts:1214
