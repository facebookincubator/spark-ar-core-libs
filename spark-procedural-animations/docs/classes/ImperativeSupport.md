[spark-procedural-animations](../README.md) / [Exports](../modules.md) / ImperativeSupport

# Class: ImperativeSupport

## Table of contents

### Constructors

- [constructor](ImperativeSupport.md#constructor)

### Properties

- [\_current](ImperativeSupport.md#_current)

### Accessors

- [current](ImperativeSupport.md#current)
- [no](ImperativeSupport.md#no)
- [yes](ImperativeSupport.md#yes)

### Methods

- [evaluate](ImperativeSupport.md#evaluate)

## Constructors

### constructor

• **new ImperativeSupport**()

## Properties

### \_current

▪ `Static` `Private` **\_current**: [`ImperativeSupportStatus`](../enums/ImperativeSupportStatus.md) = `ImperativeSupportStatus.unknown`

#### Defined in

spark.procedural-animations.objects.ts:531

## Accessors

### current

• `Static` `get` **current**(): [`ImperativeSupportStatus`](../enums/ImperativeSupportStatus.md)

#### Returns

[`ImperativeSupportStatus`](../enums/ImperativeSupportStatus.md)

#### Defined in

spark.procedural-animations.objects.ts:532

___

### no

• `Static` `get` **no**(): `boolean`

#### Returns

`boolean`

#### Defined in

spark.procedural-animations.objects.ts:538

___

### yes

• `Static` `get` **yes**(): `boolean`

#### Returns

`boolean`

#### Defined in

spark.procedural-animations.objects.ts:535

## Methods

### evaluate

▸ `Static` **evaluate**(`obj`): [`ImperativeSupportStatus`](../enums/ImperativeSupportStatus.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `SceneObjectBase` |

#### Returns

[`ImperativeSupportStatus`](../enums/ImperativeSupportStatus.md)

#### Defined in

spark.procedural-animations.objects.ts:541
