import { Events } from "../events";
export declare enum ViewMode {
    View = 0,
    Edit = 1
}
export interface ViewOptions {
    mode: ViewMode;
    view: number;
}
export declare class ViewEvent extends Events<ViewOptions> {
    static type: string;
    static dispatch(options: ViewOptions): void;
    constructor(options: ViewOptions);
}
