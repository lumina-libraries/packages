import { Command } from "./Command";
declare class SetProjectNameCommand extends Command {
    newValue: string;
    readonly type = "SetProjectNameCommand";
    static readonly MAX_NAME_LENGTH = 50;
    constructor(newValue: string);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetProjectNameCommand): void;
}
declare class SetProjectDescriptionCommand extends Command {
    newValue: string;
    readonly type = "SetProjectDescriptionCommand";
    static readonly MAX_DESCRIPTION_LENGTH = 300;
    constructor(newValue: string);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetProjectNameCommand): void;
}
export { SetProjectNameCommand, SetProjectDescriptionCommand };
