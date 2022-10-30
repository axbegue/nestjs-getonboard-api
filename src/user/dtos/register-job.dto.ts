import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateJobDto } from './create-job.dto';
import { EditUserDto } from './edit-user.dto';

export class RegisterJobDto extends EditUserDto {
  @IsNotEmpty()
  @ApiProperty()
  selectedJobs: CreateJobDto[];
}
