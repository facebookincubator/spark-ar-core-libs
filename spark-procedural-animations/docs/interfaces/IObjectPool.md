[spark-procedural-animations](../README.md) / [Exports](../modules.md) / IObjectPool

# Interface: IObjectPool

Interface used for object pooling

## Hierarchy

- [`IUpdatable`](IUpdatable.md)

  ↳ **`IObjectPool`**

## Implemented by

- [`ObjectPoolManager`](../classes/ObjectPoolManager.md)

## Table of contents

### Properties

- [enabled](IObjectPool.md#enabled)

### Accessors

- [isActive](IObjectPool.md#isactive)
- [scopeId](IObjectPool.md#scopeid)

### Methods

- [begin](IObjectPool.md#begin)
- [end](IObjectPool.md#end)
- [getObj](IObjectPool.md#getobj)
- [setObj](IObjectPool.md#setobj)
- [update](IObjectPool.md#update)
- [verifyScope](IObjectPool.md#verifyscope)

## Properties

### enabled

• **enabled**: `boolean`

Enable or disable the puul

#### Defined in

spark.procedural-animations.pool.ts:66

## Accessors

### isActive

• `get` **isActive**(): `boolean`

Flag indicating if the scope is active, i.e. open

#### Returns

`boolean`

#### Defined in

spark.procedural-animations.pool.ts:58

___

### scopeId

• `get` **scopeId**(): `number`

Scope ID, NaN if no scope is open

#### Returns

`number`

#### Defined in

spark.procedural-animations.pool.ts:62

## Methods

### begin

▸ **begin**(`scopeId`): `number`

invoke to mark beginning of scope

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scopeId` | `number` | the ID of the scope, pass frame number |

#### Returns

`number`

scope id

#### Defined in

spark.procedural-animations.pool.ts:32

___

### end

▸ **end**(`scopeId`): `void`

Invoke to mark en of scope

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scopeId` | `number` | the ID of the scope, returned from begin method |

#### Returns

`void`

#### Defined in

spark.procedural-animations.pool.ts:37

___

### getObj

▸ **getObj**(`type`): `any`

returns object from the pool of the requested type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`PoolObjType`](../enums/PoolObjType.md) | type of the object |

#### Returns

`any`

object

#### Defined in

spark.procedural-animations.pool.ts:43

___

### setObj

▸ **setObj**(`type`, `obj`): `void`

sets object to the pool of the requested type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`PoolObjType`](../enums/PoolObjType.md) | type of the object |
| `obj` | `any` | - |

#### Returns

`void`

#### Defined in

spark.procedural-animations.pool.ts:49

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Inherited from

[IUpdatable](IUpdatable.md).[update](IUpdatable.md#update)

#### Defined in

spark.procedural-animations.core.ts:100

___

### verifyScope

▸ **verifyScope**(`scopeId`): `void`

Throws error if open scope is not matching the current

#### Parameters

| Name | Type |
| :------ | :------ |
| `scopeId` | `number` |

#### Returns

`void`

#### Defined in

spark.procedural-animations.pool.ts:54
