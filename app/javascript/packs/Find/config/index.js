import { SPRITES } from './sprites.js';

const CONFIG = {
	constants: {
		zoomAmount: 2,
	},
	data: {
		map: {
			key: 'map',
			json: '/find/json/salt_lake_city.json',
			tilesheetKey: 'tilesheet',
		}
	},
	dimensions: {
		screen: {
			width: 600,
			height: 400,
		},
		grid: {
			size: 12,
		}
	},
	sprites: {...SPRITES},
};

export { CONFIG };