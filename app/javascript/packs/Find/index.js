import Phaser from 'phaser';
import { CONFIG } from './config/index.js';
import GameScene from './scenes/game/GameScene.js';
import DialogueScene from './scenes/dialogue/DialogueScene.js';
import OpeningScene from './scenes/opening/OpeningScene.js';
import CreditsScene from './scenes/credits/CreditsScene.js';
import CardsScene from './scenes/cards/CardsScene.js';


const isDev = document.getElementById('game-container').dataset.dev === 'true';
const scene = [GameScene, DialogueScene, CardsScene, CreditsScene];

if (isDev) {
	scene.push(OpeningScene);
}

new Phaser.Game({
	parent: 'game-container',
	type: Phaser.CANVAS,
	width: CONFIG.dimensions.screen.width,
	height: CONFIG.dimensions.screen.height,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			debug: isDev,
			gravity: 0,
		},
	},
	scale: {
		mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	scene,
});
