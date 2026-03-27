import { Events } from "../events";
export interface User {
    id: string;
    username: string;
    session: string;
}
export interface ShareOptions {
    visibility?: "public" | "private";
    shared?: {
        id: string;
    };
    stop?: boolean;
    inviteRequest?: User;
    acceptInvite?: string;
    declineInvite?: string;
    joined?: string;
    declined?: string;
    join?: string;
    addUser?: User;
    ended?: boolean;
    removeUser?: {
        id: string;
    };
    userData?: User;
    cursors?: Array<[string, [number, number] | false]>;
}
export declare class ShareEvent extends Events<ShareOptions> {
    static type: string;
    static currentOptions: ShareOptions;
    static users: Map<string, User>;
    static dispatch(options: ShareOptions): void;
    constructor(options: ShareOptions);
}
