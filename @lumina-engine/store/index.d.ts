import type { AnimationClip, BufferGeometry, Camera, Material, Object3D, Scene, Texture } from "three";
import type { CustomObject3D } from "@lumina-engine/objects";

export interface StoreEnvironmentParameters {
  timeCycle: {
    enabled: boolean;
    autoUpdate: boolean;
    [key: string]: unknown;
  };
  csm: {
    lightIntensity: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface StoreEnvironment {
  parameters: StoreEnvironmentParameters;
  createTestPresets(): void | Promise<void>;
  bakeLightProbeVolume(): Promise<void>;
  setActiveTimePreset(name: string): void;
  update(section?: string): void;
}

export interface StoreNodeGraph {
  getNodesByType(type: string): unknown[];
}

export type StoreAsset =
  | Object3D
  | Material
  | Texture
  | BufferGeometry
  | AnimationClip
  | CustomObject3D;

export interface StoreEventMap {
  add: [object: StoreAsset];
  remove: [object: StoreAsset];
  select: [object: StoreAsset | undefined];
  deselect: [object: StoreAsset];
}

export interface StoreAdapter {
  uuid: string;
  name: string;
  description: string;
  scene?: Scene;
  camera?: Camera;
  parent?: Object3D;
  environment?: StoreEnvironment;
  nodes?: StoreNodeGraph;
  readonly selected: Set<StoreAsset>;
  readonly objects: Set<Object3D>;
  readonly materials: Set<Material>;
  readonly geometries: Set<BufferGeometry>;
  readonly textures: Set<Texture>;
  readonly animations: Set<AnimationClip>;
  readonly customObjects: Set<CustomObject3D>;
  add(object: StoreAsset): void;
  remove(object: StoreAsset): void;
  select(object?: StoreAsset): void;
  deselect(object: StoreAsset): void;
  on<K extends keyof StoreEventMap>(eventName: K, listener: (...args: StoreEventMap[K]) => void): this;
  once<K extends keyof StoreEventMap>(eventName: K, listener: (...args: StoreEventMap[K]) => void): this;
  off<K extends keyof StoreEventMap>(eventName: K, listener: (...args: StoreEventMap[K]) => void): this;
  findObjectByUuid(uuid: string): Object3D | undefined;
  findObjectByName(name: string): Object3D | undefined;
  findAllObjectsByName(name: string): Object3D[];
  findMaterialByUuid(uuid: string): Material | undefined;
  findMaterialByName(name: string): Material | undefined;
  findAllMaterialsByName(name: string): Material[];
  findTextureByUuid(uuid: string): Texture | undefined;
  findTextureByName(name: string): Texture | undefined;
  findAllTexturesByName(name: string): Texture[];
  findGeometryByUuid(uuid: string): BufferGeometry | undefined;
  findGeometryByName(name: string): BufferGeometry | undefined;
  findAllGeometriesByName(name: string): BufferGeometry[];
  findAnimationByUuid(uuid: string): AnimationClip | undefined;
  findAnimationByName(name: string): AnimationClip | undefined;
  findAllAnimationsByName(name: string): AnimationClip[];
  findMaterialOwners(material: Material): Object3D[];
  findGeometryOwners(geometry: BufferGeometry): Object3D[];
  findTextureOwners(texture: Texture): Object3D[];
  findAnimationOwners(animation: AnimationClip): Object3D[];
}

declare const defaultStore: StoreAdapter;
export default defaultStore;
