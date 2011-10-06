Overview
========

This is a micro publish/subscribe event messaging framework based on [MinPubSub](https://github.com/daniellmb/MinPubSub) by [Daniel Lamb](https://github.com/daniellmb).

This fork introduces an `Event` class. Events have a type (e.g., 'MyEvent'), an action (e.g., 'click'), and data (e.g., {x:1, y:2}). You can `create`, `publish`, `subscribe`, and `unsubscribe` to events. Everything is encapsulated into a single global varibale named `mps`. That's all there is to it.

### Usage

```javascript
// We Create events using the Event constructor
var event = new mps.Event('MyEvent', 'click', {x:1, y:2});

// We can also use the create function
event = mps.create('MyEvent', 'click', {x:1, y:2});

// Here's how we subscribe to events
mps.subscribe('MyEvent', function(event) {console.log(event.getData())});

// And here's how we publish events
mps.publish(event);
```