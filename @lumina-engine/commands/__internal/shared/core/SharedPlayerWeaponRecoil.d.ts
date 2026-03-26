import type { WeaponConfig } from "../weapons/data/index";
import { Vector3, Euler } from "three";
export default class SharedPlayerWeaponRecoil extends Euler {
    snappiness: number;
    returnSpeed: number;
    seed: number;
    isAiming: boolean;
    private readonly currentRotation;
    readonly targetRotation: Vector3;
    readonly recoil: Vector3;
    readonly aimRecoil: Vector3;
    duration: number;
    time: number;
    constructor(snappiness?: number, returnSpeed?: number, seed?: number);
    fire(): Vector3;
    update(deltaTime: number, isAiming: boolean, config?: WeaponConfig): void;
    reset(): void;
}
