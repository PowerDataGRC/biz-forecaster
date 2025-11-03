import { Entity, 
         PrimaryGeneratedColumn, 
         Column, 
         ManyToOne, 
         JoinColumn, 
         CreateDateColumn, 
         Index } from 'typeorm';
import { User } from './user.entity';
import { Tenant } from '../tenants/tenant.entity';

@Entity('user_sessions')
export class UserSession {
  @PrimaryGeneratedColumn('uuid')
  session_id!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Index()
  user!: User;

  // This table lives in the public schema, so it needs a tenant_id
  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  @Index()
  tenant!: Tenant;

  @Column()
  token_hash!: string;

  @Column('timestamp')
  expires_at!: Date;

  @CreateDateColumn()
  created_at!: Date;
}