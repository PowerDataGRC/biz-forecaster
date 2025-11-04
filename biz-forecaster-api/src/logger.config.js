"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonConfig = void 0;
const winston_1 = require("winston");
require("winston-daily-rotate-file");
exports.winstonConfig = {
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.ms(), winston_1.format.colorize(), winston_1.format.printf(({ level, message, context, timestamp }) => {
                return `${timestamp} [${context}] ${level}: ${message}`;
            })),
        }),
        new winston_1.transports.DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
        }),
        new winston_1.transports.DailyRotateFile({
            level: 'error',
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '30d',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
        }),
    ],
};
//# sourceMappingURL=logger.config.js.map