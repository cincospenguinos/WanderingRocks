import Pizzicato from 'pizzicato';

export default class SoundControl {
	constructor() {
		this._sound = new Pizzicato.Sound(SoundControl.SOUND_FILE_CONFIG);

		const backendData = JSON.parse(document.getElementById('sound-effects-data').dataset['allopts']);
		Object.keys(backendData).forEach((soundEffectKey) => {
			const soundEffectValues = {};
			Object.keys(backendData[soundEffectKey]).forEach(k => soundEffectValues[k] = backendData[soundEffectKey][k].value);
			const effect = this._instantiatePizzicatoEffectFor(soundEffectKey, soundEffectValues);
			effect._soundEffectKey = soundEffectKey
			this._sound.addEffect(effect);
		});
	}

	play(secondsDuration) {
		this._sound.play(0, secondsDuration);
	}

	playing() {
		return this._sound.playing;
	}

	addListener(listener) {
		this._listener = listener;
	}

	setVolume(value) {
		this._sound.volume = value;
	}

	setEffectValue(effectName, effectValue, value, submit = true) {
		const effect = this._sound.effects.find(e => e._soundEffectKey === effectName);

		if (!effect) {
			throw `No effect named '${effectName}'`;
		}

		if (effect[effectValue] !== undefined && effect[effectValue] !== null) {
			effect[effectValue] = Number(value);
		} else if (Object.keys(effect.options).includes(effectValue)){
			effect.options[effectValue] = Number(value);
		}

		if (this._listener && submit) {
			this._listener({ effectName, effectValue, value });
		}
	}

	_instantiatePizzicatoEffectFor(key, currentValues) {
		switch(key) {
			case 'delay':
				return new Pizzicato.Effects.Delay(currentValues);
			case 'compressor':
				return new Pizzicato.Effects.Compressor(currentValues);
			case 'distortion':
				return new Pizzicato.Effects.Distortion(currentValues);
			case 'dubDelay':
				return new Pizzicato.Effects.DubDelay(currentValues);
			case 'flanger':
				return new Pizzicato.Effects.Flanger(currentValues);
			case 'highPassFilter':
				return new Pizzicato.Effects.HighPassFilter(currentValues);
			case 'pingPong':
				return new Pizzicato.Effects.PingPongDelay(currentValues);
			case 'lowPassFilter':
				return new Pizzicato.Effects.LowPassFilter(currentValues);
			case 'quadrafuzz':
				return new Pizzicato.Effects.Quadrafuzz(currentValues);
			case 'reverb':
				return new Pizzicato.Effects.Reverb(currentValues);
			case 'ringModulator':
				return new Pizzicato.Effects.RingModulator(currentValues);
			case 'tremolo':
				return new Pizzicato.Effects.Tremolo(currentValues);
			default:
				throw `${key} is not a valid key!`;
		}
	}
}

SoundControl.SOUND_FILE_CONFIG = {
	source: 'file',
	options: {
		path: '/wanderingRocks/june16th.mp3',
	},
};
