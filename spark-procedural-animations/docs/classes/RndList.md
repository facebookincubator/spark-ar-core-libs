[spark-procedural-animations](../README.md) / [Exports](../modules.md) / RndList

# Class: RndList<T\>

A list of randoim values of generic type T

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](RndList.md#constructor)

### Properties

- [\_i](RndList.md#_i)
- [list](RndList.md#list)
- [shuffleEnabled](RndList.md#shuffleenabled)

### Methods

- [checkIndex](RndList.md#checkindex)
- [getNext](RndList.md#getnext)
- [getNextWhere](RndList.md#getnextwhere)

## Constructors

### constructor

• **new RndList**<`T`\>(`list`, `shuffleEnabled?`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `list` | `T`[] | `undefined` |
| `shuffleEnabled` | `boolean` | `true` |

#### Defined in

spark.procedural-animations.core.ts:726

## Properties

### \_i

• `Private` **\_i**: `number`

#### Defined in

spark.procedural-animations.core.ts:725

___

### list

• **list**: `T`[]

#### Defined in

spark.procedural-animations.core.ts:726

___

### shuffleEnabled

• `Readonly` **shuffleEnabled**: `boolean` = `true`

#### Defined in

spark.procedural-animations.core.ts:726

## Methods

### checkIndex

▸ `Private` **checkIndex**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.core.ts:753

___

### getNext

▸ **getNext**(): `T`

Returns next random value of the list, after using all values shuffles the list

#### Returns

`T`

#### Defined in

spark.procedural-animations.core.ts:734

___

### getNextWhere

▸ **getNextWhere**(`condition`): `T`

Returns next random value of the list with condition, after using all values shuffles the list

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<`T`, `boolean`\> |

#### Returns

`T`

#### Defined in

spark.procedural-animations.core.ts:741
