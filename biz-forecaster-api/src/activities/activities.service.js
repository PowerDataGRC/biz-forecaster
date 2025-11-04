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
var ActivitiesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const activity_entity_1 = require("./activity.entity");
let ActivitiesService = ActivitiesService_1 = class ActivitiesService {
    constructor(activityRepository) {
        this.activityRepository = activityRepository;
        this.logger = new common_1.Logger(ActivitiesService_1.name);
    }
    async findOne(activityId) {
        this.logger.log(`Finding activity with ID: ${activityId}`);
        try {
            const activity = await this.activityRepository.findOneBy({ activity_id: activityId });
            if (!activity) {
                this.logger.warn(`Activity with ID "${activityId}" not found.`);
                throw new common_1.NotFoundException(`Activity with ID "${activityId}" not found.`);
            }
            return activity;
        }
        catch (error) {
            this.logger.error(`Failed to find activity with ID "${activityId}"`, error.stack);
            throw error;
        }
    }
};
exports.ActivitiesService = ActivitiesService;
exports.ActivitiesService = ActivitiesService = ActivitiesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(activity_entity_1.Activity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ActivitiesService);
//# sourceMappingURL=activities.service.js.map