import { ColliderDesc, RigidBodyDesc, type Vector as RapierVector, type Rotation as RapierRotation, RigidBody, Collider, KinematicCharacterController } from "@dimforge/rapier3d";
import { BufferGeometry, EventDispatcher, Object3D, Vector3, type QuaternionLike, type Vector3Like } from "three";
import type { SharedGameManager } from "../managers/SharedGameManager";
declare enum SourceObjectVectorIndex {
    x = 0,
    y = 1,
    z = 2,
    w = 3
}
type SourceObjectVectorTypeMap = {
    position: [number, number, number];
    velocity: [number, number, number];
    rotation: [number, number, number, number];
};
declare class SourceObjectVector<Type extends keyof SourceObjectVectorTypeMap> extends Vector3 implements Omit<ArrayLike<number>, "length"> {
    private target?;
    private type?;
    rapier: boolean;
    constructor(target?: SourceObject, type?: Type);
    get [SourceObjectVectorIndex.x](): number;
    set [SourceObjectVectorIndex.x](value: number);
    get [SourceObjectVectorIndex.y](): number;
    set [SourceObjectVectorIndex.y](value: number);
    get [SourceObjectVectorIndex.z](): number;
    set [SourceObjectVectorIndex.z](value: number);
    get [SourceObjectVectorIndex.w](): number;
    set [SourceObjectVectorIndex.w](value: number);
    private local;
    getObject(): RapierVector | RapierRotation | undefined;
    setObject(object?: RapierVector | RapierRotation, assign?: RapierVector | RapierRotation): void;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get z(): number;
    set z(value: number);
    get w(): number;
    set w(value: number);
    get needsUpdate(): boolean;
    get tuple(): number[];
    /**
     * Returns the element at the specified index.
     * @param index The index of the element to return.
     */
    at(index: number): number;
    set(value: Vector3Like | QuaternionLike): void;
    /**
     * Returns the element at the specified index, or undefined if the index is out of range.
     * @param index The index of the element to return.
     */
    [index: number]: SourceObjectVectorTypeMap[keyof SourceObjectVectorTypeMap][number];
}
export interface SourceObjectEventMap {
    collision: {};
    land: {};
    remove: {};
}
export default class SourceObject<T extends {} = {}> extends EventDispatcher<T & SourceObjectEventMap> {
    game: SharedGameManager;
    static increment: number;
    readonly id: number;
    physics: boolean;
    isPlayer: boolean;
    currentTime: number;
    remove: boolean;
    updateable: boolean;
    particle: boolean;
    obstacle: boolean;
    readonly position: SourceObjectVector<"position">;
    readonly velocity: SourceObjectVector<"velocity">;
    readonly rotation: SourceObjectVector<"rotation">;
    colliderDescription?: ColliderDesc;
    bodyDescription?: RigidBodyDesc;
    body?: RigidBody;
    collider?: Collider;
    characterController?: KinematicCharacterController;
    updateCharacterController: boolean;
    /**
     * Enable the ground check for the object.
     * If false this.ground will not be called.
     */
    enableGroundCheck: boolean;
    static getShape(data: BufferGeometry, hull?: boolean): ColliderDesc;
    createPhysics(type: "capsule" | "cuboid" | "default" | "ball" | "trimesh" | "convexmesh" | "heightfield" | "convexhull", options: {
        particle?: boolean;
        obstacle?: boolean;
        collider: {
            geometry?: BufferGeometry;
            hull?: boolean;
            nrows?: number;
            ncols?: number;
            heights?: Float32Array;
            scale?: Vector3Like;
            position?: Vector3Like;
            rotation?: QuaternionLike;
            halfHeight?: number;
            radius?: number;
            restitution?: number;
        };
        body: {
            type?: "Dynamic" | "Static" | "KinematicPositionBased" | "KinematicVelocityBased";
            mass?: number;
            density?: number;
            linearDamping?: number;
            angularDamping?: number;
            lockRotation?: boolean;
            lockTranslation?: boolean;
            friction?: number;
            gravityScale?: number;
            canSleep?: boolean;
            ccd?: boolean;
            position?: Vector3Like;
            quaternion?: QuaternionLike;
            velocity?: Vector3Like;
        };
        character?: {
            offset: number;
        };
    }): void;
    binds: Set<Object3D>;
    bind(object: Object3D): void;
    unbind(object: Object3D): void;
    target?: Object3D;
    /**
     * This is the ground state of the object (From physics directy)
     */
    grounded: boolean;
    /**
     * Unlike grounded, this is when we consider the object to be on the ground.
     * Sometimes by a time delay.
     */
    onground: boolean;
    /**
     * The time the object landed.
     * Using `this.grounded` and `this.groundTimeDelay` to calculate.
     */
    landTime: number;
    /**
     * The time delay between the object being `this.grounded` and us considering it to be `this.onground`.
     */
    private groundTimeDelay;
    constructor(game: SharedGameManager);
    dispose(): void;
    clear(): void;
    /**
     * Internal delta time from the last update.
     */
    deltaTime: number;
    /**
     * Delta time from the last update.
     */
    delta: number;
    beforeUpdate: (delta: number) => number;
    afterUpdate?: (delta: number) => void;
    updateColliders(): void;
    update(delta: number, time: number): void;
    /**
     * Checking and updating the ground state of the object from rapier.
     * @param time
     */
    private ground;
    groundStartTime: number;
    inAirStartTime: number;
    toArray(): any[];
    fromArray(array: number[]): void;
}
export {};
