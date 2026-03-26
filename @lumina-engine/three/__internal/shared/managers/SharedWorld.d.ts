import { Player } from '../core/Player';
import { type RigidBody, DebugRenderBuffers, World } from "@dimforge/rapier3d";
export type SharedWorldState = [
    /**
     * Bodies sleeping
     * [handle, sleeping]
     */
    bs: [number, boolean][],
    /**
     * Bodies enabled
     * [handle, enabled]
     */
    be: [number, boolean][],
    /**
     * Colliders enabled
     * [handle, enabled]
     */
    ce: [number, boolean][]
];
/**
 * This class provides the ability to update the player's physics without updating the world or vice versa
 * If player is provided, it will disable all other colliders and set all other bodies to sleep leaving only the player's body awake and colliders enabled, update the world, then set everything back to the way it was
 */
export declare class SharedWorld extends World {
    /**
     * Get the current state of the world's bodies and colliders (enabled, sleeping)
     * @returns The state of the world
     */
    getState(): SharedWorldState;
    /**
     * Restore the world to the state it was in when getState was called
     * @param state - The state to restore the world to
     */
    restore(state: SharedWorldState): void;
    /**
     * Disable the player's body and collider
     * @param player - The player to disable
     */
    disablePlayer(player: Player): void;
    /**
     * Disable the bodies and colliders of all players except the current player
     * @param players - The players to disable
     * @param current - The current player
     */
    disablePlayers(players: Player[], current?: Player): void;
    /**
     * Sleep all bodies except the current player's body
     * @param bodies - The bodies to sleep
     * @param current - The current player
     */
    sleep(bodies: RigidBody[], current?: Player): void;
    /**
     * Return state1 but only the the colliders and bodies that are different from state2
     * @param state1
     * @param state2
     */
    getDiff(state1: SharedWorldState, state2: SharedWorldState): SharedWorldState;
    /**
     * Update the world
     * @param deltaTime - The time since the last update
     * @param player - The player to update
     * @param players - The players to update
     * @param scene - Whether this is full world update
     * @param disable - The bodies to disable
     */
    update(deltaTime: number, player?: Player, players?: Player[], scene?: boolean, disable?: RigidBody[]): void;
    /**
     * Computes all the lines (and their colors) needed to render the scene.
     */
    debugRender(): DebugRenderBuffers;
}
