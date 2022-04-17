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
		x: 100,
		y: 70,
		tweens: [{
			props: {
				x: { from: 100, to: 200 }
			},
			direction: 'right',
			duration: 3000,
		}, {
			props: {
				y: { from: 70, to: 200 },
			},
			direction: 'down',
			delay: 2000,
			duration: 3300,
		}, {
			props: {
				y: { from: 200, to: 70 },
			},
			direction: 'up',
			delay: 2000,
			duration: 3300,
		}, {
			props: {
				x: { from: 200, to: 100 }
			},
			direction: 'left',
			duration: 3000,
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
