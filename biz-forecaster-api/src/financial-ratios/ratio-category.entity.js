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
exports.RatioCategory = exports.RatioCategories = void 0;
const typeorm_1 = require("typeorm");
const financial_ratio_entity_1 = require("./financial-ratio.entity");
var RatioCategories;
(function (RatioCategories) {
    RatioCategories["PROFITABILIT_RATIOS"] = "profitability_ratios";
    RatioCategories["LIQUIDITY_RATIOS"] = "liquidity ratios";
    RatioCategories["SOLVENCY_RATIOS"] = "solvency ratios";
    RatioCategories["EFFICIENCY_RATIOS"] = "efficiency ratios";
    RatioCategories["VALUATION_RATIOS"] = "valuation ratios";
    RatioCategories["GROWTH_RATIOS"] = "growth ratios";
})(RatioCategories || (exports.RatioCategories = RatioCategories = {}));
let RatioCategory = class RatioCategory extends typeorm_1.BaseEntity {
};
exports.RatioCategory = RatioCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RatioCategory.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RatioCategory.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], RatioCategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => financial_ratio_entity_1.FinancialRatio, financialRatio => financialRatio.category),
    __metadata("design:type", Array)
], RatioCategory.prototype, "financial_ratios", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RatioCategories,
        default: RatioCategories.PROFITABILIT_RATIOS,
    }),
    __metadata("design:type", String)
], RatioCategory.prototype, "categories", void 0);
exports.RatioCategory = RatioCategory = __decorate([
    (0, typeorm_1.Entity)('ratio_categories')
], RatioCategory);
//# sourceMappingURL=ratio-category.entity.js.map