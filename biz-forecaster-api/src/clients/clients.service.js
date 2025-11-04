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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("./client.entity");
const tenant_context_service_1 = require("../tenants/tenant-context.service");
const tenants_service_1 = require("../tenants/tenants.service");
let ClientsService = class ClientsService {
    constructor(clientsRepository, tenantContext, tenantsService) {
        this.clientsRepository = clientsRepository;
        this.tenantContext = tenantContext;
        this.tenantsService = tenantsService;
    }
    async create(createClientDto) {
        return this.tenantsService.executeInTenant(this.tenantContext.schema, client_entity_1.Client, async (repo) => {
            const newClient = repo.create(createClientDto);
            return repo.save(newClient);
        });
    }
    findAll() {
        return this.tenantsService.executeInTenant(this.tenantContext.schema, client_entity_1.Client, (repo) => repo.find());
    }
    async findOne(id) {
        const client = await this.tenantsService.executeInTenant(this.tenantContext.schema, client_entity_1.Client, (repo) => repo.findOneBy({ client_id: id }));
        if (!client) {
            throw new common_1.NotFoundException(`Client with ID "${id}" not found`);
        }
        return client;
    }
    async update(id, updateClientDto) {
        return this.tenantsService.executeInTenant(this.tenantContext.schema, client_entity_1.Client, async (repo) => {
            const clientToUpdate = await repo.findOneBy({ client_id: id });
            if (!clientToUpdate) {
                throw new common_1.NotFoundException(`Client with ID "${id}" not found in this tenant.`);
            }
            const updatedClient = repo.merge(clientToUpdate, updateClientDto);
            return repo.save(updatedClient);
        });
    }
    async remove(id) {
        const result = await this.tenantsService.executeInTenant(this.tenantContext.schema, client_entity_1.Client, (repo) => repo.delete(id));
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Client with ID "${id}" not found`);
        }
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        tenant_context_service_1.TenantContextService,
        tenants_service_1.TenantsService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map