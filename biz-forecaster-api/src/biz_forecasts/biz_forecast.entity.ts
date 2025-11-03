import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class BizForecast {
  @PrimaryGeneratedColumn('uuid')
  forecast_id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('json')
  data: Record<string, unknown>;

  @ManyToOne(() => User)
  user: User;
}
