import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Tenant } from '../tenants/tenant.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ user_id: id });
  }

  async create(createUserDto: CreateUserDto, userId: string): Promise<Omit<User, 'password_hash'>> {
    const { tenant_id, username, email, password, ...rest } = createUserDto; // tenant_id is unused but destructured to exclude it from rest

    // Check for existing user with the same email or username
    const existingUser = await this.usersRepository.findOne({ where: [{ email }, { username }] });
    if (existingUser) {
      throw new ConflictException('User with this email or username already exists.');
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = this.usersRepository.create({
      ...rest,
      user_id: userId, // Use the UID from Firebase
      username,
      email,
      password_hash,
    });

    const savedUser = await this.usersRepository.save(newUser);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash: _, ...result } = savedUser;
    return result;
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
