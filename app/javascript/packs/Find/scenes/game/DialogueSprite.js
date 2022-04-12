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

		if (info.sound) {
			const gameScene = scene.scene.get('GameScene');
			gameScene.events.emit('low_volume');
			this.sound = scene.sound.add(info.sound, { volume: 0.8 });
			this.sound.on('complete', () => gameScene.events.emit('high_volume'));
		}
	}

	startText() {
		this._currentIndex = 0;
		this.sound.play();
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

	get emitHighVolume() {
		if (this.sound) {
			return false;
		}

		return true;
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
		x: 300,
		y: 20,
		name: 'Andre',
	},
	joyce: {
		key: 'joyce',
		x: 120,
		y: 10,
		name: 'James Joyce',
	},
	falkner: {
		key: 'falkner',
		x: 200,
		y: 80,
		name: 'William Faulkner',
	},
	stein: {
		key: 'stein',
		x: 340,
		y: 50,
		name: 'Gertrude Stein',
		sound: 'ifIToldHim',
	},
};
