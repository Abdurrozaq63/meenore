import { Controller, Post, Get, Req, Query, Param } from '@nestjs/common';
import { type Request } from 'express';

@Controller('/api/user')
export class UserController {
  @Get('/hello')
  sayHello(@Query('name') name: string): string {
    return `Say ${name}`;
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
