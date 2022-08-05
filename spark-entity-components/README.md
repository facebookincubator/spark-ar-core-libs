![Spark AR Studio](./documentation_src/SparkARDark.png#gh-dark-mode-only)

![Spark AR Studio](./documentation_src/SparkARLight.png#gh-light-mode-only)

# spark-entity-components
Attach reusable scripts to scene objects, which allow for on-frame callbacks and imperative coding paradigm within Spark.

> NOTE: Spark Entity Components is an experimental library. It is intended to be used as an example framework for ECM-style programming model in Spark. The library is not in active support and APIs working are not guaranteed in the future.

## Features
1. **Object Scripts:** Ability to attach functional blocks (called Components) to scene objects or blocks (called Entities)
2. **Reusable:** These components and entities are reusable and be attached to any number of scene objects (as individual instances)
3. **Visibility Aware Lifecycle:** These components get a deterministic create, start and enable/disable callbacks. Components automatically get enabled/disabled when the scene object becomes visible/disabled.
4. **Frame Aware:** Components can choose to get callbacks after each frame, allowing for frame based programming style.
5. **Imperative Programming:** To assist frame based programming, you can do imperative programming within components, and many properties of scene objects will be available without reactive APIs.
6. **Built-In Components:** We provide out of the box Transforms, World Transform and 2D/3D Text components. As time progresses we will add more.
7. **Blocks:** You can create wrappers around blocks to create and automatically attach components to created instances.
8. **Vector, Quaternion Math:** ECM also comes with a bunch of prebuilt vector and quaternion math (like products, etc.) out of the box.

### Setup the Project Settings
1. Open the **_AR Asset Library > Scripting Packages_**
2. **Import Free** the `spark-entity-components`
3. If it doesn’t automatically work, in your `tsconfig.json` you might have to enable **"experimentalDecorators": true**
4. In any script you need to import as follows:
```
import {SceneEntity, SceneEntityComponent, …} from 'spark-entity-components';
```

### Create a Component
Components are the functional blocks you can attach to SceneEntities (which are wrappers around SceneObjects). You can create your own component:
```
class X extends SceneEntityComponent {
  …
}
```

Your component can optionally contain any of these methods:
1. **onCreate:** Optionally asynchronous function which will be called for all the known components at the start before onStart for any is called. Good place to setup additional components / get transform components etc.
2. **onStart:** Optionally asynchronous function called after onCreate, and exactly once.
3. **onEnable:** Synchronous function called once when the scene object becomes visible. Also called once before the first onFrame. (Called after start has happened)
4. **onDisable: **Synchronous function called once when the scene object becomes invisible. (Called after start has happened)
5. **onFrame:** Synchronous function called every frame in which the scene object is visible. (Called after start has happened)
6. **onDestroy: **Synchronous function called once when the scene entity is "destroyed" and no longer valid.

Example Component:

```
class OscillationComponent extends SceneEntityComponent {
  private _lastTimestampS: number = 0;
  private _oscilationTimeS: number = 2;
  private _oscilationMagnitude: number = 0.1;

  private _transform: Transform;

  async onCreate(): Promise<void> {
    this._transform = this.sceneEntity.getOrAddComponent(Transform);
  }

  onFrame(frameInfo: FrameUpdateInfo): void {
    let radians = (this._lastTimestampS / this._oscilationTimeS) * 2 * Math.PI;
    this._transform.position.x = this._oscilationMagnitude * Math.sin(radians);
  }
}
```

### Create a Scene Entity
To attach components on any scene object or block, you need to create a SceneEntity around the scene object. You must use the `SceneEntity.create(sceneObject)` method, else you can end up with 2 copies which are not aligned with each other in terms of components.

```
const entityFromSceneObject: SceneEntity = SceneEntity.create(sceneObject);
const entityFromBlock: SceneEntity = SceneEntity.create(blockInstance);

const entityFromScene: SceneEntity = await SceneEntity.findFirst(name);
const entitiesFromScene: Array<SceneEntity> = await SceneEntity.findByPath(pathQuery);
const entitiesFromScene: Array<SceneEntity> = await SceneEntity.findAll(name);
```

Attaching components to `SceneEntity` can be done in a couple of ways, but for the most part we would encourage using `getOrAddComponent`, since it will not throw if you have already added a component. This is especially important for components like transform, which won’t just exist out of the box as you would expect, since these aren’t core to the engine, but instead need to be lazily added.

```
// Takes in the type of the component
sceneEntity.getOrAddComponent(YourComponent);

// Takes in the type of the component and a factory which will be called
// if a new instance is needed
sceneEntity.getOrAddComponent(YourComponent, () => { return componentInstance; });

// Takes in the class name and a factory
sceneEntity.getOrAddComponentByClassName('YourComponent', () => { return componentInstance; });

// Takes in an instance, throws if you already have the type
sceneEntity.addComponent(component);

// Takes in a type of the component, also throws if already there of the type
sceneEntity.addComponentOfType(YourComponent);
```


If you need to replace components, check out the `removeComponent` methods.


### Setup and Get Started
To make the Scene Entity system start, you need to call `SceneEntityManager.run();`. You can add additional information in this function which will allow you to get more control on the scene graph specific invocation at the expense of some performance (see FAQs for more).

```
(async function () {
    let sceneObject = await SceneEntity.findFirst('your_demo_object');
    sceneObject.addComponentOfType(YourComponent);
    …
    SceneEntityManager.run();
})();
```

## FAQs (Frequently Asked Questions)

### How to get Frame Information?

The first argument of `onFrame` contains information about the frame update. Some of these fields can be useful.

```
onFrame(frameInfo: FrameUpdateInfo): void {
  // Index of the frame from the start of the subscription
  frameInfo.frameId

  // Time since last frame in milliseconds
  frameInfo.deltaTimeMs
  // Time since last frame in seconds
  frameInfo.deltaTimeS

  // Current time in milliseconds
  frameInfo.currentTimeMs
  // Current time in seconds
  frameInfo.currentTimeS
}
```

### How to get another scene object?

You can only get other scene objects reliably in the onCreate and onStart methods since they are only ones which will run async code. How you do it is still like usual:


```
class YourComponent extends SceneEntityComponent {
    async onCreate(): Promise<void> {
        let other = await SceneEntity.findFirst('other_objects');
        this._otherT = other.getOrAddComponent(TransformScale);
    }
}
```


### How to get and modify **Transform** for the Scene Object?

You can get and modify different transform properties of a Scene Object. Since Transforms don’t just exist out of the box as you would expect, since these aren’t core to the engine, they first need to be lazily added.


```
const transform = SceneEntity.create(object).getOrAddComponent(Transform);
```


You can make code a little more efficient by instead using exactly the transform properties you need:


```
const tp = SceneEntity.create(object).getOrAddComponent(TransformPosition);
const ts = SceneEntity.create(object).getOrAddComponent(TransformScale);
const tr = SceneEntity.create(object).getOrAddComponent(TransformRotation);
```


These can also be gotten via transform.position, transform.scale, transform.rotation.

You can now get / modify the scene transforms:


```
transformPosition.x = …;
transformPosition.toVector()
transformPosition.moveTo(vector)
transformPosition.moveBy(vector)
transformPosition.moveToCoordinates(x, y, z);
```



```
transformScale.x = …;
transformScale.toVector()
transformScale.scaleBy(value)
transformScale.scaleTo(vector)
transformScale.scaleToValues(x, y, z);
```



```
transformRotation.x = …;
transformRotation.toVector()
transformRotation.rotateTo(vector)
transformRotation.rotateByEuler(vector)
transformRotation.rotateToQuaternion(quaternion);
transformRotation.rotateByQuaternion(quaternion);
transformRotation.rotateToRadians(x, y, z);
```



### Can you use and modify Text?

Yes you can. For the time being we only allow modifying the text fields but eventually a lot more fields would be mutable. To use in 2D and 3D texts simply add and use the Text2D and Text3D components.


```
let text2D = await SceneEntity.findFirst('2DTextObject');
this._2DText = text2D.getOrAddComponent(Text2D);
…
this._2DText.text = 'Something';
```



```
let text3D = await SceneEntity.findFirst('3DTextObject');
this._3DText = text3D.getOrAddComponent(Text3D);
this._3DText.text = 'Something';
```



### How to have deterministic ordering of SceneObject lifecycle methods?

Ordering of Components (in which they get onCreate/onFrame/… callbacks) within a SceneEntity are always in order of them being attached.

The order in which SceneEntitys are themselves calling callbacks on their components is in question here. By default the ordering is non-deterministic. But it is possible to ensure the calling is SceneGraph ordering, parent calls it’s components first and then child scene objects can call on their components. This is done by:


```
SceneEntityManager.run({
    loadSceneGraph: true,
});
```

### How to hide / unhide a SceneEntity

Hiding and unhiding a SceneEntity is as simply as setting if it's active.

```
entity.setActive(isVisible);
```

To determine if an entity is visible you can check `entity.activeSelf` or `entity.isVisible`:

```
// If the current scene entity is set to be visible (the underlying scene object's "hidden" field)
entity.activeSelf

// If hierarchical visibility awareness is enabled (see next section), then this indicates if the
// scene entity is visible. It can be false, if either the scene object is hidden or it's parent is hidden.
// If hierarchical visibility awareness is disabled, then is equivalent to entity.activeSelf
entity.isVisible
```

### How to get hierarchical visibility awareness?

By default visibility awareness is only at the level of the scene entity (when the underlying scene object itself becomes “hidden = true/false” then visibility is changed). To enable hierarchy visibility, where hiding a parent will also trigger enable state of the children:


```
SceneEntityManager.run({
    loadSceneGraph: true,
});
```

> Note: I am considering a method which will allow libraries to both dynamically add configuration and also specify requirements independently instead of on run. This will allow build libraries on top of ECM reliably

### How to destroy a SceneEntity

Sometimes you need to destroy scene entities, and expect their components and functionality is disabled.

To do so, you can simply call the `sceneEntity.destroy()` function. By default this function will:

- Hide a scene entity created from a SceneObject, and call the onDisable and onDestroy functions on it.
- Hide a scene entity created from a Block, call the onDisable and onDestroy functions, and destroy/pool the underlying scene object.


### How to use Quaternion and Vector math?

ECM comes with a bunch of Quaternion and Vector math libraries. Most of the methods work without copying and have side-effects, so be careful to clone for local copies of vectors/quaternions.


```
new Vector3(x, y, z);
Vector3.up / Vector3.down
Vector3.forward / Vector3.back
Vector3.left / Vector3.right
Vector3.zero / Vector3.identity

vector.add(anotherVector);
vector.sub(anotherVector);
vector.neg();
vector.scale(value);
vector.normalize();
vector.clone();

vector.magnitude
vector.squaredMagnitude

Vector3.dot(vectorA, vectorB);
Vector3.cross(vectorA, vectorB);
Vector3.angle(vectorA, vectorB);
Vector3.distance(vectorA, vectorB);
```



```
new Quaternion(x, y, z, w);
Quaternion.createFromAngleAndAxis(angle, vectorAxis);
Quaternion.createFromEulerAngles(x, y, z);
Quaternion.createBetweenVectors(start, destination);
Quaternion.identity

quaternion.magnitude
quaternion.squaredMagnitude

quaternion.inverse();
quaternion.conjugate();
quaternion.normalize();
quaternion.clone();

quaternion.toEulerAngels();
quaternion.rotateVector(vector);

Quaternion.product(quaternionA, quaternionB);
```

### Using LERP and SLERP to animate

`spark-entity-components` comes with built in LERP (Linear Interpolation) and SLERP (Spherical Linear Interpolation) functionality.

```
Lerp.number(start, end, lerpAmount);
Lerp.vector(start, end, lerpAmount);
Lerp.quaternion(start, end, lerpAmount);
```

```
Slerp.quaternion(start, end, lerpAmount);
```

### What is and how to create a Block with Components?

We also allow creating BlockSceneEntity which allow you to enhance blocks with components and attach those components automatically when instantiation happens.


```
const factory = BlockEntityFactory.create('blockName', [
    ComponentA,
    ComponentB,
]);

// OR without any default components
const factory = BlockEntityFactory.create('blockName');


// Optional, if you want to add custom instances
factory.addComponentFactory(() => { … instance; });

// Optional, set the parent to attach the block to on instantiation
factory.setDefaultParent(sceneObject);
```

```
// This allows you to create factory in the beginning
// and creating on demand in different components
const factory = BlockEntityFactory.get('blockName');

const sceneEntityInDefaultParent = await factory.new();
const sceneEntityInSetParent = await factory.new(parent);
```

#### How to pool BlockSceneEntity instances on destroy

Sometimes you want to create blocks multiple times, which can be expensive. We allow simple mechanisms to allow pooling the underlying scene objects.

You can pass in the `poolCount` in the Factory creation stage, which is used as a max limit for how many 'destroyed' scene objects can be pooled.

```
const factory = BlockEntityFactory.create('blockName', [...], poolCount);
...

// Automatic pooling if possible
sceneEntityCreatedFromBlock.destroy();
```

#### **Custom use of `SceneObjectPool`**

You can also utilise the underlying pool to create custom functionality for `SceneObject` pooling

```
// Register a new pool key and way to create new instances if needed
SceneObjectPool.instance.register({
  poolKey: poolKey,
  poolCount: poolMaxCount,
}, (poolKey) => {
  return newSceneObject;
});

// Request a pooled or new instance from the pool
SceneObjectPool.instance.request(key);

// Pool an existing scene object for the key
SceneObjectPool.instance.pool(key, sceneObject);
```



### How to make debugging easier?

Since this is a local script you can obviously go and tinker around with things. But there is a helper function you can use in your SceneEntityComponent which will log useful stuff to differentiate between different components


```
class YourComponent extends SceneEntityComponent {
    yourFunction() {
        this.logStats("log message");
    }
}
```


Example Test Component you can make and add to test basic lifecycle methods:


```
class TestComponent extends SceneEntityComponent {
    onCreate() {
        this.logStats("onCreate");
    }
    onStart() {
        this.logStats("onStart");
    }
    onEnable() {
        this.logStats("onEnable");
    }
    onDisable() {
        this.logStats("onDisable");
    }
    onFrame() {
        this.logStats("onFrame");
    }
}
```



### How to add Components which interact with SceneObject Properties?

Sometimes you might want to create components which hold/read properties which are already exposed in components like Transform, WorldTransform, Text2D, Text3D. You can do so by:


```
class YourComponent extends SceneEntityComponentWithProps {

    // example 'transform.scaleX' in TransformScale component
    @SceneObjectProperty('pathToProperty1')
    public someHeldNumericProperty: number;

    // example 'worldTransform.scaleX' in WorldTransform component
    @SceneObjectProperty('pathToProperty2', true)
    public someReadOnlyNumericProperty: number;

    // example 'text' in Text2D component
    @SceneObjectProperty('pathToProperty3', false, ManagedSignalType.STRING)
   public someHeldStringProperty: string;
}
```



### How can I work Signals into my imperative code?

Most signal setup would still work, but creating Signals in onFrame can become very expensive, so it is better to convert signals into an imperative paradigm. You can do this by using the Frame monitor and snapshot APIs

To get one off values:


```
const values = await SceneEntityFrameUpdateListener.instance.snapshotSignals({
"signal1": …, "signal2:" …});
```


To get a subscription which will give you a new value in every frame:


```
const valueSubscriptions = SceneEntityFrameUpdateListener.instance.monitorSignals({
"signal1": …, "signal2:" …});
```


You can unsubscribe from these updates once you are done to improve performance.


### How to get World Transforms?

World Transform (note this refers to the worldTransform terminology of Spark and not a global transform coordinates in the same coordinate space as the transform) can be gotten easily as read only values by adding a WorldTransform component.


```
const wt = entity.getOrAddComponent(WorldTransform);

wt.x/y/z
wt.scaleX/scaleY/scaleZ
wt.rotationX/rotationY/rotationZ

wt.position
wt.scale
wt.rotation
```

### How to point an object towards a direction?

`TransformComponent` offers some useful techniques around moving a scene object towards another scene object or direction. This can be done as follows:

```
// Call this once in onCreate/onStart or as appropriate to set what
// is the starting state of the forward direction in the local space.
transform.forwardDirection = Vector.up;

// You can make the object see in a particular direction by either passing the direction or the destination and self position.
transform.lookInDirection(direction);
transform.lookAt(destinationPosition, startPosition);
```

### Interoperating with the Patch Editor

`spark-entity-components` can work alongside Patch Editor blocks when it comes to getting signals and pulses from patches. You can set those up with callbacks in `onCreate` functions.

However you might be blocked if you try to modify properties of scene objects from `spark-entity-components` and also from Patch Editor simulataneously. You can however still 'get' the values of properties
by using `ReadOnlyTransform` and `WorldTransform` components.


### License

The **spark-entity-components** library is [MIT licensed](./LICENSE).
