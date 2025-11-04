import { LoggerService } from '@nestjs/common';
interface ConsoleLoggerOptions {
    prefix?: string;
}
export declare class ConsoleLogger implements LoggerService {
    private readonly prefix;
    private static readonly colorMap;
    constructor(options?: ConsoleLoggerOptions);
    log(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
    warn(message: any, context?: string): void;
    private printMessage;
}
export {};
