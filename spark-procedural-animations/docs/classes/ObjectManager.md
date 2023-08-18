[spark-procedural-animations](../README.md) / [Exports](../modules.md) / ObjectManager

# Class: ObjectManager

Object manager - used to manage 3D objects

## Table of contents

### Constructors

- [constructor](ObjectManager.md#constructor)

### Properties

- [\_byIdentifierLateUpdater](ObjectManager.md#_byidentifierlateupdater)
- [\_byIdentifierPosterToNative](ObjectManager.md#_byidentifierpostertonative)
- [\_listLateUpdater](ObjectManager.md#_listlateupdater)
- [\_listPosterToNative](ObjectManager.md#_listpostertonative)
- [enablePostToNative](ObjectManager.md#enableposttonative)

### Methods

- [addLateUpdater](ObjectManager.md#addlateupdater)
- [addPosterToNative](ObjectManager.md#addpostertonative)
- [lateUpdate](ObjectManager.md#lateupdate)
- [postToNative](ObjectManager.md#posttonative)
- [removeLateUpdater](ObjectManager.md#removelateupdater)
- [removePosterToNative](ObjectManager.md#removepostertonative)

## Constructors

### constructor

• **new ObjectManager**()

#### Defined in

spark.procedural-animations.behaviors.ts:546

## Properties

### \_byIdentifierLateUpdater

• `Private` **\_byIdentifierLateUpdater**: `Object`

#### Index signature

▪ [key: `string`]: [`LinkedListNode`](LinkedListNode.md)<[`ILateUpdater`](../interfaces/ILateUpdater.md)\>

#### Defined in

spark.procedural-animations.behaviors.ts:543

___

### \_byIdentifierPosterToNative

• `Private` **\_byIdentifierPosterToNative**: `Object`

#### Index signature

▪ [key: `string`]: [`LinkedListNode`](LinkedListNode.md)<[`IPosterToNative`](../interfaces/IPosterToNative.md)\>

#### Defined in

spark.procedural-animations.behaviors.ts:539

___

### \_listLateUpdater

• `Private` **\_listLateUpdater**: [`LinkedList`](LinkedList.md)<[`ILateUpdater`](../interfaces/ILateUpdater.md)\>

#### Defined in

spark.procedural-animations.behaviors.ts:542

___

### \_listPosterToNative

• `Private` **\_listPosterToNative**: [`LinkedList`](LinkedList.md)<[`IPosterToNative`](../interfaces/IPosterToNative.md)\>

#### Defined in

spark.procedural-animations.behaviors.ts:538

___

### enablePostToNative

• **enablePostToNative**: `boolean`

#### Defined in

spark.procedural-animations.behaviors.ts:537

## Methods

### addLateUpdater

▸ **addLateUpdater**(`lu`): `void`

Adds late updater object that implements ILateUpdater interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `lu` | [`ILateUpdater`](../interfaces/ILateUpdater.md) |

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:556

___

### addPosterToNative

▸ **addPosterToNative**(`obj`): `void`

Adds poster to native object that implements IPosterToNative interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`IPosterToNative`](../interfaces/IPosterToNative.md) |

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:577

___

### lateUpdate

▸ **lateUpdate**(): `void`

invokes late updaters

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:598

___

### postToNative

▸ **postToNative**(): `void`

invokes posters to native

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:608

___

### removeLateUpdater

▸ **removeLateUpdater**(`lu`): `void`

Removes late updater object

#### Parameters

| Name | Type |
| :------ | :------ |
| `lu` | [`ILateUpdater`](../interfaces/ILateUpdater.md) |

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:567

___

### removePosterToNative

▸ **removePosterToNative**(`obj`): `void`

Removes poster to native object

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`IPosterToNative`](../interfaces/IPosterToNative.md) |

#### Returns

`void`

#### Defined in

spark.procedural-animations.behaviors.ts:588
