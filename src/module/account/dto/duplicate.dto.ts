import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class DuplicateDto {
  @IsString()
  id: string;
}
