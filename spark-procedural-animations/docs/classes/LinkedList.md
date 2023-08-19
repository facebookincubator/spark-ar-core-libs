[spark-procedural-animations](../README.md) / [Exports](../modules.md) / LinkedList

# Class: LinkedList<T\>

Linked list of generic type T

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](LinkedList.md#constructor)

### Properties

- [\_count](LinkedList.md#_count)
- [\_head](LinkedList.md#_head)
- [\_tail](LinkedList.md#_tail)

### Accessors

- [count](LinkedList.md#count)
- [head](LinkedList.md#head)
- [tail](LinkedList.md#tail)

### Methods

- [clear](LinkedList.md#clear)
- [deleteNode](LinkedList.md#deletenode)
- [insertBegin](LinkedList.md#insertbegin)
- [insertEnd](LinkedList.md#insertend)

## Constructors

### constructor

• **new LinkedList**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

spark.procedural-animations.core.ts:777

## Properties

### \_count

• `Private` **\_count**: `number`

#### Defined in

spark.procedural-animations.core.ts:775

___

### \_head

• `Private` **\_head**: [`LinkedListNode`](LinkedListNode.md)<`T`\>

#### Defined in

spark.procedural-animations.core.ts:773

___

### \_tail

• `Private` **\_tail**: [`LinkedListNode`](LinkedListNode.md)<`T`\>

#### Defined in

spark.procedural-animations.core.ts:774

## Accessors

### count

• `get` **count**(): `number`

The number of elements in the linked list

#### Returns

`number`

#### Defined in

spark.procedural-animations.core.ts:798

___

### head

• `get` **head**(): [`LinkedListNode`](LinkedListNode.md)<`T`\>

The head node of the linked list or NULL if empty

#### Returns

[`LinkedListNode`](LinkedListNode.md)<`T`\>

#### Defined in

spark.procedural-animations.core.ts:786

___

### tail

• `get` **tail**(): [`LinkedListNode`](LinkedListNode.md)<`T`\>

The tail node of the linked list or NULL if empty

#### Returns

[`LinkedListNode`](LinkedListNode.md)<`T`\>

#### Defined in

spark.procedural-animations.core.ts:792

## Methods

### clear

▸ **clear**(): `void`

Clears linked list

#### Returns

`void`

#### Defined in

spark.procedural-animations.core.ts:857

___

### deleteNode

▸ **deleteNode**(`node`): `void`

Delete node of linked list

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`LinkedListNode`](LinkedListNode.md)<`T`\> | node to delete |

#### Returns

`void`

#### Defined in

spark.procedural-animations.core.ts:840

___

### insertBegin

▸ **insertBegin**(`data`): [`LinkedListNode`](LinkedListNode.md)<`T`\>

Inserts value in the beginning of the linked list and returns newly created node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `T` | value to insert |

#### Returns

[`LinkedListNode`](LinkedListNode.md)<`T`\>

#### Defined in

spark.procedural-animations.core.ts:823

___

### insertEnd

▸ **insertEnd**(`data`): [`LinkedListNode`](LinkedListNode.md)<`T`\>

Inserts value at the end of the linked list and returns newly created node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `T` | value to insert |

#### Returns

[`LinkedListNode`](LinkedListNode.md)<`T`\>

#### Defined in

spark.procedural-animations.core.ts:805
