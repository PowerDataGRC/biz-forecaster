import { User } from '../users/user.entity';
export declare class UserSession {
    id: string;
    user: User;
    expires_at: Date;
    created_at: Date;
}
