import { DebugDrawer } from 'recast-navigation/three';
import MeshHelper from "./MeshHelper";
import type { NavigationObject } from "../objects/NavigationObject";
export declare class NavigationObjectHelper extends MeshHelper {
    target: NavigationObject;
    type: "NavigationObjectHelper";
    forceUpdateOnEveryFrame: boolean;
    debugDrawer: DebugDrawer | null;
    constructor(target: NavigationObject);
    generate(): void;
    update(): void;
    dispose(): void;
}
