// /home/max/codeRepo/biz-forecaster/biz-forecaster-api/src/types/express/index.d.ts

import { DecodedIdToken } from 'firebase-admin/auth';

// This declaration file merges with the existing Express namespace.
declare global {
    namespace Express {
        export interface Request {
            tenant?: string; // Add the optional 'tenant' property
            user?: DecodedIdToken; // Add the optional 'user' property with its correct type
        }
    }
}
