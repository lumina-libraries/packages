import type { AnimationClip, BufferGeometry, Material, Mesh, Object3D, Source, Texture } from "three";
import type { Command } from "@lumina-engine/commands";
import type { CustomObject3D, CustomObjectKeyboardEventData, CustomObjectPointerEventData, CustomObjectWheelEventData } from "@lumina-engine/objects";

export enum LogFlag {
  Info,
  Warning,
  Error,
}

export interface DevlogEntry {
  id?: string;
  content: unknown[];
  flags?: LogFlag[];
  date?: Date;
  progress?: number | null;
  nav?: boolean;
}

export interface Selection {
  material?: Material | Material[];
  object?: Object3D | Object3D[];
  texture?: Texture | Texture[];
  geometry?: BufferGeometry | BufferGeometry[];
  source?: Source<unknown> | Source<unknown>[];
  animation?: AnimationClip | AnimationClip[];
  collider?: unknown;
}

export interface CollaborationUser {
  id: string;
  username: string;
  session: string;
}

export interface ActiveState {
  active: boolean;
}

/**
 * Every editor event and its payload. Names are `<domain>.<event>`: past tense for facts,
 * a `Requested` suffix for requests that one owner handles.
 */
export interface EditorEventMap {
  "command.requested": { command: Command };
  "command.applied": { command: Command; action: "execute" | "undo" | "redo" };
  "customObject.pointerInput": { type: "pointerenter" | "pointerleave" | "pointerdown" | "pointerup" | "pointermove" | "dblclick"; data: CustomObjectPointerEventData; object: CustomObject3D } | { type: "wheel"; data: CustomObjectWheelEventData; object: CustomObject3D };
  "customObject.keyboardInput": { type: "keydown" | "keyup"; data: CustomObjectKeyboardEventData; object: CustomObject3D };
  "devlog.logged": DevlogEntry;
  "selection.changed": Selection;
  "selection.renameRequested": { object: Object3D };
  "project.saveRequested": Record<string, never>;
  "project.stateChanged": { dirty: boolean; saving: boolean; location: string | null; lastSavedAt: Date | null };
  "store.removeRequested": { object?: Object3D; material?: Material; geometry?: BufferGeometry; texture?: Texture; source?: Source<unknown>; animation?: AnimationClip; hierarchy?: boolean; [resource: string]: unknown };
  "import.requested": { object?: Object3D; material?: Material; texture?: Texture; animation?: AnimationClip; toCursor?: boolean; toCamera?: boolean; addTo?: Object3D; parent?: boolean; [resource: string]: unknown };
  "export.requested": { wavefront?: boolean; gltf?: boolean; zip?: boolean; fs?: boolean; nova?: boolean; asset?: boolean };
  "transform.toolRequested": { mode?: "translate" | "rotate" | "scale"; space?: "local" | "world" };
  "transform.toolChanged": { mode: "translate" | "rotate" | "scale"; space: "local" | "world" };
  "viewport.hoverChanged": { object: Object3D; active: boolean };
  "viewport.modeChanged": { mode: number; view: number };
  "world.activeChanged": ActiveState;
  "playTest.requested": ActiveState;
  "playTest.changed": ActiveState;
  "playTest.statusChanged": { phase: "idle" | "preparing" | "running" | "failed"; message?: string };
  "workplace.opened": { directory: unknown; default: boolean; createdAt: Date; sessionId?: string };
  "ui.refreshRequested": { section: "transform" | "material" | "texture" | "animation" | "folder" | "folders"; target: string };
  "contextMenu.changed": { active?: boolean; x?: number; y?: number; items?: unknown[]; [option: string]: unknown };
  "assets.folderToggled": { folder: unknown | null; open: boolean };
  "inspector.componentsChanged": { object: CustomObject3D; removed: boolean };
  "workbench.mounted": Record<string, never>;
  "workbench.focusChanged": { id: string; type: "focus" | "blur" };
  "workbench.scriptTabRequested": { script: Object3D };
  "workbench.scriptTabCloseRequested": { scriptId: string };
  "workbench.voxelEditorRequested": { object: Object3D };
  "workbench.tabRequested": { templateId: string };
  "workbench.layoutResetRequested": Record<string, never>;
  "gridTool.modeChanged": { enabled: boolean };
  "gridTool.settingsRequested": { blockType: "ROOM" | "STAIRS" | "WALL" | "FLOOR"; rotation: 0 | 90 | 180 | 270; showConnectionPoints: boolean; mode: "Single" | "Line" | "Rectangle"; flip: boolean; showPreview: boolean; aboveSurface: boolean; onSurface: boolean; replaceBlocks: boolean; extrudeAmount: number };
  "gridTool.settingsChanged": { blockType: "ROOM" | "STAIRS" | "WALL" | "FLOOR"; rotation: 0 | 90 | 180 | 270; showConnectionPoints: boolean; mode: "Single" | "Line" | "Rectangle"; flip: boolean; showPreview: boolean; aboveSurface: boolean; onSurface: boolean; replaceBlocks: boolean; extrudeAmount: number };
  "geometry.sessionChanged": { viewId: number; mesh: unknown | null; active: boolean };
  "geometry.toolStateChanged": { viewId: number; mode: "view" | "edit"; hasActiveSession: boolean };
  "geometry.toolSessionChanged": { viewId: number; toolKind: string | null; snapshot: unknown | null };
  "geometry.selectionChanged": { summary: unknown };
  "geometry.debugChanged": { viewId: number; gizmoProxyVisible: boolean; selectionProxyVisible: boolean };
  "geometry.previewInvalidated": { viewId: number; geometryUuid: string | null };
  "geometry.committed": { viewId: number; mesh: Mesh; geometry: BufferGeometry };
  "collaboration.shareRequested": { visibility: "public" | "private" };
  "collaboration.joinRequested": { sessionId: string };
  "collaboration.stopRequested": Record<string, never>;
  "collaboration.acceptInviteRequested": { userId: string };
  "collaboration.declineInviteRequested": { userId: string };
  "collaboration.sessionShared": { sessionId: string };
  "collaboration.sessionJoined": { sessionId: string };
  "collaboration.joinDeclined": { sessionId: string };
  "collaboration.sessionEnded": { reason?: string };
  "collaboration.localUserChanged": CollaborationUser;
  "collaboration.userJoined": CollaborationUser;
  "collaboration.userLeft": { id: string };
  "collaboration.inviteReceived": CollaborationUser;
  "collaboration.inviteCancelled": { userId: string };
  "collaboration.cursorsChanged": { cursors: Array<[userId: string, position: [number, number] | false]> };
  "plugin.unloaded": { pluginId: string; pluginName: string };
  "plugin.customObjectRegistered": { name: string; object: typeof CustomObject3D };
  "plugin.customObjectUnregistered": { type: string };
  "plugin.menuItemAdded": { pluginId: string; pluginName: string; path: string; callback: () => void; icon?: string; shortcut?: string };
  "plugin.toolbarButtonAdded": { pluginId: string; pluginName: string; icon: string; tooltip: string; callback: () => void; toolbar?: "main" | "secondary" | "bottom" };
  "plugin.windowOpenRequested": { windowId: string; title: string; src: string; icon?: string; sandbox?: string; onMessage?: (data: unknown) => void; onLoad?: () => void; onClose?: () => void };
  "plugin.windowCloseRequested": { windowId: string };
  "plugin.windowDestroyed": { windowId: string };
  "plugin.iframeMessageRequested": { windowId: string; data: unknown; targetOrigin: string };
  "pluginCore.titleChanged": { title: string };
  "pluginCore.objectTypeChanged": { type: string; disabled: boolean };
  "pluginCore.windowAvailabilityChanged": { windowType: string; disabled: boolean };
  "pluginCore.transformToolChanged": { toolType: string; disabled: boolean };
  "pluginCore.inspectorGroupLockChanged": { groupName: string; locked: boolean };
  "pluginCore.inspectorGroupVisibilityChanged": { groupName: string; hidden: boolean };
  "pluginCore.inspectorComponentRegistered": { componentId: string; config: Record<string, unknown> };
  "pluginCore.inspectorComponentUnregistered": { componentId: string };
  "pluginCore.inspectorComponentOptionChanged": { componentId: string; groupName: string; optionId: string | number; value: unknown };
}

