"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialRatiosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const financial_ratios_service_1 = require("./financial-ratios.service");
const financial_ratios_controller_1 = require("./financial-ratios.controller");
const financial_ratio_entity_1 = require("./financial-ratio.entity");
const common_module_1 = require("../common/common.module");
let FinancialRatiosModule = class FinancialRatiosModule {
};
exports.FinancialRatiosModule = FinancialRatiosModule;
exports.FinancialRatiosModule = FinancialRatiosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([financial_ratio_entity_1.FinancialRatio]), common_module_1.CommonModule],
        providers: [financial_ratios_service_1.FinancialRatiosService],
        controllers: [financial_ratios_controller_1.FinancialRatiosController],
        exports: [financial_ratios_service_1.FinancialRatiosService],
    })
], FinancialRatiosModule);
//# sourceMappingURL=financial-ratios.module.js.map