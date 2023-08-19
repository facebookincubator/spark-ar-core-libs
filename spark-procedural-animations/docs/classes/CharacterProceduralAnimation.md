[spark-procedural-animations](../README.md) / [Exports](../modules.md) / CharacterProceduralAnimation

# Class: CharacterProceduralAnimation<TController, TFactory\>

Behavior holder - contains multiple child behaviors, if finished all child behaviors are removed

## Type parameters

| Name | Type |
| :------ | :------ |
| `TController` | extends [`IAnimationController`](../interfaces/IAnimationController.md) |
| `TFactory` | extends [`CharacterFactory`](CharacterFactory.md) |

## Hierarchy

- [`BaseCharacterBehavior`](BaseCharacterBehavior.md)<`TFactory`\>

  ↳ **`CharacterProceduralAnimation`**

## Table of contents

### Constructors

- [constructor](CharacterProceduralAnimation.md#constructor)

### Properties

- [\_character](CharacterProceduralAnimation.md#_character)
- [\_controller](CharacterProceduralAnimation.md#_controller)

### Accessors

- [character](CharacterProceduralAnimation.md#character)
- [controller](CharacterProceduralAnimation.md#controller)
- [factory](CharacterProceduralAnimation.md#factory)
- [followUp](CharacterProceduralAnimation.md#followup)
- [id](CharacterProceduralAnimation.md#id)
- [isDisposed](CharacterProceduralAnimation.md#isdisposed)
- [isFinished](CharacterProceduralAnimation.md#isfinished)
- [isForceFinished](CharacterProceduralAnimation.md#isforcefinished)
- [isInitialized](CharacterProceduralAnimation.md#isinitialized)
- [label](CharacterProceduralAnimation.md#label)
- [numberBehaviors](CharacterProceduralAnimation.md#numberbehaviors)

### Methods

- [action](CharacterProceduralAnimation.md#action)
- [createAndPlayBvr](CharacterProceduralAnimation.md#createandplaybvr)
- [createBvr](CharacterProceduralAnimation.md#createbvr)
- [dispose](CharacterProceduralAnimation.md#dispose)
- [enforceUnique](CharacterProceduralAnimation.md#enforceunique)
- [ensureSingleBehavior](CharacterProceduralAnimation.md#ensuresinglebehavior)
- [finish](CharacterProceduralAnimation.md#finish)
- [forceFinish](CharacterProceduralAnimation.md#forcefinish)
- [forceFinishBehaviorsWithLabel](CharacterProceduralAnimation.md#forcefinishbehaviorswithlabel)
- [forceInitializeAndUpdate](CharacterProceduralAnimation.md#forceinitializeandupdate)
- [ifCondition](CharacterProceduralAnimation.md#ifcondition)
- [initAndPlayCycles](CharacterProceduralAnimation.md#initandplaycycles)
- [initAndPlayEndless](CharacterProceduralAnimation.md#initandplayendless)
- [initAndPlayFor](CharacterProceduralAnimation.md#initandplayfor)
- [initAndPlayInterval](CharacterProceduralAnimation.md#initandplayinterval)
- [initAndPlayRandomIntervals](CharacterProceduralAnimation.md#initandplayrandomintervals)
- [initialize](CharacterProceduralAnimation.md#initialize)
- [markInitialized\_](CharacterProceduralAnimation.md#markinitialized_)
- [onNextFrame](CharacterProceduralAnimation.md#onnextframe)
- [play](CharacterProceduralAnimation.md#play)
- [playCycles](CharacterProceduralAnimation.md#playcycles)
- [playEndless](CharacterProceduralAnimation.md#playendless)
- [playFor](CharacterProceduralAnimation.md#playfor)
- [playHolder](CharacterProceduralAnimation.md#playholder)
- [playInterval](CharacterProceduralAnimation.md#playinterval)
- [playOn](CharacterProceduralAnimation.md#playon)
- [playRandomIntervals](CharacterProceduralAnimation.md#playrandomintervals)
- [setCharacterAndController](CharacterProceduralAnimation.md#setcharacterandcontroller)
- [skipFrames](CharacterProceduralAnimation.md#skipframes)
- [then](CharacterProceduralAnimation.md#then)
- [thenCycles](CharacterProceduralAnimation.md#thencycles)
- [thenEndless](CharacterProceduralAnimation.md#thenendless)
- [thenInitAndCycles](CharacterProceduralAnimation.md#theninitandcycles)
- [thenInitAndEndless](CharacterProceduralAnimation.md#theninitandendless)
- [thenInitAndPlayFor](CharacterProceduralAnimation.md#theninitandplayfor)
- [thenInvoke](CharacterProceduralAnimation.md#theninvoke)
- [thenPlay](CharacterProceduralAnimation.md#thenplay)
- [thenPlayFor](CharacterProceduralAnimation.md#thenplayfor)
- [thenWaitFor](CharacterProceduralAnimation.md#thenwaitfor)
- [update](CharacterProceduralAnimation.md#update)
- [waitFor](CharacterProceduralAnimation.md#waitfor)
- [whenEnds](CharacterProceduralAnimation.md#whenends)
- [whenEndsInvoke](CharacterProceduralAnimation.md#whenendsinvoke)
- [withLabel](CharacterProceduralAnimation.md#withlabel)

## Constructors

### constructor

• **new CharacterProceduralAnimation**<`TController`, `TFactory`\>(`f`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TController` | extends [`IAnimationController`](../interfaces/IAnimationController.md) |
| `TFactory` | extends [`CharacterFactory`](CharacterFactory.md)<`TFactory`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `TFactory` |

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[constructor](BaseCharacterBehavior.md#constructor)

#### Defined in

spark.procedural-animations.base-character.ts:333

## Properties

### \_character

• `Protected` **\_character**: [`BaseCharacter`](BaseCharacter.md)

#### Defined in

spark.procedural-animations.base-character.ts:971

___

### \_controller

• `Protected` **\_controller**: `TController`

#### Defined in

spark.procedural-animations.base-character.ts:972

## Accessors

### character

• `get` **character**(): [`BaseCharacter`](BaseCharacter.md)

character

#### Returns

[`BaseCharacter`](BaseCharacter.md)

#### Defined in

spark.procedural-animations.base-character.ts:1002

___

### controller

• `get` **controller**(): `TController`

controller

#### Returns

`TController`

#### Defined in

spark.procedural-animations.base-character.ts:991

___

### factory

• `get` **factory**(): `T`

#### Returns

`T`

#### Inherited from

BaseCharacterBehavior.factory

#### Defined in

spark.procedural-animations.base-character.ts:330

___

### followUp

• `get` **followUp**(): [`Behavior`](Behavior.md)

Follow up behavior of this behavior

#### Returns

[`Behavior`](Behavior.md)

#### Inherited from

BaseCharacterBehavior.followUp

#### Defined in

spark.procedural-animations.behaviors.ts:370

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Inherited from

BaseCharacterBehavior.id

#### Defined in

spark.procedural-animations.behaviors.ts:97

___

### isDisposed

• `get` **isDisposed**(): `boolean`

Flag inidicating if the behavior was disposed

#### Returns

`boolean`

#### Inherited from

BaseCharacterBehavior.isDisposed

#### Defined in

spark.procedural-animations.behaviors.ts:394

___

### isFinished

• `get` **isFinished**(): `boolean`

Flag inidicating if the behavior was finished

#### Returns

`boolean`

#### Inherited from

BaseCharacterBehavior.isFinished

#### Defined in

spark.procedural-animations.behaviors.ts:382

___

### isForceFinished

• `get` **isForceFinished**(): `boolean`

Flag inidicating if th behavior was force finished (finished with cancellation of all follow up actions)

#### Returns

`boolean`

#### Inherited from

BaseCharacterBehavior.isForceFinished

#### Defined in

spark.procedural-animations.behaviors.ts:388

___

### isInitialized

• `get` **isInitialized**(): `boolean`

Flag inidicating if the behavior was initialized

#### Returns

`boolean`

#### Inherited from

BaseCharacterBehavior.isInitialized

#### Defined in

spark.procedural-animations.behaviors.ts:376

___

### label

• `get` **label**(): `string`

Behavior label

#### Returns

`string`

#### Inherited from

BaseCharacterBehavior.label

#### Defined in

spark.procedural-animations.behaviors.ts:364

___

### numberBehaviors

• `get` **numberBehaviors**(): `number`

Gets number behaviors within this behavior holder

#### Returns

`number`

#### Inherited from

BaseCharacterBehavior.numberBehaviors

#### Defined in

spark.procedural-animations.behaviors.ts:1273

## Methods

### action

▸ **action**(`func`): [`Behavior`](Behavior.md)

executes action passing current behavior as parameter

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | [`IActionOfT`](../interfaces/IActionOfT.md)<[`Behavior`](Behavior.md)\> | function to call |

#### Returns

[`Behavior`](Behavior.md)

reference of the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[action](BaseCharacterBehavior.md#action)

#### Defined in

spark.procedural-animations.behaviors.ts:347

___

### createAndPlayBvr

▸ `Protected` **createAndPlayBvr**<`T`, `TFactory`\>(`type`): `T`

Creates and plays behavior

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`BaseCharacterBehavior`](BaseCharacterBehavior.md)<`TFactory`, `T`\> | the type of the behavior to create |
| `TFactory` | extends [`CharacterFactory`](CharacterFactory.md)<`TFactory`\> | type of the factory |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | (`f`: `TFactory`) => `T` | the type of the behavior to create |

#### Returns

`T`

newly created behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[createAndPlayBvr](BaseCharacterBehavior.md#createandplaybvr)

#### Defined in

spark.procedural-animations.base-character.ts:357

___

### createBvr

▸ `Protected` **createBvr**<`T`, `TFactory`\>(`type`): `T`

Creates behavior

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`BaseCharacterBehavior`](BaseCharacterBehavior.md)<`TFactory`, `T`\> | the type of the behavior to create |
| `TFactory` | extends [`CharacterFactory`](CharacterFactory.md)<`TFactory`\> | type of the factory |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | (`f`: `TFactory`) => `T` | the type of the behavior to create |

#### Returns

`T`

newly created behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[createBvr](BaseCharacterBehavior.md#createbvr)

#### Defined in

spark.procedural-animations.base-character.ts:344

___

### dispose

▸ **dispose**(): `void`

Disposes behavior

#### Returns

`void`

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[dispose](BaseCharacterBehavior.md#dispose)

#### Defined in

spark.procedural-animations.behaviors.ts:121

___

### enforceUnique

▸ **enforceUnique**(`uniqueName`): [`Behavior`](Behavior.md)

Enforce uniqueness of behaviors marked by given unique marker

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uniqueName` | `string` | unique marker |

#### Returns

[`Behavior`](Behavior.md)

reference to the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[enforceUnique](BaseCharacterBehavior.md#enforceunique)

#### Defined in

spark.procedural-animations.behaviors.ts:154

___

### ensureSingleBehavior

▸ **ensureSingleBehavior**(`previous`): [`Behavior`](Behavior.md)

Forces the end of another behavior

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `previous` | [`Behavior`](Behavior.md) | behavior to end |

#### Returns

[`Behavior`](Behavior.md)

reference of the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[ensureSingleBehavior](BaseCharacterBehavior.md#ensuresinglebehavior)

#### Defined in

spark.procedural-animations.behaviors.ts:336

___

### finish

▸ **finish**(): `void`

Finishes the holder and invokes finish on all child behaviors

#### Returns

`void`

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[finish](BaseCharacterBehavior.md#finish)

#### Defined in

spark.procedural-animations.behaviors.ts:1248

___

### forceFinish

▸ **forceFinish**(): `void`

Force finishes the holder (cancelling all follow up actions) and invokes force finish on all child behaviors

#### Returns

`void`

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[forceFinish](BaseCharacterBehavior.md#forcefinish)

#### Defined in

spark.procedural-animations.behaviors.ts:1255

___

### forceFinishBehaviorsWithLabel

▸ **forceFinishBehaviorsWithLabel**(`label`): [`BehaviorHolder`](BehaviorHolder.md)

Forces finish child behaviors marked with the given label

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | label of child behaviors to be forced to finish |

#### Returns

[`BehaviorHolder`](BehaviorHolder.md)

reference to this holder

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[forceFinishBehaviorsWithLabel](BaseCharacterBehavior.md#forcefinishbehaviorswithlabel)

#### Defined in

spark.procedural-animations.behaviors.ts:1266

___

### forceInitializeAndUpdate

▸ **forceInitializeAndUpdate**(): [`Behavior`](Behavior.md)

Forces initialize and update of the behavior

#### Returns

[`Behavior`](Behavior.md)

reference of the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[forceInitializeAndUpdate](BaseCharacterBehavior.md#forceinitializeandupdate)

#### Defined in

spark.procedural-animations.behaviors.ts:315

___

### ifCondition

▸ **ifCondition**(`condiiton`, `func`): [`Behavior`](Behavior.md)

Performs action with that behavior if a given condition is true

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condiiton` | `any` | true or false |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`Behavior`](Behavior.md), [`Behavior`](Behavior.md)\> | function to execute if condition is true |

#### Returns

[`Behavior`](Behavior.md)

reference to the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[ifCondition](BaseCharacterBehavior.md#ifcondition)

#### Defined in

spark.procedural-animations.behaviors.ts:214

___

### initAndPlayCycles

▸ **initAndPlayCycles**(`seconds`, `init`, `act`, `pool?`): [`CycleBehavior`](CycleBehavior.md)

Creates new cycle behavior and plays it inside this behavior holder

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `seconds` | `number` | `undefined` | seconds to call act function on each frame |
| `init` | [`ICycleBehaviorCall`](../modules.md#icyclebehaviorcall) | `undefined` | initialization function to call before any other call (if NULL then no action will be executed) |
| `act` | [`ICycleBehaviorCall`](../modules.md#icyclebehaviorcall) | `undefined` | action to execute on each cycle (cannot be NULL) function parameters: 1.number cycle progress from 0 to 1, 2.index of cycle, 3 - reference to cycle behavior |
| `pool?` | [`IObjectPool`](../interfaces/IObjectPool.md) | `null` | optional object that implements IObjectPool interface, used for object pooling |

#### Returns

[`CycleBehavior`](CycleBehavior.md)

the reference to the newly created cycle behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[initAndPlayCycles](BaseCharacterBehavior.md#initandplaycycles)

#### Defined in

spark.procedural-animations.behaviors.ts:1222

___

### initAndPlayEndless

▸ **initAndPlayEndless**(`init`, `act`, `pool?`): [`CycleBehavior`](CycleBehavior.md)

Creates new cycle behavior with cycle length 1 second and plays it inside this behavior holder

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `init` | [`ICycleBehaviorCall`](../modules.md#icyclebehaviorcall) | `undefined` | initialization function to call before any cycle (can be NULL) |
| `act` | [`ICycleBehaviorCall`](../modules.md#icyclebehaviorcall) | `undefined` | action to execute on each cycle (cannot be NULL) function parameters: 1.number cycle progress from 0 to 1, 2.index of cycle, 3 - reference to cycle behavior |
| `pool?` | [`IObjectPool`](../interfaces/IObjectPool.md) | `null` | optional object that implements IObjectPool interface, used for object pooling |

#### Returns

[`CycleBehavior`](CycleBehavior.md)

the reference to the newly created cycle behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[initAndPlayEndless](BaseCharacterBehavior.md#initandplayendless)

#### Defined in

spark.procedural-animations.behaviors.ts:1207

___

### initAndPlayFor

▸ **initAndPlayFor**(`seconds`, `init`, `act`, `pool?`): [`TimeBehavior`](TimeBehavior.md)

Creates new time behavior and plays it inside this behavior holder

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `seconds` | `number` | `undefined` | seconds to call act function on each frame |
| `init` | [`IActionOfT`](../interfaces/IActionOfT.md)<[`Behavior`](Behavior.md)\> | `undefined` | initialization function to call before any other call (if NULL then no action will be executed |
| `act` | [`IActionOfT`](../interfaces/IActionOfT.md)<`number`\> | `undefined` | action to execute on each frame (cannot be NULL) |
| `pool?` | [`IObjectPool`](../interfaces/IObjectPool.md) | `null` | optional object that implements IObjectPool interface, used for object pooling |

#### Returns

[`TimeBehavior`](TimeBehavior.md)

the reference to the newly created time behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[initAndPlayFor](BaseCharacterBehavior.md#initandplayfor)

#### Defined in

spark.procedural-animations.behaviors.ts:1173

___

### initAndPlayInterval

▸ **initAndPlayInterval**(`seconds`, `init`, `act`): [`IntervalBehavior`](IntervalBehavior.md)

Creates new interval behavior and plays it inside this behavior holder

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seconds` | `number` | interval length in seconds |
| `init` | [`IIntervalBehaviorCall`](../modules.md#iintervalbehaviorcall) | initialization function to call before any interval (if NULL then no action will be executed) |
| `act` | [`IIntervalBehaviorCall`](../modules.md#iintervalbehaviorcall) | action to execute on each interval (cannot be NULL) |

#### Returns

[`IntervalBehavior`](IntervalBehavior.md)

the reference to the newly created interval behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[initAndPlayInterval](BaseCharacterBehavior.md#initandplayinterval)

#### Defined in

spark.procedural-animations.behaviors.ts:1130

___

### initAndPlayRandomIntervals

▸ **initAndPlayRandomIntervals**(`secondsOptions`, `init`, `act`): [`RandomIntervalBehavior`](RandomIntervalBehavior.md)

Creates new random interval behavior and plays it inside this behavior holder

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secondsOptions` | `number`[] | list of interval lengths, a random one will be chosen each time |
| `init` | [`IIntervalBehaviorCall`](../modules.md#iintervalbehaviorcall) | initialization function to call before any interval (if NULL then no action will be executed) |
| `act` | [`IIntervalBehaviorCall`](../modules.md#iintervalbehaviorcall) | action to execute on each interval (cannot be NULL) |

#### Returns

[`RandomIntervalBehavior`](RandomIntervalBehavior.md)

the reference to the newly created random interval behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[initAndPlayRandomIntervals](BaseCharacterBehavior.md#initandplayrandomintervals)

#### Defined in

spark.procedural-animations.behaviors.ts:1158

___

### initialize

▸ **initialize**(): `void`

function called once before the behavior execution starts

#### Returns

`void`

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[initialize](BaseCharacterBehavior.md#initialize)

#### Defined in

spark.procedural-animations.behaviors.ts:103

___

### markInitialized\_

▸ **markInitialized_**(): `void`

internal function to mark that the behavior is initialized

#### Returns

`void`

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[markInitialized_](BaseCharacterBehavior.md#markinitialized_)

#### Defined in

spark.procedural-animations.behaviors.ts:109

___

### onNextFrame

▸ **onNextFrame**(`action`): `void`

Executes action on the next frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`IAction`](../interfaces/IAction.md) | action to execute |

#### Returns

`void`

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[onNextFrame](BaseCharacterBehavior.md#onnextframe)

#### Defined in

spark.procedural-animations.behaviors.ts:1100

___

### play

▸ **play**<`T`\>(`behavior`): `T`

Play behavior in this behavior holder

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Behavior`](Behavior.md)<`T`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `behavior` | `T` | behavior to play |

#### Returns

`T`

reference to the behavior being played

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[play](BaseCharacterBehavior.md#play)

#### Defined in

spark.procedural-animations.behaviors.ts:1073

___

### playCycles

▸ **playCycles**(`seconds`, `act`, `pool?`): [`CycleBehavior`](CycleBehavior.md)

Creates new cycle behavior and plays it inside this behavior holder

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `seconds` | `number` | `undefined` | seconds length of each cycle |
| `act` | [`ICycleBehaviorCall`](../modules.md#icyclebehaviorcall) | `undefined` | action to execute on each cycle (cannot be NULL) function parameters: 1.number cycle progress from 0 to 1, 2.index of cycle, 3 - reference to cycle behavior |
| `pool?` | [`IObjectPool`](../interfaces/IObjectPool.md) | `null` | optional object that implements IObjectPool interface, used for object pooling |

#### Returns

[`CycleBehavior`](CycleBehavior.md)

the reference to the newly created cycle behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[playCycles](BaseCharacterBehavior.md#playcycles)

#### Defined in

spark.procedural-animations.behaviors.ts:1196

___

### playEndless

▸ **playEndless**(`act`, `pool?`): [`CycleBehavior`](CycleBehavior.md)

Creates new cycle behavior with cycle length 1 second and plays it inside this behavior holder

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `act` | [`ICycleBehaviorCall`](../modules.md#icyclebehaviorcall) | `undefined` | action to execute on each cycle (cannot be NULL) function parameters: 1.number cycle progress from 0 to 1, 2.index of cycle, 3 - reference to cycle behavior |
| `pool?` | [`IObjectPool`](../interfaces/IObjectPool.md) | `null` | optional object that implements IObjectPool interface, used for object pooling |

#### Returns

[`CycleBehavior`](CycleBehavior.md)

the reference to the newly created cycle behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[playEndless](BaseCharacterBehavior.md#playendless)

#### Defined in

spark.procedural-animations.behaviors.ts:1236

___

### playFor

▸ **playFor**(`seconds`, `act`, `pool?`): [`TimeBehavior`](TimeBehavior.md)

Creates new time behavior and plays it inside this behavior holder

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `seconds` | `number` | `undefined` | seconds to call act function on each frame |
| `act` | [`IActionOfT`](../interfaces/IActionOfT.md)<`number`\> | `undefined` | action to execute on every frame |
| `pool` | [`IObjectPool`](../interfaces/IObjectPool.md) | `null` | object that implements IObjectPool interface, used for object pooling |

#### Returns

[`TimeBehavior`](TimeBehavior.md)

the reference to the newly created time behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[playFor](BaseCharacterBehavior.md#playfor)

#### Defined in

spark.procedural-animations.behaviors.ts:1110

___

### playHolder

▸ **playHolder**(`previousToFinish?`): [`BehaviorHolder`](BehaviorHolder.md)

Creates new behavior holder and plays it inside this behavior holder

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `previousToFinish?` | [`BehaviorHolder`](BehaviorHolder.md) | optional previous behavior holder to force finish |

#### Returns

[`BehaviorHolder`](BehaviorHolder.md)

the refefence to the newly created behavior holder

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[playHolder](BaseCharacterBehavior.md#playholder)

#### Defined in

spark.procedural-animations.behaviors.ts:1082

___

### playInterval

▸ **playInterval**(`seconds`, `act`, `hasInitCall?`): [`IntervalBehavior`](IntervalBehavior.md)

Creates new interval behavior and plays it inside this behavior holder

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `seconds` | `number` | `undefined` | interval length in seconds |
| `act` | [`IIntervalBehaviorCall`](../modules.md#iintervalbehaviorcall) | `undefined` | action to execute on each interval (cannot be NULL) |
| `hasInitCall?` | `boolean` | `false` | boolean flag indicating that act function should be called before any interval |

#### Returns

[`IntervalBehavior`](IntervalBehavior.md)

the reference to the newly created interval behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[playInterval](BaseCharacterBehavior.md#playinterval)

#### Defined in

spark.procedural-animations.behaviors.ts:1120

___

### playOn

▸ **playOn**(`holder`): [`Behavior`](Behavior.md)

Executes the behavior on the specified behavior holder

#### Parameters

| Name | Type |
| :------ | :------ |
| `holder` | [`BehaviorHolder`](BehaviorHolder.md) |

#### Returns

[`Behavior`](Behavior.md)

on

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[playOn](BaseCharacterBehavior.md#playon)

#### Defined in

spark.procedural-animations.behaviors.ts:356

___

### playRandomIntervals

▸ **playRandomIntervals**(`secondsOptions`, `act`, `hasInitCall?`): [`RandomIntervalBehavior`](RandomIntervalBehavior.md)

Creates new random interval behavior and plays it inside this behavior holder

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `secondsOptions` | `number`[] | `undefined` | list of interval lengths, a random one will be chosen each time |
| `act` | [`IIntervalBehaviorCall`](../modules.md#iintervalbehaviorcall) | `undefined` | action to execute on each interval (cannot be NULL) |
| `hasInitCall?` | `boolean` | `false` | boolean flag indicating that act function should be called before any interval |

#### Returns

[`RandomIntervalBehavior`](RandomIntervalBehavior.md)

the reference to the newly created random interval behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[playRandomIntervals](BaseCharacterBehavior.md#playrandomintervals)

#### Defined in

spark.procedural-animations.behaviors.ts:1144

___

### setCharacterAndController

▸ **setCharacterAndController**(`ch`, `control?`): [`CharacterProceduralAnimation`](CharacterProceduralAnimation.md)<`TController`, `TFactory`\>

Sets character and controller

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ch` | [`BaseCharacter`](BaseCharacter.md) | `undefined` | humanoid character |
| `control?` | `TController` | `null` | controller |

#### Returns

[`CharacterProceduralAnimation`](CharacterProceduralAnimation.md)<`TController`, `TFactory`\>

reference to itself for chaining

#### Defined in

spark.procedural-animations.base-character.ts:980

___

### skipFrames

▸ **skipFrames**(`numberFrames`): [`SkipFramesBehavior`](SkipFramesBehavior.md)

Creates new skip frames behavior and plays it inside this behavior holder

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `numberFrames` | `number` | number framew to skip |

#### Returns

[`SkipFramesBehavior`](SkipFramesBehavior.md)

the refefence to the newly created skip gframes behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[skipFrames](BaseCharacterBehavior.md#skipframes)

#### Defined in

spark.procedural-animations.behaviors.ts:1093

___

### then

▸ **then**(`act`): [`Behavior`](Behavior.md)

Executes action when the behavior ends

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `act` | [`IAction`](../interfaces/IAction.md) | function to execute |

#### Returns

[`Behavior`](Behavior.md)

reference to the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[then](BaseCharacterBehavior.md#then)

#### Defined in

spark.procedural-animations.behaviors.ts:171

___

### thenCycles

▸ **thenCycles**(`seconds`, `act`, `pool?`): [`Behavior`](Behavior.md)

Specifies cycle behavior to execute after this one ends

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `seconds` | `number` | `undefined` | time to run one cycle |
| `act` | [`ICycleBehaviorCall`](../modules.md#icyclebehaviorcall) | `undefined` | function to call on each frame for given time, passing arguments x (progresses from 0 to 1), c (number cycles), and b (reference to cycle behavior) |
| `pool` | [`IObjectPool`](../interfaces/IObjectPool.md) | `null` | object that implements IObjectPool interface, used for object pooling |

#### Returns

[`Behavior`](Behavior.md)

the instance of the cycle behavior that follows the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[thenCycles](BaseCharacterBehavior.md#thencycles)

#### Defined in

spark.procedural-animations.behaviors.ts:261

___

### thenEndless

▸ **thenEndless**(`act`, `pool?`): [`Behavior`](Behavior.md)

Specifies cycle behavior with cycle length of 1 second to execute after this one ends

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `act` | [`ICycleBehaviorCall`](../modules.md#icyclebehaviorcall) | `undefined` | function to call on each frame for given time, passing arguments x (progresses from 0 to 1), c (number cycles), and b (reference to cycle behavior) |
| `pool` | [`IObjectPool`](../interfaces/IObjectPool.md) | `null` | object that implements IObjectPool interface, used for object pooling |

#### Returns

[`Behavior`](Behavior.md)

the instance of the cycle behavior that follows the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[thenEndless](BaseCharacterBehavior.md#thenendless)

#### Defined in

spark.procedural-animations.behaviors.ts:286

___

### thenInitAndCycles

▸ **thenInitAndCycles**(`seconds`, `init`, `act`, `pool?`): [`Behavior`](Behavior.md)

Specifies cycle behavior to execute after this one ends

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `seconds` | `number` | `undefined` | time to run one cycle |
| `init` | [`ICycleBehaviorCall`](../modules.md#icyclebehaviorcall) | `undefined` | function to call once before first frame |
| `act` | [`ICycleBehaviorCall`](../modules.md#icyclebehaviorcall) | `undefined` | function to call on each frame for given time, passing arguments x (progresses from 0 to 1), c (number cycles), and b (reference to cycle behavior) |
| `pool` | [`IObjectPool`](../interfaces/IObjectPool.md) | `null` | object that implements IObjectPool interface, used for object pooling |

#### Returns

[`Behavior`](Behavior.md)

the instance of the cycle behavior that follows the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[thenInitAndCycles](BaseCharacterBehavior.md#theninitandcycles)

#### Defined in

spark.procedural-animations.behaviors.ts:272

___

### thenInitAndEndless

▸ **thenInitAndEndless**(`init`, `act`, `pool?`): [`Behavior`](Behavior.md)

Specifies cycle behavior with cycle length of 1 second to execute after this one ends

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `init` | [`ICycleBehaviorCall`](../modules.md#icyclebehaviorcall) | `undefined` | function to call once before first frame |
| `act` | [`ICycleBehaviorCall`](../modules.md#icyclebehaviorcall) | `undefined` | function to call on each frame for given time, passing arguments x (progresses from 0 to 1), c (number cycles), and b (reference to cycle behavior) |
| `pool` | [`IObjectPool`](../interfaces/IObjectPool.md) | `null` | object that implements IObjectPool interface, used for object pooling |

#### Returns

[`Behavior`](Behavior.md)

the instance of the cycle behavior that follows the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[thenInitAndEndless](BaseCharacterBehavior.md#theninitandendless)

#### Defined in

spark.procedural-animations.behaviors.ts:296

___

### thenInitAndPlayFor

▸ **thenInitAndPlayFor**(`seconds`, `init`, `act`, `pool?`): [`Behavior`](Behavior.md)

Specifies time behavior to execute after this one ends

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `seconds` | `number` | `undefined` | time to run |
| `init` | [`IActionOfT`](../interfaces/IActionOfT.md)<[`Behavior`](Behavior.md)\> | `undefined` | function to execute once before first frame, passing argument of the time behavior |
| `act` | [`IActionOfT`](../interfaces/IActionOfT.md)<`number`\> | `undefined` | function to call on each frame for given time, passing argument x that progresses from 0 to 1 |
| `pool` | [`IObjectPool`](../interfaces/IObjectPool.md) | `null` | object that implements IObjectPool interface, used for object pooling |

#### Returns

[`Behavior`](Behavior.md)

the instance of the time behavior that follows the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[thenInitAndPlayFor](BaseCharacterBehavior.md#theninitandplayfor)

#### Defined in

spark.procedural-animations.behaviors.ts:246

___

### thenInvoke

▸ **thenInvoke**(`eventName`, `args?`): [`Behavior`](Behavior.md)

Invokes event when the behavior ends

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | event name to invoke |
| `args?` | `any` | event arguments (optional) |

#### Returns

[`Behavior`](Behavior.md)

reference to the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[thenInvoke](BaseCharacterBehavior.md#theninvoke)

#### Defined in

spark.procedural-animations.behaviors.ts:191

___

### thenPlay

▸ **thenPlay**<`T`\>(`followUp`): `T`

Specifies another behavior to execute after this one ends

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`Behavior`](Behavior.md)<`T`\> | the type of the other behavior |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `followUp` | `T` | the instance of the other behavior |

#### Returns

`T`

the instance of the other behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[thenPlay](BaseCharacterBehavior.md#thenplay)

#### Defined in

spark.procedural-animations.behaviors.ts:224

___

### thenPlayFor

▸ **thenPlayFor**(`seconds`, `act`, `pool?`): [`Behavior`](Behavior.md)

Specifies time behavior to execute after this one ends

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `seconds` | `number` | `undefined` | time to run |
| `act` | [`IActionOfT`](../interfaces/IActionOfT.md)<`number`\> | `undefined` | function to call on each frame for given time, passing argument x that progresses from 0 to 1 |
| `pool` | [`IObjectPool`](../interfaces/IObjectPool.md) | `null` | object that implements IObjectPool used for object pooling |

#### Returns

[`Behavior`](Behavior.md)

the instance of the time behavior that follows the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[thenPlayFor](BaseCharacterBehavior.md#thenplayfor)

#### Defined in

spark.procedural-animations.behaviors.ts:235

___

### thenWaitFor

▸ **thenWaitFor**(`seconds`): [`Behavior`](Behavior.md)

Specifies wait period after this one ends

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seconds` | `number` | seconds to wait |

#### Returns

[`Behavior`](Behavior.md)

the instance of the wait behavior that follows the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[thenWaitFor](BaseCharacterBehavior.md#thenwaitfor)

#### Defined in

spark.procedural-animations.behaviors.ts:308

___

### update

▸ **update**(): `void`

Invokes update on all child behaviors

#### Returns

`void`

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[update](BaseCharacterBehavior.md#update)

#### Defined in

spark.procedural-animations.behaviors.ts:1242

___

### waitFor

▸ **waitFor**(`seconds`): [`WaitBehavior`](WaitBehavior.md)

Creates new wait behavior and plays it inside this behavior holder

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seconds` | `number` | seconds to wait |

#### Returns

[`WaitBehavior`](WaitBehavior.md)

the reference to the newly created wait behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[waitFor](BaseCharacterBehavior.md#waitfor)

#### Defined in

spark.procedural-animations.behaviors.ts:1186

___

### whenEnds

▸ **whenEnds**(`act`): [`Behavior`](Behavior.md)

Executes action when the behavior ends

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `act` | [`IAction`](../interfaces/IAction.md) | function to execute |

#### Returns

[`Behavior`](Behavior.md)

reference to the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[whenEnds](BaseCharacterBehavior.md#whenends)

#### Defined in

spark.procedural-animations.behaviors.ts:181

___

### whenEndsInvoke

▸ **whenEndsInvoke**(`eventName`, `args?`): [`Behavior`](Behavior.md)

Invokes event when the behavior ends

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | event name to invoke |
| `args?` | `any` | event arguments (optional) |

#### Returns

[`Behavior`](Behavior.md)

reference to the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[whenEndsInvoke](BaseCharacterBehavior.md#whenendsinvoke)

#### Defined in

spark.procedural-animations.behaviors.ts:205

___

### withLabel

▸ **withLabel**(`lbl`): [`Behavior`](Behavior.md)

Sets label for the current behavior

#### Parameters

| Name | Type |
| :------ | :------ |
| `lbl` | `string` |

#### Returns

[`Behavior`](Behavior.md)

reference of the current behavior

#### Inherited from

[BaseCharacterBehavior](BaseCharacterBehavior.md).[withLabel](BaseCharacterBehavior.md#withlabel)

#### Defined in

spark.procedural-animations.behaviors.ts:327
