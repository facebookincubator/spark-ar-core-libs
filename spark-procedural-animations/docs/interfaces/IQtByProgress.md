[spark-procedural-animations](../README.md) / [Exports](../modules.md) / IQtByProgress

# Interface: IQtByProgress

## Table of contents

### Accessors

- [space](IQtByProgress.md#space)
- [type](IQtByProgress.md#type)

### Methods

- [valueByProgress](IQtByProgress.md#valuebyprogress)

## Accessors

### space

• `get` **space**(): [`Space`](../enums/Space.md)

Gets local | world space

#### Returns

[`Space`](../enums/Space.md)

#### Defined in

spark.procedural-animations.objects.ts:89

• `set` **space**(`s`): `void`

Sets local | world space

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | [`Space`](../enums/Space.md) |

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:93

___

### type

• `get` **type**(): `string`

Type of progress

#### Returns

`string`

#### Defined in

spark.procedural-animations.objects.ts:85

## Methods

### valueByProgress

▸ **valueByProgress**(`tCycle`, `tMerge`): [`Qt`](../classes/Qt.md)

Invoke to apply progress

#### Parameters

| Name | Type |
| :------ | :------ |
| `tCycle` | `number` |
| `tMerge` | `number` |

#### Returns

[`Qt`](../classes/Qt.md)

#### Defined in

spark.procedural-animations.objects.ts:97
