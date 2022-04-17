import { CONFIG } from '../../config/index.js';

export default class Map {
	constructor(scene) {
		this._map = scene.make.tilemap({ key: CONFIG.data.map.key });
		this._tileset = this._map.addTilesetImage(CONFIG.data.map.tilesheetKey, CONFIG.sprites.tilesheet.key);
		this._layers = {};
		Map.LAYERS.forEach(layer => this._layers[layer] = this._map.createLayer(layer, this._tileset, 0, 0));
	}

	canMoveTo(pos) {
		return this._layers['Wall'].getTileAtWorldXY(pos.x, pos.y) === null;
	}

	get map() {
		return this._map;
	}

	get tileset() {
		return this._tileset;
	}
}

Map.LAYERS = ['Ground', 'Wall'];