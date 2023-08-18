[spark-procedural-animations](../README.md) / [Exports](../modules.md) / BehaviorExecutor

# Class: BehaviorExecutor

Behavior executor - used to execute behaviors, based on spark Time Module

## Hierarchy

- [`BehaviorManager`](BehaviorManager.md)

  ↳ **`BehaviorExecutor`**

## Table of contents

### Constructors

- [constructor](BehaviorExecutor.md#constructor)

### Properties

- [\_finalizers](BehaviorExecutor.md#_finalizers)
- [\_frame](BehaviorExecutor.md#_frame)
- [\_ms](BehaviorExecutor.md#_ms)
- [\_objectManager](BehaviorExecutor.md#_objectmanager)
- [\_prevMs](BehaviorExecutor.md#_prevms)
- [\_smoothDeltaTime](BehaviorExecutor.md#_smoothdeltatime)

### Accessors

- [fps](BehaviorExecutor.md#fps)
- [frame](BehaviorExecutor.md#frame)
- [ms](BehaviorExecutor.md#ms)
- [numberBehaviors](BehaviorExecutor.md#numberbehaviors)
- [objectManager](BehaviorExecutor.md#objectmanager)
- [seconds](BehaviorExecutor.md#seconds)
- [smoothDeltaTime](BehaviorExecutor.md#smoothdeltatime)

### Methods

- [add](BehaviorExecutor.md#add)
- [addFrameFinalizer](BehaviorExecutor.md#addframefinalizer)
- [finish](BehaviorExecutor.md#finish)
- [forceFinish](BehaviorExecutor.md#forcefinish)
- [forceFinishBehaviorsWithLabel](BehaviorExecutor.md#forcefinishbehaviorswithlabel)
- [onUpdate](BehaviorExecutor.md#onupdate)
- [update](BehaviorExecutor.md#update)

## Constructors

### constructor

• **new BehaviorExecutor**(`om`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `om` | [`ObjectManager`](ObjectManager.md) |

#### Overrides

[BehaviorManager](BehaviorManager.md).[constructor](BehaviorManager.md#constructor)

#### Defined in

spark.procedural-animations.behaviors.ts:627

## Properties

### \_finalizers

• `Private` `Readonly` **\_finalizers**: [`IUpdatable`](../interfaces/IUpdatable.md)[]

#### Defined in

spark.procedural-animations.behaviors.ts:626

___

### \_frame

• `Private` **\_frame**: `number`

#### Defined in

spark.procedural-animations.behaviors.ts:622

___

### \_ms

• `Private` **\_ms**: `number`

#### Defined in

spark.procedural-animations.behaviors.ts:621

___

### \_objectManager

• `Private` `Readonly` **\_objectManager**: [`ObjectManager`](ObjectManager.md)

#### Defined in

spark.procedural-animations.behaviors.ts:625

___

### \_prevMs

• `Private` **\_prevMs**: `number`

#### Defined in

spark.procedural-animations.behaviors.ts:623

___

### \_smoothDeltaTime

• `Private` **\_smoothDeltaTime**: `number`

#### Defined in

spark.procedural-animations.behaviors.ts:624

## Accessors

### fps

• `get` **fps**(): `number`

Frames per second

#### Returns

`number`

#### Defined in

spark.procedural-animations.behaviors.ts:670

___

### frame

• `get` **frame**(): `number`

Current frame number

#### Returns

`number`

#### Defined in

spark.procedural-animations.behaviors.ts:652

___

### ms

• `get` **ms**(): `number`

Number milliseconds

#### Returns

`number`

#### Defined in

spark.procedural-animations.behaviors.ts:640

___

### numberBehaviors

• `get` **numberBehaviors**(): `number`

Number of behaviors currently running

#### Returns

`number`

#### Inherited from

BehaviorManager.numberBehaviors

#### Defined in

spark.procedural-animations.behaviors.ts:407

___

### objectManager

• `get` **objectManager**(): [`ObjectManager`](ObjectManager.md)

Object Manager instance

#### Returns

[`ObjectManager`](ObjectManager.md)

#### Defined in

spark.procedural-animations.behaviors.ts:658

___

### seconds

• `get` **seconds**(): `number`

Number seconds

#### Returns

`number`

#### Defined in

spark.procedural-animations.behaviors.ts:646

___

### smoothDeltaTime

• `get` **smoothDeltaTime**(): `number`

Smooth delta time, between frames

#### Returns

`number`

#### Defined in

spark.procedural-animations.behaviors.ts:664

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

#### Inherited from

[BehaviorManager](BehaviorManager.md).[add](BehaviorManager.md#add)

#### Defined in

spark.procedural-animations.behaviors.ts:506

___

### addFrameFinalizer

▸ **addFrameFinalizer**(`finalizer`): `void`

Adds frame finalizer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `finalizer` | [`IUpdatable`](../interfaces/IUpdatable.md) | object that implements IUpdatable interface, update function of that object will be called at the end of each frame |

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:694

___

### finish

▸ **finish**(): `void`

Finishes all behaviors

#### Returns

`void`

#### Inherited from

[BehaviorManager](BehaviorManager.md).[finish](BehaviorManager.md#finish)

#### Defined in

spark.procedural-animations.behaviors.ts:472

___

### forceFinish

▸ **forceFinish**(): `void`

Force finishes (with cancellation of all follow up actions) all behaviors

#### Returns

`void`

#### Inherited from

[BehaviorManager](BehaviorManager.md).[forceFinish](BehaviorManager.md#forcefinish)

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

#### Inherited from

[BehaviorManager](BehaviorManager.md).[forceFinishBehaviorsWithLabel](BehaviorManager.md#forcefinishbehaviorswithlabel)

#### Defined in

spark.procedural-animations.behaviors.ts:517

___

### onUpdate

▸ `Private` **onUpdate**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:674

___

### update

▸ **update**(): `void`

Updates all behaviors

#### Returns

`void`

#### Inherited from

[BehaviorManager](BehaviorManager.md).[update](BehaviorManager.md#update)

#### Defined in

spark.procedural-animations.behaviors.ts:413
