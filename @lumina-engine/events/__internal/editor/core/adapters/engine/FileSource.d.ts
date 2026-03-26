import type { Directory } from "../../../fs";
type FileSourceData = globalThis.File | Blob | ArrayBuffer;
export declare class FileSource<T extends FileSourceData = FileSourceData> {
    data?: T;
    directory?: Directory;
    name: string;
    get uuid(): string;
    type: string;
    constructor(data?: T, directory?: Directory, name?: string);
    write(): Promise<void>;
    promiseRead?: Promise<T>;
    read(): Promise<T>;
    delete(): Promise<void>;
    getURL(): Promise<string>;
    dispose(): void;
}
export {};
