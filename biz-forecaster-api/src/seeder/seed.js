"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('Seeder');
    logger.log('--- Seeding process is temporarily disabled for diagnostics. ---');
    logger.log('If the main application now starts, the issue is isolated to the seeder.');
    process.exit(0);
}
bootstrap();
//# sourceMappingURL=seed.js.map