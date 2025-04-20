import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Academia } from 'src/academia/entities/academia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Academia])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}