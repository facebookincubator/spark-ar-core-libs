![Meta Spark Studio](../documentation_src/SparkARDark.png#gh-dark-mode-only)

![Meta Spark Studio](../documentation_src/SparkARLight.png#gh-light-mode-only)

# Participant Manager

## Getting started
### Meta Spark project setup

You need AR Studio version to be >133 to use this library.

1. <a href="https://sparkar.facebook.com/ar-studio/learn/documentation/downloads/" target="_blank">Download</a> Meta Spark Studio.
2. Open your project in Meta Spark Studio.
3. Open the AR Library from within the Assets panel and select the **Script Packages** tab.
4. Search the "spark-ar-participant-manager" and import to the project.
5. If you hasn't used `multipeer` and `participants` capability, please manually enable them.

### Loading the module

To use it, import it via
```js
import {createParticipantManager} from 'spark-ar-participant-manager';
```

And call in your main script body to initialise it
```js
const participantManager = await createParticipantManager();
```

## Documentation

### `activeParticipants: array<Participant>`
`activeParticipants` contains all participants that are online and in same effect(include self), and stable sorted with their id.

```js
Diagnostics.log(participantManager.activeParticipants.length)
Diagnostics.log(participantManager.activeParticipants[0].id)
```

Anytime a new active participant joined, no matter it's new participant joining the call or a participant joining the same effect, an event "join" will be emmited.

Anytime a active participant left, no matter it's leaving the call or opting out the same effect, an event "leave" will be emmited.

See [Add event listener](#add-event-listener)

### `currentHost: Participant`
This returns an active participant as host, you can use it to check and only run certain logic only on host user. The host may change when `activeParticipants` changed, you can listen to "hostChange" event to know that.

(See [Add event listener](#add-event-listener))

```js
Diagnostics.log(participantManager.currentHost.id)
```

### `selfIndex: number`
`selfIndex` provides the index of `self` in the `activeParticipants`

```js
Diagnostics.log(participantManager.activeParticipants[participantManager.selfIndex].id === participantManager.self.id)
```

### `peerIndices: array<number>`
`peerIndices` provides the index of each peer in the `activeParticipants`, if the peer is not active, the correspond array element value will be -1.

Here peer is the same order as `Participants.getAllOtherParticipants`

### Add Event Listener
`addListener(eventType: string, callback: Participant => void)`

`removeListener(eventType: string, callback: Participant => void)`

You can add/remove event listener, the events are:

- "join": when a new active participant joined
- "leave": when an active participant left
- "hostChange": when currentHost changed

```js
function joinCallback(participant) {
  Diagnostics.log(participant.id)
}
participantManager.addListener('join', joinCallback)

// remove
participantManager.removeListener('join', joinCallback)

```

### Participant Message Channel
`getMessageChannel(topic: string): ParticipantMessageChannel`

`ParticipantMessageChannel` provides a wrapper on multipeer message channel, that you can send message to specific participant.

You can call `sendMessage(participantId: string, message: object, realTimeChannel: boolean): Promise<void>` to send message to certain participant, only that participant will receive message. If provided `null` for the `participantId`, then it's a broadcast message like normal message channel.

You can call `subscribeToMessage(callback: (from: string, message: object) => void)` to subscribe to message.
Example:

```js
const secretChannel = participantManager.getMessageChannel('secret');
secretChannel.sendMessage(target.id, {text: 'Hello!'});

secretChannel.subscribeToMessage((from, message) => {
  Diagnostics.log("Receive from " + from + '\n says ' + message.text);
});

```

### License

The **Participant Manager** library is [MIT licensed](./LICENSE).
