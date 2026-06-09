import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { validate } from './infrastructure/config/env.validation';
import { AuthModule } from './infrastructure/auth/auth.module';
import { TasksModule } from './infrastructure/tasks/tasks.module';
import { SessionsModule } from './infrastructure/sessions/sessions.module';
import { StatisticsModule } from './infrastructure/statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    DatabaseModule,
    AuthModule,
    TasksModule,
    SessionsModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
