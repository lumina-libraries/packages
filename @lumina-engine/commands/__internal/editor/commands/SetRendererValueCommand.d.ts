import { Command } from "./Command";
declare class SetRendererValueCommand extends Command {
    attributeName: string;
    newValue: string;
    readonly type = "SetRendererValueCommand";
    get webgl(): unknown;
    constructor(attributeName: string, newValue: string);
    init(): Promise<void>;
    execute(): void;
    undo(): void;
    update(cmd: SetRendererValueCommand): void;
}
export { SetRendererValueCommand };
