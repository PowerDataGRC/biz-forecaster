"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPlansService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const business_plan_entity_1 = require("./business-plan.entity");
const activity_entity_1 = require("../activities/activity.entity");
const tenant_entity_1 = require("../tenants/tenant.entity");
const user_entity_1 = require("../users/user.entity");
const business_plan_template_entity_1 = require("./business-plan-template.entity");
const business_plan_section_entity_1 = require("./business-plan-section.entity");
let BusinessPlansService = class BusinessPlansService {
    constructor(businessPlanRepository, activityRepository, tenantRepository, userRepository, templateRepository, entityManager) {
        this.businessPlanRepository = businessPlanRepository;
        this.activityRepository = activityRepository;
        this.tenantRepository = tenantRepository;
        this.userRepository = userRepository;
        this.templateRepository = templateRepository;
        this.entityManager = entityManager;
    }
    async create(createBusinessPlanDto) {
        return this.entityManager.transaction(async (transactionalEntityManager) => {
            const { activity_id, tenant_id, user_id, template_id, ...rest } = createBusinessPlanDto;
            const [activity, tenant, user] = await Promise.all([
                this.activityRepository.findOneBy({ activity_id }),
                this.tenantRepository.findOneBy({ tenant_id }),
                this.userRepository.findOneBy({ user_id }),
            ]);
            if (!activity)
                throw new common_1.NotFoundException(`Activity with ID "${activity_id}" not found`);
            if (!tenant)
                throw new common_1.NotFoundException(`Tenant with ID "${tenant_id}" not found`);
            if (!user)
                throw new common_1.NotFoundException(`User with ID "${user_id}" not found`);
            let template = null;
            if (template_id) {
                template = await this.templateRepository.findOneBy({ template_id });
                if (!template)
                    throw new common_1.NotFoundException(`Template with ID "${template_id}" not found`);
            }
            const newPlan = transactionalEntityManager.create(business_plan_entity_1.BusinessPlan, {
                ...rest,
                activity,
                tenant,
                user,
                template,
            });
            const savedPlan = await transactionalEntityManager.save(newPlan);
            if (template && template.structure && Array.isArray(template.structure)) {
                const sectionsToCreate = template.structure.map((sectionDef, index) => {
                    if (!sectionDef.type || !sectionDef.title) {
                        throw new common_1.InternalServerErrorException('Template structure is invalid.');
                    }
                    return transactionalEntityManager.create(business_plan_section_entity_1.BusinessPlanSection, {
                        plan: savedPlan,
                        section_type: sectionDef.type,
                        title: sectionDef.title,
                        content: sectionDef.defaultContent || '',
                        order_index: index,
                    });
                });
                await transactionalEntityManager.save(sectionsToCreate);
            }
            return transactionalEntityManager.findOneOrFail(business_plan_entity_1.BusinessPlan, {
                where: { plan_id: savedPlan.plan_id },
                relations: ['activity', 'tenant', 'user', 'template', 'sections'],
            });
        });
    }
    findAll() {
        return this.businessPlanRepository.find({ relations: ['activity', 'user', 'tenant'] });
    }
    async findOne(id) {
        const plan = await this.businessPlanRepository.findOne({
            where: { plan_id: id },
            relations: ['activity', 'user', 'tenant', 'template', 'sections'],
        });
        if (!plan) {
            throw new common_1.NotFoundException(`BusinessPlan with ID "${id}" not found`);
        }
        return plan;
    }
    async update(id, updateBusinessPlanDto) {
        const plan = await this.businessPlanRepository.preload({
            plan_id: id,
            ...updateBusinessPlanDto,
        });
        if (!plan) {
            throw new common_1.NotFoundException(`BusinessPlan with ID "${id}" not found`);
        }
        return this.businessPlanRepository.save(plan);
    }
    async remove(id) {
        const result = await this.businessPlanRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`BusinessPlan with ID "${id}" not found`);
        }
    }
};
exports.BusinessPlansService = BusinessPlansService;
exports.BusinessPlansService = BusinessPlansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(business_plan_entity_1.BusinessPlan)),
    __param(1, (0, typeorm_1.InjectRepository)(activity_entity_1.Activity)),
    __param(2, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(4, (0, typeorm_1.InjectRepository)(business_plan_template_entity_1.BusinessPlanTemplate)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.EntityManager])
], BusinessPlansService);
//# sourceMappingURL=business-plans.service.js.map