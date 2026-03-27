import { Color, Material } from "three";
import { Command } from "./Command";
declare class SetMaterialColorCommand extends Command {
    material: Material;
    attributeName: string;
    newColor: Color;
    readonly type = "SetMaterialColorCommand";
    updatable: boolean;
    oldColor: Color;
    constructor(material: Material, attributeName: string, newColor: Color);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetMaterialColorCommand): void;
}
export { SetMaterialColorCommand };
