import Phaser from 'phaser';
import { CONFIG } from '../../config/index.js';
import { STATE } from '../../state/index.js';

const laMortVoit = `<iframe scrolling="no" style="border: none;" width="500" height="500" src="https://cincospenguinos.github.io/LaMortVoit/" />`;

export default class NokiaScene extends Phaser.Scene {
	constructor() {
		super({ key: 'NokiaScene' });
	}

	init(playerPos) {
		STATE.channel.submit('inventory_change', { nokia: 'taken' });
		this._element = document.createElement('div');
		this._element.setAttribute('style', 'display: flex; flex-direction: column; align-items: center;');
		this._element.innerHTML = laMortVoit;
		this._playerPos = playerPos;
	}

	preload() {}

	create() {
		const container = document.getElementById('game-container');
		container.querySelector('canvas').setAttribute('style', 'display: none;');
		container.append(this._element);

		this.events.on('exit', () => {
			container.querySelector('canvas').setAttribute('style', '');
			STATE.channel.submit('inventory_change', { nokia: 'dropped' });
			this._element.remove();
			this.scene.stop();
		});
	}

	update() {}
}
