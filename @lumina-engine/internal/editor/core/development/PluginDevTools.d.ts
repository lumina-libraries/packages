/**
 * Plugin Development Tools and Utilities
 * Provides debugging, profiling, and development assistance for plugin creators
 */
import type { StoredPlugin } from '../adapters/engine/PluginTypes';
import type { ModuleRegistry } from '../modules/ModuleRegistry';
/**
 * Plugin development statistics
 */
export interface PluginStats {
    pluginId: string;
    name: string;
    loadTime: number;
    executionTime: number;
    memoryUsage: number;
    apiCalls: Map<string, number>;
    errors: PluginError[];
    warnings: PluginWarning[];
    performance: PerformanceMetrics;
    dependencies: string[];
    registeredObjects: string[];
    registeredModules: string[];
    registeredComponents: string[];
}
/**
 * Plugin error information
 */
export interface PluginError {
    type: 'compilation' | 'runtime' | 'security' | 'permission';
    message: string;
    stack?: string;
    timestamp: Date;
    context?: any;
    suggestion?: string;
}
/**
 * Plugin warning information
 */
export interface PluginWarning {
    type: 'performance' | 'deprecation' | 'best-practice' | 'compatibility';
    message: string;
    timestamp: Date;
    context?: any;
    suggestion?: string;
}
/**
 * Performance metrics for plugins
 */
export interface PerformanceMetrics {
    cpuTime: number;
    memoryPeak: number;
    gcCollections: number;
    apiCallLatency: Map<string, number[]>;
    renderingImpact: number;
}
/**
 * Debug session information
 */
export interface DebugSession {
    sessionId: string;
    pluginId: string;
    startTime: Date;
    breakpoints: DebugBreakpoint[];
    watchedVariables: string[];
    callStack: string[];
    isActive: boolean;
}
/**
 * Debug breakpoint
 */
export interface DebugBreakpoint {
    id: string;
    file: string;
    line: number;
    condition?: string;
    enabled: boolean;
    hitCount: number;
}
/**
 * Plugin development recommendations
 */
export interface DevelopmentRecommendation {
    type: 'performance' | 'security' | 'architecture' | 'compatibility';
    severity: 'info' | 'warning' | 'error';
    title: string;
    description: string;
    suggestion: string;
    codeExample?: string;
    documentation?: string;
}
/**
 * Plugin testing utilities
 */
export interface TestUtilities {
    createMockStore(): any;
    createMockAPI(): any;
    simulateUserInteraction(type: string, data: any): void;
    measurePerformance<T>(fn: () => T): {
        result: T;
        time: number;
    };
    validatePluginStructure(plugin: StoredPlugin): ValidationResult[];
}
/**
 * Validation result
 */
export interface ValidationResult {
    type: 'error' | 'warning' | 'info';
    message: string;
    location?: string;
    suggestion?: string;
}
/**
 * Main Plugin Development Tools class
 */
export declare class PluginDevTools {
    private moduleRegistry;
    private pluginStats;
    private debugSessions;
    private profilerEnabled;
    private performanceObserver?;
    constructor(moduleRegistry: ModuleRegistry);
    /**
     * Start profiling a plugin
     */
    startProfiling(pluginId: string): void;
    /**
     * Stop profiling a plugin
     */
    stopProfiling(pluginId: string): PluginStats | undefined;
    /**
     * Get development statistics for a plugin
     */
    getPluginStats(pluginId: string): PluginStats | undefined;
    /**
     * Get all plugin statistics
     */
    getAllStats(): Map<string, PluginStats>;
    /**
     * Record an API call for profiling
     */
    recordAPICall(pluginId: string, apiName: string, duration: number): void;
    /**
     * Record an error for a plugin
     */
    recordError(pluginId: string, error: Omit<PluginError, 'timestamp'>): void;
    /**
     * Record a warning for a plugin
     */
    recordWarning(pluginId: string, warning: Omit<PluginWarning, 'timestamp'>): void;
    /**
     * Analyze plugin code and provide recommendations
     */
    analyzePlugin(plugin: StoredPlugin): DevelopmentRecommendation[];
    /**
     * Create test utilities for plugin development
     */
    createTestUtilities(): TestUtilities;
    /**
     * Start a debug session for a plugin
     */
    startDebugSession(pluginId: string): string;
    /**
     * Stop a debug session
     */
    stopDebugSession(sessionId: string): boolean;
    /**
     * Add a breakpoint to a debug session
     */
    addBreakpoint(sessionId: string, file: string, line: number, condition?: string): boolean;
    /**
     * Generate a performance report for a plugin
     */
    generatePerformanceReport(pluginId: string): string;
    /**
     * Export debugging data
     */
    exportDebugData(pluginId: string): any;
    /**
     * Clear all development data for a plugin
     */
    clearPluginData(pluginId: string): void;
    private initializePluginStats;
    private setupPerformanceMonitoring;
    private analyzeCodeStructure;
    private analyzePerformancePatterns;
    private analyzeSecurityPatterns;
    private analyzeBestPractices;
    private createMockStore;
    private createMockAPI;
    private simulateUserInteraction;
    private measurePerformance;
    private validatePluginStructure;
}
