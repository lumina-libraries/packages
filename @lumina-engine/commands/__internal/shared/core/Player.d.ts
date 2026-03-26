import { type KeybindTrigger, type KeybindValue } from "../../sandbox/shared";
import { Object3D, Raycaster, Vector3, type Vector3Like } from "three";
import SourceObject from "./SourceObject";
import { MovementValue, PlayerMovement } from "./PlayerMovement";
import { PlayerInventoryManager } from "../inventory/InventoryAdapter";
import { Loadout } from "../sources/Loadout";
import { WeaponSource } from "../sources/WeaponSource";
import type { SharedGameManager } from "../managers/SharedGameManager";
import type { SharedCharacterControllerManager } from "../managers/SharedCharacterControllerManager";
import SharedPlayerWeaponRecoil from "./SharedPlayerWeaponRecoil";
import CameraSway from "./CameraSway";
import type { SharedSkeletonManagerBox } from "../managers/SharedSkeletonManager";
import type { SharedGrenade } from "../objects/SharedGrenade";
import { Ray, RayColliderIntersection, type World } from "@dimforge/rapier3d";
import type { InventorySlotData, NearbyItemEntry, NearbyContainerEntry } from "../network/packets";
export type PlayerInput = [
    delta: number,
    pitch: number,
    yaw: number,
    commands: number,
    isn?: number,
    time?: number
];
export interface PlayerCommands {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    jump: boolean;
    sprint: boolean;
    shoot: boolean;
    action: boolean;
    crouch: boolean;
}
export interface PlayerPhysicsOptions {
    acceleration: number;
    speed: number;
    sprint: number;
    jump: number;
    ground: number;
    airControl: number;
    air: number;
    airResistance: number;
    frictionTime: number;
    energy: {
        max: number;
        regenerationRate: number;
        jumpCost: number;
        slideCost: number;
        sprintCostPerSecond: number;
        regenerationDelay: number;
        emptyRegenerationDelay: number;
    };
    slide: {
        cooldown: number;
    };
    health: {
        regenerationRate: number;
        regenerationDelay: number;
        lowHealthThreshold: number;
        lowHealthMultiplier: number;
    };
}
export interface PlayerOptions {
    autojump: boolean;
    physics: PlayerPhysicsOptions;
    character?: {
        maxSlopeClimbAngle: number;
        minSlopeSlideAngle: number;
        slideEnabled: boolean;
        autostep: {
            enabled: boolean;
            maxHeight: number;
            minWidth: number;
            includeDynamicBodies: boolean;
        };
        snapToGround: {
            enabled: boolean;
            distance: number;
        };
        offset: number;
    };
    world?: World;
}
export type SpawnPoint = [x: number, y: number, z: number, team: number];
export declare enum RewardType {
    Elimination = "Elimination",
    FirstKill = "First Kill",
    Headshot = "Headshot",
    MidAirKill = "Mid-air Kill",
    Multikill = "Multikill",
    LongRangeKill = "Long Range Kill",
    Comeback = "Comeback Kill",
    RevengeKill = "Revenge Kill",
    Assist = "Assist",
    MeleeKill = "Melee Kill"
}
export interface DamageRecord {
    damage: number;
    time: number;
    bodyPart?: string[];
    weapon?: WeaponSource;
    position: [number, number, number];
    pitch: number;
    yaw: number;
}
export interface RewardRecord {
    score: number;
    time: number;
    bodyPart?: string[];
    reward: RewardType;
    position: [number, number, number];
    pitch: number;
    yaw: number;
}
export interface KillRecord {
    player: Player;
    time: number;
    position: [number, number, number];
    pitch: number;
    yaw: number;
    headshot?: boolean;
    weapon?: WeaponSource;
    damage?: number;
    bodyParts?: string[];
}
export interface DeathRecord {
    time: number;
    killer?: Player;
    position: [number, number, number];
    pitch: number;
    yaw: number;
    headshot?: boolean;
    weapon?: WeaponSource;
    damage?: number;
    bodyParts?: string[];
}
export interface AssistRecord {
    player: Player;
    time: number;
    damage: number;
    position: [number, number, number];
    pitch: number;
    yaw: number;
}
export declare enum PlayerVisibility {
    None = 0,
    Visible = 1
}
export type PlayerTimelineEntry = {
    time: number;
    kills: KillRecord[];
    deaths: DeathRecord[];
    assists: AssistRecord[];
    rewards: Map<RewardType, RewardRecord[]>;
};
export declare class PlayerCamera extends Object3D {
    fov: number;
    userData: {
        fov: number;
    };
}
export default class PlayerWeapon {
    readonly player: Player;
    id?: string;
    readonly last: {
        shot: number;
        reload: number;
    };
    source?: WeaponSource;
    time: number;
    /**
     * Whether a weapon switch (stow/deploy) is currently in progress
     */
    isSwitching: boolean;
    private switchTimeouts;
    get canShoot(): boolean;
    constructor(player: Player);
    setSource(source: WeaponSource): void;
    set(source?: string | WeaponSource): void;
    clear(): void;
    add(source: string | WeaponSource): void;
    /**
     * Begin stow/deploy sequence and switch to the provided weapon when stow completes.
     */
    private beginSwitch;
    shoot(time: number): void;
    timePerReload: number;
    isReloading: boolean;
    private reloadStartTime;
    reload(time: number): void;
    swingIndex: number;
    swingTime: number;
    holdTime: number;
    heavyTime: number;
    thrustTime: number;
    thrustDuration: number;
    private swingDuration;
    private heavyDuration;
    get isSwinging(): boolean;
    get isHoldingStart(): boolean;
    get isHoldingStandby(): boolean;
    get isHeavySwinging(): boolean;
    get isThrusting(): boolean;
    update(time: number): void;
}
export declare class Player extends SourceObject<{
    revive: {};
    grenade: {};
    jump: {};
    aim: {
        value: boolean;
    };
    EXPLODE: {
        grenade: SharedGrenade;
    };
    PLAYER_THROW_GRENADE: {
        source: SharedGrenade;
    };
    REVIVE_TIME: {
        seconds: number;
        ms: number;
    };
    KILL_PLAYER: {
        player: Player;
        rewards: [string, number][];
        headshot: boolean;
        time: number;
    };
    step: {};
    died: {
        detail: {
            reason: {
                killer?: Player | undefined;
                fallDamage?: boolean | undefined;
                headshot?: boolean | undefined;
            };
            rewards: [string, number][];
        };
    };
    weapon: {};
    reload: {};
    shoot: {};
    "weapon-stow-start": {
        id?: string;
        duration: number;
    };
    "weapon-stow-end": {
        id?: string;
    };
    "weapon-deploy-start": {
        id?: string;
        duration: number;
    };
    "weapon-deploy-end": {
        id?: string;
    };
    HIT_PLAYER: {
        player: Player;
        damage: number;
        weapon?: WeaponSource;
        box?: SharedSkeletonManagerBox;
    };
    DEAD_BY_PLAYER: {
        player: Player;
        weapon?: WeaponSource;
    };
    SHOT_BY_PLAYER: {
        player: Player;
        weapon?: WeaponSource;
        damage: number;
    };
    BULLET_WIZZ: {
        player: Player;
        hit: boolean;
    };
    ASSIST_PLAYER: {
        player: Player;
        damage: number;
        score: number;
        time: number;
    };
    spawn: {
        spawn: SpawnPoint;
    };
    "reload-end": {};
    "reload-start": {};
    "slide-start": {};
    "slide-end": {};
    "crouch": {
        value: boolean;
    };
    "init": {};
    "melee-swing-start": {
        index: number;
    };
    "melee-swing-end": {
        index: number;
    };
    update: {};
}> {
    #private;
    id: number;
    sandboxActive: boolean;
    username: string;
    isAI: boolean;
    options: PlayerOptions;
    keybind: Map<KeybindTrigger, KeybindValue>;
    readonly weapon: PlayerWeapon;
    readonly invintory: PlayerInventoryManager;
    readonly loadout: Loadout;
    readonly camera: PlayerCamera;
    readonly direction: Vector3;
    readonly recoil: SharedPlayerWeaponRecoil;
    readonly cameraSway: CameraSway;
    readonly commands: PlayerMovement;
    /**
     * The rapier physics ray.
     */
    readonly ray: Ray;
    /**
     * The three.js raycaster.
     */
    readonly raycaster: Raycaster;
    /**
     * The current inputss
     */
    inputs: PlayerInput[];
    /**
     * Input Sequence Number
     * Internal non-stable identifier for input tracking
     * Associated with the inputs array
     */
    isn: number;
    /**
     * The current frame's camera raycast result
     */
    cast: RayColliderIntersection | null;
    /**
     * The player's pitch
     */
    pitch: number;
    /**
     * The player's yaw
     */
    yaw: number;
    /**
     * Pitch target for interpolation
     */
    pitchTarget: number | null;
    /**
     * Yaw target for interpolation
     */
    yawTarget: number | null;
    /**
     * The lerp duration speed for the pitch and yaw to reach the `this.pitchTarget` and `this.yawTarget`
     */
    directionTargetSpeed: number;
    /**
     * Whether the player has spawned
     */
    spawned: boolean;
    sandbox: boolean;
    /**
     * Whether the player requested movement
     */
    get moving(): boolean;
    get canJump(): boolean;
    /**
     * The player's team
     */
    team: number;
    nearbyItems: NearbyItemEntry[];
    nearbyContainers: NearbyContainerEntry[];
    inventoryState: InventorySlotData[];
    containerItems: Map<number, InventorySlotData[]>;
    /**
     * Groups kill/death records by exact time and merges them into a timeline.
     * Returns entries sorted by ascending time.
     */
    getRecordTimeline(kills?: KillRecord[], deaths?: DeathRecord[], assists?: AssistRecord[], rewards?: Map<RewardType, RewardRecord[]>): PlayerTimelineEntry[];
    /**
     * Do damage from a weapon
     * @param weapon - The weapon that did the damage
     * @param parts - The parts of the player that were hit
     * @param time - Current game time (for health regeneration delay)
     * @returns The damage done
     */
    damageFromWeapon(weapon: PlayerWeapon, parts: string[], time?: number): number;
    canSeePlayer(player: Player): PlayerVisibility;
    private getBoxCorners;
    private canSeeCorner;
    private isCornerObstructed;
    shotByPlayer(player: Player, time: number): void;
    restockAmmo(): void;
    spawn(spawns?: SpawnPoint[], spawn?: SpawnPoint): SpawnPoint;
    character?: SharedCharacterControllerManager;
    legacy: boolean;
    create(): void;
    applyCharacterControllerOptions(): void;
    constructor(game: SharedGameManager, options?: PlayerOptions, id?: number);
    /**
     * Movement velocity threshold for the steps logic to trigger
     */
    stepThreshold: number;
    /**
     * How often the player takes a step
     */
    stepTime: number;
    /**
     * The last time the player took a step
     */
    lastStep: number;
    /**
     * How often the player can drop an item
     */
    dropTime: number;
    /**
     * The last time the player dropped an item
     */
    lastDrop: number;
    /**
     * How often the player can throw a grenade
     */
    grenadeTime: number;
    /**
     * The last time the player threw a grenade
     */
    lastGrenade: number;
    /**
     * The last time the player finished a slide
     */
    lastSlideEnd: number;
    /**
     * The player's health
     */
    health: number;
    /**
     * The player's max health
     */
    maxHealth: number;
    /**
     * The player's current energy
     */
    energy: number;
    /**
     * The last time energy was used (for regeneration delay)
     */
    lastEnergyUse: number;
    /**
     * Whether energy hit 0 during the last depletion
     */
    energyWasEmpty: boolean;
    /**
     * The last time the player took damage (for health regeneration delay)
     */
    lastDamageTaken: number;
    /**
     * The player's score
     */
    score: number;
    /**
     * The player's kills with detailed information
     */
    kills: KillRecord[];
    /**
     * The player's deaths with detailed information
     */
    deaths: DeathRecord[];
    /**
     * The player's assists with detailed information
     */
    assists: AssistRecord[];
    /**
     * Damage dealt to other players
     */
    damageDealt: Map<Player, DamageRecord[]>;
    /**
     * Damage taken from other players
     */
    damageTaken: Map<Player, DamageRecord[]>;
    /**
     * Rewards earned by this player
     */
    rewards: Map<RewardType, RewardRecord[]>;
    /**
     * Time window for assist eligibility (in milliseconds)
     */
    assistTimeWindow: number;
    /**
     * The player's intersecting players
     */
    intersectingPlayers: Map<Player, Vector3>;
    /**
     * Whether the player is dead
     */
    get dead(): boolean;
    set dead(value: boolean);
    /**
     * Whether the player is sliding
     */
    isSliding: boolean;
    /**
     * When the slide started
     */
    slideStartTime: number;
    /**
     * Slide duration in milliseconds
     */
    slideDuration: number;
    /**
     * Initial slide velocity multiplier
     */
    slideSpeedMultiplier: number;
    /**
     * Slide direction vector
     */
    slideDirection: Vector3;
    /**
     * Slide momentum decay rate
     */
    slideDecayRate: number;
    /**
     * Whether the player can jump based on energy
     */
    get canJumpWithEnergy(): boolean;
    /**
     * Whether the player can slide based on energy
     */
    get canSlideWithEnergy(): boolean;
    /**
     * Whether the player can slide based on cooldown
     */
    get canSlideWithCooldown(): boolean;
    /**
     * Consume energy and update regeneration delay tracking
     * @param amount Amount of energy to consume
     * @param time Current game time
     */
    private consumeEnergy;
    /**
     * Whether the player is sprinting
     */
    get sprinting(): boolean;
    wasSprinting: boolean;
    get shooting(): boolean;
    get aiming(): boolean;
    /**
     * When the ads state changes
     * Used in the PlayerManager to lerp the camera FOV
     */
    adsStart: number;
    adsEnd: number;
    lmb: MovementValue;
    rmb: MovementValue;
    /** The last time the right or left mouse was changed */
    rmbTime: number;
    lmbTime: number;
    init(): void;
    /**
     * This method will be called for assigning stuff, rn it's just a placeholder.
     */
    private set;
    step(time: number): void;
    /**
     * Drop the current item being held
     * @param time
     */
    drop(time: number): void;
    /**
     * Throw a grenade
     * @param time
     */
    grenade(time: number): void;
    /**
     * Initiate sliding when sprinting and crouching
     * @param time
     */
    startSlide(time: number): void;
    /**
     * Stop sliding
     */
    stopSlide(): void;
    private getAppliedFriction;
    /**
     * Update sliding movement physics
     * @param deltaTime
     * @param time
     */
    private updateSlideMovement;
    /**
     * Handle character controller physics movement
     */
    private handleCharacterControllerMovement;
    /**
     * Revive the player
     */
    revive(): void;
    /**
     * Kill this player
     * And apply rewards to the killer and assists
     * @param options
     * @param time
     */
    kill(options: {
        killer?: Player;
        fallDamage?: boolean;
        headshot?: boolean;
        damage?: number;
        weapon?: WeaponSource;
        bodyParts?: string[];
    }, time: number): void;
    /**
     * Record damage dealt by one player to another
     */
    private static recordDamageDealt;
    /**
     * Record damage taken by one player from another
     */
    private static recordDamageTaken;
    /**
     * Add a reward to a player's reward tracking
     */
    private addReward;
    /**
     * Process assists for players who damaged the victim recently
     */
    private processAssists;
    updateCast(): RayColliderIntersection;
    /**
     * Apply movement, gravity, friction, etc.
     * @param deltaTime
     * @param time
     */
    private updateMovement;
    update(delta: number, time: number, players?: Player[]): void;
    /**
     * Get total damage dealt to a specific player
     */
    getTotalDamageDealtTo(player: Player): number;
    /**
     * Get total damage taken from a specific player
     */
    getTotalDamageTakenFrom(player: Player): number;
    /**
     * Get total damage dealt to all players
     */
    getTotalDamageDealt(): number;
    /**
     * Get total damage taken from all players
     */
    getTotalDamageTaken(): number;
    /**
     * Get total score from rewards of a specific type
     */
    getScoreFromRewardType(rewardType: RewardType): number;
    /**
     * Get count of rewards of a specific type
     */
    getRewardCount(rewardType: RewardType): number;
    /**
     * Get kill/death ratio
     */
    getKDRatio(): number;
    /**
     * Get damage per kill ratio
     */
    getDamagePerKill(): number;
    stop(): void;
    static getXDir(p1: Vector3, p2: Vector3): number;
    static getYDir(p1: Vector3, p2: Vector3): number;
    static dummy: Object3D;
    interpolateDirection(deltaTime: number): void;
    look(target: Vector3Like, options?: {
        interpolate?: boolean;
        speed?: number;
    }): void;
}
