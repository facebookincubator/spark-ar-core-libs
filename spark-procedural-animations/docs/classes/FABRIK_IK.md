[spark-procedural-animations](../README.md) / [Exports](../modules.md) / FABRIK\_IK

# Class: FABRIK\_IK

character IK solver

## Hierarchy

- [`InverseKinematicsChain`](InverseKinematicsChain.md)

  ↳ **`FABRIK_IK`**

## Implements

- [`ISolverIK`](../interfaces/ISolverIK.md)

## Table of contents

### Constructors

- [constructor](FABRIK_IK.md#constructor)

### Properties

- [\_computeCustomUp](FABRIK_IK.md#_computecustomup)
- [\_enablePostToNative](FABRIK_IK.md#_enableposttonative)
- [\_factor](FABRIK_IK.md#_factor)
- [\_fallBackToTrigonometry](FABRIK_IK.md#_fallbacktotrigonometry)
- [\_hasPole](FABRIK_IK.md#_haspole)
- [\_iniPoints](FABRIK_IK.md#_inipoints)
- [\_iniPos](FABRIK_IK.md#_inipos)
- [\_iniPosMagnitude](FABRIK_IK.md#_iniposmagnitude)
- [\_iniRot](FABRIK_IK.md#_inirot)
- [\_iniSca](FABRIK_IK.md#_inisca)
- [\_joints](FABRIK_IK.md#_joints)
- [\_lengthActive](FABRIK_IK.md#_lengthactive)
- [\_lengths](FABRIK_IK.md#_lengths)
- [\_points](FABRIK_IK.md#_points)
- [\_pointsTemp](FABRIK_IK.md#_pointstemp)
- [\_pole](FABRIK_IK.md#_pole)
- [\_polePos](FABRIK_IK.md#_polepos)
- [\_pos](FABRIK_IK.md#_pos)
- [\_prevHandlePos](FABRIK_IK.md#_prevhandlepos)
- [\_prevHandleRot](FABRIK_IK.md#_prevhandlerot)
- [\_prevPolePos](FABRIK_IK.md#_prevpolepos)
- [\_ratios](FABRIK_IK.md#_ratios)
- [\_rot](FABRIK_IK.md#_rot)
- [\_rotTemp](FABRIK_IK.md#_rottemp)
- [\_sca](FABRIK_IK.md#_sca)
- [\_state](FABRIK_IK.md#_state)
- [\_upDirs](FABRIK_IK.md#_updirs)
- [\_upDirsTemp](FABRIK_IK.md#_updirstemp)
- [behavior](FABRIK_IK.md#behavior)
- [data](FABRIK_IK.md#data)
- [enabled](FABRIK_IK.md#enabled)
- [toEulerFunc](FABRIK_IK.md#toeulerfunc)

### Accessors

- [a](FABRIK_IK.md#a)
- [actuator](FABRIK_IK.md#actuator)
- [back](FABRIK_IK.md#back)
- [bk](FABRIK_IK.md#bk)
- [dn](FABRIK_IK.md#dn)
- [down](FABRIK_IK.md#down)
- [enablePostToNative](FABRIK_IK.md#enableposttonative)
- [factor](FABRIK_IK.md#factor)
- [forward](FABRIK_IK.md#forward)
- [fw](FABRIK_IK.md#fw)
- [identifier](FABRIK_IK.md#identifier)
- [iniBk](FABRIK_IK.md#inibk)
- [iniDn](FABRIK_IK.md#inidn)
- [iniFw](FABRIK_IK.md#inifw)
- [iniLt](FABRIK_IK.md#inilt)
- [iniPos](FABRIK_IK.md#inipos)
- [iniPosAsWorld](FABRIK_IK.md#iniposasworld)
- [iniPosFac](FABRIK_IK.md#iniposfac)
- [iniPosMagnitude](FABRIK_IK.md#iniposmagnitude)
- [iniRot](FABRIK_IK.md#inirot)
- [iniRotAsWorld](FABRIK_IK.md#inirotasworld)
- [iniRt](FABRIK_IK.md#inirt)
- [iniSca](FABRIK_IK.md#inisca)
- [iniUp](FABRIK_IK.md#iniup)
- [joints](FABRIK_IK.md#joints)
- [left](FABRIK_IK.md#left)
- [lt](FABRIK_IK.md#lt)
- [model](FABRIK_IK.md#model)
- [name](FABRIK_IK.md#name)
- [parent](FABRIK_IK.md#parent)
- [pole](FABRIK_IK.md#pole)
- [pos](FABRIK_IK.md#pos)
- [posX](FABRIK_IK.md#posx)
- [posY](FABRIK_IK.md#posy)
- [posZ](FABRIK_IK.md#posz)
- [right](FABRIK_IK.md#right)
- [root](FABRIK_IK.md#root)
- [rot](FABRIK_IK.md#rot)
- [rt](FABRIK_IK.md#rt)
- [sca](FABRIK_IK.md#sca)
- [scale](FABRIK_IK.md#scale)
- [summary](FABRIK_IK.md#summary)
- [tip](FABRIK_IK.md#tip)
- [transformWrapper](FABRIK_IK.md#transformwrapper)
- [treeName](FABRIK_IK.md#treename)
- [up](FABRIK_IK.md#up)
- [v](FABRIK_IK.md#v)
- [view](FABRIK_IK.md#view)
- [worldPos](FABRIK_IK.md#worldpos)
- [worldRot](FABRIK_IK.md#worldrot)

### Methods

- [FABRIK](FABRIK_IK.md#fabrik)
- [addPos](FABRIK_IK.md#addpos)
- [addPostSolveAction](FABRIK_IK.md#addpostsolveaction)
- [addRot](FABRIK_IK.md#addrot)
- [applyToTransforms](FABRIK_IK.md#applytotransforms)
- [clearPostSolveActions](FABRIK_IK.md#clearpostsolveactions)
- [cloneViewFrom](FABRIK_IK.md#cloneviewfrom)
- [computeCustomRotations](FABRIK_IK.md#computecustomrotations)
- [computeIkState](FABRIK_IK.md#computeikstate)
- [computeRotations](FABRIK_IK.md#computerotations)
- [createPoleTarget](FABRIK_IK.md#createpoletarget)
- [dispose](FABRIK_IK.md#dispose)
- [executePostSolveActions](FABRIK_IK.md#executepostsolveactions)
- [localToWorldPos](FABRIK_IK.md#localtoworldpos)
- [localToWorldRot](FABRIK_IK.md#localtoworldrot)
- [localToWorldVec](FABRIK_IK.md#localtoworldvec)
- [pivotEnds](FABRIK_IK.md#pivotends)
- [pivotStarts](FABRIK_IK.md#pivotstarts)
- [postToNative](FABRIK_IK.md#posttonative)
- [resetIniPos](FABRIK_IK.md#resetinipos)
- [resetIniRot](FABRIK_IK.md#resetinirot)
- [resetIniSca](FABRIK_IK.md#resetinisca)
- [setPosSource](FABRIK_IK.md#setpossource)
- [setPos\_](FABRIK_IK.md#setpos_)
- [setRotSource](FABRIK_IK.md#setrotsource)
- [setRot\_](FABRIK_IK.md#setrot_)
- [setScaSource](FABRIK_IK.md#setscasource)
- [setSca\_](FABRIK_IK.md#setsca_)
- [setView](FABRIK_IK.md#setview)
- [setWorldPos\_](FABRIK_IK.md#setworldpos_)
- [setWorldRot\_](FABRIK_IK.md#setworldrot_)
- [solveIK](FABRIK_IK.md#solveik)
- [trigonometry](FABRIK_IK.md#trigonometry)
- [worldToLocalPos](FABRIK_IK.md#worldtolocalpos)
- [worldToLocalRot](FABRIK_IK.md#worldtolocalrot)
- [getPolePos](FABRIK_IK.md#getpolepos)

## Constructors

### constructor

• **new FABRIK_IK**(`chainName`, `model`, `data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainName` | `string` |
| `model` | [`Object3D`](Object3D.md) |
| `data` | [`IkData`](../modules.md#ikdata) |

#### Overrides

[InverseKinematicsChain](InverseKinematicsChain.md).[constructor](InverseKinematicsChain.md#constructor)

#### Defined in

spark.procedural-animations.base-character.ts:498

## Properties

### \_computeCustomUp

• `Private` `Readonly` **\_computeCustomUp**: `boolean` = `false`

#### Defined in

spark.procedural-animations.base-character.ts:494

___

### \_enablePostToNative

• `Protected` **\_enablePostToNative**: `boolean`

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[_enablePostToNative](InverseKinematicsChain.md#_enableposttonative)

#### Defined in

spark.procedural-animations.objects.ts:701

___

### \_factor

• `Protected` **\_factor**: `number`

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[_factor](InverseKinematicsChain.md#_factor)

#### Defined in

spark.procedural-animations.objects.ts:700

___

### \_fallBackToTrigonometry

• `Private` `Readonly` **\_fallBackToTrigonometry**: `boolean` = `false`

#### Defined in

spark.procedural-animations.base-character.ts:493

___

### \_hasPole

• `Private` `Readonly` **\_hasPole**: `boolean`

#### Defined in

spark.procedural-animations.base-character.ts:492

___

### \_iniPoints

• `Private` `Readonly` **\_iniPoints**: [`IV3Readonly`](../interfaces/IV3Readonly.md)[] = `[]`

#### Defined in

spark.procedural-animations.base-character.ts:485

___

### \_iniPos

• `Protected` **\_iniPos**: [`V3`](V3.md)

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[_iniPos](InverseKinematicsChain.md#_inipos)

#### Defined in

spark.procedural-animations.objects.ts:694

___

### \_iniPosMagnitude

• `Protected` **\_iniPosMagnitude**: `number`

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[_iniPosMagnitude](InverseKinematicsChain.md#_iniposmagnitude)

#### Defined in

spark.procedural-animations.objects.ts:696

___

### \_iniRot

• `Protected` **\_iniRot**: [`Qt`](Qt.md)

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[_iniRot](InverseKinematicsChain.md#_inirot)

#### Defined in

spark.procedural-animations.objects.ts:693

___

### \_iniSca

• `Protected` **\_iniSca**: [`V3`](V3.md)

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[_iniSca](InverseKinematicsChain.md#_inisca)

#### Defined in

spark.procedural-animations.objects.ts:695

___

### \_joints

• `Private` `Readonly` **\_joints**: [`Object3D`](Object3D.md)[]

#### Defined in

spark.procedural-animations.base-character.ts:496

___

### \_lengthActive

• `Private` **\_lengthActive**: `number` = `0`

#### Defined in

spark.procedural-animations.base-character.ts:497

___

### \_lengths

• `Private` `Readonly` **\_lengths**: `number`[] = `[]`

#### Defined in

spark.procedural-animations.base-character.ts:483

___

### \_points

• `Private` `Readonly` **\_points**: [`V3`](V3.md)[] = `[]`

#### Defined in

spark.procedural-animations.base-character.ts:486

___

### \_pointsTemp

• `Private` `Readonly` **\_pointsTemp**: [`V3`](V3.md)[] = `[]`

#### Defined in

spark.procedural-animations.base-character.ts:488

___

### \_pole

• `Private` `Readonly` **\_pole**: [`ObjVirtual`](ObjVirtual.md) = `null`

#### Defined in

spark.procedural-animations.base-character.ts:467

___

### \_polePos

• `Private` `Readonly` **\_polePos**: [`V3`](V3.md)

#### Defined in

spark.procedural-animations.base-character.ts:491

___

### \_pos

• `Protected` **\_pos**: [`V3`](V3.md)

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[_pos](InverseKinematicsChain.md#_pos)

#### Defined in

spark.procedural-animations.objects.ts:698

___

### \_prevHandlePos

• `Private` `Readonly` **\_prevHandlePos**: [`V3`](V3.md)

#### Defined in

spark.procedural-animations.base-character.ts:468

___

### \_prevHandleRot

• `Private` `Readonly` **\_prevHandleRot**: [`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.base-character.ts:473

___

### \_prevPolePos

• `Private` `Readonly` **\_prevPolePos**: [`V3`](V3.md)

#### Defined in

spark.procedural-animations.base-character.ts:478

___

### \_ratios

• `Private` `Readonly` **\_ratios**: `number`[] = `[]`

#### Defined in

spark.procedural-animations.base-character.ts:484

___

### \_rot

• `Protected` **\_rot**: [`Qt`](Qt.md)

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[_rot](InverseKinematicsChain.md#_rot)

#### Defined in

spark.procedural-animations.objects.ts:697

___

### \_rotTemp

• `Private` `Readonly` **\_rotTemp**: [`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.base-character.ts:490

___

### \_sca

• `Protected` **\_sca**: [`V3`](V3.md)

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[_sca](InverseKinematicsChain.md#_sca)

#### Defined in

spark.procedural-animations.objects.ts:699

___

### \_state

• `Private` `Readonly` **\_state**: [`IkState`](IkState.md)

#### Defined in

spark.procedural-animations.base-character.ts:495

___

### \_upDirs

• `Private` `Readonly` **\_upDirs**: [`V3`](V3.md)[] = `[]`

#### Defined in

spark.procedural-animations.base-character.ts:487

___

### \_upDirsTemp

• `Private` `Readonly` **\_upDirsTemp**: [`V3`](V3.md)[] = `[]`

#### Defined in

spark.procedural-animations.base-character.ts:489

___

### behavior

• **behavior**: [`Behavior`](Behavior.md)

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[behavior](InverseKinematicsChain.md#behavior)

#### Defined in

spark.procedural-animations.objects.ts:705

___

### data

• `Readonly` **data**: [`IkData`](../modules.md#ikdata)

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[data](InverseKinematicsChain.md#data)

#### Defined in

spark.procedural-animations.base-character.ts:498

___

### enabled

• **enabled**: `boolean` = `true`

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[enabled](InverseKinematicsChain.md#enabled)

#### Defined in

spark.procedural-animations.base-character.ts:427

___

### toEulerFunc

• **toEulerFunc**: [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`Qt`](Qt.md), [`V3`](V3.md)\> = `null`

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[toEulerFunc](InverseKinematicsChain.md#toeulerfunc)

#### Defined in

spark.procedural-animations.objects.ts:711

## Accessors

### a

• `get` **a**(): [`Actuator`](Actuator.md)

actuator alias

#### Returns

[`Actuator`](Actuator.md)

#### Inherited from

InverseKinematicsChain.a

#### Defined in

spark.procedural-animations.objects.ts:906

___

### actuator

• `get` **actuator**(): [`Actuator`](Actuator.md)

actuator

#### Returns

[`Actuator`](Actuator.md)

#### Inherited from

InverseKinematicsChain.actuator

#### Defined in

spark.procedural-animations.objects.ts:899

___

### back

• `get` **back**(): [`V3`](V3.md)

back direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.back

#### Defined in

spark.procedural-animations.objects.ts:851

___

### bk

• `get` **bk**(): [`V3`](V3.md)

back direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.bk

#### Defined in

spark.procedural-animations.objects.ts:845

___

### dn

• `get` **dn**(): [`V3`](V3.md)

down direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.dn

#### Defined in

spark.procedural-animations.objects.ts:857

___

### down

• `get` **down**(): [`V3`](V3.md)

down direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.down

#### Defined in

spark.procedural-animations.objects.ts:863

___

### enablePostToNative

• `get` **enablePostToNative**(): `boolean`

Gets enable post to native flag

#### Returns

`boolean`

#### Inherited from

InverseKinematicsChain.enablePostToNative

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

InverseKinematicsChain.enablePostToNative

#### Defined in

spark.procedural-animations.objects.ts:1097

___

### factor

• `get` **factor**(): `number`

get numeric factor used to normalize actuator commands, for example to define numbers as relative to character height

#### Returns

`number`

#### Inherited from

InverseKinematicsChain.factor

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

InverseKinematicsChain.factor

#### Defined in

spark.procedural-animations.objects.ts:930

___

### forward

• `get` **forward**(): [`V3`](V3.md)

forward direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.forward

#### Defined in

spark.procedural-animations.objects.ts:833

___

### fw

• `get` **fw**(): [`V3`](V3.md)

forward direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.fw

#### Defined in

spark.procedural-animations.objects.ts:827

___

### identifier

• `get` **identifier**(): `string`

string identifier

#### Returns

`string`

#### Inherited from

InverseKinematicsChain.identifier

#### Defined in

spark.procedural-animations.objects.ts:821

___

### iniBk

• `get` **iniBk**(): [`V3`](V3.md)

initial back direction

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.iniBk

#### Defined in

spark.procedural-animations.objects.ts:1040

___

### iniDn

• `get` **iniDn**(): [`V3`](V3.md)

initial down direction

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.iniDn

#### Defined in

spark.procedural-animations.objects.ts:1052

___

### iniFw

• `get` **iniFw**(): [`V3`](V3.md)

initial forward direction

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.iniFw

#### Defined in

spark.procedural-animations.objects.ts:1034

___

### iniLt

• `get` **iniLt**(): [`V3`](V3.md)

initial left direction

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.iniLt

#### Defined in

spark.procedural-animations.objects.ts:1064

___

### iniPos

• `get` **iniPos**(): [`V3`](V3.md)

initial position

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.iniPos

#### Defined in

spark.procedural-animations.objects.ts:1016

___

### iniPosAsWorld

• `get` **iniPosAsWorld**(): [`V3`](V3.md)

initial position in worlds space

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.iniPosAsWorld

#### Defined in

spark.procedural-animations.objects.ts:1199

___

### iniPosFac

• `get` **iniPosFac**(): [`V3`](V3.md)

initial position divided by the factor

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.iniPosFac

#### Defined in

spark.procedural-animations.objects.ts:1022

___

### iniPosMagnitude

• `get` **iniPosMagnitude**(): `number`

magnitude of the initial position

#### Returns

`number`

#### Inherited from

InverseKinematicsChain.iniPosMagnitude

#### Defined in

spark.procedural-animations.objects.ts:1070

___

### iniRot

• `get` **iniRot**(): [`Qt`](Qt.md)

initial rotation quaternion

#### Returns

[`Qt`](Qt.md)

#### Inherited from

InverseKinematicsChain.iniRot

#### Defined in

spark.procedural-animations.objects.ts:1010

___

### iniRotAsWorld

• `get` **iniRotAsWorld**(): [`Qt`](Qt.md)

initial rotation in worlds space

#### Returns

[`Qt`](Qt.md)

#### Inherited from

InverseKinematicsChain.iniRotAsWorld

#### Defined in

spark.procedural-animations.objects.ts:1205

___

### iniRt

• `get` **iniRt**(): [`V3`](V3.md)

initial right direction

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.iniRt

#### Defined in

spark.procedural-animations.objects.ts:1058

___

### iniSca

• `get` **iniSca**(): [`V3`](V3.md)

initial scale

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.iniSca

#### Defined in

spark.procedural-animations.objects.ts:1028

___

### iniUp

• `get` **iniUp**(): [`V3`](V3.md)

initial up direction

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.iniUp

#### Defined in

spark.procedural-animations.objects.ts:1046

___

### joints

• `get` **joints**(): [`Object3D`](Object3D.md)[]

#### Returns

[`Object3D`](Object3D.md)[]

#### Overrides

InverseKinematicsChain.joints

#### Defined in

spark.procedural-animations.base-character.ts:616

___

### left

• `get` **left**(): [`V3`](V3.md)

left direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.left

#### Defined in

spark.procedural-animations.objects.ts:875

___

### lt

• `get` **lt**(): [`V3`](V3.md)

left direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.lt

#### Defined in

spark.procedural-animations.objects.ts:869

___

### model

• `get` **model**(): [`Object3D`](Object3D.md)

Gets model reference (optional)

#### Returns

[`Object3D`](Object3D.md)

#### Inherited from

InverseKinematicsChain.model

#### Defined in

spark.procedural-animations.objects.ts:1121

___

### name

• `get` **name**(): `string`

name

#### Returns

`string`

#### Inherited from

InverseKinematicsChain.name

#### Defined in

spark.procedural-animations.objects.ts:912

___

### parent

• `get` **parent**(): [`Object3D`](Object3D.md)

get parent object

#### Returns

[`Object3D`](Object3D.md)

#### Inherited from

InverseKinematicsChain.parent

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

InverseKinematicsChain.parent

#### Defined in

spark.procedural-animations.objects.ts:1109

___

### pole

• `get` **pole**(): [`Object3D`](Object3D.md)

#### Returns

[`Object3D`](Object3D.md)

#### Overrides

InverseKinematicsChain.pole

#### Defined in

spark.procedural-animations.base-character.ts:613

___

### pos

• `get` **pos**(): [`V3`](V3.md)

get object position - local

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.pos

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

InverseKinematicsChain.pos

#### Defined in

spark.procedural-animations.objects.ts:974

___

### posX

• `get` **posX**(): `number`

get position x

#### Returns

`number`

#### Inherited from

InverseKinematicsChain.posX

#### Defined in

spark.procedural-animations.objects.ts:956

___

### posY

• `get` **posY**(): `number`

get position y

#### Returns

`number`

#### Inherited from

InverseKinematicsChain.posY

#### Defined in

spark.procedural-animations.objects.ts:962

___

### posZ

• `get` **posZ**(): `number`

get position z

#### Returns

`number`

#### Inherited from

InverseKinematicsChain.posZ

#### Defined in

spark.procedural-animations.objects.ts:968

___

### right

• `get` **right**(): [`V3`](V3.md)

right direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.right

#### Defined in

spark.procedural-animations.objects.ts:887

___

### root

• `get` **root**(): [`Object3D`](Object3D.md)

#### Returns

[`Object3D`](Object3D.md)

#### Overrides

InverseKinematicsChain.root

#### Defined in

spark.procedural-animations.base-character.ts:607

___

### rot

• `get` **rot**(): [`Qt`](Qt.md)

get object rotation as quatenion - local

#### Returns

[`Qt`](Qt.md)

#### Inherited from

InverseKinematicsChain.rot

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

InverseKinematicsChain.rot

#### Defined in

spark.procedural-animations.objects.ts:988

___

### rt

• `get` **rt**(): [`V3`](V3.md)

right direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.rt

#### Defined in

spark.procedural-animations.objects.ts:881

___

### sca

• `get` **sca**(): [`V3`](V3.md)

get object scale - local

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.sca

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

InverseKinematicsChain.sca

#### Defined in

spark.procedural-animations.objects.ts:1002

___

### scale

• `get` **scale**(): `number`

get object scale - local

#### Returns

`number`

#### Inherited from

InverseKinematicsChain.scale

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

InverseKinematicsChain.scale

#### Defined in

spark.procedural-animations.objects.ts:1082

___

### summary

• `get` **summary**(): [`ObjSummary`](ObjSummary.md)

Gets summary

#### Returns

[`ObjSummary`](ObjSummary.md)

#### Inherited from

InverseKinematicsChain.summary

#### Defined in

spark.procedural-animations.objects.ts:1115

___

### tip

• `get` **tip**(): [`Object3D`](Object3D.md)

#### Returns

[`Object3D`](Object3D.md)

#### Overrides

InverseKinematicsChain.tip

#### Defined in

spark.procedural-animations.base-character.ts:610

___

### transformWrapper

• `get` **transformWrapper**(): [`TransformWrapper`](TransformWrapper.md)

transform wrapper

#### Returns

[`TransformWrapper`](TransformWrapper.md)

#### Inherited from

InverseKinematicsChain.transformWrapper

#### Defined in

spark.procedural-animations.objects.ts:893

___

### treeName

• `get` **treeName**(): `string`

tree name

#### Returns

`string`

#### Inherited from

InverseKinematicsChain.treeName

#### Defined in

spark.procedural-animations.objects.ts:918

___

### up

• `get` **up**(): [`V3`](V3.md)

up direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.up

#### Defined in

spark.procedural-animations.objects.ts:839

___

### v

• `get` **v**(): [`ObjView`](ObjView.md)

alias for object view - used to redefine directions

#### Returns

[`ObjView`](ObjView.md)

#### Inherited from

InverseKinematicsChain.v

#### Defined in

spark.procedural-animations.objects.ts:944

___

### view

• `get` **view**(): [`ObjView`](ObjView.md)

object view - used to redefine directions

#### Returns

[`ObjView`](ObjView.md)

#### Inherited from

InverseKinematicsChain.view

#### Defined in

spark.procedural-animations.objects.ts:938

___

### worldPos

• `get` **worldPos**(): [`V3`](V3.md)

get world position

#### Returns

[`V3`](V3.md)

#### Inherited from

InverseKinematicsChain.worldPos

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

InverseKinematicsChain.worldPos

#### Defined in

spark.procedural-animations.objects.ts:1248

___

### worldRot

• `get` **worldRot**(): [`Qt`](Qt.md)

get world rotation - quaternion

#### Returns

[`Qt`](Qt.md)

#### Inherited from

InverseKinematicsChain.worldRot

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

InverseKinematicsChain.worldRot

#### Defined in

spark.procedural-animations.objects.ts:1193

## Methods

### FABRIK

▸ `Private` **FABRIK**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:673

___

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

[InverseKinematicsChain](InverseKinematicsChain.md).[addPos](InverseKinematicsChain.md#addpos)

#### Defined in

spark.procedural-animations.objects.ts:1330

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

#### Implementation of

[ISolverIK](../interfaces/ISolverIK.md).[addPostSolveAction](../interfaces/ISolverIK.md#addpostsolveaction)

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[addPostSolveAction](InverseKinematicsChain.md#addpostsolveaction)

#### Defined in

spark.procedural-animations.base-character.ts:444

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

[InverseKinematicsChain](InverseKinematicsChain.md).[addRot](InverseKinematicsChain.md#addrot)

#### Defined in

spark.procedural-animations.objects.ts:1323

___

### applyToTransforms

▸ `Private` **applyToTransforms**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:769

___

### clearPostSolveActions

▸ **clearPostSolveActions**(): `void`

Clears post solve actions

#### Returns

`void`

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[clearPostSolveActions](InverseKinematicsChain.md#clearpostsolveactions)

#### Defined in

spark.procedural-animations.base-character.ts:450

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

[InverseKinematicsChain](InverseKinematicsChain.md).[cloneViewFrom](InverseKinematicsChain.md#cloneviewfrom)

#### Defined in

spark.procedural-animations.objects.ts:771

___

### computeCustomRotations

▸ `Private` **computeCustomRotations**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:721

___

### computeIkState

▸ `Private` **computeIkState**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:619

___

### computeRotations

▸ `Private` **computeRotations**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:726

___

### createPoleTarget

▸ `Private` **createPoleTarget**(`name`, `position`): [`ObjVirtual`](ObjVirtual.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `position` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |

#### Returns

[`ObjVirtual`](ObjVirtual.md)

#### Defined in

spark.procedural-animations.base-character.ts:839

___

### dispose

▸ **dispose**(): `void`

Removes object from posters to native

#### Returns

`void`

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[dispose](InverseKinematicsChain.md#dispose)

#### Defined in

spark.procedural-animations.objects.ts:784

___

### executePostSolveActions

▸ **executePostSolveActions**(): `void`

Executes post solve actions

#### Returns

`void`

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[executePostSolveActions](InverseKinematicsChain.md#executepostsolveactions)

#### Defined in

spark.procedural-animations.base-character.ts:456

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

[InverseKinematicsChain](InverseKinematicsChain.md).[localToWorldPos](InverseKinematicsChain.md#localtoworldpos)

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

[InverseKinematicsChain](InverseKinematicsChain.md).[localToWorldRot](InverseKinematicsChain.md#localtoworldrot)

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

[InverseKinematicsChain](InverseKinematicsChain.md).[localToWorldVec](InverseKinematicsChain.md#localtoworldvec)

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

[InverseKinematicsChain](InverseKinematicsChain.md).[pivotEnds](InverseKinematicsChain.md#pivotends)

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

[InverseKinematicsChain](InverseKinematicsChain.md).[pivotStarts](InverseKinematicsChain.md#pivotstarts)

#### Defined in

spark.procedural-animations.objects.ts:1159

___

### postToNative

▸ **postToNative**(): `void`

Posts to native position, rotation, scale

#### Returns

`void`

#### Inherited from

[InverseKinematicsChain](InverseKinematicsChain.md).[postToNative](InverseKinematicsChain.md#posttonative)

#### Defined in

spark.procedural-animations.objects.ts:1436

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

[InverseKinematicsChain](InverseKinematicsChain.md).[resetIniPos](InverseKinematicsChain.md#resetinipos)

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

[InverseKinematicsChain](InverseKinematicsChain.md).[resetIniRot](InverseKinematicsChain.md#resetinirot)

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

[InverseKinematicsChain](InverseKinematicsChain.md).[resetIniSca](InverseKinematicsChain.md#resetinisca)

#### Defined in

spark.procedural-animations.objects.ts:1149

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

[InverseKinematicsChain](InverseKinematicsChain.md).[setPosSource](InverseKinematicsChain.md#setpossource)

#### Defined in

spark.procedural-animations.objects.ts:1445

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

[InverseKinematicsChain](InverseKinematicsChain.md).[setPos_](InverseKinematicsChain.md#setpos_)

#### Defined in

spark.procedural-animations.objects.ts:1339

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

[InverseKinematicsChain](InverseKinematicsChain.md).[setRotSource](InverseKinematicsChain.md#setrotsource)

#### Defined in

spark.procedural-animations.objects.ts:1452

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

[InverseKinematicsChain](InverseKinematicsChain.md).[setRot_](InverseKinematicsChain.md#setrot_)

#### Defined in

spark.procedural-animations.objects.ts:1348

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

[InverseKinematicsChain](InverseKinematicsChain.md).[setScaSource](InverseKinematicsChain.md#setscasource)

#### Defined in

spark.procedural-animations.objects.ts:1459

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

[InverseKinematicsChain](InverseKinematicsChain.md).[setSca_](InverseKinematicsChain.md#setsca_)

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

[InverseKinematicsChain](InverseKinematicsChain.md).[setView](InverseKinematicsChain.md#setview)

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

[InverseKinematicsChain](InverseKinematicsChain.md).[setWorldPos_](InverseKinematicsChain.md#setworldpos_)

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

[InverseKinematicsChain](InverseKinematicsChain.md).[setWorldRot_](InverseKinematicsChain.md#setworldrot_)

#### Defined in

spark.procedural-animations.objects.ts:1376

___

### solveIK

▸ **solveIK**(): `void`

#### Returns

`void`

#### Implementation of

[ISolverIK](../interfaces/ISolverIK.md).[solveIK](../interfaces/ISolverIK.md#solveik)

#### Overrides

[InverseKinematicsChain](InverseKinematicsChain.md).[solveIK](InverseKinematicsChain.md#solveik)

#### Defined in

spark.procedural-animations.base-character.ts:573

___

### trigonometry

▸ `Private` **trigonometry**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:641

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

[InverseKinematicsChain](InverseKinematicsChain.md).[worldToLocalPos](InverseKinematicsChain.md#worldtolocalpos)

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

[InverseKinematicsChain](InverseKinematicsChain.md).[worldToLocalRot](InverseKinematicsChain.md#worldtolocalrot)

#### Defined in

spark.procedural-animations.objects.ts:1214

___

### getPolePos

▸ `Static` **getPolePos**(`d`, `relMoveAlong`, `shift1?`, `shift2?`): [`IV3Readonly`](../interfaces/IV3Readonly.md)

ompute pole position

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `d` | [`IkData`](../modules.md#ikdata) | IK Data |
| `relMoveAlong` | `number` | relative move along the chain direction (root to tip) 1 being the full length |
| `shift1?` | [`IFuncOf3T`](../interfaces/IFuncOf3T.md)<[`ObjView`](ObjView.md), `number`, [`IV3Readonly`](../interfaces/IV3Readonly.md)\> | optional shift as function taking "root view" and "tip to root length" parameters and returning shift vector in root space |
| `shift2?` | [`IFuncOf3T`](../interfaces/IFuncOf3T.md)<[`ObjView`](ObjView.md), `number`, [`IV3Readonly`](../interfaces/IV3Readonly.md)\> | optional shift as function taking "root view" and "tip to root length" parameters and returning shift vector in root space |

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

pole pos

#### Defined in

spark.procedural-animations.base-character.ts:825
