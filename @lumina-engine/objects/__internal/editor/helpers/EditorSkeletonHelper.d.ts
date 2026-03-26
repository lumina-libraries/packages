import { LineSegments, Bone, Object3D } from "three";
declare class SkeletonHelper extends LineSegments {
    root: Object3D;
    bones: Bone[];
    create(): void;
    constructor(root: Object3D);
    updateMatrixWorld(force: boolean): void;
    dispose(): void;
}
export { SkeletonHelper as EditorSkeletonHelper };
