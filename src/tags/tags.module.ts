import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';

@Module({
  providers: [TagsService, TagsRepository],
  controllers: [TagsController],
})
export class TagsModule {}
