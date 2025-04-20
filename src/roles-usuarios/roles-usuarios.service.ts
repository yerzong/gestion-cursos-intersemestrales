import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CreateRolUsuarioDto } from './dto/create-roles-usuario.dto';
import { UpdateRolUsuarioDto } from './dto/update-roles-usuario.dto';
import { RolUsuario } from './entities/roles-usuario.entity';

@Injectable()
export class RolesUsuariosService {
  constructor(
    @InjectRepository(RolUsuario)
    private readonly rolUsuarioRepository: Repository<RolUsuario>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(filters: { rol?: string; usuarioId?: number }): Promise<RolUsuario[]> {
    const where: any = {};
    if (filters.rol) {
      where.rol = Like(`%${filters.rol}%`);
    }
    if (filters.usuarioId) {
      where.usuario = { id: filters.usuarioId };
    }
    return await this.rolUsuarioRepository.find({ where, relations: ['usuario'] });
  }

  async findOne(id: number): Promise<RolUsuario> {
    const rolUsuario = await this.rolUsuarioRepository.findOne({ where: { id }, relations: ['usuario'] });
    if (!rolUsuario) {
      throw new HttpException('Rol de usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return rolUsuario;
  }

  async create(createRolUsuarioDto: CreateRolUsuarioDto): Promise<RolUsuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: createRolUsuarioDto.usuarioId } });
    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
    }
    const rolUsuario = this.rolUsuarioRepository.create({
      usuario,
      rol: createRolUsuarioDto.rol,
    });
    return await this.rolUsuarioRepository.save(rolUsuario);
  }

  async update(id: number, updateRolUsuarioDto: UpdateRolUsuarioDto): Promise<RolUsuario> {
    const rolUsuario = await this.findOne(id);
    if (updateRolUsuarioDto.usuarioId && updateRolUsuarioDto.usuarioId !== rolUsuario.usuario.id) {
      const usuario = await this.usuarioRepository.findOne({ where: { id: updateRolUsuarioDto.usuarioId } });
      if (!usuario) {
        throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
      }
      rolUsuario.usuario = usuario;
    }
    if (updateRolUsuarioDto.rol) {
      rolUsuario.rol = updateRolUsuarioDto.rol;
    }
    return await this.rolUsuarioRepository.save(rolUsuario);
  }

  async remove(id: number): Promise<void> {
    const result = await this.rolUsuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Rol de usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }
}