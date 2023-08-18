[spark-procedural-animations](../README.md) / [Exports](../modules.md) / IMessenger

# Interface: IMessenger

## Implemented by

- [`Messenger`](../classes/Messenger.md)

## Table of contents

### Methods

- [invoke](IMessenger.md#invoke)
- [subscribe](IMessenger.md#subscribe)
- [unsubscribe](IMessenger.md#unsubscribe)
- [unsubscribeAll](IMessenger.md#unsubscribeall)

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

#### Defined in

spark.procedural-animations.messenger.ts:53

___

### subscribe

▸ **subscribe**(`eventName`, `call`, `subscriberId`): `void`

Subscribe to an event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | unique string representation of event |
| `call` | [`IMessengerCall`](IMessengerCall.md) | function of type IMessengerCall |
| `subscriberId` | `string` | ID of the subscriber, later we can use that ID to unsubscribe from events |

#### Returns

`void`

#### Defined in

spark.procedural-animations.messenger.ts:32

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

#### Defined in

spark.procedural-animations.messenger.ts:39

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

#### Defined in

spark.procedural-animations.messenger.ts:45
