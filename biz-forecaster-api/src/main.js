"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const console_logger_1 = require("./console.logger");
const database_error_filter_1 = require("./common/database-error.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new console_logger_1.ConsoleLogger({ prefix: 'BizForecaster' }), abortOnError: true
    });
    const httpAdapterHost = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new database_error_filter_1.AllExceptionsFilter(httpAdapterHost));
    const configService = app.get(config_1.ConfigService);
    const frontendUrl = configService.get('FRONTEND_URL');
    const allowedOrigins = [];
    if (process.env.NODE_ENV !== 'production') {
        allowedOrigins.push('http://localhost:3001');
    }
    if (frontendUrl) {
        allowedOrigins.push(frontendUrl);
    }
    app.enableCors({
        origin: allowedOrigins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization',
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map