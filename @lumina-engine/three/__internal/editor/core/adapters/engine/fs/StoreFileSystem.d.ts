import type { Directory } from "../../../../fs/core/Directory";
import { File } from "../../../../fs/core/File";
import type { BufferGeometryJSON, TextureJSON, Object3DJSON, AnimationClipJSON, SkeletonJSON } from "three";
export type Uuid = string;
export interface Section<J> {
    list(): Promise<Uuid[]>;
    exists(uuid: Uuid): Promise<boolean>;
    readJson(uuid: Uuid): Promise<J | null>;
}
export declare class StoreFileSystem {
    private readonly root;
    constructor(root: Directory);
    private morphias;
    private morphiaInit?;
    private static readonly formatterIndexByDir;
    private ensureMorphia;
    private getDir;
    private section;
    geometries(buffersDirName?: string): Section<BufferGeometryJSON>;
    materials(): Section<Record<string, unknown>>;
    textures(): Section<TextureJSON>;
    images(): Section<import("three").SourceJSON>;
    objects(): Section<Object3DJSON>;
    animations(): Section<AnimationClipJSON>;
    skeletons(): Section<SkeletonJSON>;
    shaders(): Promise<{
        getFile: (name: string) => Promise<File>;
    }>;
    scripts(): Promise<{
        getFile: (name: string) => Promise<File>;
    }>;
    files(): Promise<{
        list: () => Promise<string[]>;
        getFile: (name: string) => Promise<File>;
        directory: Directory<import("../../../../fs/core/Directory").DirectoryHandler>;
    }>;
    sources(): Promise<{
        list: () => Promise<string[]>;
        getFile: (name: string) => Promise<File>;
        directory: Directory<import("../../../../fs/core/Directory").DirectoryHandler>;
    }>;
    links(): Section<object>;
    colliders(): Section<object>;
    editor(): Promise<{
        getFile: (name: string) => Promise<File>;
    }>;
    buffers(): Promise<{
        getFile: (name: string) => Promise<File>;
        directory: Directory<import("../../../../fs/core/Directory").DirectoryHandler>;
    }>;
}
