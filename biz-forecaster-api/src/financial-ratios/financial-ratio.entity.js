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
exports.FinancialRatio = void 0;
const typeorm_1 = require("typeorm");
const ratio_category_entity_1 = require("./ratio-category.entity");
const business_plan_entity_1 = require("../business_plans/business-plan.entity");
let FinancialRatio = class FinancialRatio extends typeorm_1.BaseEntity {
};
exports.FinancialRatio = FinancialRatio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FinancialRatio.prototype, "ratio_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_plan_entity_1.BusinessPlan),
    __metadata("design:type", business_plan_entity_1.BusinessPlan)
], FinancialRatio.prototype, "business_plan", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FinancialRatio.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FinancialRatio.prototype, "formula", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], FinancialRatio.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ratio_category_entity_1.RatioCategory, category => category.financial_ratios),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", ratio_category_entity_1.RatioCategory)
], FinancialRatio.prototype, "category", void 0);
exports.FinancialRatio = FinancialRatio = __decorate([
    (0, typeorm_1.Entity)('financial_ratios')
], FinancialRatio);
//# sourceMappingURL=financial-ratio.entity.js.map