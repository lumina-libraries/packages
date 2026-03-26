import { ItemType } from '../../inventory/src/types/enums';
import { EventDispatcher } from "three";
/** The DefaulSource is a basic item in an invintory */
export declare class DefaultSource<K extends {} = {}> extends EventDispatcher<K> {
    itemType: ItemType;
    static readonly NET_SCHEME: {
        readonly UUID: 0;
        readonly ITEM_TYPE: 1;
    };
    uuid: string;
    /** The name of the item */
    name?: string;
    /** The description of the item */
    description?: string;
    /** The icon of the item */
    icon?: string | null;
    /** The type of the item */
    type?: string | null;
    constructor();
    set(
    /** The name of the item */
    name: string, 
    /** The description of the item */
    description: string, 
    /** The icon of the item */
    icon?: string | null, 
    /** The type of the item */
    type?: string | null, 
    /** The type of the item */
    itemType?: ItemType): void;
    toArray(): [uuid: string, itemType: ItemType, ...any[]];
    fromArray(array: ReturnType<DefaultSource["toArray"]>): void;
}
