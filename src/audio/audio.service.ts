import { Injectable } from '@nestjs/common';
import { UploadAudio } from './types/uploaded-audio.type';
import { Multer } from 'multer';

@Injectable()
export class AudioService {
  async upload(file: Express.Multer.File): Promise<UploadAudio> {
    throw new Error('Not Implemented');
  }
}
