import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  jobId: string;
}
