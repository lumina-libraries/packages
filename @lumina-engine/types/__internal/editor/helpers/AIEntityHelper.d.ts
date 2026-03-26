import MeshHelper from "./MeshHelper";
import type { AIEntityObject } from "../objects/AIEntityObject";
export declare class AIEntityHelper extends MeshHelper {
    target: AIEntityObject;
    type: "AIEntityHelper";
    forceUpdateOnEveryFrame: boolean;
    private capsuleMesh;
    private visualGroup;
    private directionCone;
    private targetLine;
    private pathLine;
    private waypointSpheres;
    private materials;
    constructor(target: AIEntityObject);
    private updateAIMaterial;
    private updateTargetLine;
    private updatePathVisualization;
    private updateStuckIndicator;
    update(delta?: number, time?: number): void;
    /**
     * Get debug information string (matching AIDebugRenderer.renderDebugHUD)
     */
    getDebugInfo(): string;
    /**
     * Clear all debug visualizations (matching AIDebugRenderer.clearDebugObjects)
     */
    private clearAllDebugObjects;
    dispose(): void;
}
