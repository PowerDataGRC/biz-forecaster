import { RegistrationService } from './registration.service';
import { RegisterStartDto } from './dto/register-start.dto';
import { RegisterCompleteDto } from './dto/register-complete.dto';
export declare class RegistrationController {
    private readonly registrationService;
    constructor(registrationService: RegistrationService);
    startRegistration(registerStartDto: RegisterStartDto): Promise<{
        message: string;
    }>;
    completeRegistration(registerCompleteDto: RegisterCompleteDto): Promise<{
        message: string;
        tenantId: string;
    }>;
}
