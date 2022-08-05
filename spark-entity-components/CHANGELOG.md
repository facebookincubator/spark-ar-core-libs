# 0.1.1
## Breaking Changes
1. `Map` need to passed into the `monitorSignal` and `snapshotSignal` APIs instead of objects.

## Development Highlights
1. ESLint Security recommendations will now be used while running `yarn lint`

# 0.1.0
## Breaking Changes
1. `SceneEntityPrefab` has now been renamed to `BlockEntityFactory`. The functionality and features are unaffected
2. `FrameUpdateInfo` now has clearer units in variable names and offers seconds and millisecond units out of the box. This means `deltaTime` and `currentTime` are now `deltaTimeMs` and `currentTimeMs` (and have `deltaTimeS` and `currentTimeS` counterparts)

## Release Highlights
Making improvements in the APIs based on feedback on previous alpha release:

1. **Better cross operability with Patch Editor** with ReadOnlyTransform component which allows changing values with patches, but monitoring in components.
2. **Adding SLERP Functionality:** You can now use spherical linear interpolation on Quaternions to rotate smoothly
3. **lookInDirection** method to make a scene object look in a particular direction.

## Development Highlights
1. **Standard Quaternion construction:** Made the Quaternion constructor take inputs in (x,y,z,w) order, which is more inline with other engines

## Bug Fixes
1. `TransformRotation` component rotateToQuaternion fixed to rotate to destination, instead of by destination.
2. `SceneEntity.destroy` can now work even when `loadSceneGraph` is disabled

# 0.0.2
## Release Highlights
Making improvements in the APIs based on feedback on previous alpha release:

1. **Easier SceneEntity creation:** provides asynchronous search methods (based on Scene.root) methods to directly give back a SceneEntity.
2. **Math Helper Functions:** Helper functions in Math libraries to copy, check equality and Lerp
3. **Built-in Components Readiness:** Ability to get a callback when a built in component is ready for getting / setting values.
4. **Destroying and Pooling SceneObjects:** Ability to destroy scene entities and pooling entities created by prefabs on destruction

## Development Highlights

1. **Introduction of ESLint:** Setting code quality checks and linting through eslint.
2. **Introduction of Tests:** The math functionality are now tested and rotation is verified to be in X first, Y next, Z last order.
3. **Restructuring Code:** The built-in components and different Math functionality are now in their own files

## Bug Fixes
1. **Quaternion Rotation Order:** Fixed ordering for some Euler conversion and Between Vector methods
2. **Component Start Race Condition:** Fixed race condition for components being marked started, for lazily created scene objects.

# 0.0.1
## Release Highlights
Releasing the first alpha version of the API, with a few features:

1. **Object Scripts:** Ability to attach functional blocks (called `SceneEntityComponent`) to scene objects or blocks (called `SceneEntity`)
2. **Reusable:** These components and entities are reusable and be attached to any number of scene objects (as individual instances)
3. **Visibility Aware Lifecycle:** These components get a deterministic create, start and enable/disable callbacks. Components automatically get enabled/disabled when the scene object becomes visible/disabled. (using `SceneEntityManager`)
4. **Frame Aware:** Components can choose to get callbacks after each frame, allowing for frame based programming style. (within `SceneEntityFrameCallback`)
5. **Imperative Programming:** To assist frame based programming, you can do imperative programming within components, and many properties of scene objects will be available without reactive APIs. (within `SceneEntityFrameCallback` and `SceneEntitySignals`)
6. **Built-In Components:** We provide out of the box Transforms, World Transform and 2D/3D Text components. As time progresses we will add more. (within `CommonComponents`)
7. **Prefabs:** You can create wrappers around blocks to create and automatically attach components to created instances. (within `SceneEntityPrefab`)
8. **Vector, Quaternion Math:** ECM also comes with a bunch of prebuilt vector and quaternion math (like products, etc.) out of the box. (within `Vector`)
