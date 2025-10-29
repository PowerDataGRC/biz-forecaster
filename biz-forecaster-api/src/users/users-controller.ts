// src/users/users.controller.ts (Example)
import { Controller, Get, UseGuards, UnauthorizedException } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { UsersService } from './users.service';
import { CurrentUser } from '../auth/current-user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';

@Controller('users')
@UseGuards(FirebaseAuthGuard) // Protect all routes in this controller with Firebase Auth Guard
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // This endpoint allows a logged-in user to get their own profile from the database.
  @Get('profile')
  getProfile(@CurrentUser() firebaseUser: DecodedIdToken) {
    // The firebaseUser object contains the decoded token, including the UID.
    // We use this UID to find the user in our own database.
    if (!firebaseUser) {
      throw new UnauthorizedException();
    }
    return this.usersService.findOne(firebaseUser.uid);
  }
}
