import { LineSegments } from "three";
declare class BoneHelper extends LineSegments {
    constructor(bone: any);
    updateMatrixWorld(force: any): void;
    dispose(): void;
    update(): void;
}
export { BoneHelper };
