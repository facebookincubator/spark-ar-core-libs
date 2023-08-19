[spark-procedural-animations](../README.md) / [Exports](../modules.md) / CharacterFactory

# Class: CharacterFactory

factory

## Hierarchy

- **`CharacterFactory`**

  ↳ [`HumanoidCharacterFactory`](HumanoidCharacterFactory.md)

## Implements

- [`IFactory`](../interfaces/IFactory.md)

## Table of contents

### Constructors

- [constructor](CharacterFactory.md#constructor)

### Properties

- [\_characterData](CharacterFactory.md#_characterdata)
- [\_characters](CharacterFactory.md#_characters)
- [\_getStartBehavior](CharacterFactory.md#_getstartbehavior)
- [\_lateUpdaters](CharacterFactory.md#_lateupdaters)
- [\_resources](CharacterFactory.md#_resources)
- [\_serviceByName](CharacterFactory.md#_servicebyname)
- [framesToSkip](CharacterFactory.md#framestoskip)

### Accessors

- [characters](CharacterFactory.md#characters)
- [resources](CharacterFactory.md#resources)

### Methods

- [addCharacter](CharacterFactory.md#addcharacter)
- [createBvr](CharacterFactory.md#createbvr)
- [createCharacterAsync](CharacterFactory.md#createcharacterasync)
- [dispose](CharacterFactory.md#dispose)
- [getServiceByName](CharacterFactory.md#getservicebyname)
- [initializeAsync](CharacterFactory.md#initializeasync)
- [onBeforeCreatingCharacters](CharacterFactory.md#onbeforecreatingcharacters)
- [setService](CharacterFactory.md#setservice)
- [start](CharacterFactory.md#start)

## Constructors

### constructor

• **new CharacterFactory**()

#### Defined in

spark.procedural-animations.base-character.ts:206

## Properties

### \_characterData

• `Private` `Readonly` **\_characterData**: [`CharacterData`](CharacterData.md)[]

#### Defined in

spark.procedural-animations.base-character.ts:201

___

### \_characters

• `Private` `Readonly` **\_characters**: [`ICharacter`](../interfaces/ICharacter.md)[]

#### Defined in

spark.procedural-animations.base-character.ts:202

___

### \_getStartBehavior

• `Private` **\_getStartBehavior**: [`IFuncOfT`](../interfaces/IFuncOfT.md)<[`Behavior`](Behavior.md)\>

#### Defined in

spark.procedural-animations.base-character.ts:204

___

### \_lateUpdaters

• `Private` `Readonly` **\_lateUpdaters**: [`ILateUpdater`](../interfaces/ILateUpdater.md)[]

#### Defined in

spark.procedural-animations.base-character.ts:203

___

### \_resources

• `Private` `Readonly` **\_resources**: [`IResourcesManager`](../interfaces/IResourcesManager.md)

#### Defined in

spark.procedural-animations.base-character.ts:198

___

### \_serviceByName

• `Protected` `Readonly` **\_serviceByName**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

spark.procedural-animations.base-character.ts:200

___

### framesToSkip

• `Protected` **framesToSkip**: `number` = `1`

#### Defined in

spark.procedural-animations.base-character.ts:205

## Accessors

### characters

• `get` **characters**(): [`ICharacter`](../interfaces/ICharacter.md)[]

#### Returns

[`ICharacter`](../interfaces/ICharacter.md)[]

#### Defined in

spark.procedural-animations.base-character.ts:240

___

### resources

• `get` **resources**(): [`IResourcesManager`](../interfaces/IResourcesManager.md)

#### Returns

[`IResourcesManager`](../interfaces/IResourcesManager.md)

#### Implementation of

IFactory.resources

#### Defined in

spark.procedural-animations.base-character.ts:243

## Methods

### addCharacter

▸ **addCharacter**(`label`, `path`, `configFactory`, `...extenders`): [`CharacterFactory`](CharacterFactory.md)

Adds character

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | label that describes the character |
| `path` | `string` | path or name of the character in the hierarchy |
| `configFactory` | () => [`ICharacterConfig`](../interfaces/ICharacterConfig.md) | factory method to create character config |
| `...extenders` | [`ICharacterExtender`](../interfaces/ICharacterExtender.md)[] | = optional list of extenders |

#### Returns

[`CharacterFactory`](CharacterFactory.md)

character

#### Defined in

spark.procedural-animations.base-character.ts:231

___

### createBvr

▸ **createBvr**<`T`, `TFactory`\>(`type`): `T`

Creates behavior

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`BaseCharacterBehavior`](BaseCharacterBehavior.md)<`TFactory`, `T`\> | the type of the behavior to create |
| `TFactory` | extends [`CharacterFactory`](CharacterFactory.md)<`TFactory`\> | type of the factory |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | (`f`: `TFactory`) => `T` | the type of the behavior to create |

#### Returns

`T`

newly created behavior

#### Defined in

spark.procedural-animations.base-character.ts:311

___

### createCharacterAsync

▸ `Protected` `Abstract` **createCharacterAsync**(`resources`, `data`): `Promise`<[`ICharacter`](../interfaces/ICharacter.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `resources` | [`IResourcesManager`](../interfaces/IResourcesManager.md) |
| `data` | [`CharacterData`](CharacterData.md) |

#### Returns

`Promise`<[`ICharacter`](../interfaces/ICharacter.md)\>

#### Defined in

spark.procedural-animations.base-character.ts:216

___

### dispose

▸ **dispose**(): `void`

Disposes character factory

#### Returns

`void`

#### Implementation of

[IFactory](../interfaces/IFactory.md).[dispose](../interfaces/IFactory.md#dispose)

#### Defined in

spark.procedural-animations.base-character.ts:321

___

### getServiceByName

▸ **getServiceByName**(`name`): `any`

Gets service by name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of service |

#### Returns

`any`

service by name

#### Implementation of

[IFactory](../interfaces/IFactory.md).[getServiceByName](../interfaces/IFactory.md#getservicebyname)

#### Defined in

spark.procedural-animations.base-character.ts:252

___

### initializeAsync

▸ **initializeAsync**(): `Promise`<`void`\>

Initializes async

#### Returns

`Promise`<`void`\>

#### Implementation of

[IFactory](../interfaces/IFactory.md).[initializeAsync](../interfaces/IFactory.md#initializeasync)

#### Defined in

spark.procedural-animations.base-character.ts:270

___

### onBeforeCreatingCharacters

▸ `Protected` **onBeforeCreatingCharacters**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:220

___

### setService

▸ **setService**(`name`, `service`, `canOverride?`): `void`

Sets service

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | name of service |
| `service` | `any` | `undefined` | service instance |
| `canOverride?` | `boolean` | `false` | if false will throw error if service already exists, by defau;t false |

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:262

___

### start

▸ **start**<`T`, `TFactory`\>(`type`): [`CharacterFactory`](CharacterFactory.md)

Specify main behavior to start

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`BaseCharacterBehavior`](BaseCharacterBehavior.md)<`TFactory`, `T`\> | the type of the behavior |
| `TFactory` | extends [`CharacterFactory`](CharacterFactory.md)<`TFactory`\> | type of the factory |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | (`f`: `TFactory`) => `T` | the type of the behavior |

#### Returns

[`CharacterFactory`](CharacterFactory.md)

#### Defined in

spark.procedural-animations.base-character.ts:298
