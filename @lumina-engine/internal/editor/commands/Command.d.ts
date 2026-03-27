import { Object3D, Material, Color, Texture, BufferGeometry, Source, AnimationClip, type SourceJSON, type TextureJSON, type MaterialJSON, type Object3DJSON, type BufferGeometryJSON, type AnimationClipJSON, type JSONMeta } from "three";
import type Client from "../core/Client";
import type { User } from "../events/ShareEvent";
import type { StoreObject } from "../core/adapters/engine/StoreAdapter";
import StoreAdapter from "../core/adapters/engine/StoreAdapter";
import type { SharedGameManager } from "../../shared/managers/SharedGameManager";
import { Maps } from "../../sandbox/types";
import type { EnvironmentScene } from "../../shared/engine/EnvironmentScene";
export interface EditorContext {
    scene?: Object3D;
    store: StoreAdapter;
    select(object?: Object3D): void;
    object(action: "add" | "remove", object: Object3D, parent?: boolean, recursive?: boolean, attach?: boolean): void;
    updateObject(options: {
        object?: Object3D;
        material?: Material;
        geometry?: BufferGeometry;
        texture?: Texture;
        animation?: AnimationClip;
    }): void;
    cursor?: Object3D;
    game?: SharedGameManager;
    environmentScene?: EnvironmentScene;
}
type Primitive = number | string | boolean;
/**
 * This is an abstract class that all commands should extend.
 * @param editor pointer to main editor object used to initialize
 *        each command object with a reference to the editor
 * @constructor
 */
declare abstract class Command extends EventTarget {
    recursive: boolean;
    abstract type: string;
    /**
     * Commands name, usually generated at the init() method
     * Used to display the command in the history panel and other places
     */
    name?: string;
    updatable: boolean;
    /**
     * Unique identifier for the command
     */
    id: string;
    /**
     * Scene name
     */
    scene: string;
    inMemory: boolean;
    object?: Object3D | null;
    parent?: Object3D | null;
    material?: Material | null;
    geometry?: BufferGeometry | null;
    texture?: Texture | null;
    owners?: StoreObject[] | null;
    maps: Array<Maps[]>;
    source?: Source | null;
    animation?: AnimationClip | null;
    attributeName?: string;
    oldValue?: Primitive | Array<Primitive> | null;
    newValue?: Primitive | Array<Primitive> | null;
    oldColor?: Color;
    newColor?: Color;
    /**
     * Execute the command
     */
    abstract execute?(): void;
    /**
     * Undo the command
     */
    abstract undo?(): void;
    /**
     * Update the command
     */
    abstract update?(cmd: Command): void;
    /**
     * Initialize the command (Called once)
     */
    abstract init?(editor?: Client): Promise<void>;
    json?: Awaited<ReturnType<this["toJSON"]>>;
    editor: EditorContext;
    /**
     * Where this command was executed from (For the online editor)
     */
    from?: User | null;
    constructor(recursive?: boolean);
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
        images?: Record<string, SourceJSON>;
        texture?: TextureJSON;
        object?: Object3DJSON & Partial<JSONMeta>;
        material?: MaterialJSON;
        geometry?: BufferGeometryJSON;
        sourceUuid: string;
        source: {
            uuid: string;
            images: Record<string, SourceJSON>;
        };
        animation: AnimationClipJSON;
    }>>;
    images: Record<string, Source>;
    fromJSON(json: Awaited<ReturnType<this["toJSON"]>>): Promise<void>;
    /** This function will validate the json schema, it will return arrays of errors, or none if the json is valid based on the command */
    validate(json: any): string[];
}
export { Command };
