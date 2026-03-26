import { BufferGeometry, Material, Object3D, Source, Texture, AnimationClip, PerspectiveCamera, OrthographicCamera, Skeleton, Bone, type QuaternionTuple } from "three";
import type { Directory } from "../../../fs";
import { File } from "../../../fs/core/File";
import { ColliderAdapter, ColliderObject } from "./ColliderAdapter";
import { FileSource } from "./FileSource";
import StoreAdapter from "./StoreAdapter";
import type { Cursor } from "../../Cursor";
export interface StoreAdapterConfigFile {
    uuid: string;
    name: string;
    description: string;
}
export declare enum Formatter {
    Geometries = 0,
    Materials = 1,
    Objects = 2,
    Textures = 3,
    Scripts = 4,
    Images = 5,
    Editor = 6,
    Sources = 7,
    Animations = 8,
    Shaders = 9,
    Skeletons = 10,
    Environment = 11,
    IK = 12,
    Assets = 13,
    Data = 14,
    Links = 15,
    Files = 16,
    Buffers = 17,
    Thumbnails = 18,
    Structure = 19,
    Colliders = 20
}
export interface StoreAdapterStateFile {
    cursor: ReturnType<Cursor["toJSON"]> | null;
    camera: {
        position: [number, number, number];
        quaternion: QuaternionTuple;
        zoom: number;
        fov: number;
        near: number;
        far: number;
    };
    length: {
        objects: number;
        lights: number;
        cameras: number;
        audios: number;
        files: number;
        geometries: number;
        materials: number;
        textures: number;
        images: number;
        scripts: number;
        sources: number;
        nodes: number;
        animations: number;
        skeletons: number;
        folders: number;
        colliders: number;
    };
    lastModified: string;
    createdAt: string;
    selection: string[] | string;
    system: {
        lightMultiplier: number;
        movementSpeed: number;
        lightmapVolumes: number;
        lightProbeVolumeVolumes: number;
        showGrid: boolean;
    };
}
export interface StoreAdapterImportList {
    geometries: string[];
    materials: string[];
    textures: string[];
    images: string[];
    objects: string[];
    animations: string[];
    skeletons: string[];
    assets?: string[];
    data?: string[];
    colliders?: string[];
}
export interface StoreAdapterS3Options {
    bucket: string;
    key: string;
    secret: string;
    endpoint: string;
    region?: string;
}
export interface StoreAdapterExportOptions {
    camera?: PerspectiveCamera | OrthographicCamera;
    selected?: Object3D;
    object?: boolean;
    exportLights?: boolean;
    exportCameras?: boolean;
    imageQuality?: number;
    telegram?: {
        token: string;
        chatId: string;
    };
    buckets?: StoreAdapterS3Options[];
    download?: boolean;
    system?: StoreAdapterStateFile["system"];
    format?: string;
}
export interface StoreAdapterImportOptions {
    camera?: PerspectiveCamera | OrthographicCamera;
    headless?: boolean;
    waitForImages?: boolean;
    /**
     * If the item being imported is a package or not.
     */
    package?: boolean;
    object?: boolean;
    resolved?: (key: string, progress: number) => void;
    onConfig?: (config: StoreAdapterConfigFile) => void;
    /**
     * Reading external data
     * @param key
     * @returns
     */
    read?: (key: string) => Promise<{
        data: ArrayBuffer;
        headers: Headers;
    } | null>;
    /**
     * Writing external data
     * @param key
     * @param data
     * @returns
     */
    write?: (key: string, data: {
        data: ArrayBuffer;
        headers: Headers;
    }) => void;
    /**
     * List of items to import
     */
    list?: StoreAdapterImportList;
    /**
     * Refrence objects from another store
     */
    ref?: StoreAdapter;
    /**
     * Import nodes
     */
    nodes?: boolean;
}
export declare class StoreAdapterLoader {
    store?: StoreAdapter;
    workplace?: Directory;
    private removedAttributes;
    private compressPromises;
    constructor(store?: StoreAdapter, workplace?: Directory);
    export(options: StoreAdapterExportOptions, external?: boolean): Promise<void>;
    private importing;
    import(options: StoreAdapterImportOptions): Promise<{
        textures: {
            [uuid: string]: Texture;
        };
        images: {
            [uuid: string]: Source;
        };
        materials: {
            [uuid: string]: Material;
        };
        geometries: {
            [uuid: string]: BufferGeometry;
        };
        objects: {
            [uuid: string]: Object3D;
        };
        animations: {
            [uuid: string]: AnimationClip;
        };
        skeletons: {
            [uuid: string]: Skeleton;
        };
        bones: {
            [uuid: string]: Bone;
        };
        files: {
            [uuid: string]: FileSource;
        };
        colliders: {
            [uuid: string]: ColliderObject | ColliderAdapter;
        };
    }>;
    getItems(options?: {
        headless?: boolean;
        waitForImages?: boolean;
    }): import("./StoreItemLoader").StoreItemLoader;
    /**
     * Like import, but this method will only import the objects and their dependencies without any other data.
     * UNFINISHED.
     * @param objectUuids
     * @returns
     */
    unique(objectUuids: string[]): Promise<{
        textures: {
            [uuid: string]: Texture;
        };
        images: {
            [uuid: string]: Source;
        };
        materials: {
            [uuid: string]: Material;
        };
        geometries: {
            [uuid: string]: BufferGeometry;
        };
        objects: {
            [uuid: string]: Object3D;
        };
        animations: {
            [uuid: string]: AnimationClip;
        };
        skeletons: {
            [uuid: string]: Skeleton;
        };
        bones: {
            [uuid: string]: Bone;
        };
        files: {
            [uuid: string]: FileSource;
        };
        colliders: {
            [uuid: string]: ColliderObject | ColliderAdapter;
        };
    }>;
    /**
     * Load a single object and its minimal dependency set into the current store without a full import.
     * This is an additive API and preserves existing import/export behavior.
     */
    loadObject(uuid: string, _options?: Pick<StoreAdapterImportOptions, "headless" | "waitForImages" | "nodes" | "ref">): Promise<Object3D | undefined>;
    /**
     * Thubnails generated from this function are considered main thumbnails. they will have an ".index" extention before the file extention when written to the filesystem.
     * @param directory
     * @param file An http url or a file
     */
    static thumbnail(directory: Directory, data: string, action: "remove", name?: string): Promise<void>;
    static thumbnail(directory: Directory, data: string, action: "read", name?: string): Promise<[url: string, blob?: Blob] | void>;
    static thumbnail(directory: Directory, data: globalThis.File | Blob | string, action: "add", name?: string): Promise<[fileName: string, file: File] | void>;
}
