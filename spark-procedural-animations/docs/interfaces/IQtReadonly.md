[spark-procedural-animations](../README.md) / [Exports](../modules.md) / IQtReadonly

# Interface: IQtReadonly

## Implemented by

- [`Qt`](../classes/Qt.md)
- [`QtReadonly`](../classes/QtReadonly.md)

## Table of contents

### Accessors

- [bk](IQtReadonly.md#bk)
- [dn](IQtReadonly.md#dn)
- [ensureReadonly](IQtReadonly.md#ensurereadonly)
- [ensureWritable](IQtReadonly.md#ensurewritable)
- [fw](IQtReadonly.md#fw)
- [horzFw](IQtReadonly.md#horzfw)
- [lt](IQtReadonly.md#lt)
- [normalized](IQtReadonly.md#normalized)
- [rt](IQtReadonly.md#rt)
- [up](IQtReadonly.md#up)
- [w](IQtReadonly.md#w)
- [x](IQtReadonly.md#x)
- [y](IQtReadonly.md#y)
- [z](IQtReadonly.md#z)

### Methods

- [add](IQtReadonly.md#add)
- [cloneAsReadonly](IQtReadonly.md#cloneasreadonly)
- [cloneAsWritable](IQtReadonly.md#cloneaswritable)
- [degreesTo](IQtReadonly.md#degreesto)
- [dot](IQtReadonly.md#dot)
- [getByIndex](IQtReadonly.md#getbyindex)
- [invert](IQtReadonly.md#invert)
- [isEqual](IQtReadonly.md#isequal)
- [mul](IQtReadonly.md#mul)
- [mulBy](IQtReadonly.md#mulby)
- [mulV3](IQtReadonly.md#mulv3)
- [rotateTo](IQtReadonly.md#rotateto)
- [toAngleAxis](IQtReadonly.md#toangleaxis)
- [toEuler](IQtReadonly.md#toeuler)
- [toGlobal](IQtReadonly.md#toglobal)
- [toLocal](IQtReadonly.md#tolocal)
- [toStringRoundTo](IQtReadonly.md#tostringroundto)

## Accessors

### bk

• `get` **bk**(): [`V3`](../classes/V3.md)

Computes back direction for that rotation as normalized unit vector

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2641

___

### dn

• `get` **dn**(): [`V3`](../classes/V3.md)

Computes down direction for that rotation as normalized unit vector

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2649

___

### ensureReadonly

• `get` **ensureReadonly**(): [`QtReadonly`](../classes/QtReadonly.md)

Creates new readonly quaternion, if it is already readonly returns reference to iself

#### Returns

[`QtReadonly`](../classes/QtReadonly.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2687

___

### ensureWritable

• `get` **ensureWritable**(): [`Qt`](../classes/Qt.md)

Creates new writable quaternion, if it is already writable passes reference to itself, implementation of IQtReadonly interface

#### Returns

[`Qt`](../classes/Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2683

___

### fw

• `get` **fw**(): [`V3`](../classes/V3.md)

Computes forward direction for that rotation as normalized unit vector

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2637

___

### horzFw

• `get` **horzFw**(): [`V3`](../classes/V3.md)

Computes horizontal forward direction for that rotation as normalized unit vector

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2661

___

### lt

• `get` **lt**(): [`V3`](../classes/V3.md)

Computes left direction for that rotation as normalized unit vector

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2653

___

### normalized

• `get` **normalized**(): [`Qt`](../classes/Qt.md)

Creates new normalized unit quaternion, from the current quaternion

#### Returns

[`Qt`](../classes/Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2665

___

### rt

• `get` **rt**(): [`V3`](../classes/V3.md)

Computes right direction for that rotation as normalized unit vector

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2657

___

### up

• `get` **up**(): [`V3`](../classes/V3.md)

Computes up direction for that rotation as normalized unit vector

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2645

___

### w

• `get` **w**(): `number`

Gets w value

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-3d.ts:2633

___

### x

• `get` **x**(): `number`

Gets x value

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-3d.ts:2621

___

### y

• `get` **y**(): `number`

Gets y value

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-3d.ts:2625

___

### z

• `get` **z**(): `number`

Gets z value

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-3d.ts:2629

## Methods

### add

▸ **add**(`other`): [`Qt`](../classes/Qt.md)

Returns new quaternion that represents addition to the current quaternion of another quaternion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IQtReadonly`](IQtReadonly.md) | another quaternion |

#### Returns

[`Qt`](../classes/Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2741

___

### cloneAsReadonly

▸ **cloneAsReadonly**(): [`IQtReadonly`](IQtReadonly.md)

Clones as readonly

#### Returns

[`IQtReadonly`](IQtReadonly.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2673

___

### cloneAsWritable

▸ **cloneAsWritable**(): [`Qt`](../classes/Qt.md)

Clones as writable

#### Returns

[`Qt`](../classes/Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2669

___

### degreesTo

▸ **degreesTo**(`other`): `number`

Degrees rotation to another quaternion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IQtReadonly`](IQtReadonly.md) | another quaternion |

#### Returns

`number`

degrees rotation

#### Defined in

spark.procedural-animations.math-3d.ts:2731

___

### dot

▸ **dot**(`other`): `number`

Dot product with another quaternion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IQtReadonly`](IQtReadonly.md) | quaternion to dot with |

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-3d.ts:2725

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

#### Defined in

spark.procedural-animations.math-3d.ts:2679

___

### invert

▸ **invert**(): [`Qt`](../classes/Qt.md)

Returns new quaternion that represents invertion of current quaternion

#### Returns

[`Qt`](../classes/Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2710

___

### isEqual

▸ **isEqual**(`other`): `boolean`

Determines whether is equal to another quaternion within delta 0.0000001

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IQtReadonly`](IQtReadonly.md) | other quaternion |

#### Returns

`boolean`

true if equal

#### Defined in

spark.procedural-animations.math-3d.ts:2698

___

### mul

▸ **mul**(`rhs`): [`Qt`](../classes/Qt.md)

Returns new quaternion that represents multiplication of the current quaternion by another quaternion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IQtReadonly`](IQtReadonly.md) | quaternion to multiply by |

#### Returns

[`Qt`](../classes/Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2715

___

### mulBy

▸ **mulBy**(`n`): [`Qt`](../classes/Qt.md)

Returns new quaternion that represents multiplication of the current quaternion by numeric value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numeric value to multiply by |

#### Returns

[`Qt`](../classes/Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2736

___

### mulV3

▸ **mulV3**(`v`): [`V3`](../classes/V3.md)

Returns new quaternion that represents multiplication of the current quaternion by another quaternion

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`IV3Readonly`](IV3Readonly.md) |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2746

___

### rotateTo

▸ **rotateTo**(`q2`, `t`): [`Qt`](../classes/Qt.md)

Returns new quaternion that represents spherical linear interpolation from one rotation to another

#### Parameters

| Name | Type |
| :------ | :------ |
| `q2` | [`IQtReadonly`](IQtReadonly.md) |
| `t` | `number` |

#### Returns

[`Qt`](../classes/Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2706

___

### toAngleAxis

▸ **toAngleAxis**(): [`number`, [`V3`](../classes/V3.md)]

Deconstructs this quaternion into its individual components: axis and degrees rotation

#### Returns

[`number`, [`V3`](../classes/V3.md)]

tuple of degrees and axis

#### Defined in

spark.procedural-animations.math-3d.ts:2720

___

### toEuler

▸ **toEuler**(): [`V3`](../classes/V3.md)

Returns new quaternion that represents converts quaternion to vector representation of euler angles

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2702

___

### toGlobal

▸ **toGlobal**(`parent`): [`Qt`](../classes/Qt.md)

Returns new quaternion that represents convertion of local rotation to global providing the parent

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`IQtReadonly`](IQtReadonly.md) |

#### Returns

[`Qt`](../classes/Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2750

___

### toLocal

▸ **toLocal**(`parent`): [`Qt`](../classes/Qt.md)

Returns new quaternion that represents convertion of global rotation to local providing the parent

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`IQtReadonly`](IQtReadonly.md) |

#### Returns

[`Qt`](../classes/Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:2754

___

### toStringRoundTo

▸ **toStringRoundTo**(`n`): `any`

returns string representation of this quaternion rounded to n decimal places

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | number of decimal places to round to |

#### Returns

`any`

#### Defined in

spark.procedural-animations.math-3d.ts:2692
