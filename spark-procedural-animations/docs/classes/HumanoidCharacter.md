[spark-procedural-animations](../README.md) / [Exports](../modules.md) / HumanoidCharacter

# Class: HumanoidCharacter

Humanoid character

## Hierarchy

- [`BaseCharacter`](BaseCharacter.md)

  ↳ **`HumanoidCharacter`**

## Implements

- [`ICharacter`](../interfaces/ICharacter.md)

## Table of contents

### Constructors

- [constructor](HumanoidCharacter.md#constructor)

### Properties

- [\_actionName](HumanoidCharacter.md#_actionname)
- [\_armL](HumanoidCharacter.md#_arml)
- [\_armLowerL](HumanoidCharacter.md#_armlowerl)
- [\_armLowerR](HumanoidCharacter.md#_armlowerr)
- [\_armR](HumanoidCharacter.md#_armr)
- [\_armUpperL](HumanoidCharacter.md#_armupperl)
- [\_armUpperR](HumanoidCharacter.md#_armupperr)
- [\_chest](HumanoidCharacter.md#_chest)
- [\_enablePostToNative](HumanoidCharacter.md#_enableposttonative)
- [\_extenderByName](HumanoidCharacter.md#_extenderbyname)
- [\_eyeL](HumanoidCharacter.md#_eyel)
- [\_eyeR](HumanoidCharacter.md#_eyer)
- [\_factor](HumanoidCharacter.md#_factor)
- [\_footAnkleL](HumanoidCharacter.md#_footanklel)
- [\_footAnkleR](HumanoidCharacter.md#_footankler)
- [\_footBallL](HumanoidCharacter.md#_footballl)
- [\_footBallR](HumanoidCharacter.md#_footballr)
- [\_handL](HumanoidCharacter.md#_handl)
- [\_handR](HumanoidCharacter.md#_handr)
- [\_handWristL](HumanoidCharacter.md#_handwristl)
- [\_handWristR](HumanoidCharacter.md#_handwristr)
- [\_head](HumanoidCharacter.md#_head)
- [\_hips](HumanoidCharacter.md#_hips)
- [\_iniPos](HumanoidCharacter.md#_inipos)
- [\_iniPosMagnitude](HumanoidCharacter.md#_iniposmagnitude)
- [\_iniRot](HumanoidCharacter.md#_inirot)
- [\_iniSca](HumanoidCharacter.md#_inisca)
- [\_isInitialized](HumanoidCharacter.md#_isinitialized)
- [\_jaw](HumanoidCharacter.md#_jaw)
- [\_jointsByName](HumanoidCharacter.md#_jointsbyname)
- [\_legL](HumanoidCharacter.md#_legl)
- [\_legLowerL](HumanoidCharacter.md#_leglowerl)
- [\_legLowerR](HumanoidCharacter.md#_leglowerr)
- [\_legR](HumanoidCharacter.md#_legr)
- [\_legUpperL](HumanoidCharacter.md#_legupperl)
- [\_legUpperR](HumanoidCharacter.md#_legupperr)
- [\_neck](HumanoidCharacter.md#_neck)
- [\_objectsById](HumanoidCharacter.md#_objectsbyid)
- [\_pos](HumanoidCharacter.md#_pos)
- [\_root](HumanoidCharacter.md#_root)
- [\_rot](HumanoidCharacter.md#_rot)
- [\_sca](HumanoidCharacter.md#_sca)
- [\_shoulderL](HumanoidCharacter.md#_shoulderl)
- [\_shoulderR](HumanoidCharacter.md#_shoulderr)
- [\_solvers](HumanoidCharacter.md#_solvers)
- [\_spine](HumanoidCharacter.md#_spine)
- [\_spineLower](HumanoidCharacter.md#_spinelower)
- [\_spineMiddle](HumanoidCharacter.md#_spinemiddle)
- [\_spineUpper](HumanoidCharacter.md#_spineupper)
- [\_updaters](HumanoidCharacter.md#_updaters)
- [behavior](HumanoidCharacter.md#behavior)
- [config](HumanoidCharacter.md#config)
- [data](HumanoidCharacter.md#data)
- [resources](HumanoidCharacter.md#resources)
- [toEulerFunc](HumanoidCharacter.md#toeulerfunc)

### Accessors

- [a](HumanoidCharacter.md#a)
- [actionName](HumanoidCharacter.md#actionname)
- [actuator](HumanoidCharacter.md#actuator)
- [armL](HumanoidCharacter.md#arml)
- [armLowerL](HumanoidCharacter.md#armlowerl)
- [armLowerR](HumanoidCharacter.md#armlowerr)
- [armR](HumanoidCharacter.md#armr)
- [armUpperL](HumanoidCharacter.md#armupperl)
- [armUpperR](HumanoidCharacter.md#armupperr)
- [back](HumanoidCharacter.md#back)
- [bk](HumanoidCharacter.md#bk)
- [chest](HumanoidCharacter.md#chest)
- [dn](HumanoidCharacter.md#dn)
- [down](HumanoidCharacter.md#down)
- [enablePostToNative](HumanoidCharacter.md#enableposttonative)
- [extenderByName](HumanoidCharacter.md#extenderbyname)
- [eyeL](HumanoidCharacter.md#eyel)
- [eyeR](HumanoidCharacter.md#eyer)
- [factor](HumanoidCharacter.md#factor)
- [footAnkleL](HumanoidCharacter.md#footanklel)
- [footAnkleR](HumanoidCharacter.md#footankler)
- [footBallL](HumanoidCharacter.md#footballl)
- [footBallR](HumanoidCharacter.md#footballr)
- [forward](HumanoidCharacter.md#forward)
- [fw](HumanoidCharacter.md#fw)
- [handL](HumanoidCharacter.md#handl)
- [handR](HumanoidCharacter.md#handr)
- [handWristL](HumanoidCharacter.md#handwristl)
- [handWristR](HumanoidCharacter.md#handwristr)
- [head](HumanoidCharacter.md#head)
- [hips](HumanoidCharacter.md#hips)
- [identifier](HumanoidCharacter.md#identifier)
- [iniBk](HumanoidCharacter.md#inibk)
- [iniDn](HumanoidCharacter.md#inidn)
- [iniFw](HumanoidCharacter.md#inifw)
- [iniLt](HumanoidCharacter.md#inilt)
- [iniPos](HumanoidCharacter.md#inipos)
- [iniPosAsWorld](HumanoidCharacter.md#iniposasworld)
- [iniPosFac](HumanoidCharacter.md#iniposfac)
- [iniPosMagnitude](HumanoidCharacter.md#iniposmagnitude)
- [iniRot](HumanoidCharacter.md#inirot)
- [iniRotAsWorld](HumanoidCharacter.md#inirotasworld)
- [iniRt](HumanoidCharacter.md#inirt)
- [iniSca](HumanoidCharacter.md#inisca)
- [iniUp](HumanoidCharacter.md#iniup)
- [isInitialized](HumanoidCharacter.md#isinitialized)
- [jaw](HumanoidCharacter.md#jaw)
- [joinsByName](HumanoidCharacter.md#joinsbyname)
- [jointsByName](HumanoidCharacter.md#jointsbyname)
- [label](HumanoidCharacter.md#label)
- [left](HumanoidCharacter.md#left)
- [legL](HumanoidCharacter.md#legl)
- [legLowerL](HumanoidCharacter.md#leglowerl)
- [legLowerR](HumanoidCharacter.md#leglowerr)
- [legR](HumanoidCharacter.md#legr)
- [legUpperL](HumanoidCharacter.md#legupperl)
- [legUpperR](HumanoidCharacter.md#legupperr)
- [lt](HumanoidCharacter.md#lt)
- [model](HumanoidCharacter.md#model)
- [name](HumanoidCharacter.md#name)
- [neck](HumanoidCharacter.md#neck)
- [obj](HumanoidCharacter.md#obj)
- [objectsById](HumanoidCharacter.md#objectsbyid)
- [parent](HumanoidCharacter.md#parent)
- [pos](HumanoidCharacter.md#pos)
- [posX](HumanoidCharacter.md#posx)
- [posY](HumanoidCharacter.md#posy)
- [posZ](HumanoidCharacter.md#posz)
- [right](HumanoidCharacter.md#right)
- [root](HumanoidCharacter.md#root)
- [rot](HumanoidCharacter.md#rot)
- [rt](HumanoidCharacter.md#rt)
- [sca](HumanoidCharacter.md#sca)
- [scale](HumanoidCharacter.md#scale)
- [shoulderL](HumanoidCharacter.md#shoulderl)
- [shoulderR](HumanoidCharacter.md#shoulderr)
- [solvers](HumanoidCharacter.md#solvers)
- [spine](HumanoidCharacter.md#spine)
- [spineLower](HumanoidCharacter.md#spinelower)
- [spineMiddle](HumanoidCharacter.md#spinemiddle)
- [spineUpper](HumanoidCharacter.md#spineupper)
- [summary](HumanoidCharacter.md#summary)
- [transform](HumanoidCharacter.md#transform)
- [transformWrapper](HumanoidCharacter.md#transformwrapper)
- [treeName](HumanoidCharacter.md#treename)
- [up](HumanoidCharacter.md#up)
- [updaters](HumanoidCharacter.md#updaters)
- [v](HumanoidCharacter.md#v)
- [view](HumanoidCharacter.md#view)
- [worldPos](HumanoidCharacter.md#worldpos)
- [worldRot](HumanoidCharacter.md#worldrot)

### Methods

- [addExtenderAsync](HumanoidCharacter.md#addextenderasync)
- [addPos](HumanoidCharacter.md#addpos)
- [addRot](HumanoidCharacter.md#addrot)
- [buildExtenderByNameMap](HumanoidCharacter.md#buildextenderbynamemap)
- [cloneViewFrom](HumanoidCharacter.md#cloneviewfrom)
- [createIkChain](HumanoidCharacter.md#createikchain)
- [createJoints](HumanoidCharacter.md#createjoints)
- [dispose](HumanoidCharacter.md#dispose)
- [enableIkChains](HumanoidCharacter.md#enableikchains)
- [getExtenderByName](HumanoidCharacter.md#getextenderbyname)
- [getIkFactory](HumanoidCharacter.md#getikfactory)
- [getJoint](HumanoidCharacter.md#getjoint)
- [initializeAsync](HumanoidCharacter.md#initializeasync)
- [initializeExtendersAsync](HumanoidCharacter.md#initializeextendersasync)
- [lateUpdate](HumanoidCharacter.md#lateupdate)
- [localToWorldPos](HumanoidCharacter.md#localtoworldpos)
- [localToWorldRot](HumanoidCharacter.md#localtoworldrot)
- [localToWorldVec](HumanoidCharacter.md#localtoworldvec)
- [pivotEnds](HumanoidCharacter.md#pivotends)
- [pivotStarts](HumanoidCharacter.md#pivotstarts)
- [postToNative](HumanoidCharacter.md#posttonative)
- [resetIniPos](HumanoidCharacter.md#resetinipos)
- [resetIniRot](HumanoidCharacter.md#resetinirot)
- [resetIniSca](HumanoidCharacter.md#resetinisca)
- [setPos\_](HumanoidCharacter.md#setpos_)
- [setRot\_](HumanoidCharacter.md#setrot_)
- [setSca\_](HumanoidCharacter.md#setsca_)
- [setView](HumanoidCharacter.md#setview)
- [setWorldPos\_](HumanoidCharacter.md#setworldpos_)
- [setWorldRot\_](HumanoidCharacter.md#setworldrot_)
- [updatePosFromReactive](HumanoidCharacter.md#updateposfromreactive)
- [updateRotFromReactive](HumanoidCharacter.md#updaterotfromreactive)
- [updateScaFromReactive](HumanoidCharacter.md#updatescafromreactive)
- [worldToLocalPos](HumanoidCharacter.md#worldtolocalpos)
- [worldToLocalRot](HumanoidCharacter.md#worldtolocalrot)
- [findInternalName](HumanoidCharacter.md#findinternalname)

## Constructors

### constructor

• **new HumanoidCharacter**(`resources`, `data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `resources` | [`IResourcesManager`](../interfaces/IResourcesManager.md) |
| `data` | [`CharacterData`](CharacterData.md) |

#### Overrides

[BaseCharacter](BaseCharacter.md).[constructor](BaseCharacter.md#constructor)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:349

## Properties

### \_actionName

• `Private` **\_actionName**: `string`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:348

___

### \_armL

• `Private` **\_armL**: [`InverseKinematicsChain`](InverseKinematicsChain.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:343

___

### \_armLowerL

• `Private` **\_armLowerL**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:328

___

### \_armLowerR

• `Private` **\_armLowerR**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:321

___

### \_armR

• `Private` **\_armR**: [`InverseKinematicsChain`](InverseKinematicsChain.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:344

___

### \_armUpperL

• `Private` **\_armUpperL**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:327

___

### \_armUpperR

• `Private` **\_armUpperR**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:320

___

### \_chest

• `Private` **\_chest**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:318

___

### \_enablePostToNative

• `Protected` **\_enablePostToNative**: `boolean`

#### Inherited from

[BaseCharacter](BaseCharacter.md).[_enablePostToNative](BaseCharacter.md#_enableposttonative)

#### Defined in

spark.procedural-animations.objects.ts:701

___

### \_extenderByName

• `Protected` `Readonly` **\_extenderByName**: `Object`

#### Index signature

▪ [key: `string`]: [`ICharacterExtender`](../interfaces/ICharacterExtender.md)

#### Inherited from

[BaseCharacter](BaseCharacter.md).[_extenderByName](BaseCharacter.md#_extenderbyname)

#### Defined in

spark.procedural-animations.base-character.ts:1018

___

### \_eyeL

• `Private` **\_eyeL**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:338

___

### \_eyeR

• `Private` **\_eyeR**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:339

___

### \_factor

• `Protected` **\_factor**: `number`

#### Inherited from

[BaseCharacter](BaseCharacter.md).[_factor](BaseCharacter.md#_factor)

#### Defined in

spark.procedural-animations.objects.ts:700

___

### \_footAnkleL

• `Private` **\_footAnkleL**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:336

___

### \_footAnkleR

• `Private` **\_footAnkleR**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:332

___

### \_footBallL

• `Private` **\_footBallL**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:337

___

### \_footBallR

• `Private` **\_footBallR**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:333

___

### \_handL

• `Private` **\_handL**: [`HandJoinsGroup`](HandJoinsGroup.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:340

___

### \_handR

• `Private` **\_handR**: [`HandJoinsGroup`](HandJoinsGroup.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:341

___

### \_handWristL

• `Private` **\_handWristL**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:329

___

### \_handWristR

• `Private` **\_handWristR**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:322

___

### \_head

• `Private` **\_head**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:324

___

### \_hips

• `Private` **\_hips**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:314

___

### \_iniPos

• `Protected` **\_iniPos**: [`V3`](V3.md)

#### Inherited from

[BaseCharacter](BaseCharacter.md).[_iniPos](BaseCharacter.md#_inipos)

#### Defined in

spark.procedural-animations.objects.ts:694

___

### \_iniPosMagnitude

• `Protected` **\_iniPosMagnitude**: `number`

#### Inherited from

[BaseCharacter](BaseCharacter.md).[_iniPosMagnitude](BaseCharacter.md#_iniposmagnitude)

#### Defined in

spark.procedural-animations.objects.ts:696

___

### \_iniRot

• `Protected` **\_iniRot**: [`Qt`](Qt.md)

#### Inherited from

[BaseCharacter](BaseCharacter.md).[_iniRot](BaseCharacter.md#_inirot)

#### Defined in

spark.procedural-animations.objects.ts:693

___

### \_iniSca

• `Protected` **\_iniSca**: [`V3`](V3.md)

#### Inherited from

[BaseCharacter](BaseCharacter.md).[_iniSca](BaseCharacter.md#_inisca)

#### Defined in

spark.procedural-animations.objects.ts:695

___

### \_isInitialized

• `Private` **\_isInitialized**: `boolean`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:347

___

### \_jaw

• `Private` **\_jaw**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:325

___

### \_jointsByName

• `Protected` `Readonly` **\_jointsByName**: `Object`

#### Index signature

▪ [key: `string`]: [`Object3D`](Object3D.md)

#### Inherited from

[BaseCharacter](BaseCharacter.md).[_jointsByName](BaseCharacter.md#_jointsbyname)

#### Defined in

spark.procedural-animations.base-character.ts:1015

___

### \_legL

• `Private` **\_legL**: [`InverseKinematicsChain`](InverseKinematicsChain.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:345

___

### \_legLowerL

• `Private` **\_legLowerL**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:335

___

### \_legLowerR

• `Private` **\_legLowerR**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:331

___

### \_legR

• `Private` **\_legR**: [`InverseKinematicsChain`](InverseKinematicsChain.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:346

___

### \_legUpperL

• `Private` **\_legUpperL**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:334

___

### \_legUpperR

• `Private` **\_legUpperR**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:330

___

### \_neck

• `Private` **\_neck**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:323

___

### \_objectsById

• `Protected` `Readonly` **\_objectsById**: `Object`

#### Index signature

▪ [key: `string`]: [`Object3D`](Object3D.md)

#### Inherited from

[BaseCharacter](BaseCharacter.md).[_objectsById](BaseCharacter.md#_objectsbyid)

#### Defined in

spark.procedural-animations.base-character.ts:1016

___

### \_pos

• `Protected` **\_pos**: [`V3`](V3.md)

#### Inherited from

[BaseCharacter](BaseCharacter.md).[_pos](BaseCharacter.md#_pos)

#### Defined in

spark.procedural-animations.objects.ts:698

___

### \_root

• `Private` **\_root**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:313

___

### \_rot

• `Protected` **\_rot**: [`Qt`](Qt.md)

#### Inherited from

[BaseCharacter](BaseCharacter.md).[_rot](BaseCharacter.md#_rot)

#### Defined in

spark.procedural-animations.objects.ts:697

___

### \_sca

• `Protected` **\_sca**: [`V3`](V3.md)

#### Inherited from

[BaseCharacter](BaseCharacter.md).[_sca](BaseCharacter.md#_sca)

#### Defined in

spark.procedural-animations.objects.ts:699

___

### \_shoulderL

• `Private` **\_shoulderL**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:326

___

### \_shoulderR

• `Private` **\_shoulderR**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:319

___

### \_solvers

• `Protected` `Readonly` **\_solvers**: [`ISolverIK`](../interfaces/ISolverIK.md)[]

#### Inherited from

[BaseCharacter](BaseCharacter.md).[_solvers](BaseCharacter.md#_solvers)

#### Defined in

spark.procedural-animations.base-character.ts:1017

___

### \_spine

• `Private` **\_spine**: [`InverseKinematicsChain`](InverseKinematicsChain.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:342

___

### \_spineLower

• `Private` **\_spineLower**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:315

___

### \_spineMiddle

• `Private` **\_spineMiddle**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:316

___

### \_spineUpper

• `Private` **\_spineUpper**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:317

___

### \_updaters

• `Protected` `Readonly` **\_updaters**: [`IUpdatable`](../interfaces/IUpdatable.md)[]

#### Inherited from

[BaseCharacter](BaseCharacter.md).[_updaters](BaseCharacter.md#_updaters)

#### Defined in

spark.procedural-animations.base-character.ts:1019

___

### behavior

• **behavior**: [`Behavior`](Behavior.md)

#### Inherited from

[BaseCharacter](BaseCharacter.md).[behavior](BaseCharacter.md#behavior)

#### Defined in

spark.procedural-animations.objects.ts:705

___

### config

• `Readonly` **config**: [`ICharacterConfig`](../interfaces/ICharacterConfig.md)

#### Implementation of

[ICharacter](../interfaces/ICharacter.md).[config](../interfaces/ICharacter.md#config)

#### Inherited from

[BaseCharacter](BaseCharacter.md).[config](BaseCharacter.md#config)

#### Defined in

spark.procedural-animations.base-character.ts:1020

___

### data

• `Readonly` **data**: [`CharacterData`](CharacterData.md)

character data

#### Implementation of

[ICharacter](../interfaces/ICharacter.md).[data](../interfaces/ICharacter.md#data)

#### Inherited from

[BaseCharacter](BaseCharacter.md).[data](BaseCharacter.md#data)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:349

___

### resources

• `Readonly` **resources**: [`IResourcesManager`](../interfaces/IResourcesManager.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:349

___

### toEulerFunc

• **toEulerFunc**: [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`Qt`](Qt.md), [`V3`](V3.md)\> = `null`

#### Inherited from

[BaseCharacter](BaseCharacter.md).[toEulerFunc](BaseCharacter.md#toeulerfunc)

#### Defined in

spark.procedural-animations.objects.ts:711

## Accessors

### a

• `get` **a**(): [`Actuator`](Actuator.md)

actuator alias

#### Returns

[`Actuator`](Actuator.md)

#### Inherited from

BaseCharacter.a

#### Defined in

spark.procedural-animations.objects.ts:906

___

### actionName

• `get` **actionName**(): `string`

get current action name

#### Returns

`string`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:581

• `set` **actionName**(`an`): `void`

set current action name

#### Parameters

| Name | Type |
| :------ | :------ |
| `an` | `string` |

#### Returns

`void`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:587

___

### actuator

• `get` **actuator**(): [`Actuator`](Actuator.md)

actuator

#### Returns

[`Actuator`](Actuator.md)

#### Inherited from

BaseCharacter.actuator

#### Defined in

spark.procedural-animations.objects.ts:899

___

### armL

• `get` **armL**(): [`InverseKinematicsChain`](InverseKinematicsChain.md)

left arm IK chain

#### Returns

[`InverseKinematicsChain`](InverseKinematicsChain.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:539

___

### armLowerL

• `get` **armLowerL**(): [`Object3D`](Object3D.md)

left lower arm joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:461

___

### armLowerR

• `get` **armLowerR**(): [`Object3D`](Object3D.md)

right lower arm joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:419

___

### armR

• `get` **armR**(): [`InverseKinematicsChain`](InverseKinematicsChain.md)

right arm IK chain

#### Returns

[`InverseKinematicsChain`](InverseKinematicsChain.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:545

___

### armUpperL

• `get` **armUpperL**(): [`Object3D`](Object3D.md)

left upper arm joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:455

___

### armUpperR

• `get` **armUpperR**(): [`Object3D`](Object3D.md)

right upper arm joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:413

___

### back

• `get` **back**(): [`V3`](V3.md)

back direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.back

#### Defined in

spark.procedural-animations.objects.ts:851

___

### bk

• `get` **bk**(): [`V3`](V3.md)

back direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.bk

#### Defined in

spark.procedural-animations.objects.ts:845

___

### chest

• `get` **chest**(): [`Object3D`](Object3D.md)

chest joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:401

___

### dn

• `get` **dn**(): [`V3`](V3.md)

down direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.dn

#### Defined in

spark.procedural-animations.objects.ts:857

___

### down

• `get` **down**(): [`V3`](V3.md)

down direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.down

#### Defined in

spark.procedural-animations.objects.ts:863

___

### enablePostToNative

• `get` **enablePostToNative**(): `boolean`

Gets enable post to native flag

#### Returns

`boolean`

#### Inherited from

BaseCharacter.enablePostToNative

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

BaseCharacter.enablePostToNative

#### Defined in

spark.procedural-animations.objects.ts:1097

___

### extenderByName

• `get` **extenderByName**(): `Object`

#### Returns

`Object`

#### Inherited from

BaseCharacter.extenderByName

#### Defined in

spark.procedural-animations.base-character.ts:1048

___

### eyeL

• `get` **eyeL**(): [`Object3D`](Object3D.md)

left eye joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:521

___

### eyeR

• `get` **eyeR**(): [`Object3D`](Object3D.md)

right eye joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:527

___

### factor

• `get` **factor**(): `number`

get numeric factor used to normalize actuator commands, for example to define numbers as relative to character height

#### Returns

`number`

#### Inherited from

BaseCharacter.factor

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

BaseCharacter.factor

#### Defined in

spark.procedural-animations.objects.ts:930

___

### footAnkleL

• `get` **footAnkleL**(): [`Object3D`](Object3D.md)

left ankle joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:509

___

### footAnkleR

• `get` **footAnkleR**(): [`Object3D`](Object3D.md)

right ankle joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:485

___

### footBallL

• `get` **footBallL**(): [`Object3D`](Object3D.md)

left foot ball joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:515

___

### footBallR

• `get` **footBallR**(): [`Object3D`](Object3D.md)

right foot ball joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:491

___

### forward

• `get` **forward**(): [`V3`](V3.md)

forward direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.forward

#### Defined in

spark.procedural-animations.objects.ts:833

___

### fw

• `get` **fw**(): [`V3`](V3.md)

forward direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.fw

#### Defined in

spark.procedural-animations.objects.ts:827

___

### handL

• `get` **handL**(): [`HandJoinsGroup`](HandJoinsGroup.md)

left hand joints group

#### Returns

[`HandJoinsGroup`](HandJoinsGroup.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:563

___

### handR

• `get` **handR**(): [`HandJoinsGroup`](HandJoinsGroup.md)

right hand joints group

#### Returns

[`HandJoinsGroup`](HandJoinsGroup.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:569

___

### handWristL

• `get` **handWristL**(): [`Object3D`](Object3D.md)

left wrist joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:467

___

### handWristR

• `get` **handWristR**(): [`Object3D`](Object3D.md)

right wrist joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:425

___

### head

• `get` **head**(): [`Object3D`](Object3D.md)

head joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:437

___

### hips

• `get` **hips**(): [`Object3D`](Object3D.md)

hips joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:377

___

### identifier

• `get` **identifier**(): `string`

string identifier

#### Returns

`string`

#### Inherited from

BaseCharacter.identifier

#### Defined in

spark.procedural-animations.objects.ts:821

___

### iniBk

• `get` **iniBk**(): [`V3`](V3.md)

initial back direction

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.iniBk

#### Defined in

spark.procedural-animations.objects.ts:1040

___

### iniDn

• `get` **iniDn**(): [`V3`](V3.md)

initial down direction

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.iniDn

#### Defined in

spark.procedural-animations.objects.ts:1052

___

### iniFw

• `get` **iniFw**(): [`V3`](V3.md)

initial forward direction

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.iniFw

#### Defined in

spark.procedural-animations.objects.ts:1034

___

### iniLt

• `get` **iniLt**(): [`V3`](V3.md)

initial left direction

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.iniLt

#### Defined in

spark.procedural-animations.objects.ts:1064

___

### iniPos

• `get` **iniPos**(): [`V3`](V3.md)

initial position

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.iniPos

#### Defined in

spark.procedural-animations.objects.ts:1016

___

### iniPosAsWorld

• `get` **iniPosAsWorld**(): [`V3`](V3.md)

initial position in worlds space

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.iniPosAsWorld

#### Defined in

spark.procedural-animations.objects.ts:1199

___

### iniPosFac

• `get` **iniPosFac**(): [`V3`](V3.md)

initial position divided by the factor

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.iniPosFac

#### Defined in

spark.procedural-animations.objects.ts:1022

___

### iniPosMagnitude

• `get` **iniPosMagnitude**(): `number`

magnitude of the initial position

#### Returns

`number`

#### Inherited from

BaseCharacter.iniPosMagnitude

#### Defined in

spark.procedural-animations.objects.ts:1070

___

### iniRot

• `get` **iniRot**(): [`Qt`](Qt.md)

initial rotation quaternion

#### Returns

[`Qt`](Qt.md)

#### Inherited from

BaseCharacter.iniRot

#### Defined in

spark.procedural-animations.objects.ts:1010

___

### iniRotAsWorld

• `get` **iniRotAsWorld**(): [`Qt`](Qt.md)

initial rotation in worlds space

#### Returns

[`Qt`](Qt.md)

#### Inherited from

BaseCharacter.iniRotAsWorld

#### Defined in

spark.procedural-animations.objects.ts:1205

___

### iniRt

• `get` **iniRt**(): [`V3`](V3.md)

initial right direction

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.iniRt

#### Defined in

spark.procedural-animations.objects.ts:1058

___

### iniSca

• `get` **iniSca**(): [`V3`](V3.md)

initial scale

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.iniSca

#### Defined in

spark.procedural-animations.objects.ts:1028

___

### iniUp

• `get` **iniUp**(): [`V3`](V3.md)

initial up direction

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.iniUp

#### Defined in

spark.procedural-animations.objects.ts:1046

___

### isInitialized

• `get` **isInitialized**(): `boolean`

Gets whether is initialized

#### Returns

`boolean`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:365

___

### jaw

• `get` **jaw**(): [`Object3D`](Object3D.md)

jaw joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:443

___

### joinsByName

• `get` **joinsByName**(): `Object`

joints by name

#### Returns

`Object`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:575

___

### jointsByName

• `get` **jointsByName**(): `Object`

#### Returns

`Object`

#### Inherited from

BaseCharacter.jointsByName

#### Defined in

spark.procedural-animations.base-character.ts:1039

___

### label

• `get` **label**(): `string`

character label

#### Returns

`string`

#### Implementation of

ICharacter.label

#### Overrides

BaseCharacter.label

#### Defined in

spark.procedural-animations.humanoid-characters.ts:359

___

### left

• `get` **left**(): [`V3`](V3.md)

left direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.left

#### Defined in

spark.procedural-animations.objects.ts:875

___

### legL

• `get` **legL**(): [`InverseKinematicsChain`](InverseKinematicsChain.md)

left leg IK chain

#### Returns

[`InverseKinematicsChain`](InverseKinematicsChain.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:551

___

### legLowerL

• `get` **legLowerL**(): [`Object3D`](Object3D.md)

left lower leg joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:503

___

### legLowerR

• `get` **legLowerR**(): [`Object3D`](Object3D.md)

right lower leg joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:479

___

### legR

• `get` **legR**(): [`InverseKinematicsChain`](InverseKinematicsChain.md)

right leg IK chain

#### Returns

[`InverseKinematicsChain`](InverseKinematicsChain.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:557

___

### legUpperL

• `get` **legUpperL**(): [`Object3D`](Object3D.md)

left upper leg joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:497

___

### legUpperR

• `get` **legUpperR**(): [`Object3D`](Object3D.md)

right upper leg joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:473

___

### lt

• `get` **lt**(): [`V3`](V3.md)

left direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.lt

#### Defined in

spark.procedural-animations.objects.ts:869

___

### model

• `get` **model**(): [`Object3D`](Object3D.md)

Gets model reference (optional)

#### Returns

[`Object3D`](Object3D.md)

#### Inherited from

BaseCharacter.model

#### Defined in

spark.procedural-animations.objects.ts:1121

___

### name

• `get` **name**(): `string`

name

#### Returns

`string`

#### Inherited from

BaseCharacter.name

#### Defined in

spark.procedural-animations.objects.ts:912

___

### neck

• `get` **neck**(): [`Object3D`](Object3D.md)

neck joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:431

___

### obj

• `get` **obj**(): `SceneObjectBase`

Reference to the underlying SceneObjectBase

#### Returns

`SceneObjectBase`

#### Inherited from

BaseCharacter.obj

#### Defined in

spark.procedural-animations.objects.ts:1536

___

### objectsById

• `get` **objectsById**(): `Object`

#### Returns

`Object`

#### Inherited from

BaseCharacter.objectsById

#### Defined in

spark.procedural-animations.base-character.ts:1042

___

### parent

• `get` **parent**(): [`Object3D`](Object3D.md)

get parent object

#### Returns

[`Object3D`](Object3D.md)

#### Inherited from

BaseCharacter.parent

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

BaseCharacter.parent

#### Defined in

spark.procedural-animations.objects.ts:1109

___

### pos

• `get` **pos**(): [`V3`](V3.md)

get object position - local

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.pos

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

BaseCharacter.pos

#### Defined in

spark.procedural-animations.objects.ts:974

___

### posX

• `get` **posX**(): `number`

get position x

#### Returns

`number`

#### Inherited from

BaseCharacter.posX

#### Defined in

spark.procedural-animations.objects.ts:956

___

### posY

• `get` **posY**(): `number`

get position y

#### Returns

`number`

#### Inherited from

BaseCharacter.posY

#### Defined in

spark.procedural-animations.objects.ts:962

___

### posZ

• `get` **posZ**(): `number`

get position z

#### Returns

`number`

#### Inherited from

BaseCharacter.posZ

#### Defined in

spark.procedural-animations.objects.ts:968

___

### right

• `get` **right**(): [`V3`](V3.md)

right direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.right

#### Defined in

spark.procedural-animations.objects.ts:887

___

### root

• `get` **root**(): [`Object3D`](Object3D.md)

root joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:371

___

### rot

• `get` **rot**(): [`Qt`](Qt.md)

get object rotation as quatenion - local

#### Returns

[`Qt`](Qt.md)

#### Inherited from

BaseCharacter.rot

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

BaseCharacter.rot

#### Defined in

spark.procedural-animations.objects.ts:988

___

### rt

• `get` **rt**(): [`V3`](V3.md)

right direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.rt

#### Defined in

spark.procedural-animations.objects.ts:881

___

### sca

• `get` **sca**(): [`V3`](V3.md)

get object scale - local

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.sca

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

BaseCharacter.sca

#### Defined in

spark.procedural-animations.objects.ts:1002

___

### scale

• `get` **scale**(): `number`

get object scale - local

#### Returns

`number`

#### Inherited from

BaseCharacter.scale

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

BaseCharacter.scale

#### Defined in

spark.procedural-animations.objects.ts:1082

___

### shoulderL

• `get` **shoulderL**(): [`Object3D`](Object3D.md)

left shoulder joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:449

___

### shoulderR

• `get` **shoulderR**(): [`Object3D`](Object3D.md)

right shoulder joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:407

___

### solvers

• `get` **solvers**(): [`ISolverIK`](../interfaces/ISolverIK.md)[]

#### Returns

[`ISolverIK`](../interfaces/ISolverIK.md)[]

#### Inherited from

BaseCharacter.solvers

#### Defined in

spark.procedural-animations.base-character.ts:1045

___

### spine

• `get` **spine**(): [`InverseKinematicsChain`](InverseKinematicsChain.md)

spine IK chain

#### Returns

[`InverseKinematicsChain`](InverseKinematicsChain.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:533

___

### spineLower

• `get` **spineLower**(): [`Object3D`](Object3D.md)

lower spine joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:383

___

### spineMiddle

• `get` **spineMiddle**(): [`Object3D`](Object3D.md)

middle spine joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:389

___

### spineUpper

• `get` **spineUpper**(): [`Object3D`](Object3D.md)

upper spine joint

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:395

___

### summary

• `get` **summary**(): [`ObjSummary`](ObjSummary.md)

Gets summary

#### Returns

[`ObjSummary`](ObjSummary.md)

#### Inherited from

BaseCharacter.summary

#### Defined in

spark.procedural-animations.objects.ts:1115

___

### transform

• `get` **transform**(): `Transform`

Reference to the underlying SceneObjectBase Transform

#### Returns

`Transform`

#### Inherited from

BaseCharacter.transform

#### Defined in

spark.procedural-animations.objects.ts:1542

___

### transformWrapper

• `get` **transformWrapper**(): [`TransformWrapper`](TransformWrapper.md)

transform wrapper

#### Returns

[`TransformWrapper`](TransformWrapper.md)

#### Inherited from

BaseCharacter.transformWrapper

#### Defined in

spark.procedural-animations.objects.ts:893

___

### treeName

• `get` **treeName**(): `string`

tree name

#### Returns

`string`

#### Inherited from

BaseCharacter.treeName

#### Defined in

spark.procedural-animations.objects.ts:918

___

### up

• `get` **up**(): [`V3`](V3.md)

up direction based on view

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.up

#### Defined in

spark.procedural-animations.objects.ts:839

___

### updaters

• `get` **updaters**(): [`IUpdatable`](../interfaces/IUpdatable.md)[]

#### Returns

[`IUpdatable`](../interfaces/IUpdatable.md)[]

#### Inherited from

BaseCharacter.updaters

#### Defined in

spark.procedural-animations.base-character.ts:1051

___

### v

• `get` **v**(): [`ObjView`](ObjView.md)

alias for object view - used to redefine directions

#### Returns

[`ObjView`](ObjView.md)

#### Inherited from

BaseCharacter.v

#### Defined in

spark.procedural-animations.objects.ts:944

___

### view

• `get` **view**(): [`ObjView`](ObjView.md)

object view - used to redefine directions

#### Returns

[`ObjView`](ObjView.md)

#### Inherited from

BaseCharacter.view

#### Defined in

spark.procedural-animations.objects.ts:938

___

### worldPos

• `get` **worldPos**(): [`V3`](V3.md)

get world position

#### Returns

[`V3`](V3.md)

#### Inherited from

BaseCharacter.worldPos

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

BaseCharacter.worldPos

#### Defined in

spark.procedural-animations.objects.ts:1248

___

### worldRot

• `get` **worldRot**(): [`Qt`](Qt.md)

get world rotation - quaternion

#### Returns

[`Qt`](Qt.md)

#### Inherited from

BaseCharacter.worldRot

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

BaseCharacter.worldRot

#### Defined in

spark.procedural-animations.objects.ts:1193

## Methods

### addExtenderAsync

▸ **addExtenderAsync**(`extender`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `extender` | [`ICharacterExtender`](../interfaces/ICharacterExtender.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

spark.procedural-animations.humanoid-characters.ts:721

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

[BaseCharacter](BaseCharacter.md).[addPos](BaseCharacter.md#addpos)

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

[BaseCharacter](BaseCharacter.md).[addRot](BaseCharacter.md#addrot)

#### Defined in

spark.procedural-animations.objects.ts:1323

___

### buildExtenderByNameMap

▸ `Protected` **buildExtenderByNameMap**(): `void`

Populates extender by name map

#### Returns

`void`

#### Inherited from

[BaseCharacter](BaseCharacter.md).[buildExtenderByNameMap](BaseCharacter.md#buildextenderbynamemap)

#### Defined in

spark.procedural-animations.base-character.ts:1132

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

[BaseCharacter](BaseCharacter.md).[cloneViewFrom](BaseCharacter.md#cloneviewfrom)

#### Defined in

spark.procedural-animations.objects.ts:771

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

#### Inherited from

[BaseCharacter](BaseCharacter.md).[createIkChain](BaseCharacter.md#createikchain)

#### Defined in

spark.procedural-animations.base-character.ts:1180

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

#### Inherited from

[BaseCharacter](BaseCharacter.md).[createJoints](BaseCharacter.md#createjoints)

#### Defined in

spark.procedural-animations.base-character.ts:1059

___

### dispose

▸ **dispose**(): `void`

Removes object from posters to native

#### Returns

`void`

#### Inherited from

[BaseCharacter](BaseCharacter.md).[dispose](BaseCharacter.md#dispose)

#### Defined in

spark.procedural-animations.objects.ts:784

___

### enableIkChains

▸ **enableIkChains**(`enableIk`): [`HumanoidCharacter`](HumanoidCharacter.md)

Enables or disable IK chains

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enableIk` | `boolean` | flag indicating whether to enable IK or not |

#### Returns

[`HumanoidCharacter`](HumanoidCharacter.md)

reference to itself

#### Defined in

spark.procedural-animations.humanoid-characters.ts:739

___

### getExtenderByName

▸ **getExtenderByName**(`name`): [`ICharacterExtender`](../interfaces/ICharacterExtender.md)

Gets extender by name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | extender name |

#### Returns

[`ICharacterExtender`](../interfaces/ICharacterExtender.md)

extender

#### Defined in

spark.procedural-animations.humanoid-characters.ts:718

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

#### Inherited from

[BaseCharacter](BaseCharacter.md).[getIkFactory](BaseCharacter.md#getikfactory)

#### Defined in

spark.procedural-animations.base-character.ts:1165

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

#### Inherited from

[BaseCharacter](BaseCharacter.md).[getJoint](BaseCharacter.md#getjoint)

#### Defined in

spark.procedural-animations.base-character.ts:1142

___

### initializeAsync

▸ **initializeAsync**(): `Promise`<`void`\>

Initializes joints and ensure hyierarchy

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICharacter](../interfaces/ICharacter.md).[initializeAsync](../interfaces/ICharacter.md#initializeasync)

#### Overrides

[BaseCharacter](BaseCharacter.md).[initializeAsync](BaseCharacter.md#initializeasync)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:593

___

### initializeExtendersAsync

▸ `Protected` **initializeExtendersAsync**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[BaseCharacter](BaseCharacter.md).[initializeExtendersAsync](BaseCharacter.md#initializeextendersasync)

#### Defined in

spark.procedural-animations.base-character.ts:1115

___

### lateUpdate

▸ **lateUpdate**(): `void`

On late updarte solve IK chains and invoke special late updaters

#### Returns

`void`

#### Inherited from

[BaseCharacter](BaseCharacter.md).[lateUpdate](BaseCharacter.md#lateupdate)

#### Defined in

spark.procedural-animations.base-character.ts:1188

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

[BaseCharacter](BaseCharacter.md).[localToWorldPos](BaseCharacter.md#localtoworldpos)

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

[BaseCharacter](BaseCharacter.md).[localToWorldRot](BaseCharacter.md#localtoworldrot)

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

[BaseCharacter](BaseCharacter.md).[localToWorldVec](BaseCharacter.md#localtoworldvec)

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

[BaseCharacter](BaseCharacter.md).[pivotEnds](BaseCharacter.md#pivotends)

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

[BaseCharacter](BaseCharacter.md).[pivotStarts](BaseCharacter.md#pivotstarts)

#### Defined in

spark.procedural-animations.objects.ts:1159

___

### postToNative

▸ **postToNative**(): `void`

Posts to native position, rotation, scale

#### Returns

`void`

#### Inherited from

[BaseCharacter](BaseCharacter.md).[postToNative](BaseCharacter.md#posttonative)

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

[BaseCharacter](BaseCharacter.md).[resetIniPos](BaseCharacter.md#resetinipos)

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

[BaseCharacter](BaseCharacter.md).[resetIniRot](BaseCharacter.md#resetinirot)

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

[BaseCharacter](BaseCharacter.md).[resetIniSca](BaseCharacter.md#resetinisca)

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

[BaseCharacter](BaseCharacter.md).[setPos_](BaseCharacter.md#setpos_)

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

[BaseCharacter](BaseCharacter.md).[setRot_](BaseCharacter.md#setrot_)

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

[BaseCharacter](BaseCharacter.md).[setSca_](BaseCharacter.md#setsca_)

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

[BaseCharacter](BaseCharacter.md).[setView](BaseCharacter.md#setview)

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

[BaseCharacter](BaseCharacter.md).[setWorldPos_](BaseCharacter.md#setworldpos_)

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

[BaseCharacter](BaseCharacter.md).[setWorldRot_](BaseCharacter.md#setworldrot_)

#### Defined in

spark.procedural-animations.objects.ts:1376

___

### updatePosFromReactive

▸ **updatePosFromReactive**(): `void`

Subscribe it to serve as recepient of the changes applied by some other process and update its position

#### Returns

`void`

#### Inherited from

[BaseCharacter](BaseCharacter.md).[updatePosFromReactive](BaseCharacter.md#updateposfromreactive)

#### Defined in

spark.procedural-animations.objects.ts:1548

___

### updateRotFromReactive

▸ **updateRotFromReactive**(): `void`

Subscribe it to serve as recepient of the changes applied by some other process and update its rotation

#### Returns

`void`

#### Inherited from

[BaseCharacter](BaseCharacter.md).[updateRotFromReactive](BaseCharacter.md#updaterotfromreactive)

#### Defined in

spark.procedural-animations.objects.ts:1576

___

### updateScaFromReactive

▸ **updateScaFromReactive**(): `void`

Subscribe it to serve as recepient of the changes applied by some other process and update its scale

#### Returns

`void`

#### Inherited from

[BaseCharacter](BaseCharacter.md).[updateScaFromReactive](BaseCharacter.md#updatescafromreactive)

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

[BaseCharacter](BaseCharacter.md).[worldToLocalPos](BaseCharacter.md#worldtolocalpos)

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

[BaseCharacter](BaseCharacter.md).[worldToLocalRot](BaseCharacter.md#worldtolocalrot)

#### Defined in

spark.procedural-animations.objects.ts:1214

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

#### Inherited from

[BaseCharacter](BaseCharacter.md).[findInternalName](BaseCharacter.md#findinternalname)

#### Defined in

spark.procedural-animations.base-character.ts:1151
