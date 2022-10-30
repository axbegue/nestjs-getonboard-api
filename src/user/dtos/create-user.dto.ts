import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, MaxLength, IsOptional, IsArray, IsEnum } from 'class-validator';
import { AppRoles } from 'src/app.roles';
import { EnumToString } from 'src/common/helpers';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @ApiProperty()
  password: string;

  @IsArray()
  @ApiProperty()
  @IsEnum(AppRoles, {
    each: true,
    message: `must be a valid role value, ${EnumToString(AppRoles)}`,
  })
  roles: string[];
}