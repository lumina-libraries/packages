import { EventDispatcher } from "three";
import type StoreAdapter from "../core/adapters/engine/StoreAdapter";
/**
 * Event map for CustomStoreObject
 */
export interface CustomStoreObjectEventMap {
    click: {
        originalEvent?: MouseEvent;
    };
    dblclick: {
        originalEvent?: MouseEvent;
    };
    hover: {
        originalEvent?: MouseEvent;
    };
    hoverend: {
        originalEvent?: MouseEvent;
    };
    update: {};
    select: {};
    deselect: {};
}
/**
 * Options for CustomStoreObject behavior in the editor
 */
export interface CustomStoreObjectOptions {
    /** Whether this object can be deleted from the store. Default: true */
    deletable: boolean;
    /** Whether the name of this object can be edited. Default: true */
    nameEditable: boolean;
    /** Whether this object can be selected. Default: true */
    selectable: boolean;
}
/**
 * Abstract class for custom store objects that can be displayed in asset panels.
 * Similar to CustomObject3D but for non-3D store objects like materials, textures, etc.
 *
 * This class provides:
 * - Event dispatching for click, double-click, hover events
 * - Options to disable deletion and name editing
 * - Integration with the store folder system
 *
 * @example
 * ```typescript
 * class CustomMaterial extends CustomStoreObject {
 *   static type = "CustomMaterial";
 *   static icon: [string, string?] = ["fi fi-br-highlighter", "#FFD700"];
 *
 *   constructor() {
 *     super();
 *     this.name = "My Custom Material";
 *     this.options.deletable = false;
 *   }
 * }
 * ```
 */
export declare abstract class CustomStoreObject extends EventDispatcher<CustomStoreObjectEventMap> {
    /**
     * Unique identifier for this object
     */
    uuid: string;
    /**
     * Display name for this object
     */
    name: string;
    /**
     * The type identifier for this custom store object.
     * Must be overridden by subclasses.
     */
    static type: string;
    /**
     * Instance type - mirrors the static type
     */
    readonly type: string;
    /**
     * The icon displayed in the editor UI.
     * Can be:
     * - An icon class name (e.g., "uil uil-cube")
     * - A URL starting with "http://" or "https://"
     * - A data URL starting with "data:"
     */
    static icon: [name: string, color?: string];
    /**
     * Instance icon - can override the static icon
     */
    icon?: [name: string, color?: string];
    /**
     * Reference to the store this object belongs to
     */
    store?: StoreAdapter;
    /**
     * Options controlling editor behavior for this object
     */
    readonly options: CustomStoreObjectOptions;
    /**
     * User-defined data storage
     */
    userData: Record<string, any>;
    constructor();
    /**
     * Get the icon for this instance (falls back to static icon)
     */
    getIcon(): [string, string?];
    /**
     * Called when this object is clicked in the UI
     */
    onClick(event?: MouseEvent): void;
    /**
     * Called when this object is double-clicked in the UI
     */
    onDoubleClick(event?: MouseEvent): void;
    /**
     * Called when the mouse hovers over this object in the UI
     */
    onHover(event?: MouseEvent): void;
    /**
     * Called when the mouse stops hovering over this object
     */
    onHoverEnd(event?: MouseEvent): void;
    /**
     * Called when this object is selected
     */
    onSelect(): void;
    /**
     * Called when this object is deselected
     */
    onDeselect(): void;
    /**
     * Trigger an update event (useful for UI refresh)
     */
    update(): void;
    /**
     * Initialize the object after being added to the store
     * Override this in subclasses for custom initialization
     */
    init?(store: StoreAdapter): void;
    /**
     * Clean up resources when the object is removed from the store
     * Override this in subclasses for custom cleanup
     */
    dispose?(): void;
    /**
     * Convert this object to JSON for serialization
     */
    toJSON(): Record<string, any>;
    /**
     * Restore this object from JSON
     */
    fromJSON?(json: Record<string, any>): void;
}
