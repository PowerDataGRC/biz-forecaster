import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
// import { BaseEntity } from '../shared/base.entity'; // Assuming this contains created_at and updated_at
import { Tenant } from '../tenants/tenant.entity';
import { Location } from '../locations/location.entity';


export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    USER = 'user',
}

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended',
}

@Entity('users')
export class User {
    // This must be a PrimaryColumn, not a generated one, because we are using
    // the UID from Firebase Authentication as the user's unique identifier.
    @PrimaryColumn()
    user_id!: string;

    // Each user belongs to a tenant (public schema relation). This column
    // stores which tenant the user was created under.
    @ManyToOne(() => Tenant, { nullable: false })
    @JoinColumn({ name: 'tenant_id' })
    tenant!: Tenant;

    @ManyToOne(() => Location, { nullable: true })
    @JoinColumn({ name: 'location_id' })
    location!: Location | null;
    
/***** this relationship creates circular dependency issues ***** 
    @OneToMany(() => Client, client => client.user)
    clients!: Client[];
*/

/*
    // This relationship crosses from a public entity (User) to a tenant-specific entity (AuditLog)
    // and causes startup errors. It must be removed from the public entity definition.
    @OneToMany(() => AuditLog, auditLog => auditLog.user)
    audit_logs!: AuditLog[];
*/

/* The following relationships are from a public entity (User) to private, tenant-specific
   entities. They break the architectural separation and must be removed to prevent startup errors. */
/*
    @OneToMany(() => BizForecast, bizForecast => bizForecast.user)
    biz_forecasts!: BizForecast[];

    @OneToMany(() => Notification, notification => notification.user)
    notifications!: Notification[];
 
    @OneToMany(() => Task, task => task.assigned_to)
    tasks!: Task[];
*/
    @Column({ nullable: true })
    first_name!: string;

    @Column({ nullable: true })
    last_name!: string;

    @Column({ unique: true })
    username!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password_hash!: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role!: UserRole;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE,
    })
    status!: UserStatus;

    @Column({ nullable: true })
    last_login!: Date | null;

    @Column({ default: false })
    is_verified!: boolean;

    @Column({ nullable: true })
    verification_token!: string | null;

    @Column({ nullable: true, select: false }) // select: false prevents it from being returned in queries by default
    otp_secret!: string | null;

    @Column({ type: 'jsonb', nullable: true, select: false })
    otp_recovery_codes!: string[] | null;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
