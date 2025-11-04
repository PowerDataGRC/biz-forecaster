import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UserSession } from '../users/user-session.entity';
export declare class SessionsService {
    private readonly sessionRepository;
    private readonly jwtService;
    constructor(sessionRepository: Repository<UserSession>, jwtService: JwtService);
    createSession(user: User): Promise<string>;
    validateSession(token: string): Promise<User | null>;
}
