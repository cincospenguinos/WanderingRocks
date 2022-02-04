import SoundControl from './sound/SoundControl.js';

const playButton = document.getElementById('play_button');
const soundControl = new SoundControl();

playButton.onclick = function() {
	playButton.remove();
	soundControl.play();
}
