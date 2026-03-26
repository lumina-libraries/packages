import { Bone, SkinnedMesh, Vector3 } from "three";
import { type InverseKinematicsTarget, type InverseKinematicsTargetTuple, type InverseKinematicsTargetLink, type InverseKinematicsTargetLinkTuple, InverseKinematicsManager } from "../core/adapters/engine/InverseKinematicsManager";
import { Command } from "./Command";
export declare abstract class IKCommand extends Command {
    object: SkinnedMesh;
    updatable: boolean;
    update(command: IKCommand): void;
    constructor(object: SkinnedMesh);
    get ik(): InverseKinematicsManager;
    create(): void;
}
export declare class AddIKTargetCommand extends IKCommand {
    target: InverseKinematicsTarget;
    readonly type = "AddIKTargetCommand";
    constructor(object: SkinnedMesh, target: InverseKinematicsTarget);
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
        target: InverseKinematicsTargetTuple;
    }>;
    fromJSON(json: Awaited<ReturnType<Command["toJSON"]>> & {
        target: InverseKinematicsTargetTuple;
    }): Promise<void>;
}
export declare class AddIKTargetLinkCommand extends IKCommand {
    targetIndex: number;
    link: InverseKinematicsTargetLink;
    readonly type = "AddIKTargetLinkCommand";
    constructor(object: SkinnedMesh, targetIndex: number, link: InverseKinematicsTargetLink);
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
        target: number;
        link: InverseKinematicsTargetLinkTuple;
    }>;
    fromJSON(json: Awaited<ReturnType<Command["toJSON"]>> & {
        target: number;
        link: InverseKinematicsTargetLinkTuple;
    }): Promise<void>;
}
export declare class RemoveIKTargetCommand extends IKCommand {
    targetIndex: number;
    readonly type = "RemoveIKTargetCommand";
    target: InverseKinematicsTarget | undefined;
    constructor(object: SkinnedMesh, targetIndex: number);
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
        target?: InverseKinematicsTargetTuple;
        targetIndex: number;
    }>;
    fromJSON(json: Awaited<ReturnType<RemoveIKTargetCommand["toJSON"]>>): Promise<void>;
}
export declare class RemoveIKTargetLinkCommand extends IKCommand {
    targetIndex: number;
    linkIndex: number;
    readonly type = "RemoveIKTargetLinkCommand";
    get target(): InverseKinematicsTarget;
    constructor(object: SkinnedMesh, targetIndex: number, linkIndex: number);
    link: InverseKinematicsTargetLink | undefined;
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
        target: number;
        link?: InverseKinematicsTargetLinkTuple;
        linkIndex: number;
    }>;
    fromJSON(json: Awaited<ReturnType<this["toJSON"]>>): Promise<void>;
}
export declare class SetIKTargetValueCommand extends IKCommand {
    targetIndex: number;
    attributeName: string;
    newValue: Command["newValue"];
    readonly type = "SetIKTargetValueCommand";
    get target(): InverseKinematicsTarget;
    constructor(object: SkinnedMesh, targetIndex: number, attributeName: string, newValue: Command["newValue"]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetIKTargetValueCommand): void;
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
        target: number;
    }>;
    fromJSON(json: Awaited<ReturnType<this["toJSON"]>>): Promise<void>;
}
export declare class SetIKLinkBoneCommand extends IKCommand {
    attributeName: string;
    targetIndex: number;
    linkIndex: number;
    newBone: Bone;
    readonly type = "SetIKLinkBoneCommand";
    get target(): InverseKinematicsTarget;
    oldBone: Bone | undefined;
    oldValue: string | undefined;
    constructor(object: SkinnedMesh, attributeName: string, targetIndex: number, linkIndex: number, newBone: Bone);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetIKLinkBoneCommand): void;
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
        target: number;
        link: number;
    }>;
    fromJSON(json: Awaited<ReturnType<Command["toJSON"]>> & {
        target: number;
        link: number;
    }): Promise<void>;
}
export declare class SetIkTargetVectorCommand extends IKCommand {
    targetIndex: number;
    attributeName: string;
    newVector: Vector3;
    readonly type = "SetIkTargetVectorCommand";
    constructor(object: SkinnedMesh, targetIndex: number, attributeName: string, newVector: Vector3);
    get target(): InverseKinematicsTarget;
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: SetIkTargetVectorCommand): void;
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
        target: number;
    }>;
    fromJSON(json: Awaited<ReturnType<Command["toJSON"]>> & {
        target: number;
    }): Promise<void>;
}
export declare class SetIkTargetLinkValueCommand extends IKCommand {
    targetIndex: number;
    linkIndex: number;
    attributeName: string;
    newValue: Command["newValue"];
    readonly type = "SetIkTargetLinkValueCommand";
    get target(): InverseKinematicsTarget;
    constructor(object: SkinnedMesh, targetIndex: number, linkIndex: number, attributeName: string, newValue: Command["newValue"]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetIkTargetLinkValueCommand): void;
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
        target: number;
        link: number;
    }>;
    fromJSON(json: Awaited<ReturnType<this["toJSON"]>>): Promise<void>;
}
export declare class SetIkTargetLinkVectorCommand extends IKCommand {
    targetIndex: number;
    linkIndex: number;
    attributeName: string;
    newVector: Vector3;
    readonly type = "SetIkTargetLinkVectorCommand";
    get target(): InverseKinematicsTarget;
    constructor(object: SkinnedMesh, targetIndex: number, linkIndex: number, attributeName: string, newVector: Vector3);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: SetIkTargetLinkVectorCommand): void;
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
        target: number;
        link: number;
    }>;
    fromJSON(json: Awaited<ReturnType<Command["toJSON"]>> & {
        target: number;
        link: number;
    }): Promise<void>;
}
export declare class SetIKTargetAngle extends SetIKTargetValueCommand {
    init(): Promise<void>;
    execute(): void;
    undo(): void;
}
export declare class SetIKTargetIndexCommand extends IKCommand {
    targetIndex: number;
    newValue: number;
    readonly type = "SetIKTargetIndexCommand";
    constructor(object: SkinnedMesh, targetIndex: number, newValue: number);
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
        target: number;
    }>;
    fromJSON(json: Awaited<ReturnType<this["toJSON"]>>): Promise<void>;
}
export declare class SetIKTargetLinkIndexCommand extends IKCommand {
    targetIndex: number;
    linkIndex: number;
    newValue: number;
    readonly type = "SetIKTargetLinkIndexCommand";
    constructor(object: SkinnedMesh, targetIndex: number, linkIndex: number, newValue: number);
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
        target: number;
        link: number;
    }>;
    fromJSON(json: Awaited<ReturnType<this["toJSON"]>>): Promise<void>;
}
export declare class CreateIKCommand extends IKCommand {
    readonly type = "CreateIKCommand";
    constructor(object: SkinnedMesh);
    init(): Promise<void>;
    manager: InverseKinematicsManager | undefined;
    execute(): void;
    undo(): void;
}
export declare class RemoveIKCommand extends IKCommand {
    readonly type = "RemoveIKCommand";
    constructor(object: SkinnedMesh);
    init(): Promise<void>;
    manager: InverseKinematicsManager | undefined;
    execute(): void;
    undo(): void;
}
