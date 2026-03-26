import { Vector2 } from "three";
import { CustomObject3D } from "./CustomObject3D";
export declare const SpawnPointObjectIcon: Required<CustomObject3D>["icon"];
export declare enum SpawnPointObjectFlags {
    random = 0,
    preferred = 1
}
export declare class SpawnPointObject extends CustomObject3D {
    static type: string;
    readonly type: string;
    readonly icon: [name: string, color?: string];
    team: number;
    camera: Vector2;
    flag: SpawnPointObjectFlags;
    delay: number;
    constructor();
    init(): void;
    toJSON(): {
        team: number;
        camera: import("three").Vector2Tuple;
        flag: SpawnPointObjectFlags;
        delay: number;
        metadata?: {
            version: number;
            type: string;
            generator: string;
        };
        object: import("three").Object3DJSONObject;
    };
    fromJSON(json: ReturnType<this["toJSON"]>): void;
}
