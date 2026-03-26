import { ShaderMaterial, Mesh, Texture, type TextureFilter, Vector3, WebGLRenderer, WebGLRenderTarget, type Material } from "three";
import { MeshBVH } from "three-mesh-bvh";
import StoreAdapter from "./StoreAdapter";
export declare const renderAtlas: (renderer: WebGLRenderer, meshs: Mesh[], resolution: number, dialate?: boolean) => {
    positionTexture: WebGLRenderTarget<Texture>;
    normalTexture: WebGLRenderTarget<Texture>;
};
export type LightmapperMaterialOptions = {
    bvh: MeshBVH;
    positions: Texture;
    normals: Texture;
    casts: number;
    lightPosition: Vector3;
    lightSize: number;
    opacity: number;
    sampleIndex: number;
    directLightEnabled: boolean;
    indirectLightEnabled: boolean;
    ambientLightEnabled: boolean;
    ambientDistance: number;
    directLightWeight?: number;
    indirectLightWeight?: number;
    ambientOcclusionWeight?: number;
    indirectBrightnessFactor?: number;
    aoBrightnessFactor?: number;
};
export declare class DenoiseMaterial extends ShaderMaterial {
    texture: Texture;
    constructor(texture: Texture, sigma?: number, kSigma?: number, threshold?: number);
}
export declare class LightmapperMaterial extends ShaderMaterial {
    constructor(options: LightmapperMaterialOptions);
}
export type Lightmapper = {
    renderTexture: WebGLRenderTarget;
    render: () => number;
};
export declare const generateLightmapper: (renderer: WebGLRenderer, positions: Texture, normals: Texture, bvh: MeshBVH, resolution: number, options: LightmapAdapterBakeOptions["raycast"]) => Lightmapper;
export declare const renderSampleCount: (lightmapper: Lightmapper, samples?: number, onProgress?: (progress: number) => void) => Promise<void>;
export declare const renderTime: (lightmapper: Lightmapper, time?: number, onProgress?: (progress: number) => void) => Promise<void>;
export interface LightmapAdapterBakeOptions {
    input: Mesh[];
    resolution: number;
    geometry: {
        input?: number;
        output?: number;
    };
    texture: {
        output?: Texture;
        autoCreate?: boolean;
        downscaleTo?: number;
    };
    raycast: {
        casts: number;
        lightPosition: Vector3;
        lightSize: number;
        filterMode: TextureFilter;
        directLight: boolean;
        indirectLight: boolean;
        ambientLight: boolean;
        ambientDistance: number;
        aoBrightnessFactor: number;
        indirectBrightnessFactor: number;
        weights: {
            directLight: number;
            indirectLight: number;
            ambientOcclusion: number;
        };
    };
    render: {
        time?: number;
        samples?: number;
    };
    denoise?: {
        sigma?: number;
        kSigma?: number;
        threshold?: number;
    };
}
export declare class LightmapAdapter {
    store: StoreAdapter;
    private renderer;
    private scene;
    /**
     * AmbientLight, PointLight etc.
     */
    private lights;
    private bvh;
    private attributes;
    constructor(store: StoreAdapter);
    init(): Promise<void>;
    private nextFrame;
    getScene(): Promise<void>;
    baking: Map<string, number>;
    watching: Map<string, Array<(progress: number) => void>>;
    watch(mesh: string, callback: (progress: number) => void): void;
    unwatch(mesh: string, callback: (progress: number) => void): void;
    bake(options: LightmapAdapterBakeOptions, onProgress?: (progress: number) => void): Promise<void | Blob>;
    renderMaterial(material: Material, output: Texture, downscaleTo?: number): Promise<void | Blob>;
    output(output: Texture, downscaleTo?: number): Promise<void | Blob>;
    denoise(input: Texture, output: Texture, options: LightmapAdapterBakeOptions["denoise"]): Promise<void | Blob>;
}
