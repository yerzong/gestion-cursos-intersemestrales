import { Module } from '@nestjs/common';
import { CursosAcademiasService } from './cursos-academias.service';
import { CursosAcademiasController } from './cursos-academias.controller';

@Module({
  controllers: [CursosAcademiasController],
  providers: [CursosAcademiasService],
})
export class CursosAcademiasModule {}
