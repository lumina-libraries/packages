import { SharedEntity } from "./SharedEntity";
import type { SharedGameManager } from "../managers/SharedGameManager";
import { MagazineSource } from "../sources/WeaponSource";
export declare class SharedAmmoEntity extends SharedEntity {
    static type: string;
    amount: number;
    constructor(game: SharedGameManager, data?: MagazineSource, emit?: boolean);
}
