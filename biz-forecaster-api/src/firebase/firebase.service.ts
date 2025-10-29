import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name);

  onModuleInit() {
    const encodedServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

    if (!encodedServiceAccount) {
      this.logger.error('FIREBASE_SERVICE_ACCOUNT_BASE64 is not set.');
      throw new Error('Firebase Admin SDK service account is not configured.');
    }

    if (admin.apps.length === 0) {
      const serviceAccountJson = Buffer.from(encodedServiceAccount, 'base64').toString('utf8');
      const serviceAccount = JSON.parse(serviceAccountJson);

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      this.logger.log('Firebase Admin SDK initialized successfully.');
    }
  }
}