import { Box3, WebGLCubeRenderTarget, CubeCamera, PerspectiveCamera, LineSegments, Vector3 } from "three";
import { CustomObject3D } from "./CustomObject3D";
import type StoreAdapter from "../core/adapters/engine/StoreAdapter";
export declare class ProjectedCubemapHelper extends LineSegments {
    object: ProjectedCubemapObject;
    type: string;
    constructor(object: ProjectedCubemapObject);
    update(): void;
    updateMatrixWorld(force: boolean): void;
    dispose(): void;
    computeBoundingSphere(): void;
}
export declare const ProjectedCubemapObjectIcon: Required<CustomObject3D>["icon"];
export declare class ProjectedCubemapObject extends CustomObject3D {
    static type: string;
    readonly type: string;
    readonly icon: [name: string, color?: string];
    readonly bound: Box3;
    readonly renderTarget: WebGLCubeRenderTarget;
    scale: Vector3;
    autoRender: boolean;
    camera: CubeCamera;
    get cameras(): PerspectiveCamera[];
    constructor();
    updateCamera(): void;
    private boundSizeComponent;
    private ouputComponent;
    init(store: StoreAdapter): void;
    render(): void;
    update(): void;
}
