export declare enum SubscriptionStatus {
    ACTIVE = "active",
    PAUSED = "paused",
    CANCELED = "canceled",
    TRIAL = "trial"
}
export declare enum SubscriptionPlan {
    MONTHLY = "monthly",
    ANNUAL = "annual"
}
export declare class Subscription {
    id: string;
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    nextRenewalDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
