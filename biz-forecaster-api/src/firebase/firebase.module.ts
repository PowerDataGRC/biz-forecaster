import { Module, Global } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

// By marking this module as Global, the FirebaseService will be available
// for injection across the entire application without needing to import FirebaseModule everywhere.
@Global()
@Module({
  // The FirebaseService contains the correct onModuleInit logic to initialize Firebase.
  // NestJS will automatically run this when the application starts.
  providers: [FirebaseService],
  exports: [FirebaseService], // Export if other modules need to inject it directly.
})
export class FirebaseModule {}