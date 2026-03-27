import type { CustomObject3D } from "../../../objects/CustomObject3D";
import type { SvelteComponentRegistry } from "../../components/SvelteComponentRegistry";
import type { ComponentInstance } from "../../components/types";
import type { ModuleRegistry } from "../../modules/ModuleRegistry";
import type { ImportTransformer } from "../../modules/ImportTransformer";
import type { PluginCore } from "./PluginAdapter";
import type { BufferGeometry, Material, Object3D, Texture, Vector3 } from "three";
import type StoreAdapter from "./StoreAdapter";
import type { ImportResult } from "../../Import";
import type { Commands, CommandType } from "../../../commands/Commands";
import type { PluginCanvasRenderer } from "../../../services/PluginCanvasRenderer";
type EditorWindows = "script" | "scene" | "inspector" | "hierarchy" | "assets" | "uv" | "minimap" | "node" | "timeline" | "terminal" | "collider" | "package" | "git" | "iconGenerator" | "pluginManager" | "pluginExplorer" | "pluginEditor" | "moduleExplorer" | "pluginTerminal" | "pluginProperties" | "shaderEditor";
export interface IPluginAPI {
    init(name: string, description: string): Promise<void>;
    registerCustomObject(name: string, object: typeof CustomObject3D, context: PluginExecutionContext): void;
    registerExporter(name: string, exporter: (store: StoreAdapter) => Promise<any>, context: PluginExecutionContext): void;
    getStore(): StoreAdapter;
    log(message: string, level?: 'info' | 'warn' | 'error'): void;
    registerModule(name: string, exports: any): void;
    importModule(specifier: string): Promise<any>;
    hasModule(specifier: string): boolean;
    getRegisteredModules(): string[];
    disableFeature(feature: string): void;
    enableFeature(feature: string): void;
    isFeatureEnabled(feature: string): boolean;
    getDisabledFeatures(): string[];
    disableObject(type: string): void;
    enableObject(type: string): void;
    isObjectDisabled(type: string): boolean;
    getDisabledObjects(): string[];
    registerImporter(name: string, handler: ImportHandler): void;
    registerExporter(name: string, handler: ExportHandler): void;
    getRegisteredImporters(): string[];
    getRegisteredExporters(): string[];
    requestReadFile(options?: FileReadOptions): Promise<File | File[]>;
    requestSaveFile(data: Blob | string | ArrayBuffer, options?: FileSaveOptions): Promise<void>;
    registerImportFormat(formatId: string, config: ImporterConfig): void;
    registerExportFormat(formatId: string, config: ExporterConfig): void;
    addMenuItem(config: MenuItemConfig): void;
    addToolbarButton(config: ToolbarButtonConfig): void;
    showNotification(message: string, type?: 'info' | 'success' | 'warning' | 'error', duration?: number): void;
    registerComponent(name: string, source: string, metadata?: any): Promise<void>;
    createComponent(componentName: string, target: HTMLElement | string, props?: any): Promise<ComponentInstance>;
    updateComponent(instanceId: string, props: any): boolean;
    destroyComponent(instanceId: string): boolean;
    getComponentInstances(componentName?: string): ComponentInstance[];
    hasComponent(name: string): boolean;
    setTitle(title: string): void;
    getTitle(): string;
    disableMode(mode: 'edit' | 'view'): void;
    enableMode(mode: 'edit' | 'view'): void;
    getModuleRegistry(): ModuleRegistry;
    getImportTransformer(): ImportTransformer;
    getPluginCore(): PluginCore;
    getComponentRegistry(): SvelteComponentRegistry;
    logInfo(message: string, context?: any): void;
    logWarning(message: string, context?: any): void;
    logError(message: string, context?: any): void;
    registerMaterial(name: string, material: Material, options?: {
        locked?: boolean;
    }): void;
    registerGeometry(name: string, geometry: BufferGeometry, options?: {
        locked?: boolean;
    }): void;
    showDialog(title: string, description: string, options: DialogFormOptions[], props?: {
        maxWidth?: number | string;
        maxHeight?: number | string;
        confirmText?: string | null;
    }): {
        promise: Promise<DialogFormOptions[]>;
        close: () => void;
    };
    disableWindow(...windowTypes: EditorWindows[]): void;
    enableWindow(windowType: EditorWindows): void;
    isWindowDisabled(windowType: EditorWindows): boolean;
    getDisabledWindows(): EditorWindows[];
    lockInspectorGroup(groupName: string): void;
    unlockInspectorGroup(groupName: string): void;
    isInspectorGroupLocked(groupName: string): boolean;
    getLockedInspectorGroups(): string[];
    hideInspectorGroup(...groupNames: string[]): void;
    showInspectorGroup(groupName: string): void;
    isInspectorGroupHidden(groupName: string): boolean;
    getHiddenInspectorGroups(): string[];
    disableTransformTool(toolType: string): void;
    enableTransformTool(toolType: string): void;
    isTransformToolDisabled(toolType: string): boolean;
    getDisabledTransformTools(): string[];
    registerInspectorComponent(config: InspectorComponentConfig): void;
    unregisterInspectorComponent(componentName: string): void;
    updateInspectorComponentOption(componentName: string, groupName: string, optionId: string | number, value: any): boolean;
    getInspectorComponents(): InspectorComponentConfig[];
    hasInspectorComponent(componentName: string): boolean;
    import<K extends keyof ImportResult>(name: K, file?: File): Promise<ImportResult[K] | undefined>;
    /**
   * Get the value of an option for an inspector component
   * @param componentName - The component name
   * @param groupName - The group name
   * @param optionId - The option ID
   */
    getInspectorComponentOptionValue(componentName: string, groupName: string, optionId: string | number): any | null;
    /**
   * Command event data passed to command event callbacks
   */
    /**
     * Register a watcher for command events (execute, undo, redo)
     * @param eventType - The command event type to watch ('execute', 'undo', 'redo')
     * @param callback - Called when the command event occurs
     * @param commandTypeFilter - Optional filter to only receive events for specific command types (e.g., 'AddObjectCommand', 'RemoveObjectCommand')
     */
    onCommandEvent(eventType: 'execute' | 'undo' | 'redo', callback: (data: {
        command: Commands;
        commandType: CommandType;
        commandName: string;
        action: 'execute' | 'undo' | 'redo';
    }) => void, commandTypeFilter?: CommandType | CommandType[]): () => void;
    /**
     * Create a new PluginCanvasRenderer instance for rendering 3D objects
     * @param options - Renderer configuration options
     * @returns A new PluginCanvasRenderer instance
     */
    createCanvasRenderer(options?: CanvasRendererOptions): PluginCanvasRenderer;
    /**
     * Generate a thumbnail blob of a Three.js object using the optimized renderer
     * @param object - The Object3D to generate a thumbnail for
     * @param options - Thumbnail generation options
     * @returns Promise that resolves with the thumbnail as a Blob
     */
    generateThumbnail(object: Object3D, options?: ThumbnailGenerationOptions): Promise<Blob>;
    /**
     * Generate a thumbnail data URL of a Three.js object
     * @param object - The Object3D to generate a thumbnail for
     * @param options - Thumbnail generation options
     * @returns Promise that resolves with the thumbnail as a data URL string
     */
    generateThumbnailDataURL(object: Object3D, options?: ThumbnailGenerationOptions): Promise<string>;
    /**
     * Render an object to a canvas element
     * @param object - The Object3D to render
     * @param options - Render options
     * @returns The canvas element containing the rendered object
     */
    renderObjectToCanvas(object: Object3D, options?: RenderToCanvasOptions): HTMLCanvasElement;
    /**
     * Render a material preview to a canvas element
     * @param material - The material to render
     * @param options - Render options
     * @returns The canvas element containing the rendered material preview
     */
    renderMaterialToCanvas(material: Material, options?: RenderMaterialOptions): HTMLCanvasElement;
    /**
     * Render a geometry preview to a canvas element
     * @param geometry - The geometry to render
     * @param options - Render options
     * @returns The canvas element containing the rendered geometry preview
     */
    renderGeometryToCanvas(geometry: BufferGeometry, options?: RenderGeometryOptions): HTMLCanvasElement;
    /**
     * Render a texture preview to a canvas element
     * @param texture - The texture to render
     * @param options - Render options
     * @returns The canvas element containing the rendered texture preview
     */
    renderTextureToCanvas(texture: Texture, options?: RenderTextureOptions): HTMLCanvasElement;
}
/**
 * File read options for requestReadFile
 */
