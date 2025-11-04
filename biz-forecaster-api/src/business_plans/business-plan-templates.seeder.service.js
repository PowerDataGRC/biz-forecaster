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
var BusinessPlanTemplatesSeederService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPlanTemplatesSeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const business_plan_template_entity_1 = require("./business-plan-template.entity");
const user_entity_1 = require("../users/user.entity");
let BusinessPlanTemplatesSeederService = BusinessPlanTemplatesSeederService_1 = class BusinessPlanTemplatesSeederService {
    constructor(templateRepository, userRepository) {
        this.templateRepository = templateRepository;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(BusinessPlanTemplatesSeederService_1.name);
    }
    async seed() {
        this.logger.log('Starting to seed Business Plan Templates...');
        const adminUser = await this.userRepository.findOne({ where: {} });
        if (!adminUser) {
            this.logger.error('No users found in the database. Cannot seed templates without a creator. Please seed users first.');
            return;
        }
        const standardTemplate = {
            name: 'Standard Startup Plan',
            description: 'A comprehensive business plan template for new ventures.',
            category: 'startup',
            is_global: true,
            is_active: true,
            created_by: adminUser,
            structure: [
                { type: 'executive_summary', title: 'Executive Summary' },
                { type: 'company_description', title: 'Company Description' },
                { type: 'market_analysis', title: 'Market Analysis' },
                { type: 'organization_and_management', title: 'Organization and Management' },
                { type: 'service_or_product_line', title: 'Service or Product Line' },
                { type: 'marketing_and_sales', title: 'Marketing and Sales Strategy' },
                { type: 'financial_projections', title: 'Financial Projections' },
                { type: 'appendix', title: 'Appendix' },
            ],
        };
        const existingTemplate = await this.templateRepository.findOneBy({
            name: standardTemplate.name,
        });
        if (existingTemplate) {
            this.logger.log(`Template "${standardTemplate.name}" already exists. Skipping.`);
        }
        else {
            this.logger.log(`Creating template: "${standardTemplate.name}"`);
            const newTemplate = this.templateRepository.create(standardTemplate);
            await this.templateRepository.save(newTemplate);
            this.logger.log(`Successfully created template: "${standardTemplate.name}"`);
        }
        this.logger.log('Finished seeding Business Plan Templates.');
    }
};
exports.BusinessPlanTemplatesSeederService = BusinessPlanTemplatesSeederService;
exports.BusinessPlanTemplatesSeederService = BusinessPlanTemplatesSeederService = BusinessPlanTemplatesSeederService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(business_plan_template_entity_1.BusinessPlanTemplate)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BusinessPlanTemplatesSeederService);
//# sourceMappingURL=business-plan-templates.seeder.service.js.map