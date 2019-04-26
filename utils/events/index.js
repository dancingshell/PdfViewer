// import { events } from '../constants';
/**
 * Manages all event logic (subscribing, unsubscribing, and triggering)
 * @class
 */
class EventBase {
  constructor() {
    this.subscriptions = {};
  }

  /**
   * Called when an event is triggered
   * @callback EventBase~subscriptionCallback
   * @param {*} payload provided when event is triggered
   */

  /**
   * Subscribe to a key. When the key is triggered, a payload is passed to the provided callback
   * @param {string} key Unique key to 'listen' to
   * @param {EventBase~subscriptionCallback} cb callback to be called when event is triggered
   * @returns {undefined}
   */
  subscribe(key, cb) {
    if (!this.subscriptions[key]) {
      this.subscriptions[key] = [];
    }
    this.subscriptions[key].push(cb);
  }

  /**
   * Remove the provided callback from the subscriptions
   * @param {string} key Unique key to stop 'listening' to
   * @param {EventBase~subscriptionCallback} cb callback that should no longer be called when the
   * event is triggered
   * @returns {undefined}
   */
  unsubscribe(key, cb) {
    const subscriptions = this.subscriptions[key] || [];
    const idx = subscriptions.indexOf(cb);
    if (idx >= 0) {
      subscriptions.splice(idx, 1);
    }
  }

  /**
   * Remove all callbacks for the specified event key
   * @param {string} key Unique key for event
   * @returns {undefined}
   */
  clearSubscriptions(key) {
    this.subscriptions[key] = [];
  }

  /**
   * Clears all subscriptions for all event keys
   * @returns {undefined}
   */
  clearAllSubscriptions() {
    this.subscriptions = {};
  }

  /**
   * Triggers all callbacks subscribed to the provided key
   * @param {string} key Unique key
   * @param {*} callbackArg callback argument to be passed to each subscribed callback
   * @returns {promise}
   */
  trigger = (key, callbackArg) => {
    if (!this.subscriptions[key]) {
      return;
    }
    this.subscriptions[key].forEach(cb => cb(callbackArg));
    if (key === events.MARKUP_VIEWER_EVENT) {
      this.trigger(callbackArg.type, callbackArg.payload);
    }
  };
}

export default EventBase;
