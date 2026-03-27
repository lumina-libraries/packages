import { BufferGeometry, Vector3, Color, Mesh, Object3D, Points, MeshStandardMaterial } from "three";
export declare function hashBufferGeometry(geometry: BufferGeometry): Promise<string>;
declare class MultiTriangleGeometry extends BufferGeometry {
    color: Color;
    selectedColor: Color;
    private colorBuffer;
    selected: Set<number>;
    triangles: Array<{
        a: Vector3;
        b: Vector3;
        c: Vector3;
    }>;
    constructor(geometry: BufferGeometry, color?: Color, selectedColor?: Color);
    update(): void;
    select(index: number): void;
    unselect(index: number): void;
    toggle(index: number): void;
    getSelectedPositions(): number[];
}
export declare function createTriangles(geometry: BufferGeometry): Mesh<MultiTriangleGeometry, MeshStandardMaterial, import("three").Object3DEventMap>;
export declare class MultiPoints extends Object3D {
    readonly geometry: BufferGeometry;
    readonly color: Color;
    readonly selectedColor: Color;
    points: Points;
    constructor(geometry: BufferGeometry, color?: Color, selectedColor?: Color);
    selected: Set<number>;
    select(index: number): void;
    unselect(index: number): void;
    toggle(index: number): void;
    getSelectedTriangles(): number[];
}
export {};