export interface FileReadOptions {
    /** Accepted file extensions (e.g., ['.json', '.txt']) */
    extensions?: string[];
    /** MIME types to accept */
    mimeTypes?: string[];
    /** Allow multiple file selection */
    multiple?: boolean;
    /** Suggested file name */
    suggestedName?: string;
}
/**
 * File save options for requestSaveFile
 */
export interface FileSaveOptions {
    /** Suggested file name */
    suggestedName?: string;
    /** File extension */
    extension?: string;
    /** MIME type */
    mimeType?: string;
}
/**
 * Importer configuration for asset registration
 */
export interface ImporterConfig {
    /** File extension(s) to handle */
    extensions: string[];
    /** MIME types (optional) */
    mimeTypes?: string[];
    /** Import handler function */
    import: (file: File) => Promise<ImporterResult>;
    /** Human-readable name */
    name: string;
    /** Description of what this importer does */
    description?: string;
}
/**
 * Exporter configuration for asset registration
 */
export interface ExporterConfig {
    /** Export handler function */
    export: () => Promise<ExporterResult>;
    /** Human-readable name */
    name: string;
    /** File extension for export */
    extension: string;
    /** MIME type */
    mimeType?: string;
    /** Description of what this exporter does */
    description?: string;
}
/**
 * Result from an importer function
 */
