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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPlansController = void 0;
const common_1 = require("@nestjs/common");
const business_plans_service_1 = require("./business-plans.service");
const create_business_plan_dto_1 = require("./dto/create-business-plan.dto");
const update_business_plan_dto_1 = require("./dto/update-business-plan.dto");
let BusinessPlansController = class BusinessPlansController {
    constructor(businessPlansService) {
        this.businessPlansService = businessPlansService;
    }
    create(createBusinessPlanDto) {
        return this.businessPlansService.create(createBusinessPlanDto);
    }
    findAll() {
        return this.businessPlansService.findAll();
    }
    findOne(id) {
        return this.businessPlansService.findOne(id);
    }
    update(id, updateBusinessPlanDto) {
        return this.businessPlansService.update(id, updateBusinessPlanDto);
    }
    remove(id) {
        return this.businessPlansService.remove(id);
    }
};
exports.BusinessPlansController = BusinessPlansController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_business_plan_dto_1.CreateBusinessPlanDto]),
    __metadata("design:returntype", void 0)
], BusinessPlansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BusinessPlansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BusinessPlansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_business_plan_dto_1.UpdateBusinessPlanDto]),
    __metadata("design:returntype", void 0)
], BusinessPlansController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BusinessPlansController.prototype, "remove", null);
exports.BusinessPlansController = BusinessPlansController = __decorate([
    (0, common_1.Controller)('business-plans'),
    __metadata("design:paramtypes", [business_plans_service_1.BusinessPlansService])
], BusinessPlansController);
//# sourceMappingURL=business-plans.controller.js.map