import consumer from "./consumer"

export default class DublinerChannel {
  constructor() {
    this._listeners = [];
    this._channel = consumer.subscriptions.create('DublinerChannel', {
      connected() {
        console.log('Connected!');
      },

      disconnected() {
        console.log('Disconnected!');
      },

      received: (data) => {
        this._listeners.forEach(listenerFunc => listenerFunc(data));
      }
    });
  }

  addListener(listener) {
    this._listeners.push(listener);
  }

  submit(action, params = {}) {
    this._channel.perform(action, params);
  }
}