export interface ImporterResult {
    /** Whether import was successful */
    success: boolean;
    /** Number of objects imported */
    objectsImported?: number;
    /** Error message if failed */
    error?: string;
    /** Warnings */
    warnings?: string[];
}
/**
 * Result from an exporter function
 */
export interface ExporterResult {
    /** Whether export was successful */
    success: boolean;
    /** The exported data */
    data?: Blob | string;
    /** Suggested filename */
    filename?: string;
    /** Error message if failed */
    error?: string;
}
/**
 * Menu item configuration
 */
export interface MenuItemConfig {
    /** Path to menu item (e.g., "File/Import/My Format") */
    path: string;
    /** Callback when clicked */
    callback: () => void;
    /** Icon (optional) */
    icon?: string;
    /** Keyboard shortcut (optional) */
    shortcut?: string;
}
/**
 * Toolbar button configuration
 */
export interface ToolbarButtonConfig {
    /** Icon class or URL */
    icon: string;
    /** Tooltip text */
    tooltip: string;
    /** Callback when clicked */
    callback: () => void;
    /** Toolbar location */
    toolbar?: 'main' | 'secondary' | 'bottom';
}
/**
 * Dialog form option types (matching Form.svelte types)
 */
export interface DialogFormSelectOption<T = "text" | "number"> {
    type: "select";
    label: string;
    options: Array<{
        label: string;
        value: T extends "text" ? string : number;
        disabled?: boolean;
    }>;
    activeIndex?: number;
    flex?: boolean;
}
export interface DialogFormSetOption {
    type: "set";
    label: string;
    options: string[];
    set?: Set<string>;
    activeIndexes?: number[];
    flex?: boolean;
}
export interface DialogFormListOption<T = "text" | "number"> {
    type: "list";
    label: string;
    options: Array<{
        label: string;
        icon?: string;
        value: T extends "text" ? string : number;
        disabled?: boolean;
    }>;
    activeIndexes?: Set<number>;
    flex?: boolean;
}
export interface DialogFormInputOption<T = "text" | "number"> {
    type: T;
    label: string;
    placeholder?: string;
    value?: T extends "number" ? number : string;
    large?: boolean;
    tag?: "%" | "px" | "hex";
    flex?: boolean;
}
export interface DialogFormCheckboxOption {
    type: "checkbox";
    label: string;
    value?: boolean;
    flex?: boolean;
}
export interface DialogFormMarkdownOption {
    type: "markdown";
    label: string;
    value: string;
    flex?: boolean;
}
export type DialogFormOptions<T = "text" | "number"> = DialogFormSelectOption<T> | DialogFormInputOption<T> | DialogFormCheckboxOption | DialogFormSetOption | DialogFormListOption<T> | DialogFormMarkdownOption;
export interface PredefinedMaterial {
    name: string;
    material: Material;
    locked?: boolean;
}
export interface PredefinedGeometry {
    name: string;
    geometry: BufferGeometry;
    locked?: boolean;
}
/**
 * Options for creating a PluginCanvasRenderer
 */
