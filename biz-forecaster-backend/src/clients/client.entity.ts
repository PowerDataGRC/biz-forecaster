import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { User } from '../users/user.entity';
import { BusinessPlan } from '../business_plans/business_plan.entity';
import { Activity } from '../activities/activity.entity';

export enum ClientStatus {
    ACTIVE = 'active',
    ARCHIVED = 'archived',
}

@Entity('clients')
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    client_id: string;

    @ManyToOne(() => User, user => user.clients)
    user: User;

    @OneToMany(() => BusinessPlan, businessPlan => businessPlan.client)
    business_plans: BusinessPlan[];

    @OneToMany(() => Activity, activity => activity.client)
    activities: Activity[];

    @Column()
    name: string;

    @Column()
    business_type: string;

    @Column('text')
    description: string;

    @Column({
        type: 'enum',
        enum: ClientStatus,
        default: ClientStatus.ACTIVE,
    })
    status: ClientStatus;
}
