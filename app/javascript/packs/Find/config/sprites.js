const spriteDirLoc = '/find/sprites';

const SPRITES = {};

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