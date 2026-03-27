import { Object3D, BufferGeometry, Box3, Sphere, Vector3, Euler, type EulerTuple, type Vector3Tuple } from "three";
import type StoreAdapter from "./StoreAdapter";
import { type CapsuleLike } from "../../../helpers/CapsuleHelper";
import { SharedGameManager } from "../../../../shared/managers/SharedGameManager";
import { Collider, ColliderDesc, RigidBody, RigidBodyDesc } from "@dimforge/rapier3d";
import type { SharedWorld } from "../../../../shared/managers/SharedWorld";
import { type ContextMenuItem } from "../../../events/ContextMenuEvent";
export declare enum ColliderType {
    Cuboid = 0,
    Sphere = 1,
    Capsule = 2,
    Convex = 3,
    Triangle = 4,
    Compound = 5
}
export declare class ColliderObjectHelper extends Object3D {
    target: ColliderObject;
    constructor(target: ColliderObject);
    helper?: Object3D;
    box3?: Box3;
    sphere?: Sphere;
    capsule?: CapsuleLike;
    get needsCreate(): boolean;
    create(): void;
    update(): void;
    dispose(): void;
}
export interface ColliderOption {
    position: Vector3;
    rotation: Euler;
}
export type ColliderOptions = {
    type: ColliderType.Cuboid;
    size: Vector3;
} | {
    type: ColliderType.Sphere;
    radius: number;
} | {
    type: ColliderType.Capsule;
    radius: number;
    height: number;
} | {
    type: ColliderType.Convex;
    geometry: BufferGeometry;
} | {
    type: ColliderType.Triangle;
    geometry: BufferGeometry;
} | {
    type: ColliderType.Compound;
    compound: ColliderObject[];
};
export type ColliderDescription = ColliderDesc | null | ColliderDescription[];
declare class ArraySet<T> extends Array<T> {
    push(...items: T[]): number;
    add(item: T): number;
    delete(item: T): boolean;
    clear(): void;
    reflow(): void;
    moveUp(item: T): boolean;
    moveDown(item: T): boolean;
    setIndex(target: number, index: number): void;
    replaceIndex(target: number, index: number): void;
    has(item: T): boolean;
}
export declare class ColliderObject {
    colliderType: ColliderType;
    uuid: string;
    type: string;
    compound: ArraySet<ColliderObject>;
    name: string;
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    geometry?: BufferGeometry;
    collider?: Collider;
    get friction(): number;
    set friction(value: number);
    get mass(): number;
    set mass(value: number);
    constructor(colliderType?: ColliderType);
    static create(options: ColliderOptions & ColliderOption): ColliderDescription | undefined;
    options<T extends this["colliderType"]>(type: T): (ColliderOptions & ColliderOption) | undefined;
    toJSON(): {
        uuid: string;
        type: string;
        name: string;
        position: Vector3Tuple;
        rotation: EulerTuple;
        scale: Vector3Tuple;
        colliderType: ColliderType;
        geometryUuid?: string;
        compound: ReturnType<ColliderObject["toJSON"]>[];
        mass: number;
        friction: number;
    };
    fromJSON(json: ReturnType<ColliderObject["toJSON"]>, store: StoreAdapter): void;
    static fromJSON(json: ReturnType<ColliderObject["toJSON"]> | ReturnType<ColliderAdapter["toJSON"]>, store: StoreAdapter, game: SharedGameManager): ColliderObject | ColliderAdapter;
    createCollider(world: SharedWorld, description: ColliderDesc, parent?: RigidBody, assign?: boolean): void;
    update(): void;
    copy(object: ColliderObject): this;
    clone(): ColliderObject;
    static contextmenu(collider: ColliderObject | ColliderAdapter): ContextMenuItem[];
    contextmenu(): Promise<void>;
}
export declare class ColliderAdapter extends ColliderObject {
    target: Object3D;
    game: SharedGameManager;
    source: any;
    type: string;
    bodyDescription: RigidBodyDesc | null;
    constructor(target: Object3D, game: SharedGameManager, source?: any);
    init(store?: StoreAdapter): void;
    applyTargetMatrix(): void;
    apply(store?: StoreAdapter): void;
    create(): void;
    private cache;
    cacheIndex: number;
    save(): number;
    restore(index: number): void;
    update(delta?: number, time?: number): void;
    toJSON(): {
        uuid: string;
        type: string;
        name: string;
        position: Vector3Tuple;
        rotation: EulerTuple;
        scale: Vector3Tuple;
        colliderType: ColliderType;
        geometryUuid?: string;
        compound: ReturnType<ColliderObject["toJSON"]>[];
        mass: number;
        friction: number;
    } & {
        targetUuid: string;
    };
    fromJSON(json: ReturnType<ColliderAdapter["toJSON"]>, store: StoreAdapter): void;
}
export {};
