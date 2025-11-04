import { UserRole } from 'src/users/user.entity';
export declare class CreateUserDto {
    user_id?: string;
    tenant_id: string;
    username: string;
    email: string;
    password: string;
    password_hash?: string;
    first_name: string;
    last_name: string;
    role?: UserRole;
}
