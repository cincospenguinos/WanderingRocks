import Phaser from 'phaser';
import { CONFIG } from '../../config/index.js';

export default class MovingSprite extends Phaser.GameObjects.Sprite {
	constructor(scene, info) {
		super(scene, info.x, info.y, info.key);
		this._key = info.key;
		this.scene.add.existing(this);
		this.scene.tweens.add({
			targets: [this],
			props: {
				x: { from: info.x, to: 200 },
			},
			onStart: () => {
				this.anims.play(`right_${info.key}`);
			},
			onComplete: () => {
				this.anims.stop();
			},
			duration: 3000,
		});

		scene.anims.createFromAseprite(info.key);
		this._animationKeys.forEach((animKey) => {
			const anim = this.scene.anims.get(animKey);
			anim.repeat = -1;
		});
	}

	get _animationKeys() {
		return MovingSprite.DIRECTIONS.map(d => `${d}_${this._key}`);
	}
}

MovingSprite.DIRECTIONS = ['right', 'up', 'down'];

MovingSprite.instantiateAllWith = (scene) => {
	return Object.keys(MovingSprite.ALL_SPRITES).map((spriteKey) => {
		const info = MovingSprite.ALL_SPRITES[spriteKey];
		return new MovingSprite(scene, info);
	});
}

MovingSprite.ALL_SPRITES = {
	kafka: {
		key: 'kafka',
		x: 100,
		y: 70,
	}
};
