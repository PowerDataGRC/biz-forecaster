import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  /**
   * Finds all notifications for a specific user, ordered by most recent.
   * @param userId - The ID of the user.
   */
  findAllForUser(userId: string): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { user: { user_id: userId } },
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Marks a single notification as read for a specific user.
   * @param notificationId - The ID of the notification to mark as read.
   * @param userId - The ID of the user who owns the notification.
   */
  async markAsRead(notificationId: string, userId: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOneBy({ notification_id: notificationId, user: { user_id: userId } });
    if (!notification) {
      throw new NotFoundException(`Notification with ID "${notificationId}" not found.`);
    }
    notification.is_read = true;
    return this.notificationsRepository.save(notification);
  }

  /**
   * Marks all unread notifications as read for a specific user.
   * @param userId - The ID of the user.
   */
  markAllAsRead(userId: string): Promise<UpdateResult> {
    return this.notificationsRepository.update({ user: { user_id: userId }, is_read: false }, { is_read: true });
  }
}
