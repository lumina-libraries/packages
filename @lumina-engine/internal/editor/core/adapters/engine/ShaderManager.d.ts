import type { Material } from "three";
import type StoreAdapter from "./StoreAdapter";
export interface CustomUniform {
    value: any;
    type?: string;
}
export interface CustomUniforms {
    [key: string]: CustomUniform;
}
export declare class ShaderManager {
    private store;
    private originalShaderChunks;
    customShaderChunks: Record<string, string>;
    customUniforms: CustomUniforms;
    private patchedMaterials;
    constructor(store: StoreAdapter);
    /**
     * Set a custom shader chunk
     */
    setShaderChunk(chunkName: string, code: string): void;
    /**
     * Set custom uniforms
     */
    setCustomUniforms(uniforms: CustomUniforms): void;
    /**
     * Apply custom shaders to all materials
     */
    applyShaders(): void;
    setNeedsUpdate(): void;
    /**
     * Force material to recompile by invalidating shader cache
     *
     * The issue was that patchedMaterials WeakSet prevented re-patching,
     * and material.needsUpdate = true alone doesn't force program recompilation
     * when shaders change. This method forces Three.js to generate a new program.
     */
    private forceRecompile;
    /**
     * Alternative method: Force recompile by disposing and recreating shader programs
     */
    forceRecompileAlternative(material: Material): void;
    /**
     * Patch a material with custom uniforms
     */
    private patchMaterial;
    /**
     * Update dynamic uniforms (called each frame)
     */
    updateUniforms(deltaTime: number): void;
    /**
     * Revert all shader chunks to their original state
     */
    revertAll(): void;
    /**
     * Force recompilation of all materials (public method)
     */
    forceRecompileAll(): void;
    /**
     * Export current shader configuration
     */
    export(): {
        customShaderChunks: Record<string, string>;
        customUniforms: CustomUniforms;
    };
    /**
     * Import shader configuration
     */
    import(config: {
        customShaderChunks?: Record<string, string>;
        customUniforms?: CustomUniforms;
    }): void;
    /**
     * Handle new material added to store
     */
    onMaterialAdded(material: Material): void;
    /**
     * Clean up
     */
    dispose(): void;
}
