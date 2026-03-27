import { NavigationObject } from "../../editor/objects/NavigationObject";
import { Vector3 } from "three";
import { Pathfinding } from "../addons/three-pathfinding";
import type StoreAdapter from "../../editor/core/adapters/engine/StoreAdapter";
export interface PathfinderNode {
    centroid: Vector3;
}
export declare class Pathfinder {
    store?: StoreAdapter;
    readonly pathfinding: Pathfinding;
    navigations: NavigationObject[];
    constructor(store?: StoreAdapter);
    create(): void;
    set(navigation: NavigationObject): void;
    remove(navigation: NavigationObject): void;
    getPath(origin: Vector3, target: Vector3, navigation?: NavigationObject): Vector3[];
    clear(): void;
}
