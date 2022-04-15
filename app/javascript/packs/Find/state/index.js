import FindChannel from '../../../channels/find_channel.js';

class GlobalState {
	constructor() {
		this.channel = new FindChannel();
	}
}

const STATE = new GlobalState();

export { STATE };
