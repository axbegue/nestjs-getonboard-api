import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { CreateJobDto } from './create-job.dto';

export class RegisterJobDto  {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @ApiProperty({
    isArray: true,
    type: CreateJobDto
  })
  selectedJobs: CreateJobDto[];
}
