import Phaser from 'phaser';
import { CONFIG } from '../../config/index.js';
import KeyboardInput from './KeyboardInput.js';
import PointerInput from './PointerInput.js';
import PlayerSprite from './PlayerSprite.js';
import Map from './Map.js';
import DialogueSprite from './DialogueSprite.js';

class PlayerInput {
	constructor(scene) {
		this._keyboard = new KeyboardInput(scene);
		this._pointer = new PointerInput(scene);
	}

	get changeInDirections() {
		if (this._pointer.changeInDirections.isChanging) {
			return this._pointer.changeInDirections;
		}

		return this._keyboard.changeInDirections;
	}
}

export default class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' });
	}

	init(data) {
		// TODO: Startup data will have all of the information necessary for the game. Use it to set the player's initial information
		this._startupData = {
			sprite: CONFIG.sprites.player,
			...data
		};
	}

	preload() {
		Object.keys(DialogueSprite.ALL_SPRITES).forEach((key) => {
			const info = DialogueSprite.ALL_SPRITES[key];
			const spriteInfo = CONFIG.sprites[info.key];
			this.load.image(spriteInfo.key, spriteInfo.location);

			if (info.sound) {
				this.load.audio(CONFIG.sound[info.sound].key, CONFIG.sound[info.sound].location);
			}
		});

		this.load.image(CONFIG.sprites.tilesheet.key, CONFIG.sprites.tilesheet.location);
		this.load.tilemapTiledJSON(CONFIG.data.map.key, CONFIG.data.map.json);
		this.load.aseprite('player', this._startupData.sprite.location, this._startupData.sprite.json);
		this.load.audio(CONFIG.sound.music.key, CONFIG.sound.music.location);
	}

	create() {
		this.scene.launch('DialogueScene');
		this.anims.createFromAseprite('player');

		this._music = this.sound.add(CONFIG.sound.music.key, { volume: 0.8 });
		this.time.delayedCall(2000, () => this._music.play());

		this.cameras.main.zoom = CONFIG.constants.zoomAmount;
		this._map = new Map(this);

		this._dialogueSprites = DialogueSprite.instantiateAllWith(this);

		this.player = new PlayerSprite(this, { x: 4, y: 4 });
		this.cameras.main.startFollow(this.player);
		this._playerInput = new PlayerInput(this);

		this.events.on('in_dialogue', () => this._inDialogue = true);
		this.events.on('no_dialogue', () => this._inDialogue = false);
		this.events.on('low_volume', () => this._music.setVolume(0.2));
		this.events.on('high_volume', () => this._music.setVolume(0.8));
	}

	update() {
		if (!this._inDialogue) {
			this._handleInput();
		}

		const overlapping = this._dialogueSprites
			.map((dialogueSprite) => Phaser.Geom.Intersects.RectangleToRectangle(this.player.body, dialogueSprite.body) ? dialogueSprite : undefined)
			.filter(d => d)
		;

		if (overlapping.length) {
			this.events.emit('dialogue_show', overlapping[0]);
		} else {
			this.events.emit('dialogue_hide');
		}
	}

	_handleInput() {
		if (this.player.isMoving) {
			return;
		}

		const currentDirections = this._playerInput.changeInDirections;

		if (currentDirections.isChanging) {
			const gridSize = CONFIG.dimensions.grid.size;
			const nextPos = { x: this.player.x + currentDirections.x, y: this.player.y + currentDirections.y };

			if (this._map.canMoveTo(nextPos)) {
				this.player.moveTo(nextPos);
				this.player.anims.play(currentDirections.animName);
				this.player.flipX = currentDirections.flip;
			}
		} else {
			this.player.setFrame(0);
		}
	}
}