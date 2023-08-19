[spark-procedural-animations](../README.md) / [Exports](../modules.md) / Math3D

# Class: Math3D

3D math static functions

## Table of contents

### Constructors

- [constructor](Math3D.md#constructor)

### Methods

- [convertV2ToV3](Math3D.md#convertv2tov3)
- [convertV3ToV2](Math3D.md#convertv3tov2)
- [cubicBezierV3](Math3D.md#cubicbezierv3)
- [ensureSameDir](Math3D.md#ensuresamedir)
- [getNormalWithPoints](Math3D.md#getnormalwithpoints)
- [getNormalWithVectors](Math3D.md#getnormalwithvectors)
- [getRealUp](Math3D.md#getrealup)
- [invertQuaternion](Math3D.md#invertquaternion)
- [isEqualUsingDotProduct](Math3D.md#isequalusingdotproduct)
- [isOppositeDirAs](Math3D.md#isoppositediras)
- [isPointAbovePlane](Math3D.md#ispointaboveplane)
- [isPointBelowPlane](Math3D.md#ispointbelowplane)
- [isPointWithinPolygon](Math3D.md#ispointwithinpolygon)
- [isPointWithinPolygonIgnoreY](Math3D.md#ispointwithinpolygonignorey)
- [isSameDirAs](Math3D.md#issamediras)
- [isVectorAbovePlane](Math3D.md#isvectoraboveplane)
- [isVectorBelowPlane](Math3D.md#isvectorbelowplane)
- [mulQtByXYZ](Math3D.md#mulqtbyxyz)
- [multiplyQuaternionAndVector](Math3D.md#multiplyquaternionandvector)
- [multiplyQuaternions](Math3D.md#multiplyquaternions)
- [projectDirOnPlane](Math3D.md#projectdironplane)
- [projectPointOnLine](Math3D.md#projectpointonline)
- [projectPointOnPlane](Math3D.md#projectpointonplane)
- [projectUpDir](Math3D.md#projectupdir)
- [projectVecOnNormal](Math3D.md#projectveconnormal)
- [projectVecOnPlane](Math3D.md#projectveconplane)
- [quadraticBezierV3](Math3D.md#quadraticbezierv3)
- [quaternionToAngleAxis](Math3D.md#quaterniontoangleaxis)
- [quaternionToEuler](Math3D.md#quaterniontoeuler)
- [reflectPointOverPlane](Math3D.md#reflectpointoverplane)
- [relCubicBezierV3](Math3D.md#relcubicbezierv3)
- [relQuardaticBezierV3](Math3D.md#relquardaticbezierv3)
- [rotateOneVectorTowardsAnotherByFraction](Math3D.md#rotateonevectortowardsanotherbyfraction)
- [rotatePointAboutPivotAndAxis](Math3D.md#rotatepointaboutpivotandaxis)
- [setQtAsAxisRot](Math3D.md#setqtasaxisrot)
- [setQtAsMultiplication](Math3D.md#setqtasmultiplication)
- [slerpQuaternions](Math3D.md#slerpquaternions)
- [xyzEulerToQt](Math3D.md#xyzeulertoqt)

## Constructors

### constructor

• **new Math3D**()

## Methods

### convertV2ToV3

▸ `Static` **convertV2ToV3**(`vec2`, `xUnit`, `yUnit`, `origin?`): [`V3`](V3.md)

Converts V2 to 33

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec2` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | vector to convert |
| `xUnit` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | x axis as unit vector |
| `yUnit` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | y axis as unit vector |
| `origin?` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | optional origin, or we assume origin 0,0,0 |

#### Returns

[`V3`](V3.md)

V3

#### Defined in

spark.procedural-animations.math-3d.ts:4362

___

### convertV3ToV2

▸ `Static` **convertV3ToV2**(`vec3`, `xUnit`, `yUnit`, `origin?`): [`V2`](V2.md)

Converts V3 to V2

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec3` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | vector to convert |
| `xUnit` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | x axis as unit vector |
| `yUnit` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | y axis as unit vector |
| `origin?` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | optional origin, or we assume origin 0,0,0 |

#### Returns

[`V2`](V2.md)

V2

#### Defined in

spark.procedural-animations.math-3d.ts:4343

___

### cubicBezierV3

▸ `Static` **cubicBezierV3**(`progress`, `start`, `control1`, `control2`, `end`): [`V3`](V3.md)

Returns position of point on a cubic bezier curve

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `progress` | `number` | progress to move along curve |
| `start` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | start of curve |
| `control1` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | control 1 point |
| `control2` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | control 2 point |
| `end` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | end of curve |

#### Returns

[`V3`](V3.md)

point on curve

#### Defined in

spark.procedural-animations.math-3d.ts:4235

___

### ensureSameDir

▸ `Static` **ensureSameDir**(`vec`, `vectorToFlip`): [`V3`](V3.md)

Compared two vectors if they are pointing in the same direction, clones and returns the second, otherwise creates and returns negation of the second

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | one vector |
| `vectorToFlip` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | - |

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3902

___

### getNormalWithPoints

▸ `Static` **getNormalWithPoints**(`p1`, `p2`, `p3`): [`V3`](V3.md)

Gets normal of 3 points, i.e. 3 points form plane and this is the plane normal

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p1` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | point 1 |
| `p2` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | point 2 |
| `p3` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | point 3 |

#### Returns

[`V3`](V3.md)

normal

#### Defined in

spark.procedural-animations.math-3d.ts:3947

___

### getNormalWithVectors

▸ `Static` **getNormalWithVectors**(`lhs`, `rhs`): [`V3`](V3.md)

Gets normal of 2 vectors, i.e. 2 vectors form plane and this is the plane normal

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lhs` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | first vector |
| `rhs` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | second vector |

#### Returns

[`V3`](V3.md)

normal with vectors

#### Defined in

spark.procedural-animations.math-3d.ts:3958

___

### getRealUp

▸ `Static` **getRealUp**(`fw`, `rawUp`): [`V3`](V3.md)

Given forward direction and approximate up direction, returns real up

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fw` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | forward direction |
| `rawUp` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | approximate up direction |

#### Returns

[`V3`](V3.md)

real up

#### Defined in

spark.procedural-animations.math-3d.ts:3781

___

### invertQuaternion

▸ `Static` **invertQuaternion**(`q`): [`Qt`](Qt.md)

Inverts quaternion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `q` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | quaternion to invert |

#### Returns

[`Qt`](Qt.md)

inverted quaternion

#### Defined in

spark.procedural-animations.math-3d.ts:4107

___

### isEqualUsingDotProduct

▸ `Static` **isEqualUsingDotProduct**(`dotProduct`): `boolean`

Determines whether dot product signifies equality

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dotProduct` | `number` | dot product |

#### Returns

`boolean`

true if equal using dot product

#### Defined in

spark.procedural-animations.math-3d.ts:4147

___

### isOppositeDirAs

▸ `Static` **isOppositeDirAs**(`vec`, `otherDir`): `boolean`

Determines whether 2 vectors point in different directions (more than 180 degrees apar)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | one vector |
| `otherDir` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | another vector |

#### Returns

`boolean`

true if pointing in different directions

#### Defined in

spark.procedural-animations.math-3d.ts:3894

___

### isPointAbovePlane

▸ `Static` **isPointAbovePlane**(`point`, `planeNormal`, `planePoint`): `boolean`

Determines whether point is above a plane

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | point to check |
| `planeNormal` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | plane normal |
| `planePoint` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | any point on the plane |

#### Returns

`boolean`

true if point above plane

#### Defined in

spark.procedural-animations.math-3d.ts:3853

___

### isPointBelowPlane

▸ `Static` **isPointBelowPlane**(`point`, `planeNormal`, `planePoint`): `boolean`

Determines whether point is below a plane

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | point to check |
| `planeNormal` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | plane normal |
| `planePoint` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | any point on the plane |

#### Returns

`boolean`

true if point below plane

#### Defined in

spark.procedural-animations.math-3d.ts:3837

___

### isPointWithinPolygon

▸ `Static` **isPointWithinPolygon**(`point`, `polygon`): `boolean`

Determines whether point is within polygon

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | [`IV2Readonly`](../interfaces/IV2Readonly.md) | 2D point |
| `polygon` | [`IV2Readonly`](../interfaces/IV2Readonly.md)[] | polygon of 2D points |

#### Returns

`boolean`

true if point within polygon

#### Defined in

spark.procedural-animations.math-3d.ts:4379

___

### isPointWithinPolygonIgnoreY

▸ `Static` **isPointWithinPolygonIgnoreY**(`point`, `polygon`): `boolean`

Determines whether point is within polygon
ignoring Y dimension assuming X,Z flat land

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | 3D point, Y dimension will be ignored |
| `polygon` | [`IV3Readonly`](../interfaces/IV3Readonly.md)[] | polygon of 3D points where we ignore Y |

#### Returns

`boolean`

true if point within polygon

#### Defined in

spark.procedural-animations.math-3d.ts:4405

___

### isSameDirAs

▸ `Static` **isSameDirAs**(`vec`, `otherDir`): `boolean`

Determines whether 2 vectors point in the same direction (less than 180 degrees apart)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | one vector |
| `otherDir` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | another vector |

#### Returns

`boolean`

true if pointing same direction

#### Defined in

spark.procedural-animations.math-3d.ts:3885

___

### isVectorAbovePlane

▸ `Static` **isVectorAbovePlane**(`vec`, `planeNormal`): `boolean`

Determines whether vector is above a plane

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | vector to check |
| `planeNormal` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | plane normal |

#### Returns

`boolean`

true if vector above plane

#### Defined in

spark.procedural-animations.math-3d.ts:3866

___

### isVectorBelowPlane

▸ `Static` **isVectorBelowPlane**(`vec`, `planeNormal`): `boolean`

Determines whether vector is below a plane

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | vector to check |
| `planeNormal` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | plane normal |

#### Returns

`boolean`

true if vector below plane

#### Defined in

spark.procedural-animations.math-3d.ts:3876

___

### mulQtByXYZ

▸ `Static` **mulQtByXYZ**(`q`, `vx`, `vy`, `vz`): [`V3`](V3.md)

Multiply quaternion by vector, while passing the vector as separate X,Y, and Z components

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `q` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | quaternion rotation |
| `vx` | `number` | vector X component |
| `vy` | `number` | vector Y component |
| `vz` | `number` | vector Z component |

#### Returns

[`V3`](V3.md)

point result of multiplication of quaternion and point

#### Defined in

spark.procedural-animations.math-3d.ts:3736

___

### multiplyQuaternionAndVector

▸ `Static` **multiplyQuaternionAndVector**(`q`, `v`): [`V3`](V3.md)

Multiplys quaternion and vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `q` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | quaternion to multiply |
| `v` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | vector to multiply |

#### Returns

[`V3`](V3.md)

vector

#### Defined in

spark.procedural-animations.math-3d.ts:4156

___

### multiplyQuaternions

▸ `Static` **multiplyQuaternions**(`lhs`, `rhs`): [`Qt`](Qt.md)

Multiplys quaternions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lhs` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | left hand quaternion |
| `rhs` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | right hand quaternion |

#### Returns

[`Qt`](Qt.md)

#### Defined in

spark.procedural-animations.math-3d.ts:4045

___

### projectDirOnPlane

▸ `Static` **projectDirOnPlane**(`vec`, `planeNormal`): [`V3`](V3.md)

Projects unit vector (direction) on a plane

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | unit vector (direction) |
| `planeNormal` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | plane normal vector |

#### Returns

[`V3`](V3.md)

unit vection (direction) after projection on a plane

#### Defined in

spark.procedural-animations.math-3d.ts:3792

___

### projectPointOnLine

▸ `Static` **projectPointOnLine**(`point`, `line1`, `line2`): [`V3`](V3.md)

Projects point on a line

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | point to project |
| `line1` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | line point 1 |
| `line2` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | line point 2 |

#### Returns

[`V3`](V3.md)

point on line after prokection

#### Defined in

spark.procedural-animations.math-3d.ts:3824

___

### projectPointOnPlane

▸ `Static` **projectPointOnPlane**(`point`, `planeNormal`, `planePoint`): [`V3`](V3.md)

Projects point on a plane

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | point to project |
| `planeNormal` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | plane normal |
| `planePoint` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | any point on the plane |

#### Returns

[`V3`](V3.md)

projected point on plane

#### Defined in

spark.procedural-animations.math-3d.ts:3913

___

### projectUpDir

▸ `Static` **projectUpDir**(`prevFw`, `prevUp`, `currFw`): [`V3`](V3.md)

In a chain of nodes, given the previous forward and up diretions and the new node forward, find the up direction projection on the new node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prevFw` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | previous node forward |
| `prevUp` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | previous node up |
| `currFw` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | current node forward (normal for the plane we are projecting onto) |

#### Returns

[`V3`](V3.md)

up direction projected onto the current node forward plane

#### Defined in

spark.procedural-animations.math-3d.ts:4431

___

### projectVecOnNormal

▸ `Static` **projectVecOnNormal**(`vec`, `onNormal`): [`V3`](V3.md)

Projects vector on a normal

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | vector to project |
| `onNormal` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | normal to project on |

#### Returns

[`V3`](V3.md)

vector after projection on the normal

#### Defined in

spark.procedural-animations.math-3d.ts:3811

___

### projectVecOnPlane

▸ `Static` **projectVecOnPlane**(`vec`, `planeNormal`): [`V3`](V3.md)

Projects vector on a plane

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | vector to project |
| `planeNormal` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | plane normal |

#### Returns

[`V3`](V3.md)

vector projection on the plane

#### Defined in

spark.procedural-animations.math-3d.ts:3801

___

### quadraticBezierV3

▸ `Static` **quadraticBezierV3**(`progress`, `start`, `control`, `end`): [`V3`](V3.md)

Returns position of point on a quadratic bezier curve

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `progress` | `number` | progress to move along curve |
| `start` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | start of curve |
| `control` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | control point |
| `end` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | end of curve |

#### Returns

[`V3`](V3.md)

point on curve

#### Defined in

spark.procedural-animations.math-3d.ts:4183

___

### quaternionToAngleAxis

▸ `Static` **quaternionToAngleAxis**(`q`): [`number`, [`V3`](V3.md)]

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | [`IQtReadonly`](../interfaces/IQtReadonly.md) |

#### Returns

[`number`, [`V3`](V3.md)]

[angle in degrees, axis]

#### Defined in

spark.procedural-animations.math-3d.ts:4124

___

### quaternionToEuler

▸ `Static` **quaternionToEuler**(`q`): [`V3`](V3.md)

Quaternions to euler

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `q` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | quaternion to convert |

#### Returns

[`V3`](V3.md)

euler

#### Defined in

spark.procedural-animations.math-3d.ts:3975

___

### reflectPointOverPlane

▸ `Static` **reflectPointOverPlane**(`point`, `planeNormal`, `planePoint`): [`V3`](V3.md)

Reflects point over plane

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | point to reflect |
| `planeNormal` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | plane normal |
| `planePoint` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | any point on the plane |

#### Returns

[`V3`](V3.md)

point reflection over plane

#### Defined in

spark.procedural-animations.math-3d.ts:3930

___

### relCubicBezierV3

▸ `Static` **relCubicBezierV3**(`progress`, `start`, `control1`, `control2`, `end`): [`V3`](V3.md)

Returns position of point on a relative cubic bezier curve

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `progress` | `number` | progress to move along curve |
| `start` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | start of curve |
| `control1` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | relative vector that will devine control 1 point by adding it to start point |
| `control2` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | relative vector that will devine control 2 point by adding it to end point |
| `end` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | end of curve |

#### Returns

[`V3`](V3.md)

point on curve

#### Defined in

spark.procedural-animations.math-3d.ts:4274

___

### relQuardaticBezierV3

▸ `Static` **relQuardaticBezierV3**(`progress`, `start`, `control`, `end`): [`V3`](V3.md)

Returns position of point on a relative quadratic bezier curve

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `progress` | `number` | progress to move along curve |
| `start` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | start of curve |
| `control` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | relative vector that will devine control point by adding it to mid point betwen start and end |
| `end` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | end of curve |

#### Returns

[`V3`](V3.md)

point on curve

#### Defined in

spark.procedural-animations.math-3d.ts:4218

___

### rotateOneVectorTowardsAnotherByFraction

▸ `Static` **rotateOneVectorTowardsAnotherByFraction**(`lhs`, `rhs`, `progress01`): [`V3`](V3.md)

Rotates one vector towards another by fraction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lhs` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | first vector |
| `rhs` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | second vector |
| `progress01` | `number` | fraction of rotation from 0 to 1 |

#### Returns

[`V3`](V3.md)

rotated vector

#### Defined in

spark.procedural-animations.math-3d.ts:3762

___

### rotatePointAboutPivotAndAxis

▸ `Static` **rotatePointAboutPivotAndAxis**(`rotatePoint`, `pivot`, `axis`, `degrees`): [`V3`](V3.md)

Rotates point about pivot point and axis

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rotatePoint` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | point to rotate |
| `pivot` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | pivot point |
| `axis` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | axis of rotation |
| `degrees` | `number` | rotation angle in degrees |

#### Returns

[`V3`](V3.md)

rotated point

#### Defined in

spark.procedural-animations.math-3d.ts:3699

___

### setQtAsAxisRot

▸ `Static` **setQtAsAxisRot**(`rot`, `axis`, `degrees`): [`Qt`](Qt.md)

Sets quaternion as axis rotation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rot` | [`Qt`](Qt.md) | quaternion to set |
| `axis` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | axis to rotate around |
| `degrees` | `number` | rotation angles in degrees |

#### Returns

[`Qt`](Qt.md)

returns the same quaternion passed as first parameter

#### Defined in

spark.procedural-animations.math-3d.ts:4322

___

### setQtAsMultiplication

▸ `Static` **setQtAsMultiplication**(`toSet`, `lhs`, `rhs`): [`Qt`](Qt.md)

Multiplys quaternions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `toSet` | [`Qt`](Qt.md) | quaternion to update as multiplication of the following quaternions |
| `lhs` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | left hand quaternion |
| `rhs` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | right hand quaternion |

#### Returns

[`Qt`](Qt.md)

reference to the quaternion passed as first argument

#### Defined in

spark.procedural-animations.math-3d.ts:4077

___

### slerpQuaternions

▸ `Static` **slerpQuaternions**(`lhs`, `rhs`, `progress01`): [`Qt`](Qt.md)

Slerps quaternions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lhs` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | left hand quaternion |
| `rhs` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | right hand quaternion |
| `progress01` | `number` | progress 0 to 1 |

#### Returns

[`Qt`](Qt.md)

quaternion that represent transition from one to another quaternion, that much progress

#### Defined in

spark.procedural-animations.math-3d.ts:3998

___

### xyzEulerToQt

▸ `Static` **xyzEulerToQt**(`x?`, `y?`, `z?`, `convertDegreesToRadians?`): [`Qt`](Qt.md)

Euler to quaternion

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x?` | `number` | `0` | euler x |
| `y?` | `number` | `0` | euler y |
| `z?` | `number` | `0` | euler z |
| `convertDegreesToRadians?` | `boolean` | `false` | convert degrees to radians, false by default |

#### Returns

[`Qt`](Qt.md)

quaternion

#### Defined in

spark.procedural-animations.math-3d.ts:4291
