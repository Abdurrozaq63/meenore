import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { User } from './types/user.type';
import * as argon2 from 'argon2';
import { UsersRepository } from './users.repository';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const offset = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.usersRepository.findAll({
        limit,
        offset,
      }),
      this.usersRepository.count(),
    ]);
    return {
      data: users,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const passwordHash = await argon2.hash(password);

    return this.usersRepository.create({
      name,
      email,
      passwordHash,
    });
  }
}
