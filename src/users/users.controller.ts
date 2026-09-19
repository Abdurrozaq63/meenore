import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { type Request } from 'express';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { type AuthenticatedUser } from 'src/auth/types/current-user.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findById(id);
  }
}
