import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
// import { TagsModule } from './tags/tags/tags.module';
// import { TagstagsService } from './tagstags/tagstags.service';
// import { TagsModule } from './tags/tags.module';
import { TagsModule } from './tags/tags.module';
import { TagsService } from './tags/tags.service';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { AudioController } from './audio/audio.controller';
import { AudioModule } from './audio/audio.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    UsersModule,
    DatabaseModule,
    TagsModule,
    AuthModule,
    TagsModule,
    SessionsModule,
    AudioModule,
  ],
  controllers: [AppController, AudioController],
  providers: [AppService],
})
export class AppModule {}
