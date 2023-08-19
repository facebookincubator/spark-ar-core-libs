[spark-procedural-animations](../README.md) / [Exports](../modules.md) / QtReadonly

# Class: QtReadonly

## Implements

- [`IQtReadonly`](../interfaces/IQtReadonly.md)

## Table of contents

### Constructors

- [constructor](QtReadonly.md#constructor)

### Properties

- [\_w](QtReadonly.md#_w)
- [\_x](QtReadonly.md#_x)
- [\_y](QtReadonly.md#_y)
- [\_z](QtReadonly.md#_z)

### Accessors

- [back](QtReadonly.md#back)
- [bk](QtReadonly.md#bk)
- [dn](QtReadonly.md#dn)
- [down](QtReadonly.md#down)
- [ensureReadonly](QtReadonly.md#ensurereadonly)
- [ensureWritable](QtReadonly.md#ensurewritable)
- [forward](QtReadonly.md#forward)
- [fw](QtReadonly.md#fw)
- [horzFw](QtReadonly.md#horzfw)
- [left](QtReadonly.md#left)
- [lt](QtReadonly.md#lt)
- [normalized](QtReadonly.md#normalized)
- [right](QtReadonly.md#right)
- [rt](QtReadonly.md#rt)
- [up](QtReadonly.md#up)
- [w](QtReadonly.md#w)
- [x](QtReadonly.md#x)
- [y](QtReadonly.md#y)
- [z](QtReadonly.md#z)

### Methods

- [add](QtReadonly.md#add)
- [clone](QtReadonly.md#clone)
- [cloneAsReadonly](QtReadonly.md#cloneasreadonly)
- [cloneAsWritable](QtReadonly.md#cloneaswritable)
- [degreesTo](QtReadonly.md#degreesto)
- [dot](QtReadonly.md#dot)
- [getByIndex](QtReadonly.md#getbyindex)
- [invert](QtReadonly.md#invert)
- [isEqual](QtReadonly.md#isequal)
- [mul](QtReadonly.md#mul)
- [mulBy](QtReadonly.md#mulby)
- [mulV3](QtReadonly.md#mulv3)
- [rotateTo](QtReadonly.md#rotateto)
- [toAngleAxis](QtReadonly.md#toangleaxis)
- [toEuler](QtReadonly.md#toeuler)
- [toGlobal](QtReadonly.md#toglobal)
- [toLocal](QtReadonly.md#tolocal)
- [toString](QtReadonly.md#tostring)
- [toStringRoundTo](QtReadonly.md#tostringroundto)

## Constructors

### constructor

• **new QtReadonly**(`x?`, `y?`, `z?`, `w?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `0` |
| `y` | `number` | `0` |
| `z` | `number` | `0` |
| `w` | `number` | `1` |

#### Defined in

spark.procedural-animations.math-3d.ts:2781

## Properties

### \_w

• `Private` `Readonly` **\_w**: `number`

#### Defined in

spark.procedural-animations.math-3d.ts:2780

___

### \_x

• `Private` `Readonly` **\_x**: `number`

#### Defined in

spark.procedural-animations.math-3d.ts:2777

___

### \_y

• `Private` `Readonly` **\_y**: `number`

#### Defined in

spark.procedural-animations.math-3d.ts:2778

___

### \_z

• `Private` `Readonly` **\_z**: `number`

#### Defined in

spark.procedural-animations.math-3d.ts:2779

## Accessors

### back

• `get` **back**(): [`V3`](V3.md)

Computes back direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.back

#### Defined in

spark.procedural-animations.math-3d.ts:2832

___

### bk

• `get` **bk**(): [`V3`](V3.md)

Computes back direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.bk

#### Defined in

spark.procedural-animations.math-3d.ts:2826

___

### dn

• `get` **dn**(): [`V3`](V3.md)

Computes down direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.dn

#### Defined in

spark.procedural-animations.math-3d.ts:2844

___

### down

• `get` **down**(): [`V3`](V3.md)

Computes down direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.down

#### Defined in

spark.procedural-animations.math-3d.ts:2850

___

### ensureReadonly

• `get` **ensureReadonly**(): [`QtReadonly`](QtReadonly.md)

returns reference to itself, implementation of IQtReadonly interface

#### Returns

[`QtReadonly`](QtReadonly.md)

#### Implementation of

IQtReadonly.ensureReadonly

#### Defined in

spark.procedural-animations.math-3d.ts:2931

___

### ensureWritable

• `get` **ensureWritable**(): [`Qt`](Qt.md)

Creates new writable quaternion, implementation of IQtReadonly interface

#### Returns

[`Qt`](Qt.md)

#### Implementation of

IQtReadonly.ensureWritable

#### Defined in

spark.procedural-animations.math-3d.ts:2925

___

### forward

• `get` **forward**(): [`V3`](V3.md)

Computes forward direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.forward

#### Defined in

spark.procedural-animations.math-3d.ts:2820

___

### fw

• `get` **fw**(): [`V3`](V3.md)

Computes forward direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.fw

#### Defined in

spark.procedural-animations.math-3d.ts:2814

___

### horzFw

• `get` **horzFw**(): [`V3`](V3.md)

Computes horizontal forward direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.horzFw

#### Defined in

spark.procedural-animations.math-3d.ts:2880

___

### left

• `get` **left**(): [`V3`](V3.md)

Computes left direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.left

#### Defined in

spark.procedural-animations.math-3d.ts:2862

___

### lt

• `get` **lt**(): [`V3`](V3.md)

Computes left direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.lt

#### Defined in

spark.procedural-animations.math-3d.ts:2856

___

### normalized

• `get` **normalized**(): [`Qt`](Qt.md)

Creates new normalized unit quaternion, from the current quaternion

#### Returns

[`Qt`](Qt.md)

#### Implementation of

IQtReadonly.normalized

#### Defined in

spark.procedural-animations.math-3d.ts:2950

___

### right

• `get` **right**(): [`V3`](V3.md)

Computes right direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.right

#### Defined in

spark.procedural-animations.math-3d.ts:2874

___

### rt

• `get` **rt**(): [`V3`](V3.md)

Computes right direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.rt

#### Defined in

spark.procedural-animations.math-3d.ts:2868

___

### up

• `get` **up**(): [`V3`](V3.md)

Computes up direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.up

#### Defined in

spark.procedural-animations.math-3d.ts:2838

___

### w

• `get` **w**(): `number`

Gets w value

#### Returns

`number`

#### Implementation of

IQtReadonly.w

#### Defined in

spark.procedural-animations.math-3d.ts:2808

___

### x

• `get` **x**(): `number`

Gets x value

#### Returns

`number`

#### Implementation of

IQtReadonly.x

#### Defined in

spark.procedural-animations.math-3d.ts:2790

___

### y

• `get` **y**(): `number`

Gets y value

#### Returns

`number`

#### Implementation of

IQtReadonly.y

#### Defined in

spark.procedural-animations.math-3d.ts:2796

___

### z

• `get` **z**(): `number`

Gets z value

#### Returns

`number`

#### Implementation of

IQtReadonly.z

#### Defined in

spark.procedural-animations.math-3d.ts:2802

## Methods

### add

▸ **add**(`other`): [`Qt`](Qt.md)

Returns new quaternion that represents addition to the current quaternion of another quaternion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | another quaternion |

#### Returns

[`Qt`](Qt.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[add](../interfaces/IQtReadonly.md#add)

#### Defined in

spark.procedural-animations.math-3d.ts:3043

___

### clone

▸ **clone**(): [`QtReadonly`](QtReadonly.md)

Clones quaternion

#### Returns

[`QtReadonly`](QtReadonly.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3036

___

### cloneAsReadonly

▸ **cloneAsReadonly**(): [`IQtReadonly`](../interfaces/IQtReadonly.md)

Clones as readonly, implementation of IQtReadonly interface

#### Returns

[`IQtReadonly`](../interfaces/IQtReadonly.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[cloneAsReadonly](../interfaces/IQtReadonly.md#cloneasreadonly)

#### Defined in

spark.procedural-animations.math-3d.ts:2907

___

### cloneAsWritable

▸ **cloneAsWritable**(): [`Qt`](Qt.md)

Clones as writable, implementation of IQtReadonly interface

#### Returns

[`Qt`](Qt.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[cloneAsWritable](../interfaces/IQtReadonly.md#cloneaswritable)

#### Defined in

spark.procedural-animations.math-3d.ts:2901

___

### degreesTo

▸ **degreesTo**(`other`): `number`

Degrees rotation to another quaternion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | another quaternion |

#### Returns

`number`

degrees rotation

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[degreesTo](../interfaces/IQtReadonly.md#degreesto)

#### Defined in

spark.procedural-animations.math-3d.ts:3020

___

### dot

▸ **dot**(`other`): `number`

Dot product with another quaternion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | quaternion to dot with |

#### Returns

`number`

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[dot](../interfaces/IQtReadonly.md#dot)

#### Defined in

spark.procedural-animations.math-3d.ts:3012

___

### getByIndex

▸ **getByIndex**(`index`): `number`

Gets value by index, 0=x, 1=y, 2=z, 3=w

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`number`

value

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[getByIndex](../interfaces/IQtReadonly.md#getbyindex)

#### Defined in

spark.procedural-animations.math-3d.ts:2915

___

### invert

▸ **invert**(): [`Qt`](Qt.md)

Returns new quaternion that represents invertion of current quaternion

#### Returns

[`Qt`](Qt.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[invert](../interfaces/IQtReadonly.md#invert)

#### Defined in

spark.procedural-animations.math-3d.ts:2991

___

### isEqual

▸ **isEqual**(`other`): `boolean`

Determines whether is equal to another quaternion within delta 0.0000001

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | other quaternion |

#### Returns

`boolean`

true if equal

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[isEqual](../interfaces/IQtReadonly.md#isequal)

#### Defined in

spark.procedural-animations.math-3d.ts:2939

___

### mul

▸ **mul**(`rhs`): [`Qt`](Qt.md)

Returns new quaternion that represents multiplication of the current quaternion by another quaternion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | quaternion to multiply by |

#### Returns

[`Qt`](Qt.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[mul](../interfaces/IQtReadonly.md#mul)

#### Defined in

spark.procedural-animations.math-3d.ts:2998

___

### mulBy

▸ **mulBy**(`n`): [`Qt`](Qt.md)

Returns new quaternion that represents multiplication of the current quaternion by numeric value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numeric value to multiply by |

#### Returns

[`Qt`](Qt.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[mulBy](../interfaces/IQtReadonly.md#mulby)

#### Defined in

spark.procedural-animations.math-3d.ts:3030

___

### mulV3

▸ **mulV3**(`v`): [`V3`](V3.md)

Returns new quaternion that represents multiplication of the current quaternion by another quaternion

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[mulV3](../interfaces/IQtReadonly.md#mulv3)

#### Defined in

spark.procedural-animations.math-3d.ts:3050

___

### rotateTo

▸ **rotateTo**(`q2`, `t`): [`Qt`](Qt.md)

Returns new quaternion that represents spherical linear interpolation from one rotation to another

#### Parameters

| Name | Type |
| :------ | :------ |
| `q2` | [`IQtReadonly`](../interfaces/IQtReadonly.md) |
| `t` | `number` |

#### Returns

[`Qt`](Qt.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[rotateTo](../interfaces/IQtReadonly.md#rotateto)

#### Defined in

spark.procedural-animations.math-3d.ts:2973

___

### toAngleAxis

▸ **toAngleAxis**(): [`number`, [`V3`](V3.md)]

Deconstructs this quaternion into its individual components: axis and degrees rotation

#### Returns

[`number`, [`V3`](V3.md)]

tuple of degrees and axis

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[toAngleAxis](../interfaces/IQtReadonly.md#toangleaxis)

#### Defined in

spark.procedural-animations.math-3d.ts:3005

___

### toEuler

▸ **toEuler**(): [`V3`](V3.md)

Returns new quaternion that represents converts quaternion to vector representation of euler angles

#### Returns

[`V3`](V3.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[toEuler](../interfaces/IQtReadonly.md#toeuler)

#### Defined in

spark.procedural-animations.math-3d.ts:2967

___

### toGlobal

▸ **toGlobal**(`parent`): [`Qt`](Qt.md)

Returns new quaternion that represents convertion of local rotation to global providing the parent

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`IQtReadonly`](../interfaces/IQtReadonly.md) |

#### Returns

[`Qt`](Qt.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[toGlobal](../interfaces/IQtReadonly.md#toglobal)

#### Defined in

spark.procedural-animations.math-3d.ts:2979

___

### toLocal

▸ **toLocal**(`parent`): [`Qt`](Qt.md)

Returns new quaternion that represents convertion of global rotation to local providing the parent

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`IQtReadonly`](../interfaces/IQtReadonly.md) |

#### Returns

[`Qt`](Qt.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[toLocal](../interfaces/IQtReadonly.md#tolocal)

#### Defined in

spark.procedural-animations.math-3d.ts:2985

___

### toString

▸ **toString**(): `string`

returns string representation of this quaternion

#### Returns

`string`

#### Defined in

spark.procedural-animations.math-3d.ts:2886

___

### toStringRoundTo

▸ **toStringRoundTo**(`n`): `string`

returns string representation of this quaternion rounded to n decimal places

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | number of decimal places to round to |

#### Returns

`string`

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[toStringRoundTo](../interfaces/IQtReadonly.md#tostringroundto)

#### Defined in

spark.procedural-animations.math-3d.ts:2893
