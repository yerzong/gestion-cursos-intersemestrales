import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesUsuariosService } from './roles-usuarios.service';
import { RolesUsuariosController } from './roles-usuarios.controller';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { RolUsuario } from './entities/roles-usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolUsuario, Usuario])],
  controllers: [RolesUsuariosController],
  providers: [RolesUsuariosService],
})
export class RolesUsuariosModule {}