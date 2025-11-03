import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { BusinessPlan } from '../business_plans/business-plan.entity';
import { Task } from '../tasks/task.entity';

export enum GoalStatus {
    NOT_STARTED = 'not_started',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    ON_HOLD = 'on_hold',
}

@Entity('goals')
export class Goal extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    goal_id: string;

    @ManyToOne(() => BusinessPlan)
    business_plan: BusinessPlan;

    @OneToMany(() => Task, task => task.goal)
    tasks: Task[];

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column({ type: 'date' })
    target_date: Date;

    @Column({
        type: 'enum',
        enum: GoalStatus,
        default: GoalStatus.NOT_STARTED,
    })
    status: GoalStatus;
}
