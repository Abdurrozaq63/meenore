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
import { UpdateThemeDto } from './update-theme.dto';

export class UpdateSessionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsUrl()
  audioUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  audioDurationSeconds?: number;

  @IsOptional()
  @IsString()
  rawTranscript?: string;

  @IsOptional()
  @IsUUID()
  tagId?: string | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateThemeDto)
  themes?: UpdateThemeDto[];
}
