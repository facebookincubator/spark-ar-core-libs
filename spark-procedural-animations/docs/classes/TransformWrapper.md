[spark-procedural-animations](../README.md) / [Exports](../modules.md) / TransformWrapper

# Class: TransformWrapper

## Table of contents

### Constructors

- [constructor](TransformWrapper.md#constructor)

### Properties

- [\_ssPosX](TransformWrapper.md#_ssposx)
- [\_ssPosY](TransformWrapper.md#_ssposy)
- [\_ssPosZ](TransformWrapper.md#_ssposz)
- [\_ssRotX](TransformWrapper.md#_ssrotx)
- [\_ssRotY](TransformWrapper.md#_ssroty)
- [\_ssRotZ](TransformWrapper.md#_ssrotz)
- [\_ssScaX](TransformWrapper.md#_ssscax)
- [\_ssScaY](TransformWrapper.md#_ssscay)
- [\_ssScaZ](TransformWrapper.md#_ssscaz)
- [obj](TransformWrapper.md#obj)

### Methods

- [assignSignals](TransformWrapper.md#assignsignals)
- [setPos](TransformWrapper.md#setpos)
- [setRot](TransformWrapper.md#setrot)
- [setSca](TransformWrapper.md#setsca)

## Constructors

### constructor

• **new TransformWrapper**(`obj`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `SceneObjectBase` |

#### Defined in

spark.procedural-animations.objects.ts:602

## Properties

### \_ssPosX

• `Private` **\_ssPosX**: `ScalarSignalSource`

Creates an transform wrapper around object of type SceneObjectBase

**`Param`**

object of type SceneObjectBase

#### Defined in

spark.procedural-animations.objects.ts:593

___

### \_ssPosY

• `Private` **\_ssPosY**: `ScalarSignalSource`

#### Defined in

spark.procedural-animations.objects.ts:594

___

### \_ssPosZ

• `Private` **\_ssPosZ**: `ScalarSignalSource`

#### Defined in

spark.procedural-animations.objects.ts:595

___

### \_ssRotX

• `Private` **\_ssRotX**: `ScalarSignalSource`

#### Defined in

spark.procedural-animations.objects.ts:596

___

### \_ssRotY

• `Private` **\_ssRotY**: `ScalarSignalSource`

#### Defined in

spark.procedural-animations.objects.ts:597

___

### \_ssRotZ

• `Private` **\_ssRotZ**: `ScalarSignalSource`

#### Defined in

spark.procedural-animations.objects.ts:598

___

### \_ssScaX

• `Private` **\_ssScaX**: `ScalarSignalSource`

#### Defined in

spark.procedural-animations.objects.ts:599

___

### \_ssScaY

• `Private` **\_ssScaY**: `ScalarSignalSource`

#### Defined in

spark.procedural-animations.objects.ts:600

___

### \_ssScaZ

• `Private` **\_ssScaZ**: `ScalarSignalSource`

#### Defined in

spark.procedural-animations.objects.ts:601

___

### obj

• `Private` **obj**: `SceneObjectBase`

#### Defined in

spark.procedural-animations.objects.ts:602

## Methods

### assignSignals

▸ **assignSignals**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:664

___

### setPos

▸ **setPos**(`p`): `void`

Sets object position

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | position |

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:620

___

### setRot

▸ **setRot**(`p`): `void`

Sets object rotation as euler

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | rotation as euler |

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:636

___

### setSca

▸ **setSca**(`p`): `void`

Sets object scale

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | scale |

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:652
