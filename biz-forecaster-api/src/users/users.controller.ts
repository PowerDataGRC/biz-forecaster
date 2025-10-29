import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';

@Controller('users')
@UseGuards(FirebaseAuthGuard) // Protect all routes in this controller with Firebase Auth
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createUserDto: CreateUserDto, @CurrentUser() firebaseUser: DecodedIdToken) {
    // The service now requires the user ID to be passed explicitly.
    return this.usersService.create(createUserDto, firebaseUser.uid);
  }

  @Get('profile')
  getProfile(@CurrentUser() firebaseUser: DecodedIdToken) {
    if (!firebaseUser) {
      throw new UnauthorizedException();
    }
    return this.usersService.findOne(firebaseUser.uid);
  }
}
