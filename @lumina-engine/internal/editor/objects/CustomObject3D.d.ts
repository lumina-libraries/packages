import { Box3, Object3D, Vector2, Vector3, type Intersection, type Object3DEventMap } from "three";
import type { SandboxComponentOptionMap, SandboxComponentOptionOptionsMap } from "../../sandbox/types";
import type StoreAdapter from "../core/adapters/engine/StoreAdapter";
import type { ContextMenuItem } from "../events/ContextMenuEvent";
import type { Directory } from "../fs";
/**
 * Event data for pointer events on CustomObject3D
 */
export interface CustomObjectPointerEventData {
    /** The original pointer event */
    originalEvent: PointerEvent;
    /** The intersection point in world space (if any) */
    point?: Vector3;
    /** The intersection normal in world space (if any) */
    normal?: Vector3;
    /** Distance from camera to intersection point */
    distance?: number;
    /** The intersected face index (if any) */
    faceIndex?: number;
    /** Normalized device coordinates (-1 to 1) */
    ndc: Vector2;
    /** The full intersection data (if any) */
    intersection?: Intersection;
    /** The view index this event originated from */
    viewIndex: number;
}
/**
 * Event data for keyboard events on CustomObject3D
 */
export interface CustomObjectKeyboardEventData {
    /** The original keyboard event */
    originalEvent: KeyboardEvent;
    /** The key that was pressed */
    key: string;
    /** The key code */
    code: string;
    /** Whether ctrl/cmd key was held */
    ctrlKey: boolean;
    /** Whether shift key was held */
    shiftKey: boolean;
    /** Whether alt key was held */
    altKey: boolean;
    /** Whether meta key was held */
    metaKey: boolean;
    /** The view index this event originated from */
    viewIndex: number;
}
/**
 * Event data for wheel events on CustomObject3D
 */
