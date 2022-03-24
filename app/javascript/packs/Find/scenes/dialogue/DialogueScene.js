import Phaser from 'phaser';
import { CONFIG } from '../../config/index.js';
import DialogueWindow from './DialogueWindow.js';

export default class DialogueScene extends Phaser.Scene {
	constructor() {
		super({ key: 'DialogueScene' });
	}

	init() {
		console.log('Booting up dialogue scene!');
	}

	preload() {
		const { dialogueTileset } = CONFIG.sprites;
		this.load.spritesheet(dialogueTileset.key, dialogueTileset.location, dialogueTileset.config)
	}

	create() {
		this.dialogueWindow = new DialogueWindow(this);
		this.dialogueWindow.x = CONFIG.dimensions.screen.width / 2 - this.dialogueWindow.width / 2;
		this.dialogueWindow.y = CONFIG.dimensions.screen.height - 50;

		const gameScene = this.scene.get('GameScene');
		gameScene.events.on('dialogue_show', (spriteToShow) => {
			this.dialogueWindow.dialogueWith(spriteToShow);
			this.dialogueWindow.visible = true
		});
		gameScene.events.on('dialogue_hide', () => this.dialogueWindow.visible = false);
	}

	update() {}
}