import { CONFIG } from '../../config/index.js';

export default class DialogueWindow {
	constructor(scene) {
		this.scene = scene;

		const idx = DialogueWindow.INDEXES;
		const data = [
			[idx.topleft, idx.top, idx.top, idx.top, idx.top, idx.top, idx.top, idx.top, idx.top, idx.top, idx.top, idx.top, idx.topright],
			[idx.left, idx.center, idx.center, idx.center, idx.center, idx.center, idx.center, idx.center, idx.center, idx.center, idx.center, idx.center, idx.right],
			[idx.bottomleft, idx.bottom, idx.bottom, idx.bottom, idx.bottom, idx.bottom, idx.bottom, idx.bottom, idx.bottom, idx.bottom, idx.bottom, idx.bottom, idx.bottomright],
		];

		const map = this.scene.make.tilemap({ data, tileWidth: DialogueWindow.TILE_SIZE, tileHeight: DialogueWindow.TILE_SIZE });
		const tiles = map.addTilesetImage(CONFIG.sprites.dialogueTileset.key);
		this.layer = map.createLayer(0, tiles, DialogueWindow.TILE_SIZE, DialogueWindow.TILE_SIZE);
		this.text = this.scene.add.text(0, 0, '', {
			fontSize: 10,
		});
	}

	dialogueWith(sprite) {
		this.sprite = sprite;
		this.text.setText(`speak to ${sprite.name}`);
	}

	set x(val) {
		this.layer.x = val;
		this.text.x = val + 4;
	}

	set y(val) {
		this.layer.y = val;
		this.text.y = val + 4;
	}

	get width() {
		return this.layer.width;
	}

	set visible(val) {
		let alpha = 0.0;

		if (val) {
			alpha = 1.0;
		}

		this.layer.setAlpha(alpha);
		this.text.setAlpha(alpha);
	}
}

DialogueWindow.TILE_SIZE = 16;

DialogueWindow.INDEXES = {
	center: 0,
	topleft: 1,
	topright: 2,
	bottomright: 3,
	bottomleft: 4,
	bottom: 5,
	left: 6,
	top: 7,
	right: 8,
};
