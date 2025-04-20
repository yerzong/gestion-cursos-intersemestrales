import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademiaModule } from './academia/academia.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolesUsuariosModule } from './roles-usuarios/roles-usuarios.module';
import { PeriodoModule } from './periodo/periodo.module';
import { CursoModule } from './curso/curso.module';
import { CursosAcademiasModule } from './cursos-academias/cursos-academias.module';
import { InscripcionModule } from './inscripcion/inscripcion.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'bdd_cursos_intersemestrales',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false, // ⚠️ false si ya tienes las tablas en MySQL
  }), AcademiaModule, UsuarioModule, RolesUsuariosModule, PeriodoModule, CursoModule, CursosAcademiasModule, InscripcionModule, EvaluacionModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
