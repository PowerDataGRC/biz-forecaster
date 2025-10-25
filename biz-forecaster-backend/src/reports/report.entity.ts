import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { BusinessPlan } from '../business_plans/business_plan.entity';
import { User } from '../users/user.entity';

@Entity('reports')
export class Report extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    report_id: string;

    @ManyToOne(() => BusinessPlan, businessPlan => businessPlan.reports)
    business_plan: BusinessPlan;

    @ManyToOne(() => User, user => user.reports)
    generated_by: User;

    @Column()
    name: string;

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @Column('jsonb')
    data: Record<string, unknown>;
}
