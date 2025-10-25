import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { Tenant } from '../tenants/tenant.entity';
import { User } from '../users/user.entity';

export enum LocationStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

@Entity('locations')
@Unique(['tenant', 'name'])
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    location_id: string;

    @ManyToOne(() => Tenant, tenant => tenant.locations)
    tenant: Tenant;

    @Column()
    name: string;

    @Column('text')
    address: string;

    @Column({
        type: 'enum',
        enum: LocationStatus,
        default: LocationStatus.ACTIVE,
    })
    status: LocationStatus;

    @OneToMany(() => User, user => user.location)
    users: User[];
}
