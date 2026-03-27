import { Command } from "./Command";
import type { Object3D, Vector3 } from "three";
declare class SetScaleCommand extends Command {
    newScale: Vector3;
    optionalOldScale?: Vector3;
    readonly type = "SetScaleCommand";
    constructor(object: Object3D, newScale: Vector3, optionalOldScale?: Vector3);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: SetScaleCommand): void;
}
export { SetScaleCommand };
