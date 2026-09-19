import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class GetSessionsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(100)
  limit: number = 10;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  favourite?: boolean;

  @IsOptional()
  @IsUUID()
  tagId?: string;
}
