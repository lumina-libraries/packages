import { EventDispatcher } from "three";
import type { StoreObject } from "./StoreAdapter";
import type StoreAdapter from "./StoreAdapter";
export declare class StoreFolderAdapter extends EventDispatcher<{
    update: {};
}> {
    #private;
    store: StoreAdapter;
    id: string | null;
    uuid: string;
    parent: StoreFolderAdapter | null;
    readonly children: Set<StoreFolderAdapter | StoreObject>;
    /**
     * Whether this folder can be deleted. Defaults to true.
     * Set to false to prevent deletion through the UI context menu.
     */
    deletable: boolean;
    /**
     * Priority for sorting folders in the UI. Higher values appear first.
     * Defaults to 0.
     */
    priority: number;
    /**
     * Whether this folder is open/expanded in the UI tree view.
     * Defaults to false.
     */
    open: boolean;
    constructor(store: StoreAdapter, parent?: StoreFolderAdapter, name?: string, id?: string | null);
    /**
     * Check if this folder is disabled (cannot be selected/interacted with)
     * Uses the folder's ID to check against the store's disabled folders set
     */
    get disabled(): boolean;
    get name(): string;
    set name(value: string);
    ensureUniqueName(name: string, parent?: StoreFolderAdapter): string;
    /**
     * Returns an iterator of the descendants of this folder.
     */
    descendants(): any;
    /**
     * Returns an iterator of the parent of this folder.
     */
    parents(): Generator<StoreFolderAdapter, void, unknown>;
    /**
     * Adds a child to this folder.
     *
     * If the child is already added, this method does nothing.
     *
     * If the child has a parent, it is removed from its parent.
     *
     * @param child
     */
    add(child: StoreFolderAdapter | StoreObject): void;
    /**
     * Removes a child from this folder.
     * @param child
     * @returns
     */
    remove(child: StoreFolderAdapter | StoreObject): void;
    /**
     * Removes this folder from its parent.
     * @returns
     */
    removeFromParent(): void;
    path(): string;
    static path(object: StoreObject | StoreFolderAdapter, store: StoreAdapter): string;
    static getByPath(path: string, store: StoreAdapter): StoreFolderAdapter | StoreObject | null;
    toJSON(): {
        id: string;
        uuid: string;
        name: string;
        children: [number, string][];
    };
    fromJSON(json: ReturnType<this["toJSON"]>): void;
    setChildren(children: [number, string][], map: Map<string, [StoreFolderAdapter, [number, string][]]>): void;
}
