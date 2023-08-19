[spark-procedural-animations](../README.md) / [Exports](../modules.md) / JointData

# Class: JointData

Joint data

## Table of contents

### Constructors

- [constructor](JointData.md#constructor)

### Properties

- [adjustRot](JointData.md#adjustrot)
- [iniPos](JointData.md#inipos)
- [iniRot](JointData.md#inirot)
- [name](JointData.md#name)
- [viewFw](JointData.md#viewfw)
- [viewLookAt](JointData.md#viewlookat)
- [viewUp](JointData.md#viewup)

## Constructors

### constructor

• **new JointData**(`name`, `viewFw`, `viewUp`, `viewLookAt`, `adjustRot?`, `iniPos?`, `iniRot?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `viewFw` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |
| `viewUp` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |
| `viewLookAt` | [`ILookAtFunc`](../interfaces/ILookAtFunc.md) |
| `adjustRot?` | [`IQtReadonly`](../interfaces/IQtReadonly.md) |
| `iniPos?` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |
| `iniRot?` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |

#### Defined in

spark.procedural-animations.base-character.ts:62

## Properties

### adjustRot

• `Optional` `Readonly` **adjustRot**: [`IQtReadonly`](../interfaces/IQtReadonly.md)

#### Defined in

spark.procedural-animations.base-character.ts:67

___

### iniPos

• `Optional` `Readonly` **iniPos**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.base-character.ts:68

___

### iniRot

• `Optional` `Readonly` **iniRot**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.base-character.ts:69

___

### name

• `Readonly` **name**: `string`

#### Defined in

spark.procedural-animations.base-character.ts:63

___

### viewFw

• `Readonly` **viewFw**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.base-character.ts:64

___

### viewLookAt

• `Readonly` **viewLookAt**: [`ILookAtFunc`](../interfaces/ILookAtFunc.md)

#### Defined in

spark.procedural-animations.base-character.ts:66

___

### viewUp

• `Readonly` **viewUp**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.base-character.ts:65
