import { type WeaponConfig, type WeaponType } from "./data";
export * from "./data";
export declare class WeaponMap extends EventTarget {
    keys: Set<string>;
    data: Record<string, WeaponConfig>;
    get(key: string): WeaponConfig;
    getShootSoundSrc(key: string): string[];
    getReloadSoundSrc(key: string): string[];
    set(key: string, value: WeaponConfig): void;
    getByType(type: WeaponType): WeaponConfig[];
    update(): void;
    forEach(callback: (weapon: WeaponConfig) => void): void;
}
export declare const weapons: WeaponMap;
export declare const preload: () => void;
