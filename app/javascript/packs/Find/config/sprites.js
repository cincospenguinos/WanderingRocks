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
	cardTable: {
		key: 'cardTable',
		location: `${spriteDirLoc}/card_table.png`,
	},
	dialogueTileset: {
		key: 'dialogueTileset',
		location: `${spriteDirLoc}/dialogue_tileset.png`,
		config: {
			frameWidth: 16,
			frameHeight: 16,
		},
	},
	grendel: {
		key: 'grendel',
		location: `${spriteDirLoc}/grendel.png`,
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
	kafka: {
		key: 'kafka',
		location: `${spriteDirLoc}/kafka.png`,
		json: `${jsonDirLoc}/kafka.json`,
	},
	krishna: {
		key: 'krishna',
		location: `${spriteDirLoc}/krishna.png`,
	},
	nokia: {
		key: 'nokia',
		location: `${spriteDirLoc}/nokia.png`,
	},
	particle: {
		key: 'particle',
		location: `${spriteDirLoc}/yellow.png`,
	},
	stein: {
		key: 'stein',
		location: `${spriteDirLoc}/stein.png`,
	},
	television: {
		key: 'television',
		location: `${spriteDirLoc}/television.png`,
		json: `${jsonDirLoc}/television.json`,
	},
	yhwh: {
		key: 'yhwh',
		location: `${spriteDirLoc}/yhwh.png`,
	},
};

// TODO: Add more sprites and update the ones here!
const TOTAL_PLAYER_SPRITES = 2;
for (let i = 1; i <= TOTAL_PLAYER_SPRITES; i++) {
	const key = `player${i}`;

	SPRITES[key] = {
		location: `${spriteDirLoc}/character${i}.png`,
		json: `${jsonDirLoc}/character${i}.json`,
	};
}

SPRITES.totalPlayers = TOTAL_PLAYER_SPRITES;
SPRITES.player = SPRITES[`player${Math.floor(Math.random() * TOTAL_PLAYER_SPRITES) + 1}`];

export { SPRITES };