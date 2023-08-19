[spark-procedural-animations](../README.md) / [Exports](../modules.md) / ViewToV3

# Class: ViewToV3

## Table of contents

### Constructors

- [constructor](ViewToV3.md#constructor)

### Properties

- [\_val](ViewToV3.md#_val)
- [func](ViewToV3.md#func)
- [isDynamic](ViewToV3.md#isdynamic)
- [normalizeByFactor](ViewToV3.md#normalizebyfactor)
- [space](ViewToV3.md#space)
- [view](ViewToV3.md#view)

### Accessors

- [val](ViewToV3.md#val)

### Methods

- [compute](ViewToV3.md#compute)

## Constructors

### constructor

• **new ViewToV3**(`view`, `func`, `isDynamic`, `normalizeByFactor`, `space`)

Creates an instance of view to v3

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `view` | [`ObjView`](ObjView.md) | object view |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`V3`](V3.md)\> | factory function, takes object view as argument and returns vector |
| `isDynamic` | `boolean` | if set to true creation function will be invoked on each frame as oposed to on initialization |
| `normalizeByFactor` | `boolean` | when set to false will not apply object factor normalization (by default true) |
| `space` | [`Space`](../enums/Space.md) | space where object should be placed (local or world) |

#### Defined in

spark.procedural-animations.objects.ts:2349

## Properties

### \_val

• `Private` `Readonly` **\_val**: [`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:2340

___

### func

• `Private` `Readonly` **func**: [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`V3`](V3.md)\>

factory function, takes object view as argument and returns vector

#### Defined in

spark.procedural-animations.objects.ts:2351

___

### isDynamic

• `Private` `Readonly` **isDynamic**: `boolean`

if set to true creation function will be invoked on each frame as oposed to on initialization

#### Defined in

spark.procedural-animations.objects.ts:2352

___

### normalizeByFactor

• `Private` `Readonly` **normalizeByFactor**: `boolean`

when set to false will not apply object factor normalization (by default true)

#### Defined in

spark.procedural-animations.objects.ts:2353

___

### space

• `Private` `Readonly` **space**: [`Space`](../enums/Space.md)

space where object should be placed (local or world)

#### Defined in

spark.procedural-animations.objects.ts:2354

___

### view

• `Private` `Readonly` **view**: [`ObjView`](ObjView.md)

object view

#### Defined in

spark.procedural-animations.objects.ts:2350

## Accessors

### val

• `get` **val**(): [`V3`](V3.md)

Gets V3 computed each time if dynamic or cached otherwise

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:2361

## Methods

### compute

▸ `Private` **compute**(): [`V3`](V3.md)

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.objects.ts:2364
