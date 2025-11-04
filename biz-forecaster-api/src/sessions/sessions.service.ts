import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UserSession } from '../users/user-session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(UserSession)
    private readonly sessionRepository: Repository<UserSession>,
    private readonly jwtService: JwtService,
  ) {}

  async createSession(user: User): Promise<string> {
    const sessionDuration = 3600 * 24 * 7; // 7 days in seconds
    const expires_at = new Date();
    expires_at.setSeconds(expires_at.getSeconds() + sessionDuration);

    const session = this.sessionRepository.create({
      user,
      expires_at,
    });

    await this.sessionRepository.save(session);

    const payload = { sub: user.user_id, sessionId: session.id };
    return this.jwtService.sign(payload, { expiresIn: `${sessionDuration}s` });
  }

  async validateSession(token: string): Promise<User | null> {
    try {
      const payload = this.jwtService.verify(token);
      const sessionId = payload.sessionId;

      const session = await this.sessionRepository.findOne({
        where: { id: sessionId },
        relations: ['user'], // Ensure user is loaded
      });

      if (!session || session.expires_at < new Date()) {
        return null; // Session not found or expired
      }

      return session.user;
    } catch (e) {
      return null; // Token is invalid
    }
  }
}