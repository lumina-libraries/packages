import { Box3, BoxGeometry, Group, Mesh, MeshBasicMaterial, Object3D } from "three";
import { type GLTF, GLTFLoader } from "../../shared/addons/jsm/loaders/GLTFLoader.js";
import type { SharedEntity } from "../../shared/objects/SharedEntity";
export declare class EditorEntityObject extends Object3D {
    entity: EditorEntity;
    constructor(entity: EditorEntity);
    set?(source: SharedEntity): void;
    get?(): SharedEntity;
}
export declare class EditorEntity extends Object3D {
    name: string;
    static weapons: Group[];
    static promises: Promise<GLTF>[];
    static loader: GLTFLoader;
    object: Object3D;
    box: Box3;
    boxIsSet: boolean;
    bound: Mesh<BoxGeometry, MeshBasicMaterial, import("three").Object3DEventMap>;
    constructor();
    setBox(box: Box3): void;
    updateBound(): void;
    update?(): void;
}
