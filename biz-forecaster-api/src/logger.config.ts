import { transports, format } from 'winston';
import 'winston-daily-rotate-file';

export const winstonConfig = {
  transports: [
    // Console transport for development
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.ms(),
        format.colorize(),
        format.printf(({ level, message, context, timestamp }) => {
          return `${timestamp} [${context}] ${level}: ${message}`;
        }),
      ),
    }),

    // Daily rotating file transport for all logs
    new transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log', // Filename pattern
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true, // Compress old log files
      maxSize: '20m', // Max size of a log file before rotating
      maxFiles: '14d', // Keep logs for 14 days
      format: format.combine(format.timestamp(), format.json()),
    }),

    // Daily rotating file transport specifically for error logs
    new transports.DailyRotateFile({
      level: 'error', // Only log errors to this file
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d', // Keep error logs for 30 days
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
};