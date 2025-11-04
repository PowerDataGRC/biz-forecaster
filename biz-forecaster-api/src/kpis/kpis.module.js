"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KPIsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const kpi_entity_1 = require("./kpi.entity");
const kpis_service_1 = require("./kpis.service");
const kpis_controller_1 = require("./kpis.controller");
let KPIsModule = class KPIsModule {
};
exports.KPIsModule = KPIsModule;
exports.KPIsModule = KPIsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([kpi_entity_1.Kpi])],
        providers: [kpis_service_1.KPIsService],
        controllers: [kpis_controller_1.KPIsController],
        exports: [kpis_service_1.KPIsService],
    })
], KPIsModule);
//# sourceMappingURL=kpis.module.js.map