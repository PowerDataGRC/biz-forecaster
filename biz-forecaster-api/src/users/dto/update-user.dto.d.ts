import { UserRole, UserStatus } from '../user.entity';
export declare class UpdateUserDto {
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    role?: UserRole;
    status?: UserStatus;
}
