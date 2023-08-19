[spark-procedural-animations](../README.md) / [Exports](../modules.md) / ISolverIK

# Interface: ISolverIK

character IK solver

## Implemented by

- [`FABRIK_IK`](../classes/FABRIK_IK.md)
- [`InverseKinematicsChain`](../classes/InverseKinematicsChain.md)

## Table of contents

### Methods

- [addPostSolveAction](ISolverIK.md#addpostsolveaction)
- [solveIK](ISolverIK.md#solveik)

## Methods

### addPostSolveAction

▸ **addPostSolveAction**(`t`, `act`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `number` |
| `act` | [`IActionOfT`](IActionOfT.md)<`number`\> |

#### Returns

`void`

#### Defined in

spark.procedural-animations.base-character.ts:113

___

### solveIK

▸ **solveIK**(): `any`

#### Returns

`any`

#### Defined in

spark.procedural-animations.base-character.ts:112
