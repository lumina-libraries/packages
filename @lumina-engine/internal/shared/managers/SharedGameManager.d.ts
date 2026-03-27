import { SharedWorld } from "./SharedWorld";
import { Pathfinder } from "../core/Pathfinder";
import { BufferGeometry, EventDispatcher, Object3D, Mesh, LineSegments, Material, Texture, type Vector3Tuple } from "three";
import { SharedWeaponEntity } from "../objects/SharedWeaponEntity";
import { SharedEntity } from "../objects/SharedEntity";
import { SharedGrenade } from "../objects/SharedGrenade";
import { Player, type SpawnPoint, type PlayerInput } from "../core/Player";
import SourceObject from "../core/SourceObject";
import { SharedAmmoEntity } from "../objects/SharedAmmoEntity";
import WorldContainer from "../objects/WorldContainer";
import StoreAdapter, { type StoreAdapterConfigFile } from "../../editor/core/adapters/engine/StoreAdapter";
import * as Commands from "../../editor/commands/Commands";
import { Collider, EventQueue, RigidBody } from "@dimforge/rapier3d";
import type { PerformanceManager } from "../../client/managers/PerformanceManager";
import type { Directory } from "../../editor/infrastructure/filesystem";
import type { NearbyItemEntry } from "../network/packets";
export declare enum GameMode {
    FFA = 0,
    TDM = 1
}
export declare class CustomArray<K> extends Array<K> {
    readonly events: EventDispatcher<{
        add: {
            detail: K;
        };
        delete: {
            detail: K;
        };
        update: {};
        clear: {};
    }>;
    add(item: K): void;
    delete(item: K): void;
    remove(index: number): void;
    clear(): void;
    get(index: number): K;
    set(index: number, item: K): void;
}
export declare enum EliminationTrophy {
    Headshot = 0,
    FirstBlood = 1,
    MidAir = 2,
    MultiKill = 3,
    LongRange = 4,
    Comeback = 5,
    Revenge = 6
}
export declare enum EliminationType {
    Unknown = 0,
    Weapon = 1,
    Falldown = 2
}
export declare enum RevealReason {
    Unknown = 0,
    Shoot = 1,
    Step = 2,
    Seen = 3
}
export interface SharedGameManagerEventMap {
    elimination: {
        type: EliminationType;
        target: {
            id: string;
            username: string;
        };
        reason: {
            player: {
                id: string;
                username: string;
                weapon?: string;
            };
            damage: number;
            grenade?: boolean;
        };
        body: Set<string>;
        location?: string;
        trophies: Set<EliminationTrophy>;
    };
    start: {};
    end: {};
    time: {
        value: string;
    };
    clear: {};
    reveal: {
        value: boolean;
        reason: RevealReason;
        player: {
            value: Player;
            position: Vector3Tuple;
        };
    };
    world: {
        value: SharedWorld;
    };
}
export declare class SharedGameManager extends EventDispatcher<{
    GRENADE_EXPLODE: {
        source: SharedGrenade;
        hit: boolean;
    };
    REMOVE: {
        object: SharedEntity | SourceObject | SharedGrenade;
    };
    START: {};
    END: {};
    SET_MAP: {
        done?: boolean;
        config?: StoreAdapterConfigFile;
        init?: boolean;
    };
    READY: {};
    TIME_UPDATE: {
        time: string;
    };
    EXIT: {
        time: number;
    };
    update: {
        delta: number;
        time: number;
    };
    PLAYER_THROW_GRENADE: {
        source: SharedGrenade;
    };
    ADD_WEAPON_MESH: {
        entity: SharedWeaponEntity;
        index?: string;
        offset: number;
    };
    progress: {
        done?: boolean;
        progress?: number;
    };
    NETWORK_EXPLODE: {
        radius: number;
        hit: boolean;
        position: [number, number, number];
    };
    directory: {
        directory: Directory;
    };
    PAUSE: {};
    RESUME: {};
    playerInput: {
        player: Player;
        input: PlayerInput;
        time: number;
    };
    PLAYBACK_PLAYER_JOIN: {
        playerId: number;
        player: Player;
    };
    PLAYBACK_PLAYER_SPAWN: {
        playerId: number;
        player: Player;
        spawnData: SpawnPoint;
    };
} & SharedGameManagerEventMap> {
    store: StoreAdapter;
    performance?: PerformanceManager;
    state: "client" | "server";
    readonly id: string;
    static entities: {
        [SharedAmmoEntity.type]: typeof SharedAmmoEntity;
        [SharedWeaponEntity.type]: typeof SharedWeaponEntity;
    };
    static get WeaponEntity(): typeof SharedAmmoEntity | typeof SharedWeaponEntity;
    static get AmmoEntity(): typeof SharedAmmoEntity | typeof SharedWeaponEntity;
    static set WeaponEntity(entity: typeof SharedAmmoEntity | typeof SharedWeaponEntity);
    static set AmmoEntity(entity: typeof SharedAmmoEntity | typeof SharedWeaponEntity);
    scene?: Object3D;
    readonly entities: CustomArray<SharedEntity>;
    readonly grenades: CustomArray<SharedGrenade>;
    readonly objects: CustomArray<SourceObject>;
    readonly containers: CustomArray<WorldContainer>;
    private containerIdIncrement;
    readonly spawns: CustomArray<SpawnPoint>;
    pathfinder: Pathfinder;
    commands: typeof Commands;
    world: SharedWorld;
    drain: boolean;
    exited: boolean;
    constructor(store?: StoreAdapter, performance?: PerformanceManager);
    select(_object?: Object3D): void;
    object(_action: "add" | "remove", _object: Object3D, _parent?: boolean, _recursive?: boolean): void;
    findObjectByCollider(collider: Collider): SourceObject | null;
    getSpawnPoint(player: Player): SpawnPoint;
    registerContainer(container: WorldContainer): void;
    remove(object: SharedEntity | SourceObject | SharedGrenade): void;
    readonly players: CustomArray<Player>;
    mode: GameMode;
    reviveTimer: Map<Player, number>;
    duration: number;
    endDuration: number;
    timer: number;
    startedAt: number;
    endedAt: number;
    timeString: string;
    private _paused;
    get paused(): boolean;
    pause(): void;
    resume(): void;
    togglePause(): void;
    setTime(timeString: string): void;
    get started(): boolean;
    setMap?(src?: string): Promise<void>;
    start(delta?: number, time?: number): Promise<void>;
    end(): void;
    scripts(): void;
    time: number;
    processInput(player: Player, input: PlayerInput, time: number, animate?: boolean): void;
    updatePlayers(delta: number, time: number): void;
    updateObject(_detail: {
        object?: Object3D;
        material?: Material;
        geometry?: BufferGeometry;
        texture?: Texture;
    }): void;
    eventQueue: EventQueue;
    lastTimeLogged: number;
    updatePhysics(delta: number): void;
    getPlayer(id: number): Player;
    update(delta: number, time: number, steps?: number): Promise<void>;
    getParticleBodies(): Set<RigidBody>;
    getObjectColliders(): Set<Collider>;
    getParticleColliders(): Set<Collider>;
    getObstacleColliders(): Set<Collider>;
    getPlayerColliders(): Set<number>;
    updateStore(delta: number): void;
    debugObject?(object: SourceObject): void;
    playerScore(player: Player): [enemy: number, friendly: number];
    dispatchEntity(entity: SharedEntity): void;
    playerThrowGrenade(player: Player): void;
    setEntities: boolean;
    createSceneFromStore(): void;
    setScene(_object: Object3D, entities?: boolean): void;
    createWorldMesh(mesh: Mesh): void;
    /**
     * Create the spawn points for the game from the spawn point objects.
     */
    createSpawns(): void;
    initWorld(): Promise<void>;
    getPlayerNearbyItems(player: Player, list?: Array<NearbyItemEntry>): NearbyItemEntry[];
    /**
     * For testing: find an object named "Cube059" in the store and place a crate/chest there with items.
     */
    private createTestChestFromStore;
    debugMesh?: LineSegments;
    disposeDebug(): void;
    debug(): void;
    clear(): void;
    dispose(disposeStore?: boolean): void;
}
