import { IsNotEmpty, IsString } from 'class-validator';

export class CreateThemePointDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
