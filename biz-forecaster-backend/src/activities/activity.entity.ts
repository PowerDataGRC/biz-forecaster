import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { User } from '../users/user.entity';
import { Client } from '../clients/client.entity';

@Entity('activities')
export class Activity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    activity_id: string;

    @ManyToOne(() => User, user => user.activities)
    user: User;

    @ManyToOne(() => Client, client => client.activities, { nullable: true })
    client: Client;

    @Column()
    activity_type: string;

    @Column('text')
    description: string;

    @Column({ type: 'timestamp' })
    start_time: Date;

    @Column({ type: 'timestamp', nullable: true })
    end_time: Date;
}
