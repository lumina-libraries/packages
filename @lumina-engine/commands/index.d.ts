import type { Object3D } from "three";

export type KnownCommandType = "ArrayCommand" | "AddObjectCommand" | "RemoveObjectCommand";
export type CommandType = KnownCommandType | (string & {});

export interface Command {
  type: CommandType;
  name?: string;
  object?: Object3D | null;
  userData?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface ArrayCommand extends Command {
  type: "ArrayCommand";
  list: Array<Command | ArrayCommand>;
}

export type Commands = Command | ArrayCommand;
