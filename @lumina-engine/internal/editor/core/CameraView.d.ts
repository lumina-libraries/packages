import { Camera, Scene, Vector2, WebGLRenderer } from "three";
import type { ClientView } from "./ClientView";
export declare class CameraView {
    camera: Camera;
    client?: ClientView | {
        canvas: HTMLCanvasElement;
    };
    position: Vector2;
    size: Vector2;
    constructor(camera: Camera, client?: ClientView | {
        canvas: HTMLCanvasElement;
    });
    render(scene: Scene, renderer: WebGLRenderer): void;
}
