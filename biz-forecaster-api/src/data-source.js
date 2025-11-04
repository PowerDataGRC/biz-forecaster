"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const dataSourceOptions = {
    type: 'postgres',
    url: (process.env.DATABASE_URL || '').includes('sslmode') ? process.env.DATABASE_URL : `${process.env.DATABASE_URL}?sslmode=require`,
    entities: [],
    synchronize: false,
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
};
exports.default = new typeorm_1.DataSource(dataSourceOptions);
//# sourceMappingURL=data-source.js.map