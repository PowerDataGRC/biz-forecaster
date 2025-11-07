import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserRole, UserStatus } from './user.entity';

@Entity('users') // This will map to the 'users' table in the tenant schema
export class TenantUser {
    @PrimaryColumn()
    user_id: string;

    @Column({ nullable: true })
    first_name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password_hash: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE,
    })
    status: UserStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
