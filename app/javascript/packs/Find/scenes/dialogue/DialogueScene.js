import Phaser from 'phaser';

export default class DialogueScene extends Phaser.Scene {
	constructor() {
		super({ key: 'DialogueScene' });
	}

	init() {
		console.log('Booting up dialogue scene!');
	}

	create() {
		const gameScene = this.scene.get('GameScene');
		gameScene.events.on('dialogue_show', (spriteToShow) => console.log('>>>', spriteToShow));
		gameScene.events.on('dialogue_hide', () => console.log('>>> hide'));
	}

	update() {

	}
}