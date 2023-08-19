[spark-procedural-animations](../README.md) / [Exports](../modules.md) / BehaviorHolder

# Class: BehaviorHolder

Behavior holder - contains multiple child behaviors, if finished all child behaviors are removed

## Hierarchy

- [`Behavior`](Behavior.md)

  ↳ **`BehaviorHolder`**

  ↳↳ [`BaseCharacterBehavior`](BaseCharacterBehavior.md)

## Table of contents

### Constructors

- [constructor](BehaviorHolder.md#constructor)

### Properties

- [\_behaviors](BehaviorHolder.md#_behaviors)

### Accessors

- [followUp](BehaviorHolder.md#followup)
- [id](BehaviorHolder.md#id)
- [isDisposed](BehaviorHolder.md#isdisposed)
- [isFinished](BehaviorHolder.md#isfinished)
- [isForceFinished](BehaviorHolder.md#isforcefinished)
- [isInitialized](BehaviorHolder.md#isinitialized)
- [label](BehaviorHolder.md#label)
- [numberBehaviors](BehaviorHolder.md#numberbehaviors)

### Methods

- [action](BehaviorHolder.md#action)
- [dispose](BehaviorHolder.md#dispose)
- [enforceUnique](BehaviorHolder.md#enforceunique)
- [ensureSingleBehavior](BehaviorHolder.md#ensuresinglebehavior)
- [finish](BehaviorHolder.md#finish)
- [forceFinish](BehaviorHolder.md#forcefinish)
- [forceFinishBehaviorsWithLabel](BehaviorHolder.md#forcefinishbehaviorswithlabel)
- [forceInitializeAndUpdate](BehaviorHolder.md#forceinitializeandupdate)
- [ifCondition](BehaviorHolder.md#ifcondition)
- [initAndPlayCycles](BehaviorHolder.md#initandplaycycles)
- [initAndPlayEndless](BehaviorHolder.md#initandplayendless)
- [initAndPlayFor](BehaviorHolder.md#initandplayfor)
- [initAndPlayInterval](BehaviorHolder.md#initandplayinterval)
- [initAndPlayRandomIntervals](BehaviorHolder.md#initandplayrandomintervals)
- [initialize](BehaviorHolder.md#initialize)
- [markInitialized\_](BehaviorHolder.md#markinitialized_)
- [onNextFrame](BehaviorHolder.md#onnextframe)
- [play](BehaviorHolder.md#play)
- [playCycles](BehaviorHolder.md#playcycles)
- [playEndless](BehaviorHolder.md#playendless)
- [playFor](BehaviorHolder.md#playfor)
- [playHolder](BehaviorHolder.md#playholder)
- [playInterval](BehaviorHolder.md#playinterval)
- [playOn](BehaviorHolder.md#playon)
- [playRandomIntervals](BehaviorHolder.md#playrandomintervals)
- [skipFrames](BehaviorHolder.md#skipframes)
- [then](BehaviorHolder.md#then)
- [thenCycles](BehaviorHolder.md#thencycles)
- [thenEndless](BehaviorHolder.md#thenendless)
- [thenInitAndCycles](BehaviorHolder.md#theninitandcycles)
- [thenInitAndEndless](BehaviorHolder.md#theninitandendless)
- [thenInitAndPlayFor](BehaviorHolder.md#theninitandplayfor)
- [thenInvoke](BehaviorHolder.md#theninvoke)
- [thenPlay](BehaviorHolder.md#thenplay)
- [thenPlayFor](BehaviorHolder.md#thenplayfor)
- [thenWaitFor](BehaviorHolder.md#thenwaitfor)
- [update](BehaviorHolder.md#update)
- [waitFor](BehaviorHolder.md#waitfor)
- [whenEnds](BehaviorHolder.md#whenends)
- [whenEndsInvoke](BehaviorHolder.md#whenendsinvoke)
- [withLabel](BehaviorHolder.md#withlabel)

## Constructors

### constructor

• **new BehaviorHolder**()

#### Overrides

[Behavior](Behavior.md).[constructor](Behavior.md#constructor)

#### Defined in

spark.procedural-animations.behaviors.ts:1064

## Properties

### \_behaviors

• `Private` **\_behaviors**: [`BehaviorManager`](BehaviorManager.md)

#### Defined in

spark.procedural-animations.behaviors.ts:1063

## Accessors

### followUp

• `get` **followUp**(): [`Behavior`](Behavior.md)

Follow up behavior of this behavior

#### Returns

[`Behavior`](Behavior.md)

#### Inherited from

Behavior.followUp

#### Defined in

spark.procedural-animations.behaviors.ts:370

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Inherited from

Behavior.id

#### Defined in

spark.procedural-animations.behaviors.ts:97

___

### isDisposed

• `get` **isDisposed**(): `boolean`

Flag inidicating if the behavior was disposed

#### Returns

`boolean`

#### Inherited from

Behavior.isDisposed

#### Defined in

spark.procedural-animations.behaviors.ts:394

___

### isFinished

• `get` **isFinished**(): `boolean`

Flag inidicating if the behavior was finished

#### Returns

`boolean`

#### Inherited from

Behavior.isFinished

#### Defined in

spark.procedural-animations.behaviors.ts:382

___

### isForceFinished

• `get` **isForceFinished**(): `boolean`

Flag inidicating if th behavior was force finished (finished with cancellation of all follow up actions)

#### Returns

`boolean`

#### Inherited from

Behavior.isForceFinished

#### Defined in

spark.procedural-animations.behaviors.ts:388

___

### isInitialized

• `get` **isInitialized**(): `boolean`

Flag inidicating if the behavior was initialized

#### Returns

`boolean`

#### Inherited from

Behavior.isInitialized

#### Defined in

spark.procedural-animations.behaviors.ts:376

___

### label

• `get` **label**(): `string`

Behavior label

#### Returns

`string`

#### Inherited from

Behavior.label

#### Defined in

spark.procedural-animations.behaviors.ts:364

___

### numberBehaviors

• `get` **numberBehaviors**(): `number`

Gets number behaviors within this behavior holder

#### Returns

`number`

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

[Behavior](Behavior.md).[action](Behavior.md#action)

#### Defined in

spark.procedural-animations.behaviors.ts:347

___

### dispose

▸ **dispose**(): `void`

Disposes behavior

#### Returns

`void`

#### Inherited from

[Behavior](Behavior.md).[dispose](Behavior.md#dispose)

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

[Behavior](Behavior.md).[enforceUnique](Behavior.md#enforceunique)

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

[Behavior](Behavior.md).[ensureSingleBehavior](Behavior.md#ensuresinglebehavior)

#### Defined in

spark.procedural-animations.behaviors.ts:336

___

### finish

▸ **finish**(): `void`

Finishes the holder and invokes finish on all child behaviors

#### Returns

`void`

#### Overrides

[Behavior](Behavior.md).[finish](Behavior.md#finish)

#### Defined in

spark.procedural-animations.behaviors.ts:1248

___

### forceFinish

▸ **forceFinish**(): `void`

Force finishes the holder (cancelling all follow up actions) and invokes force finish on all child behaviors

#### Returns

`void`

#### Overrides

[Behavior](Behavior.md).[forceFinish](Behavior.md#forcefinish)

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

[Behavior](Behavior.md).[forceInitializeAndUpdate](Behavior.md#forceinitializeandupdate)

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

[Behavior](Behavior.md).[ifCondition](Behavior.md#ifcondition)

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

#### Defined in

spark.procedural-animations.behaviors.ts:1158

___

### initialize

▸ **initialize**(): `void`

function called once before the behavior execution starts

#### Returns

`void`

#### Inherited from

[Behavior](Behavior.md).[initialize](Behavior.md#initialize)

#### Defined in

spark.procedural-animations.behaviors.ts:103

___

### markInitialized\_

▸ **markInitialized_**(): `void`

internal function to mark that the behavior is initialized

#### Returns

`void`

#### Inherited from

[Behavior](Behavior.md).[markInitialized_](Behavior.md#markinitialized_)

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

[Behavior](Behavior.md).[playOn](Behavior.md#playon)

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

#### Defined in

spark.procedural-animations.behaviors.ts:1144

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

[Behavior](Behavior.md).[then](Behavior.md#then)

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

[Behavior](Behavior.md).[thenCycles](Behavior.md#thencycles)

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

[Behavior](Behavior.md).[thenEndless](Behavior.md#thenendless)

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

[Behavior](Behavior.md).[thenInitAndCycles](Behavior.md#theninitandcycles)

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

[Behavior](Behavior.md).[thenInitAndEndless](Behavior.md#theninitandendless)

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

[Behavior](Behavior.md).[thenInitAndPlayFor](Behavior.md#theninitandplayfor)

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

[Behavior](Behavior.md).[thenInvoke](Behavior.md#theninvoke)

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

[Behavior](Behavior.md).[thenPlay](Behavior.md#thenplay)

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

[Behavior](Behavior.md).[thenPlayFor](Behavior.md#thenplayfor)

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

[Behavior](Behavior.md).[thenWaitFor](Behavior.md#thenwaitfor)

#### Defined in

spark.procedural-animations.behaviors.ts:308

___

### update

▸ **update**(): `void`

Invokes update on all child behaviors

#### Returns

`void`

#### Overrides

[Behavior](Behavior.md).[update](Behavior.md#update)

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

[Behavior](Behavior.md).[whenEnds](Behavior.md#whenends)

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

[Behavior](Behavior.md).[whenEndsInvoke](Behavior.md#whenendsinvoke)

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

[Behavior](Behavior.md).[withLabel](Behavior.md#withlabel)

#### Defined in

spark.procedural-animations.behaviors.ts:327
