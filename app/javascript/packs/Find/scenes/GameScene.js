import Phaser from 'phaser';
import { CONFIG } from '../config/index.js';
import PlayerInput from './PlayerInput.js';
import PlayerSprite from './PlayerSprite.js';

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