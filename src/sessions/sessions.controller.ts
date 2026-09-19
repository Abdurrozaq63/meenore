import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { type AuthenticatedUser } from 'src/auth/types/current-user.type';
import { CreateSessionDto } from './dto/create-session.dto';
import { PaginationDto } from 'src/users/dto/pagination.dto';
import { GetSessionsDto } from './dto/get-sessions.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto.ts';
import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() createSessionDto: CreateSessionDto,
  ) {
    return this.sessionsService.create(user.userId, createSessionDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query() query: GetSessionsDto,
  ) {
    return this.sessionsService.findAll(user.userId, query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.sessionsService.findById(id, user.userId);
  }

  @Patch(':id/favourite')
  @UseGuards(JwtAuthGuard)
  updateFavourite(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() updateFavouriteDto: UpdateFavouriteDto,
  ) {
    return this.sessionsService.updateFavourite(
      id,
      user.userId,
      updateFavouriteDto.favourite,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.sessionsService.delete(id, user.userId);
  }

  @Patch(':id') @UseGuards(JwtAuthGuard) update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    return this.sessionsService.update(id, user.userId, updateSessionDto);
  }
}
