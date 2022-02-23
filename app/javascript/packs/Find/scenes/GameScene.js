import Phaser from 'phaser';
import { CONFIG } from '../config/index.js';

class PlayerInput {
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

class PlayerSprite extends Phaser.GameObjects.Sprite {
	constructor(scene, info) {
		super(scene, info.x, info.y, 'player');
		scene.add.existing(this);
		scene.anims.createFromAseprite('player');
	}

	move(currentDirections) {
		if (this.isMoving || currentDirections.length === 0) {
			return;
		}

		const gridSize = CONFIG.dimensions.grid.size;
		const that = this;
		const movementTweenConfig = {
			targets: that,
			duration: gridSize * 1000 / PlayerSprite.SPEED_PIX_PER_SECOND,
			onComplete: () => that._movementTween = undefined,
			props: {},
		};

		if (currentDirections.find(d => d === 'up')) {
			movementTweenConfig.props.y = { from: that.y, to: that.y - gridSize };
		} else if (currentDirections.find(d => d === 'down')) {
			movementTweenConfig.props.y = { from: that.y, to: that.y + gridSize };
		} else if (currentDirections.find(d => d === 'left')) {
			movementTweenConfig.props.x = { from: that.x, to: that.x - gridSize };
		} else if (currentDirections.find(d => d === 'right')) {
			movementTweenConfig.props.x = { from: that.x, to: that.x + gridSize };
		}

		if (Object.keys(movementTweenConfig.props).length > 0) {
			this._movementTween = this.scene.tweens.add(movementTweenConfig);
		}
	}

	get isMoving() {
		return this._movementTween && this._movementTween.isPlaying;
	}
}

PlayerSprite.SPEED_PIX_PER_SECOND = 50;

export default class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' });
	}

	init(data) {
		// TODO: Startup data will have all of the information necessary for the game. Use it to set the player's initial information
		this._startupData = {
			sprite: CONFIG.sprites.player1,
			...data
		};
	}

	preload() {
		this.load.aseprite('player', this._startupData.sprite.location, this._startupData.sprite.json);
	}

	create() {
		this.cameras.main.setBackgroundColor('#FFFFFF');
		this.player = new PlayerSprite(this, { x: 150, y: 150 });
		// const playerAnims = this.anims.createFromAseprite('player');
		this._playerInput = new PlayerInput(this);
	}

	update() {
		const currentDirections = this._playerInput.currentDirections;
		this.player.move(currentDirections);
	}
}