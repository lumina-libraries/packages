import { EventDispatcher } from "three";
export declare enum CosmeticKind {
    WEAPON = "WEAPON"
}
export declare enum Rarity {
    COMMON = "COMMON",
    RARE = "RARE",
    EPIC = "EPIC",
    LEGENDARY = "LEGENDARY"
}
export interface WeaponCosmeticData {
    uri: string;
    weaponIds: string[];
    data: any;
}
export interface CosmeticRawData {
    id: string;
    kind: CosmeticKind;
    slug: string;
    displayName: string;
    rarity: Rarity;
    tags: string[];
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
    weapon?: WeaponCosmeticData;
}
export interface CosmeticOwnershipRawData {
    id: number;
    userId: number;
    cosmeticId: string;
    acquiredAt: Date;
    cosmetic: CosmeticRawData;
}
export interface CosmeticsListParams {
    page?: number;
    limit?: number;
    kind?: CosmeticKind;
    rarity?: Rarity;
    search?: string;
    tag?: string;
}
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare class Cosmetic extends EventDispatcher<{
    updated: {
        cosmetic: CosmeticRawData;
    };
}> {
    id: string;
    raw?: CosmeticRawData;
    static list: Map<string, Cosmetic>;
    static fromRaw(raw: CosmeticRawData): Cosmetic;
    free(): void;
    setRaw(raw?: CosmeticRawData): this;
    constructor(id: string, raw?: CosmeticRawData);
    /**
     * Fetch all cosmetics with optional filters
     */
    static fetchAll(params?: CosmeticsListParams): Promise<PaginatedResponse<CosmeticRawData>>;
    /**
     * Fetch a specific cosmetic by ID or slug
     */
    static fetch(idOrSlug: string): Promise<Cosmetic>;
    /**
     * Fetch cosmetics owned by a user
     */
    static fetchUserCosmetics(userId: number | "@me"): Promise<CosmeticOwnershipRawData[]>;
    refresh(): Promise<this>;
    get kind(): CosmeticKind | undefined;
    get slug(): string | undefined;
    get displayName(): string | undefined;
    get rarity(): Rarity | undefined;
    get tags(): string[] | undefined;
    get thumbnail(): string | undefined;
    get weapon(): WeaponCosmeticData | undefined;
    get createdAt(): Date | undefined;
    get updatedAt(): Date | undefined;
}
/**
 * Get rarity color for UI display
 */
export declare function getRarityColor(rarity: Rarity): string;
/**
 * Get rarity label for UI display
 */
export declare function getRarityLabel(rarity: Rarity): string;
