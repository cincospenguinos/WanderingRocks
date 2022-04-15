import Phaser from 'phaser';
import { CONFIG } from '../../config/index.js';
import DialogueWindow from './DialogueWindow.js';
import DialogueSprite from '../game/DialogueSprite.js';

export default class DialogueScene extends Phaser.Scene {
	constructor() {
		super({ key: 'DialogueScene' });
	}

	init() {}

	preload() {
		const { dialogueTileset} = CONFIG.sprites;
		this.load.spritesheet(dialogueTileset.key, dialogueTileset.location, dialogueTileset.config);
	}

	create() {
		this.spacebarKey = this.input.keyboard.addKey('SPACE');

		this.dialogueWindow = new DialogueWindow(this);
		this.dialogueWindow.x = 80;
		this.dialogueWindow.y = CONFIG.dimensions.screen.height - 100;

		const gameScene = this.scene.get('GameScene');
		gameScene.events.on('dialogue_show', (spriteToShow) => {
			if (!this.dialogueWindow.visible) {
				this.dialogueWindow.dialogueWith(spriteToShow);
				this.dialogueWindow.visible = true
			}
		});
		gameScene.events.on('dialogue_hide', () => {
			this.dialogueWindow.visible = false;

			if (this.dialogueWindow.emitHighVolume) {
				gameScene.events.emit('high_volume')
			}
		});
	}

	update() {
		if (this.dialogueWindow.visible && (Phaser.Input.Keyboard.JustDown(this.spacebarKey) || this.dialogueWindow.mouseDown)) {
			this.scene.get('GameScene').events.emit('low_volume');
			this.dialogueWindow.interact();
		}
	}
}
