// src/users/users.controller.ts (Example)
import { Controller, Get, UseGuards, Post, Body, ValidationPipe, UnauthorizedException, UsePipes } from '@nestjs/common';

import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';

@Controller('users')
@UseGuards(FirebaseAuthGuard) // Protect all routes in this controller with Firebase Auth Guard
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // This endpoint is for creating a user record in your database after they've signed up via Firebase.
  // It should be protected to ensure only authenticated users can create their own profile.
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createUserDto: CreateUserDto, @CurrentUser() firebaseUser: DecodedIdToken) {
    // The service now requires the user ID to be passed explicitly.
    return this.usersService.create(createUserDto, firebaseUser.uid);
  }

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
