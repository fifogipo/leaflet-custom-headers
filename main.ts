import * as L from "leaflet";
import {DomEvent, DoneCallback} from "leaflet";

export interface TileLayerHeadersOptions extends L.TileLayerOptions {
  customHeaders?: Record<string, string>;
}

export class TileLayerHeaders extends L.TileLayer {
  override options!: TileLayerHeadersOptions;

  constructor(urlTemplate: string, options: TileLayerHeadersOptions) {
    super(urlTemplate, options);
  }

  override createTile(coords: L.Coords, done: DoneCallback): HTMLImageElement {
    const tile = document.createElement('img');

    DomEvent.on(tile, 'load', this._tileOnLoad.bind(this, done, tile));
    DomEvent.on(tile, 'error', this._tileOnError.bind(this, done, tile, new Error()));

    if (this.options.crossOrigin || this.options.crossOrigin === '') {
      tile.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
    }

    if (typeof this.options.referrerPolicy === 'string') {
      tile.referrerPolicy = this.options.referrerPolicy;
    }

    tile.alt = '';

    const tileUrl = this.getTileUrl(coords);

    fetch(tileUrl, {
      headers: this.options.customHeaders,
    })
      .then(response => response.blob())
      .then(blob => {
        tile.src = URL.createObjectURL(blob);
        done(undefined, tile);
      })
      .catch(error => done(error, undefined));

    return tile;
  }
}
