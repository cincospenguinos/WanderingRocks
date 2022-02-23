import Phaser from 'phaser';
import { CONFIG } from '../config/index.js';

export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, info) {
		super(scene, info.x, info.y, 'player');
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		scene.anims.createFromAseprite('player');
	}

	move(currentDirections) {
		if (this.isMoving || currentDirections.length === 0) {
			return;
		}

		const gridSize = CONFIG.dimensions.grid.size;
		const movementTweenConfig = this._movementTweenConfig;

		if (currentDirections.find(d => d === 'up')) {
			movementTweenConfig.props.y = { from: this.y, to: this.y - gridSize };
		} else if (currentDirections.find(d => d === 'down')) {
			movementTweenConfig.props.y = { from: this.y, to: this.y + gridSize };
		} else if (currentDirections.find(d => d === 'left')) {
			movementTweenConfig.props.x = { from: this.x, to: this.x - gridSize };
		} else if (currentDirections.find(d => d === 'right')) {
			movementTweenConfig.props.x = { from: this.x, to: this.x + gridSize };
		}

		if (Object.keys(movementTweenConfig.props).length > 0) {
			this._movementTween = this.scene.tweens.add(movementTweenConfig);
		}
	}

	get isMoving() {
		return this._movementTween && this._movementTween.isPlaying;
	}

	get _movementTweenConfig() {
		const duration = CONFIG.dimensions.grid.size * 1000 / PlayerSprite.SPEED_PIX_PER_SECOND;

		return {
			targets: this,
			duration,
			onComplete: () => this._movementTween = undefined,
			props: {},
		};
	}
}

PlayerSprite.SPEED_PIX_PER_SECOND = 50;
