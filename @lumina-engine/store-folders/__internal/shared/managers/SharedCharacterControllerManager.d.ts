import { type AnimationActionLoopStyles, type AnimationAction, AnimationClip, Object3D, Bone, AnimationMixer, PerspectiveCamera } from "three";
import { SharedSkeletonManager } from "./SharedSkeletonManager";
import StoreAdapter from "../../editor/core/adapters/engine/StoreAdapter";
import type { Player } from "../core/Player";
import type { Animations, WeaponConfig } from "../weapons/index";
export declare const MOVEMENT_ANIMATIONS: {
    floating: string[];
    forwardLeftSprint: string[];
    forwardLeft: string[];
    forwardRightSprint: string[];
    forwardRight: string[];
    backwardLeftSprint: string[];
    backwardLeft: string[];
    backwardRightSprint: string[];
    backwardRight: string[];
    forwardSprint: string[];
    forward: string[];
    backwardSprint: string[];
    backward: string[];
    leftSprint: string[];
    left: string[];
    rightSprint: string[];
    right: string[];
    crouch: string[];
    rotatingLeft: string[];
    rotatingRight: string[];
    jumpUp: string[];
    idle: string[];
    hardLanding: string[];
    forwardLeftCrouch: string[];
    forwardRightCrouch: string[];
    backwardLeftCrouch: string[];
    backwardRightCrouch: string[];
    forwardCrouch: string[];
    backwardCrouch: string[];
    leftCrouch: string[];
    rightCrouch: string[];
    strafeLeftCrouch: string[];
    strafeRightCrouch: string[];
    turnLeftCrouch: string[];
    turnRightCrouch: string[];
    idleCrouch: string[];
    walkCrouch: string[];
    slide: string[];
    slideForward: string[];
};
export declare const ANIMATION_TYPE = "default";
export declare const ANIMATION_FILES: string[];
export declare class SharedCharacterControllerManager extends Object3D {
    target?: Object3D;
    readonly indexes: Record<string, number>;
    actions: AnimationAction[];
    mixer?: AnimationMixer;
    stateMixer?: AnimationMixer;
    pitchMixer?: AnimationMixer;
    private pitchAction?;
    current?: string;
    characterStore?: StoreAdapter;
    characterHeadBone?: Object3D;
    characterCamera?: PerspectiveCamera;
    characterRightObject?: Object3D;
    /**
     * When true, the character is reconciling with the server.
     */
    reconciling: number;
    constructor(store?: StoreAdapter, target?: Object3D);
    createMixers(): void;
    set(target: Object3D): void;
    private pitchDuration;
    setPitch(pitch?: number, p?: number): void;
    updatePitchAction(): void;
    ready: boolean;
    static promises: Record<string, Promise<AnimationClip>>;
    static animations: Record<string, AnimationClip>;
    fetchAnimationClip?(name: string): Promise<AnimationClip | undefined>;
    fetchCharacterModel?(name: string): Promise<Object3D | undefined>;
    getAnimationAction?(name: string): AnimationAction | undefined;
    private readonly animationMap;
    fetch(type: string, name: string): Promise<this>;
    private animationFilters;
    setAnimationFilters(filters: boolean, force?: boolean): void;
    private applyAnimationFilters;
    private applyAnimationFilter;
    spines: Bone[];
    character?: string;
    skeletonManager?: SharedSkeletonManager;
    createSkeleton(render?: boolean): SharedSkeletonManager;
    behavior: Record<keyof Animations, AnimationAction | undefined>;
    setCharacter(name: string): Promise<false | Object3D<import("three").Object3DEventMap>>;
    private loading;
    stabilizerAnimation: AnimationClip | undefined;
    stabilizerAction: AnimationAction | undefined;
    weaponConfig?: WeaponConfig;
    swingActions: AnimationAction[];
    lastSwingTime: number;
    weaponObjects(weapon: WeaponConfig, options?: {
        visible?: boolean;
    }): Partial<Record<string | number | symbol, Object3D<import("three").Object3DEventMap>[]>>;
    setWeapon(config: WeaponConfig): void;
    load(): Promise<void>;
    play(name: string | string[], options?: {
        loop?: AnimationActionLoopStyles;
        timeScale?: number;
        fade?: number;
        weight?: number;
        startAt?: number;
        clampWhenFinished?: boolean;
    }): void;
    setAnimation(name: string, clip: AnimationClip): void;
    currentBehavior?: keyof SharedCharacterControllerManager["behavior"];
    playBehavior(name: keyof SharedCharacterControllerManager["behavior"], options?: {
        loop?: AnimationActionLoopStyles;
        timeScale?: number;
        duration?: number;
        weight?: number;
        startAt?: number;
        clampWhenFinished?: boolean;
        fadeIn?: number;
        crossFade?: number;
        fadeOut?: number;
        previous?: {
            stop?: boolean;
            fadeOut?: number;
            weight?: number;
        };
    }): Promise<unknown>;
    /**
     * Stops the current behavior animation with fade out and optionally transitions to another behavior
     * @param options Configuration options for stopping the behavior
     * @returns Promise that resolves when the fade out is complete
     */
    stopBehavior(options?: {
        fadeOut?: number;
        fadeIn?: number;
        nextBehavior?: keyof SharedCharacterControllerManager["behavior"];
        nextOptions?: Parameters<SharedCharacterControllerManager["playBehavior"]>[1];
    }): Promise<void>;
    get currentAction(): AnimationAction;
    speed: number;
    movement: {
        forward: boolean;
        backward: boolean;
        left: boolean;
        right: boolean;
        crouch: boolean;
        aim: boolean;
        sprint: boolean;
        jump: boolean;
        onground: boolean;
        aiming: boolean;
        rotatingRight: boolean;
        rotatingLeft: boolean;
        weaponOnHand: boolean;
        floating: boolean;
        reloading: boolean;
        shooting: boolean;
        sliding: boolean;
    };
    pitch: number;
    jumpStart: number | null;
    landTime: number;
    animationSpeed: number;
    deltaTime: number;
    private test;
    private sprintStartTime;
    private readonly SPRINT_DELAY_MS;
    update(_deltaTime: number, time: number, player?: Player): void;
    deltaYaw: number;
    lastRotatedRight: number;
    lastRotatedLeft: number;
    ragdolling: boolean;
    ragdoll(_player: any): void;
    interpolation: boolean;
    animate(player: Player | null, delta: number, time: number): void;
}
