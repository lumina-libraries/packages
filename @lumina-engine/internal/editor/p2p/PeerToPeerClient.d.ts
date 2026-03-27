import { EventEmitter } from "events";
import type { Command } from "../commands/Command";
export declare class PeerToPeerClient extends EventEmitter {
    private ws;
    username: string;
    session: string;
    isHost: boolean;
    url: `ws://${string}:8080` | `wss://${string}:8080`;
    constructor();
    connect(url?: string): Promise<unknown>;
    postMessage(type: string, payload: any): void;
    auth(token?: string): void;
    createSession(): void;
    request(session?: string): void;
    acceptRequest(user: string): void;
    rejectRequest(user: string): void;
    leaveSession(): void;
    command(command: Command, receiver: string): void;
    close(): void;
    get online(): boolean;
}
