import { Controller, UseGuards, Get, Patch, Param, ParseUUIDPipe } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { NotificationsService } from './notifications.service';
import { CurrentUser } from '../auth/current-user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';

@Controller('notifications')
@UseGuards(FirebaseAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  /**
   * GET /api/notifications
   * Retrieves all notifications for the currently authenticated user.
   */
  @Get()
  findAll(@CurrentUser() user: DecodedIdToken) {
    return this.notificationsService.findAllForUser(user.uid);
  }

  /**
   * PATCH /api/notifications/:id/read
   * Marks a specific notification as read.
   */
  @Patch(':id/read')
  markAsRead(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: DecodedIdToken) {
    return this.notificationsService.markAsRead(id, user.uid);
  }
}
