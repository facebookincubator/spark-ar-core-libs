/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-unused-vars */
const assert = require('assert');
const Automerge = require('../src/spark_automerge_wrapper');

const signalName = 'counterVal';

/**
 * Simulates msg between peers until they are synced
 */
function sync(a, b, aSyncStates, bSyncStates, apeerId, bpeerId) {
  const MAX_ITER = 200;
  let aToBmsg = null;
  let bToAmsg = null;
  let i = 0;
  do {
    [aToBmsg] = Automerge.generateSyncMessages(a, aSyncStates, apeerId);
    [bToAmsg] = Automerge.generateSyncMessages(b, bSyncStates, bpeerId);
    if (bToAmsg) {
      [a] = Automerge.processMessage(a, aSyncStates, apeerId, bToAmsg);
    }
    if (aToBmsg) {
      [b] = Automerge.processMessage(b, bSyncStates, bpeerId, aToBmsg);
    }

    if (i++ > MAX_ITER) {
      throw new Error(
        `Did not synchronize within ${MAX_ITER} iterations. Do you have a bug causing an infinite loop?`,
      );
    }
  } while (aToBmsg || bToAmsg);

  return [a, b];
}

function syncMultiple(peers) {
  const MAX_ITER = 200;
  let i = 0;
  do {
    let msgs = [];
    for (let [peerId, peer] of Object.entries(peers)) {
      const newMsgs = Automerge.generateSyncMessages(peer.state, peer.syncStates, peerId);
      msgs = msgs.concat(newMsgs);
    }

    if (msgs.length === 0) {
      break;
    }

    for (const msg of msgs) {
      for (let [peerId, peer] of Object.entries(peers)) {
        const result = Automerge.processMessage(peer.state, peer.syncStates, peerId, msg);
        peer.state = result[0];
      }
    }

    if (i++ > MAX_ITER) {
      throw new Error(
        `Did not synchronize within ${MAX_ITER} iterations. Do you have a bug causing an infinite loop?`,
      );
    }
  } while (1);

  let result = [];
  for (const peer of Object.values(peers)) {
    result.push(peer.state);
  }

  return result;
}

