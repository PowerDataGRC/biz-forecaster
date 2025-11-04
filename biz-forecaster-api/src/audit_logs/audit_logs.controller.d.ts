import { AuditLogsService } from './audit_logs.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';
export declare class AuditLogsController {
    private readonly auditLogsService;
    constructor(auditLogsService: AuditLogsService);
    create(createAuditLogDto: CreateAuditLogDto): Promise<import("./audit_log.entity").AuditLog>;
    findAll(): Promise<import("./audit_log.entity").AuditLog[]>;
    findOne(id: string): Promise<import("./audit_log.entity").AuditLog>;
    update(id: string, updateAuditLogDto: UpdateAuditLogDto): Promise<import("./audit_log.entity").AuditLog>;
    remove(id: string): Promise<void>;
}
