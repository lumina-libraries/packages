import { Camera, Object3D, Vector3, EventDispatcher } from "three";
import { TransformControls } from "../../../../shared/addons/jsm/controls/TransformControls";
export declare class TransformAdapter extends TransformControls {
    scene: Object3D;
    selectedObjects: Object3D[];
    objectPositions: Vector3[];
    objectMatrices: Array<any>;
    dispatcher: EventDispatcher;
    changed: boolean;
    setDomElement(value: any): void;
    constructor(scene: Object3D, camera: Camera, domElement?: HTMLElement);
    select(objects: Object3D[] | Object3D): void;
    deselect(object: Object3D): void;
    updateMatrixWorld(force?: boolean): void;
    onTransformStart(event: any): void;
    onTransformChange(event: any): void;
    onTransformEnd(event: any): void;
    dispose(): void;
}
