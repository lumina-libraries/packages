import { Color, Object3D } from "three";
import { Command } from "./Command";
declare class SetColorCommand extends Command {
    object: Object3D;
    attributeName: string;
    newColor: Color;
    type: string;
    oldColor: Color;
    constructor(object: Object3D, attributeName: string, newColor: Color);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetColorCommand): void;
}
export { SetColorCommand };
