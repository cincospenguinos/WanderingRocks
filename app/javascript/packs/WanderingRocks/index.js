import Pizzicato from 'pizzicato';

const playButton = document.getElementById('play_button');
const june16thConfig = {
	source: 'file',
	options: {
		path: 'june16th.mp3',
	},
};

playButton.onclick = function() {
	playButton.remove();

	const june16th = new Pizzicato.Sound(june16thConfig, () => {
		june16th.play();
	});
}
