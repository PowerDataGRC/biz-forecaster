import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { User } from '../users/user.entity';

@Entity('audit_logs')
export class AuditLog extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    log_id: string;

    @ManyToOne(() => User, user => user.audit_logs)
    user: User;

    @Column()
    action: string;

    @Column('jsonb')
    details: Record<string, unknown>;

    @Column()
    ip_address: string;
}
