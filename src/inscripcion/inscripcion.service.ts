import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Inscripcion, EstadoInscripcion } from './entities/inscripcion.entity';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Injectable()
export class InscripcionService {
  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async findAll(filters?: { usuarioId?: number; cursoId?: number; estado?: EstadoInscripcion }): Promise<Inscripcion[]> {
    const where: any = {};
    if (filters) {
      if (filters.usuarioId) {
        where.usuario = { id: filters.usuarioId };
      }
      if (filters.cursoId) {
        where.curso = { id: filters.cursoId };
      }
      if (filters.estado) {
        where.estado = filters.estado;
      }
    }
    return await this.inscripcionRepository.find({ where, relations: ['usuario', 'curso'] });
  }

  async findOne(id: number): Promise<Inscripcion> {
    const inscripcion = await this.inscripcionRepository.findOne({ where: { id }, relations: ['usuario', 'curso'] });
    if (!inscripcion) {
      throw new HttpException('Inscripción no encontrada', HttpStatus.NOT_FOUND);
    }
    return inscripcion;
  }

  async create(createInscripcionDto: CreateInscripcionDto): Promise<Inscripcion> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: createInscripcionDto.usuarioId } });
    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
    }
    const curso = await this.cursoRepository.findOne({ where: { id: createInscripcionDto.cursoId } });
    if (!curso) {
      throw new HttpException('Curso no encontrado', HttpStatus.BAD_REQUEST);
    }
    const inscripcion = this.inscripcionRepository.create({
      fecha_inscripcion: createInscripcionDto.fecha_inscripcion,
      estado: createInscripcionDto.estado || EstadoInscripcion.Inscrito,
      usuario,
      curso,
    });
    return await this.inscripcionRepository.save(inscripcion);
  }

  async update(id: number, updateInscripcionDto: UpdateInscripcionDto): Promise<Inscripcion> {
    const inscripcion = await this.findOne(id);

    if (updateInscripcionDto.usuarioId !== undefined) {
      const usuario = await this.usuarioRepository.findOne({ where: { id: updateInscripcionDto.usuarioId } });
      if (!usuario) {
        throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
      }
      inscripcion.usuario = usuario;
    }
    if (updateInscripcionDto.cursoId !== undefined) {
      const curso = await this.cursoRepository.findOne({ where: { id: updateInscripcionDto.cursoId } });
      if (!curso) {
        throw new HttpException('Curso no encontrado', HttpStatus.BAD_REQUEST);
      }
      inscripcion.curso = curso;
    }

    Object.assign(inscripcion, updateInscripcionDto);
    return await this.inscripcionRepository.save(inscripcion);
  }

  async remove(id: number): Promise<void> {
    const result = await this.inscripcionRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Inscripción no encontrada', HttpStatus.NOT_FOUND);
    }
  }
}