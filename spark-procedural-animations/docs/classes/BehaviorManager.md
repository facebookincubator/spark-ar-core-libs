[spark-procedural-animations](../README.md) / [Exports](../modules.md) / BehaviorManager

# Class: BehaviorManager

## Hierarchy

- **`BehaviorManager`**

  ↳ [`BehaviorExecutor`](BehaviorExecutor.md)

## Table of contents

### Constructors

- [constructor](BehaviorManager.md#constructor)

### Properties

- [\_current](BehaviorManager.md#_current)
- [\_pending](BehaviorManager.md#_pending)

### Accessors

- [numberBehaviors](BehaviorManager.md#numberbehaviors)

### Methods

- [add](BehaviorManager.md#add)
- [finish](BehaviorManager.md#finish)
- [forceFinish](BehaviorManager.md#forcefinish)
- [forceFinishBehaviorsWithLabel](BehaviorManager.md#forcefinishbehaviorswithlabel)
- [update](BehaviorManager.md#update)

## Constructors

### constructor

• **new BehaviorManager**()

#### Defined in

spark.procedural-animations.behaviors.ts:400

## Properties

### \_current

• `Private` `Readonly` **\_current**: [`LinkedList`](LinkedList.md)<[`Behavior`](Behavior.md)\>

#### Defined in

spark.procedural-animations.behaviors.ts:398

___

### \_pending

• `Private` `Readonly` **\_pending**: [`LinkedList`](LinkedList.md)<[`Behavior`](Behavior.md)\>

#### Defined in

spark.procedural-animations.behaviors.ts:399

## Accessors

### numberBehaviors

• `get` **numberBehaviors**(): `number`

Number of behaviors currently running

#### Returns

`number`

#### Defined in

spark.procedural-animations.behaviors.ts:407

## Methods

### add

▸ **add**<`T`\>(`behavior`): `T`

Add behavior

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Behavior`](Behavior.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `behavior` | `T` |

#### Returns

`T`

#### Defined in

spark.procedural-animations.behaviors.ts:506

___

### finish

▸ **finish**(): `void`

Finishes all behaviors

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:472

___

### forceFinish

▸ **forceFinish**(): `void`

Force finishes (with cancellation of all follow up actions) all behaviors

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:488

___

### forceFinishBehaviorsWithLabel

▸ **forceFinishBehaviorsWithLabel**(`label`): [`BehaviorManager`](BehaviorManager.md)

Forces finish behaviors with a given label

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | label to identify the behavior |

#### Returns

[`BehaviorManager`](BehaviorManager.md)

the reference to this behavior manager

#### Defined in

spark.procedural-animations.behaviors.ts:517

___

### update

▸ **update**(): `void`

Updates all behaviors

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:413
