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
exports.FinancialRatiosController = void 0;
const common_1 = require("@nestjs/common");
const financial_ratios_service_1 = require("./financial-ratios.service");
let FinancialRatiosController = class FinancialRatiosController {
    constructor(financialRatiosService) {
        this.financialRatiosService = financialRatiosService;
    }
};
exports.FinancialRatiosController = FinancialRatiosController;
exports.FinancialRatiosController = FinancialRatiosController = __decorate([
    (0, common_1.Controller)('financial-ratios'),
    __metadata("design:paramtypes", [financial_ratios_service_1.FinancialRatiosService])
], FinancialRatiosController);
//# sourceMappingURL=financial-ratios.controller.js.map