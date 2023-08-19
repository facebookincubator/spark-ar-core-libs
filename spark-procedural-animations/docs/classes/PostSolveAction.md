[spark-procedural-animations](../README.md) / [Exports](../modules.md) / PostSolveAction

# Class: PostSolveAction

## Table of contents

### Constructors

- [constructor](PostSolveAction.md#constructor)

### Properties

- [\_action](PostSolveAction.md#_action)
- [\_scopeId](PostSolveAction.md#_scopeid)
- [\_t](PostSolveAction.md#_t)

### Accessors

- [action](PostSolveAction.md#action)
- [permanent](PostSolveAction.md#permanent)
- [t](PostSolveAction.md#t)

### Methods

- [setScope](PostSolveAction.md#setscope)
- [create](PostSolveAction.md#create)
- [createPermanent](PostSolveAction.md#createpermanent)

## Constructors

### constructor

• `Private` **new PostSolveAction**(`_t`, `_action`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_t` | `number` |
| `_action` | [`IActionOfT`](../interfaces/IActionOfT.md)<`number`\> |

#### Defined in

spark.procedural-animations.pool.ts:187

## Properties

### \_action

• `Private` **\_action**: [`IActionOfT`](../interfaces/IActionOfT.md)<`number`\>

#### Defined in

spark.procedural-animations.pool.ts:187

___

### \_scopeId

• `Private` **\_scopeId**: `number`

#### Defined in

spark.procedural-animations.pool.ts:186

___

### \_t

• `Private` **\_t**: `number`

#### Defined in

spark.procedural-animations.pool.ts:187

## Accessors

### action

• `get` **action**(): [`IActionOfT`](../interfaces/IActionOfT.md)<`number`\>

Gets action to execute after IK is solved

#### Returns

[`IActionOfT`](../interfaces/IActionOfT.md)<`number`\>

#### Defined in

spark.procedural-animations.pool.ts:233

___

### permanent

• `get` **permanent**(): [`PostSolveAction`](PostSolveAction.md)

Clones as permanent post solve action, i.e. not recycled by pool

#### Returns

[`PostSolveAction`](PostSolveAction.md)

#### Defined in

spark.procedural-animations.pool.ts:220

___

### t

• `get` **t**(): `number`

Gets number to pass to function (usually progress)

#### Returns

`number`

#### Defined in

spark.procedural-animations.pool.ts:226

## Methods

### setScope

▸ **setScope**(`scopeId`): [`PostSolveAction`](PostSolveAction.md)

Sets current scope ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scopeId` | `number` | scope ID |

#### Returns

[`PostSolveAction`](PostSolveAction.md)

reference to iself

#### Defined in

spark.procedural-animations.pool.ts:242

___

### create

▸ `Static` **create**(`tNum`, `act`): [`PostSolveAction`](PostSolveAction.md)

Creates post solve action

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tNum` | `number` | number to pass to function (usually progress) |
| `act` | [`IActionOfT`](../interfaces/IActionOfT.md)<`number`\> | action to execute after IK is solved |

#### Returns

[`PostSolveAction`](PostSolveAction.md)

#### Defined in

spark.procedural-animations.pool.ts:195

___

### createPermanent

▸ `Static` **createPermanent**(`tNum`, `act`): [`PostSolveAction`](PostSolveAction.md)

Creates permanent post solve action, i.e. not recycled by pool

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tNum` | `number` | number to pass to function (usually progress) |
| `act` | [`IActionOfT`](../interfaces/IActionOfT.md)<`number`\> | action to execute after IK is solved |

#### Returns

[`PostSolveAction`](PostSolveAction.md)

#### Defined in

spark.procedural-animations.pool.ts:214
