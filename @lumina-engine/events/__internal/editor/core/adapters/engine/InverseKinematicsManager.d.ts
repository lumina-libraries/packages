import { CCDIKSolver, CCDIKHelper } from "../../../../shared/addons/jsm/animation/CCDIKSolver";
import { Bone, SkinnedMesh, Vector3, EventDispatcher, type Vector3Tuple } from "three";
import type StoreAdapter from "./StoreAdapter";
export interface InverseKinematicsTarget {
    name: string | null;
    target: Bone | null;
    effector: Bone | null;
    links: InverseKinematicsTargetLink[];
    angle: {
        min: number;
        max: number;
    };
    iteration: number;
}
export interface InverseKinematicsTargetLink {
    bone: Bone | null;
    rotation: {
        min: Vector3;
        max: Vector3;
    };
}
export type InverseKinematicsTargetLinkTuple = [
    bone: string,
    rotation_min: Vector3Tuple,
    rotation_max: Vector3Tuple
];
export type InverseKinematicsTargetTuple = [
    name: string,
    target: string | null,
    effector: string | null,
    iteration: number,
    angle_min: number,
    angle_max: number,
    links: InverseKinematicsTargetLinkTuple[]
];
export type InverseKinematicsManagerTuple = [
    mesh: string,
    targets: InverseKinematicsTargetTuple[]
];
export declare class InverseKinematicsManager extends EventDispatcher<{
    target: {
        detail: InverseKinematicsTarget;
    };
}> {
    mesh: SkinnedMesh;
    debug: boolean;
    readonly uuid: string;
    targets: InverseKinematicsTarget[];
    solver?: CCDIKSolver;
    helper?: CCDIKHelper;
    private workerManager?;
    useWorker: boolean;
    constructor(mesh: SkinnedMesh, debug?: boolean);
    /**
     * Initializes the worker manager for offloaded IK calculations
     */
    private initWorkerManager;
    dispose(): void;
    active: number;
    create(store?: StoreAdapter): void;
    update(): void;
    addTarget(target: InverseKinematicsTarget): void;
    updateTarget(target: InverseKinematicsTarget): void;
    removeTarget(target: InverseKinematicsTarget | number): void;
    addLink(target: InverseKinematicsTarget, link: InverseKinematicsTargetLink): void;
    removeLink(target: InverseKinematicsTarget, link: InverseKinematicsTargetLink): void;
    setTargetIndex(target: number, index: number): void;
    replaceTargetIndex(target: number, index: number): void;
    setLinkIndex(target: number, link: number, index: number): void;
    replaceLinkIndex(target: number, link: number, index: number): void;
    static sterilizeTargetLink(link: InverseKinematicsTargetLink): InverseKinematicsTargetLinkTuple;
    static sterilizeTarget(target: InverseKinematicsTarget): InverseKinematicsTargetTuple;
    static deserializeTargetLink(data: InverseKinematicsTargetLinkTuple, store: StoreAdapter): InverseKinematicsTargetLink;
    static deserializeTarget(data: InverseKinematicsTargetTuple, store: StoreAdapter): InverseKinematicsTarget;
    toJSON(): InverseKinematicsManagerTuple;
    static fromJSON(json: InverseKinematicsManagerTuple, store: StoreAdapter): InverseKinematicsManager;
    /**
     * Enables or disables worker-based IK calculations
     * @param enable Whether to enable worker-based IK
     */
    setWorkerEnabled(enable: boolean): void;
}
