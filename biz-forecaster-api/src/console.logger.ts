import { Injectable, Scope, LoggerService } from '@nestjs/common';

/**
 * Interface for ConsoleLogger constructor options.
 */
interface ConsoleLoggerOptions {
  prefix?: string;
}

/**
 * A custom console logger that implements the NestJS LoggerService.
 * It provides colorized, prefixed, and timestamped log messages, making
 * console output easier to read during development.
 */
@Injectable({ scope: Scope.TRANSIENT })
export class ConsoleLogger implements LoggerService {
  private readonly prefix: string;

  // ANSI color codes for styling console output
  private static readonly colorMap = {
    log: '\x1b[32m', // Green
    error: '\x1b[31m', // Red
    warn: '\x1b[33m', // Yellow
    reset: '\x1b[0m', // Reset color
  };

  constructor(options?: ConsoleLoggerOptions) {
    this.prefix = options?.prefix || 'Nest';
  }

  log(message: any, context?: string) {
    this.printMessage('log', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    // NestJS passes the stack trace as the second argument to the error method.
    this.printMessage('error', message, context);
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: any, context?: string) {
    this.printMessage('warn', message, context);
  }

  private printMessage(
    level: 'log' | 'error' | 'warn',
    message: any,
    context?: string,
  ) {
    const color = ConsoleLogger.colorMap[level];
    const reset = ConsoleLogger.colorMap.reset;
    const timestamp = new Date().toISOString();
    const contextMessage = context ? `[${context}] ` : '';

    const output = `${color}[${this.prefix}] ${process.pid}  - ${timestamp}     ${level.toUpperCase()} ${contextMessage}${message}${reset}`;
    console.log(output);
  }
}