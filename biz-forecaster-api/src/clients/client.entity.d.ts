import { User } from '../users/user.entity';
export declare class Client {
    client_id: string;
    user: User;
    name: string;
    email: string;
    phone?: string;
    created_at: Date;
    updated_at: Date;
}
