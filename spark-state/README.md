![Spark AR Studio](./documentation_src/SparkARDark.png#gh-dark-mode-only)

![Spark AR Studio](./documentation_src/SparkARLight.png#gh-light-mode-only)

# Spark State

The **Spark State** library introduces a solution to manage a <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/articles/video-calling-effects/creating-a-group-effect-with-the-multipeer-api" target="_blank">group effect's</a> global state by creating globally synchronized data signals and making them available within an effect's JavaScript.

<br>

## Contents


- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Spark AR project setup](#spark-ar-project-setup)
  - [Loading the module](#loading-the-module)
- [Documentation](#documentation)
  - [`GlobalCounterSignal`](#globalcountersignal)
  - [`GlobalStringSignal`](#globalstringsignal)
  - [`GlobalScalarSignal`](#globalscalarsignal)
  - [`GlobalPeersMap`](#globalpeersmap)
  - [`SortedParticipantArray`](#sortedparticipantarray)
- [Example](#example)
- [Limitations](#limitations)
- [Additional resources](#additional-resources)
- [License](#license)

<br>

## Getting started

### Spark AR project setup

1. <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/downloads/" target="_blank">Download</a> or upgrade to Spark AR Studio v134 or higher.
2. Open your project in Spark AR Studio.
3. Open the AR Library from within the Assets panel and select the **Script Packages** tab.
4. Import the `spark-state` package to the project.
5. In the project's Properties, add the **Scripting Writeable Signal Source** capability.

<br>

### Loading the module

1. Add a new Javascript script to the project from the Assets panel, or open an existing one.
2. At the top of the script, load the module using the following line of code:

   ```js
   const State = require('spark-state');
   ```

3. The current implementation also requires that you load the `Multipeer` and `Participants` modules in your script in order to enable the two associated capabilities:

   ```js
   const Multipeer = require('Multipeer');
   const Participants = require('Participants');
   ```

<br><br>


## Documentation

### `GlobalCounterSignal`

`GlobalCounterSignal` is a wrapper object for the <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/reactivemodule.scalarsignal/" target="_blank">`ScalarSignal`</a> class from the Spark AR API's <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/reactivemodule/" target="_blank">`ReactiveModule`</a>. However, the scalar value contained by the signal is synchronized globally across all participants in a group effect.

Additionally, it's possible to subscribe to a `GlobalCounterSignal` like you would with an <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/reactivemodule.eventsource/" target="_blank">`EventSource`</a>:

```js
GlobalCounterSignal.monitor().subscribe((event) => {
  // Code here will run when the value of the signal changes
});
```

<br>

| Methods | Description |
|---|---|
| `createGlobalCounterSignal(startValue: number, signalName: string)` | Creates a new `GlobalCounterSignal` with a globally unique name as specified by `signalName`, and with the initial value set by `startValue`. |
| `increment(i: number)` | Increases the value of the `GlobalCounterSignal` by the value of `i`. |
| `decrement(i: number)` | Decreases the value of the `GlobalCounterSignal` by the value of `i`. |

<br>

> `GlobalCounterSignal` extends the `ScalarSignal` class. As such, <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/reactivemodule.scalarsignal#methods/" target="_blank">methods</a> exposed by `ScalarSignal` can also be called on `GlobalCounterSignal`.

<br>

<details><summary><b>Click to view example</b></summary>
<p>

```js
const State = require('spark-state');

(async function () {

    // Initializes a new global counter signal with the initial value: 1
    const globalCounter = await State.creatCounterGlobalSignal(1, 'globalCounter');

    // Increments the counter signal value by 2
    globalCounter.increment(2);
})();
```

</p>
</details>

<br><br>


### `GlobalStringSignal`

`GlobalStringSignal` is a wrapper object for the <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/reactivemodule.stringsignal/" target="_blank">`StringSignal`</a> class from the Spark AR API's <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/reactivemodule/" target="_blank">`ReactiveModule`</a>. However, the string value contained by the signal is synchronised globally across all participants in a group effect.

Additionally, it's possible to subscribe to a `GlobalStringSignal` like you would with an <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/reactivemodule.eventsource/" target="_blank">`EventSource`</a>:

```js
GlobalStringSignal.monitor().subscribe((event) => {
  // Code here will run when the value of the signal changes
});
```

<br>

| Methods | Description |
|---|---|
| `createGlobalStringSignal(startValue: string, signalName: string)` | Creates a new `GlobalStringSignal` with a globally unique name as specified by `signalName`, and with the initial value set by `startValue`. |
| `set(val: string)` | Sets the value of the `GlobalStringSignal` to `val`. |

<br>

> `GlobalStringSignal` extends the `StringSignal` class. As such, <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/reactivemodule.stringsignal#methods/" target="_blank">methods</a> exposed by `StringSignal` can also be called on `GlobalStringSignal`.

<br>

<details><summary><b>Click to view example</b></summary>
<p>

```js
const State = require('spark-state');

(async function () {

    // Initializes a new global string signal with the initial value: 'Hello'
    const globalString = await State.creatStringGlobalSignal('Hello', 'globalString');

    // Sets the value of the signal to 'Hello world'
    globalString.set('Hello world');
})();
```

</p>
</details>

<br><br>


### `GlobalScalarSignal`

`GlobalScalarSignal` is a wrapper object for the <a href="https://sparkar.facebook.com/ar-studio/learn/reference/classes/ReactiveModule.ScalarSignal" target="_blank">`ScalarSignal`</a> class from the Spark AR API's <a href="https://sparkar.facebook.com/ar-studio/learn/reference/classes/reactivemodule/" target="_blank">`ReactiveModule`</a>. However, the scalar value contained by the signal is synchronised globally across all participants in a group effect.

Additionally, it's possible to subscribe to a `GlobalScalarSignal` like you would with an <a href="https://sparkar.facebook.com/ar-studio/learn/reference/classes/reactivemodule.eventsource/" target="_blank">`EventSource`</a>:

```js
GlobalScalarSignal.monitor().subscribe((event) => {
  // Code here will run when the value of the signal changes
});
```

<br>

| Methods | Description |
|---|---|
| `createGlobalScalarSignal(startValue: number, signalName: string)` | Creates a new `GlobalScalarSignal` with a globally unique name as specified by `signalName`, and with the initial value set by `startValue`. |
| `set(val: number)` | Sets the value of the `GlobalScalarSignal` to `val`. |

<br>

> `GlobalScalarSignal` extends the `ScalarSignal` class. As such, <a href="https://sparkar.facebook.com/ar-studio/learn/reference/classes/reactivemodule.scalarsignal#methods/" target="_blank">methods</a> exposed by `ScalarSignal` can also be called on `GlobalScalarSignal`.

<br>

<details><summary><b>Click to view example</b></summary>
<p>

```js
const State = require('spark-state');

(async function () {

    // Initializes a new global scalar signal with the initial value: 0
    const globalScalar = await State.creatScalarGlobalSignal(0, 'globalScalar');

    // Sets the value of the signal to 42
    globalScalar.set(42);
})();
```

</p>
</details>

<br><br>



### `GlobalPeersMap`

`GlobalPeersMap` is a key-value pair data type which contains the IDs of all <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/participantsmodule.participant" target="_blank">participants</a> in a group effect as keys, and their global signals as values.

Values of types `GlobalScalarSignal` and `GlobalStringSignal` are supported.

The `participantId` parameters in the method calls refer to each effect participant's unique ID string as returned by the <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/participantsmodule.participant#properties" target="_blank">`Participant.id`</a> property from the Spark AR API.

<br>

| Methods | Description |
|---|---|
| `createGlobalPeersMap(participantsStartValue: number \| string, signalName: string)` | Creates a new `GlobalPeersMap` with a globally unique name as specified by `signalName`, and with the initial value set by `participantsStartValue`. |
| `get(participantId: string)` | Returns the `GlobalScalarSignal` or `GlobalStringSignal` from the <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/participantsmodule.participant" target="_blank">`Participant`</a> specified by `participantId`. |
| `set(participantId: string, value: number \| string)` | Sets the value of the `GlobalScalarSignal` or `GlobalStringSignal` to the value specified by `value`, for the <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/participantsmodule.participant" target="_blank">`Participant`</a> specified by `participantId`. |
| `keys()` | Returns all of the keys from the `GlobalPeersMap`, as `participantIds`. |
| `setOnNewPeerCallback(callback: Function)` | Sets a `callback` function to call whenever a new peer is added to the `GlobalPeersMap`. |

<br>

<details><summary><b>Click to view example</b></summary>
<p>

```js
const State = require('spark-state');
const Participants = require('Participants');

(async function () {

    // Initializes a new global peer map
    const points = await State.createGlobalPeersMap(0, 'points');

    // Retrieve the ID for the self participant
    const myParticipantId = (await Participants.self).id;

    // Get the GlobalScalarSignal from the specified participant
    const pointCounter = points.get(myParticipantId);

})();
```

</p>
</details>

<br><br>

### `SortedParticipantArray`

`SortedParticipantArray` provides access to an array containing a sorted list of the participants in a group effect, which is synchronized across all participants.

The object can be queried to get a snapshot of the participants active in the effect or that have been active in the call at some point, sorted by join time.

<br>

| Methods | Description |
|---|---|
| `createSortedParticipantArray()` | Creates a new `SortedParticipantArray` object that can be queried for sorted participant lists. |
| `getSortedActiveParticipants()` | Returns a snapshot of the participants active in the group effect as an array of <a href="https://sparkar.facebook.com/ar-studio/learn/reference/classes/participantsmodule.participant/" target="_blank">`Participant`</a> objects, sorted by join time. |
| `getSortedAllTimeParticipants()` | Returns a snapshot of the participants that have been in the call as an array of <a href="https://sparkar.facebook.com/ar-studio/learn/reference/classes/participantsmodule.participant/" target="_blank">`Participant`</a> objects, sorted by join time. The returned array includes **all** of the participants who have joined the call, whether they are currently active or not. |

<br>

| Properties | Description |
|---|---|
| `changesSignal` | A <a href="https://sparkar.facebook.com/ar-studio/learn/reference/classes/reactivemodule.scalarsignal/" target="_blank">`ScalarSignal`</a> updated every time there’s a change in the call’s participants propagated to the Sorted Active Participants array.

<br>

<details><summary><b>Click to view example</b></summary>
<p>

```js
const State = require('spark-state');
(async function () {
    // Initializes a new sorted participant array
    const sortedParticipantArray = await State.createSortedParticipantArray();
    // Get all of the participants currently active in the effect
    let activeParticipants = await sortedParticipantArray.getSortedActiveParticipants();

    sortedParticipantArray.changesSignal.monitor().subscribe(async () => {
        // Update activeParticipants with new values
        activeParticipants = await sortedParticipantArray.getSortedActiveParticipants();
        doSomething();
    });

})();
```

</p>
</details>

<br><br>

> Full Spark AR API documentation is available on the <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/scripting/summary" target="_blank">main documentation site</a>.

<br><br>

## Example

The sample code found in the [`script.js`](./src/script.js) file shows practical usage for all of the global types currently supported by the **Spark State** library.

You can also check out <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/articles/video-calling-effects/synchronizing-data-across-participants-with-the-state-api" target="_blank">this tutorial</a> on the official Spark AR documentation site, which uses the `State` API to synchronize data across participants.

<br><br>

### Additional resources

The following resources are available on the <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/getting-started" target="_blank">**Spark AR Studio**</a> documentation site:

- <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/participantsmodule" target="_blank">`ParticipantsModule`</a>
- <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/multipeermodule" target="_blank">`MultipeerModule`</a>
- <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/articles/video-calling-effects/creating-a-group-effect-with-the-multipeer-api" target="_blank">Creating a Group Effect with the Multipeer API</a>
- <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/articles/video-calling-effects/creating-turn-based-experiences-with-the-participants-api" target="_blank">Creating Turn-Based Experiences with the Participants API</a>
- <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/articles/video-calling-effects/synchronizing-data-across-participants-with-the-state-api" target="_blank">Synchronizing Data Across Participants with the State API</a>

<br><br>

### License

The **Spark State** library is [MIT licensed](./LICENSE).
