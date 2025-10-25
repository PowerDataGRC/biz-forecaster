import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { Tenant } from '../tenants/tenant.entity';

@Entity('settings')
export class Setting extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    setting_id: string;

    @ManyToOne(() => Tenant, tenant => tenant.settings)
    tenant: Tenant;

    @Column()
    key: string;

    @Column()
    value: string;
}
