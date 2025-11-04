import { transports } from 'winston';
import 'winston-daily-rotate-file';
export declare const winstonConfig: {
    transports: (transports.ConsoleTransportInstance | import("winston-daily-rotate-file"))[];
};
