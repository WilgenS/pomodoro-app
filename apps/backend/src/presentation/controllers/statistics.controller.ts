import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetStatisticsUseCase } from '../../application/use-cases/statistics/get-statistics.use-case';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from '../../infrastructure/auth/interfaces/authenticated-request.interface';

@ApiTags('statistics')
@ApiBearerAuth()
@Controller('statistics')
@UseGuards(JwtAuthGuard)
export class StatisticsController {
  constructor(private readonly getStatisticsUseCase: GetStatisticsUseCase) { }

  @Get()
  @ApiOperation({ summary: 'Get user focus statistics' })
  @ApiResponse({ status: 200, description: 'Return aggregated stats for the user.' })
  async getStats(@Req() req: AuthenticatedRequest) {
    return this.getStatisticsUseCase.execute(req.user.id);
  }
}
