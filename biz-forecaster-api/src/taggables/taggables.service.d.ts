import { Repository } from 'typeorm';
import { Taggable, TaggableType } from './taggable.entity';
export declare class TaggablesService {
    private readonly taggablesRepository;
    constructor(taggablesRepository: Repository<Taggable>);
    findActivitiesByTaggable(taggableId: string, taggableType: TaggableType): Promise<Taggable[]>;
}
