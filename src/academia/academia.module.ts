import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademiaService } from './academia.service';
import { AcademiaController } from './academia.controller';
import { Academia } from './entities/academia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Academia])],
  controllers: [AcademiaController],
  providers: [AcademiaService],
})
export class AcademiaModule {}