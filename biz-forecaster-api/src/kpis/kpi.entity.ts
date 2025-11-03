import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { BusinessPlan } from '../business_plans/business-plan.entity';

@Entity('kpis')
export class Kpi extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    kpi_id: string;

    @ManyToOne(() => BusinessPlan)
    business_plan: BusinessPlan;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column()
    target_value: string;

    @Column()
    actual_value: string;

    @Column({ type: 'date' })
    target_date: Date;
}
