[spark-procedural-animations](../README.md) / [Exports](../modules.md) / RotationBuilder

# Class: RotationBuilder

## Table of contents

### Constructors

- [constructor](RotationBuilder.md#constructor)

### Properties

- [\_actuator](RotationBuilder.md#_actuator)
- [\_rotateAboutAxes](RotationBuilder.md#_rotateaboutaxes)
- [\_rotateFrom](RotationBuilder.md#_rotatefrom)
- [\_rotateTo](RotationBuilder.md#_rotateto)
- [\_rotateTo2KeyPoints](RotationBuilder.md#_rotateto2keypoints)
- [\_space](RotationBuilder.md#_space)

### Accessors

- [move](RotationBuilder.md#move)
- [noMove](RotationBuilder.md#nomove)

### Methods

- [aboutAxis](RotationBuilder.md#aboutaxis)
- [asLocal](RotationBuilder.md#aslocal)
- [asWorld](RotationBuilder.md#asworld)
- [build](RotationBuilder.md#build)
- [buildInternal](RotationBuilder.md#buildinternal)
- [from](RotationBuilder.md#from)
- [fromIni](RotationBuilder.md#fromini)
- [recycle](RotationBuilder.md#recycle)
- [to](RotationBuilder.md#to)
- [to2KeyPoints](RotationBuilder.md#to2keypoints)
- [toIni](RotationBuilder.md#toini)
- [when](RotationBuilder.md#when)

## Constructors

### constructor

• **new RotationBuilder**(`actuator`)

Creates an instance of rotation builder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actuator` | [`Actuator`](Actuator.md) | pass an actuator instance |

#### Defined in

spark.procedural-animations.objects.ts:1825

## Properties

### \_actuator

• `Private` **\_actuator**: [`Actuator`](Actuator.md)

#### Defined in

spark.procedural-animations.objects.ts:1815

___

### \_rotateAboutAxes

• `Private` **\_rotateAboutAxes**: `RotationsAboutAxes`

#### Defined in

spark.procedural-animations.objects.ts:1819

___

### \_rotateFrom

• `Private` **\_rotateFrom**: [`ViewToQt`](ViewToQt.md)

#### Defined in

spark.procedural-animations.objects.ts:1816

___

### \_rotateTo

• `Private` **\_rotateTo**: [`ViewToQt`](ViewToQt.md)

#### Defined in

spark.procedural-animations.objects.ts:1817

___

### \_rotateTo2KeyPoints

• `Private` **\_rotateTo2KeyPoints**: [[`ViewToQt`](ViewToQt.md), `number`, [`ViewToQt`](ViewToQt.md)]

#### Defined in

spark.procedural-animations.objects.ts:1820

___

### \_space

• `Private` **\_space**: [`Space`](../enums/Space.md)

#### Defined in

spark.procedural-animations.objects.ts:1818

## Accessors

### move

• `get` **move**(): [`MovementBuilder`](MovementBuilder.md)

Creates or recycles MovementBuilder

#### Returns

[`MovementBuilder`](MovementBuilder.md)

#### Defined in

spark.procedural-animations.objects.ts:1832

___

### noMove

• `get` **noMove**(): [`Actuator`](Actuator.md)

Clears movement

#### Returns

[`Actuator`](Actuator.md)

#### Defined in

spark.procedural-animations.objects.ts:1838

## Methods

### aboutAxis

▸ **aboutAxis**(`axisFunc`, `fromDegrees`, `toDegrees`, `xFunc`): [`RotationBuilder`](RotationBuilder.md)

Define rotation about a given axis

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `axisFunc` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`IV3Readonly`](../interfaces/IV3Readonly.md)\> | function that will return axis based on view |
| `fromDegrees` | `number` | from degrees |
| `toDegrees` | `number` | to degrees |
| `xFunc` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<`number`, `number`\> | function of change between from degeres and to degrees, from degrees = 0 to degrees = 1 |

#### Returns

[`RotationBuilder`](RotationBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1945

___

### asLocal

▸ **asLocal**(): [`RotationBuilder`](RotationBuilder.md)

Sets local space (that is the default)

#### Returns

[`RotationBuilder`](RotationBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1865

___

### asWorld

▸ **asWorld**(): [`RotationBuilder`](RotationBuilder.md)

Sets world space

#### Returns

[`RotationBuilder`](RotationBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1873

___

### build

▸ **build**(): [`Actuator`](Actuator.md)

Builds rotation builder

#### Returns

[`Actuator`](Actuator.md)

actuator

#### Defined in

spark.procedural-animations.objects.ts:1961

___

### buildInternal

▸ `Private` **buildInternal**(): [`IQtByProgress`](../interfaces/IQtByProgress.md)

#### Returns

[`IQtByProgress`](../interfaces/IQtByProgress.md)

#### Defined in

spark.procedural-animations.objects.ts:1968

___

### from

▸ **from**(`func`, `isDynamic?`): [`RotationBuilder`](RotationBuilder.md)

Set source rotation - use it only when you will apply periodic function to oscilate between 'from' and 'to'

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`Qt`](Qt.md)\> | `undefined` | factory function |
| `isDynamic?` | `boolean` | `false` | if set to true creation function will be invoked on each frame as oposed to on initialization only |

#### Returns

[`RotationBuilder`](RotationBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1883

___

### fromIni

▸ **fromIni**(`isDynamic?`): [`RotationBuilder`](RotationBuilder.md)

Set source rotation to the initial rotation - use it only when you will apply periodic function to oscilate between 'from' and 'to'

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `isDynamic?` | `boolean` | `false` | if set to true creation function will be invoked on each frame as oposed to on initialization only |

#### Returns

[`RotationBuilder`](RotationBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1892

___

### recycle

▸ **recycle**(): `void`

Recycles rotation

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:1844

___

### to

▸ **to**(`func`, `isDynamic?`): [`RotationBuilder`](RotationBuilder.md)

Set target rotation

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`Qt`](Qt.md)\> | `undefined` | factory function |
| `isDynamic?` | `boolean` | `false` | if set to true creation function will be invoked on each frame as oposed to on initialization only |

#### Returns

[`RotationBuilder`](RotationBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1911

___

### to2KeyPoints

▸ **to2KeyPoints**(`func1`, `start2`, `func2`, `isDynamic?`): [`RotationBuilder`](RotationBuilder.md)

Sets 2 separate key points

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `func1` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`Qt`](Qt.md)\> | `undefined` | factory function for the first keypoint target |
| `start2` | `number` | `undefined` | start position of second keypoint target |
| `func2` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`Qt`](Qt.md)\> | `undefined` | factory function for the second keypoint target |
| `isDynamic?` | `boolean` | `false` | if set to true creation function will be invoked on each frame as oposed to on initialization only |

#### Returns

[`RotationBuilder`](RotationBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1923

___

### toIni

▸ **toIni**(`isDynamic?`): [`RotationBuilder`](RotationBuilder.md)

Set target rotation to the initial rotation

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `isDynamic?` | `boolean` | `false` | if set to true creation function will be invoked on each frame as oposed to on initialization only |

#### Returns

[`RotationBuilder`](RotationBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1901

___

### when

▸ **when**(`condition`, `create`): [`RotationBuilder`](RotationBuilder.md)

When a given condition is met, execute rotation creation action

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `boolean` | condition to check |
| `create` | [`IActionOfT`](../interfaces/IActionOfT.md)<[`RotationBuilder`](RotationBuilder.md)\> | function to execute if condition is true, takes RotationBuilder as argument |

#### Returns

[`RotationBuilder`](RotationBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:1857
