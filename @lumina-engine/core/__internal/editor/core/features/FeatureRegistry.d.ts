import { EventEmitter } from 'events';
import type { FeatureConfig, FeatureState, FeatureValidationResult, FeatureEvent, FeatureCategory } from './types';
/**
 * Central registry for managing engine features and their dependencies
 */
export declare class FeatureRegistry extends EventEmitter<{
    'feature-enabled': [FeatureEvent];
    'feature-disabled': [FeatureEvent];
    'feature-conflict': [FeatureEvent];
    'dependency-missing': [FeatureEvent];
}> {
    private features;
    private state;
    /**
     * Register a new feature in the system
     */
    registerFeature(config: FeatureConfig): void;
    /**
     * Unregister a feature from the system
     */
    unregisterFeature(featureId: string): void;
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
     * Get feature configuration
     */
    getFeature(featureId: string): FeatureConfig | undefined;
    /**
     * Get all registered features
     */
    getAllFeatures(): FeatureConfig[];
    /**
     * Get features by category
     */
    getFeaturesByCategory(category: FeatureCategory): FeatureConfig[];
    /**
     * Validate a feature's dependencies and conflicts
     */
    validateFeature(featureId: string): FeatureValidationResult;
    /**
     * Get features that depend on the given feature
     */
    getDependents(featureId: string): string[];
    /**
     * Check for circular dependencies
     */
    private hasCircularDependency;
    /**
     * Get current feature state
     */
    getState(): FeatureState;
    /**
     * Reset all features to their default state
     */
    reset(): void;
    /**
     * Export feature configuration
     */
    exportConfig(): Record<string, any>;
    /**
     * Import feature configuration
     */
    importConfig(config: Record<string, any>): void;
}
