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
var ConsoleLogger_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
const common_1 = require("@nestjs/common");
let ConsoleLogger = ConsoleLogger_1 = class ConsoleLogger {
    constructor(options) {
        this.prefix = options?.prefix || 'Nest';
    }
    log(message, context) {
        this.printMessage('log', message, context);
    }
    error(message, trace, context) {
        this.printMessage('error', message, context);
        if (trace) {
            console.error(trace);
        }
    }
    warn(message, context) {
        this.printMessage('warn', message, context);
    }
    printMessage(level, message, context) {
        const color = ConsoleLogger_1.colorMap[level];
        const reset = ConsoleLogger_1.colorMap.reset;
        const timestamp = new Date().toISOString();
        const contextMessage = context ? `[${context}] ` : '';
        const output = `${color}[${this.prefix}] ${process.pid}  - ${timestamp}     ${level.toUpperCase()} ${contextMessage}${message}${reset}`;
        console.log(output);
    }
};
exports.ConsoleLogger = ConsoleLogger;
ConsoleLogger.colorMap = {
    log: '\x1b[32m',
    error: '\x1b[31m',
    warn: '\x1b[33m',
    reset: '\x1b[0m',
};
exports.ConsoleLogger = ConsoleLogger = ConsoleLogger_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [Object])
], ConsoleLogger);
//# sourceMappingURL=console.logger.js.map