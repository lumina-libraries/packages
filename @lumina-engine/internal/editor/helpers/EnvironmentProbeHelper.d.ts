import { OrthographicCamera, Vector4, WebGLRenderer, PerspectiveCamera, Scene } from "three";
import { EnvironmentScene } from "../../shared/engine/EnvironmentScene";
export declare class EnvironmentProbeHelper extends Scene {
    camera?: PerspectiveCamera;
    domElement?: HTMLElement;
    environmentScene?: EnvironmentScene;
    readonly orthographic: OrthographicCamera;
    readonly viewport: Vector4;
    private helper;
    constructor(camera?: PerspectiveCamera, domElement?: HTMLElement, environmentScene?: EnvironmentScene);
    init(): void;
    update(): void;
    render(renderer: WebGLRenderer): void;
}
