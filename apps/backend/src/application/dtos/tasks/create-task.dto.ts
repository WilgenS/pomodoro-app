import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task', example: 'Finish report' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ description: 'The description of the task', example: 'Needs to be done by Friday' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Estimated number of pomodoros', example: 4, minimum: 1, default: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  estimatedPomodoros?: number;
}
