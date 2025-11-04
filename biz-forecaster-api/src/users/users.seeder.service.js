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
var UsersSeederService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./user.entity");
const firebase_service_1 = require("../firebase/firebase.service");
const bcrypt = __importStar(require("bcrypt"));
let UsersSeederService = UsersSeederService_1 = class UsersSeederService {
    constructor(userRepository, configService, firebaseService) {
        this.userRepository = userRepository;
        this.configService = configService;
        this.firebaseService = firebaseService;
        this.logger = new common_1.Logger(UsersSeederService_1.name);
    }
    async seed(defaultTenant) {
        this.logger.log('Seeding default admin user...');
        const adminEmail = this.configService.get('DEFAULT_ADMIN_EMAIL');
        const adminPassword = this.configService.get('DEFAULT_ADMIN_PASSWORD');
        if (!adminEmail || !adminPassword) {
            this.logger.error('DEFAULT_ADMIN_EMAIL or DEFAULT_ADMIN_PASSWORD not set in environment. Skipping admin user seed.');
            return;
        }
        const existingAdmin = await this.userRepository.findOneBy({
            email: adminEmail,
        });
        if (existingAdmin) {
            this.logger.log('Default admin user already exists.');
            return;
        }
        let firebaseUser;
        try {
            firebaseUser = await this.firebaseService.admin.auth().getUserByEmail(adminEmail);
            this.logger.log('Admin user already exists in Firebase Authentication.');
        }
        catch (error) {
            if (error.code === 'auth/user-not-found') {
                this.logger.log('Creating admin user in Firebase Authentication...');
                firebaseUser = await this.firebaseService.admin.auth().createUser({
                    email: adminEmail,
                    password: adminPassword,
                    emailVerified: true,
                    displayName: 'Admin User',
                });
                this.logger.log(`Firebase user created with UID: ${firebaseUser.uid}`);
            }
            else {
                throw error;
            }
        }
        const salt = await bcrypt.genSalt();
        const password_hash = await bcrypt.hash(adminPassword, salt);
        const newAdmin = this.userRepository.create({
            tenant: defaultTenant,
            user_id: firebaseUser.uid,
            first_name: 'Admin',
            last_name: 'User',
            username: 'admin',
            email: adminEmail,
            password_hash,
            role: user_entity_1.UserRole.ADMIN,
            status: user_entity_1.UserStatus.ACTIVE,
            is_verified: true,
        });
        await this.userRepository.save(newAdmin);
        this.logger.log('Default admin user created successfully.');
        this.logger.log(`Email: ${adminEmail}`);
        this.logger.log('Password: [Set from environment variable]');
    }
};
exports.UsersSeederService = UsersSeederService;
exports.UsersSeederService = UsersSeederService = UsersSeederService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        firebase_service_1.FirebaseService])
], UsersSeederService);
//# sourceMappingURL=users.seeder.service.js.map