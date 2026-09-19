import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class UpdateFavouriteDto {
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean()
  favourite: boolean;
}
