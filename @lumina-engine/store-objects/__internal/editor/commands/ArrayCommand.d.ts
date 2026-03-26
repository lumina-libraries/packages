import { Command } from "./Command";
declare class ArrayCommand extends Command {
    list: Command[];
    type: string;
    constructor(list?: Command[], name?: string);
    update(command: ArrayCommand): void;
    init(_editor?: Client, recursive?: boolean): Promise<void>;
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
        maps?: Array<Maps[]>;
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
        list: Awaited<ReturnType<Command["toJSON"]>>[];
    }>;
    fromJSON(json: Awaited<ReturnType<ArrayCommand["toJSON"]>>): Promise<void>;
}
import { Object3D } from "three";
import type Client from "../core/Client";
import { Maps } from "../../sandbox/types";
declare class AddSceneCommand extends ArrayCommand {
    sceneObject?: Object3D;
    toCursor: boolean;
    type: string;
    name: string;
    materials: string[];
    geometries: string[];
    map: string[];
    constructor(sceneObject?: Object3D, toCursor?: boolean);
    getSceneData(scene: Object3D): {
        materials: string[];
        geometries: string[];
        maps: string[];
    };
    undo(): void;
    execute(): void;
    update(command: AddSceneCommand): void;
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
        maps?: Array<Maps[]>;
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
        list: Awaited<ReturnType<Command["toJSON"]>>[];
    } & {
        materials: string[];
        geometries: string[];
        map: string[];
    }>;
    fromJSON(json: any): Promise<void>;
}
export { ArrayCommand, AddSceneCommand };
