import Phaser from 'phaser';
import { CONFIG } from '../config/index.js';
import PlayerInput from './PlayerInput.js';
import PlayerSprite from './PlayerSprite.js';

class Map {
	constructor(scene) {
		this._map = scene.make.tilemap({ key: CONFIG.data.map.key });
		this._tileset = this._map.addTilesetImage(CONFIG.data.map.tilesheetKey, CONFIG.sprites.tilesheet.key);
		this._layers = {};
		Map.LAYERS.forEach(layer => this._layers[layer] = this._map.createLayer(layer, this._tileset, 0, 0));
	}

	canMoveTo(pos) {
		return this._layers['walls'].getTileAtWorldXY(pos.x, pos.y) === null;
	}
}

Map.LAYERS = ['ground', 'walls', 'decoration', 'foreground'];

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
		this.load.tilemapTiledJSON(CONFIG.data.map.key, CONFIG.data.map.json);
		this.load.aseprite('player', this._startupData.sprite.location, this._startupData.sprite.json);
	}

	create() {
		// this.cameras.main.setBackgroundColor('#FFFFFF');
		this.cameras.main.zoom = CONFIG.constants.zoomAmount;
		this._map = new Map(this);
		this.player = new PlayerSprite(this, { x: 36, y: 6 });
		this.cameras.main.startFollow(this.player);
		this._playerInput = new PlayerInput(this);
	}

	update() {
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