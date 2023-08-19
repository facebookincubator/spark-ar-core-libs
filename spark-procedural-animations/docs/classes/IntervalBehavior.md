[spark-procedural-animations](../README.md) / [Exports](../modules.md) / IntervalBehavior

# Class: IntervalBehavior

Behavior used to execute action on regular intervals

## Hierarchy

- [`Behavior`](Behavior.md)

  ↳ **`IntervalBehavior`**

  ↳↳ [`RandomIntervalBehavior`](RandomIntervalBehavior.md)

## Table of contents

### Constructors

- [constructor](IntervalBehavior.md#constructor)

### Properties

- [\_index](IntervalBehavior.md#_index)
- [\_nextEndMs](IntervalBehavior.md#_nextendms)
- [call](IntervalBehavior.md#call)
- [init](IntervalBehavior.md#init)
- [pool](IntervalBehavior.md#pool)
- [seconds](IntervalBehavior.md#seconds)

### Accessors

- [followUp](IntervalBehavior.md#followup)
- [id](IntervalBehavior.md#id)
- [isDisposed](IntervalBehavior.md#isdisposed)
- [isFinished](IntervalBehavior.md#isfinished)
- [isForceFinished](IntervalBehavior.md#isforcefinished)
- [isInitialized](IntervalBehavior.md#isinitialized)
- [label](IntervalBehavior.md#label)

### Methods

- [action](IntervalBehavior.md#action)
- [dispose](IntervalBehavior.md#dispose)
- [enforceUnique](IntervalBehavior.md#enforceunique)
- [ensureSingleBehavior](IntervalBehavior.md#ensuresinglebehavior)
- [finish](IntervalBehavior.md#finish)
- [forceFinish](IntervalBehavior.md#forcefinish)
- [forceInitializeAndUpdate](IntervalBehavior.md#forceinitializeandupdate)
- [ifCondition](IntervalBehavior.md#ifcondition)
- [initialize](IntervalBehavior.md#initialize)
- [markInitialized\_](IntervalBehavior.md#markinitialized_)
- [onBeforeSettingNextTime](IntervalBehavior.md#onbeforesettingnexttime)
- [playOn](IntervalBehavior.md#playon)
- [redefineInterval](IntervalBehavior.md#redefineinterval)
- [setNextTime](IntervalBehavior.md#setnexttime)
- [then](IntervalBehavior.md#then)
- [thenCycles](IntervalBehavior.md#thencycles)
- [thenEndless](IntervalBehavior.md#thenendless)
- [thenInitAndCycles](IntervalBehavior.md#theninitandcycles)
- [thenInitAndEndless](IntervalBehavior.md#theninitandendless)
- [thenInitAndPlayFor](IntervalBehavior.md#theninitandplayfor)
- [thenInvoke](IntervalBehavior.md#theninvoke)
- [thenPlay](IntervalBehavior.md#thenplay)
- [thenPlayFor](IntervalBehavior.md#thenplayfor)
- [thenWaitFor](IntervalBehavior.md#thenwaitfor)
- [update](IntervalBehavior.md#update)
- [whenEnds](IntervalBehavior.md#whenends)
- [whenEndsInvoke](IntervalBehavior.md#whenendsinvoke)
- [withLabel](IntervalBehavior.md#withlabel)

## Constructors

### constructor

• **new IntervalBehavior**(`seconds`, `init`, `call`, `pool?`)

Creates an instance of interval behavior.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `seconds` | `number` | `undefined` | interval length |
| `init` | [`IIntervalBehaviorCall`](../modules.md#iintervalbehaviorcall) | `undefined` | executes on initialization (if NULL then no action will be executed) |
| `call` | [`IIntervalBehaviorCall`](../modules.md#iintervalbehaviorcall) | `undefined` | executes on every frame (cannot be NULL) |
| `pool?` | [`IObjectPool`](../interfaces/IObjectPool.md) | `null` | optional object that implements IObjectPool interface, used for object pooling |

#### Overrides

[Behavior](Behavior.md).[constructor](Behavior.md#constructor)

#### Defined in

spark.procedural-animations.behaviors.ts:920

## Properties

### \_index

• `Private` **\_index**: `number`

#### Defined in

spark.procedural-animations.behaviors.ts:912

___

### \_nextEndMs

• `Private` **\_nextEndMs**: `number`

#### Defined in

spark.procedural-animations.behaviors.ts:911

___

### call

• `Private` `Readonly` **call**: [`IIntervalBehaviorCall`](../modules.md#iintervalbehaviorcall)

executes on every frame (cannot be NULL)

#### Defined in

spark.procedural-animations.behaviors.ts:923

___

### init

• `Private` `Readonly` **init**: [`IIntervalBehaviorCall`](../modules.md#iintervalbehaviorcall)

executes on initialization (if NULL then no action will be executed)

#### Defined in

spark.procedural-animations.behaviors.ts:922

___

### pool

• `Private` `Readonly` **pool**: [`IObjectPool`](../interfaces/IObjectPool.md) = `null`

optional object that implements IObjectPool interface, used for object pooling

#### Defined in

spark.procedural-animations.behaviors.ts:924

___

### seconds

• `Private` **seconds**: `number`

interval length

#### Defined in

spark.procedural-animations.behaviors.ts:921

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

function to call to end th behavior

#### Returns

`void`

#### Inherited from

[Behavior](Behavior.md).[finish](Behavior.md#finish)

#### Defined in

spark.procedural-animations.behaviors.ts:130

___

### forceFinish

▸ **forceFinish**(): `void`

function to call to end th behavior and cancell all follow up actions

#### Returns

`void`

#### Inherited from

[Behavior](Behavior.md).[forceFinish](Behavior.md#forcefinish)

#### Defined in

spark.procedural-animations.behaviors.ts:141

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

### initialize

▸ **initialize**(): `void`

function called once before the behavior execution starts

#### Returns

`void`

#### Overrides

[Behavior](Behavior.md).[initialize](Behavior.md#initialize)

#### Defined in

spark.procedural-animations.behaviors.ts:930

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

### onBeforeSettingNextTime

▸ `Protected` **onBeforeSettingNextTime**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:959

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

### redefineInterval

▸ **redefineInterval**(`newSeconds`): `void`

Redefines interval

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newSeconds` | `number` | new inetrval length in seconds |

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:956

___

### setNextTime

▸ `Private` **setNextTime**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:962

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

Update function called on each frame

#### Returns

`void`

#### Overrides

[Behavior](Behavior.md).[update](Behavior.md#update)

#### Defined in

spark.procedural-animations.behaviors.ts:936

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
