/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-unexpected-multiline */
/* eslint-disable func-call-spacing */

//=======================================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//=======================================================================================

// Load in the required modules
const State = require('spark-state');
const Scene = require('Scene');
const Reactive = require('Reactive');
const Participants = require('Participants');
const Multipeer = require('Multipeer');
const TouchGestures = require('TouchGestures');

(async function () {
  // Enables async/await in JS [part 1]

  //==================================================================================
  // GlobalCounterSignal
  //==================================================================================

  // Locate the counter text in the Scene
  const counterText = await Scene.root.findFirst('counterText');

  // Create GlobalCounterSignals as local signals
  const incrementCounterVal = await State.createGlobalCounterSignal(0, 'incrementCounterVal');
  const decrementCounterVal = await State.createGlobalCounterSignal(0, 'decrementCounterVal');

  // When the global counter (local signal) changes, update the counter text box
  counterText.text = Reactive.val('Counters: ')
    .concat(incrementCounterVal.toString())
    .concat(' | ')
    .concat(decrementCounterVal.toString());

  // When the current participant taps on the screen, increase/decrease the global counter by updating the local signal
  TouchGestures.onTap().subscribe(gesture => {
    incrementCounterVal.increment(1);
    decrementCounterVal.decrement(2);
  });

  //==================================================================================
  // GlobalPeersMap with counters
  //==================================================================================

  // Locate the peers points text object in the Scene
  const peersPointsText = await Scene.root.findFirst('peersPointsText');

  // Create a global map with the peer IDs, each one associated to a counter set to 0
  const peersPoints = await State.createGlobalPeersMap(0, 'points');

  // Update the text with the values from the map
  let text = await formatPeersMap(peersPoints, '- Participants Points -', value =>
    value.toString(),
  );
  peersPointsText.text = text;

  // Retrieve the ID for the 'self' participant
  const myParticipantId = (await Participants.self).id;

  // When the current participant taps on the screen, increase the global counter
  // asociated with its key
  TouchGestures.onTap().subscribe(async gesture => {
    const myCounter = await peersPoints.get(myParticipantId);
    myCounter.increment(1);
  });

  // When a new participant joins the call, add its counter to the screen
  peersPoints.setOnNewPeerCallback(peerId => {
    text = updatePeersMap(text, peersPoints, peerId, value => value.toString());
    peersPointsText.text = text;
  });

  //==================================================================================
  // GlobalPeersMap with strings
  //==================================================================================

  // Locate the peers animals text object in the Scene
  const peersAnimalsText = await Scene.root.findFirst('peersAnimalsText');

  // Create an array of strings with animal names
  const animalList = ['dog', 'cat', 'frog', 'duck'];

  // Create a reference to the next array position
  let nextAnimalPosition = 0;

  // Create a global map with the peer IDs, each one associated to the array counter
  const peersAnimals = await State.createGlobalPeersMap(animalList[nextAnimalPosition], 'animals');

  // Update the text with the values from the map
  let animalsText = await formatPeersMap(peersAnimals, '- Participants Animals -');
  peersAnimalsText.text = animalsText;

  // When the current participant taps on the screen, increase the global counter
  // asociated with its key
  TouchGestures.onTap().subscribe(async gesture => {
    nextAnimalPosition = (nextAnimalPosition + 1) % animalList.length;
    await peersAnimals.set(myParticipantId, animalList[nextAnimalPosition]);
  });

  // When a new participant joins the call, add its counter to the screen
  peersAnimals.setOnNewPeerCallback(peerId => {
    animalsText = updatePeersMap(animalsText, peersAnimals, peerId);
    peersAnimalsText.text = animalsText;
  });

  //==================================================================================
  // GlobalStringSignal
  //==================================================================================

  const INITAL_VALUE = id => `- String test ${id} -\n`;

  // Locate the string text objects in the Scene
  const [stringText1, stringText2] = await Promise.all([
    Scene.root.findFirst('stringText1'),
    Scene.root.findFirst('stringText2'),
  ]);

  // Create GlobalStringSignals as local signals
  const stringGlobalSignal1 = await State.createGlobalStringSignal(
    INITAL_VALUE(1),
    'stringSignal1',
  );
  const stringGlobalSignal2 = await State.createGlobalStringSignal(
    INITAL_VALUE(2),
    'stringSignal2',
  );

  // Update the string text objects with the value of the signals
  stringText1.text = stringGlobalSignal1;
  stringText2.text = stringGlobalSignal2;

  // When the participant taps on the screen, update the string
  TouchGestures.onTap().subscribe(async gesture => {
    stringGlobalSignal1.concat(' concatenating 1');
    stringGlobalSignal2.concat(' concatenating 2');
  });

  // When the participant long presses on the screen, update the string
  TouchGestures.onLongPress().subscribe(async gesture => {
    stringGlobalSignal1.set(INITAL_VALUE(1));
    stringGlobalSignal2.set(INITAL_VALUE(2));
  });

  //==================================================================================
  // GlobalScalarSignal
  //==================================================================================

  // Locate the string text objects in the Scene
  const numberText1 = await Scene.root.findFirst('number1');
  const numberText2 = await Scene.root.findFirst('number2');
  const sumText = await Scene.root.findFirst('sum');

  // Create GlobalScalarSignals as local signals
  const randomNumber1 = await State.createGlobalScalarSignal(0, 'randomNumber1');
  const randomNumber2 = await State.createGlobalScalarSignal(0, 'randomNumber2');

  // Update the text with numbers
  numberText1.text = Reactive.val('Random number: ').concat(randomNumber1.toString());
  numberText2.text = Reactive.val('Another random number: ').concat(randomNumber2.toString());

  // As GlobalScalarSignal extends ScalarSignal, the add operation works
  sumText.text = Reactive.val('Sum: ').concat(randomNumber1.add(randomNumber2).toString());

  // When the participant taps on the screen, update the numbers
  TouchGestures.onTap().subscribe(gesture => {
    randomNumber1.set(Math.floor(Math.random() * 10));
    randomNumber2.set(Math.floor(Math.random() * 10));
  });
})(); // Enables async/await in JS [part 2]

// Format the GlobalPeersMap
async function formatPeersMap(peersMap, title, toStringSignal) {
  // When the map values (local signal) changes, update the counter text box
  let text = Reactive.val(title);

  for (const key of await peersMap.keys()) {
    text = text
      .concat(`\n${key}: `)
      .concat(toStringSignal ? toStringSignal(peersMap[key]) : peersMap[key]);
  }

  return text;
}

// Update the GlobalPeersMap
function updatePeersMap(text, peersMap, peerId, toStringSignal) {
  return text
    .concat(`\n${peerId}: `)
    .concat(toStringSignal ? toStringSignal(peersMap[peerId]) : peersMap[peerId]);
}
