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
		this._textField = this.scene.add.text(0, 0, '', {
			align: 'left',
			fontSize: 10,
			wordWrap: {
		        width: this.layer.width - 4,
		        callback: null,
		        callbackScope: null,
		        useAdvancedWrap: true,
		    },
		});
		this.layer.setScale(2);
		this._textField.setScale(2);

		this._currentState = 'no_dialogue';

		this._mouseDown = false;
		this.layer.setInteractive();
		this.layer.on('pointerdown', () => this._mouseDown = true);
		this.layer.on('pointerup', () => this._mouseDown = false)
	}

	dialogueWith(sprite) {
		this.sprite = sprite;
		this._textField.setText(`speak to ${sprite.name}`);
	}

	interact() {
		if (this._state === 'no_dialogue') {
			this._state = 'in_dialogue';
			this._textField.setText(this.sprite.startText());
			return;
		}

		const text = this.sprite.nextText();

		if (text) {
			this._textField.setText(text);
		} else {
			this._state = 'no_dialogue';
			this.visible = false;
		}
	}

	get mouseDown() {
		return this._mouseDown;
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
		this._textField.x = val + 4;
	}

	set y(val) {
		this.layer.y = val;
		this._textField.y = val + 4;
	}

	set text(text) {

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
		this._textField.setAlpha(alpha);
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
