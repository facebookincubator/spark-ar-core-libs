![Meta Spark Studio](./documentation_src/MetaSparkDark.png#gh-dark-mode-only)

![Meta Spark Studio](./documentation_src/MetaSparkLight.png#gh-light-mode-only)

# spark-ar-dynamic-mocks
This package provides effortless way to mock any Spark module's APIs by using Dynamic mocks that are based on [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy) and can pretend to be any object at all by generating requested functions on the fly.


> NOTE: Spark AR Dynamic Mocks is an experimental library. The library is not in active support and APIs working are not guaranteed in the future.

Say, for example, you have code like this:
```ts
import Diagnostics from 'Diagnostics';
import Materials from 'Materials';
import Scene from 'Scene';

// Example script we want to test
export async function main() {
  Diagnostics.log('Started ');
  // Looking for the material
  const mat = await Materials.findFirst('material0');
  mat.opacityValue = 0.5;

  // Creating a plane in the scene
  const planeObj = Scene.createSync('Plane');
  // Assining newly created plane created earlier material
  planeObj.material = mat;
  // Adding created plane to the scene
  Scene.root.addChildSync(planeObj);

  Diagnostics.log('finished ');
}

(async function () {
  await main();
})();
```

You want to test if material opacity is being set to 0.5. Of course you can mock everything else by yourself - like Diagnostics module, Scene module and so on and will end up with multiple multilayered (because you need to mock root property of Scene as well) empty mocks.

Or you can use dynamic mocks and write your Jest tests like this:
```ts
import {expect, test, jest, beforeEach} from '@jest/globals';

import {main} from '../scripts/script';
import {resetMockOverrides, addMockOverride} from 'spark-ar-dynamic-mocks';

beforeEach(() => {
  jest.resetAllMocks();
  resetMockOverrides();
});

test('In main function opacity of material is set to 0.5', async () => {
  // Given
  const opacity = addMockOverride('Materials.findFirst.then.opacityValue');

  // When
  await main();

  // Then
  expect(opacity).toHaveBeenCalledWith(0.5);
});
```

All the modules will be mocked automatically and the only mock that you create is the mock for opacityValue. By default mocks overrides are jest.fn() so you can then check everything you need on this mock.

More examples of usage can be found in [example](./example) folder of the package.

### License

The **spark-ar-dynamic-mocks** library is [MIT licensed](./LICENSE).
