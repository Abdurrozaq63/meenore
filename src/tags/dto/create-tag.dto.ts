import { IsString, IsNotEmpty, MaxLength, IsEnum } from 'class-validator';

export enum TagType {
  WORK = 'work',
  CLASS = 'class',
  PERSONAL = 'personal',
}
export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsEnum(TagType, { message: 'Invalid tag type' })
  type: TagType;
}
