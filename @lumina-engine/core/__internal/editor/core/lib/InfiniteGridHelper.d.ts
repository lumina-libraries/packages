import { Color, Mesh, PlaneGeometry, ShaderMaterial } from "three";
export declare class InfiniteGridHelper extends Mesh<PlaneGeometry, ShaderMaterial> {
    size1: number;
    size2: number;
    color: Color;
    distance: number;
    axes: string;
    constructor(size1?: number, size2?: number, color?: Color, distance?: number, axes?: string);
    update(): void;
}
