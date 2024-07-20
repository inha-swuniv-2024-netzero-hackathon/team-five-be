import { Type } from 'class-transformer';
import { IsNumber, isNumber } from 'class-validator';

export class UserIdxDto {
  @IsNumber()
  @Type(() => Number)
  userIdx: number;
}
