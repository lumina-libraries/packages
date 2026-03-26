import type { UIElementConfig } from './types';
/**
 * Manages UI element visibility based on feature states
 */
export declare class UIVisibilityManager {
    private elements;
    private observers;
    private styleSheet;
    constructor();
    /**
     * Initialize the CSS style sheet for dynamic hiding
     */
    private initializeStyleSheet;
    /**
     * Register a UI element for visibility control
     */
    registerElement(config: UIElementConfig): void;
    /**
     * Unregister a UI element
     */
    unregisterElement(elementId: string): void;
    /**
     * Set visibility of a UI element
     */
    setElementVisibility(elementId: string, visible: boolean): void;
    /**
     * Get visibility state of a UI element
     */
    isElementVisible(elementId: string): boolean;
    /**
     * Hide elements by feature ID
     */
    hideElementsByFeature(featureId: string): void;
    /**
     * Show elements by feature ID
     */
    showElementsByFeature(featureId: string): void;
    /**
     * Update the actual DOM visibility of an element
     */
    private updateElementVisibility;
    /**
     * Update elements by CSS selector
     */
    private updateElementsBySelector;
    /**
     * Update elements by component name (for Svelte components)
     */
    private updateElementsByComponent;
    /**
     * Add or update a CSS rule
     */
    private addOrUpdateCSSRule;
    /**
     * Remove a CSS rule
     */
    private removeElementVisibilityRule;
    /**
     * Set up mutation observer for dynamic elements
     */
    private setupElementObserver;
    /**
     * Get all registered elements
     */
    getAllElements(): UIElementConfig[];
    /**
     * Get elements by feature
     */
    getElementsByFeature(featureId: string): UIElementConfig[];
    /**
     * Bulk update visibility for multiple elements
     */
    updateMultipleElements(updates: Array<{
        elementId: string;
        visible: boolean;
    }>): void;
    /**
     * Export current visibility state
     */
    exportState(): Record<string, boolean>;
    /**
     * Import visibility state
     */
    importState(state: Record<string, boolean>): void;
    /**
     * Clean up resources
     */
    dispose(): void;
}
