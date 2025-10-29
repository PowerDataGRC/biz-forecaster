import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { TenantsService } from '../tenants/tenants.service';

/**
 * Defines the shape of the data needed to create a user
 * from the registration service.
 */
interface CreateFromRegistrationParams {
  email: string;
  firebaseUid: string;
  tenantId: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly tenantsService: TenantsService, // Inject the service, not the repository
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ user_id: id });
  }

  /**
   * Creates a user record from the registration flow.
   * This is called after the user has been created in Firebase.
   */
  async createFromRegistration(params: CreateFromRegistrationParams): Promise<User> {
    // Check for existing user with the same email
    const existingUser = await this.usersRepository.findOne({ where: { email: params.email } });
    if (existingUser) {
      // This is an important safeguard. If this happens, it means a user was created
      // in Firebase, but a user with that email already exists in our database,
      // which indicates an inconsistent state.
      throw new ConflictException('User with this email already exists in the database.');
    }

    // 1. Find the tenant entity that this user belongs to.
    const tenant = await this.tenantsService.findOne(params.tenantId);
    if (!tenant) {
      // This is a critical failure. The tenant created in the previous step was not found.
      // This should not happen in a normal flow.
      throw new NotFoundException(`Tenant with ID "${params.tenantId}" not found.`);
    }

    // 2. Create the new user with the full tenant object.
    const newUser = this.usersRepository.create({
      user_id: params.firebaseUid,
      email: params.email,
      username: params.email, // Default username to email
      tenant: tenant, // Assign the full tenant entity
    });

    return this.usersRepository.save(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.preload({
      user_id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
}
