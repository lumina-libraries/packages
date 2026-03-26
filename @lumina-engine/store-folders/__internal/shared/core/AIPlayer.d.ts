import { type Vector3Like } from "three";
import { Player } from "./Player";
import { type SharedGameManager } from "../managers/SharedGameManager";
import { Blackboard, AIMode } from "./ai/Blackboard";
import { type AIConfig } from "./ai/AIConfig";
export declare class AIPlayer extends Player {
    blackboard: Blackboard;
    private utilitySelector;
    private perceptionSystem;
    private pathFollower;
    private modeExecutor;
    config: AIConfig;
    private lastUtilityUpdate;
    debugEnabled: boolean;
    constructor(game: SharedGameManager);
    private setupEventListeners;
    setMode(mode: AIMode, time?: number): void;
    /**
     * When the player spawns in the map.
     * When the game starts, or after reviving.
     */
    private onSpawn;
    private initializePatrolRoute;
    private getNavigationObject;
    /**
     * This method is called every frame with the list of players in the game.
     * @param players
     * @param time
     */
    processPlayers(players: Player[] | Player, time: number): void;
    /**
     * This method is called every frame with the delta and time after the processPlayers method.
     * @param delta
     * @param time
     */
    processTarget(delta: number, time: number): void;
    /**
     * Enable or disable debug output for this AI
     */
    setDebugEnabled(enabled: boolean): void;
    /**
     * Get current AI state for debugging
     */
    getDebugInfo(): {
        mode: AIMode;
        target: number;
        targetVisible: boolean;
        targetDistance: number;
        ammoRatio: number;
        utilityScores: {
            [k: string]: number;
        };
        navigation: {
            hasPath: boolean;
            waypointIndex: number;
            stuckCounter: number;
        };
        debug: {
            lastDecision: string;
            lastPathResult: string;
            perceptionUpdateTime: number;
            utilityUpdateTime: number;
        };
    };
    /**
     * Update AI configuration
     */
    updateConfig(partialConfig: Partial<AIConfig>): void;
    /**
     * Set custom patrol waypoints
     */
    setPatrolWaypoints(waypoints: Vector3Like[]): void;
    /**
     * Update patrol waypoints dynamically based on position
     */
    private updatePatrolWaypoints;
    /**
     * Check if waypoints should be updated
     */
    private shouldUpdateWaypoints;
    /**
     * Get the center point of waypoints
     */
    private getWaypointCenter;
}
