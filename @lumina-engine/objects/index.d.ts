import { Object3D, type Intersection, type Object3DEventMap, type Scene, Vector2, Vector3 } from "three";

export interface PluginStoreLike {
  scene?: Scene;
  customObjects?: Iterable<CustomObject3D>;
  [key: string]: unknown;
}

export type ComponentOptionType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "color"
  | "function"
  | (string & {});

export interface ComponentOptionConfig {
  [key: string]: unknown;
}

export interface ContextMenuItem {
  name: string;
  icon?: string;
  disabled?: boolean;
  action?: () => void;
  [key: string]: unknown;
}

export interface CustomObjectPointerEventData {
  originalEvent: PointerEvent;
  point?: Vector3;
  normal?: Vector3;
  distance?: number;
  faceIndex?: number;
  ndc: Vector2;
  intersection?: Intersection;
  viewIndex: number;
}

export interface CustomObjectKeyboardEventData {
  originalEvent: KeyboardEvent;
  key: string;
  code: string;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
  viewIndex: number;
}

export interface CustomObjectWheelEventData {
  originalEvent: WheelEvent;
  deltaX: number;
  deltaY: number;
  deltaZ: number;
  deltaMode: number;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
  ndc: Vector2;
  viewIndex: number;
}

export interface CustomObjectComponent<T = unknown> {
  id: number;
  name: string;
  value: T;
  type?: ComponentOptionType;
  options?: ComponentOptionConfig;
  colors?: string[];
}

export interface ComponentOptionHandle<T = unknown> {
  then(fn: (component: CustomObjectComponent<T>) => void): ComponentOptionHandle<T>;
  update(value?: T): ComponentOptionHandle<T>;
}

export interface ComponentGroupHandle {
  createComponentOption<T = unknown>(name: string, value?: T, type?: ComponentOptionType, options?: ComponentOptionConfig, optionId?: number): ComponentOptionHandle<T>;
  updateComponent<T = unknown>(optionId: number, component?: CustomObjectComponent<T>, value?: T): void;
}

export declare abstract class CustomObject3D<TEventMap extends Record<string, unknown> = {}> extends Object3D<Object3DEventMap & TEventMap> {
  headless: boolean;
  defaults: Record<string, boolean>;
  icon?: [name: string, color?: string];
  static icon: [name: string, color?: string];
  static type: string;
  size: Vector3;
  needsManualCreate: boolean;
  contextmenu: ContextMenuItem[];
  store?: PluginStoreLike;
  createComponent(name: string, icon: string, id?: number): ComponentGroupHandle;
  createComponentOption<T = unknown>(group: number, name: string, value?: T, type?: ComponentOptionType, options?: ComponentOptionConfig, id?: number): ComponentOptionHandle<T>;
  updateComponent<T = unknown>(group: number, id: number, component?: CustomObjectComponent<T>, value?: T): void;
  removeComponent(group: number, id: number): void;
  init(store?: PluginStoreLike): void;
  dispose?(): void;
  toJSON(): Record<string, unknown>;
  fromJSON?(json: Record<string, unknown>): void;
}

export default CustomObject3D;
