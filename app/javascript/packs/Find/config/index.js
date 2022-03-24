import { SPRITES } from './sprites.js';
import { DIALOGUE } from './dialogue.js';

const CONFIG = {
	constants: {
		zoomAmount: 2,
	},
	data: {
		map: {
			key: 'map',
			json: '/find/json/salt_lake_city.json',
			tilesheetKey: 'tilemap',
		},
		dialogue: { ...DIALOGUE },
	},
	dimensions: {
		screen: {
			width: 600,
			height: 400,
		},
		grid: {
			size: 16,
		}
	},
	sprites: {...SPRITES},
};

export { CONFIG };