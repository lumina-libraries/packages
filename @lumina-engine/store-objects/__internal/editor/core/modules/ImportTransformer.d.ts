import type { IImportTransformer, ValidationResult, TransformationResult, IModuleRegistry } from './types';
export declare class ImportTransformer implements IImportTransformer {
    private moduleRegistry;
    constructor(moduleRegistry: IModuleRegistry);
    transformImports(sourceCode: string): string;
    transformWithDetails(sourceCode: string): TransformationResult;
    extractDependencies(sourceCode: string): string[];
    validateImports(imports: string[]): ValidationResult;
    private createTransformer;
    private transformImportDeclaration;
    private transformDynamicImport;
    private createVariableDeclarationFromImport;
    private extractImportClause;
    private isValidImportSpecifier;
    private isExternalModule;
}
