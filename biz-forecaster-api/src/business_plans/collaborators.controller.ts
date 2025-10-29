import { Controller, UseGuards, Post, Body, ValidationPipe, Get, Param, ParseUUIDPipe, Delete } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';

@Controller('business-plans/:planId/collaborators')
@UseGuards(FirebaseAuthGuard)
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Post()
  create(
    @Param('planId', ParseUUIDPipe) planId: string,
    @Body(ValidationPipe) createDto: CreateCollaboratorDto,
    @CurrentUser() user: DecodedIdToken,
  ) {
    return this.collaboratorsService.create(planId, createDto, user.uid);
  }

  @Get()
  findAll(@Param('planId', ParseUUIDPipe) planId: string) {
    return this.collaboratorsService.findAllByPlan(planId);
  }
}