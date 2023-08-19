[spark-procedural-animations](../README.md) / [Exports](../modules.md) / ViewToQt

# Class: ViewToQt

## Table of contents

### Constructors

- [constructor](ViewToQt.md#constructor)

### Properties

- [\_val](ViewToQt.md#_val)
- [func](ViewToQt.md#func)
- [isDynamic](ViewToQt.md#isdynamic)
- [view](ViewToQt.md#view)

### Accessors

- [val](ViewToQt.md#val)

## Constructors

### constructor

• **new ViewToQt**(`view`, `func`, `isDynamic`)

Creates an instance of view to Qt

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `view` | [`ObjView`](ObjView.md) | object view |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`Qt`](Qt.md)\> | factory function, takes object view as argument and returns quaternion |
| `isDynamic` | `boolean` | if set to true creation function will be invoked on each frame as oposed to on initialization |

#### Defined in

spark.procedural-animations.objects.ts:2379

## Properties

### \_val

• `Private` `Readonly` **\_val**: [`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.objects.ts:2372

___

### func

• `Private` `Readonly` **func**: [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`Qt`](Qt.md)\>

factory function, takes object view as argument and returns quaternion

#### Defined in

spark.procedural-animations.objects.ts:2381

___

### isDynamic

• `Private` `Readonly` **isDynamic**: `boolean`

if set to true creation function will be invoked on each frame as oposed to on initialization

#### Defined in

spark.procedural-animations.objects.ts:2382

___

### view

• `Private` `Readonly` **view**: [`ObjView`](ObjView.md)

object view

#### Defined in

spark.procedural-animations.objects.ts:2380

## Accessors

### val

• `get` **val**(): [`IQtReadonly`](../interfaces/IQtReadonly.md)

Gets Qt computed each time if dynamic or cached otherwise

#### Returns

[`IQtReadonly`](../interfaces/IQtReadonly.md)

#### Defined in

spark.procedural-animations.objects.ts:2389
