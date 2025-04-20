import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluacion, Usuario, Curso])],
  controllers: [EvaluacionController],
  providers: [EvaluacionService],
})
export class EvaluacionModule {}