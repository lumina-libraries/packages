import { Command } from "./Command";
import type { StoreObjectBody } from "../core/adapters/engine/StoreAdapter";
export declare class SetStoreObjectCommand<A extends keyof StoreObjectBody = keyof StoreObjectBody, B extends keyof StoreObjectBody[A] = keyof StoreObjectBody[A]> extends Command {
    uuid: string;
    storeObjectId: A;
    storeObjectKey: B;
    newStoreObjectValue: StoreObjectBody[A][B];
    readonly type = "SetStoreObjectCommand";
    updatable: boolean;
    oldStoreObjectValue?: StoreObjectBody[A][B];
    constructor(uuid: string, storeObjectId: A, storeObjectKey: B, newStoreObjectValue: StoreObjectBody[A][B]);
    get storeObject(): import("../core/adapters/engine/StoreAdapter").StoreObject;
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: SetStoreObjectCommand<A, B>): void;
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
        storeObjectId: A;
        storeObjectKey: B;
        newStoreObjectValue: StoreObjectBody[A][B];
        oldStoreObjectValue?: StoreObjectBody[A][B];
    }>;
    fromJSON(json: Awaited<ReturnType<Command["toJSON"]>> & {
        storeObjectId: A;
        storeObjectKey: B;
        newStoreObjectValue: StoreObjectBody[A][B];
        oldStoreObjectValue: StoreObjectBody[A][B];
    }): Promise<void>;
}
