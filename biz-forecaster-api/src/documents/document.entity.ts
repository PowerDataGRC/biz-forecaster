import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { BusinessPlan } from '../business_plans/business-plan.entity';

@Entity('documents')
export class Document extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    document_id: string;

    @ManyToOne(() => BusinessPlan)
    business_plan: BusinessPlan;

    @Column()
    name: string;

    @Column()
    file_path: string;

    @Column()
    file_type: string;
}
