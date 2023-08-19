[spark-procedural-animations](../README.md) / [Exports](../modules.md) / CameraService

# Class: CameraService

## Table of contents

### Constructors

- [constructor](CameraService.md#constructor)

### Properties

- [\_cameraPos](CameraService.md#_camerapos)
- [resources](CameraService.md#resources)
- [targetPath](CameraService.md#targetpath)

### Accessors

- [cameraPos](CameraService.md#camerapos)

### Methods

- [getBodyAngleToCameraDeg](CameraService.md#getbodyangletocameradeg)
- [getHorzBodyAngleToCameraDeg](CameraService.md#gethorzbodyangletocameradeg)
- [initialize](CameraService.md#initialize)

## Constructors

### constructor

• **new CameraService**(`targetPath`, `resources`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetPath` | `string` |
| `resources` | [`IResourcesManager`](../interfaces/IResourcesManager.md) |

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1511

## Properties

### \_cameraPos

• `Private` `Readonly` **\_cameraPos**: [`V3`](V3.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1510

___

### resources

• `Private` `Readonly` **resources**: [`IResourcesManager`](../interfaces/IResourcesManager.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1511

___

### targetPath

• `Private` `Readonly` **targetPath**: `string`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1511

## Accessors

### cameraPos

• `get` **cameraPos**(): [`V3`](V3.md)

#### Returns

[`V3`](V3.md)

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1532

## Methods

### getBodyAngleToCameraDeg

▸ **getBodyAngleToCameraDeg**(`hm`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hm` | [`Object3D`](Object3D.md) |

#### Returns

`number`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1527

___

### getHorzBodyAngleToCameraDeg

▸ **getHorzBodyAngleToCameraDeg**(`hm`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hm` | [`Object3D`](Object3D.md) |

#### Returns

`number`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1522

___

### initialize

▸ **initialize**(): `void`

#### Returns

`void`

#### Defined in

spark.procedural-animations.humanoid-characters.ts:1514
