import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { Tenant } from '../tenants/tenant.entity';
import { Location } from '../locations/location.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';
import { Client } from '../clients/client.entity';
import { Notification } from '../notifications/notification.entity';
import { Report } from '../reports/report.entity';
import { Task } from '../tasks/task.entity';
import { BizForecast } from '../biz_forecasts/biz_forecast.entity';

export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    MEMBER = 'member',
}

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended',
}

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @ManyToOne(() => Tenant, tenant => tenant.users)
    @JoinColumn({ name: 'tenant_id' })
    tenant: Tenant;

    @ManyToOne(() => Location, location => location.users, { nullable: true })
    @JoinColumn({ name: 'location_id' })
    location: Location;

    @OneToMany(() => Client, client => client.user)
    clients: Client[];

    @OneToMany(() => AuditLog, auditLog => auditLog.user)
    audit_logs: AuditLog[];

    @OneToMany(() => BizForecast, bizForecast => bizForecast.user)
    biz_forecasts: BizForecast[];

    @OneToMany(() => Notification, notification => notification.user)
    notifications: Notification[];

    @OneToMany(() => Report, report => report.generated_by)
    reports: Report[];

    @OneToMany(() => Task, task => task.assigned_to)
    tasks: Task[];

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password_hash: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.MEMBER,
    })
    role: UserRole;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE,
    })
    status: UserStatus;

    @Column({ nullable: true })
    last_login: Date;

    @Column({ default: false })
    is_verified: boolean;

    @Column({ nullable: true })
    verification_token: string;
}
