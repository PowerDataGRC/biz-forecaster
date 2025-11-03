import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@Controller('activities')
@UseGuards(FirebaseAuthGuard) // Protect all routes in this controller
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.activitiesService.findOne(id);
  }
}