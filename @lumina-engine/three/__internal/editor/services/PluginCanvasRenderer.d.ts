import { BufferGeometry, Material, Object3D, PerspectiveCamera, Scene, Texture, Vector3 } from "three";
/**
 * Configuration options for the PluginCanvasRenderer
 */
export interface PluginCanvasRendererOptions {
    /** Width of the canvas in pixels */
    width?: number;
    /** Height of the canvas in pixels */
    height?: number;
    /** Whether to enable orbit controls */
    enableControls?: boolean;
    /** Whether to auto-fit the object to the camera view */
    autoFit?: boolean;
    /** Padding multiplier for auto-fit (1.0 = exact fit, 1.5 = 50% padding) */
    fitPadding?: number;
    /** Whether to enable antialiasing */
    antialias?: boolean;
    /** Resolution scale (0.5 = half resolution, 1.0 = full, 2.0 = double) */
    resolution?: number;
    /** Exposure for tone mapping */
    exposure?: number;
    /** Whether to preserve drawing buffer (needed for toBlob/toDataURL) */
    preserveDrawingBuffer?: boolean;
}
/**
 * Render request options for rendering objects
 */
export interface RenderObjectOptions {
    /** Object to render */
    object: Object3D;
    /** Whether to apply initial rotation */
    rotation?: boolean;
    /** Initial rotation values [x, y, z] in radians */
    rotationValues?: [number, number, number];
    /** Override auto-fit setting for this render */
    autoFit?: boolean;
    /** Padding multiplier for auto-fit */
    fitPadding?: number;
    /** Camera position override */
    cameraPosition?: Vector3;
    /** Camera look-at target override */
    lookAt?: Vector3;
    /** Exposure override */
    exposure?: number;
}
/**
 * Render request options for materials
 */
export interface RenderMaterialOptions {
    /** Material to render */
    material: Material;
    /** Geometry to use for the material preview */
    geometry?: BufferGeometry;
    /** Whether to apply initial rotation */
    rotation?: boolean;
    /** Exposure override */
    exposure?: number;
}
/**
 * Thumbnail generation options
 */
export interface ThumbnailOptions {
    /** Output format */
    format?: "png" | "jpeg" | "webp";
    /** Quality for lossy formats (0-1) */
    quality?: number;
    /** Whether to return as data URL instead of Blob */
    asDataURL?: boolean;
    /** Whether to apply initial rotation */
    rotation?: boolean;
    /** Initial rotation values [x, y, z] in radians */
    rotationValues?: [number, number, number];
    /** Override auto-fit setting for this render */
    autoFit?: boolean;
    /** Padding multiplier for auto-fit */
    fitPadding?: number;
    /** Exposure override */
    exposure?: number;
}
/**
 * PluginCanvasRenderer - A high-performance canvas renderer for the plugin API
 *
 * Features:
 * - Renderer pooling for efficient reuse
 * - Box3-based auto-fit camera positioning
 * - Optimized for thumbnail generation
 * - Proper memory management and disposal
 * - Support for Object3D, Material, Geometry, and Texture rendering
 */
export declare class PluginCanvasRenderer {
    private static rendererPool;
    private static maxPoolSize;
    private static poolCleanupInterval;
    private readonly scene;
    private readonly camera;
    private readonly lights;
    private controls;
    private currentRenderer;
    private currentObject;
    private animationFrameId;
    private options;
    private readonly _box3;
    private readonly _center;
    private readonly _size;
    private readonly _cameraPosition;
    private static defaultSphereGeometry;
    private static defaultMaterial;
    constructor(options?: PluginCanvasRendererOptions);
    /**
     * Initialize static resources shared across all instances
     */
    private static initializeStaticResources;
    /**
     * Start the pool cleanup interval
     */
    private static startPoolCleanup;
    /**
     * Get or create a renderer from the pool
     */
    private acquireRenderer;
    /**
     * Release a renderer back to the pool
     */
    private releaseRenderer;
    /**
     * Calculate camera position to fit an object using Box3
     */
    private fitCameraToObject;
    /**
     * Clear the scene of rendered objects (keeps lights and camera)
     */
    private clearScene;
    /**
     * Render an Object3D to the canvas
     */
    renderObject(options: RenderObjectOptions): HTMLCanvasElement;
    /**
     * Render a Material preview
     */
    renderMaterial(options: RenderMaterialOptions): HTMLCanvasElement;
    /**
     * Render a Texture preview
     */
    renderTexture(texture: Texture, options?: {
        exposure?: number;
    }): HTMLCanvasElement;
    /**
     * Render a BufferGeometry preview
     */
    renderGeometry(geometry: BufferGeometry, options?: {
        rotation?: boolean;
        exposure?: number;
    }): HTMLCanvasElement;
    /**
     * Generate a thumbnail blob from the current canvas
     */
    generateThumbnail(object: Object3D, options?: ThumbnailOptions): Promise<Blob | string>;
    /**
     * Get the current canvas element
     */
    getCanvas(): HTMLCanvasElement | null;
    /**
     * Attach the canvas to a DOM element
     */
    attachTo(parent: HTMLElement): void;
    /**
     * Detach the canvas from its parent
     */
    detach(): void;
    /**
     * Start continuous animation loop
     */
    startAnimation(onFrame?: (delta: number) => void): void;
    /**
     * Stop the animation loop
     */
    stopAnimation(): void;
    /**
     * Resize the renderer
     */
    resize(width: number, height: number): void;
    /**
     * Perform a single render
     */
    render(exposure?: number): void;
    /**
     * Get access to the scene for advanced usage
     */
    getScene(): Scene;
    /**
     * Get access to the camera for advanced usage
     */
    getCamera(): PerspectiveCamera;
    /**
     * Dispose of this renderer instance
     */
    dispose(): void;
    /**
     * Dispose of all pooled renderers (call on app shutdown)
     */
    static disposeAll(): void;
}
export declare function createPluginCanvasRenderer(options?: PluginCanvasRendererOptions): PluginCanvasRenderer;
