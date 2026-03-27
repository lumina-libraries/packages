import type { z } from "zod";
export declare enum Maps {
    "map" = 0,
    "matcap" = 1,
    "alphaMap" = 2,
    "lightMap" = 3,
    "aoMap" = 4,
    "bumpMap" = 5,
    "normalMap" = 6,
    "displacementMap" = 7,
    "roughnessMap" = 8,
    "metalnessMap" = 9,
    "specularMap" = 10,
    "envMap" = 11,
    "emissiveMap" = 12,
    "gradientMap" = 13,
    "transmissionMap" = 14,
    "thicknessMap" = 15
}
export type PositionBuffer = [
    object: Object3D,
    x: number,
    y: number,
    z: number
];
export type RotationBuffer = [
    object: Object3D,
    x: number,
    y: number,
    z: number,
    order: EulerOrder
];
export type ScaleBuffer = [
    object: Object3D,
    x: number,
    y: number,
    z: number
];
export type ObjectValueBuffer = [
    object: Object3D,
    key: "visible" | "castShadow" | "receiveShadow" | "frustumCulled",
    value: boolean
] | [
    object: Instance,
    key: "updateMorph",
    value: boolean
] | [
    object: Instance,
    key: "updateSkeleton",
    value: boolean
] | [
    object: Object3D,
    key: "name",
    value: string
];
export type GameStateBuffer = [
    key: "status",
    value: "paused" | "running" | "ended"
] | [
    key: "time",
    value: string
];
export declare enum BufferType {
    position = 0,
    rotation = 1,
    scale = 2,
    objectValue = 3,
    gameState = 4
}
export interface Buffers {
    [BufferType.position]: PositionBuffer;
    [BufferType.rotation]: RotationBuffer;
    [BufferType.scale]: ScaleBuffer;
    [BufferType.objectValue]: ObjectValueBuffer;
    [BufferType.gameState]: GameStateBuffer;
}
declare class Frame {
    readonly type: typeof BufferType;
    readonly buffers: Map<BufferType, Buffers[BufferType][]>;
    time: number;
    delta: number;
    deltaTime: number;
    update(time: number, delta: number): void;
    /**
     * Writes a value to the buffer
     * @param buffer
     * @param value
     * @returns
     */
    write<K extends BufferType>(buffer: K, value: Buffers[K]): void;
    toJSON(): [BufferType, Buffers[]][];
    clear(): void;
}
export interface CreateOptions {
    cube: CreateGeometryOptions["cube"] & {
        material: Material;
    };
    sphere: CreateGeometryOptions["sphere"] & {
        material: Material;
    };
    capsule: CreateGeometryOptions["capsule"] & {
        material: Material;
    };
    plane: CreateGeometryOptions["plane"] & {
        material: Material;
    };
}
export interface CreateGeometryOptions {
    cube: {
        width?: number;
        height?: number;
        depth?: number;
        widthSegments?: number;
        heightSegments?: number;
        depthSegments?: number;
    };
    sphere: {
        radius?: number;
        widthSegments?: number;
        heightSegments?: number;
        phiStart?: number;
        phiLength?: number;
        thetaStart?: number;
        thetaLength?: number;
    };
    capsule: {
        radius?: number;
        length?: number;
        capSegments?: number;
        radialSegments?: number;
    };
    plane: {
        width?: number;
        height?: number;
        widthSegments?: number;
        heightSegments?: number;
    };
}
export interface DefaultCreateOptions {
    name?: string;
}
export interface SandboxComponentOptionMap {
    text: string;
    vector2: [number, number];
    vector3: [number, number, number];
    quaternion: [number, number, number, number];
    color: number;
    number: number;
    boolean: boolean;
    select: number;
    set: number[] | string[];
    texture: Texture;
    material: Material;
    geometry: Geometry;
    object: Object3D;
}
export interface SandboxComponentOptionOptionsMap {
    text: {
        placeholder?: string;
    };
    vector2: NonNullable<unknown>;
    vector3: NonNullable<unknown>;
    quaternion: NonNullable<unknown>;
    color: NonNullable<unknown>;
    number: {
        min?: number;
        max?: number;
        step?: number;
        input?: boolean;
    };
    boolean: NonNullable<unknown>;
    select: {
        options: string[];
    };
    set: {
        type: "string" | "number";
    };
    texture: {
        type: "image" | "video" | "audio" | "renderTarget";
        readonly?: boolean;
    };
    object: {
        types?: string[];
    };
    material: {
        types?: string[];
    };
    geometry: {
        types?: string[];
    };
}
export interface SandboxComponentOption<Type extends keyof SandboxComponentOptionMap> {
    id: number;
    type: Type;
    name: string;
    get value(): SandboxComponentOptionMap[Type] | null;
    update(value: SandboxComponentOptionMap[Type]): void;
}
export interface SandboxComponent {
    id: number;
    name: string;
    createOption: <Type extends keyof SandboxComponentOptionMap>(name: string, type: Type, value: SandboxComponentOptionMap[Type]) => SandboxComponentOption<Type>;
}
export type RendererType = "webgl" | "css2d" | "css3d" | "any";
export interface LabelStyle<T extends RendererType = "css2d"> {
    renderer?: T;
    color?: string;
    fontSize?: number;
    fontFamily?: string;
    position?: [number, number, number];
    scale?: [number, number, number];
    rotation?: T extends "webgl" | "css3d" | "any" ? [number, number, number] : void;
}
export type IntBoolean = 0 | 1;
export declare enum MovementMap {
    Forward = 2,
    Left = 3,
    Backward = 4,
    Right = 5,
    Jump = 6,
    LeftPointer = 7,
    RightPointer = 8,
    Sprint = 9,
    Drop = 10,
    Shoot = 11,
    Aim = 12,
    Action = 13,
    Grenade = 14,
    Reload = 15,
    RollLeft = 16,
    RollRight = 17,
    Crouch = 18,
    PrimaryWeapon = 19,
    SecondaryWeapon = 20,
    MeleeWeapon = 21
}
export type Movement = [
    pitch: number,
    yaw: number,
    forward: IntBoolean,
    left: IntBoolean,
    backward: IntBoolean,
    right: IntBoolean,
    jump: IntBoolean,
    left_pointer: IntBoolean,
    right_pointer: IntBoolean,
    sprint: IntBoolean,
    drop: IntBoolean,
    shoot: IntBoolean,
    aim: IntBoolean,
    action: IntBoolean,
    grenade: IntBoolean,
    reload: IntBoolean,
    roll_left: IntBoolean,
    roll_right: IntBoolean,
    crouch: IntBoolean,
    primary_weapon: IntBoolean,
    secondary_weapon: IntBoolean,
    melee_weapon: IntBoolean
];
export interface PlayerState {
    readonly id: number;
    readonly position: [number, number, number];
    readonly velocity: [number, number, number];
    readonly pitch: number;
    readonly yaw: number;
    readonly username: string;
    readonly spawned: boolean;
    readonly grounded: boolean;
    readonly team: number;
    readonly health: number;
    readonly dead: boolean;
    readonly commands: Movement;
}
export interface LibTextureOptions {
    image?: string;
    name?: string;
    flipY?: boolean;
    mapping?: number;
    wrapS?: number;
    wrapT?: number;
    magFilter?: number;
    minFilter?: number;
    format?: number;
    anisotropy?: number;
    colorSpace?: string;
}
export declare class Lib {
    private constructor();
    static commands(enabled?: boolean): Promise<void>;
    static alert(message: string): Promise<boolean>;
    static path(this: Instance, objectUuid: Object3D): Promise<string>;
    static material(this: Instance, type: MaterialTypes): Promise<Material>;
    static setMaterialValue(this: Instance, materialUuid: Material, attributeName: string, key: KeyValue): Promise<boolean>;
    static defaultObject<T extends keyof CreateOptions>(this: Instance, name: T, options: CreateOptions[T] & DefaultCreateOptions, parentUuid?: Object3D): Promise<string>;
    static geometry<T extends keyof CreateGeometryOptions>(this: Instance, name: T, options: CreateGeometryOptions[T] & DefaultCreateOptions): Promise<Mesh>;
    static mesh(this: Instance, geometryUuid: string, materialUuid: string | string[], parentUuid?: string, instanced?: boolean): Promise<Mesh>;
    static createGroup(this: Instance, name: string, parentUuid?: Object3D): Promise<Group>;
    static createMesh(this: Instance, name: string, geometryUuid?: string, materialUuid?: string | string[], parentUuid?: Object3D): Promise<Mesh>;
    static log(...contents: Array<string | number | unknown[]>): Promise<void>;
    static removeObject(this: Instance, objectUuid: Object3D): Promise<boolean>;
    static querySelector(this: Instance, name: string): Promise<Object3D[]>;
    static children(this: Instance, objectUuid: Object3D): Promise<Object3D[]>;
    static materials(this: Instance, name: string): Promise<Material[]>;
    static textures(this: Instance, name: string): Promise<Texture[]>;
    /**
   * Get the world position of an object
   */
    static position(this: Instance, objectUuid: Object3D): Promise<Vector3Tuple>;
    /**
     * Set the position of an object
     */
    static position(this: Instance, objectUuid: Object3D, position: [x: number, y: number, z: number]): Promise<boolean>;
    /**
     * Get the rotation of an object in degrees
     */
    static rotation(this: Instance, objectUuid: Object3D): Promise<[x: number, y: number, z: number, order: string]>;
    /**
     * Set the rotation of an object in degrees
     */
    static rotation(this: Instance, objectUuid: Object3D, rotation: [x: number, y: number, z: number, order: EulerOrder]): Promise<boolean>;
    /**
     * Get the scale of an object
     */
    static scale(this: Instance, objectUuid: Object3D): Promise<Vector3Tuple>;
    /**
     * Set the scale of an object
     */
    static scale(this: Instance, objectUuid: Object3D, scale: [x: number, y: number, z: number]): Promise<boolean>;
    static updateElasticRotation(this: Instance, objectUuid: Object3D, progress: number, start: [x: number, y: number, z: number], end: [x: number, y: number, z: number], duration: number, amplitude?: number, period?: number): Promise<void>;
    static setObjectValue(this: Instance, objectUuid: Object3D, name: string, value: unknown): Promise<void>;
    static setTexture(this: Instance, materialUuid: Material, attributeName: string, textureUuid: string): Promise<boolean>;
    static setMaterialColor(this: Instance, materialUuid: Material, attributeName: string, color: number): Promise<boolean>;
    static setMeshMaterial(this: Instance, objectUuid: Mesh, materialUuid: Material | Material[]): Promise<boolean>;
    static createLabel(this: Instance, objectUuid: Object3D, text: string, style?: LabelStyle): Promise<Object3D>;
    static removeLabel(this: Instance, objectUuid: Object3D): Promise<void>;
    static hideLabel(this: Instance, objectUuid: Object3D): Promise<void>;
    static showLabel(this: Instance, objectUuid: Object3D): Promise<void>;
    static setMap<V>(this: Instance, mapId: string, key: string, value: V): Promise<void>;
    static removeMap(this: Instance, mapId: string, key: string): Promise<void>;
    static getMap<V>(this: Instance, mapId: string, key: string): Promise<V>;
    static hasMap(this: Instance, mapId: string, key: string): Promise<boolean>;
    static clearMap(this: Instance, mapId: string): Promise<void>;
    static playAnimation(this: Instance, animationUuid: AnimationClip, objectUuid: Object3D): Promise<void>;
    static stopAnimation(this: Instance, animationUuid: AnimationClip, objectUuid: Object3D): Promise<void>;
    static damageIndicator(this: Instance, position: [x: number, y: number, z: number], damage: number, color: string): Promise<void>;
    static playDefaultSound(this: Instance, id: `game/${string}`, index: number): Promise<void>;
    /**
     * Mix multiple texture channels into a single texture
     * @param channels - Object containing r, g, b, base, and mask channel UUIDs
     * @param options - Mixing options including blendMode and opacity
     * @returns The UUID of the resulting texture
     */
    static mixTextures(this: Instance, channels: {
        r?: Texture;
        g?: Texture;
        b?: Texture;
        base: Texture;
        mask?: Texture;
    }, options?: {
        blendMode?: "normal" | "multiply" | "screen" | "overlay";
        opacity?: number;
        width?: number;
        height?: number;
    }): Promise<Texture>;
    /**
     * Create a texture from a URL
     * @param url - The URL or data URL of the image to load
     * @param options - Optional texture configuration
     * @returns The UUID of the created texture
     */
    static texture(this: Instance, options?: LibTextureOptions): Promise<Texture>;
    /**
     * Update an existing texture with a new image from URL
     * @param textureUuid - The UUID of the texture to update
     * @param url - The URL or data URL of the new image
     * @param options - Optional texture configuration to update
     * @returns True if the update was successful
     */
    static updateTexture(this: Instance, textureUuid: Texture, options: Partial<LibTextureOptions>): Promise<boolean>;
    /**
     * Get the userData of an object
     */
    static userData<T = Record<string, unknown>>(this: Instance, objectUuid: Object3D | Material): Promise<T>;
    /**
     * Set the userData of an object
     */
    static userData<T = Record<string, unknown>>(this: Instance, objectUuid: Object3D | Material, userData: Partial<T>): Promise<void>;
    /**
     * Get a material's map texture by map type
     * @param materialUuid - The UUID of the material
     * @param mapType - The type of map from the Maps enum
     * @returns The UUID of the texture, or null if no texture is set
     */
    static getMaterialMap(this: Instance, materialUuid: Material, mapType: Maps): Promise<Texture | null>;
}
export interface SandboxNode {
    readonly uuid: string;
    readonly label: string;
    readonly type: string;
    readonly options: Record<string, unknown>;
}
export declare class SynchronousMap<V> extends EventTarget {
    readonly id: string;
    constructor(id: string);
    set(key: string, value: V): Promise<void>;
    set(key: string, value: V, post: false): void;
    get(key: string): Promise<V | undefined>;
    delete(key: string): Promise<void>;
    has(key: string): Promise<boolean>;
    clear(): Promise<void>;
}
export declare class Sandbox {
    readonly uuid: string;
    readonly players: Map<SandboxWorkerScope.Player, PlayerState>;
    /**
     *  This function will return a random number between 0 and 1
     * @param min  If min is undefined it will return a number between 0 and 1
     * @param max   If max is undefined it will return a number between 0 and min
     * @returns
     */
    randomNumber(min?: number, max?: number): number;
    /**
     * This function will wait for the given amount of milliseconds
     * @param milliseconds The amount of milliseconds to wait
     * @returns
     */
    timeout(milliseconds: number): Promise<void>;
    /**
     * This function wil generate a random color in hex
     */
    randomColor(): number;
    /**
     * This function will create a component option to the main editor GUI
     * @param name The name of the component option
     * @param type The type of the component option
     * @returns
     */
    createComponentOption<K extends keyof SandboxComponentOptionMap>(group: number, name: string, type: K): SandboxComponentOption<K>;
    createComponent(name: string): SandboxComponent;
    getDistance(x: Vector3Tuple, y: Vector3Tuple): number;
    map<V>(id: string): SynchronousMap<V>;
    userData<T extends z.ZodSchema<unknown>>(objectUuid: Object3D | Material, schema: T): Promise<z.infer<T>>;
    userData<T extends z.ZodSchema<unknown>>(objectUuid: Object3D | Material, schema: T, userData: Partial<z.infer<T>>): Promise<void>;
}
declare namespace SandboxWorkerScope {
    type Player = {};
    type EulerOrder = "XYZ" | "YXZ" | "ZXY" | "ZYX" | "YZX" | "XZY";
    type Vector3Tuple = [number, number, number];
    type EulerTuple = [number, number, number, EulerOrder];
    type Mesh = {};
    type Group = {};
    type Instance = {};
    type Object3D = Group | Mesh;
    type AnimationClip = {};
    type Material = {};
    type Texture = {};
    type Geometry = {};
    type MaterialTypes = "Lambert" | "Basic" | "Shader" | "Depth" | "Distance" | "Matcap" | "Normal" | "Phong" | "Standard" | "Toon" | "Physical";
    type TextureTypes = "Image" | "Video" | "Audio";
    type KeyValue = string | number | boolean | Array<string | number | boolean>;
    type SynchronousMapChangeEvent = CustomEvent<{
        key: string;
        value: unknown;
    }>;
    const Movement: typeof MovementMap;
    const frame: Frame;
    const lib: typeof Lib;
    const sandbox: Sandbox;
    const scriptObject: Object3D;
    const parentObject: Object3D | null;
    const keybind: Record<number, string | 0 | 1>;
    const clientId: number | null;
    const zod: typeof z;
}
export { SandboxWorkerScope };
export type EulerOrder = SandboxWorkerScope.EulerOrder;
export type Vector3Tuple = SandboxWorkerScope.Vector3Tuple;
export type Mesh = SandboxWorkerScope.Mesh;
export type Group = SandboxWorkerScope.Group;
export type Object3D = SandboxWorkerScope.Object3D;
export type Instance = SandboxWorkerScope.Instance;
export type AnimationClip = SandboxWorkerScope.AnimationClip;
export type Material = SandboxWorkerScope.Material;
export type Geometry = SandboxWorkerScope.Geometry;
export type Texture = SandboxWorkerScope.Texture;
export type MaterialTypes = SandboxWorkerScope.MaterialTypes;
export type TextureTypes = SandboxWorkerScope.TextureTypes;
export type KeyValue = SandboxWorkerScope.KeyValue;
export type EulerTuple = SandboxWorkerScope.EulerTuple;
declare const _default: true;
export default _default;
