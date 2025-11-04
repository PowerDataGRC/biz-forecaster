"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BizForecastsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const biz_forecasts_service_1 = require("./biz_forecasts.service");
const biz_forecasts_controller_1 = require("./biz_forecasts.controller");
const biz_forecast_entity_1 = require("./biz_forecast.entity");
const user_entity_1 = require("../users/user.entity");
let BizForecastsModule = class BizForecastsModule {
};
exports.BizForecastsModule = BizForecastsModule;
exports.BizForecastsModule = BizForecastsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([biz_forecast_entity_1.BizForecast, user_entity_1.User])],
        controllers: [biz_forecasts_controller_1.BizForecastsController],
        providers: [biz_forecasts_service_1.BizForecastsService],
    })
], BizForecastsModule);
//# sourceMappingURL=biz_forecasts.module.js.map