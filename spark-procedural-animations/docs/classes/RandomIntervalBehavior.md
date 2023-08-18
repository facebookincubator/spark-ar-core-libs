[spark-procedural-animations](../README.md) / [Exports](../modules.md) / RandomIntervalBehavior

# Class: RandomIntervalBehavior

Behavior used to execute action on intervals, with length chosen randomly from a list of options

## Hierarchy

- [`IntervalBehavior`](IntervalBehavior.md)

  ↳ **`RandomIntervalBehavior`**

## Table of contents

### Constructors

- [constructor](RandomIntervalBehavior.md#constructor)

### Properties

- [secondsOptions](RandomIntervalBehavior.md#secondsoptions)

### Accessors

- [followUp](RandomIntervalBehavior.md#followup)
- [id](RandomIntervalBehavior.md#id)
- [isDisposed](RandomIntervalBehavior.md#isdisposed)
- [isFinished](RandomIntervalBehavior.md#isfinished)
- [isForceFinished](RandomIntervalBehavior.md#isforcefinished)
- [isInitialized](RandomIntervalBehavior.md#isinitialized)
- [label](RandomIntervalBehavior.md#label)

### Methods

- [action](RandomIntervalBehavior.md#action)
- [dispose](RandomIntervalBehavior.md#dispose)
- [enforceUnique](RandomIntervalBehavior.md#enforceunique)
- [ensureSingleBehavior](RandomIntervalBehavior.md#ensuresinglebehavior)
- [finish](RandomIntervalBehavior.md#finish)
- [forceFinish](RandomIntervalBehavior.md#forcefinish)
- [forceInitializeAndUpdate](RandomIntervalBehavior.md#forceinitializeandupdate)
- [ifCondition](RandomIntervalBehavior.md#ifcondition)
- [initialize](RandomIntervalBehavior.md#initialize)
- [markInitialized\_](RandomIntervalBehavior.md#markinitialized_)
- [onBeforeSettingNextTime](RandomIntervalBehavior.md#onbeforesettingnexttime)
- [playOn](RandomIntervalBehavior.md#playon)
- [redefineInterval](RandomIntervalBehavior.md#redefineinterval)
- [then](RandomIntervalBehavior.md#then)
- [thenCycles](RandomIntervalBehavior.md#thencycles)
- [thenEndless](RandomIntervalBehavior.md#thenendless)
- [thenInitAndCycles](RandomIntervalBehavior.md#theninitandcycles)
- [thenInitAndEndless](RandomIntervalBehavior.md#theninitandendless)
- [thenInitAndPlayFor](RandomIntervalBehavior.md#theninitandplayfor)
- [thenInvoke](RandomIntervalBehavior.md#theninvoke)
- [thenPlay](RandomIntervalBehavior.md#thenplay)
- [thenPlayFor](RandomIntervalBehavior.md#thenplayfor)
- [thenWaitFor](RandomIntervalBehavior.md#thenwaitfor)
- [update](RandomIntervalBehavior.md#update)
- [whenEnds](RandomIntervalBehavior.md#whenends)
- [whenEndsInvoke](RandomIntervalBehavior.md#whenendsinvoke)
- [withLabel](RandomIntervalBehavior.md#withlabel)

## Constructors

### constructor

• **new RandomIntervalBehavior**(`secondsOptions`, `init`, `call`, `pool?`)

Creates an instance of random interval behavior.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `secondsOptions` | `number`[] | `undefined` | list of interval lengths, a random one will be chosen each time |
| `init` | [`IIntervalBehaviorCall`](../modules.md#iintervalbehaviorcall) | `undefined` | executes on initialization (if NULL then no action will be executed) |
| `call` | [`IIntervalBehaviorCall`](../modules.md#iintervalbehaviorcall) | `undefined` | executes on every frame (cannot be NULL) |
| `pool?` | [`IObjectPool`](../interfaces/IObjectPool.md) | `null` | optional object that implements IObjectPool interface, used for object pooling |

#### Overrides

[IntervalBehavior](IntervalBehavior.md).[constructor](IntervalBehavior.md#constructor)

#### Defined in

spark.procedural-animations.behaviors.ts:968

## Properties

### secondsOptions

• `Private` `Readonly` **secondsOptions**: `number`[]

list of interval lengths, a random one will be chosen each time

#### Defined in

spark.procedural-animations.behaviors.ts:969

## Accessors

### followUp

• `get` **followUp**(): [`Behavior`](Behavior.md)

Follow up behavior of this behavior

#### Returns

[`Behavior`](Behavior.md)

#### Inherited from

IntervalBehavior.followUp

#### Defined in

spark.procedural-animations.behaviors.ts:369

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Inherited from

IntervalBehavior.id

#### Defined in

spark.procedural-animations.behaviors.ts:96

___

### isDisposed

• `get` **isDisposed**(): `boolean`

Flag inidicating if the behavior was disposed

#### Returns

`boolean`

#### Inherited from

IntervalBehavior.isDisposed

#### Defined in

spark.procedural-animations.behaviors.ts:393

___

### isFinished

• `get` **isFinished**(): `boolean`

Flag inidicating if the behavior was finished

#### Returns

`boolean`

#### Inherited from

IntervalBehavior.isFinished

#### Defined in

spark.procedural-animations.behaviors.ts:381

___

### isForceFinished

• `get` **isForceFinished**(): `boolean`

Flag inidicating if th behavior was force finished (finished with cancellation of all follow up actions)

#### Returns

`boolean`

#### Inherited from

IntervalBehavior.isForceFinished

#### Defined in

spark.procedural-animations.behaviors.ts:387

___

### isInitialized

• `get` **isInitialized**(): `boolean`

Flag inidicating if the behavior was initialized

#### Returns

`boolean`

#### Inherited from

IntervalBehavior.isInitialized

#### Defined in

spark.procedural-animations.behaviors.ts:375

___

### label

• `get` **label**(): `string`

Behavior label

#### Returns

`string`

#### Inherited from

IntervalBehavior.label

#### Defined in

spark.procedural-animations.behaviors.ts:363

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

[IntervalBehavior](IntervalBehavior.md).[action](IntervalBehavior.md#action)

#### Defined in

spark.procedural-animations.behaviors.ts:346

___

### dispose

▸ **dispose**(): `void`

Disposes behavior

#### Returns

`void`

#### Inherited from

[IntervalBehavior](IntervalBehavior.md).[dispose](IntervalBehavior.md#dispose)

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

[IntervalBehavior](IntervalBehavior.md).[enforceUnique](IntervalBehavior.md#enforceunique)

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

[IntervalBehavior](IntervalBehavior.md).[ensureSingleBehavior](IntervalBehavior.md#ensuresinglebehavior)

#### Defined in

spark.procedural-animations.behaviors.ts:335

___

### finish

▸ **finish**(): `void`

function to call to end th behavior

#### Returns

`void`

#### Inherited from

[IntervalBehavior](IntervalBehavior.md).[finish](IntervalBehavior.md#finish)

#### Defined in

spark.procedural-animations.behaviors.ts:129

___

### forceFinish

▸ **forceFinish**(): `void`

function to call to end th behavior and cancell all follow up actions

#### Returns

`void`

#### Inherited from

[IntervalBehavior](IntervalBehavior.md).[forceFinish](IntervalBehavior.md#forcefinish)

#### Defined in

spark.procedural-animations.behaviors.ts:140

___

### forceInitializeAndUpdate

▸ **forceInitializeAndUpdate**(): [`Behavior`](Behavior.md)

Forces initialize and update of the behavior

#### Returns

[`Behavior`](Behavior.md)

reference of the current behavior

#### Inherited from

[IntervalBehavior](IntervalBehavior.md).[forceInitializeAndUpdate](IntervalBehavior.md#forceinitializeandupdate)

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

[IntervalBehavior](IntervalBehavior.md).[ifCondition](IntervalBehavior.md#ifcondition)

#### Defined in

spark.procedural-animations.behaviors.ts:213

___

### initialize

▸ **initialize**(): `void`

function called once before the behavior execution starts

#### Returns

`void`

#### Inherited from

[IntervalBehavior](IntervalBehavior.md).[initialize](IntervalBehavior.md#initialize)

#### Defined in

spark.procedural-animations.behaviors.ts:921

___

### markInitialized\_

▸ **markInitialized_**(): `void`

internal function to mark that the behavior is initialized

#### Returns

`void`

#### Inherited from

[IntervalBehavior](IntervalBehavior.md).[markInitialized_](IntervalBehavior.md#markinitialized_)

#### Defined in

spark.procedural-animations.behaviors.ts:108

___

### onBeforeSettingNextTime

▸ **onBeforeSettingNextTime**(): `void`

#### Returns

`void`

#### Overrides

[IntervalBehavior](IntervalBehavior.md).[onBeforeSettingNextTime](IntervalBehavior.md#onbeforesettingnexttime)

#### Defined in

spark.procedural-animations.behaviors.ts:978

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

[IntervalBehavior](IntervalBehavior.md).[playOn](IntervalBehavior.md#playon)

#### Defined in

spark.procedural-animations.behaviors.ts:355

___

### redefineInterval

▸ **redefineInterval**(`newSeconds`): `void`

Redefines interval

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newSeconds` | `number` | new inetrval length in seconds |

#### Returns

`void`

#### Inherited from

[IntervalBehavior](IntervalBehavior.md).[redefineInterval](IntervalBehavior.md#redefineinterval)

#### Defined in

spark.procedural-animations.behaviors.ts:947

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

[IntervalBehavior](IntervalBehavior.md).[then](IntervalBehavior.md#then)

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

[IntervalBehavior](IntervalBehavior.md).[thenCycles](IntervalBehavior.md#thencycles)

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

[IntervalBehavior](IntervalBehavior.md).[thenEndless](IntervalBehavior.md#thenendless)

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

[IntervalBehavior](IntervalBehavior.md).[thenInitAndCycles](IntervalBehavior.md#theninitandcycles)

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

[IntervalBehavior](IntervalBehavior.md).[thenInitAndEndless](IntervalBehavior.md#theninitandendless)

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

[IntervalBehavior](IntervalBehavior.md).[thenInitAndPlayFor](IntervalBehavior.md#theninitandplayfor)

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

[IntervalBehavior](IntervalBehavior.md).[thenInvoke](IntervalBehavior.md#theninvoke)

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

[IntervalBehavior](IntervalBehavior.md).[thenPlay](IntervalBehavior.md#thenplay)

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

[IntervalBehavior](IntervalBehavior.md).[thenPlayFor](IntervalBehavior.md#thenplayfor)

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

[IntervalBehavior](IntervalBehavior.md).[thenWaitFor](IntervalBehavior.md#thenwaitfor)

#### Defined in

spark.procedural-animations.behaviors.ts:307

___

### update

▸ **update**(): `void`

Update function called on each frame

#### Returns

`void`

#### Inherited from

[IntervalBehavior](IntervalBehavior.md).[update](IntervalBehavior.md#update)

#### Defined in

spark.procedural-animations.behaviors.ts:927

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

[IntervalBehavior](IntervalBehavior.md).[whenEnds](IntervalBehavior.md#whenends)

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

[IntervalBehavior](IntervalBehavior.md).[whenEndsInvoke](IntervalBehavior.md#whenendsinvoke)

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

[IntervalBehavior](IntervalBehavior.md).[withLabel](IntervalBehavior.md#withlabel)

#### Defined in

spark.procedural-animations.behaviors.ts:326
