/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Participants from 'Participants';
import Diagnostics from 'Diagnostics';
import ParticipantMessageChannel from './participantMessageChannel.js';

export default class ParticipantManager {
  constructor(config) {
    this._participantInfos = {};
    this._subscriptions = [];
    this._self = null;
    // use this flag to output debug informations
    this.__DEBUG__ = !!(config && config.debug);
  }

  async init() {
    this._self = await Participants.self;
    var participants = await Participants.getAllOtherParticipants();
    participants.push(this._self);

    // Monitor each participant's isActiveInSameEffect status in order to know if they
    // join or leave the group effect
    participants.forEach(participant => {
      participant.isActiveInSameEffect.monitor().subscribe(async event => {
        await this._onParticipantJoinOrLeave(participant, event.newValue);
      });
    });
    // Monitor when a new participant joins the call
    Participants.onOtherParticipantAdded().subscribe(participant => {
      // Monitor their isActiveInSameEffect status in order to know if they join or leave
      // the group effect
      participant.isActiveInSameEffect
        .monitor({fireOnInitialValue: true})
        .subscribe(async event => {
          await this._onParticipantJoinOrLeave(participant, event.newValue);
        });
    });

    // update
    await this._updateActiveParticipants();

    // log debug info
    if (this.__DEBUG__) {
      Diagnostics.log('ParticipantManager Init Done.');
    }
  }

  // Returns an ordered list, sorted by user id, of all participants active in the current
  // effect, including self
  get activeParticipants() {
    return this._participantInfos.activeParticipants;
  }

  // return self
  get self() {
    return this._participantInfos.self;
  }

  // ParticipantManager will always select a host, this function can get the current host,
  // if current host changed, it will emit 'hostChange' event.
  get currentHost() {
    return this._participantInfos.currentHost;
  }

  // Return the index of self in `activeParticipants`
  get selfIndex() {
    return this._participantInfos.selfIndex;
  }

  // Return an array with same size of `getAllOtherParticipants` result, each element is the
  // the index of that participant in `activeParticipants`, if that participant is not active,
  // the index will be -1.
  get peerIndices() {
    return this._participantInfos.peerIndices;
  }

  addListener(eventType, callback) {
    const subscription = {type: eventType, callback};
    this._subscriptions.push(subscription);
  }

  removeListener(eventType, callback) {
    this._subscriptions = this._subscriptions.filter(subscription => {
      return subscription.callback !== callback || subscription.type !== eventType;
    });
  }

  getMessageChannel(topic) {
    return new ParticipantMessageChannel(topic, this._self.id);
  }

  _dispatchEvent(event) {
    this._subscriptions.forEach(subscription => {
      if (subscription.type === event.type) {
        subscription.callback(event);
      }
    });
  }

  async _onParticipantJoinOrLeave(participant, isActive) {
    // update the active participant list
    await this._updateActiveParticipants();
    // dispatch event
    this._dispatchEvent({
      type: isActive ? 'join' : 'leave',
      participant: participant,
    });
  }

  async _updateActiveParticipants() {
    // Update the ActiveParticipants data to latest value
    var activeParticipants = await Participants.getOtherParticipantsInSameEffect();
    activeParticipants.push(this._self);
    // We sort the list by id string order, to be noticed that the index of each participant
    // can change when a new paritcipant joined. If you want a more stable order like by joined
    // time, please try spark-state in AR Library.
    activeParticipants.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
    });

    const previousHost = this._participantInfos.currentHost;
    const currentHost = activeParticipants[0];

    var allParticipants = await Participants.getAllOtherParticipants();
    var selfIndex = -1;
    var peerIndices = Array(allParticipants.length).fill(-1);
    for (let i = 0; i < activeParticipants.length; i++) {
      const id = activeParticipants[i].id;
      if (this._self.id === id) {
        selfIndex = i;
        continue;
      }
      for (let j = 0; j < allParticipants.length; j++) {
        if (allParticipants[j].id === id) {
          peerIndices[j] = i;
          break;
        }
      }
    }

    this._participantInfos = {
      activeParticipants: activeParticipants,
      currentHost: currentHost,
      self: this._self,
      selfIndex: selfIndex,
      peerIndices: peerIndices,
    };

    if (previousHost != currentHost) {
      this._dispatchEvent({
        type: 'hostChange',
        previousHost: previousHost,
        currentHost: currentHost,
      });
    }

    if (this.__DEBUG__) {
      let activeListStr = 'New Active Participants: ';
      this._participantInfos.activeParticipants.forEach(element => {
        activeListStr += '\n' + element.id;
      });
      Diagnostics.log(activeListStr);
      Diagnostics.log('Current Host:' + currentHost.id);
      Diagnostics.log('selfIndex:' + this._participantInfos.selfIndex);
      Diagnostics.log('peerIndices:' + this._participantInfos.peerIndices);
    }
  }
}
