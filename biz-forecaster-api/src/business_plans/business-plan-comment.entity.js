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
exports.BusinessPlanComment = void 0;
const typeorm_1 = require("typeorm");
const business_plan_entity_1 = require("./business-plan.entity");
const user_entity_1 = require("../users/user.entity");
let BusinessPlanComment = class BusinessPlanComment {
};
exports.BusinessPlanComment = BusinessPlanComment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BusinessPlanComment.prototype, "comment_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_plan_entity_1.BusinessPlan, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'plan_id' }),
    __metadata("design:type", business_plan_entity_1.BusinessPlan)
], BusinessPlanComment.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], BusinessPlanComment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BusinessPlanComment, (comment) => comment.replies, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_comment_id' }),
    __metadata("design:type", BusinessPlanComment)
], BusinessPlanComment.prototype, "parent_comment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BusinessPlanComment, (comment) => comment.parent_comment),
    __metadata("design:type", Array)
], BusinessPlanComment.prototype, "replies", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], BusinessPlanComment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], BusinessPlanComment.prototype, "is_resolved", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BusinessPlanComment.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BusinessPlanComment.prototype, "updated_at", void 0);
exports.BusinessPlanComment = BusinessPlanComment = __decorate([
    (0, typeorm_1.Entity)('business_plan_comments')
], BusinessPlanComment);
//# sourceMappingURL=business-plan-comment.entity.js.map