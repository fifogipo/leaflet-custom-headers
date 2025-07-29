import * as L from "leaflet";
import {DomEvent, DoneCallback} from "leaflet";

/**
 * Interface extending TileLayerOptions to include custom headers.
 */
export interface TileLayerHeadersOptions extends L.TileLayerOptions {
  /**
   * Custom headers to be sent with tile requests.
   */
  customHeaders?: Record<string, string>;
}

/**
 * TileLayerHeaders extends Leaflet's TileLayer to allow custom headers in tile requests.
 */
export default class TileLayerHeaders extends L.TileLayer {
  /**
   * Extended options including custom headers.
   */
  declare options: TileLayerHeadersOptions;

  /**
   * Creates an instance of TileLayerHeaders.
   * @param urlTemplate - The URL template for fetching tiles.
   * @param options - Tile layer options including custom headers.
   */
  constructor(urlTemplate: string, options: TileLayerHeadersOptions) {
    super(urlTemplate, options);
  }

  /**
   * Creates a tile element and fetches the tile image with custom headers.
   * @param coords - Tile coordinates.
   * @param done - Callback function to signal completion.
   * @returns The created HTMLImageElement.
   */
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
        const objectUrl = URL.createObjectURL(blob);
        tile.src = objectUrl;
        tile.onload = () => URL.revokeObjectURL(objectUrl);
        tile.onerror = () => URL.revokeObjectURL(objectUrl);
        done(undefined, tile);
      })
      .catch(error => done(error, undefined));

    return tile;
  }
}
