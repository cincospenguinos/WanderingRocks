import Phaser from 'phaser';
import { CONFIG } from './config/index.js';
import GameScene from './scenes/game/GameScene.js';
import DialogueScene from './scenes/dialogue/DialogueScene.js';
import OpeningScene from './scenes/opening/OpeningScene.js';

new Phaser.Game({
	parent: 'game-container',
	type: Phaser.AUTO, // TODO: May need WebGL if we're doing fancy graphics stuff
	width: CONFIG.dimensions.screen.width,
	height: CONFIG.dimensions.screen.height,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: 0,
		},
	},
	scale: {
		mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	scene: [/*OpeningScene,*/ GameScene, DialogueScene],
});
