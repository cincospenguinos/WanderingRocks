import Phaser from 'phaser';

const DUBLIN_IMAGES = [
	{ key: 'iveagh_gardens', location: '/wanderingRocks/iveagh_gardens.jpg' },
	{ key: 'joyceshouse', location: '/wanderingRocks/joyceshouse.jpg' },
	{ key: 'obrien_institute', location: '/wanderingRocks/obrien_institute.jpg' },
	{ key: 'phoenix_monument', location: '/wanderingRocks/phoenix_monument.jpg' },
	{ key: 'presbytery', location: '/wanderingRocks/presbytery.png' },
];

export default class ImagesScene extends Phaser.Scene {
	constructor() {
		super({ key: 'ImagesScene' });
	}

	preload() {
		this.load.glsl('shaders', '/wanderingRocks/shaders.glsl.js');
		DUBLIN_IMAGES.forEach(i => this.load.image(i.key, i.location));
	}

	create() {
		this.shaderOriginValueObj = {
			currentValue: 0.001,
			goUp: true,
			MOD_VALUE: 0.001,
			update() {
				if (this.goUp) {
					this.currentValue += this.MOD_VALUE;
				} else {
					this.currentValue -= this.MOD_VALUE;
				}

				if (this.goUp && this.currentValue > 2.0) {
					this.goUp = false;
				}

				if (!this.goUp && this.currentValue < 0.1) {
					this.goUp = true;
				}
			}
		};

		this.tunnelShader = this.add.shader('Tunnel', 500, 300, 1000, 600, ['joyceshouse']);
		this.tunnelShader.setInteractive();

		this.events.on('effect_modified', () => {
			const img = DUBLIN_IMAGES[Math.floor(Math.random() * DUBLIN_IMAGES.length)];
			this.tunnelShader.setChannel0(img.key);
		});
	}

	update() {
		this.shaderOriginValueObj.update();
		this.tunnelShader.setUniform('origin.value', this.shaderOriginValueObj.currentValue);
	}

	applyPipeline() {
		this.cameras.main.setRenderToTexture(this.distortPipeline);
	}
}