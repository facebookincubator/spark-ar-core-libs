[spark-procedural-animations](../README.md) / [Exports](../modules.md) / Qt

# Class: Qt

## Implements

- [`IQtReadonly`](../interfaces/IQtReadonly.md)

## Table of contents

### Constructors

- [constructor](Qt.md#constructor)

### Properties

- [\_isChanged](Qt.md#_ischanged)
- [\_scopeId](Qt.md#_scopeid)
- [\_w](Qt.md#_w)
- [\_x](Qt.md#_x)
- [\_y](Qt.md#_y)
- [\_z](Qt.md#_z)
- [identity](Qt.md#identity)

### Accessors

- [back](Qt.md#back)
- [bk](Qt.md#bk)
- [dn](Qt.md#dn)
- [down](Qt.md#down)
- [ensureReadonly](Qt.md#ensurereadonly)
- [ensureWritable](Qt.md#ensurewritable)
- [forward](Qt.md#forward)
- [fw](Qt.md#fw)
- [horzFw](Qt.md#horzfw)
- [isChanged](Qt.md#ischanged)
- [left](Qt.md#left)
- [lt](Qt.md#lt)
- [normalized](Qt.md#normalized)
- [permanent](Qt.md#permanent)
- [readonly](Qt.md#readonly)
- [right](Qt.md#right)
- [rt](Qt.md#rt)
- [up](Qt.md#up)
- [w](Qt.md#w)
- [x](Qt.md#x)
- [y](Qt.md#y)
- [z](Qt.md#z)

### Methods

- [add](Qt.md#add)
- [add\_](Qt.md#add_)
- [clone](Qt.md#clone)
- [cloneAsReadonly](Qt.md#cloneasreadonly)
- [cloneAsWritable](Qt.md#cloneaswritable)
- [degreesTo](Qt.md#degreesto)
- [dot](Qt.md#dot)
- [getByIndex](Qt.md#getbyindex)
- [invert](Qt.md#invert)
- [invert\_](Qt.md#invert_)
- [isEqual](Qt.md#isequal)
- [markAsChanged\_](Qt.md#markaschanged_)
- [mul](Qt.md#mul)
- [mulBy](Qt.md#mulby)
- [mulBy\_](Qt.md#mulby_)
- [mulV3](Qt.md#mulv3)
- [mul\_](Qt.md#mul_)
- [normalize\_](Qt.md#normalize_)
- [processedChange\_](Qt.md#processedchange_)
- [rotateTo](Qt.md#rotateto)
- [setFromArrayWXYZ\_](Qt.md#setfromarraywxyz_)
- [setFrom\_](Qt.md#setfrom_)
- [setScope](Qt.md#setscope)
- [toAngleAxis](Qt.md#toangleaxis)
- [toEuler](Qt.md#toeuler)
- [toGlobal](Qt.md#toglobal)
- [toLocal](Qt.md#tolocal)
- [toString](Qt.md#tostring)
- [toStringRoundTo](Qt.md#tostringroundto)
- [create](Qt.md#create)
- [createPermanent](Qt.md#createpermanent)

## Constructors

### constructor

• `Private` **new Qt**(`x?`, `y?`, `z?`, `w?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `0` |
| `y` | `number` | `0` |
| `z` | `number` | `0` |
| `w` | `number` | `0` |

#### Defined in

spark.procedural-animations.math-3d.ts:3062

## Properties

### \_isChanged

• `Private` **\_isChanged**: `boolean`

#### Defined in

spark.procedural-animations.math-3d.ts:3059

___

### \_scopeId

• `Private` **\_scopeId**: `number`

#### Defined in

spark.procedural-animations.math-3d.ts:3060

___

### \_w

• `Private` **\_w**: `number`

#### Defined in

spark.procedural-animations.math-3d.ts:3058

___

### \_x

• `Private` **\_x**: `number`

#### Defined in

spark.procedural-animations.math-3d.ts:3055

___

### \_y

• `Private` **\_y**: `number`

#### Defined in

spark.procedural-animations.math-3d.ts:3056

___

### \_z

• `Private` **\_z**: `number`

#### Defined in

spark.procedural-animations.math-3d.ts:3057

___

### identity

▪ `Static` `Readonly` **identity**: [`QtReadonly`](QtReadonly.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3061

## Accessors

### back

• `get` **back**(): [`V3`](V3.md)

Computes back direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.back

#### Defined in

spark.procedural-animations.math-3d.ts:3198

___

### bk

• `get` **bk**(): [`V3`](V3.md)

Computes back direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.bk

#### Defined in

spark.procedural-animations.math-3d.ts:3192

___

### dn

• `get` **dn**(): [`V3`](V3.md)

Computes down direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.dn

#### Defined in

spark.procedural-animations.math-3d.ts:3210

___

### down

• `get` **down**(): [`V3`](V3.md)

Computes down direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.down

#### Defined in

spark.procedural-animations.math-3d.ts:3216

___

### ensureReadonly

• `get` **ensureReadonly**(): [`QtReadonly`](QtReadonly.md)

Creates new QtReadonly vector with the same x, y, z and w values

#### Returns

[`QtReadonly`](QtReadonly.md)

#### Implementation of

IQtReadonly.ensureReadonly

#### Defined in

spark.procedural-animations.math-3d.ts:3281

___

### ensureWritable

• `get` **ensureWritable**(): [`Qt`](Qt.md)

Creates new writable quaternion, implementation of IQtReadonly interface

#### Returns

[`Qt`](Qt.md)

#### Implementation of

IQtReadonly.ensureWritable

#### Defined in

spark.procedural-animations.math-3d.ts:3332

___

### forward

• `get` **forward**(): [`V3`](V3.md)

Computes forward direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.forward

#### Defined in

spark.procedural-animations.math-3d.ts:3186

___

### fw

• `get` **fw**(): [`V3`](V3.md)

Computes forward direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.fw

#### Defined in

spark.procedural-animations.math-3d.ts:3180

___

### horzFw

• `get` **horzFw**(): [`V3`](V3.md)

Computes horizontal forward direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.horzFw

#### Defined in

spark.procedural-animations.math-3d.ts:3246

___

### isChanged

• `get` **isChanged**(): `boolean`

Flag indicating whether is changed

#### Returns

`boolean`

#### Defined in

spark.procedural-animations.math-3d.ts:3252

___

### left

• `get` **left**(): [`V3`](V3.md)

Computes left direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.left

#### Defined in

spark.procedural-animations.math-3d.ts:3228

___

### lt

• `get` **lt**(): [`V3`](V3.md)

Computes left direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.lt

#### Defined in

spark.procedural-animations.math-3d.ts:3222

___

### normalized

• `get` **normalized**(): [`Qt`](Qt.md)

Creates new normalized unit quaternion, from the current quaternion

#### Returns

[`Qt`](Qt.md)

#### Implementation of

IQtReadonly.normalized

#### Defined in

spark.procedural-animations.math-3d.ts:3352

___

### permanent

• `get` **permanent**(): [`Qt`](Qt.md)

Clones Qt quaternion, regardless if object pool is active, or not it will create new permanent object, not managed by pool

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3106

___

### readonly

• `get` **readonly**(): [`IQtReadonly`](../interfaces/IQtReadonly.md)

Creates new QtReadonly vector with the same x, y, z and w values

#### Returns

[`IQtReadonly`](../interfaces/IQtReadonly.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3275

___

### right

• `get` **right**(): [`V3`](V3.md)

Computes right direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.right

#### Defined in

spark.procedural-animations.math-3d.ts:3240

___

### rt

• `get` **rt**(): [`V3`](V3.md)

Computes right direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.rt

#### Defined in

spark.procedural-animations.math-3d.ts:3234

___

### up

• `get` **up**(): [`V3`](V3.md)

Computes up direction for that rotation as normalized unit vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IQtReadonly.up

#### Defined in

spark.procedural-animations.math-3d.ts:3204

___

### w

• `get` **w**(): `number`

Gets w value

#### Returns

`number`

#### Implementation of

IQtReadonly.w

#### Defined in

spark.procedural-animations.math-3d.ts:3165

• `set` **w**(`n`): `void`

Sets w value

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`void`

#### Implementation of

IQtReadonly.w

#### Defined in

spark.procedural-animations.math-3d.ts:3172

___

### x

• `get` **x**(): `number`

Gets x value

#### Returns

`number`

#### Implementation of

IQtReadonly.x

#### Defined in

spark.procedural-animations.math-3d.ts:3120

• `set` **x**(`n`): `void`

Sets x value

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`void`

#### Implementation of

IQtReadonly.x

#### Defined in

spark.procedural-animations.math-3d.ts:3127

___

### y

• `get` **y**(): `number`

Gets y value

#### Returns

`number`

#### Implementation of

IQtReadonly.y

#### Defined in

spark.procedural-animations.math-3d.ts:3135

• `set` **y**(`n`): `void`

Sets y value

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`void`

#### Implementation of

IQtReadonly.y

#### Defined in

spark.procedural-animations.math-3d.ts:3142

___

### z

• `get` **z**(): `number`

Gets z value

#### Returns

`number`

#### Implementation of

IQtReadonly.z

#### Defined in

spark.procedural-animations.math-3d.ts:3150

• `set` **z**(`n`): `void`

Sets z value

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`void`

#### Implementation of

IQtReadonly.z

#### Defined in

spark.procedural-animations.math-3d.ts:3157

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

spark.procedural-animations.math-3d.ts:3517

___

### add\_

▸ **add_**(`other`): [`Qt`](Qt.md)

Updates the current quaternion so to apply addition to the current quaternion of another quaternion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | another quaternion |

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3524

___

### clone

▸ **clone**(): [`Qt`](Qt.md)

Clones quaternion

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3311

___

### cloneAsReadonly

▸ **cloneAsReadonly**(): [`IQtReadonly`](../interfaces/IQtReadonly.md)

Clones as writable, implementation of IQtReadonly interface

#### Returns

[`IQtReadonly`](../interfaces/IQtReadonly.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[cloneAsReadonly](../interfaces/IQtReadonly.md#cloneasreadonly)

#### Defined in

spark.procedural-animations.math-3d.ts:3293

___

### cloneAsWritable

▸ **cloneAsWritable**(): [`Qt`](Qt.md)

Clones as writable, implementation of IQtReadonly interface

#### Returns

[`Qt`](Qt.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[cloneAsWritable](../interfaces/IQtReadonly.md#cloneaswritable)

#### Defined in

spark.procedural-animations.math-3d.ts:3287

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

spark.procedural-animations.math-3d.ts:3489

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

spark.procedural-animations.math-3d.ts:3481

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

spark.procedural-animations.math-3d.ts:3301

___

### invert

▸ **invert**(): [`Qt`](Qt.md)

Returns new quaternion that represents invertion of current quaternion

#### Returns

[`Qt`](Qt.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[invert](../interfaces/IQtReadonly.md#invert)

#### Defined in

spark.procedural-animations.math-3d.ts:3436

___

### invert\_

▸ **invert_**(): [`Qt`](Qt.md)

Updates this quaternion so to invert the current quaternion

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3442

___

### isEqual

▸ **isEqual**(`other`, `delta?`): `boolean`

Checks if is equal to another quaternion

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `other` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | `undefined` | quaternion to compare |
| `delta?` | `number` | `0.0000001` | delta value, by default value is 0.000001 |

#### Returns

`boolean`

true if equal

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[isEqual](../interfaces/IQtReadonly.md#isequal)

#### Defined in

spark.procedural-animations.math-3d.ts:3341

___

### markAsChanged\_

▸ **markAsChanged_**(): [`Qt`](Qt.md)

Markes it as changed

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3324

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

spark.procedural-animations.math-3d.ts:3460

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

spark.procedural-animations.math-3d.ts:3499

___

### mulBy\_

▸ **mulBy_**(`n`): [`Qt`](Qt.md)

Updated the current quaternion to apply multiplication of the current quaternion by numeric value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numeric value to multiply by |

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3506

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

spark.procedural-animations.math-3d.ts:3535

___

### mul\_

▸ **mul_**(`rhs`): [`Qt`](Qt.md)

Updates this quaternion so that it applies multiplication of the current quaternion by another quaternion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | quaternion to multiply by |

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3467

___

### normalize\_

▸ **normalize_**(): [`Qt`](Qt.md)

Normalizes current quaternion

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3369

___

### processedChange\_

▸ **processedChange_**(): [`Qt`](Qt.md)

Markes it as processed

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3317

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

spark.procedural-animations.math-3d.ts:3418

___

### setFromArrayWXYZ\_

▸ **setFromArrayWXYZ_**(`arr`): [`Qt`](Qt.md)

Sets from array wxyz x=0, y=1, z=2, w=3

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `number`[] | array of 4 numbers |

#### Returns

[`Qt`](Qt.md)

from array wxyz

#### Defined in

spark.procedural-animations.math-3d.ts:3400

___

### setFrom\_

▸ **setFrom_**(`other`): [`Qt`](Qt.md)

Sets from another quaternion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | another quaternion |

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3387

___

### setScope

▸ **setScope**(`scopeId`): [`Qt`](Qt.md)

Sets pool scope

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scopeId` | `number` | scope ID |

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3113

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

spark.procedural-animations.math-3d.ts:3474

___

### toEuler

▸ **toEuler**(): [`V3`](V3.md)

Returns new quaternion that represents converts quaternion to vector representation of euler angles

#### Returns

[`V3`](V3.md)

#### Implementation of

[IQtReadonly](../interfaces/IQtReadonly.md).[toEuler](../interfaces/IQtReadonly.md#toeuler)

#### Defined in

spark.procedural-animations.math-3d.ts:3412

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

spark.procedural-animations.math-3d.ts:3424

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

spark.procedural-animations.math-3d.ts:3430

___

### toString

▸ **toString**(): `string`

String representation of quaternion

#### Returns

`string`

#### Defined in

spark.procedural-animations.math-3d.ts:3258

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

spark.procedural-animations.math-3d.ts:3265

___

### create

▸ `Static` **create**(`x?`, `y?`, `z?`, `w?`): [`Qt`](Qt.md)

Creates Qt quaternion, if object pool is active, and has available objects will recycle object from the pool, otherwise will create new

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x?` | `number` | `0` | x value, 0 by default |
| `y?` | `number` | `0` | y value, 0 by default |
| `z?` | `number` | `0` | z value, 0 by default |
| `w?` | `number` | `1` | w value, 1 by default |

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3077

___

### createPermanent

▸ `Static` **createPermanent**(`x?`, `y?`, `z?`, `w?`): [`Qt`](Qt.md)

Creates Qt quaternion, regardless if object pool is active, or not it will create new permanent object, not managed by pool

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x?` | `number` | `0` | x value, 0 by default |
| `y?` | `number` | `0` | y value, 0 by default |
| `z?` | `number` | `0` | z value, 0 by default |
| `w?` | `number` | `1` | w value, 1 by default |

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3100
