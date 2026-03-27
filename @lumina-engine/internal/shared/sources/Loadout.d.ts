import { EventDispatcher } from "three";
import { WeaponSource } from "./WeaponSource";
import { AttachmentType, WeaponType } from "../weapons/data/index";
export declare class Loadout extends EventDispatcher<{
    remove: {
        detail: WeaponSource;
    };
    update: {};
    setAttachment: {
        detail: {
            weaponType: WeaponType;
            attachmentId: string;
        };
    };
    removeAttachment: {
        detail: {
            weaponType: WeaponType;
            attachmentType: AttachmentType;
        };
    };
    set: {
        detail: WeaponSource;
    };
}> {
    private primary?;
    private secondary?;
    private melee?;
    private current?;
    set(source: WeaponSource): void;
    remove(source: WeaponSource): void;
    getWeapon(type?: WeaponType): WeaponSource;
    getCurrentWeapon(): WeaponSource;
    setCurrent(type: WeaponType): void;
    getAttachments(type: WeaponType): Map<AttachmentType, string>;
    toArray(): [
        WeaponType | undefined,
        Array<ReturnType<WeaponSource["toArray"]> | null>
    ];
    fromArray(array: ReturnType<Loadout["toArray"]>): void;
    clear(): void;
}
