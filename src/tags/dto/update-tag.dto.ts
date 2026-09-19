import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { TagType } from './create-tag.dto';

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title?: string;

  @IsOptional()
  @IsEnum(TagType, {
    message: 'Invalid tag type',
  })
  type?: TagType;
}
