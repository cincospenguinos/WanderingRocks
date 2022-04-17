import Phaser from 'phaser';
import { CONFIG } from './config/index.js';
import { STATE } from './state/index.js';
import GameScene from './scenes/game/GameScene.js';
import DialogueScene from './scenes/dialogue/DialogueScene.js';
import OpeningScene from './scenes/opening/OpeningScene.js';
import CreditsScene from './scenes/credits/CreditsScene.js';
import CardsScene from './scenes/cards/CardsScene.js';
import NokiaScene from './scenes/nokia/NokiaScene.js';
import SceneSprite from './scenes/game/SceneSprite.js';

const gameContainer = document.getElementById('game-container');

const isDev = gameContainer.dataset.dev === 'true';
let scene = [GameScene, DialogueScene, CardsScene, NokiaScene, CreditsScene];

if (!isDev) {
	scene = [OpeningScene, ...scene];
}

SceneSprite.ALL_SPRITES.nokia = {
	...SceneSprite.ALL_SPRITES.nokia,
	...JSON.parse(gameContainer.dataset.nokia),
};

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
