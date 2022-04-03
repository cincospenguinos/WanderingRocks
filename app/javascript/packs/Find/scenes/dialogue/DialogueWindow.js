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

		this._currentState = 'no_dialogue';
	}

	dialogueWith(sprite) {
		this.sprite = sprite;
		this.text.setText(`speak to ${sprite.name}`);
	}

	interact() {
		if (this._state === 'no_dialogue') {
			this._state = 'in_dialogue';
			this.text.setText(this.sprite.dialogueText);
		} else {
			this._state = 'no_dialogue';
			this.visible = false;
		}
	}

	get _state() {
		return this._currentState;
	}

	set _state(val) {
		this._currentState = val;
		this.scene.scene.get('GameScene').events.emit(this._currentState);
	}

	set x(val) {
		this.layer.x = val;
		this.text.x = this.layer.x + this.layer.width / 2;
	}

	set y(val) {
		this.layer.y = val;
		this.text.y = this.layer.y;
	}

	get width() {
		return this.layer.width;
	}

	get visible() {
		return this.layer.alpha === 1.0;
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

DialogueWindow.STATES = {
	noDialogue: 'no_dialogue',
	inDialogue: 'in_dialogue',
};
