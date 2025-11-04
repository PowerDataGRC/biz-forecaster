"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RegistrationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin = __importStar(require("firebase-admin"));
const tenants_service_1 = require("../tenants/tenants.service");
const email_service_1 = require("../email/email.service");
const user_entity_1 = require("../users/user.entity");
let RegistrationService = RegistrationService_1 = class RegistrationService {
    constructor(tenantsService, jwtService, emailService, configService, userRepository) {
        this.tenantsService = tenantsService;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.configService = configService;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(RegistrationService_1.name);
    }
    async startRegistration(registerDto) {
        const { email, password, companyName } = registerDto;
        try {
            await admin.auth().getUserByEmail(email);
            throw new common_1.ConflictException('This email address is already in use.');
        }
        catch (error) {
            if (error.code === 'auth/user-not-found') {
            }
            else if (error instanceof common_1.ConflictException) {
                throw error;
            }
            else {
                this.logger.error('Error checking user in Firebase', error);
                throw new common_1.InternalServerErrorException();
            }
        }
        const payload = { email, password, companyName };
        const token = this.jwtService.sign(payload, {
            expiresIn: '15m',
            secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        });
        await this.emailService.sendRegistrationEmail(email, token);
    }
    async completeRegistration(token) {
        let payload;
        try {
            payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            });
        }
        catch (error) {
            this.logger.error('Invalid or expired registration token', error);
            throw new common_1.BadRequestException('The verification link is invalid or has expired.');
        }
        const { email, password, companyName } = payload;
        let firebaseUser;
        try {
            firebaseUser = await admin.auth().createUser({
                email,
                password,
                emailVerified: true,
                displayName: companyName,
            });
        }
        catch (error) {
            this.logger.error(`Failed to create Firebase user for ${email}`, error);
            if (error.code === 'auth/email-already-exists') {
                throw new common_1.ConflictException('This email address has already been registered.');
            }
            throw new common_1.InternalServerErrorException('Failed to create user account.');
        }
        const tenant = await this.tenantsService.create({ name: companyName, subdomain: companyName.toLowerCase().replace(/[^a-z0-9]/g, '') });
        await this.tenantsService.executeInTenant(tenant.schemaName, user_entity_1.User, async (userRepository) => {
            const newUser = userRepository.create({
                user_id: firebaseUser.uid,
                email: firebaseUser.email,
                username: firebaseUser.email,
                password_hash: 'firebase-managed',
                role: user_entity_1.UserRole.ADMIN,
                tenant: tenant,
                location: null,
            });
            await userRepository.save(newUser);
        });
        return { message: 'Registration successful!', tenantId: tenant.tenant_id };
    }
};
exports.RegistrationService = RegistrationService;
exports.RegistrationService = RegistrationService = RegistrationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [tenants_service_1.TenantsService,
        jwt_1.JwtService,
        email_service_1.EmailService,
        config_1.ConfigService,
        typeorm_2.Repository])
], RegistrationService);
//# sourceMappingURL=registration.service.js.map