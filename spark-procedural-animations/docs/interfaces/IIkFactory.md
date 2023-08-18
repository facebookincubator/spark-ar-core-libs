[spark-procedural-animations](../README.md) / [Exports](../modules.md) / IIkFactory

# Interface: IIkFactory

Interface forinverse kinematics factory

## Hierarchy

- [`ICharacterExtender`](ICharacterExtender.md)

  ↳ **`IIkFactory`**

## Implemented by

- [`DefaultHumanoidInverseKinematicsFactory`](../classes/DefaultHumanoidInverseKinematicsFactory.md)

## Table of contents

### Accessors

- [name](IIkFactory.md#name)

### Methods

- [createIkChain](IIkFactory.md#createikchain)
- [initialize](IIkFactory.md#initialize)

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

ICharacterExtender.name

#### Defined in

spark.procedural-animations.base-character.ts:106

## Methods

### createIkChain

▸ **createIkChain**(`jointsByName`, `type`): [`InverseKinematicsChain`](../classes/InverseKinematicsChain.md)

Method that takes dictionary of joints by name and IK chain type and returns the IK chain

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jointsByName` | `Object` | dictionary of joints by name |
| `type` | `string` | chain type |

#### Returns

[`InverseKinematicsChain`](../classes/InverseKinematicsChain.md)

inverse kinematics chain

#### Defined in

spark.procedural-animations.base-character.ts:940

___

### initialize

▸ **initialize**(`source`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`ICharacter`](ICharacter.md) |

#### Returns

`void`

#### Inherited from

[ICharacterExtender](ICharacterExtender.md).[initialize](ICharacterExtender.md#initialize)

#### Defined in

spark.procedural-animations.base-character.ts:107
