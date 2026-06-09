import { IsOptional, IsString, IsNotEmpty, IsInt, Min, IsEnum } from 'class-validator';
import type { TaskStatus } from '../../../domain/entities/task.entity';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['TODO', 'IN_PROGRESS', 'COMPLETED'])
  @IsOptional()
  status?: TaskStatus;

  @IsInt()
  @Min(1)
  @IsOptional()
  estimatedPomodoros?: number;
}
