[spark-procedural-animations](../README.md) / [Exports](../modules.md) / ICharacter

# Interface: ICharacter

interface that contains initializeAsync method

## Hierarchy

- [`IInitAsync`](IInitAsync.md)

  ↳ **`ICharacter`**

## Implemented by

- [`BaseCharacter`](../classes/BaseCharacter.md)
- [`HumanoidCharacter`](../classes/HumanoidCharacter.md)

## Table of contents

### Accessors

- [config](ICharacter.md#config)
- [data](ICharacter.md#data)
- [label](ICharacter.md#label)

### Methods

- [initializeAsync](ICharacter.md#initializeasync)

## Accessors

### config

• `get` **config**(): [`ICharacterConfig`](ICharacterConfig.md)

#### Returns

[`ICharacterConfig`](ICharacterConfig.md)

#### Defined in

spark.procedural-animations.base-character.ts:196

___

### data

• `get` **data**(): [`CharacterData`](../classes/CharacterData.md)

#### Returns

[`CharacterData`](../classes/CharacterData.md)

#### Defined in

spark.procedural-animations.base-character.ts:195

___

### label

• `get` **label**(): `string`

#### Returns

`string`

#### Defined in

spark.procedural-animations.base-character.ts:194

## Methods

### initializeAsync

▸ **initializeAsync**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[IInitAsync](IInitAsync.md).[initializeAsync](IInitAsync.md#initializeasync)

#### Defined in

spark.procedural-animations.core.ts:105
