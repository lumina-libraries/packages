import type StoreAdapter from "../StoreAdapter";
import type { StoreFileSystem } from "../fs/StoreFileSystem";
import { type Texture, type Source, type Material, type BufferGeometry, type AnimationClip, type Skeleton, type Object3D, ObjectLoader } from "three";
import type { FileSource } from "../StoreAdapter";
export interface LoadOptions {
    headless?: boolean;
    waitForImages?: boolean;
}
export declare class LoaderContext {
    readonly store: StoreAdapter;
    readonly fs: StoreFileSystem;
    readonly objectLoader: ObjectLoader;
    readonly options: LoadOptions;
    constructor(store: StoreAdapter, fs: StoreFileSystem, objectLoader?: ObjectLoader, options?: LoadOptions);
    readonly textures: Map<string, Texture>;
    readonly images: Map<string, Source>;
    readonly materials: Map<string, Material>;
    readonly geometries: Map<string, BufferGeometry<import("three").NormalBufferAttributes, import("three").BufferGeometryEventMap>>;
    readonly animations: Map<string, AnimationClip>;
    readonly skeletons: Map<string, Skeleton>;
    readonly objects: Map<string, Object3D<import("three").Object3DEventMap>>;
    readonly files: Map<string, FileSource<File | Blob | ArrayBuffer>>;
}
