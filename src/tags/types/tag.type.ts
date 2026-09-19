import { TagType } from '../dto/create-tag.dto';

export interface Tag {
  id: string;
  userId: string;
  title: string;
  type: TagType;
  createdAt: Date;
  updatedAt: Date;
}
