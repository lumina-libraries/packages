import type { Color, Vector2, Vector3 } from "three";
import type { EnvironmentParameters } from "../../shared/engine/EnvironmentScene";
import { Command } from "./Command";
export declare class SetEnvironmentSceneValueCommand extends Command {
    target: keyof EnvironmentParameters;
    attributeName: string;
    newValue: Command["newValue"];
    type: string;
    updatable: boolean;
    constructor(target: keyof EnvironmentParameters, attributeName: string, newValue: Command["newValue"]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: SetEnvironmentSceneValueCommand): void;
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
        target: keyof EnvironmentParameters;
    }>;
    fromJSON(json: Awaited<ReturnType<Command["toJSON"]>> & {
        target: keyof EnvironmentParameters;
    }): Promise<void>;
}
export declare class SetEnvironmentSceneVectorCommand extends SetEnvironmentSceneValueCommand {
    target: keyof EnvironmentParameters;
    attributeName: string;
    newVector: Vector2 | Vector3;
    readonly type = "SetEnvironmentSceneVectorCommand";
    constructor(target: keyof EnvironmentParameters, attributeName: string, newVector: Vector2 | Vector3);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
}
export declare class SetEnvironmentSceneColorCommand extends SetEnvironmentSceneValueCommand {
    target: keyof EnvironmentParameters;
    attributeName: string;
    newColor: Color;
    readonly type = "SetEnvironmentSceneColorCommand";
    constructor(target: keyof EnvironmentParameters, attributeName: string, newColor: Color);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
}
