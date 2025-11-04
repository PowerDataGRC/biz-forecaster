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
exports.CollaboratorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const business_plan_collaborator_entity_1 = require("./business-plan-collaborator.entity");
const user_entity_1 = require("../users/user.entity");
let CollaboratorsService = class CollaboratorsService {
    constructor(collaboratorsRepository, usersRepository) {
        this.collaboratorsRepository = collaboratorsRepository;
        this.usersRepository = usersRepository;
    }
    async create(planId, createDto, invitedById) {
        const userToInvite = await this.usersRepository.findOneBy({ email: createDto.email });
        if (!userToInvite) {
            throw new common_1.NotFoundException(`User with email "${createDto.email}" not found.`);
        }
        const existingCollaborator = await this.collaboratorsRepository.findOneBy({ plan: { plan_id: planId }, user: { user_id: userToInvite.user_id } });
        if (existingCollaborator) {
            throw new common_1.ConflictException(`User "${createDto.email}" is already a collaborator on this plan.`);
        }
        const collaborator = this.collaboratorsRepository.create({
            plan: { plan_id: planId },
            user: { user_id: userToInvite.user_id },
            invited_by: { user_id: invitedById },
            permission_level: createDto.permission_level,
        });
        return this.collaboratorsRepository.save(collaborator);
    }
    findAllByPlan(planId) {
        return this.collaboratorsRepository.find({
            where: { plan: { plan_id: planId } },
            relations: ['user', 'invited_by'],
        });
    }
    async remove(id) {
        const result = await this.collaboratorsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Collaborator with ID "${id}" not found`);
        }
    }
};
exports.CollaboratorsService = CollaboratorsService;
exports.CollaboratorsService = CollaboratorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(business_plan_collaborator_entity_1.BusinessPlanCollaborator)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CollaboratorsService);
//# sourceMappingURL=collaborators.service.js.map