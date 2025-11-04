"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const dotenv_1 = require("dotenv");
const common_1 = require("@nestjs/common");
const pg_1 = __importDefault(require("pg"));
(0, dotenv_1.config)({
    path: ['.env.local'],
});
const sql = new pg_1.default.Pool({ connectionString: process.env.DATABASE_URL });
const dbProvider = {
    provide: 'POSTGRES_POOL',
    useValue: sql,
};
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [dbProvider],
        exports: [dbProvider],
    })
], DatabaseModule);
//# sourceMappingURL=test-node-pg.js.map