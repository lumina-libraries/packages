import type { BufferGeometry, Material, Object3D, Texture } from "three";
import type { ArrayCommand, Command, CommandType } from "@lumina-engine/commands";
import type { EditorWindow, ExportFormatConfig, FeatureConfig, FeatureValidationResult, IframeWindowConfig, IframeWindowHandle, ImportFormatConfig, InspectorComponentConfig, InspectorGroupConfig, InspectorOptionConfig, PluginCore, PluginCoreMode, UIElementConfig } from "@lumina-engine/core";
import type { CustomObject3D } from "@lumina-engine/objects";
import type ProjectStore from "@lumina-engine/store";
import type StoreFolderAdapter from "@lumina-engine/store-folders";
import type { CustomStoreObject, CustomStoreObjectEventMap } from "@lumina-engine/store-objects";
import type { EditorEvents } from "@lumina-engine/events";

export type { ArrayCommand, Command, CommandType } from "@lumina-engine/commands";
export type { EditorWindow, ExportFormatConfig, FeatureConfig, FeatureValidationResult, IframeWindowConfig, IframeWindowHandle, ImportFormatConfig, InspectorComponentConfig, InspectorGroupConfig, InspectorOptionConfig, PluginCore, PluginCoreMode, UIElementConfig } from "@lumina-engine/core";

export interface FileReadOptions {
  extensions?: string[];
  mimeTypes?: string[];
  multiple?: boolean;
  suggestedName?: string;
}

export interface FileSaveOptions {
  suggestedName?: string;
  extension?: string;
  mimeType?: string;
}

export interface ImporterResult {
  success: boolean;
  objectsImported?: number;
  error?: string;
  warnings?: string[];
  [key: string]: unknown;
}

export interface ExporterResult {
  success: boolean;
  data?: Blob | string;
  filename?: string;
  error?: string;
  [key: string]: unknown;
}

export type ImportHandler = (file: File) => Promise<ImporterResult | unknown>;
export type ExportHandler = (store: ProjectStore) => Promise<ExporterResult | unknown>;
export interface ImporterConfig {
  extensions: string[];
  mimeTypes?: string[];
  import: (file: File) => Promise<ImporterResult>;
  name: string;
  description?: string;
}

export interface ExporterConfig {
  export: () => Promise<ExporterResult>;
  name: string;
  extension: string;
  mimeType?: string;
  description?: string;
}

export interface MenuItemConfig {
  path: string;
  callback: () => void;
  icon?: string;
  shortcut?: string;
}

export interface ToolbarButtonConfig {
  icon: string;
  tooltip: string;
  callback: () => void;
  toolbar?: "main" | "secondary" | "bottom";
}

export interface ComponentInstance {
  id: string;
  componentName?: string;
  props?: Record<string, unknown>;
  update?: (props?: Record<string, unknown>) => void;
  destroy?: () => void;
  [key: string]: unknown;
}

