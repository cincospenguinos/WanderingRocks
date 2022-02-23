import Phaser from 'phaser';
import { CONFIG } from '../config/index.js';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' });
	}

	init(data) {
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
		this.player = this.add.sprite(300, 300, 'player');

		const playerAnims = this.anims.createFromAseprite('player');
	}

	update() {

	}
}