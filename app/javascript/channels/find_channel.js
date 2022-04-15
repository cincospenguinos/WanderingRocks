import consumer from "./consumer"

export default class FindChannel {
  constructor() {
    this._listeners = [];
    this._channel = consumer.subscriptions.create('FindChannel', {
      connected() {
        console.log('Connected!');
      },

      disconnected() {
        console.log('Disconnected!');
      },

      received: (data) => {
        console.log(data);
      }
    })
  }

  addListener(listener) {
    this._listeners.push(listener);
  }

  submit(action, params = {}) {
    this._channel.perform(action, params);
  }
}
