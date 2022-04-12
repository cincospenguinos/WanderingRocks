import Phaser from 'phaser';
import { CONFIG } from '../../config/index.js';

class Card {
	constructor(scene, info) {
		this._scene = scene;
		this._key = info.key;
		this._currentSprite = this._createSprite(info.x, info.y, 'cardBack');
		this._state = 'down';
		this._isDragging = false;
		this.callback = info.callback;
	}

	toggleState() {
		const x = this.x;
		const y = this.y;
		this._currentSprite.destroy();

		if (this._state === 'down') {
			this._currentSprite = this._createSprite(x, y, this._key);
			this._state = 'up';
		} else {
			this._currentSprite = this._createSprite(x, y, 'cardBack');
			this._state = 'down';
		}
	}

	get x() {
		return this._currentSprite.x;
	}

	get y() {
		return this._currentSprite.y;
	}

	_createSprite(x, y, key) {
		const sprite = this._scene.add.image(x, y, key);
		sprite.setInteractive();
		this._scene.input.setDraggable(sprite);
		sprite.on('pointerup', () => {
			if (!this._lastTime) {
				this._lastTime = this._scene.time.now;
				return;
			}

			let clickDelay = this._scene.time.now - this._lastTime;
			if (clickDelay < 350) {
				this.toggleState();
				this.callback(this._key, this._state);
			}

			this._lastTime = this._scene.time.now;
		});
		sprite.on('drag', (pointer, x, y) => {
			sprite.x = x;
			sprite.y = y;
		});

		return sprite;
	}
}

export default class CardsScene extends Phaser.Scene {
	constructor() {
		super({ key: 'CardsScene' });
	}

	init() {
		this._isSolved = false;
	}

	preload() {
		CardsScene.ALL_CARDS.forEach((card) => {
			this.load.image(card, `/find/sprites/cards/${card}.png`);
		});

		this.load.image('cardBack', '/find/sprites/cards/back.png');
		this.load.audio(CONFIG.sound.airHorn.key, CONFIG.sound.airHorn.location);
	}

	create() {
		this._upCards = [];
		CardsScene.ALL_CARDS.forEach((card) => {
			const x = Math.floor(Math.random() * 350 + 50);
			const y = Math.floor(Math.random() * 350 + 50);
			new Card(this, {
				key: card,
				x,
				y,
				callback: (key, state) => {
					if (state === 'up') {
						this._upCards.push(key);
					} else {
						this._upCards = this._upCards.filter(a => a !== key);
					}

					this._checkSolution();
					if (this._isSolved) {
						this.winText.visible = true;
						this.sound.play(CONFIG.sound.airHorn.key);
					}
				}
			});
		});

		this.winText = this.add.text(20, 20, 'WINNER!!!!111111111111111111', {
			fontSize: 60,
		});

		this.winText.visible = false;
		this.winTween = this.tweens.add({
			targets: [this.winText],
			props: {
				angle: {
					duration: 500,
					from: 0,
					to: 359,
					repeat: -1,
				},
				x: {
					from: 0,
					to: 500,
					duration: 2000,
					repeat: -1,
				},
				y: {
					from: 300,
					to: 0,
					duration: 3102,
					repeat: -1,
				},
			},
		});

		this.leaveText = this.add.text(500, 20, 'LEAVE', {
			color: '#CCCCFF',
			fontSize: 20,
		});
		this.leaveText.setInteractive()
			.on('pointerup', () => this.scene.switch('GameScene'))
		;
	}

	update() {

	}

	_checkSolution() {
		if (this._upCards.filter((cardName) => cardName.match(/[a-z]1$/)).length < 1) {
			return;
		}

		if (this._upCards.filter((cardName) => cardName.match(/[a-z]3$/)).length < 2) {
			return;
		}
		
		if (this._upCards.filter((cardName) => cardName.match(/[a-z]7$/)).length < 1) {
			return;
		}

		this._isSolved = true;
	}
}

CardsScene.ALL_CARDS = [];

['clubs', 'diamond', 'hearts', 'spades'].forEach((suit) => {
	for (let cardinalValue = 1; cardinalValue <= 13; cardinalValue++) {
		const key = `${suit}${cardinalValue}`;
		CardsScene.ALL_CARDS.push(key);
	}
});
