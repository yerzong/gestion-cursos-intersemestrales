import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion, Calificacion } from './entities/evaluacion.entity';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepository: Repository<Evaluacion>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async findAll(filters?: { usuarioId?: number; cursoId?: number; calificacion?: Calificacion }): Promise<Evaluacion[]> {
    const where: any = {};
    if (filters) {
      if (filters.usuarioId) {
        where.usuario = { id: filters.usuarioId };
      }
      if (filters.cursoId) {
        where.curso = { id: filters.cursoId };
      }
      if (filters.calificacion) {
        where.calificacion = filters.calificacion;
      }
    }
    return await this.evaluacionRepository.find({ where, relations: ['usuario', 'curso', 'evaluador'] });
  }

  async findOne(id: number): Promise<Evaluacion> {
    const evaluacion = await this.evaluacionRepository.findOne({ where: { id }, relations: ['usuario', 'curso', 'evaluador'] });
    if (!evaluacion) {
      throw new HttpException('Evaluación no encontrada', HttpStatus.NOT_FOUND);
    }
    return evaluacion;
  }

  async create(createEvaluacionDto: CreateEvaluacionDto): Promise<Evaluacion> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: createEvaluacionDto.usuarioId } });
    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
    }
    const curso = await this.cursoRepository.findOne({ where: { id: createEvaluacionDto.cursoId } });
    if (!curso) {
      throw new HttpException('Curso no encontrado', HttpStatus.BAD_REQUEST);
    }
    let evaluador;
    if (createEvaluacionDto.evaluadorId) {
      evaluador = await this.usuarioRepository.findOne({ where: { id: createEvaluacionDto.evaluadorId } });
      if (!evaluador) {
        throw new HttpException('Evaluador no encontrado', HttpStatus.BAD_REQUEST);
      }
    }
    const evaluacion = this.evaluacionRepository.create({
      calificacion: createEvaluacionDto.calificacion,
      fecha_evaluacion: createEvaluacionDto.fecha_evaluacion,
      observaciones: createEvaluacionDto.observaciones,
      usuario,
      curso,
      evaluador: evaluador || null,
    });
    return await this.evaluacionRepository.save(evaluacion);
  }

  async update(id: number, updateEvaluacionDto: UpdateEvaluacionDto): Promise<Evaluacion> {
    const evaluacion = await this.findOne(id);

    if (updateEvaluacionDto.usuarioId !== undefined) {
      const usuario = await this.usuarioRepository.findOne({ where: { id: updateEvaluacionDto.usuarioId } });
      if (!usuario) {
        throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
      }
      evaluacion.usuario = usuario;
    }
    if (updateEvaluacionDto.cursoId !== undefined) {
      const curso = await this.cursoRepository.findOne({ where: { id: updateEvaluacionDto.cursoId } });
      if (!curso) {
        throw new HttpException('Curso no encontrado', HttpStatus.BAD_REQUEST);
      }
      evaluacion.curso = curso;
    }
    if (updateEvaluacionDto.evaluadorId !== undefined) {
      if (updateEvaluacionDto.evaluadorId === null) {
        evaluacion.evaluador = null;
      } else {
        const evaluador = await this.usuarioRepository.findOne({ where: { id: updateEvaluacionDto.evaluadorId } });
        if (!evaluador) {
          throw new HttpException('Evaluador no encontrado', HttpStatus.BAD_REQUEST);
        }
        evaluacion.evaluador = evaluador;
      }
    }
    Object.assign(evaluacion, updateEvaluacionDto);
    return await this.evaluacionRepository.save(evaluacion);
  }

  async remove(id: number): Promise<void> {
    const result = await this.evaluacionRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Evaluación no encontrada', HttpStatus.NOT_FOUND);
    }
  }
}