import type Client from "../../Client";
export interface Key {
    key: string;
}
export default class KeyboardEventAdapter {
    readonly client: Client;
    readonly keys: {
        [action: string]: Key | Key[];
    };
    setKey(name: string, ...key: Key[]): this;
    constructor(client: Client);
    action(key: string): void;
    map: Map<string, boolean>;
    get ignore(): boolean;
    keydown(event: KeyboardEvent): void;
    keyup(event: KeyboardEvent): void;
    delete(): void;
    copy(): void;
}
