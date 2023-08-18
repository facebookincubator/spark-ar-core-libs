[spark-procedural-animations](../README.md) / [Exports](../modules.md) / IV2Readonly

# Interface: IV2Readonly

## Implemented by

- [`V2`](../classes/V2.md)
- [`V2Readonly`](../classes/V2Readonly.md)

## Table of contents

### Accessors

- [x](IV2Readonly.md#x)
- [y](IV2Readonly.md#y)

### Methods

- [add](IV2Readonly.md#add)
- [addNumber](IV2Readonly.md#addnumber)
- [cloneAsWritable](IV2Readonly.md#cloneaswritable)
- [div](IV2Readonly.md#div)
- [divBy](IV2Readonly.md#divby)
- [ensureWritable](IV2Readonly.md#ensurewritable)
- [isEqual](IV2Readonly.md#isequal)
- [moveTo](IV2Readonly.md#moveto)
- [moveTowards](IV2Readonly.md#movetowards)
- [mul](IV2Readonly.md#mul)
- [mulBy](IV2Readonly.md#mulby)
- [sub](IV2Readonly.md#sub)

## Accessors

### x

• `get` **x**(): `number`

Gets x value

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-2d.ts:22

___

### y

• `get` **y**(): `number`

Gets y value

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-2d.ts:26

## Methods

### add

▸ **add**(`other`): [`V2`](../classes/V2.md)

Returns new vector that represents addition of another vector to the current vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IV2Readonly`](IV2Readonly.md) | another vector |

#### Returns

[`V2`](../classes/V2.md)

#### Defined in

spark.procedural-animations.math-2d.ts:82

___

### addNumber

▸ **addNumber**(`n`): [`V2`](../classes/V2.md)

Returns new vector that represents addition of a numberic value to the current vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numberiic value to add |

#### Returns

[`V2`](../classes/V2.md)

#### Defined in

spark.procedural-animations.math-2d.ts:77

___

### cloneAsWritable

▸ **cloneAsWritable**(): [`V2`](../classes/V2.md)

Clones the readonly object as writable

#### Returns

[`V2`](../classes/V2.md)

#### Defined in

spark.procedural-animations.math-2d.ts:30

___

### div

▸ **div**(`other`): [`V2`](../classes/V2.md)

Returns new vector that represents division of current vector by another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IV2Readonly`](IV2Readonly.md) | another vector |

#### Returns

[`V2`](../classes/V2.md)

#### Defined in

spark.procedural-animations.math-2d.ts:57

___

### divBy

▸ **divBy**(`n`): [`V2`](../classes/V2.md)

Returns new vector that represents division of current vector by numberic value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numberiic value to divide by |

#### Returns

[`V2`](../classes/V2.md)

#### Defined in

spark.procedural-animations.math-2d.ts:62

___

### ensureWritable

▸ **ensureWritable**(): [`V2`](../classes/V2.md)

Clones the readonly object as writable, or if it is already readonly returns reference

#### Returns

[`V2`](../classes/V2.md)

#### Defined in

spark.procedural-animations.math-2d.ts:34

___

### isEqual

▸ **isEqual**(`other`): `boolean`

Determines whether is equal to another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IV2Readonly`](IV2Readonly.md) | another vector |

#### Returns

`boolean`

true if equal

#### Defined in

spark.procedural-animations.math-2d.ts:40

___

### moveTo

▸ **moveTo**(`target`, `t01`): [`V2`](../classes/V2.md)

Creates another vector that represents movement (measured as fraction of the distance) of this vector towards a target vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`IV2Readonly`](IV2Readonly.md) | another vector |
| `t01` | `number` | progress aproaching another vector from 0 to 1 |

#### Returns

[`V2`](../classes/V2.md)

#### Defined in

spark.procedural-animations.math-2d.ts:46

___

### moveTowards

▸ **moveTowards**(`target`, `maxDistanceDelta`): [`V2`](../classes/V2.md)

Creates another vector that represents movement (measured as distance) of this vector towards a target vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`IV2Readonly`](IV2Readonly.md) | another vector |
| `maxDistanceDelta` | `number` | - |

#### Returns

[`V2`](../classes/V2.md)

#### Defined in

spark.procedural-animations.math-2d.ts:52

___

### mul

▸ **mul**(`other`): [`V2`](../classes/V2.md)

Returns new vector that represents multiplication of current vector by another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IV2Readonly`](IV2Readonly.md) | another vector |

#### Returns

[`V2`](../classes/V2.md)

#### Defined in

spark.procedural-animations.math-2d.ts:67

___

### mulBy

▸ **mulBy**(`n`): [`V2`](../classes/V2.md)

Returns new vector that represents multiplication of current vector by numberic value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numberiic value to multiply by |

#### Returns

[`V2`](../classes/V2.md)

#### Defined in

spark.procedural-animations.math-2d.ts:72

___

### sub

▸ **sub**(`other`): [`V2`](../classes/V2.md)

Returns new vector that represents substraction of another vector from the current vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IV2Readonly`](IV2Readonly.md) | another vector |

#### Returns

[`V2`](../classes/V2.md)

#### Defined in

spark.procedural-animations.math-2d.ts:87
