import { NotificationsService } from './notifications.service';
import { DecodedIdToken } from 'firebase-admin/auth';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(user: DecodedIdToken): Promise<import("./notification.entity").Notification[]>;
    markAsRead(id: string, user: DecodedIdToken): Promise<import("./notification.entity").Notification>;
}
