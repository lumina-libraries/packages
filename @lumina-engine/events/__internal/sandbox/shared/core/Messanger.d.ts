import type { Frame } from "./Frame";
import type { PlayerState } from "../../types";
import type StoreAdapter from "../../../editor/core/adapters/engine/StoreAdapter";
export declare class Messanger extends EventTarget {
    source: {
        postMessage: (message: any) => void;
        addEventListener: (type: string, listener: (event: MessageEvent) => void) => void;
    };
    functions: Record<string, (...payload: any[]) => Promise<any>>;
    store: StoreAdapter;
    readonly uuid?: string;
    private resolve;
    promise: Promise<void>;
    constructor(source: {
        postMessage: (message: any) => void;
        addEventListener: (type: string, listener: (event: MessageEvent) => void) => void;
    }, functions: Record<string, (...payload: any[]) => Promise<any>>, store: StoreAdapter, uuid?: string);
    private increment;
    private readonly callbacks;
    lib: Record<string, (...payload: any[]) => Promise<any>>;
    send(...payload: any[]): Promise<unknown>;
    listening: boolean;
    componentOptionsIncrement: number;
    componentOptions: Record<string, (value: any) => void>;
    components: Record<number, (value: any) => void>;
    componentIncrement: number;
    registerComponentOption(group: number, name: string, type: string, callback: (value: any) => void): number;
    registerComponent(name: string, callback: (value: any) => void): number;
    updateComponentOption(group: number, id: number, value: any): Promise<void>;
    updatePlayer(player: PlayerState): Promise<any>;
    updatePlayers(players: PlayerState[]): Promise<any>;
    removePlayer(id: number): Promise<any>;
    listen(): void;
    postFrame(frame: Frame): void;
    update(time: number, delta: number): void;
    setup(): void;
}
