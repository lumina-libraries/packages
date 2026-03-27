import { CustomObject3D } from "../../../objects/CustomObject3D";
import type StoreAdapter from "./StoreAdapter";
import type { StoredPlugin, PluginExecutionContext, InspectorComponentConfig } from "./PluginTypes";
import { EventEmitter } from "events";
import { ModuleRegistry } from "../../modules/ModuleRegistry";
import { ImportTransformer } from "../../modules/ImportTransformer";
import { SvelteComponentRegistry } from "../../components/SvelteComponentRegistry";
import { FeatureRegistry } from "../../features/FeatureRegistry";
import { UIVisibilityManager } from "../../features/UIVisibilityManager";
import { ImportExportRegistry } from "../../features/ImportExportRegistry";
import { PluginDevTools } from "../../development/PluginDevTools";
import type { FeatureConfig, UIElementConfig, ImportFormatConfig, ExportFormatConfig, FeatureValidationResult } from "../../features/types";
import * as THREE from "three";
export type PluginCoreMode = "edit" | "view";
export declare class PluginCore extends EventEmitter<{
    "object-disabled": [CustomEvent<{
        type: string;
    }>];
    "object-enabled": [CustomEvent<{
        type: string;
    }>];
    "mode-disabled": [CustomEvent<{
        mode: string;
    }>];
    "mode-enabled": [CustomEvent<{
        mode: string;
    }>];
    "title-changed": [CustomEvent<{
        title: string;
    }>];
    "feature-enabled": [CustomEvent<{
        feature: string;
    }>];
    "feature-disabled": [CustomEvent<{
        feature: string;
    }>];
    "ui-visibility-changed": [CustomEvent<{
        element: string;
        visible: boolean;
    }>];
    "transform-tool-disabled": [CustomEvent<{
        toolType: string;
    }>];
    "transform-tool-enabled": [CustomEvent<{
        toolType: string;
    }>];
}> {
    #private;
    /**
     * Feature registry for managing engine features
     */
    readonly featureRegistry: FeatureRegistry;
    /**
     * UI visibility manager for controlling element visibility
     */
    readonly uiVisibilityManager: UIVisibilityManager;
    /**
     * Import/Export registry for custom format handlers
     */
    readonly importExportRegistry: ImportExportRegistry;
    constructor();
    /**
     * Set up the feature control system and event listeners
     */
    private setupFeatureSystem;
    /**
     * Register core engine features
     */
    private registerCoreFeatures;
    /**
     * Set the title of the engine
     * Basically changing the name of the editor, displayed at the top of the editor
     * @param title
     */
    setTitle(title: string): void;
    getTitle(): string;
    /**
     * Disable an object type
     * (Ie: `AmbientLight`, `DirectionalLight`, `PointLight`, etc.)
     * @param type The type of the object to disable
     */
    disableObject(type: string): void;
    enableObject(type: string): void;
    isObjectDisabled(type: string): boolean;
    getDisabledObject(): string[];
    /**
     * Disable a mode, `edit` or `view`
     * @param mode The mode to disable
     */
    disableMode(mode: PluginCoreMode): void;
    enableMode(mode: PluginCoreMode): void;
    isModeDisabled(mode: PluginCoreMode): boolean;
    getDisabledModes(): PluginCoreMode[];
    /**
     * Register a new feature in the system
     */
    registerFeature(config: FeatureConfig): void;
    /**
     * Enable a feature and all its dependencies
     */
    enableFeature(featureId: string): FeatureValidationResult;
    /**
     * Disable a feature and all features that depend on it
     */
    disableFeature(featureId: string): FeatureValidationResult;
    /**
     * Check if a feature is enabled
     */
    isFeatureEnabled(featureId: string): boolean;
    /**
     * Get all registered features
     */
    getAllFeatures(): FeatureConfig[];
    /**
     * Validate a feature's dependencies and conflicts
     */
    validateFeature(featureId: string): FeatureValidationResult;
    /**
     * Register a UI element for visibility control
     */
    registerUIElement(config: UIElementConfig): void;
    /**
     * Set visibility of a UI element
     */
    setUIElementVisibility(elementId: string, visible: boolean): void;
    /**
     * Check if a UI element is visible
     */
    isUIElementVisible(elementId: string): boolean;
    /**
     * Hide UI elements by feature ID
     */
    hideUIElementsByFeature(featureId: string): void;
    /**
     * Show UI elements by feature ID
     */
    showUIElementsByFeature(featureId: string): void;
    /**
     * Register an import format handler
     */
    registerImportFormat(config: ImportFormatConfig): void;
    /**
     * Register an export format handler
     */
    registerExportFormat(config: ExportFormatConfig): void;
    /**
     * Get all enabled import formats
     */
    getEnabledImportFormats(): ImportFormatConfig[];
    /**
     * Get all enabled export formats
     */
    getEnabledExportFormats(): ExportFormatConfig[];
    /**
     * Import a file using the appropriate format handler
     */
    importFile(file: File, context: any, formatId?: string): Promise<any>;
    /**
     * Export data using the specified format handler
     */
    exportData(data: any, context: any, formatId: string): Promise<any>;
    /**
     * Check if a file can be imported
     */
    canImportFile(file: File): boolean;
    /**
     * Get supported file extensions for import
     */
    getSupportedImportExtensions(): string[];
    /**
     * Get file filter for file picker dialogs
     */
    getImportFileFilter(): Array<{
        name: string;
        accept: Record<string, string[]>;
    }>;
    /**
     * Export current configuration
     */
    exportConfiguration(): Record<string, any>;
    /**
     * Import configuration
     */
    importConfiguration(config: Record<string, any>): void;
    /**
     * Reset all configurations to defaults
     */
    resetToDefaults(): void;
    /**
     * Dispose of resources
     */
    dispose(): void;
    disableWindow(windowType: string): void;
    enableWindow(windowType: string): void;
    isWindowDisabled(windowType: string): boolean;
    getDisabledWindows(): string[];
    lockInspectorGroup(groupName: string): void;
    unlockInspectorGroup(groupName: string): void;
    isInspectorGroupLocked(groupName: string): boolean;
    getLockedInspectorGroups(): string[];
    hideInspectorGroup(groupName: string): void;
    showInspectorGroup(groupName: string): void;
    isInspectorGroupHidden(groupName: string): boolean;
    getHiddenInspectorGroups(): string[];
    disableTransformTool(toolType: string): void;
    enableTransformTool(toolType: string): void;
    isTransformToolDisabled(toolType: string): boolean;
    getDisabledTransformTools(): string[];
    /**
     * Register a global inspector component that will be rendered in the object inspector
     * @param pluginId - The plugin's UUID
     * @param config - The component configuration
     */
    registerInspectorComponent(pluginId: string, config: InspectorComponentConfig): void;
    /**
     * Unregister a global inspector component
     * @param pluginId - The plugin's UUID
     * @param componentName - The component name
     */
    unregisterInspectorComponent(pluginId: string, componentName: string): void;
    /**
     * Unregister all inspector components for a plugin
     * @param pluginId - The plugin's UUID
     */
    unregisterAllInspectorComponents(pluginId: string): void;
    /**
     * Get all registered inspector components
     */
    getInspectorComponents(): InspectorComponentConfig[];
    /**
     * Get inspector components for a specific plugin
     * @param pluginId - The plugin's UUID
     */
    getPluginInspectorComponents(pluginId: string): InspectorComponentConfig[];
    /**
     * Check if an inspector component exists
     * @param pluginId - The plugin's UUID
     * @param componentName - The component name
     */
    hasInspectorComponent(pluginId: string, componentName: string): boolean;
    /**
     * Update an option value for an inspector component
     * @param pluginId - The plugin's UUID
     * @param componentName - The component name
     * @param groupName - The group name
     * @param optionId - The option ID
     * @param value - The new value
     */
    updateInspectorComponentOption(pluginId: string, componentName: string, groupName: string, optionId: string | number, value: any): boolean;
    /**
     * Get the value of an option for an inspector component
     * @param pluginId - The plugin's UUID
     * @param componentName - The component name
     * @param groupName - The group name
     * @param optionId - The option ID
     */
    getInspectorComponentOptionValue(pluginId: string, componentName: string, groupName: string, optionId: string | number): any;
    /**
     * Register a global event watcher
     * @param pluginId - The plugin's UUID
     * @param category - The event category ('pointer', 'keyboard', 'selection', 'command')
     * @param eventType - The event type within the category
     * @param callback - The callback function
     */
    registerGlobalEventWatcher(pluginId: string, category: 'pointer' | 'keyboard' | 'selection' | 'command', eventType: string, callback: Function): void;
    /**
     * Unregister a global event watcher
     * @param pluginId - The plugin's UUID
     * @param category - The event category
     * @param eventType - The event type
     * @param callback - The callback function to remove
     */
    unregisterGlobalEventWatcher(pluginId: string, category: 'pointer' | 'keyboard' | 'selection' | 'command', eventType: string, callback: Function): void;
    /**
     * Dispatch an event to all registered global watchers for a category/type
     * @param category - The event category
     * @param eventType - The event type
     * @param data - The event data
     * @param object - The CustomObject3D involved (if applicable)
     */
    dispatchToGlobalWatchers(category: 'pointer' | 'keyboard' | 'selection' | 'command', eventType: string, data: any, object?: CustomObject3D): void;
    /**
     * Get all global event watchers for a plugin
     * @param pluginId - The plugin's UUID
     */
    getPluginGlobalEventWatchers(pluginId: string): Array<{
        category: string;
        eventType: string;
    }>;
    /**
     * Clear all global event watchers for a plugin
     * @param pluginId - The plugin's UUID
     */
    clearPluginGlobalEventWatchers(pluginId: string): void;
}
export declare class PluginAdapter {
    private store;
    readonly customObjects: Map<string, typeof CustomObject3D>;
    readonly customObjectType: Map<string, typeof CustomObject3D>;
    readonly customExporters: Map<string, (store: StoreAdapter) => Promise<void>>;
    readonly loadedPlugins: Map<string, PluginExecutionContext>;
    readonly pluginCore: PluginCore;
    private readonly moduleRegistry;
    readonly importTransformer: ImportTransformer;
    private readonly componentRegistry;
    private readonly devTools;
    constructor(store: StoreAdapter, autoLoadPlugins?: boolean);
    /**
     * Setup engine-provided modules in the registry
     */
    private setupEngineModules;
    /**
     * Get the module registry for external access
     */
    getModuleRegistry(): ModuleRegistry;
    /**
     * Get the component registry for external access
     */
    getComponentRegistry(): SvelteComponentRegistry;
    /**
     * Get the development tools for external access
     */
    getDevTools(): PluginDevTools;
    /**
     * Automatically load all active plugins from the PluginsDirectory
     */
    private autoLoadActivePlugins;
    private compileTypeScript;
    requireModule(moduleName: string): any;
    private executeModuleCode;
    loadPlugin(plugin: StoredPlugin): Promise<PluginExecutionContext>;
    unloadPlugin(pluginUuid: string): void;
    registerCustomObject(name: string, object: typeof CustomObject3D, context?: PluginExecutionContext): void;
    registerMaterial(name: string, material: THREE.Material, options?: {
        locked?: boolean;
    }): void;
    registerGeometry(name: string, geometry: THREE.BufferGeometry, options?: {
        locked?: boolean;
    }): void;
    private registerExporter;
    log(pluginName: string, message: string, level: 'info' | 'warn' | 'error'): void;
    /**
     * Register plugin security configuration with the permission system
     */
    private registerPluginSecurity;
    /**
     * Determine trust level for a plugin based on its metadata
     */
    private determineTrustLevel;
    /**
     * Get auto-granted permissions based on trust level
     */
    private getAutoGrantedPermissions;
}
