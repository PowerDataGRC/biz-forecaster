import { Repository, UpdateResult } from 'typeorm';
import { Notification } from './notification.entity';
export declare class NotificationsService {
    private notificationsRepository;
    constructor(notificationsRepository: Repository<Notification>);
    findAllForUser(userId: string): Promise<Notification[]>;
    markAsRead(notificationId: string, userId: string): Promise<Notification>;
    markAllAsRead(userId: string): Promise<UpdateResult>;
}
