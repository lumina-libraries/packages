export type PluginCoreMode = "edit" | "view";
export type EditorWindow = "script" | "scene" | "inspector" | "hierarchy" | "assets" | "uv" | "minimap" | "node" | "timeline" | "terminal" | "collider" | "package" | "git" | "iconGenerator" | "pluginManager" | "pluginExplorer" | "pluginEditor" | "moduleExplorer" | "pluginTerminal" | "pluginProperties" | "iframe";

export interface FeatureConfig {
  id: string;
  name?: string;
  description?: string;
  dependencies?: string[];
  conflicts?: string[];
  [key: string]: unknown;
}

export interface FeatureValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}

export interface UIElementConfig {
  id: string;
  feature?: string;
  visible?: boolean;
  [key: string]: unknown;
}

export interface ImportFormatConfig {
  id?: string;
  name: string;
  extensions?: string[];
  mimeTypes?: string[];
  description?: string;
  import?: (file: File, context?: unknown) => Promise<unknown>;
  [key: string]: unknown;
}

export interface ExportFormatConfig {
  id?: string;
  name: string;
  extension: string;
  mimeType?: string;
  description?: string;
  export?: (data?: unknown, context?: unknown) => Promise<unknown>;
  [key: string]: unknown;
}

export interface InspectorOptionConfig {
  id: string | number;
  type: string;
  name: string;
  value?: unknown;
  label?: string;
  description?: string;
  options?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface InspectorGroupConfig {
  name: string;
  title?: string;
  icon?: string;
  options: InspectorOptionConfig[];
  [key: string]: unknown;
}

export interface InspectorComponentConfig {
  name: string;
  title?: string;
  icon?: string;
  priority?: number;
  groups?: InspectorGroupConfig[];
  onChange?: (groupName: string, optionId: string | number, value: unknown) => void;
  [key: string]: unknown;
}

export interface IframeWindowConfig {
  id: string;
  title: string;
  icon?: string;
  src: string;
  onMessage?: (data: unknown) => void;
  onLoad?: () => void;
  onClose?: () => void;
  allowParentAccess?: boolean;
  sandbox?: string;
}

export interface IframeWindowHandle {
  id: string;
  sendMessage(data: unknown, targetOrigin?: string): void;
  close(): void;
  isOpen(): boolean;
  getIframe(): HTMLIFrameElement | null;
}

export interface PluginCore {
  setTitle(title: string): void;
  getTitle(): string;
  disableObject(type: string): void;
  enableObject(type: string): void;
  isObjectDisabled(type: string): boolean;
  getDisabledObjects(): string[];
  disableMode(mode: PluginCoreMode): void;
  enableMode(mode: PluginCoreMode): void;
  isModeDisabled(mode: PluginCoreMode): boolean;
  getDisabledModes(): PluginCoreMode[];
  registerFeature(config: FeatureConfig): void;
  enableFeature(featureId: string): FeatureValidationResult;
  disableFeature(featureId: string): FeatureValidationResult;
  isFeatureEnabled(featureId: string): boolean;
  getAllFeatures(): FeatureConfig[];
  validateFeature(featureId: string): FeatureValidationResult;
  registerUIElement(config: UIElementConfig): void;
  setUIElementVisibility(elementId: string, visible: boolean): void;
  isUIElementVisible(elementId: string): boolean;
  hideUIElementsByFeature(featureId: string): void;
  showUIElementsByFeature(featureId: string): void;
  registerImportFormat(config: ImportFormatConfig): void;
  registerExportFormat(config: ExportFormatConfig): void;
  getEnabledImportFormats(): ImportFormatConfig[];
  getEnabledExportFormats(): ExportFormatConfig[];
  /** Prefer api.disableWindow, which fills in the plugin id. A plugin's disables end when it unloads. */
  disableWindow(windowType: EditorWindow, pluginId: string): void;
  enableWindow(windowType: EditorWindow, pluginId: string): void;
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
  createIframeWindow(config: IframeWindowConfig): IframeWindowHandle;
  closeIframeWindow(windowId: string): void;
  sendMessageToIframe(windowId: string, data: unknown, targetOrigin?: string): void;
  getOpenIframeWindows(): string[];
  isIframeWindowOpen(windowId: string): boolean;
}
