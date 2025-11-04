"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialRatiosService = void 0;
const common_1 = require("@nestjs/common");
let FinancialRatiosService = class FinancialRatiosService {
    calculateCurrentRatio(currentAssets, currentLiabilities) {
        if (currentLiabilities === 0) {
            return null;
        }
        return currentAssets / currentLiabilities;
    }
    calculateDebtToEquityRatio(totalDebt, totalEquity) {
        if (totalEquity === 0) {
            return null;
        }
        return totalDebt / totalEquity;
    }
    calculateInterestCoverageRatio(ebitda, interestExpense) {
        if (interestExpense === 0) {
            return null;
        }
        return ebitda / interestExpense;
    }
    calculateNetProfitMargin(netProfit, totalRevenue) {
        if (totalRevenue === 0) {
            return null;
        }
        return (netProfit / totalRevenue) * 100;
    }
    calculateOperatingCashFlowRatio(operatingCashFlow, currentLiabilities) {
        if (currentLiabilities === 0) {
            return null;
        }
        return operatingCashFlow / currentLiabilities;
    }
};
exports.FinancialRatiosService = FinancialRatiosService;
exports.FinancialRatiosService = FinancialRatiosService = __decorate([
    (0, common_1.Injectable)()
], FinancialRatiosService);
//# sourceMappingURL=financial-ratios.service.js.map