export interface DialogFormOption {
  id?: string | number;
  type: string;
  name?: string;
  label?: string;
  description?: string;
  value?: unknown;
  placeholder?: string;
  options?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface CanvasRendererOptions {
  width?: number;
  height?: number;
  transparent?: boolean;
  [key: string]: unknown;
}

export interface ThumbnailGenerationOptions {
  width?: number;
  height?: number;
  padding?: number;
  background?: string | number;
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  [key: string]: unknown;
}

export interface RenderToCanvasOptions extends ThumbnailGenerationOptions {}
export interface RenderMaterialOptions extends ThumbnailGenerationOptions {}
export interface RenderGeometryOptions extends ThumbnailGenerationOptions {}
export interface RenderTextureOptions extends ThumbnailGenerationOptions {}

export interface DirectoryCapabilities {
  streams: boolean;
  rangeReads: boolean;
  randomAccess: boolean;
  remote: boolean;
}

export interface PluginFileHandle {
  readonly name: string;
  readonly path?: string;
  text(): Promise<string>;
  json<T = unknown>(): Promise<T>;
  read(mode?: string): Promise<Blob>;
  write(data: Blob | string | ArrayBuffer, mode?: string): Promise<void>;
  writeJson(data: unknown): Promise<void>;
}

export interface PluginDirectoryHandle {
  readonly name: string;
  readonly path?: string;
  getDirectory(name: string, create?: boolean): Promise<PluginDirectoryHandle | null>;
  getFile(name: string, create?: boolean): Promise<PluginFileHandle | null>;
}

export interface IPluginAPI {
  init(name: string, description: string): Promise<void>;
  registerCustomObject(name: string, object: typeof CustomObject3D): void;
  registerExporter(name: string, exporter: ExportHandler): void;
  registerImporter(name: string, handler: ImportHandler): void;
  getStore(): ProjectStore;
  getPluginCore(): PluginCore;
  log(message: string, level?: "info" | "warn" | "error"): void;
  logInfo(message: string, context?: unknown): void;
  logWarning(message: string, context?: unknown): void;
  logError(message: string, context?: unknown): void;
  registerModule(name: string, moduleCode: string | (() => unknown) | Record<string, unknown>): void;
  hasModule(specifier: string): boolean;
  getRegisteredModules(): string[];
  disableFeature(feature: string): void;
  enableFeature(feature: string): void;
  isFeatureEnabled(feature: string): boolean;
  getDisabledFeatures(): string[];
  disableObject(...types: string[]): void;
  enableObject(type: string): void;
  isObjectDisabled(type: string): boolean;
  getDisabledObjects(): string[];
  getRegisteredImporters(): string[];
  getRegisteredExporters(): string[];
  requestReadFile(options?: FileReadOptions): Promise<File | File[]>;
  requestSaveFile(data: Blob | string | ArrayBuffer, options?: FileSaveOptions): Promise<void>;
  registerImportFormat(formatId: string, config: ImporterConfig | ImportFormatConfig): void;
  registerExportFormat(formatId: string, config: ExporterConfig | ExportFormatConfig): void;
  addMenuItem(config: MenuItemConfig): void;
  addToolbarButton(config: ToolbarButtonConfig): void;
  /** Shows a message, tagged with the plugin name, in the devlog/terminal. */
  showNotification(message: string, type?: "info" | "success" | "warning" | "error"): void;
  /** The editor event bus scoped to this plugin; names come from EDITOR_EVENTS in @lumina-engine/events. */
  readonly events: EditorEvents;
  registerComponent(name: string, source: string, metadata?: Record<string, unknown>): Promise<void>;
  createComponent(componentName: string, target: HTMLElement | string, props?: Record<string, unknown>): Promise<ComponentInstance>;
  updateComponent(instanceId: string, props: Record<string, unknown>): boolean;
  destroyComponent(instanceId: string): boolean;
  getComponentInstances(componentName?: string): ComponentInstance[];
  hasComponent(name: string): boolean;
  setTitle(title: string): void;
  getTitle(): string;
  disableMode(mode: PluginCoreMode): void;
  enableMode(mode: PluginCoreMode): void;
  registerMaterial(name: string, material: Material, options?: { locked?: boolean }): void;
  registerGeometry(name: string, geometry: BufferGeometry, options?: { locked?: boolean }): void;
  showDialog(title: string, description: string, options: DialogFormOption[], props?: { maxWidth?: number | string; maxHeight?: number | string; confirmText?: string | null }): { promise: Promise<DialogFormOption[]>; close: () => void; };
  showMarkdownDialog(title: string, markdown: string, props?: { confirmText?: string }): Promise<void>;
  disableWindow(...windowTypes: EditorWindow[]): void;
  enableWindow(windowType: EditorWindow): void;
  isWindowDisabled(windowType: EditorWindow): boolean;
  getDisabledWindows(): EditorWindow[];
  lockInspectorGroup(...groupNames: string[]): void;
  unlockInspectorGroup(groupName: string): void;
  isInspectorGroupLocked(groupName: string): boolean;
  getLockedInspectorGroups(): string[];
  hideInspectorGroup(...groupNames: string[]): void;
  showInspectorGroup(groupName: string): void;
  isInspectorGroupHidden(groupName: string): boolean;
  getHiddenInspectorGroups(): string[];
  disableTransformTool(toolType: string): void;
  enableTransformTool(toolType: string): void;
  isTransformToolDisabled(toolType: string): boolean;
  getDisabledTransformTools(): string[];
  registerInspectorComponent(config: InspectorComponentConfig): void;
  unregisterInspectorComponent(componentName: string): void;
  updateInspectorComponentOption(componentName: string, groupName: string, optionId: string | number, value: unknown): boolean;
  getInspectorComponents(): InspectorComponentConfig[];
  hasInspectorComponent(componentName: string): boolean;
  getInspectorComponentOptionValue(componentName: string, groupName: string, optionId: string | number): unknown | null;
  import(name: string, file?: Blob): Promise<unknown | undefined>;
  createCanvasRenderer(options?: CanvasRendererOptions): unknown;
  generateThumbnail(object: Object3D, options?: ThumbnailGenerationOptions): Promise<Blob>;
  generateThumbnailDataURL(object: Object3D, options?: ThumbnailGenerationOptions): Promise<string>;
  renderObjectToCanvas(object: Object3D, options?: RenderToCanvasOptions): HTMLCanvasElement;
  renderMaterialToCanvas(material: Material, options?: RenderMaterialOptions): HTMLCanvasElement;
  renderGeometryToCanvas(geometry: BufferGeometry, options?: RenderGeometryOptions): HTMLCanvasElement;
  renderTextureToCanvas(texture: Texture, options?: RenderTextureOptions): HTMLCanvasElement;
  object(action: "add" | "remove", object: Object3D, parent?: boolean, recursive?: boolean): void;
  disableFolder(folderId: string): void;
  enableFolder(folderId: string): void;
  isFolderDisabled(folderId: string): boolean;
  getDisabledFolders(): string[];
  createFolder(name: string, id?: string, parentId?: string): StoreFolderAdapter;
  getFolder(folderId: string): StoreFolderAdapter | undefined;
  hasFolder(folderId: string): boolean;
  disableMaterialCreation(): void;
  enableMaterialCreation(): void;
  isMaterialCreationDisabled(): boolean;
  disableTextureCreation(): void;
  enableTextureCreation(): void;
  isTextureCreationDisabled(): boolean;
  addCustomStoreObject(object: CustomStoreObject, folderId?: string): void;
  removeCustomStoreObject(object: CustomStoreObject): void;
  getCustomStoreObjects(): CustomStoreObject[];
  onCustomStoreObjectEvent<K extends keyof CustomStoreObjectEventMap>(object: CustomStoreObject, event: K, callback: (event: CustomStoreObjectEventMap[K]) => void): void;
  offCustomStoreObjectEvent<K extends keyof CustomStoreObjectEventMap>(object: CustomStoreObject, event: K, callback: (event: CustomStoreObjectEventMap[K]) => void): void;
  importToWorld(object: Object3D, options?: { toCursor?: boolean; toCamera?: boolean; addTo?: Object3D; parent?: boolean }): void;
  importMaterial(material: Material): void;
  importTexture(texture: Texture): void;
  executeCommand(command: Command | ArrayCommand | Record<string, unknown>): void;
  executeCommands(commands: Array<Command | ArrayCommand | Record<string, unknown>>): void;
  getAvailableCommandTypes(): string[];
  openDirectory(id?: string, options?: { title?: string; message?: string }): Promise<PluginDirectoryHandle>;
  getDirectory(directory: PluginDirectoryHandle, name: string, create?: boolean): Promise<PluginDirectoryHandle | null>;
  getFile(directory: PluginDirectoryHandle, name: string, create?: boolean): Promise<PluginFileHandle | null>;
  listFiles(directory: PluginDirectoryHandle): Promise<PluginFileHandle[]>;
  listDirectories(directory: PluginDirectoryHandle): Promise<PluginDirectoryHandle[]>;
  listEntries(directory: PluginDirectoryHandle): Promise<string[]>;
  hasEntry(directory: PluginDirectoryHandle, name: string): Promise<boolean>;
  removeEntry(directory: PluginDirectoryHandle, name: string): Promise<void>;
  clearDirectory(directory: PluginDirectoryHandle): Promise<void>;
  copyDirectory(source: PluginDirectoryHandle, destination: PluginDirectoryHandle): Promise<void>;
  getDirectoryCapabilities(directory: PluginDirectoryHandle): Promise<DirectoryCapabilities>;
  iterateDirectory(directory: PluginDirectoryHandle, options?: { recursive?: boolean; type?: "file" | "directory" | "all" }): AsyncGenerator<string>;
  walkDirectory(directory: PluginDirectoryHandle, options?: { recursive?: boolean }): AsyncGenerator<{ path: string; kind: "file" | "directory" }>;
  createIframeWindow(config: IframeWindowConfig): IframeWindowHandle;
  closeIframeWindow(windowId: string): void;
  sendMessageToIframe(windowId: string, data: unknown, targetOrigin?: string): void;
  getOpenIframeWindows(): string[];
  isIframeWindowOpen(windowId: string): boolean;
}
