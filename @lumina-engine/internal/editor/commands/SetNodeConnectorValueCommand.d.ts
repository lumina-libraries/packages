import { type Vector2Tuple, type Vector3Tuple } from "three";
import { Command } from "./Command";
import { ConnectorObject, ConnectorObjectValueType } from "../components/dynamic/NodeEditor/data";
type T = string | number | boolean | Vector2Tuple | Vector3Tuple;
declare class SetNodeConnectorValueCommand extends Command {
    connector?: ConnectorObject;
    newValue: T | undefined;
    readonly type = "SetNodeConnectorValueCommand";
    updatable: boolean;
    oldValue: T | undefined;
    constructor(connector?: ConnectorObject, newValue?: T | undefined);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetNodeConnectorValueCommand): void;
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
        connector?: string;
    }>;
    fromJSON(json: Awaited<ReturnType<SetNodeConnectorValueCommand["toJSON"]>>): Promise<void>;
}
declare class SetNodeConnectorNameCommand extends Command {
    connector?: ConnectorObject;
    newValue: string;
    readonly type = "SetNodeConnectorNameCommand";
    updatable: boolean;
    oldValue: string;
    constructor(connector?: ConnectorObject, newValue?: string);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetNodeConnectorNameCommand): void;
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
        connector?: string;
    }>;
    fromJSON(json: Awaited<ReturnType<SetNodeConnectorNameCommand["toJSON"]>>): Promise<void>;
}
declare class SetNodeConnectorValueTypeCommand extends Command {
    connector?: ConnectorObject;
    newValue: ConnectorObjectValueType;
    readonly type = "SetNodeConnectorValueTypeCommand";
    updatable: boolean;
    oldValue: ConnectorObjectValueType;
    constructor(connector?: ConnectorObject, newValue?: ConnectorObjectValueType);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetNodeConnectorValueTypeCommand): void;
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
        connector?: string;
    }>;
    fromJSON(json: Awaited<ReturnType<SetNodeConnectorValueTypeCommand["toJSON"]>>): Promise<void>;
}
export { SetNodeConnectorValueCommand, SetNodeConnectorNameCommand, SetNodeConnectorValueTypeCommand };
