import { Object3D } from "three";
import type StoreAdapter from "./StoreAdapter";
export type PropertyAdapterFunction = (object: Object3D, store: StoreAdapter, ...args: any[]) => any;
export declare class PropertyAdapter {
    cache: Map<string, PropertyAdapterFunction>;
    process(object: Object3D, store: StoreAdapter, type: string, value: string | number | boolean): any;
    register(type: string, adapter: PropertyAdapterFunction): void;
    unregister(type: string): void;
}
