import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

// Define a constant for the injection token
export const FIREBASE_ADMIN = 'FIREBASE_ADMIN';

const firebaseProvider = {
  provide: FIREBASE_ADMIN,
  useFactory: (configService: ConfigService) => {
    const firebaseServiceAccount = configService.get<string>(
      'FIREBASE_SERVICE_ACCOUNT_JSON',
    );

    if (!firebaseServiceAccount) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not set in .env file');
    }

    const serviceAccount = JSON.parse(firebaseServiceAccount);

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  },
  inject: [ConfigService],
};

@Module({
  providers: [firebaseProvider],
  exports: [firebaseProvider],
})
export class FirebaseModule {}