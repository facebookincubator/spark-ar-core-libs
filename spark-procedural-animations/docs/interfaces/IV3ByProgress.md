[spark-procedural-animations](../README.md) / [Exports](../modules.md) / IV3ByProgress

# Interface: IV3ByProgress

## Table of contents

### Accessors

- [space](IV3ByProgress.md#space)
- [type](IV3ByProgress.md#type)

### Methods

- [valueByProgress](IV3ByProgress.md#valuebyprogress)

## Accessors

### space

• `get` **space**(): [`Space`](../enums/Space.md)

Gets local | world space

#### Returns

[`Space`](../enums/Space.md)

#### Defined in

spark.procedural-animations.objects.ts:71

• `set` **space**(`s`): `void`

Sets local | world space

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | [`Space`](../enums/Space.md) |

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:75

___

### type

• `get` **type**(): `string`

Type of progress

#### Returns

`string`

#### Defined in

spark.procedural-animations.objects.ts:67

## Methods

### valueByProgress

▸ **valueByProgress**(`tCycle`, `tMerge`): [`V3`](../classes/V3.md)

Invoke to apply progress

#### Parameters

| Name | Type |
| :------ | :------ |
| `tCycle` | `number` |
| `tMerge` | `number` |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.objects.ts:79
