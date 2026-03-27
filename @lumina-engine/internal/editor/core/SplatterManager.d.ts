import { MeshStandardMaterial, Texture, type WebGLProgramParametersWithUniforms } from "three";
interface SplatterManagerParameters {
    amount: number;
    scale: number;
    mix: Texture;
    maps: Array<Texture | null>;
    orms: Array<Texture | null>;
    normals: Array<Texture | null>;
}
export declare class SplatterMaterial extends MeshStandardMaterial {
    parameters: SplatterManagerParameters;
    constructor(parameters?: SplatterManagerParameters);
    get count(): number;
    customProgramCacheKey(): string;
    set mixMap(mix: Texture);
    set scale(scale: number);
    setTexture(id: string, index: number, texture: Texture | null): void;
    set map1(map: Texture | null);
    set map2(map: Texture | null);
    set map3(map: Texture | null);
    set normalMap1(map: Texture | null);
    set normalMap2(map: Texture | null);
    set normalMap3(map: Texture | null);
    set aoMap1(map: Texture | null);
    set aoMap2(map: Texture | null);
    set aoMap3(map: Texture | null);
    shader?: WebGLProgramParametersWithUniforms;
    onBeforeCompile(parameters: WebGLProgramParametersWithUniforms): void;
}
export {};
