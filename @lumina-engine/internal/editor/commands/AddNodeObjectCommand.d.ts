import { NodeObject, type NodeEditorMeta } from "../components/dynamic/NodeEditor/data";
import { Command } from "./Command";
declare class AddNodeObjectCommand extends Command {
    node: NodeObject;
    readonly type = "AddNodeObjectCommand";
    constructor(node: NodeObject);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: AddNodeObjectCommand): void;
    fromJSON(json: Awaited<ReturnType<Command["toJSON"]>> & {
        meta: NodeEditorMeta;
        node: string;
    }): Promise<void>;
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
        meta: NodeEditorMeta;
        node: string;
    }>;
}
export { AddNodeObjectCommand };
