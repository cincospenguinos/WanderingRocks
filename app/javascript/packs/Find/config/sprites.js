const spriteDirLoc = '/find/sprites';

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
};

// TODO: Add more sprites and update the ones here!
const TOTAL_PLAYER_SPRITES = 1;
for (let i = 1; i <= TOTAL_PLAYER_SPRITES; i++) {
	const key = `player${i}`;

	SPRITES[key] = {
		location: `${spriteDirLoc}/character${i}.png`,
		json: `${spriteDirLoc}/character${i}.json`,
	};
}

export { SPRITES };