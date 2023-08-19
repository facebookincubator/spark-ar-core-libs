[spark-procedural-animations](../README.md) / [Exports](../modules.md) / ScalarActuator

# Class: ScalarActuator

## Implements

- [`IActuatorApplier`](../interfaces/IActuatorApplier.md)
- [`IActuatorApplierHolder`](../interfaces/IActuatorApplierHolder.md)

## Table of contents

### Constructors

- [constructor](ScalarActuator.md#constructor)

### Properties

- [\_getter](ScalarActuator.md#_getter)
- [\_initial](ScalarActuator.md#_initial)
- [\_setter](ScalarActuator.md#_setter)
- [\_source](ScalarActuator.md#_source)
- [\_target](ScalarActuator.md#_target)

### Accessors

- [a](ScalarActuator.md#a)
- [actuator](ScalarActuator.md#actuator)
- [new](ScalarActuator.md#new)
- [value](ScalarActuator.md#value)

### Methods

- [apply](ScalarActuator.md#apply)
- [from](ScalarActuator.md#from)
- [initialize](ScalarActuator.md#initialize)
- [to](ScalarActuator.md#to)

## Constructors

### constructor

• **new ScalarActuator**(`getter`, `setter`)

Creates an instance of scalar actuator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `getter` | [`IFuncOfT`](../interfaces/IFuncOfT.md)<`number`\> | function to get current value |
| `setter` | [`IActionOfT`](../interfaces/IActionOfT.md)<`number`\> | function to set new value |

#### Defined in

spark.procedural-animations.objects.ts:1602

## Properties

### \_getter

• `Private` **\_getter**: [`IFuncOfT`](../interfaces/IFuncOfT.md)<`number`\>

#### Defined in

spark.procedural-animations.objects.ts:1592

___

### \_initial

• `Private` **\_initial**: `number`

#### Defined in

spark.procedural-animations.objects.ts:1594

___

### \_setter

• `Private` **\_setter**: [`IActionOfT`](../interfaces/IActionOfT.md)<`number`\>

#### Defined in

spark.procedural-animations.objects.ts:1593

___

### \_source

• `Private` **\_source**: `number`

#### Defined in

spark.procedural-animations.objects.ts:1595

___

### \_target

• `Private` **\_target**: `number`

#### Defined in

spark.procedural-animations.objects.ts:1596

## Accessors

### a

• `get` **a**(): [`IActuatorApplier`](../interfaces/IActuatorApplier.md)

alias reference to actuator applier

#### Returns

[`IActuatorApplier`](../interfaces/IActuatorApplier.md)

#### Implementation of

IActuatorApplierHolder.a

#### Defined in

spark.procedural-animations.objects.ts:1618

___

### actuator

• `get` **actuator**(): [`IActuatorApplier`](../interfaces/IActuatorApplier.md)

reference to actuator applier

#### Returns

[`IActuatorApplier`](../interfaces/IActuatorApplier.md)

#### Implementation of

IActuatorApplierHolder.actuator

#### Defined in

spark.procedural-animations.objects.ts:1612

___

### new

• `get` **new**(): [`ScalarActuator`](ScalarActuator.md)

clears any previous values

#### Returns

[`ScalarActuator`](ScalarActuator.md)

#### Defined in

spark.procedural-animations.objects.ts:1636

___

### value

• `get` **value**(): `number`

Gets value

#### Returns

`number`

#### Defined in

spark.procedural-animations.objects.ts:1624

• `set` **value**(`n`): `void`

Sets value

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:1630

## Methods

### apply

▸ **apply**(`tCycle01`, `tMerge01?`): [`IActuatorApplier`](../interfaces/IActuatorApplier.md)

Applys scalar actuator

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

spark.procedural-animations.objects.ts:1668

___

### from

▸ **from**(`n`): [`ScalarActuator`](ScalarActuator.md)

set FROM value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | value to set |

#### Returns

[`ScalarActuator`](ScalarActuator.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1647

___

### initialize

▸ `Private` **initialize**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:1678

___

### to

▸ **to**(`n`): [`ScalarActuator`](ScalarActuator.md)

set TO value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | value to set |

#### Returns

[`ScalarActuator`](ScalarActuator.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1657
