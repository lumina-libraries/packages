import { CanvasTexture, type AnimationActionLoopStyles } from "three";
import type { FileSource } from "../core/adapters/engine/StoreAdapter";
export declare class TileTexture extends CanvasTexture {
    imageFileSource?: FileSource<Blob>;
    readonly canvas: HTMLCanvasElement;
    private static globalStartTime;
    isTileTexture: boolean;
    firstFrame: number;
    lastFrame: number;
    frame: number;
    columns: number;
    rows: number;
    fps: number;
    repetitions: number;
    loopMode: AnimationActionLoopStyles;
    fadeTime: number;
    width: number;
    height: number;
    imageSourceElement: HTMLImageElement;
    constructor(imageFileSource?: FileSource<Blob>, canvas?: HTMLCanvasElement);
    load(): Promise<void>;
    update(time?: number): void;
    toJSON(meta?: any): any;
    fromJSON(json: any, meta: {
        files: Record<string, FileSource>;
    }): this;
}
