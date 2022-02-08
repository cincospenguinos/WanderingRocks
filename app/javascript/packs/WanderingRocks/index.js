import SoundControl from './sound/SoundControl.js';
import SoundView from './sound/SoundView.js';
import DublinerChannel from '../../channels/dubliner_channel.js';

const playButton = document.getElementById('play_button');
const soundControl = new SoundControl();
const soundView = new SoundView(soundControl);

const dublinerChannel = new DublinerChannel();

playButton.onclick = function() {
	playButton.remove();

	soundControl.addListener((modifiedInfo) => {
		dublinerChannel.submit('effect_modified', modifiedInfo);
	});

	dublinerChannel.addListener((data) => {
		if (data.seconds !== undefined && data.seconds !== null && !soundControl.playing()) {
			soundControl.play(Number(data.seconds));
			soundView.show(data.effects);
		} else {
			soundControl.setEffectValue(data.effectName, data.effectValue, Number(data.value), false);
		}
	});

	dublinerChannel.submit('currentTime');
}