export interface CanvasRendererOptions {
    /** Width of the canvas in pixels */
    width?: number;
    /** Height of the canvas in pixels */
    height?: number;
    /** Whether to enable orbit controls for interactive viewing */
    enableControls?: boolean;
    /** Whether to auto-fit the object to the camera view using Box3 */
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
 * Options for thumbnail generation
 */
export interface ThumbnailGenerationOptions {
    /** Width of the thumbnail in pixels */
    width?: number;
    /** Height of the thumbnail in pixels */
    height?: number;
    /** Whether to apply initial rotation to the object */
    rotation?: boolean;
    /** Initial rotation values [x, y, z] in radians */
    rotationValues?: [number, number, number];
    /** Whether to auto-fit the object to camera view */
    autoFit?: boolean;
    /** Padding multiplier for auto-fit */
    fitPadding?: number;
    /** Output format */
    format?: 'png' | 'jpeg' | 'webp';
    /** Quality for lossy formats (0-1) */
    quality?: number;
    /** Exposure for tone mapping */
    exposure?: number;
}
/**
 * Options for rendering an object to canvas
 */
export interface RenderToCanvasOptions {
    /** Width of the canvas in pixels */
    width?: number;
    /** Height of the canvas in pixels */
    height?: number;
    /** Whether to apply initial rotation */
    rotation?: boolean;
    /** Initial rotation values [x, y, z] in radians */
    rotationValues?: [number, number, number];
    /** Whether to auto-fit the object to camera view */
    autoFit?: boolean;
    /** Padding multiplier for auto-fit */
    fitPadding?: number;
    /** Camera position override */
    cameraPosition?: Vector3;
    /** Camera look-at target override */
    lookAt?: Vector3;
    /** Exposure for tone mapping */
    exposure?: number;
}
/**
 * Options for rendering a material to canvas
 */
export interface RenderMaterialOptions {
    /** Width of the canvas in pixels */
    width?: number;
    /** Height of the canvas in pixels */
    height?: number;
    /** Geometry to use for the material preview */
    geometry?: BufferGeometry;
    /** Whether to apply initial rotation */
    rotation?: boolean;
    /** Exposure for tone mapping */
    exposure?: number;
}
/**
 * Options for rendering a geometry to canvas
 */
export interface RenderGeometryOptions {
    /** Width of the canvas in pixels */
    width?: number;
    /** Height of the canvas in pixels */
    height?: number;
    /** Whether to apply initial rotation */
    rotation?: boolean;
    /** Exposure for tone mapping */
    exposure?: number;
}
/**
 * Options for rendering a texture to canvas
 */
export interface RenderTextureOptions {
    /** Width of the canvas in pixels */
    width?: number;
    /** Height of the canvas in pixels */
    height?: number;
    /** Exposure for tone mapping */
    exposure?: number;
}
/**
 * Import handler function type for custom import formats
 */
export type ImportHandler = (data: Blob | ArrayBuffer | string, filename?: string) => Promise<{
    objects?: any[];
    materials?: any[];
    textures?: any[];
    geometries?: any[];
    success: boolean;
    errors?: string[];
}>;
/**
 * Export handler function type for custom export formats
 */
export type ExportHandler = (store: StoreAdapter, options?: any) => Promise<{
    data: Blob | string;
    filename: string;
    mimeType: string;
    success: boolean;
    errors?: string[];
}>;
export interface PluginMetadata {
    uuid: string;
    name: string;
    description: string;
    version: string;
    author: string;
    icon?: string;
    tags?: string[];
    dependencies?: string[];
    createdAt: Date;
    updatedAt: Date;
    license?: {
        type: 'free' | 'commercial' | 'enterprise';
        restrictions?: string[];
        attribution?: string;
    };
    permissions?: {
        name: string;
        description: string;
        required: boolean;
    }[];
    capabilities?: string[];
    startupCustomization?: {
        logo?: string;
        colors?: Record<string, string>;
        layout?: Record<string, any>;
        additionalOptions?: any[];
    };
    disabledFeatures?: string[];
    customFeatures?: {
        name: string;
        description: string;
        enabled: boolean;
    }[];
    moduleExports?: {
        name: string;
        description?: string;
        version?: string;
    }[];
    minimumEngineVersion?: string;
    type?: 'object' | 'exporter' | 'importer' | 'ui' | 'utility' | 'integration';
}
export interface PluginModule {
    name: string;
    path: string;
    code: string;
    exports?: any;
}
export interface StoredPlugin {
    metadata: PluginMetadata;
    code: string;
    modules?: PluginModule[];
    isActive: boolean;
    hasErrors: boolean;
    lastError?: string;
}
export interface PluginExecutionContext {
    plugin: StoredPlugin;
    exports: {
        customObjects: Map<string, typeof CustomObject3D>;
        exporters: Map<string, (store: StoreAdapter) => Promise<void>>;
    };
}
export interface PluginTemplate {
    name: string;
    description: string;
    code: string;
    icon: string;
}
/**
 * Option type for inspector components
 * Maps to SandboxComponentOptionMap keys
 */
export type InspectorOptionType = "text" | "vector2" | "vector3" | "quaternion" | "color" | "number" | "boolean" | "select" | "set" | "texture" | "material" | "geometry" | "object";
/**
 * Configuration for a single option in an inspector component group
 */
export interface InspectorComponentOption {
    id: string | number;
    type: InspectorOptionType;
    name: string;
    value: any;
    options?: {
        min?: number;
        max?: number;
        step?: number;
        input?: boolean;
        placeholder?: string;
        options?: string[];
        type?: "string" | "number";
        readonly?: boolean;
        types?: string[];
    };
    colors?: string[];
    icon?: string;
}
/**
 * Configuration for a group of options in an inspector component
 */
export interface InspectorComponentGroup {
    name: string;
    icon?: string;
    options: InspectorComponentOption[];
}
/**
 * Configuration for a global plugin inspector component
 */
export interface InspectorComponentConfig {
    /** Unique name for this component within the plugin */
    name: string;
    /** Display title for the component */
    title: string;
    /** Icon class for the component header */
    icon?: string;
    /** Plugin ID that owns this component (set automatically) */
    pluginId?: string;
    /** Groups of options to display */
    groups: InspectorComponentGroup[];
    /** Whether the component is currently visible */
    visible?: boolean;
    /** Object type filter - only show for specific object types */
    objectTypes?: string[];
    /** Priority for ordering (higher = shown first) */
    priority?: number;
    /** Callback when an option value changes */
    onChange?: (groupName: string, optionId: string | number, value: any) => void;
}
export declare const DefaultPluginTemplates: PluginTemplate[];
export {};
