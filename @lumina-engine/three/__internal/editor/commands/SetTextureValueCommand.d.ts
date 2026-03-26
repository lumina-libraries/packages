import { Source, Texture, Vector2, Vector3 } from "three";
import type { FileSource, Textures } from "../core/adapters/engine/StoreAdapter";
import { Command } from "./Command";
export declare class SetTextureValueCommand extends Command {
    type: string;
    constructor(texture: Textures, attributeName: string, newValue: Command["newValue"]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetTextureValueCommand): void;
    updateOwners(): void;
}
export declare class RenameTextureCommand extends SetTextureValueCommand {
    constructor(texture: any, newValue: string);
    init(): Promise<void>;
}
export type MediaElement = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;
export declare class SetTextureImageCommand extends SetTextureValueCommand {
    newImage: FileSource;
    type: string;
    constructor(texture: Texture, newImage: FileSource);
    init(): Promise<void>;
    static getImage(source: FileSource): Promise<HTMLImageElement | void>;
    execute(): Promise<void>;
    undo(): Promise<void>;
    fromJSON(json: any): Promise<void>;
}
export declare class SetTextureVectorCommand extends SetTextureValueCommand {
    newVector: Vector2 | Vector3;
    type: string;
    constructor(texture: Texture, attributeName: string, newVector: Vector2 | Vector3);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
}
export declare class SetTextureSourceCommand extends SetTextureValueCommand {
    newSource: Source;
    type: string;
    oldSource?: Source;
    constructor(texture: Texture, newSource: Source);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    fromJSON(json: any): Promise<void>;
}
