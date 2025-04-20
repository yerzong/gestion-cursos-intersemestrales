import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { InscripcionService } from './inscripcion.service';
import { InscripcionController } from './inscripcion.controller';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inscripcion, Usuario, Curso])],
  controllers: [InscripcionController],
  providers: [InscripcionService],
})
export class InscripcionModule {}