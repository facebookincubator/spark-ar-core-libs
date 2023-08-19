[spark-procedural-animations](../README.md) / [Exports](../modules.md) / DefaultHumanoidInverseKinematicsFactory

# Class: DefaultHumanoidInverseKinematicsFactory

Default inverse kinematics factory

## Implements

- [`IIkFactory`](../interfaces/IIkFactory.md)

## Table of contents

### Constructors

- [constructor](DefaultHumanoidInverseKinematicsFactory.md#constructor)

### Accessors

- [name](DefaultHumanoidInverseKinematicsFactory.md#name)

### Methods

- [createIkChain](DefaultHumanoidInverseKinematicsFactory.md#createikchain)
- [initialize](DefaultHumanoidInverseKinematicsFactory.md#initialize)

## Constructors

### constructor

• **new DefaultHumanoidInverseKinematicsFactory**()

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Implementation of

IIkFactory.name

#### Defined in

spark.procedural-animations.humanoid-characters.ts:196

## Methods

### createIkChain

▸ **createIkChain**(`obn`, `type`): [`InverseKinematicsChain`](InverseKinematicsChain.md)

Creates inverse kinematics chain

#### Parameters

| Name | Type |
| :------ | :------ |
| `obn` | `Object` |
| `type` | `string` |

#### Returns

[`InverseKinematicsChain`](InverseKinematicsChain.md)

ik

#### Implementation of

[IIkFactory](../interfaces/IIkFactory.md).[createIkChain](../interfaces/IIkFactory.md#createikchain)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:206

___

### initialize

▸ **initialize**(`source`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`ICharacter`](../interfaces/ICharacter.md) |

#### Returns

`void`

#### Implementation of

[IIkFactory](../interfaces/IIkFactory.md).[initialize](../interfaces/IIkFactory.md#initialize)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:199