export interface CustomObjectWheelEventData {
    /** The original wheel event */
    originalEvent: WheelEvent;
    /** The delta X value */
    deltaX: number;
    /** The delta Y value */
    deltaY: number;
    /** The delta Z value */
    deltaZ: number;
    /** The delta mode */
    deltaMode: number;
    /** Whether ctrl/cmd key was held */
    ctrlKey: boolean;
    /** Whether shift key was held */
    shiftKey: boolean;
    /** Whether alt key was held */
    altKey: boolean;
    /** Whether meta key was held */
    metaKey: boolean;
    /** Normalized device coordinates (-1 to 1) */
    ndc: Vector2;
    /** The view index this event originated from */
    viewIndex: number;
}
export interface ClientComponentOptionMap extends SandboxComponentOptionMap {
    function: null;
}
export interface ClientComponentOptionOptionsMap extends SandboxComponentOptionOptionsMap {
    function: {
        type: "function";
    };
}
export interface CustomObject3DComponent<K extends keyof ClientComponentOptionMap> {
    id: number;
    name: string;
    value: ClientComponentOptionMap[K];
    type?: K;
    options: ClientComponentOptionOptionsMap[K];
    colors?: string[];
}
export declare abstract class CustomObject3D<TEventMap extends {} = {}> extends Object3D<{
    update: {};
    added: {};
    removed: {};
    components: {};
    component: {
        detail: CustomObject3DComponent<keyof ClientComponentOptionMap>;
    };
    executed: {};
    closed: {};
    created: {};
    reflow: {};
    pointerenter: {
        detail: CustomObjectPointerEventData;
    };
    pointerleave: {
        detail: CustomObjectPointerEventData;
    };
    pointerdown: {
        detail: CustomObjectPointerEventData;
    };
    pointerup: {
        detail: CustomObjectPointerEventData;
    };
    pointermove: {
        detail: CustomObjectPointerEventData;
    };
    dblclick: {
        detail: CustomObjectPointerEventData;
    };
    keydown: {
        detail: CustomObjectKeyboardEventData;
    };
    keyup: {
        detail: CustomObjectKeyboardEventData;
    };
    wheel: {
        detail: CustomObjectWheelEventData;
    };
} & Object3DEventMap & TEventMap> {
    /**
     * Internal increment for the object
     */
    private increment;
    /**
     * This is an internal flag to determine if the object is headless
     * If headless, then it's running on the server, so rendering related updates are not needed
     * Headless is true by default, but it's always set to false by the engine
     */
    headless: boolean;
    components: Array<[
        name: [string, string],
        options: Map<number, CustomObject3DComponent<keyof ClientComponentOptionMap>>
    ]>;
    private componentCallbacks;
    /**
     * @temporary - this will be removed or changed in the future
     * But you can use this to disable position, rotation, scale, etc in the engine's UI.
     * For example, if you want to disable position, you can set `defaults.{position|rotation|scale}` to false
     */
    defaults: {
        [key: string]: boolean;
    };
    /**
     * The icon of the object in the engine's UI.
     * Can be:
     * - An icon class name (e.g., "uil uil-cube")
     * - A URL starting with "http://" or "https://"
     * - A data URL starting with "data:"
     * When using URL-based icons, they will be rendered as <img> tags.
     */
    icon?: [name: string, color?: string];
    static icon: [name: string, color?: string];
    static type: string;
    private componentIncrement;
    size: Vector3;
    /**
     * This is used to determine if the object needs to be updated manually
     * If true, an update button will be shown in the engine's UI, and when clicked, it will trigger `this.create(undefined, undefined)`
     */
    needsManualCreate: boolean;
    /**
     * The context menu items when right clicking the object in the engine's UI
     */
    contextmenu: ContextMenuItem[];
    store?: StoreAdapter;
    get path(): string;
    /**
     * Creating a new component for the object
     * This will create a new group for options for the object in the engine's UI
     */
    createComponent(name: string, icon: string, id?: number): {
        createComponentOption<K extends keyof ClientComponentOptionMap>(name: string, value: ClientComponentOptionMap[K], type: K, options?: ClientComponentOptionOptionsMap[K], optionId?: number): {
            then(fn: (component: CustomObject3DComponent<K>) => void): any;
            update(value?: ClientComponentOptionMap[K]): any;
        };
        updateComponent<K extends keyof ClientComponentOptionMap>(optionId: number, component?: CustomObject3DComponent<K>, value?: ClientComponentOptionMap[K]): void;
    };
    /**
     * Creating a new option for the component
     * This will create a new option for the component in the engine's UI, This value can be changed by the user depending on the type of the option
     * @param group - The group of the component
     * @param name - The name of the option
     * @param value - The value of the option
     * @param type - The type of the option
     * @param options - The options of the option
     * @param id - The id of the option
     * @returns A new option for the component
     */
    createComponentOption<K extends keyof ClientComponentOptionMap>(group: number, name: string, value?: ClientComponentOptionMap[K], type?: K, options?: ClientComponentOptionOptionsMap[K], id?: number): {
        then(fn: (component: CustomObject3DComponent<K>) => void): any;
        update(value?: ClientComponentOptionMap[K]): any;
    };
    /**
     * Updating the value of the component
     * This will update the value of the component in the engine's UI
     * @param group - The group of the component
     * @param id - The id of the component
     * @param component - The component to update
     * @param value - The value to update the component with
     */
    updateComponent<K extends keyof ClientComponentOptionMap>(group: number, id: number, component?: CustomObject3DComponent<K>, value?: ClientComponentOptionMap[K]): void;
    /**
     * Removing the component from the object
     * This will remove the component from the object in the engine's UI
     * @param group - The group of the component
     * @param id - The id of the component
     */
    removeComponent(group: number, id: number): void;
    /** The object used to calculate the bounding box of the object */
    bound: Box3 | undefined;
    /**
     * This method is called when parsing the objects (once; on import)
     * @param json - The JSON object to parse
     */
    abstract fromJSON?(json: any): void;
    /** The method is called after the object is imported in the editor and added to the scene */
    abstract init?(store?: StoreAdapter): void;
    /** This method is called on every frame rate */
    abstract update?(delta?: number): void;
    /**
     * This method is called after every other object from the import list are added to the scene
     * This is used when an object is trying to reference another object in the scene
     * If you try to reference an object from the init, that object wont be found because it's not added to the scene yet
     * So we use this method to create the object after all the other objects are added to the scene
     */
    abstract create?(json?: ReturnType<this["toJSON"]>, workplace?: Directory): void;
    /**
     * This method is called when the object is removed from the scene, but not deleted from memory
     * This is used to clean up the object from the scene
     * But may come back from undo/redo
     * @param store - The store of the object
     */
    abstract destroy?(store?: StoreAdapter): void;
    /**
     * Called when pointer enters the object's bounding area while selected
     * @param data - Pointer event data with intersection info
     */
    onPointerEnter?(data: CustomObjectPointerEventData): void;
    /**
     * Called when pointer leaves the object's bounding area while selected
     * @param data - Pointer event data
     */
    onPointerLeave?(data: CustomObjectPointerEventData): void;
    /**
     * Called when pointer button is pressed while object is selected
     * @param data - Pointer event data with intersection info
     */
    onPointerDown?(data: CustomObjectPointerEventData): void;
    /**
     * Called when pointer button is released while object is selected
     * @param data - Pointer event data with intersection info
     */
    onPointerUp?(data: CustomObjectPointerEventData): void;
    /**
     * Called when pointer moves while object is selected
     * @param data - Pointer event data with intersection info
     */
    onPointerMove?(data: CustomObjectPointerEventData): void;
    /**
     * Called when double click occurs while object is selected
     * @param data - Pointer event data with intersection info
     */
    onDoubleClick?(data: CustomObjectPointerEventData): void;
    /**
     * Called when a key is pressed while object is selected
     * @param data - Keyboard event data
     */
    onKeyDown?(data: CustomObjectKeyboardEventData): void;
    /**
     * Called when a key is released while object is selected
     * @param data - Keyboard event data
     */
    onKeyUp?(data: CustomObjectKeyboardEventData): void;
    /**
     * Called when the mouse wheel is scrolled while object is selected
     * @param data - Wheel event data
     */
    onWheel?(data: CustomObjectWheelEventData): void;
    /**
     * This method is called when the object is copied
     * This is used to copy the object from the scene
     * Also used for cloning the object
     * @param source - The object to copy
     * @param recursive - Whether to copy the object recursively
     */
    copy(source: Object3D, recursive?: boolean): this;
}
