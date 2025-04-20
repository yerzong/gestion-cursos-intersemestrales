import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursosAcademiasService } from './cursos-academias.service';
import { CursosAcademiasController } from './cursos-academias.controller';
import { Curso } from 'src/curso/entities/curso.entity';
import { Academia } from 'src/academia/entities/academia.entity';
import { CursoAcademia } from './entities/cursos-academia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CursoAcademia, Curso, Academia])],
  controllers: [CursosAcademiasController],
  providers: [CursosAcademiasService],
})
export class CursosAcademiasModule {}