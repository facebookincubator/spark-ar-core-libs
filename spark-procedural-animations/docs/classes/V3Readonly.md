[spark-procedural-animations](../README.md) / [Exports](../modules.md) / V3Readonly

# Class: V3Readonly

readonly vector 3 object

## Implements

- [`IV3Readonly`](../interfaces/IV3Readonly.md)

## Table of contents

### Constructors

- [constructor](V3Readonly.md#constructor)

### Properties

- [\_x](V3Readonly.md#_x)
- [\_y](V3Readonly.md#_y)
- [\_z](V3Readonly.md#_z)

### Accessors

- [ensureNormalized](V3Readonly.md#ensurenormalized)
- [ensureReadonly](V3Readonly.md#ensurereadonly)
- [ensureWritable](V3Readonly.md#ensurewritable)
- [magnitude](V3Readonly.md#magnitude)
- [negated](V3Readonly.md#negated)
- [normalized](V3Readonly.md#normalized)
- [sqrMagnitude](V3Readonly.md#sqrmagnitude)
- [x](V3Readonly.md#x)
- [y](V3Readonly.md#y)
- [z](V3Readonly.md#z)

### Methods

- [add](V3Readonly.md#add)
- [addBk](V3Readonly.md#addbk)
- [addDn](V3Readonly.md#adddn)
- [addFw](V3Readonly.md#addfw)
- [addLt](V3Readonly.md#addlt)
- [addRt](V3Readonly.md#addrt)
- [addUp](V3Readonly.md#addup)
- [addX](V3Readonly.md#addx)
- [addY](V3Readonly.md#addy)
- [addZ](V3Readonly.md#addz)
- [axisDegRotation](V3Readonly.md#axisdegrotation)
- [by](V3Readonly.md#by)
- [cloneAsReadonly](V3Readonly.md#cloneasreadonly)
- [cloneAsWritable](V3Readonly.md#cloneaswritable)
- [cross](V3Readonly.md#cross)
- [degreesTo](V3Readonly.md#degreesto)
- [dirTo](V3Readonly.md#dirto)
- [distanceTo](V3Readonly.md#distanceto)
- [div](V3Readonly.md#div)
- [divBy](V3Readonly.md#divby)
- [dot](V3Readonly.md#dot)
- [getByIndex](V3Readonly.md#getbyindex)
- [horzDirTo](V3Readonly.md#horzdirto)
- [horzDistanceTo](V3Readonly.md#horzdistanceto)
- [isDirNotSameSideAs](V3Readonly.md#isdirnotsamesideas)
- [isDirSameSideAs](V3Readonly.md#isdirsamesideas)
- [moveTo](V3Readonly.md#moveto)
- [moveTowards](V3Readonly.md#movetowards)
- [moveTowardsNoPass](V3Readonly.md#movetowardsnopass)
- [mul](V3Readonly.md#mul)
- [mulBy](V3Readonly.md#mulby)
- [mulByIf](V3Readonly.md#mulbyif)
- [noLongerThan](V3Readonly.md#nolongerthan)
- [rotAboutAxis](V3Readonly.md#rotaboutaxis)
- [rotBk](V3Readonly.md#rotbk)
- [rotDn](V3Readonly.md#rotdn)
- [rotFw](V3Readonly.md#rotfw)
- [rotLt](V3Readonly.md#rotlt)
- [rotRt](V3Readonly.md#rotrt)
- [rotTo](V3Readonly.md#rotto)
- [rotTo01](V3Readonly.md#rotto01)
- [rotUp](V3Readonly.md#rotup)
- [rotate](V3Readonly.md#rotate)
- [sub](V3Readonly.md#sub)
- [toQt](V3Readonly.md#toqt)
- [toString](V3Readonly.md#tostring)
- [toStringRoundTo](V3Readonly.md#tostringroundto)
- [unsignedDegreesTo](V3Readonly.md#unsigneddegreesto)
- [withLength](V3Readonly.md#withlength)

## Constructors

### constructor

• **new V3Readonly**(`x?`, `y?`, `z?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `0` |
| `y` | `number` | `0` |
| `z` | `number` | `0` |

#### Defined in

spark.procedural-animations.math-3d.ts:877

## Properties

### \_x

• `Private` `Readonly` **\_x**: `number`

#### Defined in

spark.procedural-animations.math-3d.ts:874

___

### \_y

• `Private` `Readonly` **\_y**: `number`

#### Defined in

spark.procedural-animations.math-3d.ts:875

___

### \_z

• `Private` `Readonly` **\_z**: `number`

#### Defined in

spark.procedural-animations.math-3d.ts:876

## Accessors

### ensureNormalized

• `get` **ensureNormalized**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

If the vector is already normalized, returns the same vector otherwise creates a new normalized unit vector

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Implementation of

IV3Readonly.ensureNormalized

#### Defined in

spark.procedural-animations.math-3d.ts:919

___

### ensureReadonly

• `get` **ensureReadonly**(): [`V3Readonly`](V3Readonly.md)

Returns reference to this object, implementation of IV3Readonly interface

#### Returns

[`V3Readonly`](V3Readonly.md)

#### Implementation of

IV3Readonly.ensureReadonly

#### Defined in

spark.procedural-animations.math-3d.ts:981

___

### ensureWritable

• `get` **ensureWritable**(): [`V3`](V3.md)

Creates new writable vector, implementation of IV3Readonly interface

#### Returns

[`V3`](V3.md)

#### Implementation of

IV3Readonly.ensureWritable

#### Defined in

spark.procedural-animations.math-3d.ts:975

___

### magnitude

• `get` **magnitude**(): `number`

Returns vector magnitude (length)

#### Returns

`number`

#### Implementation of

IV3Readonly.magnitude

#### Defined in

spark.procedural-animations.math-3d.ts:933

___

### negated

• `get` **negated**(): [`V3`](V3.md)

Creates new vector that points in the opposite direction and has the same magnitude

#### Returns

[`V3`](V3.md)

#### Implementation of

IV3Readonly.negated

#### Defined in

spark.procedural-animations.math-3d.ts:913

___

### normalized

• `get` **normalized**(): [`V3`](V3.md)

Creates new normalized unit vector, from the current vector

#### Returns

[`V3`](V3.md)

#### Implementation of

IV3Readonly.normalized

#### Defined in

spark.procedural-animations.math-3d.ts:903

___

### sqrMagnitude

• `get` **sqrMagnitude**(): `number`

Returns squared magnitude (squared length)

#### Returns

`number`

#### Implementation of

IV3Readonly.sqrMagnitude

#### Defined in

spark.procedural-animations.math-3d.ts:927

___

### x

• `get` **x**(): `number`

Gets x value

#### Returns

`number`

#### Implementation of

IV3Readonly.x

#### Defined in

spark.procedural-animations.math-3d.ts:885

___

### y

• `get` **y**(): `number`

Gets y value

#### Returns

`number`

#### Implementation of

IV3Readonly.y

#### Defined in

spark.procedural-animations.math-3d.ts:891

___

### z

• `get` **z**(): `number`

Gets z value

#### Returns

`number`

#### Implementation of

IV3Readonly.z

#### Defined in

spark.procedural-animations.math-3d.ts:897

## Methods

### add

▸ **add**(`v`): [`V3`](V3.md)

Returns new vector that represents addition of another vector to the current vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | another vector |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[add](../interfaces/IV3Readonly.md#add)

#### Defined in

spark.procedural-animations.math-3d.ts:1037

___

### addBk

▸ **addBk**(`n`, `view?`): [`V3`](V3.md)

Creates new vector that represents movement of the current vector (addition) in the back direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[addBk](../interfaces/IV3Readonly.md#addbk)

#### Defined in

spark.procedural-animations.math-3d.ts:1280

___

### addDn

▸ **addDn**(`n`, `view?`): [`V3`](V3.md)

Creates new vector that represents movement of the current vector (addition) in the down direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[addDn](../interfaces/IV3Readonly.md#adddn)

#### Defined in

spark.procedural-animations.math-3d.ts:1312

___

### addFw

▸ **addFw**(`n`, `view?`): [`V3`](V3.md)

Creates new vector that represents movement of the current vector (addition) in the forward direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[addFw](../interfaces/IV3Readonly.md#addfw)

#### Defined in

spark.procedural-animations.math-3d.ts:1288

___

### addLt

▸ **addLt**(`n`, `view?`): [`V3`](V3.md)

Creates new vector that represents movement of the current vector (addition) in the left direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[addLt](../interfaces/IV3Readonly.md#addlt)

#### Defined in

spark.procedural-animations.math-3d.ts:1304

___

### addRt

▸ **addRt**(`n`, `view?`): [`V3`](V3.md)

Creates new vector that represents movement of the current vector (addition) in the right direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[addRt](../interfaces/IV3Readonly.md#addrt)

#### Defined in

spark.procedural-animations.math-3d.ts:1296

___

### addUp

▸ **addUp**(`n`, `view?`): [`V3`](V3.md)

Creates new vector that represents movement of the current vector (addition) in the up direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[addUp](../interfaces/IV3Readonly.md#addup)

#### Defined in

spark.procedural-animations.math-3d.ts:1320

___

### addX

▸ **addX**(`n`, `view?`): [`V3`](V3.md)

Creates new vector that represents movement of the current vector (addition) in the X direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[addX](../interfaces/IV3Readonly.md#addx)

#### Defined in

spark.procedural-animations.math-3d.ts:1328

___

### addY

▸ **addY**(`n`, `view?`): [`V3`](V3.md)

Creates new vector that represents movement of the current vector (addition) in the Y direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[addY](../interfaces/IV3Readonly.md#addy)

#### Defined in

spark.procedural-animations.math-3d.ts:1336

___

### addZ

▸ **addZ**(`n`, `view?`): [`V3`](V3.md)

Creates new vector that represents movement of the current vector (addition) in the Z direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[addZ](../interfaces/IV3Readonly.md#addz)

#### Defined in

spark.procedural-animations.math-3d.ts:1344

___

### axisDegRotation

▸ **axisDegRotation**(`degrees`): [`Qt`](Qt.md)

Created rotation considering the current vector to be an axis of rotation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | degrees to rotate |

#### Returns

[`Qt`](Qt.md)

quaternion rotation

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[axisDegRotation](../interfaces/IV3Readonly.md#axisdegrotation)

#### Defined in

spark.procedural-animations.math-3d.ts:1125

___

### by

▸ **by**(`n`): [`V3`](V3.md)

Returns new vector that represents multiplication of current vector by numberic value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numberiic value to multiply by |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[by](../interfaces/IV3Readonly.md#by)

#### Defined in

spark.procedural-animations.math-3d.ts:1065

___

### cloneAsReadonly

▸ **cloneAsReadonly**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

Clones as readonly, implementation of IV3Readonly interface

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[cloneAsReadonly](../interfaces/IV3Readonly.md#cloneasreadonly)

#### Defined in

spark.procedural-animations.math-3d.ts:958

___

### cloneAsWritable

▸ **cloneAsWritable**(): [`V3`](V3.md)

Clones as writable, implementation of IV3Readonly interface

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[cloneAsWritable](../interfaces/IV3Readonly.md#cloneaswritable)

#### Defined in

spark.procedural-animations.math-3d.ts:952

___

### cross

▸ **cross**(`rhs`): [`V3`](V3.md)

Cross product with another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | another vector |

#### Returns

[`V3`](V3.md)

cross product

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[cross](../interfaces/IV3Readonly.md#cross)

#### Defined in

spark.procedural-animations.math-3d.ts:1011

___

### degreesTo

▸ **degreesTo**(`rhs`, `normal`): `number`

Signed degrees angle to another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | another vector |
| `normal` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | normal vector |

#### Returns

`number`

degrees angle

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[degreesTo](../interfaces/IV3Readonly.md#degreesto)

#### Defined in

spark.procedural-animations.math-3d.ts:1089

___

### dirTo

▸ **dirTo**(`v`): [`V3`](V3.md)

Returns new vector that represents direction to another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | another vector |

#### Returns

[`V3`](V3.md)

normalized, unit vector direction to another vector

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[dirTo](../interfaces/IV3Readonly.md#dirto)

#### Defined in

spark.procedural-animations.math-3d.ts:1150

___

### distanceTo

▸ **distanceTo**(`v`): `number`

Distances to another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | another vector |

#### Returns

`number`

distance

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[distanceTo](../interfaces/IV3Readonly.md#distanceto)

#### Defined in

spark.procedural-animations.math-3d.ts:1158

___

### div

▸ **div**(`v`): [`V3`](V3.md)

Returns new vector that represents division of current vector by another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | another vector |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[div](../interfaces/IV3Readonly.md#div)

#### Defined in

spark.procedural-animations.math-3d.ts:1044

___

### divBy

▸ **divBy**(`n`): [`V3`](V3.md)

Returns new vector that represents division of current vector by numberic value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numberiic value to divide by |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[divBy](../interfaces/IV3Readonly.md#divby)

#### Defined in

spark.procedural-animations.math-3d.ts:1051

___

### dot

▸ **dot**(`rhs`): `number`

Dot product with another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | another vector |

#### Returns

`number`

dot product

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[dot](../interfaces/IV3Readonly.md#dot)

#### Defined in

spark.procedural-animations.math-3d.ts:1023

___

### getByIndex

▸ **getByIndex**(`index`): `number`

Gets value by index, 0=x, 1=y, 2=z

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`number`

value

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[getByIndex](../interfaces/IV3Readonly.md#getbyindex)

#### Defined in

spark.procedural-animations.math-3d.ts:966

___

### horzDirTo

▸ **horzDirTo**(`v`): [`V3`](V3.md)

Returns new vector that represents horizontal direction (on the horizontal plane) to another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | another vector |

#### Returns

[`V3`](V3.md)

normalized, unit vector direction to another vector placed on the horizontal plane

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[horzDirTo](../interfaces/IV3Readonly.md#horzdirto)

#### Defined in

spark.procedural-animations.math-3d.ts:1142

___

### horzDistanceTo

▸ **horzDistanceTo**(`v`): `number`

Horizontal distances to another vector (ignoring Y)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | another vector |

#### Returns

`number`

Horizontal distance

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[horzDistanceTo](../interfaces/IV3Readonly.md#horzdistanceto)

#### Defined in

spark.procedural-animations.math-3d.ts:1169

___

### isDirNotSameSideAs

▸ **isDirNotSameSideAs**(`otherDir`): `boolean`

Determines whether unit vector points in different direction as other unit vector (more than 90 degrees)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `otherDir` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | unit vector to compare against |

#### Returns

`boolean`

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[isDirNotSameSideAs](../interfaces/IV3Readonly.md#isdirnotsamesideas)

#### Defined in

spark.procedural-animations.math-3d.ts:1358

___

### isDirSameSideAs

▸ **isDirSameSideAs**(`otherDir`): `boolean`

Determines whether unit vector points in the same direction as other unit vector (less than 90 degrees)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `otherDir` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | unit vector to compare against |

#### Returns

`boolean`

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[isDirSameSideAs](../interfaces/IV3Readonly.md#isdirsamesideas)

#### Defined in

spark.procedural-animations.math-3d.ts:1351

___

### moveTo

▸ **moveTo**(`to`, `progress01`): [`V3`](V3.md)

Creates new point that represents movement of the current point towards target point

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | target point |
| `progress01` | `number` | progress for movement from 0 to 1 |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[moveTo](../interfaces/IV3Readonly.md#moveto)

#### Defined in

spark.procedural-animations.math-3d.ts:1203

___

### moveTowards

▸ **moveTowards**(`to`, `distance`): [`V3`](V3.md)

Returns new vector that represents movement of current vectr towards target vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | - |
| `distance` | `number` | distance to move in direction of target |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[moveTowards](../interfaces/IV3Readonly.md#movetowards)

#### Defined in

spark.procedural-animations.math-3d.ts:989

___

### moveTowardsNoPass

▸ **moveTowardsNoPass**(`to`, `distance`): [`V3`](V3.md)

Returns new vector that represents movement of current vectr towards target vector without passing through other vector

#### Parameters

| Name | Type |
| :------ | :------ |
| `to` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |
| `distance` | `number` |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[moveTowardsNoPass](../interfaces/IV3Readonly.md#movetowardsnopass)

#### Defined in

spark.procedural-animations.math-3d.ts:999

___

### mul

▸ **mul**(`v`): [`V3`](V3.md)

Returns new vector that represents multiplication of current vector by another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | another vector |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[mul](../interfaces/IV3Readonly.md#mul)

#### Defined in

spark.procedural-animations.math-3d.ts:1058

___

### mulBy

▸ **mulBy**(`n`): [`V3`](V3.md)

Returns new vector that represents multiplication of current vector by numberic value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numberiic value to multiply by |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[mulBy](../interfaces/IV3Readonly.md#mulby)

#### Defined in

spark.procedural-animations.math-3d.ts:1072

___

### mulByIf

▸ **mulByIf**(`n`, `condition`): [`V3`](V3.md)

Returns new vector that represents multiplication of current vector by numberic value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numberiic value to multiply by |
| `condition` | `boolean` | boolean condition to check against |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[mulByIf](../interfaces/IV3Readonly.md#mulbyif)

#### Defined in

spark.procedural-animations.math-3d.ts:1080

___

### noLongerThan

▸ **noLongerThan**(`len`): [`V3`](V3.md)

Returns new vector that is ensured not to be longer than a given value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `len` | `number` | length limit |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[noLongerThan](../interfaces/IV3Readonly.md#nolongerthan)

#### Defined in

spark.procedural-animations.math-3d.ts:1107

___

### rotAboutAxis

▸ **rotAboutAxis**(`axis`, `degrees`): [`V3`](V3.md)

Creates new vector from current vector that represents rotation of that vector around a specific axis

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `axis` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | axis to rotate around |
| `degrees` | `number` | degrees to rotate around |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[rotAboutAxis](../interfaces/IV3Readonly.md#rotaboutaxis)

#### Defined in

spark.procedural-animations.math-3d.ts:1187

___

### rotBk

▸ **rotBk**(`degrees`, `view?`): [`V3`](V3.md)

Creates new unit vector that represents rotation of the current vector towards the back direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | degrees to rotate |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[rotBk](../interfaces/IV3Readonly.md#rotbk)

#### Defined in

spark.procedural-animations.math-3d.ts:1232

___

### rotDn

▸ **rotDn**(`degrees`, `view?`): [`V3`](V3.md)

Creates new unit vector that represents rotation of the current vector towards the down direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | degrees to rotate |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[rotDn](../interfaces/IV3Readonly.md#rotdn)

#### Defined in

spark.procedural-animations.math-3d.ts:1264

___

### rotFw

▸ **rotFw**(`degrees`, `view?`): [`V3`](V3.md)

Creates new unit vector that represents rotation of the current vector towards the forward direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | degrees to rotate |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[rotFw](../interfaces/IV3Readonly.md#rotfw)

#### Defined in

spark.procedural-animations.math-3d.ts:1224

___

### rotLt

▸ **rotLt**(`degrees`, `view?`): [`V3`](V3.md)

Creates new unit vector that represents rotation of the current vector towards the left direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | degrees to rotate |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[rotLt](../interfaces/IV3Readonly.md#rotlt)

#### Defined in

spark.procedural-animations.math-3d.ts:1240

___

### rotRt

▸ **rotRt**(`degrees`, `view?`): [`V3`](V3.md)

Creates new unit vector that represents rotation of the current vector towards the right direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | degrees to rotate |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[rotRt](../interfaces/IV3Readonly.md#rotrt)

#### Defined in

spark.procedural-animations.math-3d.ts:1248

___

### rotTo

▸ **rotTo**(`targetDir`, `degrees`): [`V3`](V3.md)

Creates new unit vector that represents rotation of the current vector towards another unit vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `targetDir` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | - |
| `degrees` | `number` | degrees to rotate |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[rotTo](../interfaces/IV3Readonly.md#rotto)

#### Defined in

spark.procedural-animations.math-3d.ts:1271

___

### rotTo01

▸ **rotTo01**(`rhs`, `progress01`): [`V3`](V3.md)

Creates new unit vector that represents rotation of the current vector towards the target vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | target vector |
| `progress01` | `number` | progress for rotation from 0 to 1 |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[rotTo01](../interfaces/IV3Readonly.md#rotto01)

#### Defined in

spark.procedural-animations.math-3d.ts:1195

___

### rotUp

▸ **rotUp**(`degrees`, `view?`): [`V3`](V3.md)

Creates new unit vector that represents rotation of the current vector towards the up direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | degrees to rotate |
| `view?` | [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[rotUp](../interfaces/IV3Readonly.md#rotup)

#### Defined in

spark.procedural-animations.math-3d.ts:1256

___

### rotate

▸ **rotate**(`r`): [`V3`](V3.md)

Rotates vector by a given quaternion rotation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `r` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | quaternion rotation |

#### Returns

[`V3`](V3.md)

rotated vector

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[rotate](../interfaces/IV3Readonly.md#rotate)

#### Defined in

spark.procedural-animations.math-3d.ts:1117

___

### sub

▸ **sub**(`v`): [`V3`](V3.md)

Returns new vector that represents substraction of another vector from the current vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | another vector |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[sub](../interfaces/IV3Readonly.md#sub)

#### Defined in

spark.procedural-animations.math-3d.ts:1030

___

### toQt

▸ **toQt**(`convertDegreesToRadians?`): [`Qt`](Qt.md)

Creates quaternion from the current vector considering it to be representation of euler angles rotation

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `convertDegreesToRadians?` | `boolean` | `false` | if true, will convert degrees to radians, by default set to false |

#### Returns

[`Qt`](Qt.md)

quaternion rotation

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[toQt](../interfaces/IV3Readonly.md#toqt)

#### Defined in

spark.procedural-animations.math-3d.ts:1179

___

### toString

▸ **toString**(): `string`

returns string representation of this vector

#### Returns

`string`

#### Defined in

spark.procedural-animations.math-3d.ts:939

___

### toStringRoundTo

▸ **toStringRoundTo**(`n`): `string`

returns string representation of this vector rounded to n decimal places

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | number of decimal places to round to |

#### Returns

`string`

#### Defined in

spark.procedural-animations.math-3d.ts:946

___

### unsignedDegreesTo

▸ **unsignedDegreesTo**(`rhs`): `number`

Unsigned degrees angle to another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | another vector |

#### Returns

`number`

degrees angle

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[unsignedDegreesTo](../interfaces/IV3Readonly.md#unsigneddegreesto)

#### Defined in

spark.procedural-animations.math-3d.ts:1100

___

### withLength

▸ **withLength**(`length`): [`V3`](V3.md)

Creates new vector that represents current vector with having it's length changed to the given value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `length` | `number` | new vector length |

#### Returns

[`V3`](V3.md)

#### Implementation of

[IV3Readonly](../interfaces/IV3Readonly.md).[withLength](../interfaces/IV3Readonly.md#withlength)

#### Defined in

spark.procedural-animations.math-3d.ts:1214
