import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Tenant } from '../tenants/tenant.entity';

export enum ClientStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  client_id!: string;

  @ManyToOne(() => User, (user) => user.clients)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;

  @Column()
  name!: string;

  @Column({ nullable: true })
  business_type!: string | null;

  @Column('text', { nullable: true })
  description!: string | null;

  @Column({ type: 'enum', enum: ClientStatus, default: ClientStatus.ACTIVE })
  status!: ClientStatus;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}