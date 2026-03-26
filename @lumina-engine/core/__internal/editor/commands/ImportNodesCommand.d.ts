import { Command } from "./Command";
export declare class ImportNodesCommand extends Command {
    newValue: string;
    readonly type = "ImportNodesCommand";
    oldValue: string | null;
    constructor(newValue: string);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: ImportNodesCommand): void;
}
