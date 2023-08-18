[spark-procedural-animations](../README.md) / [Exports](../modules.md) / IV3Readonly

# Interface: IV3Readonly

## Implemented by

- [`V3`](../classes/V3.md)
- [`V3Readonly`](../classes/V3Readonly.md)

## Table of contents

### Accessors

- [ensureNormalized](IV3Readonly.md#ensurenormalized)
- [ensureReadonly](IV3Readonly.md#ensurereadonly)
- [ensureWritable](IV3Readonly.md#ensurewritable)
- [magnitude](IV3Readonly.md#magnitude)
- [negated](IV3Readonly.md#negated)
- [normalized](IV3Readonly.md#normalized)
- [sqrMagnitude](IV3Readonly.md#sqrmagnitude)
- [x](IV3Readonly.md#x)
- [y](IV3Readonly.md#y)
- [z](IV3Readonly.md#z)

### Methods

- [add](IV3Readonly.md#add)
- [addBk](IV3Readonly.md#addbk)
- [addDn](IV3Readonly.md#adddn)
- [addFw](IV3Readonly.md#addfw)
- [addLt](IV3Readonly.md#addlt)
- [addRt](IV3Readonly.md#addrt)
- [addUp](IV3Readonly.md#addup)
- [addX](IV3Readonly.md#addx)
- [addY](IV3Readonly.md#addy)
- [addZ](IV3Readonly.md#addz)
- [axisDegRotation](IV3Readonly.md#axisdegrotation)
- [by](IV3Readonly.md#by)
- [cloneAsReadonly](IV3Readonly.md#cloneasreadonly)
- [cloneAsWritable](IV3Readonly.md#cloneaswritable)
- [cross](IV3Readonly.md#cross)
- [degreesTo](IV3Readonly.md#degreesto)
- [dirTo](IV3Readonly.md#dirto)
- [distanceTo](IV3Readonly.md#distanceto)
- [div](IV3Readonly.md#div)
- [divBy](IV3Readonly.md#divby)
- [dot](IV3Readonly.md#dot)
- [getByIndex](IV3Readonly.md#getbyindex)
- [horzDirTo](IV3Readonly.md#horzdirto)
- [horzDistanceTo](IV3Readonly.md#horzdistanceto)
- [isDirNotSameSideAs](IV3Readonly.md#isdirnotsamesideas)
- [isDirSameSideAs](IV3Readonly.md#isdirsamesideas)
- [moveTo](IV3Readonly.md#moveto)
- [moveTowards](IV3Readonly.md#movetowards)
- [moveTowardsNoPass](IV3Readonly.md#movetowardsnopass)
- [mul](IV3Readonly.md#mul)
- [mulBy](IV3Readonly.md#mulby)
- [mulByIf](IV3Readonly.md#mulbyif)
- [noLongerThan](IV3Readonly.md#nolongerthan)
- [rotAboutAxis](IV3Readonly.md#rotaboutaxis)
- [rotBk](IV3Readonly.md#rotbk)
- [rotDn](IV3Readonly.md#rotdn)
- [rotFw](IV3Readonly.md#rotfw)
- [rotLt](IV3Readonly.md#rotlt)
- [rotRt](IV3Readonly.md#rotrt)
- [rotTo](IV3Readonly.md#rotto)
- [rotTo01](IV3Readonly.md#rotto01)
- [rotUp](IV3Readonly.md#rotup)
- [rotate](IV3Readonly.md#rotate)
- [sub](IV3Readonly.md#sub)
- [toQt](IV3Readonly.md#toqt)
- [unsignedDegreesTo](IV3Readonly.md#unsigneddegreesto)
- [withLength](IV3Readonly.md#withlength)

## Accessors

### ensureNormalized

• `get` **ensureNormalized**(): [`IV3Readonly`](IV3Readonly.md)

If the vector is already normalized, returns the same vector otherwise creates a new normalized unit vector

#### Returns

[`IV3Readonly`](IV3Readonly.md)

#### Defined in

spark.procedural-animations.math-3d.ts:585

___

### ensureReadonly

• `get` **ensureReadonly**(): [`V3Readonly`](../classes/V3Readonly.md)

Creates new readonly vector, if it is already readonly returns reference to iself

#### Returns

[`V3Readonly`](../classes/V3Readonly.md)

#### Defined in

spark.procedural-animations.math-3d.ts:593

___

### ensureWritable

• `get` **ensureWritable**(): [`V3`](../classes/V3.md)

Creates new writable vector, if it is already writable returns reference to iself

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:589

___

### magnitude

• `get` **magnitude**(): `number`

Returns vector magnitude (length)

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-3d.ts:601

___

### negated

• `get` **negated**(): [`V3`](../classes/V3.md)

Creates new vector that points in the opposite direction (negated) and has the same magnitude

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:581

___

### normalized

• `get` **normalized**(): [`V3`](../classes/V3.md)

Creates new normalized unit vector, from the current vector

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:577

___

### sqrMagnitude

• `get` **sqrMagnitude**(): `number`

Returns squared magnitude (squared length)

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-3d.ts:597

___

### x

• `get` **x**(): `number`

Gets x value

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-3d.ts:565

___

### y

• `get` **y**(): `number`

Gets y value

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-3d.ts:569

___

### z

• `get` **z**(): `number`

Gets z value

#### Returns

`number`

#### Defined in

spark.procedural-animations.math-3d.ts:573

## Methods

### add

▸ **add**(`v`): [`V3`](../classes/V3.md)

Returns new vector that represents addition of another vector to the current vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IV3Readonly`](IV3Readonly.md) | another vector |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:649

___

### addBk

▸ **addBk**(`n`, `view?`): [`V3`](../classes/V3.md)

Creates new vector that represents movement of the current vector (addition) in the back direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:816

___

### addDn

▸ **addDn**(`n`, `view?`): [`V3`](../classes/V3.md)

Creates new vector that represents movement of the current vector (addition) in the down direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:840

___

### addFw

▸ **addFw**(`n`, `view?`): [`V3`](../classes/V3.md)

Creates new vector that represents movement of the current vector (addition) in the forward direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:810

___

### addLt

▸ **addLt**(`n`, `view?`): [`V3`](../classes/V3.md)

Creates new vector that represents movement of the current vector (addition) in the left direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:822

___

### addRt

▸ **addRt**(`n`, `view?`): [`V3`](../classes/V3.md)

Creates new vector that represents movement of the current vector (addition) in the right direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:828

___

### addUp

▸ **addUp**(`n`, `view?`): [`V3`](../classes/V3.md)

Creates new vector that represents movement of the current vector (addition) in the up direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:834

___

### addX

▸ **addX**(`n`, `view?`): [`V3`](../classes/V3.md)

Creates new vector that represents movement of the current vector (addition) in the X direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:846

___

### addY

▸ **addY**(`n`, `view?`): [`V3`](../classes/V3.md)

Creates new vector that represents movement of the current vector (addition) in the Y direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:852

___

### addZ

▸ **addZ**(`n`, `view?`): [`V3`](../classes/V3.md)

Creates new vector that represents movement of the current vector (addition) in the Z direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | length to add to that dimension |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:858

___

### axisDegRotation

▸ **axisDegRotation**(`degrees`): [`Qt`](../classes/Qt.md)

Created rotation considering the current vector to be an axis of rotation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | degrees to rotate |

#### Returns

[`Qt`](../classes/Qt.md)

quaternion rotation

#### Defined in

spark.procedural-animations.math-3d.ts:710

___

### by

▸ **by**(`n`): [`V3`](../classes/V3.md)

Returns new vector that represents multiplication of current vector by numberic value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numberiic value to multiply by |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:680

___

### cloneAsReadonly

▸ **cloneAsReadonly**(): [`IV3Readonly`](IV3Readonly.md)

Clones as readonly

#### Returns

[`IV3Readonly`](IV3Readonly.md)

#### Defined in

spark.procedural-animations.math-3d.ts:615

___

### cloneAsWritable

▸ **cloneAsWritable**(): [`V3`](../classes/V3.md)

Clones as writable

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:611

___

### cross

▸ **cross**(`rhs`): [`V3`](../classes/V3.md)

Cross product with another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IV3Readonly`](IV3Readonly.md) | another vector |

#### Returns

[`V3`](../classes/V3.md)

cross product

#### Defined in

spark.procedural-animations.math-3d.ts:633

___

### degreesTo

▸ **degreesTo**(`rhs`, `normal`): `number`

Signed degrees angle to another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IV3Readonly`](IV3Readonly.md) | another vector |
| `normal` | [`IV3Readonly`](IV3Readonly.md) | normal vector |

#### Returns

`number`

degrees angle

#### Defined in

spark.procedural-animations.math-3d.ts:687

___

### dirTo

▸ **dirTo**(`v`): [`V3`](../classes/V3.md)

Returns new vector that represents direction to another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IV3Readonly`](IV3Readonly.md) | another vector |

#### Returns

[`V3`](../classes/V3.md)

normalized, unit vector direction to another vector

#### Defined in

spark.procedural-animations.math-3d.ts:722

___

### distanceTo

▸ **distanceTo**(`other`): `number`

Distances to another vector

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`IV3Readonly`](IV3Readonly.md) |

#### Returns

`number`

distance

#### Defined in

spark.procedural-animations.math-3d.ts:728

___

### div

▸ **div**(`v`): [`V3`](../classes/V3.md)

Returns new vector that represents division of current vector by another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IV3Readonly`](IV3Readonly.md) | another vector |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:654

___

### divBy

▸ **divBy**(`n`): [`V3`](../classes/V3.md)

Returns new vector that represents division of current vector by numberic value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numberiic value to divide by |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:659

___

### dot

▸ **dot**(`rhs`): `number`

Dot product with another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IV3Readonly`](IV3Readonly.md) | another vector |

#### Returns

`number`

dot product

#### Defined in

spark.procedural-animations.math-3d.ts:639

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

#### Defined in

spark.procedural-animations.math-3d.ts:607

___

### horzDirTo

▸ **horzDirTo**(`v`): [`V3`](../classes/V3.md)

Returns new vector that represents horizontal direction (on the horizontal plane) to another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IV3Readonly`](IV3Readonly.md) | another vector |

#### Returns

[`V3`](../classes/V3.md)

normalized, unit vector direction to another vector placed on the horizontal plane

#### Defined in

spark.procedural-animations.math-3d.ts:716

___

### horzDistanceTo

▸ **horzDistanceTo**(`other`): `number`

Horizontal distances to another vector (ignoring Y)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`IV3Readonly`](IV3Readonly.md) |

#### Returns

`number`

Horizontal distance

#### Defined in

spark.procedural-animations.math-3d.ts:734

___

### isDirNotSameSideAs

▸ **isDirNotSameSideAs**(`otherDir`): `boolean`

Determines whether unit vector points in different direction as other unit vector (more than 90 degrees)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `otherDir` | [`IV3Readonly`](IV3Readonly.md) | unit vector to compare against |

#### Returns

`boolean`

#### Defined in

spark.procedural-animations.math-3d.ts:868

___

### isDirSameSideAs

▸ **isDirSameSideAs**(`otherDir`): `boolean`

Determines whether unit vector points in the same direction as other unit vector (less than 90 degrees)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `otherDir` | [`IV3Readonly`](IV3Readonly.md) | unit vector to compare against |

#### Returns

`boolean`

#### Defined in

spark.procedural-animations.math-3d.ts:863

___

### moveTo

▸ **moveTo**(`to`, `t01`): [`V3`](../classes/V3.md)

Creates new point that represents movement of the current point towards target point

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`IV3Readonly`](IV3Readonly.md) | target point |
| `t01` | `number` | - |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:758

___

### moveTowards

▸ **moveTowards**(`to`, `distance`): [`V3`](../classes/V3.md)

Returns new vector that represents movement of current vectr towards target vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`IV3Readonly`](IV3Readonly.md) | - |
| `distance` | `number` | distance to move in direction of target |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:621

___

### moveTowardsNoPass

▸ **moveTowardsNoPass**(`to`, `distance`): [`V3`](../classes/V3.md)

Returns new vector that represents movement of current vectr towards target vector without passing through other vector

#### Parameters

| Name | Type |
| :------ | :------ |
| `to` | [`IV3Readonly`](IV3Readonly.md) |
| `distance` | `number` |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:627

___

### mul

▸ **mul**(`v`): [`V3`](../classes/V3.md)

Returns new vector that represents multiplication of current vector by another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IV3Readonly`](IV3Readonly.md) | another vector |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:664

___

### mulBy

▸ **mulBy**(`n`): [`V3`](../classes/V3.md)

Returns new vector that represents multiplication of current vector by numberic value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numberiic value to multiply by |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:669

___

### mulByIf

▸ **mulByIf**(`n`, `condition`): [`V3`](../classes/V3.md)

Returns new vector that represents multiplication of current vector by numberic value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | numberiic value to multiply by |
| `condition` | `boolean` | boolean condition to check against |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:675

___

### noLongerThan

▸ **noLongerThan**(`len`): [`V3`](../classes/V3.md)

Returns new vector that is ensured not to be longer than a given value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `len` | `number` | length limit |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:698

___

### rotAboutAxis

▸ **rotAboutAxis**(`axis`, `degrees`): [`V3`](../classes/V3.md)

Creates new vector from current vector that represents rotation of that vector around a specific axis

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `axis` | [`IV3Readonly`](IV3Readonly.md) | axis to rotate around |
| `degrees` | `number` | degrees to rotate around |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:746

___

### rotBk

▸ **rotBk**(`degrees`, `view?`): [`V3`](../classes/V3.md)

Creates new unit vector that represents rotation of the current vector towards the back direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | degrees to rotate |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:775

___

### rotDn

▸ **rotDn**(`degrees`, `view?`): [`V3`](../classes/V3.md)

Creates new unit vector that represents rotation of the current vector towards the down direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | degrees to rotate |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:799

___

### rotFw

▸ **rotFw**(`degrees`, `view?`): [`V3`](../classes/V3.md)

Creates new unit vector that represents rotation of the current vector towards the forward direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | degrees to rotate |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:769

___

### rotLt

▸ **rotLt**(`degrees`, `view?`): [`V3`](../classes/V3.md)

Creates new unit vector that represents rotation of the current vector towards the left direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | degrees to rotate |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:781

___

### rotRt

▸ **rotRt**(`degrees`, `view?`): [`V3`](../classes/V3.md)

Creates new unit vector that represents rotation of the current vector towards the right direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | degrees to rotate |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:787

___

### rotTo

▸ **rotTo**(`targetDir`, `degrees`): [`V3`](../classes/V3.md)

Creates new unit vector that represents rotation of the current vector towards another unit vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `targetDir` | [`IV3Readonly`](IV3Readonly.md) | - |
| `degrees` | `number` | degrees to rotate |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:804

___

### rotTo01

▸ **rotTo01**(`rhs`, `progress01`): [`V3`](../classes/V3.md)

Creates new unit vector that represents rotation of the current vector towards the target vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IV3Readonly`](IV3Readonly.md) | target vector |
| `progress01` | `number` | progress for rotation from 0 to 1 |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:752

___

### rotUp

▸ **rotUp**(`degrees`, `view?`): [`V3`](../classes/V3.md)

Creates new unit vector that represents rotation of the current vector towards the up direction, if view is provided it will assume the direction names within that view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | degrees to rotate |
| `view?` | [`IObjViewOrientation`](IObjViewOrientation.md) | optional view that can redefine the names of the directions |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:793

___

### rotate

▸ **rotate**(`r`): [`V3`](../classes/V3.md)

Rotates vector by a given quaternion rotation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `r` | [`IQtReadonly`](IQtReadonly.md) | quaternion rotation |

#### Returns

[`V3`](../classes/V3.md)

rotated vector

#### Defined in

spark.procedural-animations.math-3d.ts:704

___

### sub

▸ **sub**(`v`): [`V3`](../classes/V3.md)

Returns new vector that represents substraction of another vector from the current vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IV3Readonly`](IV3Readonly.md) | another vector |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:644

___

### toQt

▸ **toQt**(`convertDegreesToRadians?`): [`Qt`](../classes/Qt.md)

Creates quaternion from the current vector considering it to be representation of euler angles rotation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `convertDegreesToRadians?` | `boolean` | if true, will convert degrees to radians, by default set to false |

#### Returns

[`Qt`](../classes/Qt.md)

quaternion rotation

#### Defined in

spark.procedural-animations.math-3d.ts:740

___

### unsignedDegreesTo

▸ **unsignedDegreesTo**(`rhs`): `number`

Unsigned degrees angle to another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rhs` | [`IV3Readonly`](IV3Readonly.md) | another vector |

#### Returns

`number`

degrees angle

#### Defined in

spark.procedural-animations.math-3d.ts:693

___

### withLength

▸ **withLength**(`length`): [`V3`](../classes/V3.md)

Creates new vector that represents current vector with having it's length changed to the given value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `length` | `number` | new vector length |

#### Returns

[`V3`](../classes/V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:763
