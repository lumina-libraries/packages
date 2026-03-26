export interface AIConfig {
    perception: {
        maxSightDistance: number;
        fieldOfView: number;
        memoryDuration: number;
        updateInterval: number;
    };
    combat: {
        preferredEngagementRange: number;
        maxEngagementRange: number;
        minEngagementRange: number;
        burstLength: {
            min: number;
            max: number;
        };
        burstCooldown: {
            min: number;
            max: number;
        };
        aimSettleTime: number;
        reloadThreshold: number;
        safeReloadDistance: number;
        shootingRate: number;
    };
    navigation: {
        waypointReachRadius: number;
        pathRequestInterval: number;
        stuckCheckInterval: number;
        stuckThreshold: number;
        maxStuckRetries: number;
        facingThreshold: number;
        corneringBias: number;
    };
    patrol: {
        waypointPauseTime: number;
        scanDuration: number;
        waypointRefreshInterval: number;
    };
    utility: {
        updateInterval: number;
    };
}
export declare const defaultAIConfig: AIConfig;
