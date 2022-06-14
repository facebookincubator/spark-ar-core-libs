/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const GlobalCounter = require('./global_yjs_counter');
const GlobalString = require('./global_yjs_string');
const GlobalMap = require('./global_yjs_peers_map');
const GlobalScalar = require('./global_yjs_scalar');
// const GlobalAppendOnlyArray = require('./global_append_only_array')
const SortedParticipantArray = require('./global_yjs_sorted_participant_array');
const GlobalBoolean = require('./global_yjs_boolean');

module.exports.createGlobalCounterSignal = GlobalCounter.createGlobalCounterSignal;
module.exports.createGlobalStringSignal = GlobalString.createGlobalStringSignal;
module.exports.createGlobalPeersMap = GlobalMap.createGlobalPeersMap;
module.exports.createGlobalScalarSignal = GlobalScalar.createGlobalScalarSignal;
// module.exports.createGlobalAppendOnlyArray = GlobalAppendOnlyArray.createGlobalAppendOnlyArray
module.exports.createSortedParticipantArray = SortedParticipantArray.createSortedParticipantArray;
module.exports.createGlobalBooleanSignal = GlobalBoolean.createGlobalBooleanSignal;
