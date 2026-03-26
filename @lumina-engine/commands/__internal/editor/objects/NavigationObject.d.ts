import { BufferGeometry, BufferGeometryLoader } from "three";
import { CustomObject3D } from "./CustomObject3D";
import { NavMesh, NavMeshQuery } from "recast-navigation";
import { type Vector3Like } from 'three';
import type { ContextMenuItem } from "../events/ContextMenuEvent";
export declare const NavigationObjectIcon: Required<CustomObject3D>["icon"];
type NavigationObjectGenetatorType = "Solo" | "Tiled" | "Tile Cache";
export declare class NavigationObject extends CustomObject3D {
    data: BufferGeometry | null;
    private recastPromise?;
    static loader: BufferGeometryLoader;
    static type: string;
    readonly type: string;
    readonly icon: [name: string, color?: string];
    generatorType: NavigationObjectGenetatorType;
    generated: boolean;
    needsManualCreate: boolean;
    navMesh: NavMesh | null;
    query: NavMeshQuery | null;
    walkableRadius: number;
    walkableSlopeAngle: number;
    borderSize: number;
    walkableClimb: number;
    walkableHeight: number;
    tileSize: number;
    maxEdgeLength: number;
    contextmenu: ContextMenuItem[];
    constructor(data?: BufferGeometry | null);
    init(): void;
    get(): void | [positions: Float32Array<ArrayBufferLike>, indices: Uint32Array<ArrayBufferLike>, meshes: number];
    createPath(startPosition: Vector3Like, endPosition: Vector3Like): import("recast-navigation").Vector3[];
    create(): Promise<void>;
    toJSON(): {
        generatorType: NavigationObjectGenetatorType;
        generated: boolean;
        walkableRadius: number;
        walkableSlopeAngle: number;
        borderSize: number;
        walkableClimb: number;
        walkableHeight: number;
        tileSize: number;
        maxEdgeLength: number;
        metadata?: {
            version: number;
            type: string;
            generator: string;
        };
        object: import("three").Object3DJSONObject;
    };
    fromJSON(json: ReturnType<NavigationObject["toJSON"]>): void;
    /**
     * This method is called every frame with the delta.
     * @param delta
     */
    update(delta: number): void;
}
export {};
