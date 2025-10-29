import { DecodedIdToken } from 'firebase-admin/auth';

// Augment the Express Request interface to include a 'user' property
declare global {
  namespace Express {
    export interface Request {
      user?: DecodedIdToken; // For Firebase Auth Guard
      tenant?: string; // For Tenant Middleware
    }
  }
}