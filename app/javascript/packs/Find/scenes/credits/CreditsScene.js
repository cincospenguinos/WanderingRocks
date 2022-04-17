import Phaser from 'phaser';
import { CONFIG } from '../../config/index.js';

class CreditsManager {
	constructor() {
		this._index = -1;
	}

	next() {
		this._index += 1;
		return !!this._credit;
	}

	show(credit, description) {
		credit.setText(this._credit.title);
		description.setText(this._credit.message);
		description.on('pointerdown', () => window.open(this._credit.url, '_blank'))
	}

	get _credit() {
		return CONFIG.credits[this._index];
	}
}

export default class CreditsScene extends Phaser.Scene {
	constructor() {
		super({ key: 'CreditsScene' });
	}

	preload() {}

	create() {

		const topText = this.add.text(4, 28, 'Did you find what you were looking for?', {
			fontSize: 24,
			align: 'left',
		});

		const parens = this.add.text(8, CONFIG.dimensions.screen.height / 2, '(________)', {
			fontSize: 100,
			align: 'center',
		});

		const creditText = this.add.text(parens.x + 50, parens.y + 30, '', { fontSize: 12, align: 'center' });
		const descriptionText = this.add.text(parens.x + 50, parens.y + 30 + 16, '',
			{
				fontSize: 12,
				align: 'center',
				wordWrap: {
			        width: parens.width - 100,
			        callback: null,
			        callbackScope: null,
			        useAdvancedWrap: true,
			    },
			}
		).setInteractive()
			.on('pointerover', function() { this.setColor('#CCCCFF') })
			.on('pointerout', function() { this.setColor('#FFFFFF') })
		;

		const manager = new CreditsManager();

		const { credits } = CONFIG;
		this.time.addEvent({
			delay: 5000,
			callback: () => {
				if (manager.next()) {
					manager.show(creditText, descriptionText);
				}
			},
			repeat: -1,
		})
	}

	update() {}
}