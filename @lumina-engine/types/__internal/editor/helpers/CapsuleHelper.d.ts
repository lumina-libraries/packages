import { BufferGeometry, LineBasicMaterial, LineSegments, Object3D, type Vector3 } from "three";
export interface CapsuleLike {
    radius: number;
    height: number;
    center: Vector3;
}
export declare class CapsuleHelper extends Object3D {
    capsule: CapsuleLike;
    line?: LineSegments<BufferGeometry, LineBasicMaterial>;
    constructor(capsule: CapsuleLike);
    isEmpty(): boolean;
    updateMatrixWorld(force?: boolean): void;
    private updateMorph;
}
