import { Controller, Post, Get, Req, Query, Param } from '@nestjs/common';
import { type Request } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';

@Controller('/api/user')
export class UserController {
  // @Get('/hello')
  // sayHello(@Query('name') name: string): string {
  //   return `Say ${name}`;
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
  ) {}

  @Get('/connection')
  async getConnection(): Promise<string> {
    this.mailService.send();
    return this.connection.getName();
  }

  @Get('/:id')
  getById(@Param('id') id: string): string {
    return `GET ${id}`;
  }

  @Post()
  post(): string {
    return 'Post everything to the world';
  }

  @Get('/exam/sample')
  get(): string {
    return 'get everything from the world';
  }
}
