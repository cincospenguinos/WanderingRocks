import SoundControl from './sound/SoundControl.js';
import SoundView from './sound/SoundView.js';

const playButton = document.getElementById('play_button');
const soundControl = new SoundControl();
const soundView = new SoundView(soundControl);

playButton.onclick = function() {
	playButton.remove();
	soundControl.play();
}
