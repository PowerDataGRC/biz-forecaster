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
exports.BusinessPlanContentBlock = exports.BlockType = void 0;
const typeorm_1 = require("typeorm");
const business_plan_section_entity_1 = require("./business-plan-section.entity");
var BlockType;
(function (BlockType) {
    BlockType["TEXT"] = "text";
    BlockType["TABLE"] = "table";
    BlockType["CHART"] = "chart";
    BlockType["IMAGE"] = "image";
    BlockType["FINANCIAL_TABLE"] = "financial_table";
})(BlockType || (exports.BlockType = BlockType = {}));
let BusinessPlanContentBlock = class BusinessPlanContentBlock {
};
exports.BusinessPlanContentBlock = BusinessPlanContentBlock;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BusinessPlanContentBlock.prototype, "block_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_plan_section_entity_1.BusinessPlanSection, (section) => section.content_blocks),
    (0, typeorm_1.JoinColumn)({ name: 'section_id' }),
    __metadata("design:type", business_plan_section_entity_1.BusinessPlanSection)
], BusinessPlanContentBlock.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: BlockType }),
    __metadata("design:type", String)
], BusinessPlanContentBlock.prototype, "block_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], BusinessPlanContentBlock.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BusinessPlanContentBlock.prototype, "data_binding", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], BusinessPlanContentBlock.prototype, "order_index", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BusinessPlanContentBlock.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BusinessPlanContentBlock.prototype, "updated_at", void 0);
exports.BusinessPlanContentBlock = BusinessPlanContentBlock = __decorate([
    (0, typeorm_1.Entity)('business_plan_content_blocks')
], BusinessPlanContentBlock);
//# sourceMappingURL=business-plan-content-block.entity.js.map