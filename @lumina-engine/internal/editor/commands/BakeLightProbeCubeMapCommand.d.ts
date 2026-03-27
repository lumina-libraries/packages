import { CubeCamera, LightProbe, WebGLCubeRenderTarget } from "three";
import { Command } from "./Command";
export declare class BakeLightProbeCubeMapCommand extends Command {
    object: LightProbe;
    readonly type = "BakeLightProbeCubeMapCommand";
    updatable: boolean;
    constructor(object: LightProbe);
    init(): Promise<void>;
    update(command: BakeLightProbeCubeMapCommand): void;
    renderTarget: WebGLCubeRenderTarget;
    camera: CubeCamera;
    execute(): void;
    undo(): void;
}
