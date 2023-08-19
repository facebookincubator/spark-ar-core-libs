[spark-procedural-animations](../README.md) / [Exports](../modules.md) / HumanoidCharacterFactory

# Class: HumanoidCharacterFactory

Humanoid character factory

## Hierarchy

- [`CharacterFactory`](CharacterFactory.md)

  ↳ **`HumanoidCharacterFactory`**

## Table of contents

### Constructors

- [constructor](HumanoidCharacterFactory.md#constructor)

### Properties

- [\_camera](HumanoidCharacterFactory.md#_camera)
- [\_serviceByName](HumanoidCharacterFactory.md#_servicebyname)
- [cameraTargetName](HumanoidCharacterFactory.md#cameratargetname)
- [framesToSkip](HumanoidCharacterFactory.md#framestoskip)
- [humansList](HumanoidCharacterFactory.md#humanslist)

### Accessors

- [camera](HumanoidCharacterFactory.md#camera)
- [characters](HumanoidCharacterFactory.md#characters)
- [human](HumanoidCharacterFactory.md#human)
- [resources](HumanoidCharacterFactory.md#resources)

### Methods

- [addCharacter](HumanoidCharacterFactory.md#addcharacter)
- [createBvr](HumanoidCharacterFactory.md#createbvr)
- [createCharacterAsync](HumanoidCharacterFactory.md#createcharacterasync)
- [dispose](HumanoidCharacterFactory.md#dispose)
- [getServiceByName](HumanoidCharacterFactory.md#getservicebyname)
- [initializeAsync](HumanoidCharacterFactory.md#initializeasync)
- [onBeforeCreatingCharacters](HumanoidCharacterFactory.md#onbeforecreatingcharacters)
- [setService](HumanoidCharacterFactory.md#setservice)
- [start](HumanoidCharacterFactory.md#start)

## Constructors

### constructor

• **new HumanoidCharacterFactory**()

#### Overrides

[CharacterFactory](CharacterFactory.md).[constructor](CharacterFactory.md#constructor)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:156

## Properties

### \_camera

• `Private` **\_camera**: [`CameraService`](CameraService.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:155

___

### \_serviceByName

• `Protected` `Readonly` **\_serviceByName**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Inherited from

[CharacterFactory](CharacterFactory.md).[_serviceByName](CharacterFactory.md#_servicebyname)

#### Defined in

spark.procedural-animations.base-character.ts:200

___

### cameraTargetName

• `Protected` **cameraTargetName**: `string`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:154

___

### framesToSkip

• `Protected` **framesToSkip**: `number` = `1`

#### Inherited from

[CharacterFactory](CharacterFactory.md).[framesToSkip](CharacterFactory.md#framestoskip)

#### Defined in

spark.procedural-animations.base-character.ts:205

___

### humansList

• `Readonly` **humansList**: [`HumanoidCharacter`](HumanoidCharacter.md)[]

#### Defined in

spark.procedural-animations.humanoid-characters.ts:153

## Accessors

### camera

• `get` **camera**(): [`CameraService`](CameraService.md)

#### Returns

[`CameraService`](CameraService.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:164

___

### characters

• `get` **characters**(): [`ICharacter`](../interfaces/ICharacter.md)[]

#### Returns

[`ICharacter`](../interfaces/ICharacter.md)[]

#### Inherited from

CharacterFactory.characters

#### Defined in

spark.procedural-animations.base-character.ts:240

___

### human

• `get` **human**(): [`HumanoidCharacter`](HumanoidCharacter.md)

#### Returns

[`HumanoidCharacter`](HumanoidCharacter.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:161

___

### resources

• `get` **resources**(): [`IResourcesManager`](../interfaces/IResourcesManager.md)

#### Returns

[`IResourcesManager`](../interfaces/IResourcesManager.md)

#### Inherited from

CharacterFactory.resources

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

#### Inherited from

[CharacterFactory](CharacterFactory.md).[addCharacter](CharacterFactory.md#addcharacter)

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

#### Inherited from

[CharacterFactory](CharacterFactory.md).[createBvr](CharacterFactory.md#createbvr)

#### Defined in

spark.procedural-animations.base-character.ts:311

___

### createCharacterAsync

▸ `Protected` **createCharacterAsync**(`resources`, `data`): `Promise`<[`ICharacter`](../interfaces/ICharacter.md)\>

Override of the base create character async method - this creates a new humanoid character

#### Parameters

| Name | Type |
| :------ | :------ |
| `resources` | [`IResourcesManager`](../interfaces/IResourcesManager.md) |
| `data` | [`CharacterData`](CharacterData.md) |

#### Returns

`Promise`<[`ICharacter`](../interfaces/ICharacter.md)\>

character async

#### Overrides

[CharacterFactory](CharacterFactory.md).[createCharacterAsync](CharacterFactory.md#createcharacterasync)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:173

___

### dispose

▸ **dispose**(): `void`

Disposes character factory

#### Returns

`void`

#### Inherited from

[CharacterFactory](CharacterFactory.md).[dispose](CharacterFactory.md#dispose)

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

#### Inherited from

[CharacterFactory](CharacterFactory.md).[getServiceByName](CharacterFactory.md#getservicebyname)

#### Defined in

spark.procedural-animations.base-character.ts:252

___

### initializeAsync

▸ **initializeAsync**(): `Promise`<`void`\>

Initializes async

#### Returns

`Promise`<`void`\>

#### Overrides

[CharacterFactory](CharacterFactory.md).[initializeAsync](CharacterFactory.md#initializeasync)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:183

___

### onBeforeCreatingCharacters

▸ `Protected` **onBeforeCreatingCharacters**(): `void`

#### Returns

`void`

#### Inherited from

[CharacterFactory](CharacterFactory.md).[onBeforeCreatingCharacters](CharacterFactory.md#onbeforecreatingcharacters)

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

#### Inherited from

[CharacterFactory](CharacterFactory.md).[setService](CharacterFactory.md#setservice)

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

#### Inherited from

[CharacterFactory](CharacterFactory.md).[start](CharacterFactory.md#start)

#### Defined in

spark.procedural-animations.base-character.ts:298
