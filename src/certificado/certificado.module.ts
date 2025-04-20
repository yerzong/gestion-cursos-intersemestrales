import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificado } from './entities/certificado.entity';
import { CertificadoService } from './certificado.service';
import { CertificadoController } from './certificado.controller';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Certificado, Usuario, Curso])],
  controllers: [CertificadoController],
  providers: [CertificadoService],
})
export class CertificadoModule {}