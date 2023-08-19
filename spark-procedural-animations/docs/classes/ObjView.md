[spark-procedural-animations](../README.md) / [Exports](../modules.md) / ObjView

# Class: ObjView

Object that represents orientation in 3D space

## Implements

- [`IObjViewOrientation`](../interfaces/IObjViewOrientation.md)

## Table of contents

### Constructors

- [constructor](ObjView.md#constructor)

### Properties

- [\_iniBk](ObjView.md#_inibk)
- [\_iniDn](ObjView.md#_inidn)
- [\_iniFw](ObjView.md#_inifw)
- [\_iniLt](ObjView.md#_inilt)
- [\_iniRt](ObjView.md#_inirt)
- [\_iniUp](ObjView.md#_iniup)
- [\_obj](ObjView.md#_obj)
- [adjustRot](ObjView.md#adjustrot)
- [adjustRotInverse](ObjView.md#adjustrotinverse)
- [bk](ObjView.md#bk)
- [dn](ObjView.md#dn)
- [fw](ObjView.md#fw)
- [idealBk](ObjView.md#idealbk)
- [idealDn](ObjView.md#idealdn)
- [idealFw](ObjView.md#idealfw)
- [idealLookAt](ObjView.md#ideallookat)
- [idealLt](ObjView.md#ideallt)
- [idealRt](ObjView.md#idealrt)
- [idealUp](ObjView.md#idealup)
- [lookAt](ObjView.md#lookat)
- [lt](ObjView.md#lt)
- [rt](ObjView.md#rt)
- [up](ObjView.md#up)

### Accessors

- [back](ObjView.md#back)
- [down](ObjView.md#down)
- [forward](ObjView.md#forward)
- [iniBk](ObjView.md#inibk)
- [iniDn](ObjView.md#inidn)
- [iniFw](ObjView.md#inifw)
- [iniLt](ObjView.md#inilt)
- [iniRt](ObjView.md#inirt)
- [iniUp](ObjView.md#iniup)
- [left](ObjView.md#left)
- [o](ObjView.md#o)
- [obj](ObjView.md#obj)
- [p](ObjView.md#p)
- [parent](ObjView.md#parent)
- [right](ObjView.md#right)

### Methods

- [recomputeInitial](ObjView.md#recomputeinitial)

## Constructors

### constructor

• **new ObjView**(`obj`, `fw`, `up`, `lookAtFunc`, `adjustRot`)

Creates an instance of object view.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | [`Object3D`](Object3D.md) | source object |
| `fw` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | forward direction - unit vector |
| `up` | [`IV3Readonly`](../interfaces/IV3Readonly.md) | up direction - unit vector |
| `lookAtFunc` | [`ILookAtFunc`](../interfaces/ILookAtFunc.md) | function that creates quaternion from the forward and up vectors |
| `adjustRot` | [`IQtReadonly`](../interfaces/IQtReadonly.md) | - |

#### Defined in

spark.procedural-animations.objects.ts:408

## Properties

### \_iniBk

• `Private` **\_iniBk**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:387

___

### \_iniDn

• `Private` **\_iniDn**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:391

___

### \_iniFw

• `Private` **\_iniFw**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:386

___

### \_iniLt

• `Private` **\_iniLt**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:389

___

### \_iniRt

• `Private` **\_iniRt**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:388

___

### \_iniUp

• `Private` **\_iniUp**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:390

___

### \_obj

• `Private` `Readonly` **\_obj**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.objects.ts:399

___

### adjustRot

• `Readonly` **adjustRot**: [`IQtReadonly`](../interfaces/IQtReadonly.md) = `null`

#### Defined in

spark.procedural-animations.objects.ts:397

___

### adjustRotInverse

• `Readonly` **adjustRotInverse**: [`IQtReadonly`](../interfaces/IQtReadonly.md) = `null`

#### Defined in

spark.procedural-animations.objects.ts:398

___

### bk

• `Readonly` **bk**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

back direction - unit vector

#### Implementation of

[IObjViewOrientation](../interfaces/IObjViewOrientation.md).[bk](../interfaces/IObjViewOrientation.md#bk)

#### Defined in

spark.procedural-animations.objects.ts:343

___

### dn

• `Readonly` **dn**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

down direction - unit vector

#### Implementation of

[IObjViewOrientation](../interfaces/IObjViewOrientation.md).[dn](../interfaces/IObjViewOrientation.md#dn)

#### Defined in

spark.procedural-animations.objects.ts:359

___

### fw

• `Readonly` **fw**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

forward direction - unit vector

#### Implementation of

[IObjViewOrientation](../interfaces/IObjViewOrientation.md).[fw](../interfaces/IObjViewOrientation.md#fw)

#### Defined in

spark.procedural-animations.objects.ts:339

___

### idealBk

• `Readonly` **idealBk**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

back direction without adjustment - unit vector

#### Defined in

spark.procedural-animations.objects.ts:368

___

### idealDn

• `Readonly` **idealDn**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

down direction without adjustment - unit vector

#### Defined in

spark.procedural-animations.objects.ts:384

___

### idealFw

• `Readonly` **idealFw**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

forward direction without adjustment - unit vector

#### Defined in

spark.procedural-animations.objects.ts:364

___

### idealLookAt

• `Readonly` **idealLookAt**: [`ILookAtFunc`](../interfaces/ILookAtFunc.md)

#### Defined in

spark.procedural-animations.objects.ts:395

___

### idealLt

• `Readonly` **idealLt**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

left direction without adjustment - unit vector

#### Defined in

spark.procedural-animations.objects.ts:376

___

### idealRt

• `Readonly` **idealRt**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

right direction without adjustment - unit vector

#### Defined in

spark.procedural-animations.objects.ts:372

___

### idealUp

• `Readonly` **idealUp**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

up direction without adjustment - unit vector

#### Defined in

spark.procedural-animations.objects.ts:380

___

### lookAt

• `Readonly` **lookAt**: [`ILookAtFunc`](../interfaces/ILookAtFunc.md)

#### Defined in

spark.procedural-animations.objects.ts:393

___

### lt

• `Readonly` **lt**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

left direction - unit vector

#### Implementation of

[IObjViewOrientation](../interfaces/IObjViewOrientation.md).[lt](../interfaces/IObjViewOrientation.md#lt)

#### Defined in

spark.procedural-animations.objects.ts:351

___

### rt

• `Readonly` **rt**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

right direction - unit vector

#### Implementation of

[IObjViewOrientation](../interfaces/IObjViewOrientation.md).[rt](../interfaces/IObjViewOrientation.md#rt)

#### Defined in

spark.procedural-animations.objects.ts:347

___

### up

• `Readonly` **up**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

up direction - unit vector

#### Implementation of

[IObjViewOrientation](../interfaces/IObjViewOrientation.md).[up](../interfaces/IObjViewOrientation.md#up)

#### Defined in

spark.procedural-animations.objects.ts:355

## Accessors

### back

• `get` **back**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

back direction - unit vector

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:546

___

### down

• `get` **down**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

down direction - unit vector

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:552

___

### forward

• `get` **forward**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

forward direction - unit vector

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:528

___

### iniBk

• `get` **iniBk**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

iniitial back direction

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:474

___

### iniDn

• `get` **iniDn**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

iniitial down direction

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:498

___

### iniFw

• `get` **iniFw**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

iniitial forward direction

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:468

___

### iniLt

• `get` **iniLt**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

iniitial left direction

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:486

___

### iniRt

• `get` **iniRt**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

iniitial right direction

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:480

___

### iniUp

• `get` **iniUp**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

iniitial up direction

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:492

___

### left

• `get` **left**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

left direction - unit vector

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:534

___

### o

• `get` **o**(): [`Object3D`](Object3D.md)

alias reference to the object

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.objects.ts:510

___

### obj

• `get` **obj**(): [`Object3D`](Object3D.md)

reference to the object

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.objects.ts:504

___

### p

• `get` **p**(): [`ObjView`](ObjView.md)

alias for parent view

#### Returns

[`ObjView`](ObjView.md)

#### Defined in

spark.procedural-animations.objects.ts:522

___

### parent

• `get` **parent**(): [`ObjView`](ObjView.md)

parent view

#### Returns

[`ObjView`](ObjView.md)

#### Defined in

spark.procedural-animations.objects.ts:516

___

### right

• `get` **right**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

right direction - unit vector

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:540

## Methods

### recomputeInitial

▸ **recomputeInitial**(): `void`

Recomputes initial directions

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:457
