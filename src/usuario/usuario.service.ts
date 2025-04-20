import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Academia } from 'src/academia/entities/academia.entity';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Academia)
    private readonly academiaRepository: Repository<Academia>,
  ) {}

  async findAll(filters: { nombre?: string; correo?: string; rol_principal?: string }): Promise<Usuario[]> {
    const where: any = {};
    if (filters.nombre) {
      where.nombre = Like(`%${filters.nombre}%`);
    }
    if (filters.correo) {
      where.correo = Like(`%${filters.correo}%`);
    }
    if (filters.rol_principal) {
      where.rol_principal = filters.rol_principal;
    }
    return await this.usuarioRepository.find({ where, relations: ['academia'] });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id }, relations: ['academia'] });
    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return usuario;
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Verifica que no exista otro usuario con el mismo correo.
    const existe = await this.usuarioRepository.findOne({ where: { correo: createUsuarioDto.correo } });
    if (existe) {
      throw new HttpException('Correo ya está en uso', HttpStatus.BAD_REQUEST);
    }

    const usuario = this.usuarioRepository.create(createUsuarioDto);

    // Si se envía academiaId, se busca la academia y se asigna.
    if (createUsuarioDto.academiaId) {
      const academia = await this.academiaRepository.findOne({ where: { id: createUsuarioDto.academiaId } });
      if (!academia) {
        throw new HttpException('Academia no encontrada', HttpStatus.BAD_REQUEST);
      }
      usuario.academia = academia;
    }

    return await this.usuarioRepository.save(usuario);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    // Si se envía un nuevo correo, verifica que no esté en uso por otro usuario.
    if (updateUsuarioDto.correo && updateUsuarioDto.correo !== usuario.correo) {
      const existe = await this.usuarioRepository.findOne({ where: { correo: updateUsuarioDto.correo } });
      if (existe) {
        throw new HttpException('Correo ya está en uso', HttpStatus.BAD_REQUEST);
      }
    }
    // Si se envía academiaId, se busca y asigna.
    if (updateUsuarioDto.academiaId !== undefined) {
      if (updateUsuarioDto.academiaId === null) {
        usuario.academia = null;
      } else {
        const academia = await this.academiaRepository.findOne({ where: { id: updateUsuarioDto.academiaId } });
        if (!academia) {
          throw new HttpException('Academia no encontrada', HttpStatus.BAD_REQUEST);
        }
        usuario.academia = academia;
      }
    }
    Object.assign(usuario, updateUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }
}