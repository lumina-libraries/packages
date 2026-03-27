import { CustomObject3D } from "./CustomObject3D";
import { AIPlayer } from "../../shared/core/AIPlayer";
import type StoreAdapter from "../core/adapters/engine/StoreAdapter";
export declare const AIEntityObjectIcon: Required<CustomObject3D>["icon"];
export declare class AIEntityObject extends CustomObject3D {
    static type: string;
    readonly type: string;
    readonly icon: [name: string, color?: string];
    aiPlayer: AIPlayer | null;
    constructor();
    init(store?: StoreAdapter): void;
    update(delta: number): void;
    create(): void;
    dispose(): void;
}
