export enum LogFlag {
  Info,
  Warning,
  Error,
}

export interface DevlogOptions {
  id?: string;
  content: unknown[];
  flags?: LogFlag[];
  date?: Date;
  progress?: number | null;
  [key: string]: unknown;
}

export declare class DevlogEvent extends CustomEvent<DevlogOptions> {
  static type: string;
  static contents: DevlogOptions["content"][];
  static list: DevlogOptions[];
  static flags: typeof LogFlag;
  static dispatch(options: DevlogOptions): void;
  constructor(options: DevlogOptions);
}
