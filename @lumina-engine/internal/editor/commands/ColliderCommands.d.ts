import type { Vector2, Vector3 } from "three";
import { ColliderAdapter, ColliderObject } from "../core/adapters/engine/ColliderAdapter";
import { Command } from "./Command";
export declare class AddColliderCommand extends Command {
    collider: ColliderObject | ColliderAdapter;
    colliderParent?: ColliderObject;
    type: string;
    constructor(collider: ColliderObject | ColliderAdapter, colliderParent?: ColliderObject);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: AddColliderCommand): void;
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
        collider: ReturnType<ColliderObject["toJSON"]>;
        colliderParentUuid?: string;
    }>;
    fromJSON(json: Awaited<ReturnType<AddColliderCommand["toJSON"]>>): Promise<void>;
}
export declare class RemoveColliderCommand extends Command {
    collider?: ColliderObject;
    type: string;
    colliderParent?: ColliderObject;
    constructor(collider?: ColliderObject);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: RemoveColliderCommand): void;
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
        colliderUuid?: string;
    }>;
    fromJSON(json: Awaited<ReturnType<RemoveColliderCommand["toJSON"]>>): Promise<void>;
}
export declare class SetColliderValueCommand extends Command {
    collider: ColliderObject;
    attributeName: string;
    newValue: Command["newValue"];
    type: string;
    constructor(collider: ColliderObject, attributeName: string, newValue: Command["newValue"]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetColliderValueCommand): void;
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
        attributeName: string;
        colliderUuid: string;
    }>;
    fromJSON(json: Awaited<ReturnType<SetColliderValueCommand["toJSON"]>>): Promise<void>;
}
export declare class SetColliderVectorCommand extends SetColliderValueCommand {
    collider: ColliderObject;
    attributeName: string;
    newVector: Vector3 | Vector2;
    oldVector?: Vector3 | Vector2;
    readonly type = "SetColliderVectorCommand";
    constructor(collider: ColliderObject, attributeName: string, newVector: Vector3 | Vector2, oldVector?: Vector3 | Vector2);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
}
export declare class SetColliderIndexCommand extends Command {
    collider: ColliderObject;
    colliderParent: ColliderObject;
    targetIndex: number;
    newValue: number;
    readonly type = "SetColliderIndexCommand";
    constructor(collider: ColliderObject, colliderParent: ColliderObject, targetIndex: number, newValue: number);
    update(command: SetColliderIndexCommand): void;
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
        colliderUuid: string;
        coliderParentUuid: string;
    }>;
    fromJSON(json: Awaited<ReturnType<Command["toJSON"]>> & {
        target: number;
        colliderUuid: string;
        coliderParentUuid: string;
    }): Promise<void>;
}
