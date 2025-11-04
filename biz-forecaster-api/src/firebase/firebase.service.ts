import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name);

  onModuleInit() {
    // --- TEMPORARY DIAGNOSTIC ---
  /*   this.logger.warn('Firebase initialization is temporarily disabled for diagnostics.');
    return;

    if (admin.apps.length > 0) {
      return;
    }
 */
    this.logger.log('Initializing Firebase from FIREBASE_SERVICE_ACCOUNT_JSON...');

    try {
      const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
      if (!serviceAccountJson) {
        this.logger.error('FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set.');
        throw new Error('Firebase Admin SDK service account is not configured.');
      }

      const serviceAccount = JSON.parse(serviceAccountJson);

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      this.logger.log('Firebase Admin SDK initialized successfully.');
    } catch (error) {
      this.logger.error('Failed to parse or initialize Firebase Admin SDK from JSON:', error.stack);
      throw error;
    }
  }

  get admin() {
    return admin;
  }
}