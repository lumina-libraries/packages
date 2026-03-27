import { Box3, Object3D, LightProbe, Matrix3, Vector3, Mesh, WebGLRenderer, Scene, CubeCamera, SphericalHarmonics3, Line } from "three";
import { LightProbeHelper } from "../../shared/addons/jsm/helpers/LightProbeHelper";
export declare class LightProbeVolumeHelper extends Line {
    lightProbeVolume: LightProbeVolume;
    size: number;
    lightProbeHelpers: LightProbeHelper[];
    showProbes: boolean;
    showCells: boolean;
    constructor(lightProbeVolume: LightProbeVolume, size?: number);
    update(): this;
    dispose(): void;
}
export declare class LightProbeVolume extends Object3D {
    probes: LightProbe[];
    bounds: Box3;
    countX: number;
    countY: number;
    countZ: number;
    cells: number[][];
    cellMatrices: (Matrix3 | null)[];
    cellCache: WeakMap<Object3D, number>;
    type: string;
    makeEmpty(): this;
    setFromBounds(bounds: Box3, countX: number, countY: number, countZ: number): this;
    oneProbe(): this;
    update(mesh: Mesh, target: SphericalHarmonics3): this;
    _build(cells: LightProbeVolume["cells"]): this;
    bake(renderer: WebGLRenderer, scene: Scene, cubeCamera: CubeCamera, onProgress?: (p: number, probe: LightProbe) => void): Promise<unknown>;
    _findCell(mesh: Object3D, position: Vector3): number;
    _pointInCell(point: Vector3, cellIndex: number): boolean;
    _getBarycentricCoordinates(point: Vector3, cellIndex: number, coords: number[]): this;
    copy(source: LightProbeVolume): this;
    toJSON(meta: any): import("three").Object3DJSON;
    fromJSON(data: any): this;
}
