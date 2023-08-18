[spark-procedural-animations](../README.md) / [Exports](../modules.md) / IResourcesManager

# Interface: IResourcesManager

## Implemented by

- [`ResourcesManager`](../classes/ResourcesManager.md)

## Table of contents

### Accessors

- [objects](IResourcesManager.md#objects)
- [objectsById](IResourcesManager.md#objectsbyid)
- [objectsByPath](IResourcesManager.md#objectsbypath)

### Methods

- [getFirstObjectByName](IResourcesManager.md#getfirstobjectbyname)
- [getFirstObjectByNameOrPath](IResourcesManager.md#getfirstobjectbynameorpath)
- [getFirstPathByName](IResourcesManager.md#getfirstpathbyname)
- [loadAllObjectsAsync](IResourcesManager.md#loadallobjectsasync)

## Accessors

### objects

• `get` **objects**(): [`ObjSummary`](../classes/ObjSummary.md)[]

List of all objects

#### Returns

[`ObjSummary`](../classes/ObjSummary.md)[]

#### Defined in

spark.procedural-animations.objects.ts:127

___

### objectsById

• `get` **objectsById**(): `Object`

Hashtable of objects by ID

#### Returns

`Object`

#### Defined in

spark.procedural-animations.objects.ts:135

___

### objectsByPath

• `get` **objectsByPath**(): `Object`

Hashtable of objects by path

#### Returns

`Object`

#### Defined in

spark.procedural-animations.objects.ts:131

## Methods

### getFirstObjectByName

▸ **getFirstObjectByName**(`name`): [`ObjSummary`](../classes/ObjSummary.md)

Get first object by name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | object name |

#### Returns

[`ObjSummary`](../classes/ObjSummary.md)

first object by name

#### Defined in

spark.procedural-animations.objects.ts:111

___

### getFirstObjectByNameOrPath

▸ **getFirstObjectByNameOrPath**(`nameOrPath`): [`ObjSummary`](../classes/ObjSummary.md)

Get first object by name or path

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameOrPath` | `string` | name or path - if starts with / will be assumed to be path |

#### Returns

[`ObjSummary`](../classes/ObjSummary.md)

first object by name or path

#### Defined in

spark.procedural-animations.objects.ts:117

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

#### Defined in

spark.procedural-animations.objects.ts:105

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

#### Defined in

spark.procedural-animations.objects.ts:123
