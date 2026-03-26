import SourceObject from "../core/SourceObject";
import type { Player } from "../core/Player";
import type { SharedGameManager } from "../managers/SharedGameManager";
export declare class SharedGrenade extends SourceObject<{
    explode: {};
}> {
    mass: number;
    /** The damage distance of the grenade when it explodes */
    radius: number;
    private timeout;
    constructor(game: SharedGameManager);
    dispose(): void;
    throwFromPlayer(force: number, player: Player): void;
}
