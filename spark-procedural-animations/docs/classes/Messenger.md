[spark-procedural-animations](../README.md) / [Exports](../modules.md) / Messenger

# Class: Messenger

## Implements

- [`IMessenger`](../interfaces/IMessenger.md)

## Table of contents

### Constructors

- [constructor](Messenger.md#constructor)

### Properties

- [\_eventsByName](Messenger.md#_eventsbyname)
- [\_eventsBySubscriber](Messenger.md#_eventsbysubscriber)

### Methods

- [invoke](Messenger.md#invoke)
- [subscribe](Messenger.md#subscribe)
- [unsubscribe](Messenger.md#unsubscribe)
- [unsubscribeAll](Messenger.md#unsubscribeall)

## Constructors

### constructor

• **new Messenger**()

#### Defined in

spark.procedural-animations.messenger.ts:86

## Properties

### \_eventsByName

• **\_eventsByName**: `Object`

#### Index signature

▪ [key: `string`]: `EventSubscription`[]

#### Defined in

spark.procedural-animations.messenger.ts:84

___

### \_eventsBySubscriber

• **\_eventsBySubscriber**: `Object`

#### Index signature

▪ [key: `string`]: `EventSubscription`[]

#### Defined in

spark.procedural-animations.messenger.ts:85

## Methods

### invoke

▸ **invoke**(`eventName`, `data`): `number`

Invoke an event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | unique string representation of event to invoke |
| `data` | `any` | any data to pass to subscriber |

#### Returns

`number`

number invoked subs rubscriptions

#### Implementation of

[IMessenger](../interfaces/IMessenger.md).[invoke](../interfaces/IMessenger.md#invoke)

#### Defined in

spark.procedural-animations.messenger.ts:166

___

### subscribe

▸ **subscribe**(`eventName`, `call`, `subscriberId`): `void`

Subscribe to an event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | unique string representation of event |
| `call` | [`IMessengerCall`](../interfaces/IMessengerCall.md) | function of type IMessengerCall |
| `subscriberId` | `string` | ID of the subscriber, later we can use that ID to unsubscribe from events |

#### Returns

`void`

#### Implementation of

[IMessenger](../interfaces/IMessenger.md).[subscribe](../interfaces/IMessenger.md#subscribe)

#### Defined in

spark.procedural-animations.messenger.ts:96

___

### unsubscribe

▸ **unsubscribe**(`eventName`, `subscriberId`): `number`

Unsubscribe subscriber from specific event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | unique string representation of event to unsubscribe from |
| `subscriberId` | `string` | ID of the subscriber |

#### Returns

`number`

number of removed subscribtions

#### Implementation of

[IMessenger](../interfaces/IMessenger.md).[unsubscribe](../interfaces/IMessenger.md#unsubscribe)

#### Defined in

spark.procedural-animations.messenger.ts:113

___

### unsubscribeAll

▸ **unsubscribeAll**(`subscriberId`): `number`

Unsubscribe subscriber from all events

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subscriberId` | `string` | ID of the subscriber |

#### Returns

`number`

number of removed subscribtions

#### Implementation of

[IMessenger](../interfaces/IMessenger.md).[unsubscribeAll](../interfaces/IMessenger.md#unsubscribeall)

#### Defined in

spark.procedural-animations.messenger.ts:139
