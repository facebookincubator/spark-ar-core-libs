[spark-procedural-animations](../README.md) / [Exports](../modules.md) / IFactory

# Interface: IFactory

factory

## Hierarchy

- [`IDisposable`](IDisposable.md)

- [`IInitAsync`](IInitAsync.md)

  ↳ **`IFactory`**

## Implemented by

- [`CharacterFactory`](../classes/CharacterFactory.md)

## Table of contents

### Accessors

- [resources](IFactory.md#resources)

### Methods

- [dispose](IFactory.md#dispose)
- [getServiceByName](IFactory.md#getservicebyname)
- [initializeAsync](IFactory.md#initializeasync)

## Accessors

### resources

• `get` **resources**(): [`IResourcesManager`](IResourcesManager.md)

#### Returns

[`IResourcesManager`](IResourcesManager.md)

#### Defined in

spark.procedural-animations.base-character.ts:120

## Methods

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

#### Inherited from

[IDisposable](IDisposable.md).[dispose](IDisposable.md#dispose)

#### Defined in

spark.procedural-animations.core.ts:93

___

### getServiceByName

▸ **getServiceByName**(`name`): `any`

returns service by name

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

spark.procedural-animations.base-character.ts:125

___

### initializeAsync

▸ **initializeAsync**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[IInitAsync](IInitAsync.md).[initializeAsync](IInitAsync.md#initializeasync)

#### Defined in

spark.procedural-animations.core.ts:105
