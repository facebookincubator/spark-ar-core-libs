[spark-procedural-animations](../README.md) / [Exports](../modules.md) / IActuatorApplier

# Interface: IActuatorApplier

## Implemented by

- [`Actuator`](../classes/Actuator.md)
- [`ScalarActuator`](../classes/ScalarActuator.md)

## Table of contents

### Methods

- [apply](IActuatorApplier.md#apply)

## Methods

### apply

▸ **apply**(`tCycle01`, `tMerge01`): [`IActuatorApplier`](IActuatorApplier.md)

Applies actuator progress

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tCycle01` | `number` | progres |
| `tMerge01` | `number` | merge progress with previous state, if not pased or if above 1 then no merge with previous state is done |

#### Returns

[`IActuatorApplier`](IActuatorApplier.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:51
