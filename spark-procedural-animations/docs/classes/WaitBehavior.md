[spark-procedural-animations](../README.md) / [Exports](../modules.md) / WaitBehavior

# Class: WaitBehavior

Behavior used to wait certain time before doing something else

## Hierarchy

- [`Behavior`](Behavior.md)

  ↳ **`WaitBehavior`**

## Table of contents

### Constructors

- [constructor](WaitBehavior.md#constructor)

### Properties

- [\_endMs](WaitBehavior.md#_endms)
- [\_seconds](WaitBehavior.md#_seconds)

### Accessors

- [followUp](WaitBehavior.md#followup)
- [id](WaitBehavior.md#id)
- [isDisposed](WaitBehavior.md#isdisposed)
- [isFinished](WaitBehavior.md#isfinished)
- [isForceFinished](WaitBehavior.md#isforcefinished)
- [isInitialized](WaitBehavior.md#isinitialized)
- [label](WaitBehavior.md#label)

### Methods

- [action](WaitBehavior.md#action)
- [dispose](WaitBehavior.md#dispose)
- [enforceUnique](WaitBehavior.md#enforceunique)
- [ensureSingleBehavior](WaitBehavior.md#ensuresinglebehavior)
- [finish](WaitBehavior.md#finish)
- [forceFinish](WaitBehavior.md#forcefinish)
- [forceInitializeAndUpdate](WaitBehavior.md#forceinitializeandupdate)
- [ifCondition](WaitBehavior.md#ifcondition)
- [initialize](WaitBehavior.md#initialize)
- [markInitialized\_](WaitBehavior.md#markinitialized_)
- [playOn](WaitBehavior.md#playon)
- [then](WaitBehavior.md#then)
- [thenCycles](WaitBehavior.md#thencycles)
- [thenEndless](WaitBehavior.md#thenendless)
- [thenInitAndCycles](WaitBehavior.md#theninitandcycles)
- [thenInitAndEndless](WaitBehavior.md#theninitandendless)
- [thenInitAndPlayFor](WaitBehavior.md#theninitandplayfor)
- [thenInvoke](WaitBehavior.md#theninvoke)
- [thenPlay](WaitBehavior.md#thenplay)
- [thenPlayFor](WaitBehavior.md#thenplayfor)
- [thenWaitFor](WaitBehavior.md#thenwaitfor)
- [update](WaitBehavior.md#update)
- [whenEnds](WaitBehavior.md#whenends)
- [whenEndsInvoke](WaitBehavior.md#whenendsinvoke)
- [withLabel](WaitBehavior.md#withlabel)

## Constructors

### constructor

• **new WaitBehavior**(`seconds`)

Creates an instance of wait behavior.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seconds` | `number` | number of seconds to wait |

#### Overrides

[Behavior](Behavior.md).[constructor](Behavior.md#constructor)

#### Defined in

spark.procedural-animations.behaviors.ts:817

## Properties

### \_endMs

• `Private` **\_endMs**: `number`

#### Defined in

spark.procedural-animations.behaviors.ts:812

___

### \_seconds

• `Private` **\_seconds**: `number`

#### Defined in

spark.procedural-animations.behaviors.ts:811

## Accessors

### followUp

• `get` **followUp**(): [`Behavior`](Behavior.md)

Follow up behavior of this behavior

#### Returns

[`Behavior`](Behavior.md)

#### Inherited from

Behavior.followUp

#### Defined in

spark.procedural-animations.behaviors.ts:369

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Inherited from

Behavior.id

#### Defined in

spark.procedural-animations.behaviors.ts:96

___

### isDisposed

• `get` **isDisposed**(): `boolean`

Flag inidicating if the behavior was disposed

#### Returns

`boolean`

#### Inherited from

Behavior.isDisposed

#### Defined in

spark.procedural-animations.behaviors.ts:393

___

### isFinished

• `get` **isFinished**(): `boolean`

Flag inidicating if the behavior was finished

#### Returns

`boolean`

#### Inherited from

Behavior.isFinished

#### Defined in

spark.procedural-animations.behaviors.ts:381

___

### isForceFinished

• `get` **isForceFinished**(): `boolean`

Flag inidicating if th behavior was force finished (finished with cancellation of all follow up actions)

#### Returns

`boolean`

#### Inherited from

Behavior.isForceFinished

#### Defined in

spark.procedural-animations.behaviors.ts:387

___

### isInitialized

• `get` **isInitialized**(): `boolean`

Flag inidicating if the behavior was initialized

#### Returns

`boolean`

#### Inherited from

Behavior.isInitialized

#### Defined in

spark.procedural-animations.behaviors.ts:375

___

### label

• `get` **label**(): `string`

Behavior label

#### Returns

`string`

#### Inherited from

Behavior.label

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

[Behavior](Behavior.md).[action](Behavior.md#action)

#### Defined in

spark.procedural-animations.behaviors.ts:346

___

### dispose

▸ **dispose**(): `void`

Disposes behavior

#### Returns

`void`

#### Inherited from

[Behavior](Behavior.md).[dispose](Behavior.md#dispose)

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

[Behavior](Behavior.md).[enforceUnique](Behavior.md#enforceunique)

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

[Behavior](Behavior.md).[ensureSingleBehavior](Behavior.md#ensuresinglebehavior)

#### Defined in

spark.procedural-animations.behaviors.ts:335

___

### finish

▸ **finish**(): `void`

function to call to end th behavior

#### Returns

`void`

#### Inherited from

[Behavior](Behavior.md).[finish](Behavior.md#finish)

#### Defined in

spark.procedural-animations.behaviors.ts:129

___

### forceFinish

▸ **forceFinish**(): `void`

function to call to end th behavior and cancell all follow up actions

#### Returns

`void`

#### Inherited from

[Behavior](Behavior.md).[forceFinish](Behavior.md#forcefinish)

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

[Behavior](Behavior.md).[forceInitializeAndUpdate](Behavior.md#forceinitializeandupdate)

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

[Behavior](Behavior.md).[ifCondition](Behavior.md#ifcondition)

#### Defined in

spark.procedural-animations.behaviors.ts:213

___

### initialize

▸ **initialize**(): `void`

function called once before the behavior execution starts

#### Returns

`void`

#### Overrides

[Behavior](Behavior.md).[initialize](Behavior.md#initialize)

#### Defined in

spark.procedural-animations.behaviors.ts:821

___

### markInitialized\_

▸ **markInitialized_**(): `void`

internal function to mark that the behavior is initialized

#### Returns

`void`

#### Inherited from

[Behavior](Behavior.md).[markInitialized_](Behavior.md#markinitialized_)

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

#### Inherited from

[Behavior](Behavior.md).[playOn](Behavior.md#playon)

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

#### Inherited from

[Behavior](Behavior.md).[then](Behavior.md#then)

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

[Behavior](Behavior.md).[thenCycles](Behavior.md#thencycles)

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

[Behavior](Behavior.md).[thenEndless](Behavior.md#thenendless)

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

[Behavior](Behavior.md).[thenInitAndCycles](Behavior.md#theninitandcycles)

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

[Behavior](Behavior.md).[thenInitAndEndless](Behavior.md#theninitandendless)

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

[Behavior](Behavior.md).[thenInitAndPlayFor](Behavior.md#theninitandplayfor)

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

[Behavior](Behavior.md).[thenInvoke](Behavior.md#theninvoke)

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

[Behavior](Behavior.md).[thenPlay](Behavior.md#thenplay)

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

[Behavior](Behavior.md).[thenPlayFor](Behavior.md#thenplayfor)

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

[Behavior](Behavior.md).[thenWaitFor](Behavior.md#thenwaitfor)

#### Defined in

spark.procedural-animations.behaviors.ts:307

___

### update

▸ **update**(): `void`

Update function called on each frame

#### Returns

`void`

#### Overrides

[Behavior](Behavior.md).[update](Behavior.md#update)

#### Defined in

spark.procedural-animations.behaviors.ts:824

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

[Behavior](Behavior.md).[whenEndsInvoke](Behavior.md#whenendsinvoke)

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

[Behavior](Behavior.md).[withLabel](Behavior.md#withlabel)

#### Defined in

spark.procedural-animations.behaviors.ts:326
