import type { StoreObject } from "../core/adapters/engine/StoreAdapter";
import type { StoreFolderAdapter } from "../core/adapters/engine/StoreFolderAdapter";
import { Command } from "./Command";
export declare class RenameFolderCommand extends Command {
    folder: StoreFolderAdapter;
    newValue: string;
    readonly type = "RenameFolderCommand";
    constructor(folder: StoreFolderAdapter, newValue: string);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: RenameFolderCommand): void;
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
        folder: string;
    }>;
    fromJSON(json: Awaited<ReturnType<RenameFolderCommand["toJSON"]>>): Promise<void>;
}
export declare class RemoveFolderCommand extends Command {
    folder: StoreFolderAdapter;
    readonly type = "RemoveFolderCommand";
    constructor(folder: StoreFolderAdapter);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: RemoveFolderCommand): void;
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
        folder: string;
    }>;
    fromJSON(json: Awaited<ReturnType<RemoveFolderCommand["toJSON"]>>): Promise<void>;
}
export declare class AddFolderCommand extends Command {
    folder: StoreFolderAdapter;
    readonly type = "AddFolderCommand";
    constructor(folder: StoreFolderAdapter);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: AddFolderCommand): void;
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
        folder: string;
    }>;
    fromJSON(json: Awaited<ReturnType<AddFolderCommand["toJSON"]>>): Promise<void>;
}
declare enum ChildType {
    Object = 0,
    Folder = 1
}
export declare class AddFolderChildCommand extends Command {
    folder: StoreFolderAdapter;
    child: StoreObject | StoreFolderAdapter;
    readonly type = "AddFolderChildCommand";
    constructor(folder: StoreFolderAdapter, child: StoreObject | StoreFolderAdapter);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: AddFolderChildCommand): void;
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
        folder: string;
        child: string;
        childType: ChildType;
    }>;
    fromJSON(json: Awaited<ReturnType<AddFolderChildCommand["toJSON"]>>): Promise<void>;
}
export declare class RemoveFolderChildCommand extends Command {
    folder: StoreFolderAdapter;
    child: StoreObject | StoreFolderAdapter;
    readonly type = "RemoveFolderChildCommand";
    constructor(folder: StoreFolderAdapter, child: StoreObject | StoreFolderAdapter);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: RemoveFolderChildCommand): void;
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
        folder: string;
        child: string;
        childType: ChildType;
    }>;
    fromJSON(json: Awaited<ReturnType<RemoveFolderChildCommand["toJSON"]>>): Promise<void>;
}
export {};
