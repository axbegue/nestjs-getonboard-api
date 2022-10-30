import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { CreateUserDto } from './create-user.dto';

export class EditUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  id: number;
}
