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
exports.BusinessPlan = exports.BusinessPlanStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
var BusinessPlanStatus;
(function (BusinessPlanStatus) {
    BusinessPlanStatus["DRAFT"] = "draft";
    BusinessPlanStatus["IN_REVIEW"] = "in_review";
    BusinessPlanStatus["FINALIZED"] = "finalized";
    BusinessPlanStatus["ARCHIVED"] = "archived";
})(BusinessPlanStatus || (exports.BusinessPlanStatus = BusinessPlanStatus = {}));
let BusinessPlan = class BusinessPlan {
};
exports.BusinessPlan = BusinessPlan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BusinessPlan.prototype, "plan_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], BusinessPlan.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BusinessPlan.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { default: 1 }),
    __metadata("design:type", Number)
], BusinessPlan.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BusinessPlanStatus,
        default: BusinessPlanStatus.DRAFT,
    }),
    __metadata("design:type", String)
], BusinessPlan.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'template_id' }),
    (0, typeorm_1.Column)({ default: 'en' }),
    __metadata("design:type", String)
], BusinessPlan.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], BusinessPlan.prototype, "finalized_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BusinessPlan.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BusinessPlan.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], BusinessPlan.prototype, "current_assets", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], BusinessPlan.prototype, "current_liabilities", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], BusinessPlan.prototype, "total_debt", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], BusinessPlan.prototype, "total_equity", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], BusinessPlan.prototype, "ebitda", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], BusinessPlan.prototype, "interest_expense", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], BusinessPlan.prototype, "operating_cash_flow", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], BusinessPlan.prototype, "net_profit", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], BusinessPlan.prototype, "total_revenue", void 0);
exports.BusinessPlan = BusinessPlan = __decorate([
    (0, typeorm_1.Entity)('business-plans')
], BusinessPlan);
//# sourceMappingURL=business-plan.entity.js.map