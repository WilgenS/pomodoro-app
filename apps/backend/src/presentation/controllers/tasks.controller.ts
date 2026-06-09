import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateTaskUseCase } from '../../application/use-cases/tasks/create-task.use-case';
import { ListTasksUseCase } from '../../application/use-cases/tasks/list-tasks.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/tasks/update-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/tasks/delete-task.use-case';
import { CreateTaskDto } from '../../application/dtos/tasks/create-task.dto';
import { UpdateTaskDto } from '../../application/dtos/tasks/update-task.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from '../../infrastructure/auth/interfaces/authenticated-request.interface';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly listTasksUseCase: ListTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.' })
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: AuthenticatedRequest) {
    return this.createTaskUseCase.execute(createTaskDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks for the current user' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const pageNum = page ? Number(page) : 1;
    const limitNum = limit ? Number(limit) : 10;
    return this.listTasksUseCase.execute(req.user.id, pageNum, limitNum);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.updateTaskUseCase.execute(id, updateTaskDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.deleteTaskUseCase.execute(id, req.user.id);
  }
}
