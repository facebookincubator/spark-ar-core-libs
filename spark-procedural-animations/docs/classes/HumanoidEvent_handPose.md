[spark-procedural-animations](../README.md) / [Exports](../modules.md) / HumanoidEvent\_handPose

# Class: HumanoidEvent\_handPose

IBaseEvent - interface that contains event name and data

## Implements

- [`IBaseEvent`](../interfaces/IBaseEvent.md)

## Table of contents

### Constructors

- [constructor](HumanoidEvent_handPose.md#constructor)

### Properties

- [func](HumanoidEvent_handPose.md#func)
- [label](HumanoidEvent_handPose.md#label)
- [pose](HumanoidEvent_handPose.md#pose)
- [seconds](HumanoidEvent_handPose.md#seconds)
- [side](HumanoidEvent_handPose.md#side)

### Accessors

- [eventName](HumanoidEvent_handPose.md#eventname)

## Constructors

### constructor

• **new HumanoidEvent_handPose**(`label?`, `side?`, `pose?`, `seconds?`, `func?`)

Creates an instance of humanoid event hand pose.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `label?` | `string` | `'*'` | character label, if "*" is used, then it will apply to all characters |
| `side?` | `string` | `'*'` | "L" pr "R", if "*" is used, then it will apply to both hands |
| `pose?` | `string` | `HandPose.initial` | hand pose (from enum HandPose) |
| `seconds?` | `number` | `0.5` | seconds to take the pose |
| `func?` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<`number`, `number`\> | `null` | function to control pose taking curve |

#### Defined in

spark.procedural-animations.humanoid-characters.ts:820

## Properties

### func

• `Readonly` **func**: [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<`number`, `number`\> = `null`

function to control pose taking curve

#### Defined in

spark.procedural-animations.humanoid-characters.ts:825

___

### label

• `Readonly` **label**: `string` = `'*'`

character label, if "*" is used, then it will apply to all characters

#### Defined in

spark.procedural-animations.humanoid-characters.ts:821

___

### pose

• `Readonly` **pose**: `string` = `HandPose.initial`

hand pose (from enum HandPose)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:823

___

### seconds

• `Readonly` **seconds**: `number` = `0.5`

seconds to take the pose

#### Defined in

spark.procedural-animations.humanoid-characters.ts:824

___

### side

• `Readonly` **side**: `string` = `'*'`

"L" pr "R", if "*" is used, then it will apply to both hands

#### Defined in

spark.procedural-animations.humanoid-characters.ts:822

## Accessors

### eventName

• `get` **eventName**(): `string`

#### Returns

`string`

#### Implementation of

IBaseEvent.eventName

#### Defined in

spark.procedural-animations.humanoid-characters.ts:827
