import Phaser from 'phaser';
import { CONFIG } from '../../config/index.js';
import { STATE } from '../../state/index.js';

export default class NokiaScene extends Phaser.Scene {
	constructor() {
		super({ key: 'NokiaScene' });
	}

	init(data) {
		this._element = document.createElement('div');
		this._element.setAttribute('style', 'display: flex; flex-direction: column; align-items: center;');
		this._element.innerHTML = NokiaScene.ALL_GAMES[data.key];

		const exitButton = document.createElement('button');
		exitButton.innerHTML = 'Leave'
		exitButton.addEventListener('click', () => {
			const container = document.getElementById('game-container');
			container.querySelector('canvas').setAttribute('style', '');
			this._element.remove();
			this.scene.stop();
			this.scene.get('GameScene').events.emit('enable_input');
		});
		this._element.append(exitButton)
	}

	preload() {}

	create() {
		const container = document.getElementById('game-container');
		container.querySelector('canvas').setAttribute('style', 'display: none;');
		container.append(this._element);

		this.events.on('exit', () => {
			container.querySelector('canvas').setAttribute('style', '');
			this._element.remove();
			this.scene.stop();
		});
	}

	update() {}
}

const nokia = `<iframe scrolling="no" style="border: none;" width="500" height="500" src="https://cincospenguinos.github.io/LaMortVoit/" />`;
const father = `<iframe scrolling="no" style="border: none;" width="500" height="500" src="https://cincospenguinos.github.io/FATHER/" />`

NokiaScene.ALL_GAMES = {
	nokia,
	father,
}