declare const payloadType: unique symbol;

/** A registry event name; it carries its payload type. Take names from EDITOR_EVENTS. */
export type EventName<Payload, Name extends string = string> = Name & { readonly [payloadType]: (payload: Payload) => Payload };

type DomainOf<Name> = Name extends `${infer Domain}.${string}` ? Domain : never;
type ActionOf<Name, Domain extends string> = Name extends `${Domain}.${infer Action}` ? Action : never;

export type EditorEventNames = {
  readonly [Domain in DomainOf<keyof EditorEventMap>]: {
    readonly [Action in ActionOf<keyof EditorEventMap, Domain>]: EventName<EditorEventMap[`${Domain}.${Action}` & keyof EditorEventMap], `${Domain}.${Action}`>;
  };
};

/** Every editor event name, e.g. `EDITOR_EVENTS.selection.changed`. */
export declare const EDITOR_EVENTS: EditorEventNames;

/** The editor event bus as a plugin sees it (`api.events`). Subscriptions end when the plugin unloads. */
export interface EditorEvents {
  emit<Payload>(name: EventName<Payload>, payload: NoInfer<Payload>): void;
  on<Payload>(name: EventName<Payload>, listener: (payload: Payload) => void | Promise<void>): () => void;
  once<Payload>(name: EventName<Payload>, listener: (payload: Payload) => void | Promise<void>): () => void;
  /** Latest payload of a state event: selection.changed, transform.toolChanged, world.activeChanged, playTest.changed, playTest.statusChanged, project.stateChanged, workbench.focusChanged. */
  latest<Payload>(name: EventName<Payload>): Payload | undefined;
}
