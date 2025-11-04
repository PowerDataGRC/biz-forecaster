import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SessionsService } from './sessions.service';
export declare class SessionAuthGuard implements CanActivate {
    private readonly sessionsService;
    constructor(sessionsService: SessionsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
