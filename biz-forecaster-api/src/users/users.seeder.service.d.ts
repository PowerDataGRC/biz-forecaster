import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { Tenant } from 'src/tenants/tenant.entity';
import { FirebaseService } from 'src/firebase/firebase.service';
export declare class UsersSeederService {
    private readonly userRepository;
    private readonly configService;
    private readonly firebaseService;
    private readonly logger;
    constructor(userRepository: Repository<User>, configService: ConfigService, firebaseService: FirebaseService);
    seed(defaultTenant: Tenant): Promise<void>;
}
