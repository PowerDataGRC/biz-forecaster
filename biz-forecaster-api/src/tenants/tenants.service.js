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
var TenantsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tenant_entity_1 = require("./tenant.entity");
const schema_factory_service_1 = require("./schema-factory.service");
let TenantsService = TenantsService_1 = class TenantsService {
    constructor(tenantRepository, dataSource, schemaFactory) {
        this.tenantRepository = tenantRepository;
        this.dataSource = dataSource;
        this.schemaFactory = schemaFactory;
        this.logger = new common_1.Logger(TenantsService_1.name);
    }
    async executeInTenant(schemaName, entity, operation) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.query(`SET search_path TO "${schemaName}"`);
        try {
            const repository = queryRunner.manager.getRepository(entity);
            return await operation(repository);
        }
        finally {
            await queryRunner.query(`SET search_path TO "public"`);
            await queryRunner.release();
        }
    }
    async create(createTenantDto) {
        const { subdomain, name } = createTenantDto;
        const existingTenant = await this.tenantRepository.findOneBy({ subdomain });
        if (existingTenant) {
            throw new common_1.ConflictException(`Tenant with subdomain "${subdomain}" already exists.`);
        }
        const schemaName = this.schemaFactory.generateSchemaName(name);
        const newTenant = this.tenantRepository.create({
            name,
            subdomain,
            schemaName,
        });
        const savedTenant = await this.tenantRepository.save(newTenant);
        await this.createTenantSchema(savedTenant.schemaName);
        return savedTenant;
    }
    async findAll() {
        return this.tenantRepository.find();
    }
    async findBySubdomain(subdomain) {
        return this.tenantRepository.findOne({ where: { subdomain } });
    }
    async createTenantSchema(schemaName) {
        if (!/^[a-z0-9-]+$/.test(schemaName)) {
            throw new Error(`Invalid schema name: ${schemaName}`);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.createSchema(schemaName, true);
            await this.dataSource.synchronize();
            await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "${schemaName}"`);
            this.logger.log(`Schema "${schemaName}" and tables created successfully.`);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            this.logger.error(`Failed to create schema for tenant ${schemaName}: ${errorMessage}`);
            throw new common_1.InternalServerErrorException('Failed to set up the organization environment. Please contact support.');
        }
        finally {
            await queryRunner.release();
        }
    }
    async findOne(id) {
        const tenant = await this.tenantRepository.findOneBy({ tenant_id: id });
        if (!tenant) {
            throw new common_1.NotFoundException(`Tenant with ID "${id}" not found.`);
        }
        return tenant;
    }
    async update(id, updateTenantDto) {
        const tenant = await this.tenantRepository.preload({
            tenant_id: id,
            ...updateTenantDto,
        });
        if (!tenant) {
            throw new common_1.NotFoundException(`Tenant with ID "${id}" not found.`);
        }
        return this.tenantRepository.save(tenant);
    }
    async remove(id) {
        const result = await this.tenantRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Tenant with ID "${id}" not found`);
        }
    }
};
exports.TenantsService = TenantsService;
exports.TenantsService = TenantsService = TenantsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        schema_factory_service_1.SchemaFactoryService])
], TenantsService);
//# sourceMappingURL=tenants.service.js.map