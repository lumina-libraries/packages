import { Command } from "./Command";
import type { Euler, Object3D } from "three";
declare class SetRotationCommand extends Command {
    object: Object3D;
    newRotation: Euler;
    optionalOldRotation?: Euler;
    readonly type = "SetRotationCommand";
    updatable: boolean;
    constructor(object: Object3D, newRotation: Euler, optionalOldRotation?: Euler);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: SetRotationCommand): void;
}
export { SetRotationCommand };
