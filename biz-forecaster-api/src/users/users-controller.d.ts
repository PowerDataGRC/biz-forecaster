import { UsersService } from './users.service';
import { DecodedIdToken } from 'firebase-admin/auth';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(firebaseUser: DecodedIdToken): Promise<import("./user.entity").User>;
}
