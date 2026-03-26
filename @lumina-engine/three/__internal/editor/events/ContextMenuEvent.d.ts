import { BufferGeometry, Material, Object3D, Texture } from "three";
import { Events } from "../events";
import type KeyboardEventAdapter from "../core/adapters/engine/KeyboardEventAdapter";
import type { Key } from "../core/adapters/engine/KeyboardEventAdapter";
import { FileSource, type StoreObject } from "../core/adapters/engine/StoreAdapter";
import { StoreFolderAdapter } from "../core/adapters/engine/StoreFolderAdapter";
export interface ContextMenuItem {
    separator?: boolean;
    title?: string;
    icon?: string;
    keys?: Key | Key[];
    closeAfterAction?: boolean;
    items?: ContextMenuItem[];
    showSubmenu?: boolean;
    action?: () => void;
    getElement?: () => HTMLElement;
    /** Whether this menu item is disabled (greyed out and non-clickable) */
    disabled?: boolean;
}
export interface ContextMenuOptions {
    search?: boolean;
    active?: boolean;
    closeAfterAction?: boolean;
    textures?: {
        ignore?: Texture[];
        action: (texture: Texture) => void;
    };
    materials?: {
        ignore?: Material[];
        action: (material: Material) => void;
    };
    geometries?: {
        ignore?: BufferGeometry[];
        action: (geometry: BufferGeometry) => void;
    };
    objects?: {
        ignore?: Object3D[];
        instances: unknown[];
        action: (object: Object3D) => void;
    };
    files?: {
        ignore?: FileSource[];
        action: (file: FileSource) => void;
    };
    items?: ContextMenuItem[];
    onclose?: () => void;
    x?: number;
    y?: number;
}
export declare const StandardContextItems: (keyboard: KeyboardEventAdapter, object: StoreObject | StoreFolderAdapter) => Promise<ContextMenuItem[]>;
export declare class ContextMenuEvent extends Events<ContextMenuOptions> {
    static type: string;
    static current: ContextMenuEvent | null;
    static dispatch(options: ContextMenuOptions): void;
    constructor(options: ContextMenuOptions);
}
