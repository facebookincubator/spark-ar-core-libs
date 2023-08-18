[spark-procedural-animations](../README.md) / [Exports](../modules.md) / Actuator

# Class: Actuator

## Implements

- [`IActuatorApplier`](../interfaces/IActuatorApplier.md)

## Table of contents

### Constructors

- [constructor](Actuator.md#constructor)

### Properties

- [\_handle](Actuator.md#_handle)
- [\_lastRotBuilder](Actuator.md#_lastrotbuilder)
- [\_lastTraBuilder](Actuator.md#_lasttrabuilder)
- [\_movement](Actuator.md#_movement)
- [\_name](Actuator.md#_name)
- [\_rotation](Actuator.md#_rotation)

### Accessors

- [handle](Actuator.md#handle)
- [move](Actuator.md#move)
- [movement](Actuator.md#movement)
- [name](Actuator.md#name)
- [noMove](Actuator.md#nomove)
- [noRotation](Actuator.md#norotation)
- [rotate](Actuator.md#rotate)
- [rotation](Actuator.md#rotation)

### Methods

- [apply](Actuator.md#apply)
- [applyMove](Actuator.md#applymove)
- [applyRotation](Actuator.md#applyrotation)
- [computePos](Actuator.md#computepos)
- [computeRot](Actuator.md#computerot)
- [ensureRotBuild](Actuator.md#ensurerotbuild)
- [ensureTraBuild](Actuator.md#ensuretrabuild)
- [setMovement](Actuator.md#setmovement)
- [setRotation](Actuator.md#setrotation)
- [when](Actuator.md#when)

## Constructors

### constructor

• **new Actuator**(`name`, `actuatorHandle`)

Creates an instance of actuator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | actuator name |
| `actuatorHandle` | [`Object3D`](Object3D.md) | handle to actuator object |

#### Defined in

spark.procedural-animations.objects.ts:1635

## Properties

### \_handle

• `Private` **\_handle**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.objects.ts:1625

___

### \_lastRotBuilder

• `Private` **\_lastRotBuilder**: [`RotationBuilder`](RotationBuilder.md)

#### Defined in

spark.procedural-animations.objects.ts:1628

___

### \_lastTraBuilder

• `Private` **\_lastTraBuilder**: [`MovementBuilder`](MovementBuilder.md)

#### Defined in

spark.procedural-animations.objects.ts:1629

___

### \_movement

• `Private` **\_movement**: [`IV3ByProgress`](../interfaces/IV3ByProgress.md)

#### Defined in

spark.procedural-animations.objects.ts:1626

___

### \_name

• `Private` **\_name**: `string`

#### Defined in

spark.procedural-animations.objects.ts:1624

___

### \_rotation

• `Private` **\_rotation**: [`IQtByProgress`](../interfaces/IQtByProgress.md)

#### Defined in

spark.procedural-animations.objects.ts:1627

## Accessors

### handle

• `get` **handle**(): [`Object3D`](Object3D.md)

Gets handle

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.objects.ts:1652

___

### move

• `get` **move**(): [`MovementBuilder`](MovementBuilder.md)

#### Returns

[`MovementBuilder`](MovementBuilder.md)

#### Defined in

spark.procedural-animations.objects.ts:1778

___

### movement

• `get` **movement**(): [`IV3ByProgress`](../interfaces/IV3ByProgress.md)

movement progress object

#### Returns

[`IV3ByProgress`](../interfaces/IV3ByProgress.md)

#### Defined in

spark.procedural-animations.objects.ts:1658

___

### name

• `get` **name**(): `string`

Gets name

#### Returns

`string`

#### Defined in

spark.procedural-animations.objects.ts:1646

___

### noMove

• `get` **noMove**(): [`Actuator`](Actuator.md)

reset movement

#### Returns

[`Actuator`](Actuator.md)

#### Defined in

spark.procedural-animations.objects.ts:1670

___

### noRotation

• `get` **noRotation**(): [`Actuator`](Actuator.md)

reset rotation

#### Returns

[`Actuator`](Actuator.md)

#### Defined in

spark.procedural-animations.objects.ts:1678

___

### rotate

• `get` **rotate**(): [`RotationBuilder`](RotationBuilder.md)

#### Returns

[`RotationBuilder`](RotationBuilder.md)

#### Defined in

spark.procedural-animations.objects.ts:1773

___

### rotation

• `get` **rotation**(): [`IQtByProgress`](../interfaces/IQtByProgress.md)

rotation progress object

#### Returns

[`IQtByProgress`](../interfaces/IQtByProgress.md)

#### Defined in

spark.procedural-animations.objects.ts:1664

## Methods

### apply

▸ **apply**(`tCycle01`, `tMerge01?`): [`IActuatorApplier`](../interfaces/IActuatorApplier.md)

Applys actuator

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tCycle01` | `number` | `undefined` | value of movement from FROM value to TO value |
| `tMerge01?` | `number` | `NaN` | merge with previous state, if not specified or >= 1 then no merge is done |

#### Returns

[`IActuatorApplier`](../interfaces/IActuatorApplier.md)

reference to itself

#### Implementation of

[IActuatorApplier](../interfaces/IActuatorApplier.md).[apply](../interfaces/IActuatorApplier.md#apply)

#### Defined in

spark.procedural-animations.objects.ts:1689

___

### applyMove

▸ **applyMove**(`tCycle01`, `tMerge01?`): [`Actuator`](Actuator.md)

Applys actuator movement

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tCycle01` | `number` | `undefined` | value of movement from FROM value to TO value |
| `tMerge01?` | `number` | `NaN` | merge with previous state, if not specified or >= 1 then no merge is done |

#### Returns

[`Actuator`](Actuator.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1717

___

### applyRotation

▸ **applyRotation**(`tCycle01`, `tMerge01?`): [`Actuator`](Actuator.md)

Applys actuator rotation

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tCycle01` | `number` | `undefined` | value of movement from FROM value to TO value |
| `tMerge01?` | `number` | `NaN` | merge with previous state, if not specified or >= 1 then no merge is done |

#### Returns

[`Actuator`](Actuator.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1700

___

### computePos

▸ **computePos**(`tCycle01`, `tMerge01?`): [`V3`](V3.md)

Compute and return actuator movement without applying it

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tCycle01` | `number` | `undefined` | value of movement from FROM value to TO value |
| `tMerge01?` | `number` | `NaN` | merge with previous state, if not specified or >= 1 then no merge is done |

#### Returns

[`V3`](V3.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1746

___

### computeRot

▸ **computeRot**(`tCycle01`, `tMerge01?`): [`Qt`](Qt.md)

Compute and return actuator rotation without applying it

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tCycle01` | `number` | `undefined` | value of movement from FROM value to TO value |
| `tMerge01?` | `number` | `NaN` | merge with previous state, if not specified or >= 1 then no merge is done |

#### Returns

[`Qt`](Qt.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1733

___

### ensureRotBuild

▸ `Private` **ensureRotBuild**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:1763

___

### ensureTraBuild

▸ `Private` **ensureTraBuild**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:1768

___

### setMovement

▸ **setMovement**(`movement`): [`Actuator`](Actuator.md)

Sets movement progress

#### Parameters

| Name | Type |
| :------ | :------ |
| `movement` | [`IV3ByProgress`](../interfaces/IV3ByProgress.md) |

#### Returns

[`Actuator`](Actuator.md)

#### Defined in

spark.procedural-animations.objects.ts:1793

___

### setRotation

▸ **setRotation**(`rotation`): [`Actuator`](Actuator.md)

Sets rotation progress

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | [`IQtByProgress`](../interfaces/IQtByProgress.md) |

#### Returns

[`Actuator`](Actuator.md)

#### Defined in

spark.procedural-animations.objects.ts:1786

___

### when

▸ **when**(`condition`, `create`): [`Actuator`](Actuator.md)

When a given condition is met, execute actuator action

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `boolean` | condition to check |
| `create` | [`IActionOfT`](../interfaces/IActionOfT.md)<[`Actuator`](Actuator.md)\> | action to ececute if condition is true |

#### Returns

[`Actuator`](Actuator.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1759
