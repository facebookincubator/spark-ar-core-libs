[spark-procedural-animations](../README.md) / [Exports](../modules.md) / HumanoidHandPoseExtender

# Class: HumanoidHandPoseExtender

extender for hand poses

## Implements

- [`ICharacterExtender`](../interfaces/ICharacterExtender.md)

## Table of contents

### Constructors

- [constructor](HumanoidHandPoseExtender.md#constructor)

### Properties

- [\_group](HumanoidHandPoseExtender.md#_group)
- [\_human](HumanoidHandPoseExtender.md#_human)
- [\_initial](HumanoidHandPoseExtender.md#_initial)
- [\_isRight](HumanoidHandPoseExtender.md#_isright)
- [\_name](HumanoidHandPoseExtender.md#_name)
- [\_poseBvr](HumanoidHandPoseExtender.md#_posebvr)
- [\_poses](HumanoidHandPoseExtender.md#_poses)

### Accessors

- [name](HumanoidHandPoseExtender.md#name)
- [sideName](HumanoidHandPoseExtender.md#sidename)
- [sideSign](HumanoidHandPoseExtender.md#sidesign)

### Methods

- [applyPose](HumanoidHandPoseExtender.md#applypose)
- [generatePoseData](HumanoidHandPoseExtender.md#generateposedata)
- [initialize](HumanoidHandPoseExtender.md#initialize)
- [onHandPose](HumanoidHandPoseExtender.md#onhandpose)
- [removePrefix](HumanoidHandPoseExtender.md#removeprefix)
- [setPose](HumanoidHandPoseExtender.md#setpose)
- [sideIn](HumanoidHandPoseExtender.md#sidein)
- [sideOut](HumanoidHandPoseExtender.md#sideout)

## Constructors

### constructor

• **new HumanoidHandPoseExtender**(`isRight`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `isRight` | `boolean` |

#### Defined in

spark.procedural-animations.humanoid-characters.ts:853

## Properties

### \_group

• `Private` **\_group**: [`HandJoinsGroup`](HandJoinsGroup.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:851

___

### \_human

• `Private` **\_human**: [`HumanoidCharacter`](HumanoidCharacter.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:850

___

### \_initial

• `Private` `Readonly` **\_initial**: `Object`

#### Index signature

▪ [key: `string`]: [`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:849

___

### \_isRight

• `Private` `Readonly` **\_isRight**: `boolean`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:846

___

### \_name

• `Private` `Readonly` **\_name**: `string`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:847

___

### \_poseBvr

• `Private` **\_poseBvr**: [`Behavior`](Behavior.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:852

___

### \_poses

• `Private` `Readonly` **\_poses**: `Object`

#### Index signature

▪ [key: `string`]: { `[key: string]`: [`Qt`](Qt.md);  }

#### Defined in

spark.procedural-animations.humanoid-characters.ts:848

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Implementation of

ICharacterExtender.name

#### Defined in

spark.procedural-animations.humanoid-characters.ts:860

___

### sideName

• `get` **sideName**(): `string`

#### Returns

`string`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:866

___

### sideSign

• `get` **sideSign**(): `number`

#### Returns

`number`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:863

## Methods

### applyPose

▸ `Private` **applyPose**(`poseData`, `seconds`, `func`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `poseData` | `Object` |
| `seconds` | `number` |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<`number`, `number`\> |

#### Returns

`void`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1021

___

### generatePoseData

▸ `Private` **generatePoseData**(`instructions`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instructions` | `Object` |

#### Returns

`Object`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1070

___

### initialize

▸ **initialize**(`human`): `void`

Defines hand poses

#### Parameters

| Name | Type |
| :------ | :------ |
| `human` | [`HumanoidCharacter`](HumanoidCharacter.md) |

#### Returns

`void`

#### Implementation of

[ICharacterExtender](../interfaces/ICharacterExtender.md).[initialize](../interfaces/ICharacterExtender.md#initialize)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:872

___

### onHandPose

▸ `Private` **onHandPose**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`void`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1001

___

### removePrefix

▸ `Private` **removePrefix**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1086

___

### setPose

▸ `Private` **setPose**(`name`, `instructions`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `instructions` | `Object` |

#### Returns

`void`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1067

___

### sideIn

▸ `Private` **sideIn**(`v`): [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`ObjView`](ObjView.md) |

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1064

___

### sideOut

▸ `Private` **sideOut**(`v`): [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`ObjView`](ObjView.md) |

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1061
