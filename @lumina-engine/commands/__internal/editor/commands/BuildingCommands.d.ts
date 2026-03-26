import { Vector3 } from "three";
import { Command } from "./Command";
import { GridSystem, BlockType, Rotation } from "../core/grid";
/**
 * Add a new building block to a GridSystem at a snapped world position
 */
export declare class AddBlockCommand extends Command {
    grid?: GridSystem;
    blockType?: BlockType;
    position?: Vector3;
    rotation: Rotation;
    readonly type = "AddBlockCommand";
    constructor(grid?: GridSystem, blockType?: BlockType, position?: Vector3, rotation?: Rotation);
    private createdBlock?;
    init(): Promise<void>;
    execute(): Promise<void>;
    undo(): void;
    update(): void;
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
    }>>;
    fromJSON(json: any): Promise<void>;
}
/**
 * Remove an existing block from a GridSystem by id
 */
export declare class RemoveBlockCommand extends Command {
    grid?: GridSystem;
    blockId?: string;
    readonly type = "RemoveBlockCommand";
    constructor(grid?: GridSystem, blockId?: string);
    private cached?;
    init(): Promise<void>;
    execute(): Promise<void>;
    undo(): Promise<void>;
    update(): void;
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
    }>>;
    fromJSON(json: any): Promise<void>;
}
/**
 * Rotate an existing block in 90-degree steps
 */
export declare class RotateBlockCommand extends Command {
    grid?: GridSystem;
    blockId?: string;
    newRotation: Rotation;
    readonly type = "RotateBlockCommand";
    constructor(grid?: GridSystem, blockId?: string, newRotation?: Rotation);
    private oldRotation;
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(): void;
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
    }>>;
    fromJSON(json: any): Promise<void>;
}
/**
 * Extrude multiple blocks in a direction
 */
export declare class ExtrudeBlocksCommand extends Command {
    grid?: GridSystem;
    blockType?: BlockType;
    start?: Vector3;
    rotation: Rotation;
    steps: number;
    flip: boolean;
    slideOffset: number;
    readonly type = "ExtrudeBlocksCommand";
    constructor(grid?: GridSystem, blockType?: BlockType, start?: Vector3, rotation?: Rotation, steps?: number, flip?: boolean, slideOffset?: number);
    private array?;
    private createdIds;
    init(): Promise<void>;
    execute(): Promise<void>;
    undo(): Promise<void>;
    update(): void;
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
    }>>;
    fromJSON(json: any): Promise<void>;
}
/**
 * Draw a line of blocks from start to end
 */
export declare class DrawLineBlocksCommand extends Command {
    grid?: GridSystem;
    blockType?: BlockType;
    start?: Vector3;
    end?: Vector3;
    rotation: Rotation;
    readonly type = "DrawLineBlocksCommand";
    constructor(grid?: GridSystem, blockType?: BlockType, start?: Vector3, end?: Vector3, rotation?: Rotation);
    private array?;
    private _createdIds;
    init(): Promise<void>;
    execute(): Promise<void>;
    private computeLinePositions;
    undo(): Promise<void>;
    update(): void;
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
    }>>;
    fromJSON(json: any): Promise<void>;
}
/**
 * Draw a rectangle of blocks (filled or hollow)
 */
export declare class DrawRectangleBlocksCommand extends Command {
    grid?: GridSystem;
    blockType?: BlockType;
    start?: Vector3;
    end?: Vector3;
    rotation: Rotation;
    fill: boolean;
    readonly type = "DrawRectangleBlocksCommand";
    constructor(grid?: GridSystem, blockType?: BlockType, start?: Vector3, end?: Vector3, rotation?: Rotation, fill?: boolean);
    private array?;
    private createdIds;
    init(): Promise<void>;
    execute(): Promise<void>;
    private computeRectanglePositions;
    undo(): Promise<void>;
    update(): void;
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
    }>>;
    fromJSON(json: any): Promise<void>;
}
/**
 * Remove all blocks in an area
 */
export declare class RemoveAreaBlocksCommand extends Command {
    grid?: GridSystem;
    start?: Vector3;
    end?: Vector3;
    readonly type = "RemoveAreaBlocksCommand";
    constructor(grid?: GridSystem, start?: Vector3, end?: Vector3);
    private array?;
    private removedIds;
    init(): Promise<void>;
    execute(): Promise<void>;
    private findBlocksInArea;
    undo(): Promise<void>;
    update(): void;
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
    }>>;
    fromJSON(json: any): Promise<void>;
}
