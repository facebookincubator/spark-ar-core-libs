[spark-procedural-animations](../README.md) / [Exports](../modules.md) / BaseIkChain

# Class: BaseIkChain<T\>

Base K chain

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Object3D`](Object3D.md) |

## Hierarchy

- [`ObjVirtual`](ObjVirtual.md)

  ↳ **`BaseIkChain`**

## Table of contents

### Constructors

- [constructor](BaseIkChain.md#constructor)

### Properties

- [\_enablePostToNative](BaseIkChain.md#_enableposttonative)
- [\_enabled](BaseIkChain.md#_enabled)
- [\_factor](BaseIkChain.md#_factor)
- [\_iniPos](BaseIkChain.md#_inipos)
- [\_iniPosMagnitude](BaseIkChain.md#_iniposmagnitude)
- [\_iniRot](BaseIkChain.md#_inirot)
- [\_iniSca](BaseIkChain.md#_inisca)
- [\_pos](BaseIkChain.md#_pos)
- [\_postSolveActions](BaseIkChain.md#_postsolveactions)
- [\_rot](BaseIkChain.md#_rot)
- [\_sca](BaseIkChain.md#_sca)
- [behavior](BaseIkChain.md#behavior)
- [holder](BaseIkChain.md#holder)
- [toEulerFunc](BaseIkChain.md#toeulerfunc)

### Accessors

- [a](BaseIkChain.md#a)
- [actuator](BaseIkChain.md#actuator)
- [bk](BaseIkChain.md#bk)
- [dn](BaseIkChain.md#dn)
- [enablePostToNative](BaseIkChain.md#enableposttonative)
- [factor](BaseIkChain.md#factor)
- [fw](BaseIkChain.md#fw)
- [identifier](BaseIkChain.md#identifier)
- [iniBk](BaseIkChain.md#inibk)
- [iniDn](BaseIkChain.md#inidn)
- [iniFw](BaseIkChain.md#inifw)
- [iniLt](BaseIkChain.md#inilt)
- [iniPos](BaseIkChain.md#inipos)
- [iniPosAsWorld](BaseIkChain.md#iniposasworld)
- [iniPosFac](BaseIkChain.md#iniposfac)
- [iniPosMagnitude](BaseIkChain.md#iniposmagnitude)
- [iniRot](BaseIkChain.md#inirot)
- [iniRotAsWorld](BaseIkChain.md#inirotasworld)
- [iniRt](BaseIkChain.md#inirt)
- [iniSca](BaseIkChain.md#inisca)
- [iniUp](BaseIkChain.md#iniup)
- [lt](BaseIkChain.md#lt)
- [model](BaseIkChain.md#model)
- [name](BaseIkChain.md#name)
- [parent](BaseIkChain.md#parent)
- [pos](BaseIkChain.md#pos)
- [posX](BaseIkChain.md#posx)
- [posY](BaseIkChain.md#posy)
- [posZ](BaseIkChain.md#posz)
- [rot](BaseIkChain.md#rot)
- [rt](BaseIkChain.md#rt)
- [sca](BaseIkChain.md#sca)
- [scale](BaseIkChain.md#scale)
- [summary](BaseIkChain.md#summary)
- [transformWrapper](BaseIkChain.md#transformwrapper)
- [treeName](BaseIkChain.md#treename)
- [up](BaseIkChain.md#up)
- [v](BaseIkChain.md#v)
- [view](BaseIkChain.md#view)
- [worldPos](BaseIkChain.md#worldpos)
- [worldRot](BaseIkChain.md#worldrot)

### Methods

- [addPos](BaseIkChain.md#addpos)
- [addPostSolveAction](BaseIkChain.md#addpostsolveaction)
- [addRot](BaseIkChain.md#addrot)
- [clearPostSolveActions](BaseIkChain.md#clearpostsolveactions)
- [cloneViewFrom](BaseIkChain.md#cloneviewfrom)
- [dispose](BaseIkChain.md#dispose)
- [executePostSolveActions](BaseIkChain.md#executepostsolveactions)
- [localToWorldPos](BaseIkChain.md#localtoworldpos)
- [localToWorldRot](BaseIkChain.md#localtoworldrot)
- [localToWorldVec](BaseIkChain.md#localtoworldvec)
- [pivotEnds](BaseIkChain.md#pivotends)
- [pivotStarts](BaseIkChain.md#pivotstarts)
- [postToNative](BaseIkChain.md#posttonative)
- [resetIniPos](BaseIkChain.md#resetinipos)
- [resetIniRot](BaseIkChain.md#resetinirot)
- [resetIniSca](BaseIkChain.md#resetinisca)
- [setPosSource](BaseIkChain.md#setpossource)
- [setPos\_](BaseIkChain.md#setpos_)
- [setRotSource](BaseIkChain.md#setrotsource)
- [setRot\_](BaseIkChain.md#setrot_)
- [setScaSource](BaseIkChain.md#setscasource)
- [setSca\_](BaseIkChain.md#setsca_)
- [setView](BaseIkChain.md#setview)
- [setWorldPos\_](BaseIkChain.md#setworldpos_)
- [setWorldRot\_](BaseIkChain.md#setworldrot_)
- [worldToLocalPos](BaseIkChain.md#worldtolocalpos)
- [worldToLocalRot](BaseIkChain.md#worldtolocalrot)

## Constructors

### constructor

• **new BaseIkChain**<`T`\>(`suffix`, `holder`, `getPositionAndRotation`)

Creates an instance of base ik chain.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Object3D`](Object3D.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `suffix` | `string` | suffix that describes the IK chain |
| `holder` | `T` | model that holds the IK chain |
| `getPositionAndRotation` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<`T`, [[`V3`](V3.md), [`Qt`](Qt.md)]\> | initialization function witch returns position and rotation of the handle |

#### Overrides

[ObjVirtual](ObjVirtual.md).[constructor](ObjVirtual.md#constructor)

#### Defined in

spark.procedural-animations.base-character.ts:139

## Properties

### \_enablePostToNative

• `Protected` **\_enablePostToNative**: `boolean`

#### Inherited from

[ObjVirtual](ObjVirtual.md).[_enablePostToNative](ObjVirtual.md#_enableposttonative)

#### Defined in

spark.procedural-animations.objects.ts:670

___

### \_enabled

• `Protected` **\_enabled**: `boolean`

#### Defined in

spark.procedural-animations.base-character.ts:132

___

### \_factor

• `Protected` **\_factor**: `number`

#### Inherited from

[ObjVirtual](ObjVirtual.md).[_factor](ObjVirtual.md#_factor)

#### Defined in

spark.procedural-animations.objects.ts:669

___

### \_iniPos

• `Protected` **\_iniPos**: [`V3`](V3.md)

#### Inherited from

[ObjVirtual](ObjVirtual.md).[_iniPos](ObjVirtual.md#_inipos)

#### Defined in

spark.procedural-animations.objects.ts:663

___

### \_iniPosMagnitude

• `Protected` **\_iniPosMagnitude**: `number`

#### Inherited from

[ObjVirtual](ObjVirtual.md).[_iniPosMagnitude](ObjVirtual.md#_iniposmagnitude)

#### Defined in

spark.procedural-animations.objects.ts:665

___

### \_iniRot

• `Protected` **\_iniRot**: [`Qt`](Qt.md)

#### Inherited from

[ObjVirtual](ObjVirtual.md).[_iniRot](ObjVirtual.md#_inirot)

#### Defined in

spark.procedural-animations.objects.ts:662

___

### \_iniSca

• `Protected` **\_iniSca**: [`V3`](V3.md)

#### Inherited from

[ObjVirtual](ObjVirtual.md).[_iniSca](ObjVirtual.md#_inisca)

#### Defined in

spark.procedural-animations.objects.ts:664

___

### \_pos

• `Protected` **\_pos**: [`V3`](V3.md)

#### Inherited from

[ObjVirtual](ObjVirtual.md).[_pos](ObjVirtual.md#_pos)

#### Defined in

spark.procedural-animations.objects.ts:667

___

### \_postSolveActions

• `Private` `Readonly` **\_postSolveActions**: [`PostSolveAction`](PostSolveAction.md)[]

#### Defined in

spark.procedural-animations.base-character.ts:131

___

### \_rot

• `Protected` **\_rot**: [`Qt`](Qt.md)

#### Inherited from

[ObjVirtual](ObjVirtual.md).[_rot](ObjVirtual.md#_rot)

#### Defined in

spark.procedural-animations.objects.ts:666

___

### \_sca

• `Protected` **\_sca**: [`V3`](V3.md)

#### Inherited from

[ObjVirtual](ObjVirtual.md).[_sca](ObjVirtual.md#_sca)

#### Defined in

spark.procedural-animations.objects.ts:668

___

### behavior

• **behavior**: [`Behavior`](Behavior.md)

#### Inherited from

[ObjVirtual](ObjVirtual.md).[behavior](ObjVirtual.md#behavior)

#### Defined in

spark.procedural-animations.objects.ts:674

___

### holder

• `Protected` `Readonly` **holder**: `T`

model that holds the IK chain

#### Defined in

spark.procedural-animations.base-character.ts:141

___

### toEulerFunc

• **toEulerFunc**: [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`Qt`](Qt.md), [`V3`](V3.md)\> = `null`

#### Inherited from

[ObjVirtual](ObjVirtual.md).[toEulerFunc](ObjVirtual.md#toeulerfunc)

#### Defined in

spark.procedural-animations.objects.ts:680

## Accessors

### a

• `get` **a**(): [`Actuator`](Actuator.md)

actuator alias

#### Returns

[`Actuator`](Actuator.md)

#### Inherited from

ObjVirtual.a

#### Defined in

spark.procedural-animations.objects.ts:845

___

### actuator

• `get` **actuator**(): [`Actuator`](Actuator.md)

actuator

#### Returns

[`Actuator`](Actuator.md)

#### Inherited from

ObjVirtual.actuator

#### Defined in

spark.procedural-animations.objects.ts:838

___

### bk

• `get` **bk**(): [`V3`](V3.md)

back direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.bk

#### Defined in

spark.procedural-animations.objects.ts:808

___

### dn

• `get` **dn**(): [`V3`](V3.md)

down direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.dn

#### Defined in

spark.procedural-animations.objects.ts:814

___

### enablePostToNative

• `get` **enablePostToNative**(): `boolean`

Gets enable post to native flag

#### Returns

`boolean`

#### Inherited from

ObjVirtual.enablePostToNative

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

ObjVirtual.enablePostToNative

#### Defined in

spark.procedural-animations.objects.ts:1036

___

### factor

• `get` **factor**(): `number`

get numeric factor used to normalize actuator commands, for example to define numbers as relative to character height

#### Returns

`number`

#### Inherited from

ObjVirtual.factor

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

ObjVirtual.factor

#### Defined in

spark.procedural-animations.objects.ts:869

___

### fw

• `get` **fw**(): [`V3`](V3.md)

forward direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.fw

#### Defined in

spark.procedural-animations.objects.ts:796

___

### identifier

• `get` **identifier**(): `string`

string identifier

#### Returns

`string`

#### Inherited from

ObjVirtual.identifier

#### Defined in

spark.procedural-animations.objects.ts:790

___

### iniBk

• `get` **iniBk**(): [`V3`](V3.md)

initial back direction

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.iniBk

#### Defined in

spark.procedural-animations.objects.ts:979

___

### iniDn

• `get` **iniDn**(): [`V3`](V3.md)

initial down direction

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.iniDn

#### Defined in

spark.procedural-animations.objects.ts:991

___

### iniFw

• `get` **iniFw**(): [`V3`](V3.md)

initial forward direction

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.iniFw

#### Defined in

spark.procedural-animations.objects.ts:973

___

### iniLt

• `get` **iniLt**(): [`V3`](V3.md)

initial left direction

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.iniLt

#### Defined in

spark.procedural-animations.objects.ts:1003

___

### iniPos

• `get` **iniPos**(): [`V3`](V3.md)

initial position

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.iniPos

#### Defined in

spark.procedural-animations.objects.ts:955

___

### iniPosAsWorld

• `get` **iniPosAsWorld**(): [`V3`](V3.md)

initial position in worlds space

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.iniPosAsWorld

#### Defined in

spark.procedural-animations.objects.ts:1137

___

### iniPosFac

• `get` **iniPosFac**(): [`V3`](V3.md)

initial position divided by the factor

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.iniPosFac

#### Defined in

spark.procedural-animations.objects.ts:961

___

### iniPosMagnitude

• `get` **iniPosMagnitude**(): `number`

magnitude of the initial position

#### Returns

`number`

#### Inherited from

ObjVirtual.iniPosMagnitude

#### Defined in

spark.procedural-animations.objects.ts:1009

___

### iniRot

• `get` **iniRot**(): [`Qt`](Qt.md)

initial rotation quaternion

#### Returns

[`Qt`](Qt.md)

#### Inherited from

ObjVirtual.iniRot

#### Defined in

spark.procedural-animations.objects.ts:949

___

### iniRotAsWorld

• `get` **iniRotAsWorld**(): [`Qt`](Qt.md)

initial rotation in worlds space

#### Returns

[`Qt`](Qt.md)

#### Inherited from

ObjVirtual.iniRotAsWorld

#### Defined in

spark.procedural-animations.objects.ts:1143

___

### iniRt

• `get` **iniRt**(): [`V3`](V3.md)

initial right direction

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.iniRt

#### Defined in

spark.procedural-animations.objects.ts:997

___

### iniSca

• `get` **iniSca**(): [`V3`](V3.md)

initial scale

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.iniSca

#### Defined in

spark.procedural-animations.objects.ts:967

___

### iniUp

• `get` **iniUp**(): [`V3`](V3.md)

initial up direction

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.iniUp

#### Defined in

spark.procedural-animations.objects.ts:985

___

### lt

• `get` **lt**(): [`V3`](V3.md)

left direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.lt

#### Defined in

spark.procedural-animations.objects.ts:820

___

### model

• `get` **model**(): [`Object3D`](Object3D.md)

Gets model reference (optional)

#### Returns

[`Object3D`](Object3D.md)

#### Inherited from

ObjVirtual.model

#### Defined in

spark.procedural-animations.objects.ts:1060

___

### name

• `get` **name**(): `string`

name

#### Returns

`string`

#### Inherited from

ObjVirtual.name

#### Defined in

spark.procedural-animations.objects.ts:851

___

### parent

• `get` **parent**(): [`Object3D`](Object3D.md)

get parent object

#### Returns

[`Object3D`](Object3D.md)

#### Inherited from

ObjVirtual.parent

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

ObjVirtual.parent

#### Defined in

spark.procedural-animations.objects.ts:1048

___

### pos

• `get` **pos**(): [`V3`](V3.md)

get object position - local

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.pos

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

ObjVirtual.pos

#### Defined in

spark.procedural-animations.objects.ts:913

___

### posX

• `get` **posX**(): `number`

get position x

#### Returns

`number`

#### Inherited from

ObjVirtual.posX

#### Defined in

spark.procedural-animations.objects.ts:895

___

### posY

• `get` **posY**(): `number`

get position y

#### Returns

`number`

#### Inherited from

ObjVirtual.posY

#### Defined in

spark.procedural-animations.objects.ts:901

___

### posZ

• `get` **posZ**(): `number`

get position z

#### Returns

`number`

#### Inherited from

ObjVirtual.posZ

#### Defined in

spark.procedural-animations.objects.ts:907

___

### rot

• `get` **rot**(): [`Qt`](Qt.md)

get object rotation as quatenion - local

#### Returns

[`Qt`](Qt.md)

#### Inherited from

ObjVirtual.rot

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

ObjVirtual.rot

#### Defined in

spark.procedural-animations.objects.ts:927

___

### rt

• `get` **rt**(): [`V3`](V3.md)

right direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.rt

#### Defined in

spark.procedural-animations.objects.ts:826

___

### sca

• `get` **sca**(): [`V3`](V3.md)

get object scale - local

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.sca

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

ObjVirtual.sca

#### Defined in

spark.procedural-animations.objects.ts:941

___

### scale

• `get` **scale**(): `number`

get object scale - local

#### Returns

`number`

#### Inherited from

ObjVirtual.scale

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

ObjVirtual.scale

#### Defined in

spark.procedural-animations.objects.ts:1021

___

### summary

• `get` **summary**(): [`ObjSummary`](ObjSummary.md)

Gets summary

#### Returns

[`ObjSummary`](ObjSummary.md)

#### Inherited from

ObjVirtual.summary

#### Defined in

spark.procedural-animations.objects.ts:1054

___

### transformWrapper

• `get` **transformWrapper**(): [`TransformWrapper`](TransformWrapper.md)

transform wrapper

#### Returns

[`TransformWrapper`](TransformWrapper.md)

#### Inherited from

ObjVirtual.transformWrapper

#### Defined in

spark.procedural-animations.objects.ts:832

___

### treeName

• `get` **treeName**(): `string`

tree name

#### Returns

`string`

#### Inherited from

ObjVirtual.treeName

#### Defined in

spark.procedural-animations.objects.ts:857

___

### up

• `get` **up**(): [`V3`](V3.md)

up direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.up

#### Defined in

spark.procedural-animations.objects.ts:802

___

### v

• `get` **v**(): [`ObjView`](ObjView.md)

alias for object view - used to redefine directions

#### Returns

[`ObjView`](ObjView.md)

#### Inherited from

ObjVirtual.v

#### Defined in

spark.procedural-animations.objects.ts:883

___

### view

• `get` **view**(): [`ObjView`](ObjView.md)

object view - used to redefine directions

#### Returns

[`ObjView`](ObjView.md)

#### Inherited from

ObjVirtual.view

#### Defined in

spark.procedural-animations.objects.ts:877

___

### worldPos

• `get` **worldPos**(): [`V3`](V3.md)

get world position

#### Returns

[`V3`](V3.md)

#### Inherited from

ObjVirtual.worldPos

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

ObjVirtual.worldPos

#### Defined in

spark.procedural-animations.objects.ts:1186

___

### worldRot

• `get` **worldRot**(): [`Qt`](Qt.md)

get world rotation - quaternion

#### Returns

[`Qt`](Qt.md)

#### Inherited from

ObjVirtual.worldRot

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

ObjVirtual.worldRot

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

[ObjVirtual](ObjVirtual.md).[addPos](ObjVirtual.md#addpos)

#### Defined in

spark.procedural-animations.objects.ts:1268

___

### addPostSolveAction

▸ **addPostSolveAction**(`t`, `act`): `void`

Adds action that will be executed after IK chain is solved for the current frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `t` | `number` | progress number from 0 to 1 |
| `act` | [`IActionOfT`](../interfaces/IActionOfT.md)<`number`\> | action that will be executed after IK chain is solved for the current frame with progress number passed |

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:162

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

[ObjVirtual](ObjVirtual.md).[addRot](ObjVirtual.md#addrot)

#### Defined in

spark.procedural-animations.objects.ts:1261

___

### clearPostSolveActions

▸ **clearPostSolveActions**(): `void`

Clears post solve actions

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:168

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

[ObjVirtual](ObjVirtual.md).[cloneViewFrom](ObjVirtual.md#cloneviewfrom)

#### Defined in

spark.procedural-animations.objects.ts:740

___

### dispose

▸ **dispose**(): `void`

Removes object from posters to native

#### Returns

`void`

#### Inherited from

[ObjVirtual](ObjVirtual.md).[dispose](ObjVirtual.md#dispose)

#### Defined in

spark.procedural-animations.objects.ts:753

___

### executePostSolveActions

▸ **executePostSolveActions**(): `void`

Executes post solve actions

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:174

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

[ObjVirtual](ObjVirtual.md).[localToWorldPos](ObjVirtual.md#localtoworldpos)

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

[ObjVirtual](ObjVirtual.md).[localToWorldRot](ObjVirtual.md#localtoworldrot)

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

[ObjVirtual](ObjVirtual.md).[localToWorldVec](ObjVirtual.md#localtoworldvec)

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

[ObjVirtual](ObjVirtual.md).[pivotEnds](ObjVirtual.md#pivotends)

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

[ObjVirtual](ObjVirtual.md).[pivotStarts](ObjVirtual.md#pivotstarts)

#### Defined in

spark.procedural-animations.objects.ts:1098

___

### postToNative

▸ **postToNative**(): `void`

Posts to native position, rotation, scale

#### Returns

`void`

#### Inherited from

[ObjVirtual](ObjVirtual.md).[postToNative](ObjVirtual.md#posttonative)

#### Defined in

spark.procedural-animations.objects.ts:1374

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

[ObjVirtual](ObjVirtual.md).[resetIniPos](ObjVirtual.md#resetinipos)

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

[ObjVirtual](ObjVirtual.md).[resetIniRot](ObjVirtual.md#resetinirot)

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

[ObjVirtual](ObjVirtual.md).[resetIniSca](ObjVirtual.md#resetinisca)

#### Defined in

spark.procedural-animations.objects.ts:1088

___

### setPosSource

▸ **setPosSource**(`v3`): [`ObjVirtual`](ObjVirtual.md)

Sets position source

#### Parameters

| Name | Type |
| :------ | :------ |
| `v3` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |

#### Returns

[`ObjVirtual`](ObjVirtual.md)

#### Inherited from

[ObjVirtual](ObjVirtual.md).[setPosSource](ObjVirtual.md#setpossource)

#### Defined in

spark.procedural-animations.objects.ts:1383

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

[ObjVirtual](ObjVirtual.md).[setPos_](ObjVirtual.md#setpos_)

#### Defined in

spark.procedural-animations.objects.ts:1277

___

### setRotSource

▸ **setRotSource**(`v3`): [`ObjVirtual`](ObjVirtual.md)

Sets rotation source

#### Parameters

| Name | Type |
| :------ | :------ |
| `v3` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |

#### Returns

[`ObjVirtual`](ObjVirtual.md)

#### Inherited from

[ObjVirtual](ObjVirtual.md).[setRotSource](ObjVirtual.md#setrotsource)

#### Defined in

spark.procedural-animations.objects.ts:1390

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

[ObjVirtual](ObjVirtual.md).[setRot_](ObjVirtual.md#setrot_)

#### Defined in

spark.procedural-animations.objects.ts:1286

___

### setScaSource

▸ **setScaSource**(`v3`): [`ObjVirtual`](ObjVirtual.md)

Sets scale source

#### Parameters

| Name | Type |
| :------ | :------ |
| `v3` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |

#### Returns

[`ObjVirtual`](ObjVirtual.md)

#### Inherited from

[ObjVirtual](ObjVirtual.md).[setScaSource](ObjVirtual.md#setscasource)

#### Defined in

spark.procedural-animations.objects.ts:1397

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

[ObjVirtual](ObjVirtual.md).[setSca_](ObjVirtual.md#setsca_)

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

[ObjVirtual](ObjVirtual.md).[setView](ObjVirtual.md#setview)

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

[ObjVirtual](ObjVirtual.md).[setWorldPos_](ObjVirtual.md#setworldpos_)

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

[ObjVirtual](ObjVirtual.md).[setWorldRot_](ObjVirtual.md#setworldrot_)

#### Defined in

spark.procedural-animations.objects.ts:1314

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

[ObjVirtual](ObjVirtual.md).[worldToLocalPos](ObjVirtual.md#worldtolocalpos)

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

[ObjVirtual](ObjVirtual.md).[worldToLocalRot](ObjVirtual.md#worldtolocalrot)

#### Defined in

spark.procedural-animations.objects.ts:1152
