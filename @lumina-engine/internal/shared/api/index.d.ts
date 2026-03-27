import type { PrismaClient } from "@prisma/client";
export * from "./Clan";
export * from "./Cosmetics";
declare class MatchmakerAPI {
    client: import("axios").AxiosInstance;
    constructor(client?: import("axios").AxiosInstance);
    private getMatchmakerBaseURL;
    set token(token: string);
    get token(): string;
}
export declare const matchmakerApi: MatchmakerAPI;
export declare class API {
    client: import("axios").AxiosInstance;
    prisma?: PrismaClient;
    constructor(client?: import("axios").AxiosInstance, prisma?: PrismaClient);
    set token(token: string);
    get token(): string;
    getSocialUser(token: string, options?: {
        localhost?: boolean;
        host?: string;
    }): Promise<{
        displayName: string;
        username: string;
        id: string;
        avatar: string;
    }>;
    getUserDataFromPrisma(id: number): Promise<UserAccountRawData>;
    getUserOnlineStatus(userId: number): Promise<any>;
    updateOnlineStatus(): Promise<any>;
    setOffline(): Promise<any>;
    getUserStats(userId: UserId): Promise<UserStats>;
}
export declare const api: API;
export declare enum UserAccountStatus {
    Online = 0,
    Offline = 1,
    Away = 2
}
export declare enum UserAccountVoiceChat {
    None = 0,
    Voice = 1
}
export declare enum UserAccountVoiceChatState {
    Nome = 0,
    Speaking = 1
}
export type UserId = number | "@me";
export interface UserAccountRawData {
    avatar?: string;
    id: UserId;
    username: string;
    discriminator: string;
    displayName: string;
    xp: number;
    currency: number;
    /** The status of the player */
    status: UserAccountStatus;
    /** If the player is seeking for a game */
    matchmaking: boolean;
    /** The game ID of the game */
    playing?: string;
    /** The party ID of the party */
    party?: string;
    partyMember?: number;
    /** The clan ID of the user's clan */
    clanId?: number;
    /** The clan tag of the user's clan */
    clanTag?: string;
    isFriend?: boolean;
    voiceChat?: UserAccountVoiceChat;
    voiceChatState?: UserAccountVoiceChatState;
}
export interface UserStats {
    matches: number;
    wins: number;
    score: number;
    kills: number;
    deaths: number;
    headshots: number;
    assists: number;
    kd: number;
    winRate: number;
}
export declare class UserAccount {
    id: UserId;
    raw?: UserAccountRawData;
    manager: API;
    static list: Map<UserId, UserAccount>;
    static fromRaw(raw: UserAccountRawData): void;
    free(): void;
    setRaw(raw?: UserAccountRawData, id?: UserId): this;
    isMe: boolean;
    constructor(id: UserId, raw?: UserAccountRawData, manager?: API);
    static default(): UserAccount;
    static logout(): void;
    static oauth(): Promise<string>;
    static fetch(manager: API, id: UserId): Promise<UserAccount>;
    fetch(id?: UserId): Promise<UserAccount>;
    static getFromPrisma(manager: API, id: number): Promise<UserAccount>;
    getFromPrisma(id: number): Promise<UserAccount>;
    get avatar(): string;
    get username(): string;
    get displayName(): string;
    get xp(): number;
    get currency(): number;
    get discriminator(): string;
    get level(): number;
    get progressLevel(): number;
    get status(): UserAccountStatus;
    get matchmaking(): boolean;
    get playing(): string;
    get party(): string;
    get isFriend(): boolean;
    get isOnline(): boolean;
    get isOffline(): boolean;
    get isAway(): boolean;
    get isPlaying(): boolean;
    get isMatchmaking(): boolean;
    get isInParty(): boolean;
    get partyMember(): number;
    get clanId(): number;
    get clanTag(): string;
    getStats(): Promise<UserStats | null>;
    peerId: string | undefined;
    get voiceChat(): boolean;
    set voiceChat(voiceChat: boolean);
    get isInMyParty(): boolean;
}
