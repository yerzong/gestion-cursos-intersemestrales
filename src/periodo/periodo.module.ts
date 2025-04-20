import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periodo } from './entities/periodo.entity';
import { PeriodosController } from './periodo.controller';
import { PeriodosService } from './periodo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Periodo])],
  controllers: [PeriodosController],
  providers: [PeriodosService],
})
export class PeriodosModule {}