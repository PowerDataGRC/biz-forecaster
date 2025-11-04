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
exports.Goal = exports.GoalStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../shared/base.entity");
const business_plan_entity_1 = require("../business_plans/business-plan.entity");
const task_entity_1 = require("../tasks/task.entity");
var GoalStatus;
(function (GoalStatus) {
    GoalStatus["NOT_STARTED"] = "not_started";
    GoalStatus["IN_PROGRESS"] = "in_progress";
    GoalStatus["COMPLETED"] = "completed";
    GoalStatus["ON_HOLD"] = "on_hold";
})(GoalStatus || (exports.GoalStatus = GoalStatus = {}));
let Goal = class Goal extends base_entity_1.BaseEntity {
};
exports.Goal = Goal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Goal.prototype, "goal_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_plan_entity_1.BusinessPlan),
    __metadata("design:type", business_plan_entity_1.BusinessPlan)
], Goal.prototype, "business_plan", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, task => task.goal),
    __metadata("design:type", Array)
], Goal.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Goal.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Goal.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Goal.prototype, "target_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: GoalStatus,
        default: GoalStatus.NOT_STARTED,
    }),
    __metadata("design:type", String)
], Goal.prototype, "status", void 0);
exports.Goal = Goal = __decorate([
    (0, typeorm_1.Entity)('goals')
], Goal);
//# sourceMappingURL=goal.entity.js.map