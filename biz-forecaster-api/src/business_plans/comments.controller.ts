import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';

@Controller('business-plans/:planId/comments')
@UseGuards(FirebaseAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body(ValidationPipe) createDto: CreateCommentDto, @CurrentUser() user: DecodedIdToken) {
    return this.commentsService.create(createDto, user.uid);
  }

  @Get()
  findAll(@Param('planId', ParseUUIDPipe) planId: string) {
    return this.commentsService.findAllByPlan(planId);
  }
}