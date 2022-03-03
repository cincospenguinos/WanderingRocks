import { CONFIG } from '../../config/index.js';

export default class PlayerInput {
	constructor(scene) {
		this._cursorKeys = scene.input.keyboard.createCursorKeys();
	}

	get changeInDirections() {
		const directionChange = { x: 0, y: 0 };

		PlayerInput.DIRECTIONS
			.map(k => this._cursorKeys[k].isDown ? k : undefined)
			.filter(b => b)
			.forEach((k) => {
				const directionEntry = PlayerInput.DIRECTION_MOVEMENT_MAP[k];
				directionChange[directionEntry.direction] += directionEntry.amount;
			});

		const isChanging = directionChange.x !== 0 || directionChange.y !== 0;

		return { ...directionChange, isChanging };
	}
}

PlayerInput.DIRECTIONS = ['up', 'down', 'left', 'right'];

PlayerInput.DIRECTION_MOVEMENT_MAP = {
	'up': {
		direction: 'y',
		amount: -CONFIG.dimensions.grid.size,
	},
	'down': {
		direction: 'y',
		amount: CONFIG.dimensions.grid.size,
	},
	'left': {
		direction: 'x',
		amount: -CONFIG.dimensions.grid.size,
	},
	'right': {
		direction: 'x',
		amount: CONFIG.dimensions.grid.size,
	},
};
