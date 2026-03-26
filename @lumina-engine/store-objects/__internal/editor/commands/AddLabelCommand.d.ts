import type { LabelStyle } from "../../sandbox/types";
import { CSS2DObject } from "../../shared/addons/jsm/renderers/CSS2DRenderer";
import { Command } from "./Command";
import { Object3D } from "three";
export declare class CharacterLabel extends CSS2DObject {
    #private;
    object: Object3D;
    text?: string;
    textElement: HTMLElement;
    get style(): LabelStyle<any>;
    set style(style: LabelStyle<any>);
    constructor(object: Object3D, text?: string, style?: LabelStyle);
    update(): void;
    updateStyle(): void;
}
declare class AddLabelCommand extends Command {
    text: string;
    style?: LabelStyle;
    readonly type = "AddLabelCommand";
    label?: CharacterLabel;
    constructor(object: Object3D, text?: string, style?: LabelStyle);
    update(command: AddLabelCommand): void;
    init(): Promise<void>;
    undo(): void;
    execute(): void;
    fromJSON(json: Awaited<ReturnType<AddLabelCommand["toJSON"]>>): Promise<void>;
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
        style: AddLabelCommand["style"];
        text: AddLabelCommand["text"];
    }>;
}
declare class RemoveLabelCommand extends Command {
    label?: CharacterLabel;
    readonly type = "RemoveLabelCommand";
    constructor(label?: CharacterLabel);
    init(): Promise<void>;
    update(command: RemoveLabelCommand): void;
    execute(): void;
    undo(): void;
    fromJSON(json: Awaited<ReturnType<RemoveLabelCommand["toJSON"]>>): Promise<void>;
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
        label: {
            uuid: string;
        };
    }>;
}
declare class SetLabelValueCommand extends Command {
    label: CharacterLabel;
    readonly type = "SetLabelValueCommand";
    constructor(label: CharacterLabel, attributeName: string, newValue: Command["newValue"]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetLabelValueCommand): void;
}
declare class SetLabelStyleCommand extends Command {
    label: CharacterLabel;
    style: LabelStyle;
    readonly type = "SetLabelStyleCommand";
    oldStyle?: LabelStyle;
    constructor(label: CharacterLabel, style: LabelStyle);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetLabelStyleCommand): void;
    toJSON(): any;
    fromJSON(json: Awaited<ReturnType<SetLabelStyleCommand["toJSON"]>>): Promise<void>;
}
export { AddLabelCommand, RemoveLabelCommand, SetLabelValueCommand, SetLabelStyleCommand, };
