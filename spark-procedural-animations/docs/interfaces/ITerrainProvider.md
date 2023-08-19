[spark-procedural-animations](../README.md) / [Exports](../modules.md) / ITerrainProvider

# Interface: ITerrainProvider

Terrain provider

## Table of contents

### Methods

- [getHeightAndFillNormalByXY](ITerrainProvider.md#getheightandfillnormalbyxy)
- [tryFillPointAndNormalByRay](ITerrainProvider.md#tryfillpointandnormalbyray)

## Methods

### getHeightAndFillNormalByXY

▸ **getHeightAndFillNormalByXY**(`x`, `y`, `normal?`, `cacheKey?`): `number`

returns height by 2D point and fills passed normal vector for that 2D point

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | 2D position x value |
| `y` | `number` | 2D position y value |
| `normal?` | [`V3`](../classes/V3.md) | optional normal to fill |
| `cacheKey?` | `number` | optional cache key - must be integer between 0 and 7, if not provider cacheId 0 will be used |

#### Returns

`number`

height for that 2D point

#### Defined in

spark.procedural-animations.base-character.ts:378

___

### tryFillPointAndNormalByRay

▸ **tryFillPointAndNormalByRay**(`ray`, `point3D`, `normal?`): `boolean`

Fills point and normal passed that intersect

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ray` | [`Ray`](../classes/Ray.md) | ray that intersects with terrain |
| `point3D` | [`V3`](../classes/V3.md) | point of ray intersection with terrain to fill |
| `normal?` | [`V3`](../classes/V3.md) | optional normal for the point of ray intersection with terrain to fill |

#### Returns

`boolean`

true if ray intersects with terrain, false otherwise

#### Defined in

spark.procedural-animations.base-character.ts:386
