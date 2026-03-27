import { Object3D } from "three";
import type { AudioObject } from "../objects/AudioObject";
import { PositionalAudioHelper } from "../../shared/addons/jsm/helpers/PositionalAudioHelper";
export declare class AudioObjectHelper extends Object3D {
    object: AudioObject;
    helper?: PositionalAudioHelper;
    constructor(object: AudioObject);
    update(): void;
    dispose(): void;
}
