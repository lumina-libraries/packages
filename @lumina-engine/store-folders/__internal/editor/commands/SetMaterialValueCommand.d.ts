import type { Material, Mesh } from "three";
import { Command } from "./Command";
declare class SetMaterialValueCommand extends Command {
    material: Material;
    attributeName: string;
    newValue: Command["newValue"];
    type: string;
    updatable: boolean;
    owners: Mesh[];
    constructor(material: Material, attributeName: string, newValue: Command["newValue"]);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetMaterialValueCommand): void;
}
declare class MaterialRenameCommand extends SetMaterialValueCommand {
    readonly type = "MaterialRenameCommand";
    constructor(material: Material, newName: string);
    init(): Promise<void>;
}
export { SetMaterialValueCommand, MaterialRenameCommand };
