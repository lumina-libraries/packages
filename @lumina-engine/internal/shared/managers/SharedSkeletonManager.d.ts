import { Player } from '../core/Player';
import { Bone, Box3, BoxGeometry, InstancedMesh, MeshBasicMaterial, Object3D, Vector3, Color } from "three";
export declare class SharedSkeletonManagerBox extends Box3 {
    bone?: Bone;
    start: Vector3;
    end: Vector3;
    color: Color;
    index?: number;
    constructor();
    get tags(): string[];
    get name(): string;
    get isSpine(): boolean;
    get categoryIndex(): number;
}
export declare class SharedSkeletonManager extends Object3D {
    render: boolean;
    head: Bone;
    hitbox: Box3;
    wizzBox: Box3;
    /** Gets all the bones from an object */
    static getBones(object: Object3D, head?: Bone): Bone[];
    geometry: BoxGeometry;
    material: MeshBasicMaterial;
    instance?: InstancedMesh;
    bones: Bone[];
    boxes: SharedSkeletonManagerBox[];
    updateBounds: boolean;
    constructor(render?: boolean);
    target?: Object3D;
    set(target: Object3D): void;
    updateInstance(): void;
    private readonly ignore;
    updateColliders(): void;
    active: boolean;
    update(player: Player): void;
    updatePosition(box: SharedSkeletonManagerBox): void;
}
