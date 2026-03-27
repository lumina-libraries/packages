import SourceObject from "../core/SourceObject";
import type { SharedGameManager } from "../managers/SharedGameManager";
import type { Player } from "../core/Player";
import { PlayerInventoryManager } from "../inventory/InventoryAdapter";
export declare enum ContainerTypeClass {
    CRATE = "crate",
    LOCKER = "locker",
    CHEST = "chest"
}
/**
 * A world container (crate/locker/chest) that owns an inventory container of DefaultSource items.
 * Exposes an interaction radius to appear in players' nearby list when close.
 */
export default class WorldContainer extends SourceObject {
    readonly inventory: PlayerInventoryManager;
    readonly containerType: ContainerTypeClass;
    interactionRadius: number;
    networkId: number;
    name: string;
    private _center;
    constructor(game: SharedGameManager, type: ContainerTypeClass, capacity?: number, name?: string);
    /** Returns true if the player is within interaction radius. */
    isPlayerInRange(player: Player): boolean;
    distanceTo(player: Player): number;
    getSnapshot(): [id: string, name: string, type: any, icon?: string][];
    getOccupiedCount(): number;
    dispose(): void;
}
