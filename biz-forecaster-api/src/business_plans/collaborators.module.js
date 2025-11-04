"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaboratorsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const collaborators_service_1 = require("./collaborators.service");
const collaborators_controller_1 = require("./collaborators.controller");
const business_plan_collaborator_entity_1 = require("./business-plan-collaborator.entity");
const user_entity_1 = require("../users/user.entity");
const common_module_1 = require("../common/common.module");
const business_plans_module_1 = require("./business-plans.module");
let CollaboratorsModule = class CollaboratorsModule {
};
exports.CollaboratorsModule = CollaboratorsModule;
exports.CollaboratorsModule = CollaboratorsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([business_plan_collaborator_entity_1.BusinessPlanCollaborator, user_entity_1.User]), common_module_1.CommonModule, (0, common_1.forwardRef)(() => business_plans_module_1.BusinessPlansModule)],
        controllers: [collaborators_controller_1.CollaboratorsController],
        providers: [collaborators_service_1.CollaboratorsService],
        exports: [collaborators_service_1.CollaboratorsService],
    })
], CollaboratorsModule);
//# sourceMappingURL=collaborators.module.js.map