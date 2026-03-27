import { type Object3DJSONObject, type Object3DJSON } from "three";
import StoreAdapter, { FileSource } from "../core/adapters/engine/StoreAdapter";
import { CustomObject3D } from "./CustomObject3D";
import { SpatialAudio } from "./SpatialAudioSystem/SpatialAudio";
export declare const AudioObjectIcon: CustomObject3D["icon"];
export interface AudioObjectJSON extends Object3DJSONObject {
    file: string | undefined;
    referenceDistance: number;
    rolloffFactor: number;
    maxDistance: number;
    directionalConeInnerAngle: number;
    directionalConeOuterAngle: number;
    directionalConeOuterGain: number;
    loop: boolean;
    volume: number;
    autoplay: boolean;
    playbackRate: number;
    loopStart: number;
    loopEnd: number;
}
export interface AudioJSON extends Object3DJSON {
    object: AudioObjectJSON;
}
export declare class AudioObject extends CustomObject3D {
    #private;
    static type: string;
    readonly type: string;
    readonly icon: [name: string, color?: string];
    get file(): FileSource<Blob> | null | undefined;
    set file(value: FileSource<Blob> | null | undefined);
    audio?: SpatialAudio;
    referenceDistance: number;
    rolloffFactor: number;
    maxDistance: number;
    directionalConeInnerAngle: number;
    directionalConeOuterAngle: number;
    directionalConeOuterGain: number;
    get volume(): number;
    set volume(value: number);
    get loop(): boolean;
    set loop(value: boolean);
    get autoplay(): boolean;
    set autoplay(value: boolean);
    get playbackRate(): number;
    set playbackRate(value: number);
    get loopStart(): number;
    set loopStart(value: number);
    get loopEnd(): number;
    set loopEnd(value: number);
    init(store: StoreAdapter): void;
    load(): Promise<void>;
    toJSON(meta?: any): AudioJSON;
    fromJSON(json: ReturnType<this["toJSON"]>): this;
    update(): void;
    dispose(): void;
}
