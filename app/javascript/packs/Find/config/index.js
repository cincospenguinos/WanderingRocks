import { SPRITES } from './sprites.js';
import { DIALOGUE } from './dialogue.js';
import { SOUND } from './sound.js';
import { CREDITS } from './credits.js';

const CONFIG = {
	constants: {
		zoomAmount: 2,
	},
	credits: CREDITS,
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
	sound: { ...SOUND },
	sprites: { ...SPRITES },
};

export { CONFIG };