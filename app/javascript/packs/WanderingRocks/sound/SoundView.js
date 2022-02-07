export default class SoundView {
	constructor(soundController) {
		this._soundController = soundController;
		document.querySelectorAll(SoundView.ALL_OPTIONS_SELECTOR)
			.forEach((element) => element.addEventListener('input', (_) => {
				this.effectSliderHasChanged(element);
			}));

		document.querySelector('input#main-volume')
			.addEventListener('input', (evt) => {
				this._soundController.setVolume(Number(evt.target.value));
			});
	}

	effectSliderHasChanged(element) {
		const split = element.id.split('-');
		const effectName = split[0];
		const valueName = split[1];

		this._soundController.setEffectValue(effectName, valueName, element.value);
	}
}

SoundView.ALL_OPTIONS_SELECTOR = '.sound-effect > input';