import Phaser from 'phaser';
import { CONFIG } from './config/index.js';
import GameScene from './scenes/GameScene.js';

new Phaser.Game({
	parent: 'game-container',
	type: Phaser.AUTO, // TODO: May need WebGL if we're doing fancy graphics stuff
	width: CONFIG.dimensions.screen.width,
	height: CONFIG.dimensions.screen.height,
	pixelArt: true,
	physics: {},
	scale: {
		mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	scene: [GameScene],
});