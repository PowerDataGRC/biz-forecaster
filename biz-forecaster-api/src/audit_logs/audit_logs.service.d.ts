import { Repository } from 'typeorm';
import { AuditLog } from './audit_log.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';
import { User } from '../users/user.entity';
export declare class AuditLogsService {
    private readonly auditLogRepository;
    private readonly userRepository;
    constructor(auditLogRepository: Repository<AuditLog>, userRepository: Repository<User>);
    create(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog>;
    findAll(): Promise<AuditLog[]>;
    findOne(id: string): Promise<AuditLog>;
    update(id: string, updateAuditLogDto: UpdateAuditLogDto): Promise<AuditLog>;
    remove(id: string): Promise<void>;
}
