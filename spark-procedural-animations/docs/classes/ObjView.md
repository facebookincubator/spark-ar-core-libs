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

- [iniBk](ObjView.md#inibk)
- [iniDn](ObjView.md#inidn)
- [iniFw](ObjView.md#inifw)
- [iniLt](ObjView.md#inilt)
- [iniRt](ObjView.md#inirt)
- [iniUp](ObjView.md#iniup)
- [o](ObjView.md#o)
- [obj](ObjView.md#obj)
- [p](ObjView.md#p)
- [parent](ObjView.md#parent)

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

spark.procedural-animations.objects.ts:407

## Properties

### \_iniBk

• `Private` **\_iniBk**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:386

___

### \_iniDn

• `Private` **\_iniDn**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:390

___

### \_iniFw

• `Private` **\_iniFw**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:385

___

### \_iniLt

• `Private` **\_iniLt**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:388

___

### \_iniRt

• `Private` **\_iniRt**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:387

___

### \_iniUp

• `Private` **\_iniUp**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:389

___

### \_obj

• `Private` `Readonly` **\_obj**: [`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.objects.ts:398

___

### adjustRot

• `Readonly` **adjustRot**: [`IQtReadonly`](../interfaces/IQtReadonly.md) = `null`

#### Defined in

spark.procedural-animations.objects.ts:396

___

### adjustRotInverse

• `Readonly` **adjustRotInverse**: [`IQtReadonly`](../interfaces/IQtReadonly.md) = `null`

#### Defined in

spark.procedural-animations.objects.ts:397

___

### bk

• `Readonly` **bk**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

back direction - unit vector

#### Implementation of

[IObjViewOrientation](../interfaces/IObjViewOrientation.md).[bk](../interfaces/IObjViewOrientation.md#bk)

#### Defined in

spark.procedural-animations.objects.ts:342

___

### dn

• `Readonly` **dn**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

down direction - unit vector

#### Implementation of

[IObjViewOrientation](../interfaces/IObjViewOrientation.md).[dn](../interfaces/IObjViewOrientation.md#dn)

#### Defined in

spark.procedural-animations.objects.ts:358

___

### fw

• `Readonly` **fw**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

forward direction - unit vector

#### Implementation of

[IObjViewOrientation](../interfaces/IObjViewOrientation.md).[fw](../interfaces/IObjViewOrientation.md#fw)

#### Defined in

spark.procedural-animations.objects.ts:338

___

### idealBk

• `Readonly` **idealBk**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

back direction without adjustment - unit vector

#### Defined in

spark.procedural-animations.objects.ts:367

___

### idealDn

• `Readonly` **idealDn**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

down direction without adjustment - unit vector

#### Defined in

spark.procedural-animations.objects.ts:383

___

### idealFw

• `Readonly` **idealFw**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

forward direction without adjustment - unit vector

#### Defined in

spark.procedural-animations.objects.ts:363

___

### idealLookAt

• `Readonly` **idealLookAt**: [`ILookAtFunc`](../interfaces/ILookAtFunc.md)

#### Defined in

spark.procedural-animations.objects.ts:394

___

### idealLt

• `Readonly` **idealLt**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

left direction without adjustment - unit vector

#### Defined in

spark.procedural-animations.objects.ts:375

___

### idealRt

• `Readonly` **idealRt**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

right direction without adjustment - unit vector

#### Defined in

spark.procedural-animations.objects.ts:371

___

### idealUp

• `Readonly` **idealUp**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

up direction without adjustment - unit vector

#### Defined in

spark.procedural-animations.objects.ts:379

___

### lookAt

• `Readonly` **lookAt**: [`ILookAtFunc`](../interfaces/ILookAtFunc.md)

#### Defined in

spark.procedural-animations.objects.ts:392

___

### lt

• `Readonly` **lt**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

left direction - unit vector

#### Implementation of

[IObjViewOrientation](../interfaces/IObjViewOrientation.md).[lt](../interfaces/IObjViewOrientation.md#lt)

#### Defined in

spark.procedural-animations.objects.ts:350

___

### rt

• `Readonly` **rt**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

right direction - unit vector

#### Implementation of

[IObjViewOrientation](../interfaces/IObjViewOrientation.md).[rt](../interfaces/IObjViewOrientation.md#rt)

#### Defined in

spark.procedural-animations.objects.ts:346

___

### up

• `Readonly` **up**: [`IV3Readonly`](../interfaces/IV3Readonly.md)

up direction - unit vector

#### Implementation of

[IObjViewOrientation](../interfaces/IObjViewOrientation.md).[up](../interfaces/IObjViewOrientation.md#up)

#### Defined in

spark.procedural-animations.objects.ts:354

## Accessors

### iniBk

• `get` **iniBk**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

iniitial back direction

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:473

___

### iniDn

• `get` **iniDn**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

iniitial down direction

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:497

___

### iniFw

• `get` **iniFw**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

iniitial forward direction

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:467

___

### iniLt

• `get` **iniLt**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

iniitial left direction

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:485

___

### iniRt

• `get` **iniRt**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

iniitial right direction

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:479

___

### iniUp

• `get` **iniUp**(): [`IV3Readonly`](../interfaces/IV3Readonly.md)

iniitial up direction

#### Returns

[`IV3Readonly`](../interfaces/IV3Readonly.md)

#### Defined in

spark.procedural-animations.objects.ts:491

___

### o

• `get` **o**(): [`Object3D`](Object3D.md)

alias reference to the object

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.objects.ts:509

___

### obj

• `get` **obj**(): [`Object3D`](Object3D.md)

reference to the object

#### Returns

[`Object3D`](Object3D.md)

#### Defined in

spark.procedural-animations.objects.ts:503

___

### p

• `get` **p**(): [`ObjView`](ObjView.md)

alias for parent view

#### Returns

[`ObjView`](ObjView.md)

#### Defined in

spark.procedural-animations.objects.ts:521

___

### parent

• `get` **parent**(): [`ObjView`](ObjView.md)

parent view

#### Returns

[`ObjView`](ObjView.md)

#### Defined in

spark.procedural-animations.objects.ts:515

## Methods

### recomputeInitial

▸ **recomputeInitial**(): `void`

Recomputes initial directions

#### Returns

`void`

#### Defined in

spark.procedural-animations.objects.ts:456
