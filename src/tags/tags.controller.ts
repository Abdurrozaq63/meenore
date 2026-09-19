import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { type AuthenticatedUser } from 'src/auth/types/current-user.type';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() createTagDto: CreateTagDto,
  ) {
    return this.tagsService.createTag(user.userId, createTagDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.tagsService.findAll(user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.tagsService.findById(id, user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.update(id, user.userId, updateTagDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.tagsService.remove(id, user.userId);
  }
}
