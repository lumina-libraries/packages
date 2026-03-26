import { AttachmentManager } from "../../client/managers/AttachmentManager";
import { Scene, PerspectiveCamera, Object3D, Mesh, Material, Box3, Vector3, BufferGeometry, Raycaster, Vector2, Texture, Euler, AnimationClip, type Intersection, AnimationMixer, LineSegments, LineBasicMaterial } from "three";
import { CSS2DObject } from "../../shared/addons/jsm/renderers/CSS2DRenderer";
import { type Helpers } from "./adapters/engine/StoreAdapter";
import KeyboardEventAdapter from "./adapters/engine/KeyboardEventAdapter";
import { Directory } from "../fs";
import { InfiniteGridHelper } from "./lib/InfiniteGridHelper";
import Keyboard from "./adapters/engine/Keyboard";
import { PointerLockControls } from "../controls/PointerlockControls";
import type { Command } from "../commands/Command";
import { EditorEntity } from "../objects/EditorEntity";
import * as Commands from "../commands/Commands";
import { PeerToPeerClient } from "../p2p/PeerToPeerClient";
import { WeaponSource } from "../../shared/sources/WeaponSource";
import { EnvironmentScene } from "../../shared/engine/EnvironmentScene";
import { Cursor } from "./Cursor";
import { type ContextMenuItem } from "../events/ContextMenuEvent";
import { BufferGeometryObject } from "./BufferGeometryObject";
import { TransformAdapter } from "./adapters/engine/TransformAdapter";
import { GameManager } from "../../client/managers/GameManager";
import type { SharedWorld } from "../../shared/managers/SharedWorld";
import { PackageDirectory } from "../fs/core/PackageDirectory";
import { ClientView } from "./ClientView";
declare class RapierDebugRenderer {
    scene: Scene;
    world: SharedWorld;
    readonly mesh: LineSegments<BufferGeometry<import("three").NormalBufferAttributes, import("three").BufferGeometryEventMap>, LineBasicMaterial, import("three").Object3DEventMap>;
    enabled: boolean;
    constructor(scene: Scene, world: SharedWorld);
    update(): void;
    dispose(): void;
}
export default class Client extends EventTarget {
    readonly commands: typeof Commands;
    readonly keyboardEvent: KeyboardEventAdapter;
    /** The main scene of the object */
    readonly scene: Scene;
    /** The editor's screen */
    readonly clientScene: Scene;
    /** The main camera */
    readonly camera: PerspectiveCamera;
    /** The 3d webgl renderer */
    get webgl(): any;
    get postprocessor(): any;
    get viewport(): any;
    get rendererNode(): any;
    get postprocessorNode(): any;
    get viewportNode(): any;
    readonly cursor: Cursor;
    readonly p2p: PeerToPeerClient;
    readonly editObjects: Map<Mesh, BufferGeometryObject>;
    readonly map: Scene;
    readonly editScene: Scene;
    readonly gameScene: Scene;
    readonly helperScene: Scene;
    readonly history: any;
    readonly mixer: AnimationMixer;
    readonly store: any;
    readonly packages: PackageDirectory;
    readonly game: GameManager;
    get settings(): import("../../client/managers/SettingsManager").SettingsManager;
    environmentScene?: EnvironmentScene;
    workplace?: Directory;
    readonly keyboard: Keyboard;
    readonly views: Map<number, ClientView>;
    dragging: boolean;
    selectedObjects: Set<Object3D>;
    dragStartPositions: Map<Object3D, Vector3>;
    dragStartRotations: Map<Object3D, Euler>;
    dragStartScales: Map<Object3D, Vector3>;
    replaceLegacyMaterial(material: Material): Promise<void>;
    replaceLegacyMaterials(): Promise<void>;
    rapierDebug?: RapierDebugRenderer;
    debug(): void;
    init(): void;
    constructor();
    download(data: Blob, name: string): void;
    zip: FileSystemFileHandle;
    save(data: Blob, name: string): Promise<void>;
    default(): void;
    get colorBorder(): string;
    transform: TransformAdapter;
    grid: InfiniteGridHelper;
    events: Event[];
    objectData: Map<Object3D, any>;
    raycaster: Raycaster;
    ray: import("three").Ray;
    pointerLock: PointerLockControls;
    /**
     * Resets everything
     * Removes every meshes lights and objects
     * disposes every meterials and geometries etc
     */
    dispose(): void;
    mouseDownVector: Vector2;
    mouseUpVector: Vector2;
    private lastClickTime;
    private lastClickObject;
    private readonly DOUBLE_CLICK_THRESHOLD;
    /**
     * Creates pointer event data for CustomObject3D events
     */
    private createPointerEventData;
    /**
     * Creates keyboard event data for CustomObject3D events
     */
    private createKeyboardEventData;
    /**
     * Creates wheel event data for CustomObject3D events
     */
    private createWheelEventData;
    /**
     * Dispatches a pointer event to the selected CustomObject3D
     */
    private dispatchCustomObjectPointerEvent;
    /**
     * Dispatches a keyboard event to the selected CustomObject3D
     */
    private dispatchCustomObjectKeyboardEvent;
    /**
     * Dispatches a wheel event to the selected CustomObject3D
     */
    private dispatchCustomObjectWheelEvent;
    pointerDown(element: HTMLElement, viewId: number, event: PointerEvent): void;
    keyDown(element: HTMLElement, viewId: number, event: KeyboardEvent): void;
    keyUp(element: HTMLElement, viewId: number, event: KeyboardEvent): void;
    wheel(element: HTMLElement, viewId: number, event: WheelEvent): void;
    pointerMove(element: HTMLElement, viewId: number, event: PointerEvent): void;
    pointerUp(element: HTMLElement, viewId: number, event: PointerEvent): void;
    /** Creating a new scene */
    set(): void;
    get canvas(): any;
    weapon(): Promise<{
        scene: Object3D<import("three").Object3DEventMap>;
        source: WeaponSource;
        attatchments: AttachmentManager;
    }>;
    createName(object: Object3D): string;
    createHelper(object: Object3D, bounding: Box3): Helpers;
    /** Create 2d indicator texts or icons */
    createIndicator(object: Object3D): CSS2DObject;
    /** Create objects lights and camera's bounding box for intersection. */
    bounding(object: Object3D, bound?: Box3, padding?: number): Box3;
    entities: EditorEntity[];
    object(action: "add" | "remove", object: Object3D, parent?: boolean, recursive?: boolean, attach?: boolean, select?: boolean): void;
    sendCommand(command: Command, receiver?: string): Promise<void>;
    sendCommandAction(command: Command, type: "undo" | "redo"): void;
    execute(command: Command, send?: boolean): Promise<void>;
    undo(): void;
    redo(): void;
    updateObject(detail: {
        object?: Object3D;
        material?: Material;
        geometry?: BufferGeometry;
        texture?: Texture;
        animation?: AnimationClip;
    }): void;
    selected: Object3D;
    select(object?: Object3D | Object3D[]): void;
    contexes: Map<string, ContextMenuItem[]>;
    addContextMenu(id: string, items: ContextMenuItem[]): void;
    removeContextMenu(id: string): void;
    contextmenu(): void;
    renderState: boolean;
    direction: Vector3;
    intersecting: Object3D;
    getMousePosition(element: HTMLElement, x: number, y: number): number[];
    mouse: Vector2;
    intersections: Intersection<Object3D>[];
    boxIntersections: [Vector3, Object3D][];
    getIntersects(point: {
        x: number;
        y: number;
    }, meshOnly?: boolean): Object3D[];
    getEditIntersects(point: {
        x: number;
        y: number;
    }): Object3D[];
    lastUpdateTime: number;
    delta: number;
    time: number;
    render(now?: number): void;
    addView(view: ClientView): ClientView;
    removeView(view: ClientView): ClientView;
    deleteUselessBones(): void;
    export(type?: "zip" | "filesystem" | "asset" | "nova"): Promise<void>;
    import(type?: "map" | "object"): Promise<void>;
}
export {};
