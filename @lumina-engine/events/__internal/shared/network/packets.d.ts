import type { ItemType } from "../../inventory/src/types/enums";
import type { AttachmentType } from "../weapons/data";
import type { WeaponSource } from "../sources/WeaponSource";
import type { WeaponType } from "../weapons";
import type { Vector3Tuple } from "three";
import type { UserId } from "../api/index";
import type { SharedEntity } from "$shared/objects/SharedEntity";
export declare enum Packet {
    "GAME_STATE" = 0,
    "PLAYER_READY" = 1,
    "UPDATE_PLAYER_SOURCE" = 2,
    "UPDATE_PLAYER_SOURCE_HEALTH" = 3,
    "PLAYER_SOURCE_HIT" = 4,
    "KILL" = 5,
    "PLAYER_PING" = 6,
    "PLAYER_PONG" = 7,
    "PLAYER_INPUT" = 8,
    "PLAYER_CHARACTER_STATUS" = 9,
    "REMOVE_PLAYER" = 10,
    "SET_MAP" = 11,
    "PLAYER_LIST" = 12,
    "ENTITY_LIST" = 13,
    "GRENADE_EXPLODE" = 14,
    "PLAYER_SHOOT" = 15,
    "DEBUG_BOX_LIST" = 16,
    "PLAYER_SOURCE_DEATH" = 17,
    "PLAYER_SPAWN" = 18,
    "SET_ATTACHMENT" = 19,
    "REMOVE_ATTACHMENT" = 20,
    "SCRIPT_MAP" = 21,
    "ERROR" = 22,
    "GAME_END_LEADERBOARD" = 23,
    "PLAYER_DAMAGE" = 24,
    "SANDBOX" = 25,
    "SANDBOX_DATA" = 26,
    "USER_DATA" = 27,
    "BULLET_WIZZ" = 28,
    "INVENTORY_STATE" = 29,
    "INVENTORY_ADD" = 30,
    "INVENTORY_REMOVE" = 31,
    "INVENTORY_MOVE" = 32,
    "INVENTORY_SWAP" = 33,
    "NEARBY_ITEMS" = 34,
    "PICKUP_ITEM" = 35,
    "DROP_ITEM" = 36,
    "CONTAINER_ITEMS" = 37,
    "NEARBY_CONTAINERS" = 38,
    "OPEN_CONTAINER" = 39,
    "CONTAINER_TRANSFER" = 40
}
export declare enum ScriptMapAction {
    SET = 0,
    DELETE = 1,
    CLEAR = 2,
    ENTRIES = 3
}
export declare enum ErrorType {
    AFK = "AFK",
    CONNECTION_TIMEOUT = "CONNECTION_TIMEOUT",
    INVALID_INPUT = "INVALID_INPUT",
    SERVER_ERROR = "SERVER_ERROR"
}
export type SocketInput = [
    id: [delta: number, isn: number, time: number],
    pitch?: number,
    yaw?: number,
    commands?: number
];
export declare enum PingStatus {
    Green = 0,
    Yellow = 1,
    Red = 2
}
export type PlayerListItem = [
    id: number,
    name: string,
    position: number[],
    velocity: number[],
    input: number[],
    spawned: 0 | 1,
    health: number,
    maxHealth: number,
    weapon: string,
    grounded: 0 | 1,
    team: number,
    score: number,
    pingStatus: PingStatus,
    landTime: number,
    canSeePlayer: 0 | 1
];
export type EntityListItem = [
    id: number,
    type: string,
    data: ReturnType<SharedEntity["toArray"]>
];
export type BoxDebugItem = [
    min_x: number,
    min_y: number,
    min_z: number,
    max_x: number,
    max_y: number,
    max_z: number
];
export type GameEndPlayerStats = [
    id: number,
    name: string,
    score: number,
    kills: number,
    deaths: number,
    ping: number,
    team: number,
    health: number,
    maxHealth: number
];
export type ScriptMap = [action: ScriptMapAction.SET, id: string, key: string, value: any] | [action: ScriptMapAction.DELETE, id: string, key: string] | [action: ScriptMapAction.CLEAR, id: string] | [action: ScriptMapAction.ENTRIES, id: string, entries: [string, any][]];
export type PlayerSandboxData = [
    id: number
];
export type InventorySlotData = [
    id: string,
    name: string,
    type: ItemType,
    icon?: string | null
];
export type NearbyItemEntry = [
    entityId: number,
    item: InventorySlotData,
    distance: number
];
export type NearbyContainerEntry = [
    containerId: number,
    name: string,
    type: string,
    capacity: number,
    occupied: number,
    distance: number
];
export type ContainerTransferDirection = 0 | 1;
export interface PacketData {
    [Packet.GAME_STATE]: [time: number, endedAt: number];
    [Packet.PLAYER_READY]: [ready: 0 | 1];
    [Packet.PLAYER_LIST]: [...PlayerListItem];
    [Packet.ENTITY_LIST]: [...EntityListItem];
    [Packet.UPDATE_PLAYER_SOURCE]: [
        ping: number,
        health: number,
        maxHealth: number,
        x: number,
        y: number,
        z: number,
        vx: number,
        vy: number,
        vz: number,
        ready: 0 | 1,
        grounded: 0 | 1,
        weaponSource: ReturnType<WeaponSource["toArray"]> | [],
        score: number,
        command: [number, number, number],
        isn: number,
        delta: number,
        socketId: number
    ];
    [Packet.UPDATE_PLAYER_SOURCE_HEALTH]: [health: number, maxHealth: number];
    [Packet.PLAYER_PING]: [ping: number];
    [Packet.PLAYER_PONG]: [];
    [Packet.PLAYER_INPUT]: [inputs: [...SocketInput]];
    [Packet.REMOVE_PLAYER]: [id: number];
    [Packet.SET_MAP]: [path: string];
    [Packet.GRENADE_EXPLODE]: [
        radius: number,
        hit: boolean,
        x: number,
        y: number,
        z: number
    ];
    [Packet.PLAYER_SHOOT]: [id: number, point?: Vector3Tuple, normal?: Vector3Tuple];
    [Packet.DEBUG_BOX_LIST]: [...BoxDebugItem] | [];
    [Packet.PLAYER_SOURCE_DEATH]: [type: 0 | 1 | 2 | -1, killerId: number, rewards: [string, number][]];
    [Packet.PLAYER_SPAWN]: [x: number, y: number, z: number, team: number][];
    [Packet.PLAYER_SOURCE_HIT]: [
        tags: string[],
        position: number[],
        damage: number
    ];
    [Packet.KILL]: [targetId: number, killerId: number, time: number, rewards: [string, number][], headshot: 0 | 1];
    [Packet.SET_ATTACHMENT]: [type: WeaponType, attachmentId: string];
    [Packet.REMOVE_ATTACHMENT]: [
        type: WeaponType,
        attachmentType: AttachmentType
    ];
    [Packet.SCRIPT_MAP]: [uuid: string, ...data: ScriptMap];
    [Packet.PLAYER_CHARACTER_STATUS]: [status: 0 | 1];
    [Packet.ERROR]: [type: ErrorType, message: string];
    [Packet.GAME_END_LEADERBOARD]: [
        gameTime: string,
        players: GameEndPlayerStats[]
    ];
    [Packet.PLAYER_DAMAGE]: [
        damage: number,
        attackerPosition: [x: number, y: number, z: number],
        victimPosition: [x: number, y: number, z: number]
    ];
    [Packet.SANDBOX]: [sandbox: boolean];
    [Packet.SANDBOX_DATA]: [
    ];
    [Packet.USER_DATA]: [
        id: UserId,
        username: string
    ];
    [Packet.BULLET_WIZZ]: [attackerId: number, hit: 0 | 1];
    [Packet.INVENTORY_STATE]: [items: InventorySlotData[]];
    [Packet.INVENTORY_ADD]: [index: number, itemData: InventorySlotData];
    [Packet.INVENTORY_REMOVE]: [index: number];
    [Packet.INVENTORY_MOVE]: [fromIndex: number, toIndex: number];
    [Packet.INVENTORY_SWAP]: [index1: number, index2: number];
    [Packet.NEARBY_ITEMS]: [items: NearbyItemEntry[]];
    [Packet.PICKUP_ITEM]: [entityId: number, targetContainerId?: string | null];
    [Packet.DROP_ITEM]: [itemId: string];
    [Packet.CONTAINER_ITEMS]: [containerId: number, items: InventorySlotData[]];
    [Packet.NEARBY_CONTAINERS]: [containers: NearbyContainerEntry[]];
    [Packet.OPEN_CONTAINER]: [containerId: number];
    [Packet.CONTAINER_TRANSFER]: [containerId: number, direction: ContainerTransferDirection, itemId: string, targetContainerId?: string | null];
}
