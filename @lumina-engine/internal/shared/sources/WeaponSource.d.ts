import { DefaultSource } from "./DefaultSource";
import { AttachmentSource } from "./AttachmentSource";
import { AttachmentType, type AttachmentConfig, type WeaponConfig } from "../weapons/data/index";
export declare class MagazineSource extends DefaultSource {
    maxCapacity: number;
    capacity: number;
    bullets: number;
    static readonly NET_SCHEME: {
        readonly MAX_CAPACITY: 2;
        readonly CAPACITY: 3;
        readonly BULLETS: 4;
        readonly UUID: 0;
        readonly ITEM_TYPE: 1;
    };
    constructor(maxCapacity?: number, capacity?: number, bullets?: number);
    reload(): boolean;
    get empty(): boolean;
    shoot(): boolean;
    clone(): MagazineSource;
    toArray(): [
        ...ReturnType<DefaultSource["toArray"]>,
        maxCapacity: number,
        capacity: number,
        bullets: number
    ];
    fromArray(array: ReturnType<MagazineSource["toArray"]>): this;
}
export declare class WeaponSource extends DefaultSource<{
    setAttachment: {
        detail: AttachmentConfig;
    };
    attachment: {
        detail: AttachmentConfig;
        push: boolean;
    };
    removeAttachment: {
        detail: AttachmentType;
        push: boolean;
    };
    weapon: {
        detail?: WeaponConfig;
    };
    update: {};
}> {
    id?: string;
    readonly attachments: Map<AttachmentType, string>;
    readonly attachmentSources: Map<AttachmentType, AttachmentSource>;
    readonly magazines: Set<MagazineSource>;
    static readonly NET_SCHEME: {
        readonly ATTACHMENTS: 2;
        readonly MAGAZINES: 3;
        readonly ID: 4;
        readonly UUID: 0;
        readonly ITEM_TYPE: 1;
    };
    loaded: MagazineSource | null;
    constructor(id?: string);
    setAttachment(data: AttachmentConfig | AttachmentSource | string | number, push?: boolean): void;
    removeAttachment(data: AttachmentType, push?: boolean): void;
    get config(): any;
    setWeapon(id?: string): void;
    reload(): boolean;
    shoot(): boolean;
    copy(source: WeaponSource): void;
    clone(): WeaponSource;
    toArray(): [
        ...ReturnType<DefaultSource["toArray"]>,
        attachments: string[],
        magazines: ReturnType<MagazineSource["toArray"]>[],
        id: string | undefined
    ];
    fromArray(array: ReturnType<WeaponSource["toArray"]>): this;
    static states(): WeaponSource[];
    saveState(index: number): void;
}
