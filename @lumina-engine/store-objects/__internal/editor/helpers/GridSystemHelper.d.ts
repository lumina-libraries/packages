import MeshHelper from './MeshHelper';
import { GridSystem } from '../core/grid';
import type { ContextMenuItem } from '../events/ContextMenuEvent';
export declare enum ToolMode {
    Single = "Single",
    Line = "Line",
    Rectangle = "Rectangle"
}
export declare enum GridSystemHelperEvent {
    BLOCK_HOVER = "BLOCK_HOVER",
    BLOCK_SELECT = "BLOCK_SELECT",
    BLOCK_PLACE = "BLOCK_PLACE",
    BLOCK_REMOVE = "BLOCK_REMOVE",
    BLOCK_ROTATE = "BLOCK_ROTATE"
}
export declare class GridSystemHelper extends MeshHelper {
    #private;
    target: GridSystem;
    type: string;
    private main;
    private connectionPointsInstancedMesh;
    private connectionPointData;
    private previewMesh;
    private previewMeshes;
    private rotationArrow;
    private raycaster;
    private selectedBlock;
    private hoverBlock;
    private toolModeEnabled;
    private toolMode;
    private currentBlockType;
    private currentRotation;
    showConnectionPoints: boolean;
    private flipDirection;
    private showPreviewPath;
    private aboveSurface;
    private onSurface;
    private replaceBlocks;
    private extrudeAmount;
    private isDragging;
    private dragStart;
    private dragEnd;
    private selectedCells;
    private currentFaceNormal;
    private readonly previewMaterial;
    private readonly validPlacementMaterial;
    private readonly invalidPlacementMaterial;
    private readonly connectionPointMaterial;
    private readonly hoverMaterial;
    private readonly selectedMaterial;
    contextmenu: ContextMenuItem[];
    constructor(target: GridSystem);
    private initializeHelper;
    get previewVisible(): boolean;
    private setupEventListeners;
    private dispatchHelperUpdate;
    private updateRotationIndicator;
    private onKeyDown;
    private onWheel;
    private placeBlocks;
    private removeBlocks;
    private getSelectionPositions;
    private cancelSelection;
    private onBlockPlaced;
    private onBlockRemoved;
    private onBlockRotated;
    private onBlockSelected;
    private onPointerMove;
    private updateMultiBlockPreview;
    private applyExtrudeToPositions;
    private computeLinePositions;
    private computeRectanglePositions;
    private clearPreviewMeshes;
    getCanvas(): HTMLCanvasElement;
    private onClick;
    private setSelectedBlock;
    private getModelMaterials;
    private addBlock;
    private removeSelectedBlock;
    private rotateSelectedBlock;
    private updateConnectionPoints;
    private getConnectionPointPosition;
    private handleConnectionPointClick;
    private updateConnectionPointsVisibility;
    private findBlockByMesh;
    private validatePlacement;
    update(_delta: number): void;
    dispose(): void;
}
