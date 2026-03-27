import { Mesh, PerspectiveCamera, Scene } from "three";
import MeshHelper from "./MeshHelper";
import type { SpawnPointObject } from "../objects/SpawnPointObject";
import { PlayerManager } from "../../client/managers/PlayerManager";
import type { GameManager } from "../../client/managers/GameManager";
export declare class SpawnPointHelper extends MeshHelper {
    target: SpawnPointObject;
    game: GameManager;
    scene: Scene;
    type: "SpawnPointHelper";
    readonly camera: PerspectiveCamera;
    load(): Promise<void>;
    player: PlayerManager;
    get source(): import("../../shared/core/Player").Player;
    constructor(target: SpawnPointObject, game: GameManager, scene: Scene);
    /**
     * '#ff6699' (pink)
     * '#0099ff' (blue)
     * '#99cc00' (green)
     * '#ffcccc' (light red)
     * '#ffff66' (yellow)
     * '#66ccff' (light blue)
     * '#ff9933' (orange)
     * '#cc99ff' (purple)
     * '#99ff99' (light green)
     * '#cccccc' (gray)
     */
    static colors: string[];
    capsuleMesh?: Mesh;
    update(): void;
    setActive(): void;
}
