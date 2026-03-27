import { Command } from "./Command";
import type { Object3D, Vector3 } from "three";
declare class SetPositionCommand extends Command {
    object: Object3D;
    newPosition: Vector3;
    optionalOldPosition?: Vector3;
    readonly type = "SetPositionCommand";
    updatable: boolean;
    constructor(object: Object3D, newPosition: Vector3, optionalOldPosition?: Vector3);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(command: SetPositionCommand): void;
    fromJSON(json: any): Promise<void>;
}
export { SetPositionCommand };
