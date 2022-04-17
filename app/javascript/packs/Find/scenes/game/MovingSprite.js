import Phaser from 'phaser';
import { CONFIG } from '../../config/index.js';
import KafkaPresence from './KafkaPresence.js';

export default class MovingSprite extends Phaser.GameObjects.Sprite {
	constructor(scene, info) {
		super(scene, info.x, info.y, info.key);
		this._key = info.key;
		scene.add.existing(this);

		scene.anims.createFromAseprite(info.key);
		this._animationKeys.forEach((animKey) => {
			const anim = scene.anims.get(animKey);
			anim.repeat = -1;
		});

		this._timeline = scene.tweens.createTimeline(info.timelineConf);

		info.tweens.forEach((tweenInfo) => {
			const { finalTweenInfo, playRelevantAnim } = this._generateTweenInfoFrom(tweenInfo);

			this._timeline.add({
				...finalTweenInfo,
				targets: [this],
				onUpdate: () => {
					if (!this.anims.isPlaying) {
						playRelevantAnim(this);
					}

					if (info.onUpdate) {
						info.onUpdate(this);
					}
				},
				onComplete: () => {
					this.anims.stop();
					this.setFrame(0);
					this.flipX = false;
				},
			});
		});

		this._timeline.play();
	}

	_generateTweenInfoFrom(tweenInfo) {
		const finalTweenInfo = { ...tweenInfo };

		let animKey = tweenInfo.direction;
		let flipX = false;

		if (animKey === 'left') {
			flipX = true;
			animKey = 'right';
		}

		animKey = `${animKey}_${this._key}`;

		delete finalTweenInfo.direction;
		const playRelevantAnim = (sprite) => {
			sprite.flipX = flipX;
			sprite.anims.play(animKey);
		}

		return { finalTweenInfo, playRelevantAnim }
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

const kafkaPresence = new KafkaPresence();

MovingSprite.ALL_SPRITES = {
	kafka: {
		key: 'kafka',
		x: 36 * 8,
		y: 43 * 8,
		tweens: [{
			props: {
				x: { from: 36 * 8, to: 42 * 8 }
			},
			direction: 'right',
			duration: 2000,
		}, {
			props: {
				y: { from: 43 * 8, to: 24 * 8 },
			},
			direction: 'up',
			delay: 2000,
			duration: 4000,
		}, {
			props: {
				x: { from: 42 * 8, to: 54 * 8 }
			},
			direction: 'right',
			delay: 2200,
			duration: 2000,
		}, {
			props: {
				y: { from: 24 * 8, to: 32 * 8 }
			},
			direction: 'down',
			duration: 3000,
			delay: 2000,
		}, {
			props: {
				x: { from: 54 * 8, to: 48 * 8 }
			},
			direction: 'left',
			delay: 2200,
			duration: 1500,
		}, {
			props: {
				y: { from: 32 * 8, to: 22 * 8 }
			},
			direction: 'up',
			duration: 3000,
			delay: 2000,
		}, {
			props: {
				x: { from: 48 * 8, to: 33 * 8 }
			},
			direction: 'left',
			duration: 5000,
			delay: 5000,
		}, {
			props: {
				y: { from: 22 * 8, to: 43 * 8 }
			},
			direction: 'down',
			duration: 3800,
			delay: 1000,
		}, {
			props: {
				x: { from: 33 * 8, to: 36 * 8 }
			},
			direction: 'right',
			duration: 800,
			delay: 2000,
		}],
		timelineConf: {
			loop: -1,
			loopDelay: 1000,
			resetFromLoop: true,
		},
		onUpdate: (self) => {
			kafkaPresence.onUpdate(self);
		},
	}
};
