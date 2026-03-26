import type { ScriptObject } from "../objects";
import { Command } from "./Command";
export declare class SetScriptMapValueCommand extends Command {
    object: ScriptObject;
    mapId: string;
    attributeName: string;
    newValue: Command["newValue"];
    readonly type = "SetScriptMapValueCommand";
    updatable: boolean;
    constructor(object: ScriptObject, mapId: string, attributeName: string, newValue: Command["newValue"]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetScriptMapValueCommand): void;
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
        mapId: string;
    }>;
    fromJSON(json: Awaited<ReturnType<SetScriptMapValueCommand["toJSON"]>>): Promise<void>;
}
export declare class ClearScriptMapCommand extends Command {
    object: ScriptObject;
    mapId: string;
    readonly type = "ClearScriptMapCommand";
    updatable: boolean;
    oldMap: Array<[string, any]>;
    newMap: Array<[string, any]>;
    constructor(object: ScriptObject, mapId: string);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: ClearScriptMapCommand): void;
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
        mapId: string;
        oldMap: Array<[string, any]>;
        newMap: Array<[string, any]>;
    }>;
    fromJSON(json: Awaited<ReturnType<ClearScriptMapCommand["toJSON"]>>): Promise<void>;
}
