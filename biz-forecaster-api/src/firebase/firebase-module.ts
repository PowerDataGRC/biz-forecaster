// src/firebase/firebase.module.ts (New file)
import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Global() // Make Firebase Admin SDK available throughout the app
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: (configService: ConfigService) => {
        const serviceAccountJson = configService.get<string>('FIREBASE_SERVICE_ACCOUNT_JSON');
        if (!serviceAccountJson) throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not set.');
        const serviceAccount = JSON.parse(serviceAccountJson);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        return admin;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
