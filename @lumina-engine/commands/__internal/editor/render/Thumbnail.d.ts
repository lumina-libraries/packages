import { PerspectiveCamera, Scene, WebGLRenderer, Object3D, Spherical } from "three";
export declare class Thumbnail {
    width: number;
    height: number;
    readonly canvas: HTMLCanvasElement;
    readonly screenshots: Set<Blob>;
    readonly scene: Scene;
    readonly renderer: WebGLRenderer;
    readonly camera: PerspectiveCamera;
    private object?;
    private originalMatrix?;
    constructor(width?: number, height?: number);
    size(): void;
    setObject(object: Object3D): Promise<void>;
    /**
     * This function will fit the object into a constant box3 size and focus the camera onto the object based on the angle.
     * You must save the original object's matrix before calling this function.
     */
    focus(angle: Spherical): void;
    /**
     * This function will assign the object's original matrix back to the object.
     */
    blur(): void;
    update(exposure?: number): void;
    read(): Promise<void>;
}
