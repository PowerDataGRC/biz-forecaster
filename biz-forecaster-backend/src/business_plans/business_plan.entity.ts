import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { Client } from '../clients/client.entity';
import { Goal } from '../goals/goal.entity';
import { Report } from '../reports/report.entity';
import { Kpi } from '../kpis/kpi.entity';
import { Document } from '../documents/document.entity';

export enum PlanStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    ARCHIVED = 'archived',
}

@Entity('business_plans')
export class BusinessPlan extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    plan_id: string;

    @ManyToOne(() => Client, client => client.business_plans)
    client: Client;

    @OneToMany(() => Goal, goal => goal.business_plan)
    goals: Goal[];

    @OneToMany(() => Report, report => report.business_plan)
    reports: Report[];

    @OneToMany(() => Kpi, kpi => kpi.business_plan)
    kpis: Kpi[];

    @OneToMany(() => Document, document => document.business_plan)
    documents: Document[];

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @Column({
        type: 'enum',
        enum: PlanStatus,
        default: PlanStatus.DRAFT,
    })
    status: PlanStatus;
}
