import Phaser from 'phaser';
import { STATE } from '../../state/index.js';

export default class SceneSprite extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, info) {
		super(scene, info.x, info.y, info.key);
		scene.add.existing(this);
		scene.physics.add.existing(this);

		if (!info.text || !info.sceneKey) {
			throw 'No information for scene sprite! Requires `text` and `sceneKey`';
		}

		this._text = info.text;
		this._sceneKey = info.sceneKey;

		if (info.onConstruct) {
			info.onConstruct(this);
		}
	}

	start() {
		this.scene.events.emit('disable_input');
		this.scene.scene.launch(this._sceneKey);
	}

	get text() {
		return this._text;
	}

	nextText() {
		this._currentIndex += 1;
		if (this._currentIndex === this.dialogueText.length) {
			return undefined;
		}

		return this.currentText;
	}
}

SceneSprite.instantiateAllWith = (scene) => {
	return Object.keys(SceneSprite.ALL_SPRITES).map((key) => {
		const info = SceneSprite.ALL_SPRITES[key];
		return new SceneSprite(scene, info);
	});
}

SceneSprite.ALL_SPRITES = {
	cardTable: {
		key: 'cardTable',
		x: 59 * 8,
		y: 64,
		text: 'Play with cards on table',
		sceneKey: 'CardsScene',
		onConstruct: (self) => self.setScale(0.3),
	},
	nokia: {
		key: 'nokia',
		text: 'Play with this random phone',
		sceneKey: 'NokiaScene',
	},
};
