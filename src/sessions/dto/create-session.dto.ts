import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateThemeDto } from './create-theme.dto';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  audioUrl: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  audioDurationSeconds?: number;

  @IsOptional()
  @IsString()
  rawTranscript?: string;

  @IsOptional()
  @IsUUID()
  tagId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateThemeDto)
  themes: CreateThemeDto[];
}
