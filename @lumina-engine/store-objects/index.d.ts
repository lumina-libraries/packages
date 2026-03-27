import { EventDispatcher } from "three";
import type { Scene } from "three";

export interface PluginStoreLike {
  scene?: Scene;
  [key: string]: unknown;
}

export interface CustomStoreObjectEventMap {
  click: { originalEvent?: MouseEvent };
  dblclick: { originalEvent?: MouseEvent };
  hover: { originalEvent?: MouseEvent };
  hoverend: { originalEvent?: MouseEvent };
  update: {};
  select: {};
  deselect: {};
}

export interface CustomStoreObjectOptions {
  deletable: boolean;
  nameEditable: boolean;
  selectable: boolean;
}

export declare abstract class CustomStoreObject extends EventDispatcher<CustomStoreObjectEventMap> {
  uuid: string;
  name: string;
  static type: string;
  readonly type: string;
  static icon: [name: string, color?: string];
  icon?: [name: string, color?: string];
  store?: PluginStoreLike;
  readonly options: CustomStoreObjectOptions;
  userData: Record<string, unknown>;
  constructor();
  getIcon(): [string, string?];
  onClick(event?: MouseEvent): void;
  onDoubleClick(event?: MouseEvent): void;
  onHover(event?: MouseEvent): void;
  onHoverEnd(event?: MouseEvent): void;
  onSelect(): void;
  onDeselect(): void;
  update(): void;
  init?(store: PluginStoreLike): void;
  dispose?(): void;
  toJSON(): Record<string, unknown>;
  fromJSON?(json: Record<string, unknown>): void;
}

export default CustomStoreObject;
