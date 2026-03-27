import { type Buffers, BufferType } from "../../types";
export declare class Frame {
    readonly type: typeof BufferType;
    readonly buffers: Map<BufferType, Buffers[BufferType][]>;
    time: number;
    delta: number;
    deltaTime: number;
    update(time: number, delta: number): void;
    /**
     * Writes a value to the buffer
     * @param buffer
     * @param value
     * @returns
     */
    write<K extends BufferType>(buffer: K, value: Buffers[K]): void;
    toJSON(): [BufferType, (import("../../types").PositionBuffer | import("../../types").RotationBuffer | import("../../types").ScaleBuffer | import("../../types").ObjectValueBuffer | import("../../types").GameStateBuffer)[]][];
    clear(): void;
}
