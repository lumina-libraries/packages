import { Command } from "./Command";
import type { EnvironmentTimePreset } from "../../shared/engine/EnvironmentScene";
export declare class SetTimePresetValueCommand extends Command {
    presetId: string;
    key: "name" | "time";
    newValue: Command["newValue"];
    readonly type = "SetTimePresetValueCommand";
    updatable: boolean;
    constructor(presetId: string, key: "name" | "time", newValue: Command["newValue"]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: SetTimePresetValueCommand): void;
}
export declare class SetTimePresetParameterValueCommand extends Command {
    presetId: string;
    parameter: "sky" | "csm" | "fog" | "lpv";
    key: string;
    newValue: Command["newValue"];
    readonly type = "SetTimePresetParameterValueCommand";
    updatable: boolean;
    constructor(presetId: string, parameter: "sky" | "csm" | "fog" | "lpv", key: string, newValue: Command["newValue"]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: SetTimePresetParameterValueCommand): void;
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
        parameter: "sky" | "csm" | "fog" | "lpv";
        key: string;
        presetId: string;
    }>;
}
export declare class RemoveTimePresetCommand extends Command {
    presetId: string;
    readonly type = "RemoveTimePresetCommand";
    private oldPreset;
    constructor(presetId: string);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: RemoveTimePresetCommand): void;
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
        presetId: string;
        oldPreset?: EnvironmentTimePreset | null;
    }>;
    fromJSON(json: Awaited<ReturnType<Command["toJSON"]>> & {
        presetId: string;
        oldPreset?: EnvironmentTimePreset | null;
    }): Promise<void>;
}
export declare class AddTimePresetCommand extends Command {
    presetName: string;
    preset?: EnvironmentTimePreset;
    readonly type = "AddTimePresetCommand";
    constructor(presetName: string, preset?: EnvironmentTimePreset);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: AddTimePresetCommand): void;
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
        presetName: string;
        preset?: EnvironmentTimePreset;
    }>;
    fromJSON(json: Awaited<ReturnType<Command["toJSON"]>> & {
        presetName: string;
        preset?: EnvironmentTimePreset;
    }): Promise<void>;
}
