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
exports.LineItem = exports.LineItemType = void 0;
const typeorm_1 = require("typeorm");
const business_plan_entity_1 = require("../business_plans/business-plan.entity");
const activity_entity_1 = require("../activities/activity.entity");
var LineItemType;
(function (LineItemType) {
    LineItemType["PRODUCT"] = "product";
    LineItemType["COGS"] = "cogs";
    LineItemType["OPERATIONAL_EXPENSE"] = "operational_expense";
    LineItemType["CAPITAL_EXPENSE"] = "capital_expense";
    LineItemType["STARTUP_ITEM"] = "startup_item";
    LineItemType["ASSETS"] = "assets";
    LineItemType["LIABILITIES"] = "liabilities";
    LineItemType["EQUITY"] = "equity";
    LineItemType["SEASONALITY"] = "seasonality";
    LineItemType["OTHER"] = "other";
    LineItemType["SALES_PROJECTION"] = "sales_projection";
})(LineItemType || (exports.LineItemType = LineItemType = {}));
let LineItem = class LineItem {
};
exports.LineItem = LineItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LineItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_plan_entity_1.BusinessPlan),
    (0, typeorm_1.JoinColumn)({ name: 'business_plan_id' }),
    __metadata("design:type", business_plan_entity_1.BusinessPlan)
], LineItem.prototype, "businessPlan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => activity_entity_1.Activity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'activity_id' }),
    __metadata("design:type", activity_entity_1.Activity)
], LineItem.prototype, "activity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LineItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LineItemType,
    }),
    __metadata("design:type", String)
], LineItem.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], LineItem.prototype, "details", void 0);
exports.LineItem = LineItem = __decorate([
    (0, typeorm_1.Entity)('line_items')
], LineItem);
//# sourceMappingURL=line-item.entity.js.map