import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { TenantsService } from '../tenants/tenants.service';
interface CreateFromRegistrationParams {
    email: string;
    firebaseUid: string;
    tenantId: string;
}
export declare class UsersService {
    private readonly usersRepository;
    private readonly tenantsService;
    constructor(usersRepository: Repository<User>, tenantsService: TenantsService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    createFromRegistration(params: CreateFromRegistrationParams): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
}
export {};
