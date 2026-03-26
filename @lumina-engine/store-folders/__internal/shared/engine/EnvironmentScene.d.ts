import { Scene, Object3D, WebGLRenderer, Vector3, PerspectiveCamera, Color, WebGLCubeRenderTarget, CubeCamera, TextureLoader, OrthographicCamera, Mesh, SphereGeometry, Vector4, MeshBasicMaterial, LightProbe, EventDispatcher } from "three";
import { Sky } from "../addons/jsm/objects/Sky";
import { Water } from "../addons/jsm/objects/Water";
export declare function generateEnvironmentMap(renderer: WebGLRenderer, origin: Vector3, scene: Scene, renderTarget?: WebGLCubeRenderTarget, camera?: CubeCamera): WebGLCubeRenderTarget;
export declare class EnvironmentViewHelper extends Object3D {
    camera?: PerspectiveCamera;
    domElement?: HTMLElement;
    environment?: EnvironmentScene;
    size: number;
    orthographic: OrthographicCamera;
    environmentMapHelper: Mesh<SphereGeometry, MeshBasicMaterial, import("three").Object3DEventMap>;
    viewport: Vector4;
    constructor(camera?: PerspectiveCamera, domElement?: HTMLElement, environment?: EnvironmentScene, size?: number);
    update(): void;
    render(renderer: WebGLRenderer): void;
}
export declare enum CMSMode {
    practical = "practical",
    uniform = "uniform",
    logarithmic = "logarithmic",
    custom = "custom"
}
import { CSM } from "../addons/jsm/csm/CSM";
import { LightProbeVolume, LightProbeVolumeHelper } from "../../editor/core/LightProbeVolume";
import type StoreAdapter from "../../editor/core/adapters/engine/StoreAdapter";
export interface EnvironmentSkyOptions {
    turbidity: number;
    rayleigh: number;
    mieCoefficient: number;
    mieDirectionalG: number;
    elevation: number;
    azimuth: number;
    exposure: number;
    visible: boolean;
}
export interface EnvironmentWaterOptions {
    clipBias?: number;
    alpha?: number;
    sunColor?: Color;
    waterColor?: Color;
    eye?: Vector3;
    distortionScale?: number;
}
export interface EnvironmentCSMOptions {
    cascades: number;
    maxFar: number;
    mode: CMSMode | string;
    shadowMapSize: number;
    shadowBias: number;
    shadowNormalBias: number;
    fade: boolean;
    lightDirection: Vector3;
    lightIntensity: number;
    lightColor: Color;
    lightNear: number;
    lightFar: number;
    lightMargin: number;
}
export interface EnvironmentFogOptions {
    enabled: boolean;
    type: "Fog" | "FogExp2" | string;
    color: Color;
    near: number;
    far: number;
    density: number;
}
export interface EnvironmentLightProbeVolumeOptions {
    enabled: boolean;
    rows: number;
    columns: number;
    levels: number;
    probeIntensity: number;
    volumes: number;
}
export interface EnvironmentParameters {
    timeCycle: {
        autoUpdate: boolean;
        enabled: boolean;
        time: number;
        speed: number;
        startTime: number;
        activePreset: string | null;
    };
    presets: EnvironmentTimePreset[];
    sky: EnvironmentSkyOptions;
    csm: EnvironmentCSMOptions;
    fog: EnvironmentFogOptions;
    water: EnvironmentWaterOptions;
    lpv: EnvironmentLightProbeVolumeOptions;
    environment: {
        enabled: boolean;
        texture?: string;
    };
    scene: {
        backgroundColor: Color;
    };
    camera: {
        near: number;
        far: number;
    };
}
export interface EnvironmentTimePreset {
    id: string;
    name: string;
    time: number;
    sky: {
        turbidity: number;
        rayleigh: number;
        mieCoefficient: number;
        mieDirectionalG: number;
        elevation: number;
        azimuth: number;
        exposure: number;
    };
    lpv: {
        probeIntensity: number;
    };
    csm: {
        lightIntensity: number;
        lightColor: Color | number;
    };
    fog: {
        color: Color | number;
        density?: number;
    };
}
declare class EnvironmentTimeManager extends EventDispatcher<{
    update: {
        currentTime: number;
    };
}> {
    private serverStartTime;
    private startTime;
    private timeMultiplier;
    private currentTime;
    constructor(serverStartTime: number, initialGameTime?: number);
    now(): number;
    /**
     * Updates the game time based on real time elapsed since server start
     * @returns Current game time (0-86400)
     */
    update(): number;
    /**
     * Set the time multiplier to speed up or slow down game time
     * @param multiplier New time multiplier (1 = normal speed)
     */
    setTimeMultiplier(multiplier: number, reflow?: boolean): void;
    /**
     * Get current game time
     * @returns Current game time (0-86400)
     */
    getCurrentTime(): number;
    /**
     * Format game time as HH:MM:SS
     * @returns Formatted time string
     */
    getFormattedTime(): string;
    /**
     * Explicitly set the current time
     * @param newTime New time value (0-86400)
     */
    setTime(newTime: number): void;
}
export declare class EnvironmentScene extends Scene {
    readonly scene: Scene;
    readonly camera: PerspectiveCamera;
    renderer?: WebGLRenderer;
    readonly lightProbeScene: Scene;
    textureLoader: TextureLoader;
    environmentMapNeedsUpdate: boolean;
    environmentMapGlobal: boolean;
    csmNeedsUpdate: boolean;
    csmLightsNeedUpdate: boolean;
    csmMaterialsNeedUpdate: boolean;
    readonly parameters: EnvironmentParameters;
    readonly sky: Sky;
    readonly lpv: LightProbeVolume;
    readonly sun: Object3D<import("three").Object3DEventMap>;
    readonly lights: Object3D<import("three").Object3DEventMap>;
    readonly helper: Object3D<import("three").Object3DEventMap>;
    readonly probes: Object3D<import("three").Object3DEventMap>;
    readonly lightProbe: LightProbe;
    lightProbeVolumeNeedsUpdate: boolean;
    readonly time: EnvironmentTimeManager;
    sunDirection: Vector3;
    readonly water: Water;
    csm?: CSM;
    csmHelper: any;
    private readonly lightProbeVolumeCubeCameraRenderTarget;
    private readonly lightProbeVolumeCubeCamera;
    readonly lightProbeVolumeHelper: LightProbeVolumeHelper;
    private readonly timeProbeCache;
    environmentRenderTarget: WebGLCubeRenderTarget;
    environmentRenderCamera: CubeCamera;
    constructor(scene: Scene, camera: PerspectiveCamera, renderer?: WebGLRenderer, lightProbeScene?: Scene, store?: StoreAdapter);
    createCSM(): void;
    update(target?: keyof EnvironmentParameters, init?: boolean): void;
    targetCycle: number;
    updateCycles(): void;
    private probeBrightness;
    private isLightProbeDark;
    bakeLightProbeVolume(progress?: (progress: number) => void): Promise<void>;
    static createPreset(parameters: EnvironmentParameters, id?: string, name?: string): EnvironmentTimePreset;
    addTimePreset(name: string): EnvironmentTimePreset;
    removeTimePreset(id: string): void;
    getTimePreset(id: string): EnvironmentTimePreset | undefined;
    updateTimePreset(id: string, updates: Partial<EnvironmentTimePreset>): void;
    bakeTimeCycle(progress: (progress: number) => void): Promise<void>;
    setTime(time: number, update?: boolean): void;
    createTestPresets(): void;
    setActiveTimePreset(presetId: string, update?: boolean): void;
}
export {};
