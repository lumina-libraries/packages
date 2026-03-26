import type { Vector3Like } from "three";
import type { Player } from "../Player";
export declare enum AIMode {
    Patrol = "patrol",
    Attack = "attack",
    Chase = "chase",
    Reload = "reload",
    SeekCover = "seekCover",
    Investigate = "investigate",
    Cursor = "cursor"
}
export interface TargetInfo {
    player: Player | null;
    lastPosition: Vector3Like | null;
    lastSeenTime: number;
    isVisible: boolean;
    distance: number;
}
export interface CombatState {
    burstShotsRemaining: number;
    nextBurstTime: number;
    isReloading: boolean;
    ammoRatio: number;
    lastShotTime: number;
}
export interface NavigationState {
    path: Vector3Like[];
    currentWaypointIndex: number;
    lastPathRequestTime: number;
    lastStuckCheckTime: number;
    lastStuckPosition: Vector3Like | null;
    stuckCounter: number;
    destination: Vector3Like | null;
}
export interface PatrolState {
    waypoints: Vector3Like[];
    currentPatrolIndex: number;
    waitUntilTime: number;
    waitStartTime: number;
    waiting: boolean;
    scanSeed: number;
    lastStuckPatrolIndex?: number;
    lastWaypointRefreshTime: number;
}
export declare class Blackboard {
    currentMode: AIMode;
    previousMode: AIMode;
    modeChangeTime: number;
    target: TargetInfo;
    combat: CombatState;
    navigation: NavigationState;
    patrol: PatrolState;
    utilityScores: Map<AIMode, number>;
    debugInfo: {
        lastDecision: string;
        lastPathResult: string;
        perceptionUpdateTime: number;
        utilityUpdateTime: number;
    };
    setMode(mode: AIMode, time: number): void;
    clearTarget(): void;
    updateTarget(player: Player | null, position: Vector3Like | null, time: number, isVisible: boolean, distance: number): void;
    getTimeSinceLastSeen(currentTime: number): number;
    isTargetMemoryFresh(currentTime: number, memoryDuration?: number): boolean;
}
