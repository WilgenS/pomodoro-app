import { Controller, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StartSessionUseCase } from '../../application/use-cases/sessions/start-session.use-case';
import { EndSessionUseCase } from '../../application/use-cases/sessions/end-session.use-case';
import { StartSessionDto, EndSessionDto } from '../../application/dtos/sessions/session.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from '../../infrastructure/auth/interfaces/authenticated-request.interface';

@ApiTags('sessions')
@ApiBearerAuth()
@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
  constructor(
    private readonly startSessionUseCase: StartSessionUseCase,
    private readonly endSessionUseCase: EndSessionUseCase,
  ) { }

  @Post('start')
  @ApiOperation({ summary: 'Start a new pomodoro session' })
  async start(@Body() startSessionDto: StartSessionDto, @Req() req: AuthenticatedRequest) {
    return this.startSessionUseCase.execute(startSessionDto, req.user.id);
  }

  @Patch(':id/end')
  @ApiOperation({ summary: 'End a pomodoro session' })
  async end(
    @Param('id') id: string,
    @Body() endSessionDto: EndSessionDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.endSessionUseCase.execute(id, endSessionDto, req.user.id);
  }
}
