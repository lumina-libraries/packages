import type StoreAdapter from "../../editor/core/adapters/engine/StoreAdapter";
import type { StoreObject } from "../../editor/core/adapters/engine/StoreAdapter";
export declare enum ObjectLinkId {
    Position = 0,
    Scale = 1,
    Quaternion = 2
}
export declare enum ObjectLinkTransform {
    World = 0,
    Local = 1
}
export declare class StoreObjectLink {
    from?: StoreObject;
    to?: StoreObject;
    ids: Array<ObjectLinkId>;
    transform: ObjectLinkTransform;
    id: string;
    name: string | undefined;
    static supported: Array<StoreObject["constructor"]>;
    constructor(from?: StoreObject, to?: StoreObject, ids?: Array<ObjectLinkId>, transform?: ObjectLinkTransform);
    get title(): string;
    updateLocal(): void;
    updateWorld(): void;
    update(): void;
    toJSON(): {
        from: string;
        to: string;
        ids: ObjectLinkId[];
        transform: ObjectLinkTransform;
    };
    static fromJSON(json: ReturnType<StoreObjectLink["toJSON"]>, store: StoreAdapter): StoreObjectLink;
    fromJson(json: ReturnType<StoreObjectLink["toJSON"]>, store: StoreAdapter): void;
}
