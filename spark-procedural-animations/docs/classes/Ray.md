[spark-procedural-animations](../README.md) / [Exports](../modules.md) / Ray

# Class: Ray

## Table of contents

### Constructors

- [constructor](Ray.md#constructor)

### Properties

- [direction](Ray.md#direction)
- [origin](Ray.md#origin)

### Methods

- [distanceToPlane](Ray.md#distancetoplane)
- [intersectWithPlane](Ray.md#intersectwithplane)
- [intersectWithSphere](Ray.md#intersectwithsphere)
- [intersectWithSphereBack](Ray.md#intersectwithsphereback)
- [intersectWithSphereBothSides](Ray.md#intersectwithspherebothsides)
- [lookAt](Ray.md#lookat)
- [toString](Ray.md#tostring)

## Constructors

### constructor

• **new Ray**(`origin`, `direction`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |
| `direction` | [`IV3Readonly`](../interfaces/IV3Readonly.md) |

#### Defined in

spark.procedural-animations.math-3d.ts:3462

## Properties

### direction

• **direction**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3462

___

### origin

• **origin**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.math-3d.ts:3462

## Methods

### distanceToPlane

▸ **distanceToPlane**(`planeNormal`, `planePoint`): `number`

Returns the distance between this ray and a plane, -1 if no intersection

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `planeNormal` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | plane normal vector |
| `planePoint` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | plane point |

#### Returns

`number`

the distance to plane

#### Defined in

spark.procedural-animations.math-3d.ts:3478

___

### intersectWithPlane

▸ **intersectWithPlane**(`planeNormal`, `planePoint`): [`V3`](V3.md)

Returns intersection point between this ray and a plane, -1 if no intersection

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `planeNormal` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | plane normal vector |
| `planePoint` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | plane point |

#### Returns

[`V3`](V3.md)

intersection point or NULL

#### Defined in

spark.procedural-animations.math-3d.ts:3494

___

### intersectWithSphere

▸ **intersectWithSphere**(`sphereCenter`, `sphereRadius`): [`V3`](V3.md)

Returns nearest intersection point between this ray and sphere, NULL if no intersection

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sphereCenter` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | sphere center |
| `sphereRadius` | `number` | sphere radius |

#### Returns

[`V3`](V3.md)

nearest intersection point or NULL

#### Defined in

spark.procedural-animations.math-3d.ts:3535

___

### intersectWithSphereBack

▸ **intersectWithSphereBack**(`sphereCenter`, `sphereRadius`): [`V3`](V3.md)

Returns furthest intersection point between this ray and sphere, NULL if no intersection

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sphereCenter` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | sphere center |
| `sphereRadius` | `number` | sphere radius |

#### Returns

[`V3`](V3.md)

furthest intersection point or NULL

#### Defined in

spark.procedural-animations.math-3d.ts:3569

___

### intersectWithSphereBothSides

▸ **intersectWithSphereBothSides**(`sphereCenter`, `sphereRadius`): [[`V3`](V3.md), [`V3`](V3.md)]

Returns intersection points (inside tuple) between this ray and sphere, [NULL, NULL] if no intersection

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sphereCenter` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | sphere center |
| `sphereRadius` | `number` | sphere radius |

#### Returns

[[`V3`](V3.md), [`V3`](V3.md)]

tuple of both intersection points or tuple of 2 NULLs

#### Defined in

spark.procedural-animations.math-3d.ts:3514

___

### lookAt

▸ **lookAt**(`point`): [`Ray`](Ray.md)

Sets the direction of the ray based on target point

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | [`V3`](V3.md) | target point |

#### Returns

[`Ray`](Ray.md)

reference to itself

#### Defined in

spark.procedural-animations.math-3d.ts:3468

___

### toString

▸ **toString**(): `string`

String representation of the current ray

#### Returns

`string`

#### Defined in

spark.procedural-animations.math-3d.ts:3600
