[spark-procedural-animations](../README.md) / [Exports](../modules.md) / BaseCharacterBehavior

# Class: BaseCharacterBehavior<T\>

Behavior holder - contains multiple child behaviors, if finished all child behaviors are removed

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`CharacterFactory`](CharacterFactory.md) |

## Hierarchy

- [`BehaviorHolder`](BehaviorHolder.md)

  ↳ **`BaseCharacterBehavior`**

  ↳↳ [`CharacterProceduralAnimation`](CharacterProceduralAnimation.md)

## Table of contents

### Constructors

- [constructor](BaseCharacterBehavior.md#constructor)

### Properties

- [\_factory](BaseCharacterBehavior.md#_factory)

### Accessors

- [factory](BaseCharacterBehavior.md#factory)
- [followUp](BaseCharacterBehavior.md#followup)
- [id](BaseCharacterBehavior.md#id)
- [isDisposed](BaseCharacterBehavior.md#isdisposed)
- [isFinished](BaseCharacterBehavior.md#isfinished)
- [isForceFinished](BaseCharacterBehavior.md#isforcefinished)
- [isInitialized](BaseCharacterBehavior.md#isinitialized)
- [label](BaseCharacterBehavior.md#label)
- [numberBehaviors](BaseCharacterBehavior.md#numberbehaviors)

### Methods

- [action](BaseCharacterBehavior.md#action)
- [createAndPlayBvr](BaseCharacterBehavior.md#createandplaybvr)
- [createBvr](BaseCharacterBehavior.md#createbvr)
- [dispose](BaseCharacterBehavior.md#dispose)
- [enforceUnique](BaseCharacterBehavior.md#enforceunique)
- [ensureSingleBehavior](BaseCharacterBehavior.md#ensuresinglebehavior)
- [finish](BaseCharacterBehavior.md#finish)
- [forceFinish](BaseCharacterBehavior.md#forcefinish)
- [forceFinishBehaviorsWithLabel](BaseCharacterBehavior.md#forcefinishbehaviorswithlabel)
- [forceInitializeAndUpdate](BaseCharacterBehavior.md#forceinitializeandupdate)
- [ifCondition](BaseCharacterBehavior.md#ifcondition)
- [initAndPlayCycles](BaseCharacterBehavior.md#initandplaycycles)
- [initAndPlayEndless](BaseCharacterBehavior.md#initandplayendless)
- [initAndPlayFor](BaseCharacterBehavior.md#initandplayfor)
- [initAndPlayInterval](BaseCharacterBehavior.md#initandplayinterval)
- [initAndPlayRandomIntervals](BaseCharacterBehavior.md#initandplayrandomintervals)
- [initialize](BaseCharacterBehavior.md#initialize)
- [markInitialized\_](BaseCharacterBehavior.md#markinitialized_)
- [onNextFrame](BaseCharacterBehavior.md#onnextframe)
- [play](BaseCharacterBehavior.md#play)
- [playCycles](BaseCharacterBehavior.md#playcycles)
- [playEndless](BaseCharacterBehavior.md#playendless)
- [playFor](BaseCharacterBehavior.md#playfor)
- [playHolder](BaseCharacterBehavior.md#playholder)
- [playInterval](BaseCharacterBehavior.md#playinterval)
- [playOn](BaseCharacterBehavior.md#playon)
- [playRandomIntervals](BaseCharacterBehavior.md#playrandomintervals)
- [skipFrames](BaseCharacterBehavior.md#skipframes)
- [then](BaseCharacterBehavior.md#then)
- [thenCycles](BaseCharacterBehavior.md#thencycles)
- [thenEndless](BaseCharacterBehavior.md#thenendless)
- [thenInitAndCycles](BaseCharacterBehavior.md#theninitandcycles)
- [thenInitAndEndless](BaseCharacterBehavior.md#theninitandendless)
- [thenInitAndPlayFor](BaseCharacterBehavior.md#theninitandplayfor)
- [thenInvoke](BaseCharacterBehavior.md#theninvoke)
- [thenPlay](BaseCharacterBehavior.md#thenplay)
- [thenPlayFor](BaseCharacterBehavior.md#thenplayfor)
- [thenWaitFor](BaseCharacterBehavior.md#thenwaitfor)
- [update](BaseCharacterBehavior.md#update)
- [waitFor](BaseCharacterBehavior.md#waitfor)
- [whenEnds](BaseCharacterBehavior.md#whenends)
- [whenEndsInvoke](BaseCharacterBehavior.md#whenendsinvoke)
- [withLabel](BaseCharacterBehavior.md#withlabel)

## Constructors

### constructor

• **new BaseCharacterBehavior**<`T`\>(`f`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`CharacterFactory`](CharacterFactory.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `T` |

#### Overrides

[BehaviorHolder](BehaviorHolder.md).[constructor](BehaviorHolder.md#constructor)

#### Defined in

spark.procedural-animations.base-character.ts:334

## Properties

### \_factory

• `Private` **\_factory**: `T`

#### Defined in

spark.procedural-animations.base-character.ts:330

## Accessors

### factory

• `get` **factory**(): `T`

#### Returns

`T`

#### Defined in

spark.procedural-animations.base-character.ts:331

___

### followUp

• `get` **followUp**(): [`Behavior`](Behavior.md)

Follow up behavior of this behavior

#### Returns

[`Behavior`](Behavior.md)

#### Inherited from

BehaviorHolder.followUp

#### Defined in

spark.procedural-animations.behaviors.ts:369

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Inherited from

BehaviorHolder.id

#### Defined in

spark.procedural-animations.behaviors.ts:96

___

### isDisposed

• `get` **isDisposed**(): `boolean`

Flag inidicating if the behavior was disposed

#### Returns

`boolean`

#### Inherited from

BehaviorHolder.isDisposed

#### Defined in

spark.procedural-animations.behaviors.ts:393

___

### isFinished

• `get` **isFinished**(): `boolean`

Flag inidicating if the behavior was finished

#### Returns

`boolean`

#### Inherited from

BehaviorHolder.isFinished

#### Defined in

spark.procedural-animations.behaviors.ts:381

___

### isForceFinished

• `get` **isForceFinished**(): `boolean`

Flag inidicating if th behavior was force finished (finished with cancellation of all follow up actions)

#### Returns

`boolean`

#### Inherited from

BehaviorHolder.isForceFinished

#### Defined in

spark.procedural-animations.behaviors.ts:387

___

### isInitialized

• `get` **isInitialized**(): `boolean`

Flag inidicating if the behavior was initialized

#### Returns

`boolean`

#### Inherited from

BehaviorHolder.isInitialized

#### Defined in

spark.procedural-animations.behaviors.ts:375

___

### label

• `get` **label**(): `string`

Behavior label

#### Returns

`string`

#### Inherited from

BehaviorHolder.label

#### Defined in

spark.procedural-animations.behaviors.ts:363

___

### numberBehaviors

• `get` **numberBehaviors**(): `number`

Gets number behaviors within this behavior holder

#### Returns

`number`

#### Inherited from

BehaviorHolder.numberBehaviors

#### Defined in

spark.procedural-animations.behaviors.ts:1264

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

[BehaviorHolder](BehaviorHolder.md).[action](BehaviorHolder.md#action)

#### Defined in

spark.procedural-animations.behaviors.ts:346

___

### createAndPlayBvr

▸ `Protected` **createAndPlayBvr**<`T`, `TFactory`\>(`type`): `T`

Creates and plays behavior

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`BaseCharacterBehavior`](BaseCharacterBehavior.md)<`TFactory`\> | the type of the behavior to create |
| `TFactory` | extends [`CharacterFactory`](CharacterFactory.md) | type of the factory |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | (`f`: `TFactory`) => `T` | the type of the behavior to create |

#### Returns

`T`

newly created behavior

#### Defined in

spark.procedural-animations.base-character.ts:358

___

### createBvr

▸ `Protected` **createBvr**<`T`, `TFactory`\>(`type`): `T`

Creates behavior

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`BaseCharacterBehavior`](BaseCharacterBehavior.md)<`TFactory`\> | the type of the behavior to create |
| `TFactory` | extends [`CharacterFactory`](CharacterFactory.md) | type of the factory |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | (`f`: `TFactory`) => `T` | the type of the behavior to create |

#### Returns

`T`

newly created behavior

#### Defined in

spark.procedural-animations.base-character.ts:345

___

### dispose

▸ **dispose**(): `void`

Disposes behavior

#### Returns

`void`

#### Inherited from

[BehaviorHolder](BehaviorHolder.md).[dispose](BehaviorHolder.md#dispose)

#### Defined in

spark.procedural-animations.behaviors.ts:120

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

[BehaviorHolder](BehaviorHolder.md).[enforceUnique](BehaviorHolder.md#enforceunique)

#### Defined in

spark.procedural-animations.behaviors.ts:153

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

[BehaviorHolder](BehaviorHolder.md).[ensureSingleBehavior](BehaviorHolder.md#ensuresinglebehavior)

#### Defined in

spark.procedural-animations.behaviors.ts:335

___

### finish

▸ **finish**(): `void`

Finishes the holder and invokes finish on all child behaviors

#### Returns

`void`

#### Inherited from

[BehaviorHolder](BehaviorHolder.md).[finish](BehaviorHolder.md#finish)

#### Defined in

spark.procedural-animations.behaviors.ts:1239

___

### forceFinish

▸ **forceFinish**(): `void`

Force finishes the holder (cancelling all follow up actions) and invokes force finish on all child behaviors

#### Returns

`void`

#### Inherited from

[BehaviorHolder](BehaviorHolder.md).[forceFinish](BehaviorHolder.md#forcefinish)

#### Defined in

spark.procedural-animations.behaviors.ts:1246

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

[BehaviorHolder](BehaviorHolder.md).[forceFinishBehaviorsWithLabel](BehaviorHolder.md#forcefinishbehaviorswithlabel)

#### Defined in

spark.procedural-animations.behaviors.ts:1257

___

### forceInitializeAndUpdate

▸ **forceInitializeAndUpdate**(): [`Behavior`](Behavior.md)

Forces initialize and update of the behavior

#### Returns

[`Behavior`](Behavior.md)

reference of the current behavior

#### Inherited from

[BehaviorHolder](BehaviorHolder.md).[forceInitializeAndUpdate](BehaviorHolder.md#forceinitializeandupdate)

#### Defined in

spark.procedural-animations.behaviors.ts:314

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

[BehaviorHolder](BehaviorHolder.md).[ifCondition](BehaviorHolder.md#ifcondition)

#### Defined in

spark.procedural-animations.behaviors.ts:213

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

[BehaviorHolder](BehaviorHolder.md).[initAndPlayCycles](BehaviorHolder.md#initandplaycycles)

#### Defined in

spark.procedural-animations.behaviors.ts:1213

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

[BehaviorHolder](BehaviorHolder.md).[initAndPlayEndless](BehaviorHolder.md#initandplayendless)

#### Defined in

spark.procedural-animations.behaviors.ts:1198

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

[BehaviorHolder](BehaviorHolder.md).[initAndPlayFor](BehaviorHolder.md#initandplayfor)

#### Defined in

spark.procedural-animations.behaviors.ts:1164

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

[BehaviorHolder](BehaviorHolder.md).[initAndPlayInterval](BehaviorHolder.md#initandplayinterval)

#### Defined in

spark.procedural-animations.behaviors.ts:1121

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

[BehaviorHolder](BehaviorHolder.md).[initAndPlayRandomIntervals](BehaviorHolder.md#initandplayrandomintervals)

#### Defined in

spark.procedural-animations.behaviors.ts:1149

___

### initialize

▸ **initialize**(): `void`

function called once before the behavior execution starts

#### Returns

`void`

#### Inherited from

[BehaviorHolder](BehaviorHolder.md).[initialize](BehaviorHolder.md#initialize)

#### Defined in

spark.procedural-animations.behaviors.ts:102

___

### markInitialized\_

▸ **markInitialized_**(): `void`

internal function to mark that the behavior is initialized

#### Returns

`void`

#### Inherited from

[BehaviorHolder](BehaviorHolder.md).[markInitialized_](BehaviorHolder.md#markinitialized_)

#### Defined in

spark.procedural-animations.behaviors.ts:108

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

[BehaviorHolder](BehaviorHolder.md).[onNextFrame](BehaviorHolder.md#onnextframe)

#### Defined in

spark.procedural-animations.behaviors.ts:1091

___

### play

▸ **play**<`T`\>(`behavior`): `T`

Play behavior in this behavior holder

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Behavior`](Behavior.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `behavior` | `T` | behavior to play |

#### Returns

`T`

reference to the behavior being played

#### Inherited from

[BehaviorHolder](BehaviorHolder.md).[play](BehaviorHolder.md#play)

#### Defined in

spark.procedural-animations.behaviors.ts:1064

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

[BehaviorHolder](BehaviorHolder.md).[playCycles](BehaviorHolder.md#playcycles)

#### Defined in

spark.procedural-animations.behaviors.ts:1187

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

[BehaviorHolder](BehaviorHolder.md).[playEndless](BehaviorHolder.md#playendless)

#### Defined in

spark.procedural-animations.behaviors.ts:1227

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

[BehaviorHolder](BehaviorHolder.md).[playFor](BehaviorHolder.md#playfor)

#### Defined in

spark.procedural-animations.behaviors.ts:1101

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

[BehaviorHolder](BehaviorHolder.md).[playHolder](BehaviorHolder.md#playholder)

#### Defined in

spark.procedural-animations.behaviors.ts:1073

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

[BehaviorHolder](BehaviorHolder.md).[playInterval](BehaviorHolder.md#playinterval)

#### Defined in

spark.procedural-animations.behaviors.ts:1111

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

[BehaviorHolder](BehaviorHolder.md).[playOn](BehaviorHolder.md#playon)

#### Defined in

spark.procedural-animations.behaviors.ts:355

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

[BehaviorHolder](BehaviorHolder.md).[playRandomIntervals](BehaviorHolder.md#playrandomintervals)

#### Defined in

spark.procedural-animations.behaviors.ts:1135

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

[BehaviorHolder](BehaviorHolder.md).[skipFrames](BehaviorHolder.md#skipframes)

#### Defined in

spark.procedural-animations.behaviors.ts:1084

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

[BehaviorHolder](BehaviorHolder.md).[then](BehaviorHolder.md#then)

#### Defined in

spark.procedural-animations.behaviors.ts:170

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

[BehaviorHolder](BehaviorHolder.md).[thenCycles](BehaviorHolder.md#thencycles)

#### Defined in

spark.procedural-animations.behaviors.ts:260

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

[BehaviorHolder](BehaviorHolder.md).[thenEndless](BehaviorHolder.md#thenendless)

#### Defined in

spark.procedural-animations.behaviors.ts:285

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

[BehaviorHolder](BehaviorHolder.md).[thenInitAndCycles](BehaviorHolder.md#theninitandcycles)

#### Defined in

spark.procedural-animations.behaviors.ts:271

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

[BehaviorHolder](BehaviorHolder.md).[thenInitAndEndless](BehaviorHolder.md#theninitandendless)

#### Defined in

spark.procedural-animations.behaviors.ts:295

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

[BehaviorHolder](BehaviorHolder.md).[thenInitAndPlayFor](BehaviorHolder.md#theninitandplayfor)

#### Defined in

spark.procedural-animations.behaviors.ts:245

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

[BehaviorHolder](BehaviorHolder.md).[thenInvoke](BehaviorHolder.md#theninvoke)

#### Defined in

spark.procedural-animations.behaviors.ts:190

___

### thenPlay

▸ **thenPlay**<`T`\>(`followUp`): `T`

Specifies another behavior to execute after this one ends

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`Behavior`](Behavior.md) | the type of the other behavior |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `followUp` | `T` | the instance of the other behavior |

#### Returns

`T`

the instance of the other behavior

#### Inherited from

[BehaviorHolder](BehaviorHolder.md).[thenPlay](BehaviorHolder.md#thenplay)

#### Defined in

spark.procedural-animations.behaviors.ts:223

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

[BehaviorHolder](BehaviorHolder.md).[thenPlayFor](BehaviorHolder.md#thenplayfor)

#### Defined in

spark.procedural-animations.behaviors.ts:234

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

[BehaviorHolder](BehaviorHolder.md).[thenWaitFor](BehaviorHolder.md#thenwaitfor)

#### Defined in

spark.procedural-animations.behaviors.ts:307

___

### update

▸ **update**(): `void`

Invokes update on all child behaviors

#### Returns

`void`

#### Inherited from

[BehaviorHolder](BehaviorHolder.md).[update](BehaviorHolder.md#update)

#### Defined in

spark.procedural-animations.behaviors.ts:1233

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

[BehaviorHolder](BehaviorHolder.md).[waitFor](BehaviorHolder.md#waitfor)

#### Defined in

spark.procedural-animations.behaviors.ts:1177

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

[BehaviorHolder](BehaviorHolder.md).[whenEnds](BehaviorHolder.md#whenends)

#### Defined in

spark.procedural-animations.behaviors.ts:180

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

[BehaviorHolder](BehaviorHolder.md).[whenEndsInvoke](BehaviorHolder.md#whenendsinvoke)

#### Defined in

spark.procedural-animations.behaviors.ts:204

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

[BehaviorHolder](BehaviorHolder.md).[withLabel](BehaviorHolder.md#withlabel)

#### Defined in

spark.procedural-animations.behaviors.ts:326
