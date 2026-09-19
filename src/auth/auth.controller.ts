import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async authLogin(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
