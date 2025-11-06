"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const tenants_module_1 = require("./tenants/tenants.module");
const subscriptions_module_1 = require("./subscriptions/subscriptions.module");
const registration_module_1 = require("./registration/registration.module");
const tenant_middleware_1 = require("./tenants/tenant.middleware");
const firebase_module_1 = require("./firebase/firebase.module");
const tenant_entity_1 = require("./tenants/tenant.entity");
const subscription_entity_1 = require("./subscriptions/subscription.entity");
const clients_module_1 = require("./clients/clients.module");
const notifications_module_1 = require("./notifications/notifications.module");
const audit_logs_module_1 = require("./audit_logs/audit_logs.module");
const business_plans_module_1 = require("./business_plans/business-plans.module");
const activities_module_1 = require("./activities/activities.module");
const collaborators_module_1 = require("./business_plans/collaborators.module");
const users_module_1 = require("./users/users.module");
const kpis_module_1 = require("./kpis/kpis.module");
const financial_ratios_module_1 = require("./financial-ratios/financial-ratios.module");
const reports_module_1 = require("./reports/reports.module");
const goals_module_1 = require("./goals/goals.module");
const taggables_module_1 = require("./taggables/taggables.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(tenant_middleware_1.TenantMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            firebase_module_1.FirebaseModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const dbUrl = configService.get('DATABASE_URL');
                    if (!dbUrl) {
                        throw new Error('DATABASE_URL environment variable is not set');
                    }
                    return {
                        type: 'postgres',
                        url: dbUrl.includes('sslmode') ? dbUrl : `${dbUrl}?sslmode=require`,
                        entities: [tenant_entity_1.Tenant, subscription_entity_1.Subscription],
                        synchronize: false,
                        logging: 'all',
                        // Add connection pool and retry settings
                        poolSize: 20,
                        connectTimeoutMS: 10000,
                        extra: {
                            // Retry configuration for connection attempts
                            max: 20, // Maximum number of connections in the pool
                            connectionTimeoutMillis: 10000,
                            // Add retry logic for failed connections
                            retry: {
                                retries: 3,
                                factor: 2,
                                minTimeout: 1000,
                                maxTimeout: 5000
                            }
                        }
                    };
                },
                inject: [config_1.ConfigService],
            }),
            tenants_module_1.TenantsModule,
            registration_module_1.RegistrationModule,
            subscriptions_module_1.SubscriptionsModule,
            audit_logs_module_1.AuditLogsModule,
            (0, common_1.forwardRef)(() => activities_module_1.ActivitiesModule),
            (0, common_1.forwardRef)(() => business_plans_module_1.BusinessPlansModule),
            collaborators_module_1.CollaboratorsModule,
            clients_module_1.ClientsModule,
            financial_ratios_module_1.FinancialRatiosModule,
            notifications_module_1.NotificationsModule,
            users_module_1.UsersModule,
            kpis_module_1.KPIsModule,
            reports_module_1.ReportsModule,
            goals_module_1.GoalsModule,
            taggables_module_1.TaggablesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map