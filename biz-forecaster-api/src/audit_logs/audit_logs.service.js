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
exports.AuditLogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const audit_log_entity_1 = require("./audit_log.entity");
const user_entity_1 = require("../users/user.entity");
let AuditLogsService = class AuditLogsService {
    constructor(auditLogRepository, userRepository) {
        this.auditLogRepository = auditLogRepository;
        this.userRepository = userRepository;
    }
    async create(createAuditLogDto) {
        const user = await this.userRepository.findOne({ where: { user_id: createAuditLogDto.user_id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID "${createAuditLogDto.user_id}" not found`);
        }
        const auditLog = this.auditLogRepository.create({
            ...createAuditLogDto,
            user,
        });
        return this.auditLogRepository.save(auditLog);
    }
    findAll() {
        return this.auditLogRepository.find({ relations: ['user'] });
    }
    async findOne(id) {
        const auditLog = await this.auditLogRepository.findOne({ where: { audit_id: id }, relations: ['user'] });
        if (!auditLog) {
            throw new common_1.NotFoundException(`AuditLog with ID "${id}" not found`);
        }
        return auditLog;
    }
    async update(id, updateAuditLogDto) {
        const auditLog = await this.findOne(id);
        const { user_id, ...rest } = updateAuditLogDto;
        if (user_id) {
            const user = await this.userRepository.findOne({ where: { user_id } });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID "${user_id}" not found`);
            }
            auditLog.user = user;
        }
        Object.assign(auditLog, rest);
        return this.auditLogRepository.save(auditLog);
    }
    async remove(id) {
        const result = await this.auditLogRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`AuditLog with ID "${id}" not found`);
        }
    }
};
exports.AuditLogsService = AuditLogsService;
exports.AuditLogsService = AuditLogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(audit_log_entity_1.AuditLog)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AuditLogsService);
//# sourceMappingURL=audit_logs.service.js.map