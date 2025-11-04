"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPlansModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const business_plans_service_1 = require("./business-plans.service");
const business_plans_controller_1 = require("./business-plans.controller");
const business_plan_entity_1 = require("./business-plan.entity");
const business_plan_section_entity_1 = require("./business-plan-section.entity");
const business_plan_template_entity_1 = require("./business-plan-template.entity");
const activity_entity_1 = require("../activities/activity.entity");
const tenant_entity_1 = require("../tenants/tenant.entity");
const user_entity_1 = require("../users/user.entity");
const collaborators_module_1 = require("./collaborators.module");
let BusinessPlansModule = class BusinessPlansModule {
};
exports.BusinessPlansModule = BusinessPlansModule;
exports.BusinessPlansModule = BusinessPlansModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                business_plan_entity_1.BusinessPlan,
                business_plan_section_entity_1.BusinessPlanSection,
                business_plan_template_entity_1.BusinessPlanTemplate,
                activity_entity_1.Activity,
                tenant_entity_1.Tenant,
                user_entity_1.User,
            ]),
            (0, common_1.forwardRef)(() => collaborators_module_1.CollaboratorsModule),
        ],
        controllers: [business_plans_controller_1.BusinessPlansController],
        providers: [business_plans_service_1.BusinessPlansService],
        exports: [business_plans_service_1.BusinessPlansService],
    })
], BusinessPlansModule);
//# sourceMappingURL=business-plans.module.js.map