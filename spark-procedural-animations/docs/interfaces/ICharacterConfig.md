[spark-procedural-animations](../README.md) / [Exports](../modules.md) / ICharacterConfig

# Interface: ICharacterConfig

Character configuration

## Implemented by

- [`MixamoConfig`](../classes/MixamoConfig.md)

## Table of contents

### Properties

- [armRestFromDownDegrees](ICharacterConfig.md#armrestfromdowndegrees)
- [initialize](ICharacterConfig.md#initialize)

### Accessors

- [jointsData](ICharacterConfig.md#jointsdata)
- [jointsMap](ICharacterConfig.md#jointsmap)
- [reverseJointsMap](ICharacterConfig.md#reversejointsmap)
- [type](ICharacterConfig.md#type)

## Properties

### armRestFromDownDegrees

• **armRestFromDownDegrees**: `number`

arm rest from down degrees

#### Defined in

spark.procedural-animations.base-character.ts:95

___

### initialize

• **initialize**: [`IActionOfT`](IActionOfT.md)<[`BaseCharacter`](../classes/BaseCharacter.md)\>

if not null will be invoked when character is initialized

#### Defined in

spark.procedural-animations.base-character.ts:99

## Accessors

### jointsData

• `get` **jointsData**(): `Object`

JointData by joint name

#### Returns

`Object`

#### Defined in

spark.procedural-animations.base-character.ts:79

___

### jointsMap

• `get` **jointsMap**(): `Object`

joint name hyerarchy map

#### Returns

`Object`

#### Defined in

spark.procedural-animations.base-character.ts:83

___

### reverseJointsMap

• `get` **reverseJointsMap**(): `Object`

reversed joint name hyerarchy map

#### Returns

`Object`

#### Defined in

spark.procedural-animations.base-character.ts:87

___

### type

• `get` **type**(): `string`

characterb type

#### Returns

`string`

#### Defined in

spark.procedural-animations.base-character.ts:91
