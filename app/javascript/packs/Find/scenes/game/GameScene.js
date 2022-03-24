import Phaser from 'phaser';
import { CONFIG } from '../../config/index.js';
import PlayerInput from './PlayerInput.js';
import PlayerSprite from './PlayerSprite.js';
import Map from './Map.js';

class DialogueSprite extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, info) {
		super(scene, info.x, info.y, info.key);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setScale(0.5);
	}

	applyDialogueOption(other) {

	}
}

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
		this.load.image(CONFIG.sprites.tilesheet.key, CONFIG.sprites.tilesheet.location);
		this.load.image(CONFIG.sprites.andre.key, CONFIG.sprites.andre.location);
		this.load.tilemapTiledJSON(CONFIG.data.map.key, CONFIG.data.map.json);
		this.load.aseprite('player', this._startupData.sprite.location, this._startupData.sprite.json);
	}

	create() {
		this.scene.launch('DialogueScene');

		this.cameras.main.zoom = CONFIG.constants.zoomAmount;
		this._map = new Map(this);

		this._dialogueSprites = [new DialogueSprite(this, {
			key: CONFIG.sprites.andre.key,
			x: 120,
			y: 120,
		})];

		this.player = new PlayerSprite(this, { x: 4, y: 4 });
		this.cameras.main.startFollow(this.player);
		this._playerInput = new PlayerInput(this);
	}

	update() {
		this._handleInput();
		const overlapping = this._dialogueSprites
			.map((dialogueSprite) => Phaser.Geom.Intersects.RectangleToRectangle(this.player.body, dialogueSprite.body) ? dialogueSprite : undefined)
			.filter(d => d)
		;

		if (overlapping.length) {
			this.events.emit('dialogue_show', overlapping[0]);
		}
	}

	_handleInput() {
		const currentDirections = this._playerInput.changeInDirections;

		if (!this.player.isMoving && currentDirections.isChanging) {
			const gridSize = CONFIG.dimensions.grid.size;
			const nextPos = { x: this.player.x + currentDirections.x, y: this.player.y + currentDirections.y };

			if (this._map.canMoveTo(nextPos)) {
				this.player.moveTo(nextPos);
			}
		}
	}
}