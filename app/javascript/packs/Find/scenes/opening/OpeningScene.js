import Phaser from 'phaser';
import { CONFIG } from '../../config/index.js';

class Tesseract {
	constructor(scene, x, y) {
		this.map = scene.make.tilemap({ data: this.data, tileWidth: Tesseract.TILE_SIZE, tileHeight: Tesseract.TILE_SIZE });
		const tiles = this.map.addTilesetImage(CONFIG.sprites.tilesheet.key);
		this.layer = this.map.createLayer(0, tiles, Tesseract.TILE_SIZE, Tesseract.TILE_SIZE);
		this.layer.setScale(8);

		this._timer = scene.time.addEvent({
			delay: 750,
			callback: () => {
				const x = Math.floor(Math.random() * 3);
				const y = Math.floor(Math.random() * 3);
				const tile = this.map.getTileAt(x, y);
				this.map.replaceByIndex(tile.index, this._randomTileIndex);
			},
			repeat: -1,
		});
	}

	set x(val) {
		this.layer.x = val;
	}

	set y(val) {
		this.layer.y = val;
	}

	get width() {
		return this.layer.width;
	}

	get height() {
		return this.layer.height;
	}

	get data() {
		if (!this._data) {
			this._data = [];

			for(let row = 0; row < 3; row++) {
				const row = [];

				for (let col = 0; col < 3; col++) {
					row.push(this._randomTileIndex);
				}

				this._data.push(row);
			}
		}

		return this._data;
	}

	get _randomTileIndex() {
		return Math.floor(Math.random() * 33 * 60);
	}
}

Tesseract.TILE_SIZE = 8;

export default class OpeningScene extends Phaser.Scene {
	constructor() {
		super({ key: 'OpeningScene' });
	}

	init() {
		const idx = Math.floor(Math.random() * OpeningScene.RELIGIOUS_ICONS.length);
		this._religiousIcon = OpeningScene.RELIGIOUS_ICONS[idx];
	}

	preload() {
		this.load.image(CONFIG.sprites.tilesheet.key, CONFIG.sprites.tilesheet.location);
		this.load.image(this._religiousIcon.key, this._religiousIcon.location);
	}

	create() {
		this.spacebarKey = this.input.keyboard.addKey('SPACE');
		// TODO: This is where we will setup all the network shennanigannery, if we have time
		const textConfig = {
			fontSize: 16,
			align: 'center',
		};
		const topText = this.add.text(20, 20, 'Hey, can you find this for me?', textConfig);
		topText.x = CONFIG.dimensions.screen.width / 2 - topText.width / 2

		const religiousIcon = this.add.image(100, CONFIG.dimensions.screen.height / 2, this._religiousIcon.key);
		religiousIcon.x = religiousIcon.width / 2
		religiousIcon.setScale(0.8);

		const tesseract = new Tesseract(this);
		tesseract.x = 320;
		tesseract.y = 100;

		const bottomText = this.add.text(CONFIG.dimensions.screen.width / 2, CONFIG.dimensions.screen.height - 28, 'Thanks, I appreciate it.', textConfig);
		bottomText.x = CONFIG.dimensions.screen.width / 2 - bottomText.width / 2;
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.spacebarKey)) {
			this.scene.start('GameScene', { religiousIcon: this._religiousIcon });
		}
	}
}

OpeningScene.RELIGIOUS_ICONS = [
	CONFIG.sprites.yhwh,
	CONFIG.sprites.jesus,
	CONFIG.sprites.allah,
	CONFIG.sprites.krishna,
];
