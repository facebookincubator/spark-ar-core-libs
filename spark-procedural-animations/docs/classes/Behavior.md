[spark-procedural-animations](../README.md) / [Exports](../modules.md) / Behavior

# Class: Behavior

interface that contains dispose method

## Hierarchy

- **`Behavior`**

  ↳ [`FinishedBehavior`](FinishedBehavior.md)

  ↳ [`UnfinishedBehavior`](UnfinishedBehavior.md)

  ↳ [`WaitBehavior`](WaitBehavior.md)

  ↳ [`TimeBehavior`](TimeBehavior.md)

  ↳ [`SkipFramesBehavior`](SkipFramesBehavior.md)

  ↳ [`IntervalBehavior`](IntervalBehavior.md)

  ↳ [`CycleBehavior`](CycleBehavior.md)

  ↳ [`BehaviorHolder`](BehaviorHolder.md)

## Implements

- [`IDisposable`](../interfaces/IDisposable.md)

## Table of contents

### Constructors

- [constructor](Behavior.md#constructor)

### Properties

- [\_followUp](Behavior.md#_followup)
- [\_id](Behavior.md#_id)
- [\_isDisposed](Behavior.md#_isdisposed)
- [\_isFinished](Behavior.md#_isfinished)
- [\_isForceFinished](Behavior.md#_isforcefinished)
- [\_isInitialized](Behavior.md#_isinitialized)
- [\_label](Behavior.md#_label)
- [\_onEnd](Behavior.md#_onend)
- [lastId](Behavior.md#lastid)

### Accessors

- [followUp](Behavior.md#followup)
- [id](Behavior.md#id)
- [isDisposed](Behavior.md#isdisposed)
- [isFinished](Behavior.md#isfinished)
- [isForceFinished](Behavior.md#isforcefinished)
- [isInitialized](Behavior.md#isinitialized)
- [label](Behavior.md#label)

### Methods

- [action](Behavior.md#action)
- [dispose](Behavior.md#dispose)
- [enforceUnique](Behavior.md#enforceunique)
- [ensureSingleBehavior](Behavior.md#ensuresinglebehavior)
- [finish](Behavior.md#finish)
- [forceFinish](Behavior.md#forcefinish)
- [forceInitializeAndUpdate](Behavior.md#forceinitializeandupdate)
- [ifCondition](Behavior.md#ifcondition)
- [initialize](Behavior.md#initialize)
- [markInitialized\_](Behavior.md#markinitialized_)
- [playOn](Behavior.md#playon)
- [then](Behavior.md#then)
- [thenCycles](Behavior.md#thencycles)
- [thenEndless](Behavior.md#thenendless)
- [thenInitAndCycles](Behavior.md#theninitandcycles)
- [thenInitAndEndless](Behavior.md#theninitandendless)
- [thenInitAndPlayFor](Behavior.md#theninitandplayfor)
- [thenInvoke](Behavior.md#theninvoke)
- [thenPlay](Behavior.md#thenplay)
- [thenPlayFor](Behavior.md#thenplayfor)
- [thenWaitFor](Behavior.md#thenwaitfor)
- [update](Behavior.md#update)
- [whenEnds](Behavior.md#whenends)
- [whenEndsInvoke](Behavior.md#whenendsinvoke)
- [withLabel](Behavior.md#withlabel)

## Constructors

### constructor

• **new Behavior**()

#### Defined in

spark.procedural-animations.behaviors.ts:87

## Properties

### \_followUp

• `Private` **\_followUp**: [`Behavior`](Behavior.md)

#### Defined in

spark.procedural-animations.behaviors.ts:84

___

### \_id

• `Private` **\_id**: `string`

#### Defined in

spark.procedural-animations.behaviors.ts:86

___

### \_isDisposed

• `Private` **\_isDisposed**: `boolean`

#### Defined in

spark.procedural-animations.behaviors.ts:82

___

### \_isFinished

• `Private` **\_isFinished**: `boolean`

#### Defined in

spark.procedural-animations.behaviors.ts:80

___

### \_isForceFinished

• `Private` **\_isForceFinished**: `boolean`

#### Defined in

spark.procedural-animations.behaviors.ts:81

___

### \_isInitialized

• `Private` **\_isInitialized**: `boolean`

#### Defined in

spark.procedural-animations.behaviors.ts:79

___

### \_label

• `Private` **\_label**: `string`

#### Defined in

spark.procedural-animations.behaviors.ts:85

___

### \_onEnd

• `Private` **\_onEnd**: [`IAction`](../interfaces/IAction.md)[]

#### Defined in

spark.procedural-animations.behaviors.ts:83

___

### lastId

▪ `Static` `Private` **lastId**: `number` = `0`

#### Defined in

spark.procedural-animations.behaviors.ts:78

## Accessors

### followUp

• `get` **followUp**(): [`Behavior`](Behavior.md)

Follow up behavior of this behavior

#### Returns

[`Behavior`](Behavior.md)

#### Defined in

spark.procedural-animations.behaviors.ts:369

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Defined in

spark.procedural-animations.behaviors.ts:96

___

### isDisposed

• `get` **isDisposed**(): `boolean`

Flag inidicating if the behavior was disposed

#### Returns

`boolean`

#### Defined in

spark.procedural-animations.behaviors.ts:393

___

### isFinished

• `get` **isFinished**(): `boolean`

Flag inidicating if the behavior was finished

#### Returns

`boolean`

#### Defined in

spark.procedural-animations.behaviors.ts:381

___

### isForceFinished

• `get` **isForceFinished**(): `boolean`

Flag inidicating if th behavior was force finished (finished with cancellation of all follow up actions)

#### Returns

`boolean`

#### Defined in

spark.procedural-animations.behaviors.ts:387

___

### isInitialized

• `get` **isInitialized**(): `boolean`

Flag inidicating if the behavior was initialized

#### Returns

`boolean`

#### Defined in

spark.procedural-animations.behaviors.ts:375

___

### label

• `get` **label**(): `string`

Behavior label

#### Returns

`string`

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

#### Defined in

spark.procedural-animations.behaviors.ts:346

___

### dispose

▸ **dispose**(): `void`

Disposes behavior

#### Returns

`void`

#### Implementation of

[IDisposable](../interfaces/IDisposable.md).[dispose](../interfaces/IDisposable.md#dispose)

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

#### Defined in

spark.procedural-animations.behaviors.ts:335

___

### finish

▸ **finish**(): `void`

function to call to end th behavior

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:129

___

### forceFinish

▸ **forceFinish**(): `void`

function to call to end th behavior and cancell all follow up actions

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:140

___

### forceInitializeAndUpdate

▸ **forceInitializeAndUpdate**(): [`Behavior`](Behavior.md)

Forces initialize and update of the behavior

#### Returns

[`Behavior`](Behavior.md)

reference of the current behavior

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

#### Defined in

spark.procedural-animations.behaviors.ts:213

___

### initialize

▸ **initialize**(): `void`

function called once before the behavior execution starts

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:102

___

### markInitialized\_

▸ **markInitialized_**(): `void`

internal function to mark that the behavior is initialized

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:108

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

#### Defined in

spark.procedural-animations.behaviors.ts:355

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

#### Defined in

spark.procedural-animations.behaviors.ts:307

___

### update

▸ **update**(): `void`

Update function called on each frame

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:114

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

#### Defined in

spark.procedural-animations.behaviors.ts:326
