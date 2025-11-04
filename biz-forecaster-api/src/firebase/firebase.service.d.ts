import { OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
export declare class FirebaseService implements OnModuleInit {
    private readonly logger;
    onModuleInit(): void;
    get admin(): typeof admin;
}
