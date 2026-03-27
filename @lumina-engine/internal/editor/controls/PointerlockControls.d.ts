import { Camera, EventDispatcher } from "three";
import { ControllerManager } from "../../client/managers/ControllerManager";
import { PlayerMovement } from "../../shared/core/PlayerMovement";
export declare class PointerLockControls extends EventDispatcher<{
    change: {};
}> {
    camera: Camera;
    domElement?: HTMLElement;
    commands: PlayerMovement;
    controller: ControllerManager;
    constructor(camera: Camera, domElement?: HTMLElement);
    set enabled(value: boolean);
    get enabled(): boolean;
    update(): void;
    sync(): void;
}
