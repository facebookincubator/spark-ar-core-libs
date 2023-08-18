[spark-procedural-animations](../README.md) / [Exports](../modules.md) / MixamoConfig

# Class: MixamoConfig

Character configuration

## Implements

- [`ICharacterConfig`](../interfaces/ICharacterConfig.md)

## Table of contents

### Constructors

- [constructor](MixamoConfig.md#constructor)

### Properties

- [\_jointsData](MixamoConfig.md#_jointsdata)
- [\_jointsMap](MixamoConfig.md#_jointsmap)
- [\_reverseJointsMap](MixamoConfig.md#_reversejointsmap)
- [adjustRotAnkleL](MixamoConfig.md#adjustrotanklel)
- [adjustRotAnkleR](MixamoConfig.md#adjustrotankler)
- [adjustRotShoulderL](MixamoConfig.md#adjustrotshoulderl)
- [adjustRotShoulderR](MixamoConfig.md#adjustrotshoulderr)
- [armRestFromDownDegrees](MixamoConfig.md#armrestfromdowndegrees)
- [initialize](MixamoConfig.md#initialize)

### Accessors

- [jointsData](MixamoConfig.md#jointsdata)
- [jointsMap](MixamoConfig.md#jointsmap)
- [reverseJointsMap](MixamoConfig.md#reversejointsmap)
- [type](MixamoConfig.md#type)

## Constructors

### constructor

• **new MixamoConfig**()

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1207

## Properties

### \_jointsData

• `Private` `Readonly` **\_jointsData**: `Object`

#### Index signature

▪ [key: `string`]: [`JointData`](JointData.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1173

___

### \_jointsMap

• `Private` `Readonly` **\_jointsMap**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1174

___

### \_reverseJointsMap

• `Private` `Readonly` **\_reverseJointsMap**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1175

___

### adjustRotAnkleL

• `Private` `Readonly` **adjustRotAnkleL**: [`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1200

___

### adjustRotAnkleR

• `Private` `Readonly` **adjustRotAnkleR**: [`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1191

___

### adjustRotShoulderL

• `Private` `Readonly` **adjustRotShoulderL**: [`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1187

___

### adjustRotShoulderR

• `Private` `Readonly` **adjustRotShoulderR**: [`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1179

___

### armRestFromDownDegrees

• **armRestFromDownDegrees**: `number` = `7`

arm rest from down degrees

#### Implementation of

[ICharacterConfig](../interfaces/ICharacterConfig.md).[armRestFromDownDegrees](../interfaces/ICharacterConfig.md#armrestfromdowndegrees)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1528

___

### initialize

• **initialize**: [`IActionOfT`](../interfaces/IActionOfT.md)<[`BaseCharacter`](BaseCharacter.md)\> = `null`

if not null will be invoked when character is initialized

#### Implementation of

[ICharacterConfig](../interfaces/ICharacterConfig.md).[initialize](../interfaces/ICharacterConfig.md#initialize)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1515

## Accessors

### jointsData

• `get` **jointsData**(): `Object`

JointData by joint name

#### Returns

`Object`

#### Implementation of

ICharacterConfig.jointsData

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1516

___

### jointsMap

• `get` **jointsMap**(): `Object`

joint name hyerarchy map

#### Returns

`Object`

#### Implementation of

ICharacterConfig.jointsMap

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1519

___

### reverseJointsMap

• `get` **reverseJointsMap**(): `Object`

reversed joint name hyerarchy map

#### Returns

`Object`

#### Implementation of

ICharacterConfig.reverseJointsMap

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1522

___

### type

• `get` **type**(): `string`

characterb type

#### Returns

`string`

#### Implementation of

ICharacterConfig.type

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1525
