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
exports.KPIsController = void 0;
const common_1 = require("@nestjs/common");
const kpis_service_1 = require("./kpis.service");
let KPIsController = class KPIsController {
    constructor(kpiService) {
        this.kpiService = kpiService;
    }
    findAll(planId) {
        return this.kpiService.findAllForBusinessPlan(planId);
    }
    findOne(kpiId) {
        return this.kpiService.findOne(kpiId);
    }
};
exports.KPIsController = KPIsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('planId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KPIsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':kpiId'),
    __param(0, (0, common_1.Param)('kpiId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KPIsController.prototype, "findOne", null);
exports.KPIsController = KPIsController = __decorate([
    (0, common_1.Controller)('business-plans/:planId/kpis'),
    __metadata("design:paramtypes", [kpis_service_1.KPIsService])
], KPIsController);
//# sourceMappingURL=kpis.controller.js.map