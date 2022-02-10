import Phaser from 'phaser';
import ImagesScene from './images/ImagesScene.js';

import SoundControl from './sound/SoundControl.js';
import SoundView from './sound/SoundView.js';
import DublinerChannel from '../../channels/dubliner_channel.js';

const playButton = document.getElementById('play_button');
const soundControl = new SoundControl();
const soundView = new SoundView(soundControl);

const dublinerChannel = new DublinerChannel();

playButton.onclick = function() {
	playButton.remove();

	const streetsOfDublin = new Phaser.Game({
		parent: 'images-scene-container',
		type: Phaser.WEBGL,
		width: 1000,
		height: 600,
		pixelArt: false,
		physics: {},
		scale: {
			mode: Phaser.Scale.FIT,
	    autoCenter: Phaser.Scale.CENTER_BOTH,
		},
		scene: ImagesScene,
	});

	soundControl.addListener((modifiedInfo) => {
		dublinerChannel.submit('effect_modified', modifiedInfo);
		streetsOfDublin.scene.scenes[0].events.emit('effect_modified');
	});

	dublinerChannel.addListener((data) => {
		if (data.seconds !== undefined && data.seconds !== null && !soundControl.playing()) {
			soundControl.play(Number(data.seconds));
			soundView.show(data.effects);
		} else {
			streetsOfDublin.scene.scenes[0].events.emit('effect_modified');
			soundControl.setEffectValue(data.effectName, data.effectValue, Number(data.value), false);
		}
	});

	dublinerChannel.submit('currentTime');
}
