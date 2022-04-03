const spriteDirLoc = '/find/sprites';
const jsonDirLoc = '/find/json';

const SPRITES = {
	andre: {
		key: 'andre',
		location: `${spriteDirLoc}/andre.png`,
	},
	tilesheet: {
		key: 'tilesheet',
		location: `${spriteDirLoc}/tilesheet.png`,
		json: `/find/json/salt_lake_city.json`,
	},
	dialogueTileset: {
		key: 'dialogueTileset',
		location: `${spriteDirLoc}/dialogue_tileset.png`,
		config: {
			frameWidth: 16,
			frameHeight: 16,
		},
	},
	allah: {
		key: 'allah',
		location: `${spriteDirLoc}/allah.png`,
	},
	falkner: {
		key: 'falkner',
		location: `${spriteDirLoc}/falkner.png`,
	},
	jesus: {
		key: 'jesus',
		location: `${spriteDirLoc}/jesus.png`,
	},
	joyce: {
		key: 'joyce',
		location: `${spriteDirLoc}/joyce.png`,
	},
	krishna: {
		key: 'krishna',
		location: `${spriteDirLoc}/krishna.png`,
	},
	yhwh: {
		key: 'yhwh',
		location: `${spriteDirLoc}/yhwh.png`,
	},
};

// TODO: Add more sprites and update the ones here!
const TOTAL_PLAYER_SPRITES = 1;
for (let i = 1; i <= TOTAL_PLAYER_SPRITES; i++) {
	const key = `player${i}`;

	SPRITES[key] = {
		location: `${spriteDirLoc}/character${i}.png`,
		json: `${jsonDirLoc}/character${i}.json`,
	};
}

export { SPRITES };