import { WeaponSource } from "../sources/WeaponSource";
import { SharedEntity } from "./SharedEntity";
import type { SharedGameManager } from "../managers/SharedGameManager";
export declare class SharedWeaponEntity extends SharedEntity {
    static type: string;
    data: WeaponSource;
    constructor(game: SharedGameManager, data?: WeaponSource, emit?: boolean);
    toArray(): [
        ...ReturnType<SharedEntity["toArray"]>,
        ReturnType<WeaponSource["toArray"]>
    ];
    fromArray(array: ReturnType<SharedWeaponEntity["toArray"]>): void;
}
