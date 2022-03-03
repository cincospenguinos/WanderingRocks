import Phaser from 'phaser';
import { CONFIG } from '../../config/index.js';

export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, info) {
		super(scene, info.x, info.y, 'player');
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		this.setScale(0.5);
		scene.anims.createFromAseprite('player');
	}

	moveTo(pos) {
		if (this.isMoving) {
			return;
		}

		const { size } = CONFIG.dimensions.grid;
		const movementTweenConfig = this._movementTweenConfig;
		movementTweenConfig.props.x = { from: this.x, to: pos.x };
		movementTweenConfig.props.y = { from: this.y, to: pos.y };

		this._movementTween = this.scene.tweens.add(movementTweenConfig);
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
