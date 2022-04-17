export default class KafkaPresence {
	constructor() {
		this._missingTiles = {};
	}

	onUpdate(sprite) {
		const tilemap = sprite.scene._map.map;
		const newTileKeys = [];

		KafkaPresence.ALL_TILE_MODIFIERS.forEach((mods) => {
			const [xMod, yMod] = mods;
			const x = sprite.x + 8 * xMod;
			const y = sprite.y + 8 * yMod;

			this._allTilesAt(tilemap, x, y).forEach((tile) => {
				if (tile) {
					const tileKey = `${tile.x}_${tile.y}_${tile.layer}`;
					newTileKeys.push(tileKey);

					if (!this._missingTiles[tileKey]) {
						tile.visible = false;
						this._missingTiles[tileKey] = tile;
					}
				}
			});
		});

		Object.keys(this._missingTiles)
			.filter(k => !newTileKeys.includes(k))
			.forEach((isVisibleAgain) => {
				const tile = this._missingTiles[isVisibleAgain];
				tile.visible = true;
				delete this._missingTiles[isVisibleAgain];
			});
	}

	_allTilesAt(tilemap, x, y) {
		const groundTile = tilemap.getTileAtWorldXY(x, y, false, null, 'Ground');
		const wallTile = tilemap.getTileAtWorldXY(x, y, false, null, 'Wall');

		return [wallTile, groundTile];
	}
}

KafkaPresence.ALL_TILE_MODIFIERS = [
	[0, -3],
	[-1, -2], [0, -2], [1, -2],
	[-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1],
	[-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0],
	[-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1],
	[-1, 2], [0, 2], [1, 2],
	[0, 3],
];