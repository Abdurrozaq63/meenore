import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateThemePointDto } from './create-theme-point.dto';

export class CreateThemeDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateThemePointDto)
  points: CreateThemePointDto[];
}
