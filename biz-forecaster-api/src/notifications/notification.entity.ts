import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { User } from '../users/user.entity';

@Entity('notifications')
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    notification_id: string;

    @ManyToOne(() => User)
    user: User;

    @Column()
    message: string;

    @Column({ default: false })
    is_read: boolean;
}
