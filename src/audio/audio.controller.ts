import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AudioService } from './audio.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('audio'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.audioService.upload(file);
  }
}
