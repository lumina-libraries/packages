export interface IModuleRegistry {
    registerPackage(name: string, code: string | (() => any), version?: string): void;
    registerResolver(prefix: string, resolver: ModuleResolver): void;
    resolveModule(specifier: string, versionRange?: string): string | (() => any) | undefined;
    getImports(sourceCode: string): string[];
    clearCache(): void;
    hasModule(specifier: string): boolean;
    getRegisteredModules(): string[];
    getRegisteredResolvers(): string[];
    getModuleVersion(name: string): string | undefined;
    checkVersionCompatibility(name: string, versionRange: string): boolean;
}
export type ModuleResolver = (specifier: string) => string | (() => any) | undefined;
export interface ModuleDefinition {
    name: string;
    version: string;
    exports: ModuleExports;
    dependencies: string[];
    source?: string;
    compiled?: string;
    metadata?: ModuleMetadata;
}
export interface ModuleExports {
    default?: any;
    named: Record<string, any>;
}
export interface ModuleMetadata {
    description?: string;
    author?: string;
    license?: string;
    keywords?: string[];
    repository?: string;
    homepage?: string;
}
export interface IImportTransformer {
    transformImports(sourceCode: string): string;
    extractDependencies(sourceCode: string): string[];
    validateImports(imports: string[]): ValidationResult[];
}
export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
}
export interface ValidationError {
    message: string;
    line?: number;
    column?: number;
    specifier: string;
}
export interface ValidationWarning {
    message: string;
    line?: number;
    column?: number;
    specifier: string;
}
export interface IModuleCache {
    get(key: string): any;
    set(key: string, value: any, ttl?: number): void;
    has(key: string): boolean;
    delete(key: string): boolean;
    clear(): void;
    size: number;
    getStats(): CacheStats;
}
export interface CacheStats {
    hits: number;
    misses: number;
    size: number;
    maxSize: number;
    evictions: number;
}
export interface ModuleCacheEntry {
    value: any;
    timestamp: number;
    ttl?: number;
    accessCount: number;
    lastAccessed: number;
    size: number;
}
export interface DependencyGraph {
    nodes: Set<string>;
    edges: Map<string, Set<string>>;
    addNode(node: string): void;
    addEdge(from: string, to: string): void;
    removeNode(node: string): void;
    removeEdge(from: string, to: string): void;
    getDependencies(node: string): string[];
    getDependents(node: string): string[];
    hasCircularDependencies(): boolean;
    getCircularDependencies(): string[][];
    topologicalSort(): string[];
}
export interface ImportStatement {
    specifier: string;
    importClause?: ImportClause;
    startPos: number;
    endPos: number;
    line: number;
    column: number;
}
export interface ImportClause {
    defaultImport?: string;
    namedImports?: NamedImport[];
    namespaceImport?: string;
}
export interface NamedImport {
    name: string;
    alias?: string;
}
export interface TransformationResult {
    code: string;
    sourceMap?: any;
    dependencies: string[];
    imports: ImportStatement[];
    errors: ValidationError[];
    warnings: ValidationWarning[];
}
export interface ModuleRegistryOptions {
    maxCacheSize?: number;
    defaultTTL?: number;
    enableCircularDependencyDetection?: boolean;
    strictMode?: boolean;
    allowDynamicImports?: boolean;
}
export interface ModuleLoadContext {
    specifier: string;
    importer?: string;
    resolveStack: string[];
    isCircular: boolean;
    timestamp: number;
}
export interface ModuleRegistryEvent {
    type: 'module-registered' | 'module-resolved' | 'resolver-registered' | 'cache-cleared' | 'dependency-circular';
    data: any;
    timestamp: number;
}
export type ModuleRegistryEventHandler = (event: ModuleRegistryEvent) => void;
