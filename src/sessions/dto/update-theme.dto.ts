import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateThemePointDto } from './update-theme-point.dto';
export class UpdateThemeDto {
  @IsString() @IsNotEmpty() title: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateThemePointDto)
  points: UpdateThemePointDto[];
}
