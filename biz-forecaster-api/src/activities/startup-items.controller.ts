import { Controller, UseGuards, Post, Body, ValidationPipe, Get, Param, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { StartupItemsService } from './startup-items.service';
import { CreateStartupItemDto } from './dto/create-startup-item.dto';

@Controller('activities/:activityId/startup-items')
@UseGuards(FirebaseAuthGuard)
export class StartupItemsController {
  constructor(private readonly startupItemsService: StartupItemsService) {}

  @Post()
  create(@Body(ValidationPipe) createStartupItemDto: CreateStartupItemDto) {
    return this.startupItemsService.create(createStartupItemDto);
  }

  @Get()
  findAll(@Param('activityId', ParseUUIDPipe) activityId: string) {
    return this.startupItemsService.findAllByActivity(activityId);
  }

  // Note: GET (one), PATCH, and DELETE endpoints would be added here.
}