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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPlanCollaborator = void 0;
const typeorm_1 = require("typeorm");
const business_plan_entity_1 = require("./business-plan.entity");
const user_entity_1 = require("../users/user.entity");
const permission_level_enum_1 = require("./dto/permission-level.enum");
let BusinessPlanCollaborator = class BusinessPlanCollaborator {
};
exports.BusinessPlanCollaborator = BusinessPlanCollaborator;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BusinessPlanCollaborator.prototype, "collaborator_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_plan_entity_1.BusinessPlan, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'plan_id' }),
    __metadata("design:type", business_plan_entity_1.BusinessPlan)
], BusinessPlanCollaborator.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], BusinessPlanCollaborator.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'invited_by_id' }),
    __metadata("design:type", user_entity_1.User)
], BusinessPlanCollaborator.prototype, "invited_by", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: permission_level_enum_1.PermissionLevel,
    }),
    __metadata("design:type", String)
], BusinessPlanCollaborator.prototype, "permission_level", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BusinessPlanCollaborator.prototype, "created_at", void 0);
exports.BusinessPlanCollaborator = BusinessPlanCollaborator = __decorate([
    (0, typeorm_1.Entity)('business_plan_collaborators')
], BusinessPlanCollaborator);
//# sourceMappingURL=business-plan-collaborator.entity.js.map