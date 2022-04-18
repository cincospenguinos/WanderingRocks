import Phaser from 'phaser';
import { CONFIG } from '../../config/index.js';
import { STATE } from '../../state/index.js';

export default class NokiaScene extends Phaser.Scene {
	constructor() {
		super({ key: 'NokiaScene' });
	}

	init(data) {
		this._element = document.createElement('div');
		this._element.setAttribute('style', 'display: flex; flex-direction: column; align-items: center;');
		this._element.innerHTML = NokiaScene.ALL_GAMES[data.key];

		const exitButton = document.createElement('button');
		exitButton.innerHTML = 'Leave'
		exitButton.addEventListener('click', () => {
			const container = document.getElementById('game-container');
			container.querySelector('canvas').setAttribute('style', '');
			this._element.remove();
			this.scene.stop();
			this.scene.get('GameScene').events.emit('enable_input');
		});
		this._element.append(exitButton)
	}

	preload() {}

	create() {
		const container = document.getElementById('game-container');
		container.querySelector('canvas').setAttribute('style', 'display: none;');
		container.append(this._element);

		this.events.on('exit', () => {
			container.querySelector('canvas').setAttribute('style', '');
			this._element.remove();
			this.scene.stop();
		});
	}

	update() {}
}

const nokia = `<iframe scrolling="no" style="border: none;" width="500" height="500" src="https://cincospenguinos.github.io/LaMortVoit/" />`;
const father = `<iframe scrolling="no" style="border: none;" width="500" height="500" src="https://cincospenguinos.github.io/FATHER/" />`;
const dustyTome = `
	<style>
		#content {
			background-color: white;
			color: black;
		}
    
    #content p pre {
      background-color: '#c0c0c0';
    }
	</style>
	<div id="content">
		<h2>Flerlana: A Guide</h2>
		<p>The language of Flerlana is a self-contradicting one: it has an alphabet virtually identical to the roman alphabet, and
		yet it couches itself in its own script. It borrows heavily from Latin, English, French, and a variety of Central African
		dialects, but still insists that it is a construction all its own. Its literature is imaginary, and yet it is written in
		the hearts and minds of those who know it. One cannot help but wonder what would cause its emergance as a mode of communication,
		yet is fundamentally designed to not communcate.
		</p>
		<p>We can only speculate. As time goes forward, we will discover more of it, like flowers on the wild cacti in the desert.</p>
		<h3>Grammar</h3>
		<p>Flerlana borrows from French in its conjugation structure:</p>
		<table>
      <tr>
        <th></th>
        <th>1st Person</th>
        <th>2nd Person</th>
        <th>3rd Person</th>
      </tr>
      <tr>
        <th>Singular</th>
        <td>Ida</td>
        <td>Touda</td>
        <td>Beda/Seda</td>
      </tr>
      <tr>
        <th>Plural</th>
        <td>Idou</td>
        <td>Toudou</td>
        <td>Bedou/Sedou</td>
      </tr>
		</table>
    <p>
      Observe that subjects of a sentence are differentiated by suffix. This is the case for almost all words in Flerlana: the suffix indicates how the root is to be interpreted. "Ida" is first person singular (referring to "I" or "me") while the plural of first person ("us" or "we") is denoted by the replacement of "a" with "ou".
    </p>
    <p>
    Flerlana does not distinguish between objects and subjects, except in sentence order and the prefix "n":
    <pre>
      My name is Andre.
      Ida ntouda kallee Andree.
    </pre>
    </p>
    <p>
    Tense in Flerlana is again denoted by suffix:
    <table>
      <tr>
        <th>Past</th>
        <th>Present</th>
        <th>Future</th>
      </tr>
      <tr>
        <td>-a</td>
        <td>-ee</td>
        <td>-ou</td>
      </tr>
    </table>
    
    To write a sentence in Flerlana, simply follow the structure <pre>Subject [direct object] [indirect object] verb</pre>:
    </p>
    <p>
      Here is an example of a translated verse from the New Testament, 2 Corinthians 3:18:
      <pre>
        Et idou, idou kee afec feesaj resentee glour Senour, etree nourfasee jouska feesaj Senour afec plous glour, plous glour kee fenna Senour, kee etree Esprit.
      </pre>
    </p>
    <p>
      Here is a way to injure one's enemies:
      <pre>
        Idou pensee kee touda etree bet. Touda etree afec natakou smoul.
      </pre>
    </p>
    <p>
      Here is an excerpt from one speaker's journal:
      <pre>
        Ida sentee fatig. Ida desida nal; ida dournou tard.
      </pre>
    </p>
	</div>
`;

NokiaScene.ALL_GAMES = {
	nokia,
	father,
	dustyTome,
}
