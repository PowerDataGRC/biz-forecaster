import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('clients')
@Index(['tenantSchema', 'id']) // Index for efficient lookups within a tenant
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ name: 'tenant_schema' })
  tenantSchema: string;

  // This defines the inverse side of the relationship from the User entity.
  @ManyToOne(() => User, (user) => user.clients)
  user: User;
}