import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  Index,
} from 'typeorm';

export enum TenantStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive',
}

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  tenant_id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  subdomain!: string;

  @Column({ name: 'schema_name', unique: true })
  @Index()
  schemaName: string;

  @Column({
    type: 'enum',
    enum: TenantStatus,
    default: TenantStatus.ACTIVE,
  })
  status: TenantStatus;

  @Column({ type: 'jsonb', nullable: true })
  settings!: Record<string, any>;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}