"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const business_plan_template_entity_1 = require("../business_plans/business-plan-template.entity");
const tenant_entity_1 = require("../tenants/tenant.entity");
const user_entity_1 = require("../users/user.entity");
const business_plan_templates_seeder_service_1 = require("../business_plans/business-plan-templates.seeder.service");
const tenants_seeder_service_1 = require("../tenants/tenants.seeder.service");
const users_seeder_service_1 = require("../users/users.seeder.service");
let SeederModule = class SeederModule {
};
exports.SeederModule = SeederModule;
exports.SeederModule = SeederModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([business_plan_template_entity_1.BusinessPlanTemplate, user_entity_1.User, tenant_entity_1.Tenant])],
        providers: [business_plan_templates_seeder_service_1.BusinessPlanTemplatesSeederService, users_seeder_service_1.UsersSeederService, tenants_seeder_service_1.TenantsSeederService],
        exports: [business_plan_templates_seeder_service_1.BusinessPlanTemplatesSeederService, users_seeder_service_1.UsersSeederService, tenants_seeder_service_1.TenantsSeederService],
    })
], SeederModule);
//# sourceMappingURL=seeder.module.js.map