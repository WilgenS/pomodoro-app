import { IsNotEmpty, IsString, IsInt, Min, IsOptional } from 'class-validator';
import { randomUUID } from 'node:crypto';

export class StartSessionDto {
  @IsString()
  @IsNotEmpty()
  taskId: string = randomUUID();

  @IsInt()
  @Min(1)
  @IsOptional()
  duration?: number = 25;
}

export class EndSessionDto {
  @IsInt()
  @Min(0)
  @IsOptional()
  actualDuration?: number;
}
