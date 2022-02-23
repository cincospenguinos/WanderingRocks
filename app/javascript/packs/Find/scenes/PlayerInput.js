export default class PlayerInput {
	constructor(scene) {
		this._cursorKeys = scene.input.keyboard.createCursorKeys();
	}

	get currentDirections() {
		return PlayerInput.DIRECTIONS
			.map(k => this._cursorKeys[k].isDown ? k : undefined)
			.filter(b => b);
	}
}

PlayerInput.DIRECTIONS = ['up', 'down', 'left', 'right'];
