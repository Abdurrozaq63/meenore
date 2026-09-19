import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TagsRepository } from './tags.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  async createTag(userId: string, createTagDto: CreateTagDto) {
    const { title, type } = createTagDto;
    return this.tagsRepository.create({
      userId,
      title,
      type,
    });
  }

  async findAll(userId: string) {
    return this.tagsRepository.findAllByUserId(userId);
  }

  async findById(id: string, userId: string) {
    const tag = await this.tagsRepository.findById(id, userId);
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return tag;
  }

  async update(id: string, userId: string, updateTagDto: UpdateTagDto) {
    if (updateTagDto.title === undefined && updateTagDto.type === undefined) {
      throw new BadRequestException('At least one field must be provided');
    }

    const tag = await this.tagsRepository.update(id, userId, updateTagDto);

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return tag;
  }

  async remove(id: string, userId: string) {
    const tag = await this.tagsRepository.delete(id, userId);

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return {
      message: 'Tag deleted successfully',
    };
  }
}
