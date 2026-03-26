import type { Movement } from "../../sandbox/types";
import type { Player } from "./Player";
export declare enum MovementIndex {
    Pitch = 0,
    Yaw = 1,
    Forward = 2,
    Left = 3,
    Backward = 4,
    Right = 5,
    Jump = 6,
    LeftPointer = 7,
    RightPointer = 8,
    Sprint = 9,
    Drop = 10,
    Shoot = 11,
    Aim = 12,
    Action = 13,
    Grenade = 14,
    Reload = 15,
    RollLeft = 16,
    RollRight = 17,
    Crouch = 18,
    PrimaryWeapon = 19,
    SecondaryWeapon = 20,
    MeleeWeapon = 21
}
export declare enum MovementValue {
    Yes = 1,
    No = 0
}
export declare class PlayerMovement {
    readonly player?: Player;
    readonly movement: Movement;
    constructor(player?: Player);
    clear(clearDirection?: boolean): void;
    input(): [pitch: number, yaw: number, command: number];
    process(pitch: number, yaw: number, command: number): void;
}
