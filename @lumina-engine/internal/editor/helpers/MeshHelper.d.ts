import { GLTFLoader } from "../../shared/addons/jsm/loaders/GLTFLoader";
import { Object3D } from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
export default class MeshHelper extends Object3D {
    type: string;
    static loader: GLTFLoader;
    static promises: Map<string, Promise<GLTF>>;
    size: number;
    static createPromise(name: string, load: () => Promise<GLTF>): Promise<GLTF>;
    forceUpdateOnEveryFrame: boolean;
    /**
     * This method is called every frame with the delta and time.
     * @param delta
     * @param time
     */
    update?(delta?: number, time?: number): void;
}
