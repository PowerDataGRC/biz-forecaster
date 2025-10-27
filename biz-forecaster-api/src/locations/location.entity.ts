import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import { User } from '../users/user.entity';

export enum LocationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('locations')
@Index(['tenant', 'name'], { unique: true })
export class Location {
  @PrimaryGeneratedColumn('uuid')
  location_id!: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;

  @Column()
  name!: string;

  @Column('text', { nullable: true })
  address!: string | null;

  @Column({ type: 'enum', enum: LocationStatus, default: LocationStatus.ACTIVE })
  status!: LocationStatus;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => User, (user) => user.location)
  users!: User[];
}