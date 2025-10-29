import { Module, Global } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Global() // Make the module global so you don't have to import it everywhere
@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}