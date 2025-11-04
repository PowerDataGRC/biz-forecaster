export declare enum TaggableType {
    GOAL = "goal",
    KPI = "kpi",
    REPORT = "report",
    TASK = "task",
    NOTIFICATION = "notification"
}
export declare enum TargetType {
    ACTIVITY = "activity",
    LINE_ITEM = "line_item"
}
export declare class Taggable {
    id: string;
    taggableId: string;
    taggableType: TaggableType;
    targetId: string;
    targetType: TargetType;
}
