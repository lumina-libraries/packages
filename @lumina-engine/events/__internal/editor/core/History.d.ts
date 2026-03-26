import type { Command } from "../commands/Command";
import type { Commands } from "../commands/Commands";
import { EventDispatcher } from "three";
import type { EditorContext } from "../commands/Command";
/** Event types dispatched by the History class */
interface HistoryEventMap {
    execute: {
        type: "execute";
        cmd: Commands;
    };
    update: {
        type: "update";
    };
}
/** Serialized history data structure */
interface SerializedHistory {
    undos: Array<Awaited<ReturnType<Command["toJSON"]>>>;
    redos: Array<Awaited<ReturnType<Command["toJSON"]>>>;
}
/**
 * History manager for undo/redo functionality in the editor.
 * Tracks command execution and allows reverting or re-applying changes.
 */
export declare class History extends EventDispatcher<HistoryEventMap> {
    editor: EditorContext;
    /** Stack of commands that can be undone */
    undos: Commands[];
    /** Stack of commands that can be redone */
    redos: Commands[];
    /** Timestamp of the last executed command */
    private lastCmdTime;
    /** Flag to temporarily disable undo/redo (e.g., during scene playback) */
    private historyDisabled;
    /** Map of command IDs to command instances for quick lookup */
    private commands;
    constructor(editor: EditorContext);
    /**
     * Execute a command and add it to the undo stack.
     * Handles command merging for rapid successive updates.
     *
     * @param cmd - The command to execute
     * @param optionalName - Override the command's name
     * @param save - Whether to save the command to history (default: true)
     */
    execute(cmd: Commands, optionalName?: string, save?: boolean): Promise<void>;
    /**
     * Undo the last executed command.
     * @returns The undone command, or undefined if no command to undo
     */
    undo(): Commands | undefined;
    /**
     * Redo the last undone command.
     * @returns The redone command, or undefined if no command to redo
     */
    redo(): Commands | undefined;
    /**
     * Serialize the history to JSON for persistence.
     * @returns The serialized history data
     */
    toJSON(): Promise<SerializedHistory>;
    /**
     * Restore history from serialized JSON data.
     *
     * @param json - The serialized history data
     * @param execute - Whether to execute the undo commands during restore (default: true)
     */
    fromJSON(json: SerializedHistory | undefined, execute?: boolean): void;
    /**
     * Clear all history (both undo and redo stacks).
     */
    clear(): void;
    /**
     * Enable or disable undo/redo functionality.
     * @param disabled - Whether to disable history
     */
    setDisabled(disabled: boolean): void;
    /**
     * Check if undo/redo is currently disabled.
     */
    isDisabled(): boolean;
    /**
     * Get the number of commands in the undo stack.
     */
    get undoCount(): number;
    /**
     * Get the number of commands in the redo stack.
     */
    get redoCount(): number;
    /**
     * Check if there are any commands to undo.
     */
    canUndo(): boolean;
    /**
     * Check if there are any commands to redo.
     */
    canRedo(): boolean;
}
export {};
