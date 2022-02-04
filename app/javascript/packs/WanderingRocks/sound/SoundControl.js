import Pizzicato from 'pizzicato';

export default class SoundControl {
	constructor() {
		this._sound = new Pizzicato.Sound(SoundControl.SOUND_FILE_CONFIG);
		this._effects = {};

		Object.keys(SoundControl.ALL_OPTS).forEach((soundEffectKey) => {
			const sound = this._instantiatePizzicatoEffectFor(soundEffectKey, SoundControl.ALL_OPTS[soundEffectKey]);
			this._sound.addEffect(sound);
			this._effects[soundEffectKey] = sound;
		});
	}

	play() {
		this._sound.play();
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
		path: 'june16th.mp3',
	},
};

SoundControl.ALL_OPTS = {
	delay: {
		feedback: 0.0,
		time: 0.0,
		mix: 0.0,
	},
	compressor: {
		threshold: 0,
    ratio: 0,
	},
	distortion: {
		gain: 0.0,
	},
	dubDelay: {
		feedback: 0.0,
		time: 0.0,
		mix: 0.0,
		cutoff: 0,
	},
	flanger: {
		time: 0.0,
    speed: 0.0,
    depth: 0.0,
    feedback: 0.0,
    mix: 0.0,
	},
	highPassFilter: {
		frequency: 0,
    peak: 0,
	},
	pingPong: {
		feedback: 0.0,
		time: 0.0,
		mix: 0.0,
	},
	lowPassFilter: {
		frequency: 0,
    peak: 0,
	},
	quadrafuzz: {
		lowGain: 0.0,
    midLowGain: 0.0,
    midHighGain: 0.0,
    highGain: 0.0,
    mix: 0.0,
	},
	reverb: {
		time: 1.0,
    decay: 0.8,
    reverse: false,
    mix: 1.0
	},
	ringModulator: {
		speed: 0,
    distortion: 0,
    mix: 0.0,
	},
	tremolo: {
		speed: 0,
    depth: 0.0,
    mix: 0.0,
	},
};
