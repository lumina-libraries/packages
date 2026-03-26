import { EventEmitter } from 'events';
import type { ImportFormatConfig, ExportFormatConfig, ImportContext, ExportContext, ImportResult, ExportResult } from './types';
/**
 * Registry for managing import and export format handlers
 */
export declare class ImportExportRegistry extends EventEmitter<{
    'format-registered': [{
        type: 'import' | 'export';
        format: ImportFormatConfig | ExportFormatConfig;
    }];
    'format-unregistered': [{
        type: 'import' | 'export';
        formatId: string;
    }];
    'import-started': [{
        formatId: string;
        file: File;
    }];
    'import-completed': [{
        formatId: string;
        result: ImportResult;
    }];
    'export-started': [{
        formatId: string;
        data: any;
    }];
    'export-completed': [{
        formatId: string;
        result: ExportResult;
    }];
}> {
    private importFormats;
    private exportFormats;
    private extensionToImportFormat;
    private mimeTypeToImportFormat;
    /**
     * Register an import format handler
     */
    registerImportFormat(config: ImportFormatConfig): void;
    /**
     * Register an export format handler
     */
    registerExportFormat(config: ExportFormatConfig): void;
    /**
     * Unregister an import format
     */
    unregisterImportFormat(formatId: string): void;
    /**
     * Unregister an export format
     */
    unregisterExportFormat(formatId: string): void;
    /**
     * Get import format by ID
     */
    getImportFormat(formatId: string): ImportFormatConfig | undefined;
    /**
     * Get export format by ID
     */
    getExportFormat(formatId: string): ExportFormatConfig | undefined;
    /**
     * Get import format by file extension
     */
    getImportFormatByExtension(extension: string): ImportFormatConfig | undefined;
    /**
     * Get import format by MIME type
     */
    getImportFormatByMimeType(mimeType: string): ImportFormatConfig | undefined;
    /**
     * Get import format for a file
     */
    getImportFormatForFile(file: File): ImportFormatConfig | undefined;
    /**
     * Get all import formats
     */
    getAllImportFormats(): ImportFormatConfig[];
    /**
     * Get all export formats
     */
    getAllExportFormats(): ExportFormatConfig[];
    /**
     * Get enabled import formats
     */
    getEnabledImportFormats(): ImportFormatConfig[];
    /**
     * Get enabled export formats
     */
    getEnabledExportFormats(): ExportFormatConfig[];
    /**
     * Get import formats by feature
     */
    getImportFormatsByFeature(featureId: string): ImportFormatConfig[];
    /**
     * Get export formats by feature
     */
    getExportFormatsByFeature(featureId: string): ExportFormatConfig[];
    /**
     * Enable/disable import format
     */
    setImportFormatEnabled(formatId: string, enabled: boolean): void;
    /**
     * Enable/disable export format
     */
    setExportFormatEnabled(formatId: string, enabled: boolean): void;
    /**
     * Enable/disable formats by feature
     */
    setFeatureFormatsEnabled(featureId: string, enabled: boolean): void;
    /**
     * Import a file using the appropriate format handler
     */
    importFile(file: File, context: ImportContext, formatId?: string): Promise<ImportResult>;
    /**
     * Export data using the specified format handler
     */
    exportData(data: any, context: ExportContext, formatId: string): Promise<ExportResult>;
    /**
     * Get supported file extensions for import
     */
    getSupportedImportExtensions(): string[];
    /**
     * Get supported MIME types for import
     */
    getSupportedImportMimeTypes(): string[];
    /**
     * Check if a file can be imported
     */
    canImportFile(file: File): boolean;
    /**
     * Get file filter for file picker dialogs
     */
    getImportFileFilter(): Array<{
        name: string;
        accept: Record<string, string[]>;
    }>;
    /**
     * Clear all registered formats
     */
    clear(): void;
}
