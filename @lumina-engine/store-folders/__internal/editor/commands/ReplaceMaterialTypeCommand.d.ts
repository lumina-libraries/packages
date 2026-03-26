import { type Materials, MaterialType } from "../core/adapters/engine/StoreAdapter";
import { ArrayCommand } from "./ArrayCommand";
import { Command } from "./Command";
export declare class ReplaceMaterialTypeCommand extends Command {
    material: Materials;
    materialType: keyof typeof MaterialType;
    readonly type = "ReplaceMaterialTypeCommand";
    updatable: boolean;
    array?: ArrayCommand;
    constructor(material: Materials, materialType: keyof typeof MaterialType);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: ReplaceMaterialTypeCommand): void;
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
        materialType: keyof typeof MaterialType;
    }>;
    fromJSON(json: Awaited<ReturnType<ReplaceMaterialTypeCommand["toJSON"]>>): Promise<void>;
}
