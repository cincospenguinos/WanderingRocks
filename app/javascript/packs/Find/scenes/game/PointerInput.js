import { CONFIG } from '../../config/index.js';

export default class PointerInput {
	constructor(scene) {
		this._activePointer = scene.input.activePointer;
	}

	get changeInDirections() {
		if (!this._activePointer.isDown) {
			return PointerInput.BASE_DIRECTIONS_RESPONSE;
		}

		const { screen, grid } = CONFIG.dimensions;

		const xPos = screen.width / 2 - this._activePointer.downX;
		const yPos = screen.height / 2 - this._activePointer.downY;

		if (!this._meetsThreshold(xPos, yPos)) {
			return PointerInput.BASE_DIRECTIONS_RESPONSE;
		}

		const directions = { ...PointerInput.BASE_DIRECTIONS_RESPONSE };
		directions.isChanging = true;
		Math.abs(xPos) > Math.abs(yPos) ? directions.x = grid.size : directions.y = grid.size;

		if (xPos > 0) {
			directions.x = -directions.x;
		}

		if (yPos > 0) {
			directions.y = -directions.y;
		}

		directions.animName = this._getAnimName(directions);
		if (directions.animName === 'left') {
			directions.animName = 'right';
			directions.flip = true;
		}

		return directions;
	}

	_meetsThreshold(xPos, yPos) {
		return Math.max(Math.abs(xPos), Math.abs(yPos)) > PointerInput.THRESHOLD;
	}

	_getAnimName(obj) {
		if (obj.y > 0) {
			return 'down';
		}

		if (obj.y < 0) {
			return 'up';
		}

		if (obj.x < 0) {
			return 'left';
		}

		return 'right';
	}
}

PointerInput.BASE_DIRECTIONS_RESPONSE = {
	x: 0,
	y: 0,
	isChanging: false,
	flip: false,
};

PointerInput.THRESHOLD = 50;