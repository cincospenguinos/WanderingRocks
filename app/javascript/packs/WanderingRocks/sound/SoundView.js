export default class SoundView {
	constructor(soundController) {
		this._soundController = soundController;
		document.querySelectorAll(SoundView.ALL_OPTIONS_SELECTOR)
			.forEach((element) => element.addEventListener('input', (_) => {
				this.effectSliderHasChanged(element);
			}));
	}

	effectSliderHasChanged(element) {
		const split = element.id.split('-');
		const effectName = split[0];
		const valueName = split[1];

		this._soundController.setEffectValue(effectName, valueName, element.value);
	}
}

SoundView.ALL_OPTIONS_SELECTOR = '.sound-effect > input';