import { Messanger } from "../../shared/core/Messanger";
import type { Worker as Thread } from "worker_threads";
import type StoreAdapter from "../../../editor/core/adapters/engine/StoreAdapter";
export declare class MainWorker {
    id: string;
    readonly worker: Thread | Worker;
    readonly store: StoreAdapter;
    static workers: Record<string, MainWorker>;
    promise: Promise<void>;
    queue: Array<unknown>;
    constructor(id: string, worker: Thread | Worker, store: StoreAdapter);
    messanger: Messanger;
    started: boolean;
    start(): void;
    eval(scriptObject: string, parentObject: string, code: string, state: "client" | "server", promises?: Array<Promise<unknown>>): Promise<any>;
    close(): Promise<void>;
    static create(uuid: string, worker: Thread | Worker, store: StoreAdapter): MainWorker;
    private updateFrame;
}
