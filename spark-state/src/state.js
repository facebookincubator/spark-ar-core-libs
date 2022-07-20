/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const GlobalCounter = require('./global_yjs_counter');
const GlobalString = require('./global_yjs_string');
const GlobalPeersMap = require('./global_yjs_peers_map');
const GlobalMap = require('./global_yjs_map');
const GlobalScalar = require('./global_yjs_scalar');
const GlobalArray = require('./global_yjs_array');
const SortedParticipantArray = require('./global_yjs_sorted_participant_array');
const GlobalBoolean = require('./global_yjs_boolean');

module.exports.createGlobalCounterSignal = GlobalCounter.createGlobalCounterSignal;
module.exports.createGlobalStringSignal = GlobalString.createGlobalStringSignal;
module.exports.createGlobalPeersMap = GlobalPeersMap.createGlobalPeersMap;
module.exports.createGlobalMap = GlobalMap.createGlobalMap;
module.exports.createGlobalScalarSignal = GlobalScalar.createGlobalScalarSignal;
module.exports.createGlobalArray = GlobalArray.createGlobalArray;
module.exports.createSortedParticipantArray = SortedParticipantArray.createSortedParticipantArray;
module.exports.createGlobalBooleanSignal = GlobalBoolean.createGlobalBooleanSignal;
