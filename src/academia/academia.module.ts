import { Module } from '@nestjs/common';
import { AcademiaService } from './academia.service';
import { AcademiaController } from './academia.controller';

@Module({
  controllers: [AcademiaController],
  providers: [AcademiaService],
})
export class AcademiaModule {}
