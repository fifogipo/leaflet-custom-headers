import * as L from "leaflet";
import { DoneCallback } from "leaflet";
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
export declare class TileLayerHeaders extends L.TileLayer {
    /**
     * Extended options including custom headers.
     */
    options: TileLayerHeadersOptions;
    /**
     * Creates an instance of TileLayerHeaders.
     * @param urlTemplate - The URL template for fetching tiles.
     * @param options - Tile layer options including custom headers.
     */
    constructor(urlTemplate: string, options: TileLayerHeadersOptions);
    /**
     * Creates a tile element and fetches the tile image with custom headers.
     * @param coords - Tile coordinates.
     * @param done - Callback function to signal completion.
     * @returns The created HTMLImageElement.
     */
    createTile(coords: L.Coords, done: DoneCallback): HTMLImageElement;
}
