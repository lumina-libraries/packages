import type { Vector3Tuple, Vector4Tuple } from "three";
export declare enum WeaponType {
    "Primary" = 0,
    "Secondary" = 1,
    "Melee" = 2
}
export declare enum WeaponBody {
    "Shotgun" = 0,
    "Handgun" = 1,
    "Rifle" = 2,
    "Sniper" = 3
}
export interface AmmoBase {
    caliber: string;
    rareness: number;
    /**
     * Stack per slot
     */
    sps: number;
}
export interface AmmoConfig {
    ammo: AmmoBase[];
}
export interface WeaponAttachmentConfig {
    id: string;
    /**
     * The position of the attachment relative to the weapon.
     */
    position: Vector3Tuple;
    /**
     * The rotation of the attachment relative to the weapon.
     */
    rotation: Vector3Tuple;
    /**
     * The scale of the attachment relative to the weapon.
     */
    scale: number;
    ads?: {
        position: Vector3Tuple;
        rotation: Vector3Tuple;
    };
}
export interface Reload {
    duration: number;
    rate: number;
    sound: Src[];
}
export interface Animations {
    standby?: string;
    partial_reload?: string;
    tactical_run?: string;
    stow?: string;
    empty_reload?: string;
    inspect?: string;
    shot?: string;
    deploy?: string;
    /** Fast attack swing animations (plays on LMB tap) */
    swing?: string | string[];
    /** Heavy attack charge start (plays when LMB held after delay) */
    heavy_start?: string;
    /** Heavy attack charge loop/standby (loops while charging) */
    heavy_standby?: string;
    /** Heavy attack swing (plays on LMB release after charge) */
    heavy_swing?: string;
    /** Throw attack start (plays when RMB held) */
    throw_start?: string;
    /** Throw attack standby (loops while in throw stance) */
    throw_standby?: string;
    /** Throw attack stop (plays when exiting throw stance) */
    throw_stop?: string;
    /** Throw attack execute (plays on throw) */
    throw_execute?: string;
    /** Run animation for melee weapon */
    run?: string;
}
export interface AnimationTimings {
    /**
     * Duration in milliseconds for stowing the current weapon
     */
    stow: number;
    /**
     * Duration in milliseconds for deploying the new weapon
     */
    deploy: number;
}
export interface WeaponObjectsConfig {
    rightObject: string[];
    rightFloatAction: string[];
    rightChildAction: string[];
}
export interface WeaponMaterialsConfig {
    body: string;
    mask: string;
}
export interface WeaponConfig {
    type: WeaponType;
    body: WeaponBody;
    effectorRotation?: Vector3Tuple;
    name: string;
    description?: string;
    id: string;
    images: Images;
    /** Optional for melee weapons */
    shoot?: Shoot;
    /** Optional for melee weapons */
    recoil?: Recoil;
    /** Optional for melee weapons */
    hipfire?: Hipfire;
    /** Optional for melee weapons */
    ads?: Ads;
    /** Optional for melee weapons */
    ammo?: Ammo;
    /** Optional for melee weapons */
    muzzle?: Muzzle;
    /** Optional for melee weapons */
    reload?: Reload;
    attachments?: WeaponAttachmentConfig[];
    /** Optional for melee weapons */
    bullet_case?: WeaponBulletCaseConfig;
    objects: WeaponObjectsConfig;
    /**
     * Optional animation timings for weapon switching (milliseconds).
     * If missing, defaults will be used.
     */
    animationsTiming?: AnimationTimings;
    animations: Animations;
    /** Optional for melee weapons */
    materials?: WeaponMaterialsConfig;
    /**
     * Melee configuration (present for melee weapons only)
     */
    melee?: Melee;
}
export interface Ads {
    enabled: boolean;
    duration: number;
    position: Vector3Tuple;
    rotation: Vector3Tuple;
    automatic: boolean;
    spread: number;
    recoil?: {
        snappiness: number;
        returnSpeed: number;
    };
}
export interface WeaponBulletCaseConfig {
    position: Vector3Tuple;
    force: [min: number, max: number];
}
export interface Ammo {
    caliber: string[];
}
export interface Hipfire {
    position: Vector3Tuple;
    spread: number;
    automatic: boolean;
}
export interface Images {
    flat: Src[];
}
export interface Attachments {
    id: string;
    position: Vector3Tuple;
}
export interface Muzzle {
    position: Vector3Tuple;
    attachments?: Attachments[];
}
export interface Recoil {
    hipfire: Vector3Tuple;
    ads: Vector3Tuple;
    snappiness: number;
    returnSpeed: number;
    seed: number;
    duration: number;
}
export interface Shoot {
    rate: number;
    damage: number;
    distance: number;
    sound: Src[];
}
export interface MeleeHeavyConfig {
    thrust_enabled: boolean;
    thrust_distance_max: number;
    thrust_distance_min: number;
    thrust_force: number;
    thrust_duration: number;
    fov_animation_charge: number;
    fov_animation_thrust: number;
}
export interface Melee {
    /**
     * Maximum effective melee reach distance (in Three.js units)
     */
    distance: number;
    /**
     * Cooldown between swings in milliseconds
     */
    rate: number;
    /**
     * Damage dealt by a successful melee hit
     */
    damage: number;
    /**
     * Configuration for heavy melee attacks
     */
    heavy?: MeleeHeavyConfig;
}
export declare enum AttachmentType {
    Optic = 0,
    Magazine = 1,
    Muzzle = 2,
    Siderail = 3,
    Stock = 4
}
export interface AttachmentConfig {
    description: string;
    id: string;
    name: string;
    type: AttachmentType;
    src: Src[];
    reticle?: Reticle;
}
export interface ReticleAds {
    enabled: boolean;
    position: Vector4Tuple;
}
export interface Reticle {
    enabled: boolean;
    position: Vector4Tuple;
    dot?: Src[];
    ads?: ReticleAds;
}
export interface Src {
    src: string;
    type: string;
    placeholder?: boolean;
}
declare const _default: WeaponConfig[];
export default _default;
