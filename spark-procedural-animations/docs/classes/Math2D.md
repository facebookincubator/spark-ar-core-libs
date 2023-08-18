[spark-procedural-animations](../README.md) / [Exports](../modules.md) / Math2D

# Class: Math2D

2D Math Operations

## Table of contents

### Constructors

- [constructor](Math2D.md#constructor)

### Methods

- [dot2D](Math2D.md#dot2d)
- [projectPointOnLine](Math2D.md#projectpointonline)
- [rotatePointAbout](Math2D.md#rotatepointabout)
- [rotateVector](Math2D.md#rotatevector)
- [signedDegreesBetweenPoints](Math2D.md#signeddegreesbetweenpoints)
- [signedDegreesBetweenVectors](Math2D.md#signeddegreesbetweenvectors)

## Constructors

### constructor

• **new Math2D**()

## Methods

### dot2D

▸ `Static` **dot2D**(`lhsX`, `lhsY`, `rhsX`, `rhsY`): `number`

Gets dot product of two vectors

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lhsX` | `any` | x of vector 1 |
| `lhsY` | `any` | y of vector 1 |
| `rhsX` | `any` | x of vector 2 |
| `rhsY` | `any` | y of vector 2 |

#### Returns

`number`

dot product value

#### Defined in

spark.procedural-animations.math-2d.ts:809

___

### projectPointOnLine

▸ `Static` **projectPointOnLine**(`pointToProject`, `linePoint1`, `linePoint2`): [`V2`](V2.md)

Projects point on a line

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pointToProject` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | point to project |
| `linePoint1` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | first point of the line |
| `linePoint2` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | second point of the line |

#### Returns

[`V2`](V2.md)

new point that represents the projection of initial point onto the line

#### Defined in

spark.procedural-animations.math-2d.ts:792

___

### rotatePointAbout

▸ `Static` **rotatePointAbout**(`pointToRotate`, `privotPoint`, `degrees`): [`V2`](V2.md)

Rotates point about another point

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pointToRotate` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | point that we want to rotate |
| `privotPoint` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | pivot point |
| `degrees` | `number` | degrees of rotation |

#### Returns

[`V2`](V2.md)

new point that represents the rotation of initial point

#### Defined in

spark.procedural-animations.math-2d.ts:749

___

### rotateVector

▸ `Static` **rotateVector**(`vectorToRotate`, `degrees`): [`V2`](V2.md)

Rotates vector by number of degrees

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vectorToRotate` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | vector to rotate |
| `degrees` | `number` | number of degrees to rotate |

#### Returns

[`V2`](V2.md)

new vector that represents the rotation of initial vector

#### Defined in

spark.procedural-animations.math-2d.ts:779

___

### signedDegreesBetweenPoints

▸ `Static` **signedDegreesBetweenPoints**(`lhsPoint`, `centerPoint`, `rhsPoint`): `number`

Signed degrees between 3 points

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lhsPoint` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | left point |
| `centerPoint` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | central point |
| `rhsPoint` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | right point |

#### Returns

`number`

signed angle between 3 points in degrees

#### Defined in

spark.procedural-animations.math-2d.ts:820

___

### signedDegreesBetweenVectors

▸ `Static` **signedDegreesBetweenVectors**(`v1x`, `v1y`, `v2x`, `v2y`): `number`

Signed degrees between 2 vectors

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v1x` | `number` | x of vector 1 |
| `v1y` | `number` | y of vector 1 |
| `v2x` | `number` | x of vector 2 |
| `v2y` | `number` | y of vector 2 |

#### Returns

`number`

signed angle degrees between vectors

#### Defined in

spark.procedural-animations.math-2d.ts:837
