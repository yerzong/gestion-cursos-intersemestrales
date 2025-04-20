import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Periodo } from 'src/periodo/entities/periodo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curso, Usuario, Periodo])],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule {}