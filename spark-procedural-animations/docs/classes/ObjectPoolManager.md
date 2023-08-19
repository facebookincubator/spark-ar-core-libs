[spark-procedural-animations](../README.md) / [Exports](../modules.md) / ObjectPoolManager

# Class: ObjectPoolManager

Interface used for object pooling

## Implements

- [`IObjectPool`](../interfaces/IObjectPool.md)

## Table of contents

### Constructors

- [constructor](ObjectPoolManager.md#constructor)

### Properties

- [\_lists](ObjectPoolManager.md#_lists)
- [\_pool](ObjectPoolManager.md#_pool)
- [\_scopeId](ObjectPoolManager.md#_scopeid)
- [enabled](ObjectPoolManager.md#enabled)

### Accessors

- [isActive](ObjectPoolManager.md#isactive)
- [scopeId](ObjectPoolManager.md#scopeid)

### Methods

- [begin](ObjectPoolManager.md#begin)
- [end](ObjectPoolManager.md#end)
- [ensureList](ObjectPoolManager.md#ensurelist)
- [ensureScopeIsActive](ObjectPoolManager.md#ensurescopeisactive)
- [getNext](ObjectPoolManager.md#getnext)
- [getObj](ObjectPoolManager.md#getobj)
- [onEndOfFrame](ObjectPoolManager.md#onendofframe)
- [resetScope](ObjectPoolManager.md#resetscope)
- [setObj](ObjectPoolManager.md#setobj)
- [update](ObjectPoolManager.md#update)
- [verifyScope](ObjectPoolManager.md#verifyscope)

## Constructors

### constructor

• **new ObjectPoolManager**()

#### Defined in

spark.procedural-animations.pool.ts:81

## Properties

### \_lists

• `Private` `Readonly` **\_lists**: `PoolObjList`[]

#### Defined in

spark.procedural-animations.pool.ts:79

___

### \_pool

• `Private` `Readonly` **\_pool**: `Object`

#### Index signature

▪ [key: `string`]: `PoolObjList`

#### Defined in

spark.procedural-animations.pool.ts:78

___

### \_scopeId

• `Private` **\_scopeId**: `number`

#### Defined in

spark.procedural-animations.pool.ts:77

___

### enabled

• **enabled**: `boolean`

Enable or disable the puul

#### Implementation of

[IObjectPool](../interfaces/IObjectPool.md).[enabled](../interfaces/IObjectPool.md#enabled)

#### Defined in

spark.procedural-animations.pool.ts:80

## Accessors

### isActive

• `get` **isActive**(): `boolean`

Flag indicating if the scope is active, i.e. open

#### Returns

`boolean`

#### Implementation of

IObjectPool.isActive

#### Defined in

spark.procedural-animations.pool.ts:91

___

### scopeId

• `get` **scopeId**(): `number`

Scope ID, NaN if no scope is open

#### Returns

`number`

#### Implementation of

IObjectPool.scopeId

#### Defined in

spark.procedural-animations.pool.ts:97

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

#### Implementation of

[IObjectPool](../interfaces/IObjectPool.md).[begin](../interfaces/IObjectPool.md#begin)

#### Defined in

spark.procedural-animations.pool.ts:117

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

#### Implementation of

[IObjectPool](../interfaces/IObjectPool.md).[end](../interfaces/IObjectPool.md#end)

#### Defined in

spark.procedural-animations.pool.ts:127

___

### ensureList

▸ `Private` **ensureList**(`type`): `PoolObjList`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`PoolObjType`](../enums/PoolObjType.md) |

#### Returns

`PoolObjList`

#### Defined in

spark.procedural-animations.pool.ts:158

___

### ensureScopeIsActive

▸ `Private` **ensureScopeIsActive**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.pool.ts:170

___

### getNext

▸ `Private` **getNext**(`arr`, `index`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `any`[] |
| `index` | `number` |

#### Returns

`any`

#### Defined in

spark.procedural-animations.pool.ts:178

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

#### Implementation of

[IObjectPool](../interfaces/IObjectPool.md).[getObj](../interfaces/IObjectPool.md#getobj)

#### Defined in

spark.procedural-animations.pool.ts:136

___

### onEndOfFrame

▸ `Private` **onEndOfFrame**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.pool.ts:167

___

### resetScope

▸ `Private` **resetScope**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.pool.ts:173

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

#### Implementation of

[IObjectPool](../interfaces/IObjectPool.md).[setObj](../interfaces/IObjectPool.md#setobj)

#### Defined in

spark.procedural-animations.pool.ts:147

___

### update

▸ **update**(): `void`

Marks and of frame

#### Returns

`void`

#### Implementation of

[IObjectPool](../interfaces/IObjectPool.md).[update](../interfaces/IObjectPool.md#update)

#### Defined in

spark.procedural-animations.pool.ts:155

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

#### Implementation of

[IObjectPool](../interfaces/IObjectPool.md).[verifyScope](../interfaces/IObjectPool.md#verifyscope)

#### Defined in

spark.procedural-animations.pool.ts:104
