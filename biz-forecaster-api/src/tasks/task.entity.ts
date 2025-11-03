import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { Goal } from '../goals/goal.entity';
import { User } from '../users/user.entity';

export enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}

@Entity('tasks')
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    task_id: string;

    @ManyToOne(() => Goal, goal => goal.tasks)
    goal: Goal;

    @ManyToOne(() => User, { nullable: true })
    assigned_to: User;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column({ type: 'date' })
    due_date: Date;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.PENDING,
    })
    status: TaskStatus;
}
