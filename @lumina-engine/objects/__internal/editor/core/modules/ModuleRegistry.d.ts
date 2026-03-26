import type { IModuleRegistry, ModuleResolver, ModuleRegistryOptions, ModuleRegistryEventHandler, ModuleLoadContext } from './types';
export declare class ModuleRegistry implements IModuleRegistry {
    private modules;
    private moduleVersions;
    private resolvers;
    private cache;
    private eventHandlers;
    private options;
    private dependencyGraph;
    constructor(options?: ModuleRegistryOptions);
    registerPackage(name: string, code: string | (() => any), version?: string): void;
    /**
     * Get the version of a registered module
     */
    getModuleVersion(name: string): string | undefined;
    /**
     * Check if a module version satisfies a version range
     */
    checkVersionCompatibility(name: string, versionRange: string): boolean;
    /**
     * Simple semantic version range checking
     * Supports: exact (1.0.0), caret (^1.0.0), tilde (~1.0.0), and wildcard (*)
     */
    private satisfiesVersionRange;
    private satisfiesCaretRange;
    private satisfiesTildeRange;
    private compareVersions;
    registerResolver(prefix: string, resolver: ModuleResolver): void;
    resolveModule(specifier: string, versionRange?: string, context?: ModuleLoadContext): string | (() => any) | undefined;
    getImports(sourceCode: string): string[];
    clearCache(): void;
    hasModule(specifier: string): boolean;
    getRegisteredModules(): string[];
    getRegisteredResolvers(): string[];
    addEventListener(handler: ModuleRegistryEventHandler): void;
    removeEventListener(handler: ModuleRegistryEventHandler): void;
    validateDependencies(moduleCode: string): {
        valid: boolean;
        errors: string[];
        warnings: string[];
    };
    getStats(): {
        moduleCount: number;
        resolverCount: number;
        cache: import("./types").CacheStats;
        dependencies: number;
    };
    private setupDefaultResolvers;
    private canResolve;
    private updateDependencyGraph;
    private detectCircularDependencies;
    private hasCircularDependency;
    private emitEvent;
    private hashCode;
}
