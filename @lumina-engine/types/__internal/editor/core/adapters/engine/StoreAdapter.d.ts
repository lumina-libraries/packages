import { StoreObjectLink } from "../../../../shared/core/StoreObjectLink";
import { CSS2DObject } from "../../../../shared/addons/jsm/renderers/CSS2DRenderer";
import { EventEmitter } from "events";
import { Box3, Box3Helper, BufferGeometry, Camera, CameraHelper, CanvasTexture, DataTexture, GridHelper, Light, Material, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, Object3D, PointLightHelper, Source, SpotLightHelper, Texture, ObjectLoader, AnimationClip, PerspectiveCamera, ShaderMaterial, SkinnedMesh, AnimationMixer, Skeleton, Bone, Vector3, Color, Vector2, Scene, DirectionalLightHelper, AudioListener, type Object3DJSON, Group, type JSONMeta, type TextureJSON } from "three";
import type { UVUnwrapper } from "xatlas-three";
import type { History } from "../../History";
import type KeyboardEventAdapter from "./KeyboardEventAdapter";
import type { Font } from "../../../../shared/addons/jsm/loaders/FontLoader";
import MeshHelper from "../../../helpers/MeshHelper";
import type { EditorSkeletonHelper } from "../../../helpers/EditorSkeletonHelper";
import { CustomObjects } from "../../../objects";
import { ScriptObject } from "../../../objects/ScriptObject";
import { CustomObject3D } from "../../../objects/CustomObject3D";
import { CustomStoreObject } from "../../../objects/CustomStoreObject";
import type { Directory } from "../../../fs";
import { MainWorker } from "../../../../sandbox/main/core/MainWorker";
import { type PlayerState, Maps } from "../../../../sandbox/types";
import { type EnvironmentScene } from "../../../../shared/engine/EnvironmentScene";
import { InverseKinematicsManager } from "./InverseKinematicsManager";
import type { Cursor } from "../../Cursor";
import { NodeEditor } from "../../../components/dynamic/NodeEditor/nodes";
import type { Thumbnail } from "../../../render/Thumbnail";
import type { CharacterLabel } from "../../../commands/AddLabelCommand";
import type { SpawnPointHelper } from "../../../helpers/SpawnPointHelper";
import type { NavigationObjectHelper } from "../../../helpers/NavigationObjectHelper";
import type { SkeletonHelper } from "../../../helpers/SkeletonHelper";
import { SharedGameManager } from "../../../../shared/managers/SharedGameManager";
import type Client from "../../Client";
import { AudioObject } from "../../../objects/AudioObject";
import { TileTexture } from "../../../objects/TileTexture";
import { LightmapAdapter } from "./LightmapAdapter";
import type { BoneHelper } from "../../../helpers/BoneHelper";
import type { ProjectedCubemapHelper } from "../../../objects/ProjectedCubemap";
import { SplatterMaterial } from "../../SplatterManager";
import { AudioObjectHelper } from "../../../helpers/AudioObjectHelper";
import { PropertyAdapter } from "./PropertyAdapter";
import { StoreFolderAdapter } from "./StoreFolderAdapter";
import { MeshSubsurfaceScatteringMaterial } from "../../../materials/MeshSubsurfaceScatteringMaterial";
import { ColliderAdapter, ColliderObject, ColliderObjectHelper } from "./ColliderAdapter";
import { LightProbeHelper } from "$shared/addons/jsm/Addons";
import type { Collider } from "@dimforge/rapier3d";
import type { InstancedMesh2 } from "@three.ez/instanced-mesh";
import { GridSystemHelper } from "../../../helpers/GridSystemHelper";
import { FileSource } from "./FileSource";
import { PluginAdapter } from "./PluginAdapter";
import { ShaderManager } from "./ShaderManager";
import { AIEntityHelper } from "../../../helpers/AIEntityHelper";
export declare const DEFAULT_MATERIAL: MeshLambertMaterial;
export declare const DEFAULT_GEOMETRY: BufferGeometry<import("three").NormalBufferAttributes, import("three").BufferGeometryEventMap>;
export declare const DEFAULT_TEXTURE: Texture;
export declare const DEFAULT_TEXTURE_PATH: string;
export type Materials = Material | SplatterMaterial | MeshLambertMaterial | MeshBasicMaterial | MeshDepthMaterial | MeshDistanceMaterial | MeshMatcapMaterial | MeshNormalMaterial | MeshPhongMaterial | MeshStandardMaterial | MeshToonMaterial | MeshPhysicalMaterial | MeshSubsurfaceScatteringMaterial;
export type Helpers = AudioObjectHelper | ProjectedCubemapHelper | BoneHelper | MeshHelper | Box3Helper | PointLightHelper | CameraHelper | GridHelper | SpotLightHelper | SpotLightHelper | Box3Helper | PointLightHelper | CameraHelper | SpotLightHelper | SpawnPointHelper | NavigationObjectHelper | DirectionalLightHelper | SkeletonHelper | CameraHelper | LightProbeHelper | GridSystemHelper | AIEntityHelper | EditorSkeletonHelper;
export type Objects = CustomObject3D | Object3D | Mesh | CSS2DObject | Light;
export type Textures = Texture | DataTexture | CanvasTexture | TileTexture;
export type Images = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap | ImageData;
export type StoreObject = Source | Textures | Objects | Materials | BufferGeometry | Mesh | SkinnedMesh | AnimationClip | Skeleton | Bone | AudioObject | FileSource | CustomStoreObject;
export declare const MaterialType: {
    Lambert: typeof MeshLambertMaterial;
    Shader: typeof ShaderMaterial;
    Basic: typeof MeshBasicMaterial;
    Depth: typeof MeshDepthMaterial;
    Distance: typeof MeshDistanceMaterial;
    Matcap: typeof MeshMatcapMaterial;
    Normal: typeof MeshNormalMaterial;
    Phong: typeof MeshPhongMaterial;
    Standard: typeof MeshStandardMaterial;
    Toon: typeof MeshToonMaterial;
    Physical: typeof MeshPhysicalMaterial;
    "Surface Scattering": typeof MeshSubsurfaceScatteringMaterial;
    Splatter: typeof SplatterMaterial;
};
export declare const MaterialTypes: string[];
export declare const TextureType: {
    Basic: typeof Texture;
    Tile: typeof TileTexture;
};
export declare const helpers: (typeof Box3Helper | typeof MeshHelper | typeof GridSystemHelper | typeof AudioObjectHelper | typeof PointLightHelper | typeof SpotLightHelper | typeof CameraHelper | typeof GridHelper)[];
type InstanceType<T> = T extends new (...args: unknown[]) => infer I ? I : never;
export type CustomObjectRecord<T extends keyof typeof CustomObjects> = Partial<Record<T, Set<InstanceType<(typeof CustomObjects)[T]>>>>;
interface WebGLInfo {
    memory: {
        texture: number;
        buffer: number;
        renderbuffer: number;
        drawingbuffer: number;
        total: number;
    };
    resources: {
        buffer: number;
        framebuffer: number;
        renderbuffer: number;
        program: number;
        query: number;
        shader: number;
        sampler: number;
        texture: number;
        transformFeedback: number;
        vertexArray: number;
        sync: number;
    };
}
export declare enum RigidBodyCollider {
    Static = 0,
    Dynamic = 1
}
export interface RigidBodyOptions {
    collideable: boolean;
    collider: RigidBodyCollider;
    mass: number;
    gravityScale: number;
    linearDamping: number;
    angularDamping: number;
    ccd: boolean;
    disableRotations: [x: boolean, y: boolean, z: boolean];
    disableTranslations: [x: boolean, y: boolean, z: boolean];
}
export interface AssetOptions {
    enable?: boolean;
    name?: string;
    description?: string;
    author?: string;
    tags?: string;
}
export interface StoreObjectBodyCustomPropertyValue {
    name: string;
    value: string | number | boolean | Vector3 | Vector2 | Color;
}
export interface StoreObjectBody {
    rigidBody: RigidBodyOptions;
    asset: AssetOptions;
    customProperties: {
        properties: StoreObjectBodyCustomPropertyValue[];
    };
    collider: {
        merge: boolean;
        type: "sphere" | "box" | "capsule" | "convex" | "triangle";
        radius?: number;
        height?: number;
        width?: number;
        depth?: number;
    };
    volumes: {
        id: number;
    };
}
export declare class StoreObjectData {
    object: StoreObject;
    readonly body: StoreObjectBody;
    constructor(object: StoreObject);
    set<A extends keyof StoreObjectBody, B extends keyof StoreObjectBody[A]>(id: A, key: B, value: StoreObjectBody[A][B]): void;
    get<A extends keyof StoreObjectBody, B extends keyof StoreObjectBody[A]>(id: A, key: B): StoreObjectBody[A][B];
    toDirectory(options: {
        assets?: Directory;
        thumbnails?: Directory;
        data?: Directory;
        screenshot?: Thumbnail;
    }): Promise<void[]>;
}
declare module "three/src/core/Object3D" {
    interface Object3D {
        store?: StoreAdapter;
        stores?: Set<StoreAdapter>;
    }
}
export default class StoreAdapter extends EventEmitter {
    #private;
    history?: History;
    keyboard?: KeyboardEventAdapter;
    workplace?: Directory;
    client?: SharedGameManager | Client;
    audioListener?: AudioListener;
    createAudioListener(): AudioListener;
    createFile(data?: globalThis.File | Blob | ArrayBuffer, name?: string): Promise<FileSource<File | Blob | ArrayBuffer>>;
    lightmapAdapter?: LightmapAdapter;
    createLightmapAdapter(): LightmapAdapter;
    unwrapper: UVUnwrapper;
    unwrapperLibrary: Promise<void>;
    getUnwrapper(): Promise<UVUnwrapper>;
    readonly selected: Set<StoreObject>;
    select(object?: StoreObject): void;
    deselect(object: StoreObject): void;
    unwrap(): Promise<import("xatlas-three/public/build/UVUnwrapper").Atlas>;
    cursor?: Cursor;
    static fontLoader: any;
    static readonly fonts: Map<string, Font>;
    static upsertFont(name: string, data: unknown): any;
    static readonly DEFAULT_MATERIAL: MeshLambertMaterial;
    fps: number;
    delta: number;
    maxFps: number | null;
    set webgl(info: WebGLInfo);
    get webgl(): WebGLInfo;
    readonly defaultName = "Untitled";
    readonly defaultDescription = "A basic game";
    uuid: string;
    name: string;
    description: string;
    createdAt: Date;
    scene?: Scene;
    camera?: PerspectiveCamera;
    parent?: Object3D;
    environment?: EnvironmentScene;
    probeMaps: Map<string, string>;
    iks: Map<SkinnedMesh, InverseKinematicsManager>;
    createInverseKinematics(mesh: SkinnedMesh): InverseKinematicsManager;
    addInverseKinematics(ik: InverseKinematicsManager): void;
    removeInverseKinematics(mesh: SkinnedMesh): void;
    addLink(link: StoreObjectLink): void;
    removeLink(link: StoreObjectLink): void;
    updateAnimations(delta: number): void;
    updateLinks(): void;
    updateInverseKinematics(): void;
    deltaTime: number;
    update(delta: number): void;
    mixer?: AnimationMixer;
    mixers: Set<AnimationMixer>;
    mixerRoots: Map<SkinnedMesh, AnimationMixer[]>;
    links: Set<StoreObjectLink>;
    setScene(scene: Scene, environment?: EnvironmentScene): void;
    setCamera(camera: PerspectiveCamera): void;
    setDelta(delta: number): void;
    setFps(fps: number): void;
    setName(name: string): void;
    setDescription(description: string): void;
    debug: boolean;
    private _nodes?;
    get nodes(): NodeEditor | undefined;
    set nodes(value: NodeEditor | undefined);
    readonly instances: Map<string, InstancedMesh2>;
    readonly objects: Set<Object3D>;
    readonly audios: Set<AudioObject>;
    readonly lights: Set<Light>;
    readonly meshes: Set<Mesh>;
    readonly skinnedMeshes: Set<SkinnedMesh>;
    readonly materials: Set<Materials>;
    readonly cameras: Set<Camera>;
    readonly textures: Set<Texture>;
    readonly sources: Set<Source>;
    readonly files: Set<FileSource>;
    readonly geometries: Set<BufferGeometry>;
    readonly scripts: Set<ScriptObject>;
    readonly animations: Set<AnimationClip>;
    readonly skeletons: Set<Skeleton>;
    readonly bones: Set<Bone>;
    readonly stores: Set<StoreAdapter>;
    readonly folders: Set<StoreFolderAdapter>;
    readonly folder: Map<string, StoreFolderAdapter>;
    folderRefrences: WeakMap<StoreObject, StoreFolderAdapter>;
    readonly customObjects: Set<CustomObject3D>;
    readonly customStoreObjects: Set<CustomStoreObject>;
    /**
     * Set of folder IDs that are disabled (cannot be selected/interacted with)
     */
    readonly disabledFolders: Set<string>;
    readonly colliders: Map<Object3D, ColliderAdapter>;
    readonly colliderSet: Set<ColliderObject | ColliderAdapter>;
    readonly colliderHelpers: Map<ColliderObject, ColliderObjectHelper>;
    readonly hashes: Map<StoreObject, string>;
    readonly property: PropertyAdapter;
    readonly data: Map<StoreObject, StoreObjectData>;
    pluginAdapter: PluginAdapter;
    shaderManager?: ShaderManager;
    parentStore?: StoreAdapter;
    getRoot(): Group<import("three").Object3DEventMap>;
    bind(store: StoreAdapter): void;
    append(store: StoreAdapter): void;
    readonly customs: CustomObjectRecord<keyof typeof CustomObjects>;
    readonly addCustomObject: (type: string, object: CustomObject3D) => void;
    readonly removeCustomObject: <T extends keyof typeof CustomObjects>(type: T, object: InstanceType<(typeof CustomObjects)[T]>) => void;
    /**
     * Disable a folder by its ID, making it unselectable
     * @param folderId The ID of the folder to disable
     */
    disableFolder(folderId: string): void;
    /**
     * Enable a previously disabled folder
     * @param folderId The ID of the folder to enable
     */
    enableFolder(folderId: string): void;
    /**
     * Check if a folder is disabled
     * @param folderId The ID of the folder to check
     */
    isFolderDisabled(folderId: string): boolean;
    /**
     * Get all disabled folder IDs
     */
    getDisabledFolders(): string[];
    /**
     * Whether material creation is disabled in context menus
     */
    private _materialCreationDisabled;
    /**
     * Whether texture creation is disabled in context menus
     */
    private _textureCreationDisabled;
    /**
     * Disable material creation in context menus
     */
    disableMaterialCreation(): void;
    /**
     * Enable material creation in context menus
     */
    enableMaterialCreation(): void;
    /**
     * Check if material creation is disabled
     */
    isMaterialCreationDisabled(): boolean;
    /**
     * Disable texture creation in context menus
     */
    disableTextureCreation(): void;
    /**
     * Enable texture creation in context menus
     */
    enableTextureCreation(): void;
    /**
     * Check if texture creation is disabled
     */
    isTextureCreationDisabled(): boolean;
    uuids: Map<string, StoreObject>;
    readonly boundings: Map<Object3D, Box3>;
    readonly helpers: Map<Object3D, Object3D>;
    readonly indicators: Map<Object3D, CSS2DObject>;
    readonly labels: Set<CharacterLabel>;
    readonly all: Set<StoreObject>;
    private static workerCallback?;
    static setWorker(callback: () => Promise<MainWorker["worker"]>): void;
    static getWorker(): Promise<MainWorker["worker"]>;
    getWorker: () => Promise<import("worker_threads").Worker | Worker>;
    renderEnvironmentMap(): Promise<void>;
    constructor(history?: History, keyboard?: KeyboardEventAdapter, autoLoadPlugins?: boolean);
    initializeShaderManager(): ShaderManager;
    dispose(): void;
    copy(source: StoreAdapter): this;
    clone(): StoreAdapter;
    setScriptClientId(id: number, state?: PlayerState, keys?: Map<0 | 2 | `key_${string}`, number | number[]>): void;
    handling: Set<string>;
    handleEvents(object: Object3D): void;
    colliderHelperScene: Group<import("three").Object3DEventMap>;
    addCollider(object: ColliderObject | ColliderAdapter): void;
    getCollider(target: Object3D, create?: boolean): ColliderAdapter | undefined;
    removeCollider(object: ColliderObject | ColliderAdapter): void;
    add(object: StoreObject, value?: Box3 | CSS2DObject | Helpers, loop?: boolean): void;
    remove(object: StoreObject, recursive?: boolean): void;
    getData(object: StoreObject, create?: true): StoreObjectData;
    getData(object: StoreObject, create?: false): StoreObjectData | undefined;
    setData<A extends keyof StoreObjectBody, B extends keyof StoreObjectBody[A]>(object: StoreObject, id: A, key: B, value: StoreObjectBody[A][B]): void;
    setUserData(object: Textures | Objects | Materials | BufferGeometry, property: string, value: number | string): void;
    findMaterialOwners(material: Materials): Mesh[];
    findGeometryOwners(geometry: BufferGeometry): Mesh[];
    findColliderByTarget(target: Object3D): ColliderObject | null;
    findColliderByCollider(collider: Collider): ColliderObject | null;
    findObjectByCollider(): Object3D | null;
    findObjectByUuid(uuid: string): Object3D | null;
    findColliderByUuid(uuid: string): ColliderObject | null;
    findColliderOwner(collider: ColliderObject): ColliderAdapter | null;
    findFolderByUuid(uuid: string): StoreFolderAdapter | null;
    findFolderByChild(child: StoreObject | StoreFolderAdapter): StoreFolderAdapter | null;
    findLinkById(id: string): StoreObjectLink | null;
    findFileByUuid(uuid: string): FileSource | null;
    findFileByName(name: string): FileSource | null;
    findMaterialByUuid(uuid: string): Material | null;
    findTextureByUuid(uuid: string): Texture | null;
    findSourceByUuid(uuid: string): Source | null;
    findGeometryByUuid(uuid: string): BufferGeometry | null;
    findAllObjectsByName(name: string): Object3D[];
    findAnimationByUuid(uuid: string): AnimationClip | null;
    findObjectByName(name: string): Object3D | null;
    findMaterialByName(name: string): Materials | null;
    findTextureByName(name: string): Texture | null;
    findGeometryByName(name: string): BufferGeometry | null;
    findAllMaterialsByName(name: string): Materials[];
    findAllTexturesByName(name: string): Texture[];
    findAllGeometriesByName(name: string): BufferGeometry[];
    findTextureOwners(texture: Texture): Array<[Material, Maps[]]>;
    findAnimationOwners(animation: AnimationClip): Object3D[];
    findAnimationByName(name: string): AnimationClip | null;
    findSourceOwners(source: Source): Texture[];
    findSkeletonOwners(skeleton: Skeleton): SkinnedMesh[];
    findBoneOwners(bone: Bone): Skeleton[];
    disableNameHandler: boolean;
    handleName(object: StoreObject, name: string): string | null;
    removeAllDuplicateGeometries(): Promise<void>;
    clear(): void;
    /**
     * Similar to ObjectLoader.parseTextures, but supporting our extended custom textures.
     * this.parseJson uses it for parsing textures.
     */
    static parseTextures(loader: ObjectLoader, json: Record<string, TextureJSON> | TextureJSON[], cache: {
        images: Record<string, Source>;
        files: Record<string, FileSource>;
    }): {
        [key: string]: Texture;
    };
    /**
     * Similar to ObjectLoader.parse, but supporting our extended custom materials, geometries, textures and objects.
     * this.parseJson uses it for parsing objects.
     */
    static parseObject(loader: ObjectLoader, json: Object3DJSON, geometries: Record<string, BufferGeometry>, materials: Record<string, Material>, textures: Record<string, Texture>, animations: Record<string, AnimationClip>, headless?: boolean, store?: StoreAdapter): Object3D | CustomObject3D;
    /**
     * Similar to ObjectLoader.parse, but supporting our extended custom materials, geometries, textures and objects.
     * @param loader
     * @param json
     * @param headless
     * @param files
     * @returns
     */
    static parseJson(loader: ObjectLoader, json: Object3DJSON & JSONMeta, headless?: boolean, files?: Record<string, FileSource>): CustomObject3D<{}> | Object3D<import("three").Object3DEventMap>;
}
export * from "./FileSource";
export * from './StoreAdapterLoader';
