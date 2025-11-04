import { TaggablesService } from './taggables.service';
import { TaggableType } from './taggable.entity';
export declare class TaggablesController {
    private readonly taggablesService;
    constructor(taggablesService: TaggablesService);
    findActivities(taggableId: string, taggableType: TaggableType): Promise<import("./taggable.entity").Taggable[]> | {
        error: string;
    };
}
