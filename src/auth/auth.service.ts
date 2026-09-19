import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersRepository } from 'src/users/users.repository';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findCredentialsByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });

    return { accessToken };
  }
}
