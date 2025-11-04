import { BaseEntity } from '../shared/base.entity';
import { User } from '../users/user.entity';
export declare class Notification extends BaseEntity {
    notification_id: string;
    user: User;
    message: string;
    is_read: boolean;
}
