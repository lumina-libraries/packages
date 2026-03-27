import type { Player } from "./Player";
import type SharedPlayerWeaponRecoil from "./SharedPlayerWeaponRecoil";
interface CameraSwayConfig {
    enabled: boolean;
    intensity: number;
    frequency: number;
    dampingFactor: number;
}
interface CameraBobConfig {
    walk: {
        enabled: boolean;
        positionIntensity: number;
        rotationIntensity: number;
        frequency: number;
    };
    run: {
        enabled: boolean;
        positionIntensity: number;
        rotationIntensity: number;
        frequency: number;
    };
    jump: {
        enabled: boolean;
        bounceIntensity: number;
        rotationIntensity: number;
        duration: number;
    };
    idle: {
        enabled: boolean;
        breathingIntensity: number;
        breathingFrequency: number;
    };
}
interface CameraRecoilConfig {
    enabled: boolean;
}
interface CameraReloadConfig {
    enabled: boolean;
    rightObjectInfluence: number;
    smoothingSpeed: number;
}
interface CameraDamageConfig {
    enabled: boolean;
    shakeIntensity: number;
    shakeDuration: number;
    shakeFrequency: number;
    dampingSpeed: number;
}
interface CameraSwaySystemConfig {
    sway: CameraSwayConfig;
    bob: CameraBobConfig;
    recoil: CameraRecoilConfig;
    reload: CameraReloadConfig;
    damage: CameraDamageConfig;
    smoothing: {
        transitionSpeed: number;
        rotationDamping: number;
    };
}
type Config<T> = {
    [P in keyof T]?: Config<T[P]>;
};
export default class CameraSway {
    private config;
    private bobManager;
    private currentRotation;
    private targetRotation;
    private recoilRotation;
    private reloadRotation;
    private damageRotation;
    private damageShakeTime;
    private damageShakeIntensity;
    constructor(customConfig?: Config<CameraSwaySystemConfig>);
    private mergeConfig;
    update(player: Player, deltaTime: number, weaponRecoil?: SharedPlayerWeaponRecoil): void;
    private updateDamageShake;
    triggerDamageShake(intensity?: number): void;
    stop(): void;
    updateConfig(newConfig: Config<CameraSwaySystemConfig>): void;
    getConfig(): CameraSwaySystemConfig;
}
export type { CameraSwaySystemConfig, CameraSwayConfig, CameraBobConfig, CameraRecoilConfig, CameraReloadConfig, CameraDamageConfig, };
