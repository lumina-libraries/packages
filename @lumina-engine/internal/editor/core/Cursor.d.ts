import { Vector3, Camera, Object3D, Sprite } from "three";
export declare class Cursor extends Object3D {
    readonly camera: Camera;
    distance: number;
    setFromPointer(pointer: number[]): void;
    setFromPoint(point: Vector3): void;
    sprite: Sprite;
    constructor(camera: Camera);
    toJSON(): any;
    fromJSON(json: {
        distance: number;
        position: Vector3Tuple;
    }): void;
}
