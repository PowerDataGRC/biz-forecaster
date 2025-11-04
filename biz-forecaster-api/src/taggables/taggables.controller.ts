import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TaggablesService } from './taggables.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { TaggableType } from './taggable.entity';

@Controller('tags')

export class TaggablesController {
  constructor(private readonly taggablesService: TaggablesService) {}

  @Get(':taggableType/:taggableId/activities')
  findActivities(
    @Param('taggableId', ParseUUIDPipe) taggableId: string,
    @Param('taggableType') taggableType: TaggableType,
  ) {
    // Basic validation to ensure taggableType is one of the allowed enum values
    if (!Object.values(TaggableType).includes(taggableType)) {
        // Or throw a BadRequestException
        return { error: 'Invalid taggable type' };
    }
    return this.taggablesService.findActivitiesByTaggable(taggableId, taggableType);
  }
}