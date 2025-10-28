import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSession } from '../users/user-session.entity';
import * as crypto from 'crypto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(UserSession)
    private sessionsRepository: Repository<UserSession>,
  ) {}

  /**
   * Creates a new session for a user.
   * Note: In a real app, you would generate a secure token (e.g., JWT) and store its hash.
   */
  async create(userId: string, tenantId: string): Promise<UserSession> {
    const token = crypto.randomBytes(32).toString('hex');
    const token_hash = crypto.createHash('sha256').update(token).digest('hex');

    const session = this.sessionsRepository.create({
      user: { user_id: userId },
      tenant: { tenant_id: tenantId },
      token_hash,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return this.sessionsRepository.save(session);
  }
}