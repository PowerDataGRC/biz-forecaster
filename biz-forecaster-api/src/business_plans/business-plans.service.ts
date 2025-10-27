import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { BusinessPlan } from './business-plan.entity';
import { CreateBusinessPlanDto } from './dto/create-business-plan.dto';
import { UpdateBusinessPlanDto } from './dto/update-business-plan.dto';
import { Activity } from '../activities/activity.entity';
import { Tenant } from '../tenants/tenant.entity';
import { User } from '../users/user.entity';
import { BusinessPlanTemplate } from './business-plan-template.entity';
import { BusinessPlanSection } from './business-plan-section.entity';

@Injectable()
export class BusinessPlansService {
  constructor(
    @InjectRepository(BusinessPlan)
    private readonly businessPlanRepository: Repository<BusinessPlan>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(BusinessPlanTemplate)
    private readonly templateRepository: Repository<BusinessPlanTemplate>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createBusinessPlanDto: CreateBusinessPlanDto): Promise<BusinessPlan> {
    // Use a transaction to ensure the plan and its sections are created atomically.
    return this.entityManager.transaction(async (transactionalEntityManager) => {
      const { activity_id, tenant_id, user_id, template_id, ...rest } = createBusinessPlanDto;

      // Validate foreign keys
      const [activity, tenant, user] = await Promise.all([
        this.activityRepository.findOneBy({ activity_id }),
        this.tenantRepository.findOneBy({ tenant_id }),
        this.userRepository.findOneBy({ user_id }),
      ]);

      if (!activity) throw new NotFoundException(`Activity with ID "${activity_id}" not found`);
      if (!tenant) throw new NotFoundException(`Tenant with ID "${tenant_id}" not found`);
      if (!user) throw new NotFoundException(`User with ID "${user_id}" not found`);

      let template: BusinessPlanTemplate | null = null;
      if (template_id) {
        template = await this.templateRepository.findOneBy({ template_id });
        if (!template) throw new NotFoundException(`Template with ID "${template_id}" not found`);
      }

      const newPlan = transactionalEntityManager.create(BusinessPlan, {
        ...rest,
        activity,
        tenant,
        user,
        template,
      });

      const savedPlan = await transactionalEntityManager.save(newPlan);

      // If a template was used, create the sections from its structure
      if (template && template.structure && Array.isArray(template.structure)) {
        const sectionsToCreate = template.structure.map((sectionDef: any, index: number) => {
          if (!sectionDef.type || !sectionDef.title) {
            throw new InternalServerErrorException('Template structure is invalid.');
          }
          return transactionalEntityManager.create(BusinessPlanSection, {
            plan: savedPlan,
            section_type: sectionDef.type,
            title: sectionDef.title,
            content: sectionDef.defaultContent || '',
            order_index: index,
          });
        });
        await transactionalEntityManager.save(sectionsToCreate);
      }

      // Re-fetch the plan with its sections to return the complete object
      return transactionalEntityManager.findOneOrFail(BusinessPlan, {
        where: { plan_id: savedPlan.plan_id },
        relations: ['activity', 'tenant', 'user', 'template', 'sections'],
      });
    });
  }

  findAll(): Promise<BusinessPlan[]> {
    return this.businessPlanRepository.find({ relations: ['activity', 'user', 'tenant'] });
  }

  async findOne(id: string): Promise<BusinessPlan> {
    const plan = await this.businessPlanRepository.findOne({
      where: { plan_id: id },
      relations: ['activity', 'user', 'tenant', 'template', 'sections'],
    });
    if (!plan) {
      throw new NotFoundException(`BusinessPlan with ID "${id}" not found`);
    }
    return plan;
  }

  async update(id: string, updateBusinessPlanDto: UpdateBusinessPlanDto): Promise<BusinessPlan> {
    // The `preload` method creates a new entity based on the object passed into it.
    // It first checks if an entity with the given ID exists in the database.
    const plan = await this.businessPlanRepository.preload({
      plan_id: id,
      ...updateBusinessPlanDto,
    });

    if (!plan) {
      throw new NotFoundException(`BusinessPlan with ID "${id}" not found`);
    }

    return this.businessPlanRepository.save(plan);
  }

  async remove(id: string): Promise<void> {
    const result = await this.businessPlanRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`BusinessPlan with ID "${id}" not found`);
    }
  }
}