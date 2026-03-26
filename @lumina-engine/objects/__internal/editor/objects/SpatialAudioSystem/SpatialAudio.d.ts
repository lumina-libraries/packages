import { PositionalAudio, AudioListener, Camera } from 'three';
import { Collider } from '@dimforge/rapier3d';
import type { SharedWorld } from '../../../shared/managers/SharedWorld';
export declare class SpatialAudio extends PositionalAudio {
    #private;
    private reverb;
    private filter;
    private selectedIR;
    getOutsideness(): number;
    private irFiles;
    constructor(listener: AudioListener);
    private initializeAudioNodes;
    loadReverbIR(url: string): Promise<void>;
    setLowPassFilter(frequency: number): void;
    private connectEffectsChain;
    private outsideness;
    private updateReverb;
    private updateAcoustics;
    update(camera: Camera, world: SharedWorld, exclude?: Collider[]): void;
    dispose(): void;
}
