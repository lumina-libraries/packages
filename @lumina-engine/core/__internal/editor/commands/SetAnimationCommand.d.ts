import type { AnimationClip, Object3D } from "three";
import { Command } from "./Command";
declare class SetAnimationCommand extends Command {
    object: Object3D;
    attributeName: string;
    newAnimations: AnimationClip[];
    type: string;
    oldAnimations?: AnimationClip[];
    constructor(object: Object3D, attributeName: string, newAnimations?: AnimationClip[]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetAnimationCommand): void;
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
export { SetAnimationCommand };
