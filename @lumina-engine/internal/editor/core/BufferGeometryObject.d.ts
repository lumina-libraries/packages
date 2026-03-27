import { BufferGeometry, Object3D, Vector3, MeshBasicMaterial, type ColorRepresentation, Raycaster } from "three";
import { MultiPoints, createTriangles } from "./GeometryHelpers";
export declare class BufferGeometryObjectHelper extends Object3D {
    object: BufferGeometryObject;
    size: number;
    color: ColorRepresentation;
    selectedColor: ColorRepresentation;
    opacity: number;
    padding: number;
    selectedPositions: Set<number>;
    positions: MultiPoints;
    triangles: ReturnType<typeof createTriangles>;
    material: MeshBasicMaterial;
    readonly geometries: {
        positions: BufferGeometry;
        triangles: BufferGeometry;
    };
    updateEvent: (this: BufferGeometryObjectHelper) => void;
    constructor(object: BufferGeometryObject, size?: number, color?: ColorRepresentation, selectedColor?: ColorRepresentation, opacity?: number, padding?: number);
    dispose(): void;
    create(): void;
    selector: Object3D;
    selectorInitialPosition: Vector3;
    raycast(raycaster: Raycaster): Object3D<import("three").Object3DEventMap>;
    selectorEventUpdate: () => void;
    createPositions(): void;
    createTriangles(): void;
}
export declare class BufferGeometryObject extends Object3D {
    geometry: BufferGeometry;
    helper: BufferGeometryObjectHelper;
    createHelper(): BufferGeometryObjectHelper;
    constructor(geometry: BufferGeometry);
    applyMatrix(): void;
    updateMatrix(): void;
    setOrigin(origin: Vector3): void;
    setOriginToCenter(): void;
    setOriginToBottom(): void;
    setOriginToTop(): void;
    update(): void;
}
