import Phaser from 'phaser';

const images = [
	{ key: 'iveagh_gardens', location: '/iveagh_gardens.jpg' },
	{ key: 'joyceshouse', location: '/joyceshouse.jpg' },
	{ key: 'obrien_institute', location: '/obrien_institute.jpg' },
	{ key: 'phoenix_monument', location: '/phoenix_monument.jpg' },
	{ key: 'presbytery', location: '/presbytery.png' },
];

export default class ImagesScene extends Phaser.Scene {
	constructor() {
		super({ key: 'ImagesScene' });
	}

	preload() {
		this.load.glsl('shaders', 'shaders.glsl.js');
		images.forEach(i => this.load.image(i.key, i.location));
	}

	create() {
		this.tunnelShader = this.add.shader('Tunnel', 500, 300, 1000, 600, ['joyceshouse']);
		this.tunnelShader.setInteractive();

		this.tunnelShader.on('pointerdown', () => {
			const img = images[Math.floor(Math.random() * images.length)];
			this.tunnelShader.setChannel0(img.key);
			console.log('changing to ', img.key);
		});
		// this.distortPipeline = this.game.renderer.addPipeline('Distort', new DistortPipeline(this.game));
	}

	update() {
		// this.distortPipeline.setFloat1('time', this.input.mouse.x);
	}

	applyPipeline() {
		this.cameras.main.setRenderToTexture(this.distortPipeline);
	}
}