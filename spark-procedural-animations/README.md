![Meta Spark Studio](../../open_source/documentation_src/MetaSparkDark.png#gh-dark-mode-only)

![Meta Spark Studio](../../open_source/documentation_src/MetaSparkLight.png#gh-light-mode-only)

# Spark Procedural Animation

### AR Library for using procedural animations with 3D characters

Procedural Animations are the kind of animations that use mathematical algorithms to generate animation in real-time, rather than using predefined animations that are stored in memory. Procedural animation allows for more diverse and realistic actions and movements of characters and objects in a virtual environments. Procedural animations can use techniques such as inverse kinematics, physics simulation, noise functions, and aligning motion to input, as well as introduce randomness.

The goal is not to replace the traditional ways of working with rigged 3D models but rather to offer an alternative approach that may be more suitable in some case and less so in others.

### Technical Documentation and Source Files

[Modules, Classes, Interfaces, Functions - Documentation](./docs/modules.md)

 * [core.ts](./src/spark.procedural-animations.core.ts) - core functions
 * [messenger.ts](./src/spark.procedural-animations.messenger.ts) - messenger object to be used for sending and receiving events
 * [pool.ts](./src/spark.procedural-animations.pool.ts) - object pool provider used to reduce heap allocations
 * [behaviors.ts](./src/spark.procedural-animations.behaviors.ts.ts) - animation management and scheduling infrastructure
 * [math-2d.ts](./src/spark.procedural-animations.math-2d.ts.ts) - 2D math objects and functions
 * [math-3d.ts](./src/spark.procedural-animations.math-3d.ts.ts) - 3D math objects and functions
 * [objects.ts](./src/spark.procedural-animations.objects.ts.ts) - infrastructure for working with SceneObjectBase
 * [base-character.ts](./src/spark.procedural-animations.base-character.ts.ts) - base character infrastructure and inverse kinematics
 * [humanoid-characters.ts](./src/spark.procedural-animations.humanoid-characters.ts.ts) - humanoid character specific infrastructure

### Common Abbreviations

 * `a` - actuator - property of every Object3D responsible for scheduling movements or rotations
 * `v` - view - property of every Object3D that describes `ideal` forward and up rotations of an object that might be different from the `real` rotation
 * `p` - parent - if used in a view means the parent view, `v.p` meand the view of the parent object
 * `o`, `obj` - object
 * `dn` - down
 * `lt` - left
 * `rt` - right
 * `fw` - forward
 * `bk` - back
 * `V3` - vector 3D - [V3](./docs/classes/V3.md)
 * `V2` - vector 2D - [V2](./docs/classes/V2.md)
 * `Qt` - Quaternion - [Qt](./docs/classes/Qt.md)
 * `pos` - position
 * `rot` - rotation
 * `sca` - scale
 * `ini` - initial

### Common Actuator Expressions

We can use actuators to schedule declaratively motion or rotation on a given object.
By default actuators always work in local space unless it is specified otherwise.

The following code executes for `someObject` object those steps:
 1. Schedule motion 0.1 towards whatever current object view considers to be left

    NOTE: if the object has factor defined, 0.1 will be fraction of that factor, otherwise it will be absolute local length.

 2. Schedule rotation facing 30 degree down (pitch) to and 10 degrees tilt to the right (roll) from what the normal object view rotation, relative to it's parent

 3. Execute these actions for next 3 seconds following [smoothstep function](https://en.wikipedia.org/wiki/Smoothstep) and using the using object pool


```ts
someObject.actuator
    .move
    .to(v => v.o.iniPos.addLt(0.1, v))
    .rotation
    .to(v => v.lookAt(v.fw.rotDn(30, v.p), v.up.rotRt(10, v.p)))
;

this.playFor(3, x => apply(smoothstep01(x), someObject), objPool);
```

The following code is fixing the leg position and rotation on the ground.
Note how we always use view to describe rotation, so that we can define what is forward and up in the view independently of a given rig.

```ts
const legPos = leg.worldPos;
const legRot = leg.worldRot;
leg.actuator
    .move.asWorld()
    .to(v => legPos)
    .rotation.asWorld()
    .to(v => v.lookAt(legRot.fw, legRot.up))
;

this.playFor(3, x => apply(x, someObject), objPool);
```

### Object Pooling

Major performance challange for JavaScript that executes on every frame is the allocation of large number of heap objects that then need to be garbage collected. To minimize this effect we use [object pooling](https://en.wikipedia.org/wiki/Object_pool_pattern).

Common way to use object pool

```ts
import {objPool} from 'spark-procedural-animations';

this.playFor(2, x => {
    someObj.rot = lookAt(someObj.worldPos.dirTo(target.pos), V3.up);
}, objPool);
```
Currently object pool can only be used in scope frame. Meaning that any [V3](./docs/classes/V2.md), [V3](./docs/classes/V3.md), [Qt](./docs/classes/Qt.md) objects will be recycled within given frame. If you expect and object to span mode that one frame you can define it as permanent, for example:
```ts
import {objPool} from 'spark-procedural-animations';

this.playFor(2, x => {
    if(someCondition)
        someTargetPos = V3.createPermanent(0, 10, 0);

    someObj.rot = lookAt(someObj.worldPos.dirTo(someTargetPos), V3.up);
}, objPool);
```
In the example above object pooling is being applied by the `playFor` function. You can also apply it manualy around any snippet of code this way:
```ts
import {objPool} from 'spark-procedural-animations';

const sid = objPool.begin(mainBehaviorExecutor.frame);
try {
    // any code to use V2, V3, Qt objects from the pool within current frame
} catch (error) {
    // if needed take care of any error handling here
    throw;
} finally {
    objPool.end(sid);
}
```



### License

The **spark-procedural-animations** library is [MIT licensed](./LICENSE).
