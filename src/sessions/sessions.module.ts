import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { SessionsRepository } from './sessions.repository';
import { ThemesRepository } from './themes.repository';
import { ThemePointsRepository } from './theme-points.repository';

@Module({
  controllers: [SessionsController],
  providers: [
    SessionsService,
    SessionsRepository,
    ThemesRepository,
    ThemePointsRepository,
  ],
})
export class SessionsModule {}