describe('Automerge syncs Counter objects between peers', function () {
  it('should initially be an empty map', () => {
    const state = Automerge.init();
    assert.deepStrictEqual(state, {});
  });

  describe('Signal Counter', function () {
    it('should be instantiated with start value', () => {
      const state = Automerge.initSignalCounter('init value', 'counterVal', 1);

      assert.deepStrictEqual(state.counterVal.value, 1);
    });

    it('should increment', () => {
      let state = Automerge.initSignalCounter('init value', signalName, 1);
      state = Automerge.incrementSignalCounter(state, 'update value', signalName, 3);
      assert.deepStrictEqual(state.counterVal.value, 4);
    });
  });

  describe('Sync two peers', function () {
    let state;
    let otherPeerState;

    const peerId = '1';
    const otherPeerpeerId = '2';

    let syncStates;
    let otherPeerSyncStates;

    beforeEach(() => {
      state = Automerge.initSignalCounter('init counter', signalName, 0);
      otherPeerState = Automerge.init();

      syncStates = {};
      syncStates[otherPeerpeerId] = Automerge.initSyncState();

      otherPeerSyncStates = {};
      otherPeerSyncStates[peerId] = Automerge.initSyncState();
    });

    describe('update my state', function () {
      it('should ignore message for another peer', () => {
        const [otherPeerSyncMessage] = Automerge.generateSyncMessages(
          otherPeerState,
          otherPeerSyncStates,
          otherPeerpeerId,
        );

        const [nextState, patch, ignoreMessage] = Automerge.processMessage(
          state,
          syncStates,
          '3',
          otherPeerSyncMessage,
        );
        assert.deepStrictEqual(ignoreMessage, true);
      });

      it('should not ignore message for me', () => {
        const [otherPeerSyncMessage] = Automerge.generateSyncMessages(
          otherPeerState,
          otherPeerSyncStates,
          otherPeerpeerId,
        );

        const [nextState, patch, ignoreMessage] = Automerge.processMessage(
          state,
          syncStates,
          peerId,
          otherPeerSyncMessage,
        );
        assert.deepStrictEqual(ignoreMessage, false);
      });

      it('should not reply if we have no data as well', () => {
        const state = Automerge.init();
        const [otherPeerSyncMessage] = Automerge.generateSyncMessages(
          otherPeerState,
          otherPeerSyncStates,
          otherPeerpeerId,
        );

        const [nextState] = Automerge.processMessage(
          state,
          syncStates,
          peerId,
          otherPeerSyncMessage,
        );

        const syncMessages = Automerge.generateSyncMessages(nextState, syncStates, peerId);
        assert.deepStrictEqual(nextState, state);
        assert.deepStrictEqual(syncMessages, []);
      });

      it('should sync peers where one has commits the other does not', () => {
        for (let i = 0; i < 10; i++) {
          state = Automerge.incrementSignalCounter(
            state,
            `incrementing for the ${i} time`,
            signalName,
            1,
          );
        }

        assert.notDeepStrictEqual(otherPeerState, state);
        const [nextState, otherPeerNextState] = sync(
          state,
          otherPeerState,
          syncStates,
          otherPeerSyncStates,
          peerId,
          otherPeerpeerId,
        );

        assert.notDeepStrictEqual(otherPeerNextState, otherPeerState);
        assert.deepStrictEqual(otherPeerNextState, nextState);
        assert.deepStrictEqual(nextState, state);
      });

      it('should work with prior sync state', () => {
        for (let i = 0; i < 10; i++) {
          state = Automerge.incrementSignalCounter(
            state,
            `incrementing for the ${i} time`,
            signalName,
            1,
          );
        }

        [state, otherPeerState] = sync(
          state,
          otherPeerState,
          syncStates,
          otherPeerSyncStates,
          peerId,
          otherPeerpeerId,
        );

        for (let i = 0; i < 10; i++) {
          state = Automerge.incrementSignalCounter(
            state,
            `incrementing for the ${i} time`,
            signalName,
            1,
          );
        }

        assert.notDeepStrictEqual(otherPeerState, state);

        [state, otherPeerState] = sync(
          state,
          otherPeerState,
          syncStates,
          otherPeerSyncStates,
          peerId,
          otherPeerpeerId,
        );

        assert.deepStrictEqual(otherPeerState, state);
      });
    });

    describe('When peer joins', function () {
      beforeEach(() => {
        for (let i = 0; i < 50; i++) {
          state = Automerge.incrementSignalCounter(
            state,
            `incrementing for the ${i} time`,
            signalName,
            1,
          );
        }
        syncStates = {}; // if otherPeer wasnt before in the call, there wont be a syncState for it.
      });

      it('Should get the current state from other peer', () => {
        const [_, otherPeerNextState] = sync(
          state,
          otherPeerState,
          syncStates,
          otherPeerSyncStates,
          peerId,
          otherPeerpeerId,
        );

        assert.deepStrictEqual(otherPeerNextState, state);
        assert.deepStrictEqual(Automerge.get(state, signalName), 50);
        assert.deepStrictEqual(Automerge.get(otherPeerNextState, signalName), 50);
      });
    });

    describe('When peer rejoins the call', function () {
      beforeEach(() => {
        for (let i = 0; i < 30; i++) {
          state = Automerge.incrementSignalCounter(
            state,
            `incrementing for the ${i} time`,
            signalName,
            1,
          );
        }

        // both peers sync and have the same state
        [state, otherPeerState] = sync(
          state,
          otherPeerState,
          syncStates,
          otherPeerSyncStates,
          peerId,
          otherPeerpeerId,
        );

        for (let i = 0; i < 20; i++) {
          otherPeerState = Automerge.incrementSignalCounter(
            otherPeerState,
            `incrementing for the ${i} time`,
            signalName,
            1,
          );
        }

        [state, otherPeerState] = sync(
          state,
          otherPeerState,
          syncStates,
          otherPeerSyncStates,
          peerId,
          otherPeerpeerId,
        );

        // otherPeer leaves and rejoins the call with an empty state
        otherPeerState = Automerge.init();
        otherPeerSyncStates = {};
        otherPeerSyncStates[peerId] = Automerge.initSyncState();
      });
      it('Should get the current state from other peer', () => {
        const [_, otherPeerNextState] = sync(
          state,
          otherPeerState,
          syncStates,
          otherPeerSyncStates,
          peerId,
          otherPeerpeerId,
        );

        assert.deepStrictEqual(otherPeerNextState, state);
        assert.deepStrictEqual(Automerge.get(state, signalName), 50);
        assert.deepStrictEqual(Automerge.get(otherPeerNextState, signalName), 50);
      });
    });
  });

  describe('Sync three peers', function () {
    let state;
    let secondPeerState;
    let thirdPeerState;

    const peerId = '1';
    const secondPeerpeerId = '2';
    const thirdPeerpeerId = '3';

    let syncStates;
    let secondPeerSyncStates;
    let thirdPeerSyncStates;

    const ITERATIONS = 50;

    beforeEach(() => {
      state = Automerge.initSignalCounter('init counter', signalName, 0);
      secondPeerState = Automerge.init();

      syncStates = {};
      syncStates[secondPeerpeerId] = Automerge.initSyncState();

      secondPeerSyncStates = {};
      secondPeerSyncStates[peerId] = Automerge.initSyncState();
    });

    describe('When second and third peer joins', function () {
      beforeEach(() => {
        thirdPeerState = Automerge.init();
        syncStates[thirdPeerpeerId] = Automerge.initSyncState();
        secondPeerSyncStates[thirdPeerpeerId] = Automerge.initSyncState();
        thirdPeerSyncStates = {};
        thirdPeerSyncStates[peerId] = Automerge.initSyncState();
        thirdPeerSyncStates[secondPeerpeerId] = Automerge.initSyncState();

        for (let i = 0; i < ITERATIONS; i++) {
          state = Automerge.incrementSignalCounter(
            state,
            `incrementing for the ${i} time`,
            signalName,
            1,
          );
        }
      });

      it('Should get the current state from other peer', () => {
        const [nextState, secondPeerNextState, thirdPeerNextState] = syncMultiple({
          [peerId]: {state, syncStates},
          [secondPeerpeerId]: {state: secondPeerState, syncStates: secondPeerSyncStates},
          [thirdPeerpeerId]: {state: thirdPeerState, syncStates: thirdPeerSyncStates},
        });

        assert.deepStrictEqual(secondPeerNextState, nextState);
        assert.deepStrictEqual(thirdPeerNextState, nextState);
        assert.deepStrictEqual(Automerge.get(nextState, signalName), ITERATIONS);
        assert.deepStrictEqual(Automerge.get(secondPeerNextState, signalName), ITERATIONS);
        assert.deepStrictEqual(Automerge.get(thirdPeerNextState, signalName), ITERATIONS);
      });
    });

    describe('When third peer joins', function () {
      beforeEach(() => {
        for (let i = 0; i < ITERATIONS; i++) {
          state = Automerge.incrementSignalCounter(
            state,
            `incrementing for the ${i} time`,
            signalName,
            1,
          );
        }

        [state, secondPeerState] = sync(
          state,
          secondPeerState,
          syncStates,
          secondPeerSyncStates,
          peerId,
          secondPeerpeerId,
        );

        thirdPeerState = Automerge.init();
        syncStates[thirdPeerpeerId] = Automerge.initSyncState();
        secondPeerSyncStates[thirdPeerpeerId] = Automerge.initSyncState();
        thirdPeerSyncStates = {};
        thirdPeerSyncStates[peerId] = Automerge.initSyncState();
        thirdPeerSyncStates[secondPeerpeerId] = Automerge.initSyncState();
      });

      it('Should get the current state from other peer', () => {
        const [nextState, secondPeerNextState, thirdPeerNextState] = syncMultiple({
          [peerId]: {state, syncStates},
          [secondPeerpeerId]: {state: secondPeerState, syncStates: secondPeerSyncStates},
          [thirdPeerpeerId]: {state: thirdPeerState, syncStates: thirdPeerSyncStates},
        });

        assert.deepStrictEqual(secondPeerNextState, nextState);
        assert.deepStrictEqual(thirdPeerNextState, nextState);
        assert.deepStrictEqual(Automerge.get(nextState, signalName), ITERATIONS);
        assert.deepStrictEqual(Automerge.get(secondPeerNextState, signalName), ITERATIONS);
        assert.deepStrictEqual(Automerge.get(thirdPeerNextState, signalName), ITERATIONS);
      });
    });
  });
});
