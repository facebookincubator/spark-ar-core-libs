[spark-procedural-animations](../README.md) / [Exports](../modules.md) / V2Readonly

# Class: V2Readonly

## Implements

- [`IV2Readonly`](../interfaces/IV2Readonly.md)

## Table of contents

### Constructors

- [constructor](V2Readonly.md#constructor)

### Properties

- [\_x](V2Readonly.md#_x)
- [\_y](V2Readonly.md#_y)

### Accessors

- [magnitude](V2Readonly.md#magnitude)
- [squareMagnitude](V2Readonly.md#squaremagnitude)
- [x](V2Readonly.md#x)
- [y](V2Readonly.md#y)

### Methods

- [add](V2Readonly.md#add)
- [addNumber](V2Readonly.md#addnumber)
- [clone](V2Readonly.md#clone)
- [cloneAsWritable](V2Readonly.md#cloneaswritable)
- [degreesTo](V2Readonly.md#degreesto)
- [dirTo](V2Readonly.md#dirto)
- [distTo](V2Readonly.md#distto)
- [div](V2Readonly.md#div)
- [divBy](V2Readonly.md#divby)
- [dot](V2Readonly.md#dot)
- [ensureWritable](V2Readonly.md#ensurewritable)
- [hasZero](V2Readonly.md#haszero)
- [isEqual](V2Readonly.md#isequal)
- [isZero](V2Readonly.md#iszero)
- [moveTo](V2Readonly.md#moveto)
- [moveTowards](V2Readonly.md#movetowards)
- [mul](V2Readonly.md#mul)
- [mulBy](V2Readonly.md#mulby)
- [squaredDistTo](V2Readonly.md#squareddistto)
- [sub](V2Readonly.md#sub)
- [toString](V2Readonly.md#tostring)
- [toStringRoundTo](V2Readonly.md#tostringroundto)
- [normalizeXY](V2Readonly.md#normalizexy)

## Constructors

### constructor

• **new V2Readonly**(`x?`, `y?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `0` |
| `y` | `number` | `0` |

#### Defined in

spark.procedural-animations.math-2d.ts:92

## Properties

### \_x

• `Private` `Readonly` **\_x**: `number`

#### Defined in

spark.procedural-animations.math-2d.ts:90

___

### \_y

• `Private` `Readonly` **\_y**: `number`

#### Defined in

spark.procedural-animations.math-2d.ts:91

## Accessors

### magnitude

• `get` **magnitude**(): `number`

Gets the vector length

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-2d.ts:142

___

### squareMagnitude

• `get` **squareMagnitude**(): `number`

Gets the square length of the vector

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-2d.ts:148

___

### x

• `get` **x**(): `number`

Gets x value

#### Returns

`number`

#### Implementation of

IV2Readonly.x

#### Defined in

spark.procedural-animations.math-2d.ts:99

___

### y

• `get` **y**(): `number`

Gets y value

#### Returns

`number`

#### Implementation of

IV2Readonly.y

#### Defined in

spark.procedural-animations.math-2d.ts:105

## Methods

### add

▸ **add**(`other`): [`V2`](V2.md)

Returns new vector that represents addition of another vector to the current vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | another vector |

#### Returns

[`V2`](V2.md)

#### Implementation of

[IV2Readonly](../interfaces/IV2Readonly.md).[add](../interfaces/IV2Readonly.md#add)

#### Defined in

spark.procedural-animations.math-2d.ts:277

___

### addNumber

▸ **addNumber**(`n`): [`V2`](V2.md)

Returns new vector that represents addition of a numberic value to the current vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numberiic value to add |

#### Returns

[`V2`](V2.md)

#### Implementation of

[IV2Readonly](../interfaces/IV2Readonly.md).[addNumber](../interfaces/IV2Readonly.md#addnumber)

#### Defined in

spark.procedural-animations.math-2d.ts:270

___

### clone

▸ **clone**(): [`V2Readonly`](V2Readonly.md)

Clones the current vector

#### Returns

[`V2Readonly`](V2Readonly.md)

#### Defined in

spark.procedural-animations.math-2d.ts:290

___

### cloneAsWritable

▸ **cloneAsWritable**(): [`V2`](V2.md)

Clones the readonly object as writable

#### Returns

[`V2`](V2.md)

#### Implementation of

[IV2Readonly](../interfaces/IV2Readonly.md).[cloneAsWritable](../interfaces/IV2Readonly.md#cloneaswritable)

#### Defined in

spark.procedural-animations.math-2d.ts:117

___

### degreesTo

▸ **degreesTo**(`rhs`): `number`

returns degrees to another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | another vector |

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-2d.ts:206

___

### dirTo

▸ **dirTo**(`target`): [`V2Readonly`](V2Readonly.md)

Returns unit 2D vector that represents direction towerds target vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | target vector |

#### Returns

[`V2Readonly`](V2Readonly.md)

#### Defined in

spark.procedural-animations.math-2d.ts:187

___

### distTo

▸ **distTo**(`other`): `number`

Computes distance to another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | another vector |

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-2d.ts:297

___

### div

▸ **div**(`other`): [`V2`](V2.md)

Returns new vector that represents division of current vector by another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | another vector |

#### Returns

[`V2`](V2.md)

#### Implementation of

[IV2Readonly](../interfaces/IV2Readonly.md).[div](../interfaces/IV2Readonly.md#div)

#### Defined in

spark.procedural-animations.math-2d.ts:240

___

### divBy

▸ **divBy**(`n`): [`V2`](V2.md)

Returns new vector that represents division of current vector by numberic value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numberiic value to divide by |

#### Returns

[`V2`](V2.md)

#### Implementation of

[IV2Readonly](../interfaces/IV2Readonly.md).[divBy](../interfaces/IV2Readonly.md#divby)

#### Defined in

spark.procedural-animations.math-2d.ts:249

___

### dot

▸ **dot**(`rhs`): `number`

Returns dot product with another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | another vector |

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-2d.ts:197

___

### ensureWritable

▸ **ensureWritable**(): [`V2`](V2.md)

Clones the readonly object as writable

#### Returns

[`V2`](V2.md)

#### Implementation of

[IV2Readonly](../interfaces/IV2Readonly.md).[ensureWritable](../interfaces/IV2Readonly.md#ensurewritable)

#### Defined in

spark.procedural-animations.math-2d.ts:123

___

### hasZero

▸ **hasZero**(): `boolean`

Determines whether any of the dimensions of the vector is zero

#### Returns

`boolean`

true if any of the dimensions is zero

#### Defined in

spark.procedural-animations.math-2d.ts:173

___

### isEqual

▸ **isEqual**(`other`): `boolean`

Determines whether is equal to another vector with delta 0.0000001

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | the other vector |

#### Returns

`boolean`

true if equal

#### Implementation of

[IV2Readonly](../interfaces/IV2Readonly.md).[isEqual](../interfaces/IV2Readonly.md#isequal)

#### Defined in

spark.procedural-animations.math-2d.ts:156

___

### isZero

▸ **isZero**(): `boolean`

Determines whether vector is with length zero

#### Returns

`boolean`

true if zero

#### Defined in

spark.procedural-animations.math-2d.ts:166

___

### moveTo

▸ **moveTo**(`target`, `t01`): [`V2`](V2.md)

Returns new vector that represents movement of current vectr towards target vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | another vector |
| `t01` | `number` | progress aproaching the other vector from 0 to 1 |

#### Returns

[`V2`](V2.md)

#### Implementation of

[IV2Readonly](../interfaces/IV2Readonly.md).[moveTo](../interfaces/IV2Readonly.md#moveto)

#### Defined in

spark.procedural-animations.math-2d.ts:218

___

### moveTowards

▸ **moveTowards**(`target`, `distance`): [`V2`](V2.md)

Returns new vector that represents movement of current vectr towards target vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | another vector |
| `distance` | `number` | distance to move in direction of target |

#### Returns

[`V2`](V2.md)

#### Implementation of

[IV2Readonly](../interfaces/IV2Readonly.md).[moveTowards](../interfaces/IV2Readonly.md#movetowards)

#### Defined in

spark.procedural-animations.math-2d.ts:228

___

### mul

▸ **mul**(`other`): [`V2`](V2.md)

Returns new vector that represents multiplication of current vector by another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | another vector |

#### Returns

[`V2`](V2.md)

#### Implementation of

[IV2Readonly](../interfaces/IV2Readonly.md).[mul](../interfaces/IV2Readonly.md#mul)

#### Defined in

spark.procedural-animations.math-2d.ts:256

___

### mulBy

▸ **mulBy**(`n`): [`V2`](V2.md)

Returns new vector that represents multiplication of current vector by numberic value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numberiic value to multiply by |

#### Returns

[`V2`](V2.md)

#### Implementation of

[IV2Readonly](../interfaces/IV2Readonly.md).[mulBy](../interfaces/IV2Readonly.md#mulby)

#### Defined in

spark.procedural-animations.math-2d.ts:263

___

### squaredDistTo

▸ **squaredDistTo**(`other`): `number`

Computes squared distance to another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | another vector |

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-2d.ts:306

___

### sub

▸ **sub**(`other`): [`V2`](V2.md)

Returns new vector that represents substraction of another vector from the current vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | another vector |

#### Returns

[`V2`](V2.md)

#### Implementation of

[IV2Readonly](../interfaces/IV2Readonly.md).[sub](../interfaces/IV2Readonly.md#sub)

#### Defined in

spark.procedural-animations.math-2d.ts:284

___

### toString

▸ **toString**(): `string`

Returns string representation

#### Returns

`string`

#### Defined in

spark.procedural-animations.math-2d.ts:111

___

### toStringRoundTo

▸ **toStringRoundTo**(`n`): `string`

returns string representation of the vector rounded to n decimals

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | number of decimal places |

#### Returns

`string`

#### Defined in

spark.procedural-animations.math-2d.ts:180

___

### normalizeXY

▸ `Static` **normalizeXY**(`vx`, `vy`): [`V2Readonly`](V2Readonly.md)

Normalizes 2D vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vx` | `number` | x value |
| `vy` | `number` | y value |

#### Returns

[`V2Readonly`](V2Readonly.md)

creates V2Readonly as normalized

#### Defined in

spark.procedural-animations.math-2d.ts:132
