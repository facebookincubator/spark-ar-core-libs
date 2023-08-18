[spark-procedural-animations](../README.md) / [Exports](../modules.md) / ResourcesManager

# Class: ResourcesManager

## Implements

- [`IResourcesManager`](../interfaces/IResourcesManager.md)

## Table of contents

### Constructors

- [constructor](ResourcesManager.md#constructor)

### Properties

- [\_areAllObjectsLoaded](ResourcesManager.md#_areallobjectsloaded)
- [\_objects](ResourcesManager.md#_objects)
- [\_objectsById](ResourcesManager.md#_objectsbyid)
- [\_objectsByPath](ResourcesManager.md#_objectsbypath)
- [\_pathByName](ResourcesManager.md#_pathbyname)

### Accessors

- [objects](ResourcesManager.md#objects)
- [objectsById](ResourcesManager.md#objectsbyid)
- [objectsByPath](ResourcesManager.md#objectsbypath)

### Methods

- [getFirstObjectByName](ResourcesManager.md#getfirstobjectbyname)
- [getFirstObjectByNameOrPath](ResourcesManager.md#getfirstobjectbynameorpath)
- [getFirstPathByName](ResourcesManager.md#getfirstpathbyname)
- [loadAllObjectsAsync](ResourcesManager.md#loadallobjectsasync)

## Constructors

### constructor

• **new ResourcesManager**()

#### Defined in

spark.procedural-animations.objects.ts:143

## Properties

### \_areAllObjectsLoaded

• `Private` **\_areAllObjectsLoaded**: `boolean`

#### Defined in

spark.procedural-animations.objects.ts:142

___

### \_objects

• `Private` `Readonly` **\_objects**: [`ObjSummary`](ObjSummary.md)[]

#### Defined in

spark.procedural-animations.objects.ts:140

___

### \_objectsById

• `Private` `Readonly` **\_objectsById**: `Object`

#### Index signature

▪ [key: `string`]: [`ObjSummary`](ObjSummary.md)

#### Defined in

spark.procedural-animations.objects.ts:138

___

### \_objectsByPath

• `Private` `Readonly` **\_objectsByPath**: `Object`

#### Index signature

▪ [key: `string`]: [`ObjSummary`](ObjSummary.md)

#### Defined in

spark.procedural-animations.objects.ts:139

___

### \_pathByName

• `Private` `Readonly` **\_pathByName**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

spark.procedural-animations.objects.ts:141

## Accessors

### objects

• `get` **objects**(): [`ObjSummary`](ObjSummary.md)[]

List of all objects

#### Returns

[`ObjSummary`](ObjSummary.md)[]

#### Implementation of

IResourcesManager.objects

#### Defined in

spark.procedural-animations.objects.ts:230

___

### objectsById

• `get` **objectsById**(): `Object`

Hashtable of objects by ID

#### Returns

`Object`

#### Implementation of

IResourcesManager.objectsById

#### Defined in

spark.procedural-animations.objects.ts:242

___

### objectsByPath

• `get` **objectsByPath**(): `Object`

Hashtable of objects by path

#### Returns

`Object`

#### Implementation of

IResourcesManager.objectsByPath

#### Defined in

spark.procedural-animations.objects.ts:236

## Methods

### getFirstObjectByName

▸ **getFirstObjectByName**(`name`): [`ObjSummary`](ObjSummary.md)

Get first object by name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | object name |

#### Returns

[`ObjSummary`](ObjSummary.md)

first object by name

#### Implementation of

[IResourcesManager](../interfaces/IResourcesManager.md).[getFirstObjectByName](../interfaces/IResourcesManager.md#getfirstobjectbyname)

#### Defined in

spark.procedural-animations.objects.ts:170

___

### getFirstObjectByNameOrPath

▸ **getFirstObjectByNameOrPath**(`nameOrPath`): [`ObjSummary`](ObjSummary.md)

Get first object by name or path

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameOrPath` | `string` | name or path - if starts with / will be assumed to be path |

#### Returns

[`ObjSummary`](ObjSummary.md)

first object by name or path

#### Implementation of

[IResourcesManager](../interfaces/IResourcesManager.md).[getFirstObjectByNameOrPath](../interfaces/IResourcesManager.md#getfirstobjectbynameorpath)

#### Defined in

spark.procedural-animations.objects.ts:178

___

### getFirstPathByName

▸ **getFirstPathByName**(`name`): `string`

Get first path by name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | object name |

#### Returns

`string`

first path by name

#### Implementation of

[IResourcesManager](../interfaces/IResourcesManager.md).[getFirstPathByName](../interfaces/IResourcesManager.md#getfirstpathbyname)

#### Defined in

spark.procedural-animations.objects.ts:155

___

### loadAllObjectsAsync

▸ **loadAllObjectsAsync**(`force?`): `Promise`<`void`\>

Load all scene objects

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `force?` | `boolean` | if false or not set will only load all objects once |

#### Returns

`Promise`<`void`\>

all objects async

#### Implementation of

[IResourcesManager](../interfaces/IResourcesManager.md).[loadAllObjectsAsync](../interfaces/IResourcesManager.md#loadallobjectsasync)

#### Defined in

spark.procedural-animations.objects.ts:188
