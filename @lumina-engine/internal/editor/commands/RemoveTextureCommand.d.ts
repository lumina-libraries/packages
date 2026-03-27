import { Command } from "./Command";
import type { Texture } from "three";
import type { StoreFolderAdapter } from "../core/adapters/engine/StoreFolderAdapter";
declare class RemoveTextureCommand extends Command {
    texture: Texture;
    type: string;
    folder: StoreFolderAdapter | null | undefined;
    constructor(texture: Texture);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: RemoveTextureCommand): void;
    toJSON(): Promise<Partial<{
        type: string;
        id: string;
        name: string;
        recursive: boolean;
        materialUuid?: string;
        textureUuid?: string;
        parentUuid?: string;
        objectUuid?: string;
        geometryUuid?: string;
        ownersUuid?: string[];
        animationUuid?: string;
        scene?: string;
        attributeName?: string;
        oldValue?: Command["oldValue"];
        newValue?: Command["oldValue"];
        oldColor?: [r: number, g: number, b: number];
        newColor?: [r: number, g: number, b: number];
        maps?: Array<import("../../sandbox/types").Maps[]>;
        images?: Record<string, import("three").SourceJSON>;
        texture?: import("three").TextureJSON;
        object?: import("three").Object3DJSON & Partial<import("three").JSONMeta>;
        material?: import("three").MaterialJSON;
        geometry?: import("three").BufferGeometryJSON;
        sourceUuid: string;
        source: {
            uuid: string;
            images: Record<string, import("three").SourceJSON>;
        };
        animation: import("three").AnimationClipJSON;
    }> & {
        folder?: string;
    }>;
    fromJSON(json: Awaited<ReturnType<this["toJSON"]>>): Promise<void>;
}
export { RemoveTextureCommand };
