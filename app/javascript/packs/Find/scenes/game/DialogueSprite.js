import Phaser from 'phaser';
import { CONFIG } from '../../config/index.js';

export default class DialogueSprite extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, info) {
		super(scene, info.x, info.y, info.key);
		scene.add.existing(this);
		scene.physics.add.existing(this);

		if (!info.name || !info.dialogueText) {
			throw 'No information for dialogue sprite! Requires `name` and `dialogueText`';
		}

		this.name = info.name;
		this.dialogueText = info.dialogueText;
	}

	startText() {
		this._currentIndex = 0;
		return this.currentText;
	}

	nextText() {
		this._currentIndex += 1;
		if (this._currentIndex === this.dialogueText.length) {
			return undefined;
		}

		return this.currentText;
	}

	get currentText() {
		return this.dialogueText[this._currentIndex];
	}
}

DialogueSprite.instantiateAllWith = (scene) => {
	return Object.keys(DialogueSprite.ALL_SPRITES).map((key) => {
		const info = DialogueSprite.ALL_SPRITES[key];
		info.dialogueText = CONFIG.data.dialogue[info.key];
		return new DialogueSprite(scene, info);
	});
}

DialogueSprite.ALL_SPRITES = {
	andre: {
		key: 'andre',
		x: 80,
		y: 80,
		name: 'Andre',
	},
	joyce: {
		key: 'joyce',
		x: 90,
		y: 22,
		name: 'James Joyce',
	},
	falkner: {
		key: 'falkner',
		x: 10,
		y: 10,
		name: 'William Faulkner',
	},
};
