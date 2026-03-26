import { Bone, Box3, BoxGeometry, InstancedMesh, MeshBasicMaterial, Object3D, Vector3, Mesh, Color, SphereGeometry } from "three";
import MeshHelper from "./MeshHelper";
export declare class SkeletonHelperFragment extends Box3 {
    template: Mesh<import("three").BufferGeometry<import("three").NormalBufferAttributes, import("three").BufferGeometryEventMap>, import("three").Material | import("three").Material[], import("three").Object3DEventMap>;
    bone: Bone;
    start: Vector3;
    end: Vector3;
    index: number;
    color: Color;
    constructor();
}
export declare class SkeletonHelper extends MeshHelper {
    object: Object3D;
    head: Bone;
    /** Gets all the bones from an object */
    static getBones(object: Object3D, head?: Bone): Bone[];
    geometry: BoxGeometry;
    material: MeshBasicMaterial;
    sphereGeometry: SphereGeometry;
    sphereMaterial: MeshBasicMaterial;
    instance: InstancedMesh;
    sphereInstance: InstancedMesh;
    bones: Bone[];
    boxes: SkeletonHelperFragment[];
    render: boolean;
    constructor(object: Object3D);
    target: Object3D;
    set(target: Object3D): void;
    colliders: Set<SkeletonHelperFragment>;
    updateInstance(): void;
    updateColliders(): void;
    update(): void;
    updatePosition(box: SkeletonHelperFragment): void;
}
