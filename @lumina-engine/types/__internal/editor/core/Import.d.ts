import { Loader, TextureLoader, Object3D, LoadingManager, AnimationClip } from "three";
import { GLTFLoader } from "../../shared/addons/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "../../shared/addons/jsm/loaders/OBJLoader";
import { StoreAdapterLoader } from "./adapters/engine/StoreAdapter.js";
import { FBXLoader } from "../../shared/addons/jsm/loaders/FBXLoader.js";
import { LUT3dlLoader, LUTCubeLoader } from "postprocessing";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
export interface ImportLoaders {
    /** Loader for gltf, glb */
    gltf: GLTFLoader;
    /** OBJ loader */
    obj: OBJLoader;
    /** FBX loader */
    fbx: FBXLoader;
    /** ZIP loader */
    store: StoreAdapterLoader;
    /** Texture Loader */
    texture: TextureLoader;
    cube: LUTCubeLoader;
    "3dl": LUT3dlLoader;
    [key: string]: Loader | StoreAdapterLoader;
}
export interface ImportResult {
    obj?: Object3D;
    gltf?: GLTF;
    fbx?: {
        object: Object3D;
        animations: AnimationClip[];
    };
    [key: string]: any;
}
export declare const SUPPORTED_VIDEO_FORMATS: Map<string[], string[]>;
export declare const SUPPORTED_IMAGE_FORMATS: Map<string[], string[]>;
export default class Import {
    static loadingManager: LoadingManager;
    static loaders: ImportLoaders;
    private static accepts;
    static fs<K extends keyof ImportLoaders>(name: K, file?: File | Blob, returnResult?: boolean): Promise<ImportResult[K] | undefined>;
}
