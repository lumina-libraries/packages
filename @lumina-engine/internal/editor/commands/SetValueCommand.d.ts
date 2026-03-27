import { Light, Object3D, Vector2, Vector3 } from "three";
import { Command } from "./Command";
import type { FileSource } from "../core/adapters/engine/StoreAdapter";
declare class SetValueCommand extends Command {
    object: Object3D;
    attributeName: string;
    newValue: Command["newValue"];
    type: string;
    updatable: boolean;
    constructor(object: Object3D, attributeName: string, newValue: Command["newValue"]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetValueCommand): void;
}
declare class SetUserDataCommand extends Command {
    object: Object3D;
    newUserData: object;
    readonly type = "SetUserDataCommand";
    updatable: boolean;
    oldUserData: Record<string, any>;
    constructor(object: Object3D, newUserData: object);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetUserDataCommand): void;
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
        newUserData: Record<string, any>;
        oldUserData: Record<string, any>;
    }>;
    fromJSON(json: Awaited<ReturnType<SetUserDataCommand["toJSON"]>>): Promise<void>;
}
declare class RenameCommand extends SetValueCommand {
    readonly type = "RenameCommand";
    constructor(object: Object3D, newValue: string);
    init(): Promise<void>;
}
declare class SetLightShadowCameraValueCommand extends SetValueCommand {
    object: Light;
    attributeName: string;
    newValue: Command["newValue"];
    readonly type = "SetLightShadowCameraValueCommand";
    constructor(object: Light, attributeName: string, newValue: Command["newValue"]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetLightShadowCameraValueCommand): void;
}
declare class SetLightShadowValueCommand extends SetValueCommand {
    object: Light;
    attributeName: string;
    newValue: Command["newValue"];
    readonly type = "SetLightShadowValueCommand";
    constructor(object: Light, attributeName: string, newValue: Command["newValue"]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetLightShadowValueCommand): void;
}
declare class SetLightShadowVectorValueCommand extends SetValueCommand {
    object: Light;
    attributeName: string;
    newVector: Vector2 | Vector3;
    readonly type = "SetLightShadowVectorValueCommand";
    constructor(object: Light, attributeName: string, newVector: Vector2 | Vector3);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetLightShadowVectorValueCommand): void;
}
export declare class SetSourceCommand extends Command {
    object: Object3D;
    attributeName: string;
    newSource: FileSource;
    readonly type = "SetSourceCommand";
    oldSource: FileSource | null;
    constructor(object: Object3D, attributeName: string, newSource: FileSource);
    init(): Promise<void>;
    execute(): Promise<void>;
    undo(): Promise<void>;
    update(command: SetSourceCommand): void;
    fromJSON(json: any): Promise<void>;
}
export { SetValueCommand, RenameCommand, SetLightShadowCameraValueCommand, SetLightShadowValueCommand, SetLightShadowVectorValueCommand, SetUserDataCommand };
