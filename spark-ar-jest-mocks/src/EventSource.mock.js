/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 */

export class EventSourceMock {
  constructor(config, source) {
    this._subcriptions = new Set();
    this._config = config;
    this._source = source;
  }

  subscribe(callback) {
    return this.subscribeWithSnapshot(undefined, callback);
  }

  subscribeOnNext(callback) {
    return this.subscribeWithSnapshot(undefined, callback);
  }

  subscribeWithSnapshot(snapshot, callback) {
    const subscriptionData = {
      snapshot,
      callback,
    };
    this._subcriptions.add(subscriptionData);

    // trigger callback for initial value
    if (this._source && this._config && this._config.fireOnInitialValue) {
      this.mockCallback(this._source.getInitialValueEvent());
    }

    return {
      unsubscribe: () => {
        this._subcriptions.delete(subscriptionData);
      },
    };
  }

  async mockCallback(event) {
    for await (const subcription of this._subcriptions) {
      if (subcription.snapshot) {
        let snapshot = {};
        for (const key in subcription.snapshot) {
          snapshot[key] = subcription.snapshot[key].pinLastValue();
        }
        await subcription.callback(event, snapshot);
      } else {
        await subcription.callback(event);
      }
    }
  }
}
