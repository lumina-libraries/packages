import { EventDispatcher } from "three";
export type ClanId = number;
export declare enum ClanPrivacy {
    OPEN = "OPEN",
    INVITE_ONLY = "INVITE_ONLY",
    CLOSED = "CLOSED"
}
export declare enum ClanMemberRole {
    LEADER = "LEADER",
    OFFICER = "OFFICER",
    MEMBER = "MEMBER",
    RECRUIT = "RECRUIT"
}
export declare enum ClanJoinRequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export interface ClanRawData {
    id: ClanId;
    name: string;
    tag: string;
    motto?: string;
    description?: string;
    privacy: ClanPrivacy;
    level: number;
    xp: number;
    totalWins: number;
    totalLosses: number;
    totalKills: number;
    totalDeaths: number;
    ownerId: number;
    creatorId: number;
    createdAt: Date;
    updatedAt: Date;
    members?: ClanMemberRawData[];
    owner?: {
        id: number;
        username: string;
        discriminator: string;
        avatar?: string;
    };
}
export interface ClanMemberRawData {
    id: number;
    clanId: ClanId;
    userId: number;
    role: ClanMemberRole;
    contributedXp: number;
    contributedWins: number;
    contributedLosses: number;
    contributedKills: number;
    contributedDeaths: number;
    canKick: boolean;
    canInvite: boolean;
    canPromote: boolean;
    canManageWars: boolean;
    canAnnounce: boolean;
    joinedAt: Date;
    user?: {
        id: number;
        username: string;
        discriminator: string;
        avatar?: string;
        lastOnline: Date;
        isOnline: boolean;
    };
}
export interface ClanJoinRequestRawData {
    id: string;
    clanId: ClanId;
    userId: number;
    message?: string;
    status: ClanJoinRequestStatus;
    reviewedBy?: number;
    reviewedAt?: Date;
    responseNote?: string;
    createdAt: Date;
    user?: {
        id: number;
        username: string;
        discriminator: string;
        avatar?: string;
    };
}
export interface ClanAnnouncementRawData {
    id: string;
    clanId: ClanId;
    authorId: number;
    title: string;
    content: string;
    pinned: boolean;
    createdAt: Date;
    updatedAt: Date;
    author?: {
        id: number;
        username: string;
        discriminator: string;
        avatar?: string;
    };
}
export interface ClanMemberStatus {
    online: number;
    offline: number;
    inGame: number;
}
export interface ClanMatchMemberSummary {
    userId: number;
    username: string;
    discriminator: string;
    avatar?: string;
    score: number;
    kills: number;
    deaths: number;
    victory: boolean;
}
export interface ClanMatchSummary {
    matchId: number;
    startedAt: Date;
    endedAt: Date;
    duration: number;
    map?: {
        id: number;
        name: string;
    } | null;
    topMembers: ClanMatchMemberSummary[];
    totals: {
        participants: number;
        kills: number;
        deaths: number;
        score: number;
        victories: number;
    };
}
export interface ClanHealthSummary {
    attendance: {
        activeMembers: number;
        totalMembers: number;
        rate: number;
    };
    recent: {
        matches: number;
        wins: number;
        winRate: number;
        uniqueParticipants: number;
    };
    averages: {
        killsPerMatch: number;
        scorePerMatch: number;
    };
}
export interface ClanInsights {
    topMaps: Array<{
        mapId: number;
        name: string;
        matches: number;
    }>;
    topWeapons: Array<{
        weapon: string;
        kills: number;
    }>;
}
export interface TopContributorEntry {
    userId: number;
    username: string;
    discriminator: string;
    avatar?: string;
    role: ClanMemberRole;
    contributedXp: number;
    contributedWins: number;
    contributedLosses: number;
    contributedKills: number;
    contributedDeaths: number;
}
export type ContributorMetric = 'contributedXp' | 'contributedWins' | 'contributedLosses' | 'contributedKills' | 'contributedDeaths';
export interface ClanLeaderboardEntry {
    id: number;
    name: string;
    tag: string;
    level: number;
    xp: number;
    totalWins: number;
    totalLosses: number;
    totalKills: number;
    totalDeaths: number;
    memberCount: number;
}
export type ClanLeaderboardSort = 'xp' | 'level' | 'totalWins' | 'totalKills' | 'totalDeaths' | 'memberCount' | 'createdAt' | 'updatedAt';
export interface ClanLeaderboardParams {
    sortBy?: ClanLeaderboardSort;
    order?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
    privacy?: ClanPrivacy;
}
export declare class Clan extends EventDispatcher<{
    updated: {
        clan: ClanRawData;
    };
    memberJoined: {
        member: ClanMemberRawData;
    };
    memberLeft: {
        member: ClanMemberRawData;
    };
    memberUpdated: {
        member: ClanMemberRawData;
    };
    announcement: {
        announcement: ClanAnnouncementRawData;
    };
}> {
    id: ClanId;
    raw?: ClanRawData;
    static list: Map<ClanId, Clan>;
    static fromRaw(raw: ClanRawData): Clan;
    free(): void;
    setRaw(raw?: ClanRawData): this;
    constructor(id: ClanId, raw?: ClanRawData);
    static getUserClan(userId?: number): Promise<Clan | null>;
    static create(data: {
        name: string;
        tag: string;
        motto?: string;
        description?: string;
        privacy?: ClanPrivacy;
    }): Promise<Clan>;
    static fetch(id: ClanId): Promise<Clan>;
    static fetchByTag(tag: string): Promise<Clan>;
    static fetchLeaderboard(params?: ClanLeaderboardParams): Promise<ClanLeaderboardEntry[]>;
    update(data: {
        name?: string;
        tag?: string;
        motto?: string;
        description?: string;
        privacy?: ClanPrivacy;
    }): Promise<this>;
    delete(): Promise<void>;
    refresh(): Promise<this>;
    getMembers(status?: 'online' | 'offline' | 'ingame'): Promise<ClanMemberRawData[]>;
    getMemberStatus(): Promise<ClanMemberStatus>;
    updateMemberRole(memberId: number, role: ClanMemberRole): Promise<ClanMemberRawData>;
    removeMember(memberId: number): Promise<void>;
    leave(): Promise<void>;
    transferOwnership(newOwnerId: number): Promise<this>;
    createJoinRequest(message?: string): Promise<ClanJoinRequestRawData>;
    getJoinRequests(status?: ClanJoinRequestStatus): Promise<ClanJoinRequestRawData[]>;
    static reviewJoinRequest(requestId: string, action: 'approve' | 'reject', responseNote?: string): Promise<ClanJoinRequestRawData>;
    createAnnouncement(title: string, content: string, pinned?: boolean): Promise<ClanAnnouncementRawData>;
    getAnnouncements(limit?: number): Promise<ClanAnnouncementRawData[]>;
    getRecentMatches(limit?: number): Promise<ClanMatchSummary[]>;
    getTopContributors(limit?: number, metric?: ContributorMetric): Promise<TopContributorEntry[]>;
    getHealth(days?: number, matchesDays?: number): Promise<ClanHealthSummary>;
    getInsights(days?: number, limit?: number): Promise<ClanInsights>;
    static updateAnnouncement(announcementId: string, data: {
        title?: string;
        content?: string;
        pinned?: boolean;
    }): Promise<ClanAnnouncementRawData>;
    static deleteAnnouncement(announcementId: string): Promise<void>;
    get name(): string | undefined;
    get tag(): string | undefined;
    get motto(): string | undefined;
    get description(): string | undefined;
    get privacy(): ClanPrivacy | undefined;
    get level(): number | undefined;
    get xp(): number | undefined;
    get totalWins(): number | undefined;
    get totalLosses(): number | undefined;
    get totalKills(): number | undefined;
    get totalDeaths(): number | undefined;
    get ownerId(): number | undefined;
    get creatorId(): number | undefined;
    get members(): ClanMemberRawData[] | undefined;
    get owner(): {
        id: number;
        username: string;
        discriminator: string;
        avatar?: string;
    } | undefined;
    get createdAt(): Date | undefined;
    get updatedAt(): Date | undefined;
    getMember(userId: number): ClanMemberRawData | undefined;
    isOwner(userId: number): boolean;
    isMember(userId: number): boolean;
    canManage(userId: number): boolean;
    get winRate(): number;
    get kdr(): number;
}
export declare class ClanMember {
    id: number;
    raw?: ClanMemberRawData;
    static list: Map<number, ClanMember>;
    static fromRaw(raw: ClanMemberRawData): ClanMember;
    free(): void;
    setRaw(raw?: ClanMemberRawData): this;
    constructor(id: number, raw?: ClanMemberRawData);
    get clanId(): ClanId | undefined;
    get userId(): number | undefined;
    get role(): ClanMemberRole | undefined;
    get contributedXp(): number | undefined;
    get contributedWins(): number | undefined;
    get contributedLosses(): number | undefined;
    get contributedKills(): number | undefined;
    get contributedDeaths(): number | undefined;
    get canKick(): boolean | undefined;
    get canInvite(): boolean | undefined;
    get canPromote(): boolean | undefined;
    get canManageWars(): boolean | undefined;
    get canAnnounce(): boolean | undefined;
    get joinedAt(): Date | undefined;
    get user(): {
        id: number;
        username: string;
        discriminator: string;
        avatar?: string;
        lastOnline: Date;
        isOnline: boolean;
    } | undefined;
    get isOnline(): boolean;
    get contributedWinRate(): number;
    get contributedKdr(): number;
}
export declare function calculateKdr(kills?: number, deaths?: number): number;
