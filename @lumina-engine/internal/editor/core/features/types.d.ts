/**
 * Feature control types and interfaces for the enhanced plugin system
 */
export interface FeatureConfig {
    id: string;
    name: string;
    description?: string;
    enabled: boolean;
    dependencies?: string[];
    category?: string;
    uiElements?: string[];
    importFormats?: string[];
    exportFormats?: string[];
}
export interface UIElementConfig {
    id: string;
    selector?: string;
    component?: string;
    feature?: string;
    visible: boolean;
    required?: boolean;
}
export interface ImportFormatConfig {
    id: string;
    name: string;
    extensions: string[];
    mimeTypes?: string[];
    handler: ImportHandler;
    enabled: boolean;
    feature?: string;
}
export interface ExportFormatConfig {
    id: string;
    name: string;
    extension: string;
    mimeType?: string;
    handler: ExportHandler;
    enabled: boolean;
    feature?: string;
}
export type ImportHandler = (file: File, context: ImportContext) => Promise<ImportResult>;
export type ExportHandler = (data: any, context: ExportContext) => Promise<ExportResult>;
export interface ImportContext {
    store: any;
    scene: any;
    camera: any;
    options?: Record<string, any>;
}
export interface ExportContext {
    store: any;
    scene: any;
    camera: any;
    selected?: any;
    options?: Record<string, any>;
}
export interface ImportResult {
    success: boolean;
    objects?: any[];
    textures?: any[];
    materials?: any[];
    animations?: any[];
    error?: string;
}
export interface ExportResult {
    success: boolean;
    data?: Blob | string | ArrayBuffer;
    filename?: string;
    error?: string;
}
export interface FeatureDependency {
    feature: string;
    version?: string;
    required: boolean;
}
export interface FeatureConflict {
    feature: string;
    reason: string;
    resolvable: boolean;
}
export interface FeatureValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
    conflicts: FeatureConflict[];
    missingDependencies: FeatureDependency[];
}
export interface FeatureState {
    enabled: Map<string, boolean>;
    uiVisibility: Map<string, boolean>;
    importFormats: Map<string, ImportFormatConfig>;
    exportFormats: Map<string, ExportFormatConfig>;
    dependencies: Map<string, string[]>;
}
export type FeatureCategory = 'core' | 'ui' | 'import' | 'export' | 'objects' | 'materials' | 'lighting' | 'camera' | 'animation' | 'physics' | 'custom';
export interface FeatureEvent {
    type: 'enabled' | 'disabled' | 'conflict' | 'dependency_missing';
    feature: string;
    data?: any;
}
export type FeatureEventHandler = (event: FeatureEvent) => void;
