import type { AnimationClip } from "three";
import { Command } from "./Command";
declare class SetAnimationValueCommand extends Command {
    animation: AnimationClip;
    attributeName: string;
    newValue: Command["newValue"];
    readonly type = "SetAnimationValueCommand";
    updatable: boolean;
    constructor(animation: AnimationClip, attributeName: string, newValue: Command["newValue"]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetAnimationValueCommand): void;
}
declare class RenameAnimationCommand extends SetAnimationValueCommand {
    constructor(animation: AnimationClip, newValue: string);
    init(): Promise<void>;
}
export { SetAnimationValueCommand, RenameAnimationCommand };
