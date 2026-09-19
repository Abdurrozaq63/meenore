import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateThemePointDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
