import { Command } from "./Command";
import type { Object3D } from "three";
declare class AddObjectCommand extends Command {
    object: Object3D;
    recursive: boolean;
    toCursor: boolean;
    attach: boolean;
    readonly type = "AddObjectCommand";
    constructor(object: Object3D, recursive?: boolean, toCursor?: boolean, attach?: boolean);
    update(command: AddObjectCommand): void;
    init(): Promise<void>;
    execute(): void;
    undo(): void;
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
        attach: boolean;
    }>;
    fromJSON(json: Awaited<ReturnType<Command["toJSON"]>> & {
        attach: boolean;
    }): Promise<void>;
}
export { AddObjectCommand };
