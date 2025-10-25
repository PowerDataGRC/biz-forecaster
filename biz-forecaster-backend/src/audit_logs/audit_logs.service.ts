import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit_log.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    const user = await this.userRepository.findOne({ where: { user_id: createAuditLogDto.user_id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${createAuditLogDto.user_id}" not found`);
    }

    const auditLog = this.auditLogRepository.create({
      ...createAuditLogDto,
      user,
    });

    return this.auditLogRepository.save(auditLog);
  }

  findAll(): Promise<AuditLog[]> {
    return this.auditLogRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<AuditLog> {
    const auditLog = await this.auditLogRepository.findOne({ where: { log_id: id }, relations: ['user'] });
    if (!auditLog) {
      throw new NotFoundException(`AuditLog with ID "${id}" not found`);
    }
    return auditLog;
  }

  async update(id: string, updateAuditLogDto: UpdateAuditLogDto): Promise<AuditLog> {
    const auditLog = await this.findOne(id);
    const { user_id, ...rest } = updateAuditLogDto;

    if (user_id) {
      const user = await this.userRepository.findOne({ where: { user_id } });
      if (!user) {
        throw new NotFoundException(`User with ID "${user_id}" not found`);
      }
      auditLog.user = user;
    }

    Object.assign(auditLog, rest);
    return this.auditLogRepository.save(auditLog);
  }

  async remove(id: string): Promise<void> {
    const result = await this.auditLogRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`AuditLog with ID "${id}" not found`);
    }
  }
}
