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
exports.BusinessPlanSection = void 0;
const typeorm_1 = require("typeorm");
const business_plan_entity_1 = require("./business-plan.entity");
const business_plan_content_block_entity_1 = require("./business-plan-content-block.entity");
let BusinessPlanSection = class BusinessPlanSection {
};
exports.BusinessPlanSection = BusinessPlanSection;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BusinessPlanSection.prototype, "section_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_plan_entity_1.BusinessPlan),
    (0, typeorm_1.JoinColumn)({ name: 'plan_id' }),
    __metadata("design:type", business_plan_entity_1.BusinessPlan)
], BusinessPlanSection.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BusinessPlanSection.prototype, "section_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BusinessPlanSection.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], BusinessPlanSection.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], BusinessPlanSection.prototype, "order_index", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], BusinessPlanSection.prototype, "is_completed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BusinessPlanSection.prototype, "data_sources", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BusinessPlanSection.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BusinessPlanSection.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => business_plan_content_block_entity_1.BusinessPlanContentBlock, (contentBlock) => contentBlock.section),
    __metadata("design:type", Array)
], BusinessPlanSection.prototype, "content_blocks", void 0);
exports.BusinessPlanSection = BusinessPlanSection = __decorate([
    (0, typeorm_1.Entity)('business_plan_sections')
], BusinessPlanSection);
//# sourceMappingURL=business-plan-section.entity.js.map