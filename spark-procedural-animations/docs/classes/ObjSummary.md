[spark-procedural-animations](../README.md) / [Exports](../modules.md) / ObjSummary

# Class: ObjSummary

Wrapper of Scene Object Base that keeps track of scene object hierarchy

## Table of contents

### Constructors

- [constructor](ObjSummary.md#constructor)

### Properties

- [\_children](ObjSummary.md#_children)
- [\_id](ObjSummary.md#_id)
- [\_name](ObjSummary.md#_name)
- [\_parent](ObjSummary.md#_parent)
- [\_path](ObjSummary.md#_path)
- [obj](ObjSummary.md#obj)

### Accessors

- [children](ObjSummary.md#children)
- [identifier](ObjSummary.md#identifier)
- [name](ObjSummary.md#name)
- [parent](ObjSummary.md#parent)
- [path](ObjSummary.md#path)
- [treeName](ObjSummary.md#treename)

### Methods

- [create](ObjSummary.md#create)
- [createVirtual](ObjSummary.md#createvirtual)

## Constructors

### constructor

• `Private` **new ObjSummary**(`id`, `name`, `ob`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `ob` | `SceneObjectBase` |

#### Defined in

spark.procedural-animations.objects.ts:256

## Properties

### \_children

• `Private` **\_children**: [`ObjSummary`](ObjSummary.md)[]

#### Defined in

spark.procedural-animations.objects.ts:254

___

### \_id

• `Private` `Readonly` **\_id**: `string`

#### Defined in

spark.procedural-animations.objects.ts:250

___

### \_name

• `Private` `Readonly` **\_name**: `string`

#### Defined in

spark.procedural-animations.objects.ts:251

___

### \_parent

• `Private` **\_parent**: [`ObjSummary`](ObjSummary.md)

#### Defined in

spark.procedural-animations.objects.ts:253

___

### \_path

• `Private` **\_path**: `string`

#### Defined in

spark.procedural-animations.objects.ts:252

___

### obj

• `Readonly` **obj**: `SceneObjectBase`

#### Defined in

spark.procedural-animations.objects.ts:255

## Accessors

### children

• `get` **children**(): [`ObjSummary`](ObjSummary.md)[]

Gets children

#### Returns

[`ObjSummary`](ObjSummary.md)[]

#### Defined in

spark.procedural-animations.objects.ts:301

___

### identifier

• `get` **identifier**(): `string`

Gets identifier

#### Returns

`string`

#### Defined in

spark.procedural-animations.objects.ts:283

___

### name

• `get` **name**(): `string`

Gets name

#### Returns

`string`

#### Defined in

spark.procedural-animations.objects.ts:289

___

### parent

• `get` **parent**(): [`ObjSummary`](ObjSummary.md)

Gets parent

#### Returns

[`ObjSummary`](ObjSummary.md)

#### Defined in

spark.procedural-animations.objects.ts:307

• `set` **parent**(`p`): `void`

Sets parent

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`ObjSummary`](ObjSummary.md) |

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:313

___

### path

• `get` **path**(): `string`

Gets path

#### Returns

`string`

#### Defined in

spark.procedural-animations.objects.ts:321

___

### treeName

• `get` **treeName**(): `string`

Gets tree name

#### Returns

`string`

#### Defined in

spark.procedural-animations.objects.ts:295

## Methods

### create

▸ `Static` **create**(`ob`): [`ObjSummary`](ObjSummary.md)

Creates object summary wrapper from SceneObjectBase

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ob` | `SceneObjectBase` | SceneObjectBase instance |

#### Returns

[`ObjSummary`](ObjSummary.md)

#### Defined in

spark.procedural-animations.objects.ts:269

___

### createVirtual

▸ `Static` **createVirtual**(`id`, `name`): [`ObjSummary`](ObjSummary.md)

Creates virtual object with ID and Name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | unique identifier for this object |
| `name` | `string` | name of object |

#### Returns

[`ObjSummary`](ObjSummary.md)

#### Defined in

spark.procedural-animations.objects.ts:277
