[spark-procedural-animations](../README.md) / [Exports](../modules.md) / MovementBuilder

# Class: MovementBuilder

## Table of contents

### Constructors

- [constructor](MovementBuilder.md#constructor)

### Properties

- [\_actuator](MovementBuilder.md#_actuator)
- [\_idealFrom](MovementBuilder.md#_idealfrom)
- [\_moveAlongAxes](MovementBuilder.md#_movealongaxes)
- [\_relCurveControl1](MovementBuilder.md#_relcurvecontrol1)
- [\_relCurveControl2](MovementBuilder.md#_relcurvecontrol2)
- [\_space](MovementBuilder.md#_space)
- [\_to](MovementBuilder.md#_to)

### Accessors

- [noRotation](MovementBuilder.md#norotation)
- [rotate](MovementBuilder.md#rotate)

### Methods

- [alongAxis](MovementBuilder.md#alongaxis)
- [asLocal](MovementBuilder.md#aslocal)
- [asWorld](MovementBuilder.md#asworld)
- [build](MovementBuilder.md#build)
- [buildInternal](MovementBuilder.md#buildinternal)
- [from](MovementBuilder.md#from)
- [fromIni](MovementBuilder.md#fromini)
- [recycle](MovementBuilder.md#recycle)
- [relCurveControl1](MovementBuilder.md#relcurvecontrol1)
- [relCurveControl2](MovementBuilder.md#relcurvecontrol2)
- [to](MovementBuilder.md#to)
- [toIni](MovementBuilder.md#toini)
- [when](MovementBuilder.md#when)

## Constructors

### constructor

• **new MovementBuilder**(`actuator`)

Creates an instance of movement builder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actuator` | [`Actuator`](Actuator.md) | pass an actuator instance |

#### Defined in

spark.procedural-animations.objects.ts:2067

## Properties

### \_actuator

• `Private` **\_actuator**: [`Actuator`](Actuator.md)

#### Defined in

spark.procedural-animations.objects.ts:2056

___

### \_idealFrom

• `Private` **\_idealFrom**: [`ViewToV3`](ViewToV3.md)

#### Defined in

spark.procedural-animations.objects.ts:2057

___

### \_moveAlongAxes

• `Private` **\_moveAlongAxes**: `MovementsAlongAxes`

#### Defined in

spark.procedural-animations.objects.ts:2061

___

### \_relCurveControl1

• `Private` **\_relCurveControl1**: [`ViewToV3`](ViewToV3.md)

#### Defined in

spark.procedural-animations.objects.ts:2059

___

### \_relCurveControl2

• `Private` **\_relCurveControl2**: [`ViewToV3`](ViewToV3.md)

#### Defined in

spark.procedural-animations.objects.ts:2060

___

### \_space

• `Private` **\_space**: [`Space`](../enums/Space.md)

#### Defined in

spark.procedural-animations.objects.ts:2062

___

### \_to

• `Private` **\_to**: [`ViewToV3`](ViewToV3.md)

#### Defined in

spark.procedural-animations.objects.ts:2058

## Accessors

### noRotation

• `get` **noRotation**(): [`Actuator`](Actuator.md)

Clears rotation

#### Returns

[`Actuator`](Actuator.md)

#### Defined in

spark.procedural-animations.objects.ts:2080

___

### rotate

• `get` **rotate**(): [`RotationBuilder`](RotationBuilder.md)

Creates or recycles RotationBuilder

#### Returns

[`RotationBuilder`](RotationBuilder.md)

#### Defined in

spark.procedural-animations.objects.ts:2074

## Methods

### alongAxis

▸ **alongAxis**(`axisFunc`, `from`, `to`, `xFunc`, `normalizeByFactor?`): [`MovementBuilder`](MovementBuilder.md)

Define movement alongs axis

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `axisFunc` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`IV3Readonly`](../interfaces/IV3Readonly.md)\> | `undefined` | function that will return axis based on view |
| `from` | `number` | `undefined` | from degrees |
| `to` | `number` | `undefined` | to degrees |
| `xFunc` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<`number`, `number`\> | `undefined` | function of change between from degeres and to degrees, from degrees = 0 to degrees = 1 |
| `normalizeByFactor?` | `boolean` | `true` | when set to false will not apply object factor normalization (by default true) |

#### Returns

[`MovementBuilder`](MovementBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:2242

___

### asLocal

▸ **asLocal**(): [`MovementBuilder`](MovementBuilder.md)

Sets local space (that is the default)

#### Returns

[`MovementBuilder`](MovementBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:2108

___

### asWorld

▸ **asWorld**(): [`MovementBuilder`](MovementBuilder.md)

Sets world space

#### Returns

[`MovementBuilder`](MovementBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:2116

___

### build

▸ **build**(): [`Actuator`](Actuator.md)

Builds movement builder

#### Returns

[`Actuator`](Actuator.md)

actuator

#### Defined in

spark.procedural-animations.objects.ts:2258

___

### buildInternal

▸ `Private` **buildInternal**(): [`IV3ByProgress`](../interfaces/IV3ByProgress.md)

#### Returns

[`IV3ByProgress`](../interfaces/IV3ByProgress.md)

#### Defined in

spark.procedural-animations.objects.ts:2265

___

### from

▸ **from**(`func`, `isDynamic?`, `normalizeByFactor?`): [`MovementBuilder`](MovementBuilder.md)

Set source movement point - use it only when you will apply periodic function to oscilate between 'from' and 'to'

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`V3`](V3.md)\> | `undefined` | factory function, takes object view as argument and returns a vector |
| `isDynamic?` | `boolean` | `false` | if set to true creation function will be invoked on each frame as oposed to on initialization only |
| `normalizeByFactor?` | `boolean` | `true` | when set to false will not apply object factor normalization (by default true) |

#### Returns

[`MovementBuilder`](MovementBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:2127

___

### fromIni

▸ **fromIni**(`isDynamic?`): [`MovementBuilder`](MovementBuilder.md)

Set source movement point to the initial position - use it only when you will apply periodic function to oscilate between 'from' and 'to'

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `isDynamic?` | `boolean` | `false` | if set to true creation function will be invoked on each frame as oposed to on initialization only |

#### Returns

[`MovementBuilder`](MovementBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:2142

___

### recycle

▸ **recycle**(): `void`

Recycles movement

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:2086

___

### relCurveControl1

▸ **relCurveControl1**(`func`, `isDynamic?`, `normalizeByFactor?`): [`MovementBuilder`](MovementBuilder.md)

Set relative curve control1 vector - if not defined motion will be on a line
control point is defined by adding this vector to mid point between 'from' and 'to' points if relCurveControl12 is not defind
control point is defined by adding this vector to 'from' point, if relCurveControl12 is defind
NOTE: if relCurveControl1 is used, motion will be on a quadratic bezie and this will be the control point
NOTE: if relCurveControl1 and relCurveControl12 are used, motion will be on a cubic bezie and this will be the first control point

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`V3`](V3.md)\> | `undefined` | factory function for control vector, takes object view as argument and returns a vector |
| `isDynamic?` | `boolean` | `false` | if set to true creation function will be invoked on each frame as oposed to on initialization only |
| `normalizeByFactor?` | `boolean` | `true` | when set to false will not apply object factor normalization (by default true) |

#### Returns

[`MovementBuilder`](MovementBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:2195

___

### relCurveControl2

▸ **relCurveControl2**(`func`, `isDynamic?`, `normalizeByFactor?`): [`MovementBuilder`](MovementBuilder.md)

Set relative curve control2 vector for cubic bezier - if not defined motion will be on a line or quadratic bezie
control point is defined by adding this vector to 'to' point
NOTE: if relCurveControl1 is used, motion will be on a quadratic bezie and this will be the control point
NOTE: if relCurveControl1 and relCurveControl12 are used, motion will be on a cubic bezie and this will be the first control point

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`V3`](V3.md)\> | `undefined` | factory function for control vector, takes object view as argument and returns a vector |
| `isDynamic?` | `boolean` | `false` | if set to true creation function will be invoked on each frame as oposed to on initialization only |
| `normalizeByFactor?` | `boolean` | `true` | when set to false will not apply object factor normalization (by default true) |

#### Returns

[`MovementBuilder`](MovementBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:2219

___

### to

▸ **to**(`func`, `isDynamic?`, `normalizeByFactor?`): [`MovementBuilder`](MovementBuilder.md)

Set target movement point

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `func` | [`IFuncOf2T`](../interfaces/IFuncOf2T.md)<[`ObjView`](ObjView.md), [`V3`](V3.md)\> | `undefined` | factory function, takes object view as argument and returns a vector |
| `isDynamic?` | `boolean` | `false` | if set to true creation function will be invoked on each frame as oposed to on initialization only |
| `normalizeByFactor?` | `boolean` | `true` | when set to false will not apply object factor normalization (by default true) |

#### Returns

[`MovementBuilder`](MovementBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:2159

___

### toIni

▸ **toIni**(`isDynamic?`): [`MovementBuilder`](MovementBuilder.md)

Set target movement point to the initial position

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `isDynamic?` | `boolean` | `false` | if set to true creation function will be invoked on each frame as oposed to on initialization only |

#### Returns

[`MovementBuilder`](MovementBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:2174

___

### when

▸ **when**(`condition`, `create`): [`MovementBuilder`](MovementBuilder.md)

When a given condition is met, execute movement creation action

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `boolean` | condition to check |
| `create` | [`IActionOfT`](../interfaces/IActionOfT.md)<[`MovementBuilder`](MovementBuilder.md)\> | function to execute if condition is true, takes MovementBuilder as argument |

#### Returns

[`MovementBuilder`](MovementBuilder.md)

reference to itself

#### Defined in

spark.procedural-animations.objects.ts:2100
